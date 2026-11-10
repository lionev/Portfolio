import time
from pathlib import Path
from ctypes import WINFUNCTYPE, byref, create_unicode_buffer, windll, wintypes

import mss
from PIL import Image

user32 = windll.user32
SW_RESTORE = 9
SW_MINIMIZE = 6
out = Path(r'C:\Users\XoD\Documents\www\Portfolio\public\shots')
out.mkdir(parents=True, exist_ok=True)

targets = {
    'XoC': 'xoc.png',
    'Pokedeck': 'pokedeck.png',
    'XoMacro': 'xomacro.png',
}

WNDENUMPROC = WINFUNCTYPE(wintypes.BOOL, wintypes.HWND, wintypes.LPARAM)
candidates: dict[str, list[tuple[int, int]]] = {name: [] for name in targets}


def cb(hwnd, _lparam):
    buf = create_unicode_buffer(512)
    user32.GetWindowTextW(hwnd, buf, 512)
    title = buf.value
    if title not in targets:
        return True
    rect = wintypes.RECT()
    user32.GetWindowRect(hwnd, byref(rect))
    w = abs(int(rect.right - rect.left))
    h = abs(int(rect.bottom - rect.top))
    # Keep even minimized shells; we'll restore later.
    area = w * h
    if area <= 0:
        return True
    candidates[title].append((int(hwnd), area if w >= 200 else area + 10_000_000))
    return True


user32.EnumWindows(WNDENUMPROC(cb), 0)

# Prefer the largest restored-looking window; if all tiny, take any handle.
found: dict[str, int] = {}
for title, items in candidates.items():
    if not items:
        continue
    # Prefer bigger absolute area first after restoring logic below.
    items_sorted = sorted(items, key=lambda item: item[1], reverse=True)
    found[title] = items_sorted[0][0]

print('candidates', candidates)
print('found', found)

rect = wintypes.RECT()
with mss.MSS() as sct:
    for title, filename in targets.items():
        hwnd = found.get(title)
        if not hwnd:
            print('missing', title)
            continue

        for other_title, other_hwnd in found.items():
            if other_title != title:
                user32.ShowWindow(other_hwnd, SW_MINIMIZE)

        user32.ShowWindow(hwnd, SW_RESTORE)
        time.sleep(0.35)
        user32.MoveWindow(hwnd, 40, 40, 1280, 820, True)
        user32.SetForegroundWindow(hwnd)
        time.sleep(0.9)
        user32.GetWindowRect(hwnd, byref(rect))
        mon = {
            'left': int(rect.left),
            'top': int(rect.top),
            'width': max(1, int(rect.right - rect.left)),
            'height': max(1, int(rect.bottom - rect.top)),
        }
        print(title, mon)
        if mon['width'] < 400 or mon['height'] < 300 or mon['left'] < -1000:
            print('skip bad window', title)
            continue
        shot = sct.grab(mon)
        img = Image.frombytes('RGB', shot.size, shot.bgra, 'raw', 'BGRX')
        path = out / filename
        img.save(path, 'PNG', optimize=True)
        print('saved', path, path.stat().st_size)

print('done')
