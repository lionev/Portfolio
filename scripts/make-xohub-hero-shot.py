"""Build a horizontal XoH shot with the full HUD visible (moderate zoom)."""

from __future__ import annotations

import base64
import json
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

root = Path(r'C:\Users\XoD\Documents\www\Portfolio\public\shots')
browser_log = Path(r'C:\Users\XoD\.cursor\browser-logs')

card: Image.Image | None = None
captures = sorted(browser_log.glob('cdp-response-Page.captureScreenshot-*.json'), reverse=True)
if captures:
    payload = json.loads(captures[0].read_text(encoding='utf-8'))
    b64 = payload.get('data')
    if b64:
        card = Image.open(BytesIO(base64.b64decode(b64))).convert('RGB')
        print('using browser capture', captures[0].name, card.size)

if card is None:
    full = Image.open(root / 'xohub-full.png').convert('RGB')
    card = full.crop((955, 120, 1510, 655))
    print('using full-page crop', card.size)

# Cover leftover placeholder / empty band under the window chrome.
draw = ImageDraw.Draw(card)
# Detect very dark bottom strip with faint caption and paint it out.
px = card.load()
cut = card.height
for y in range(card.height - 1, int(card.height * 0.82), -1):
    row = [px[x, y] for x in range(0, card.width, 6)]
    # mint/green UI still has brighter pixels; caption band is almost flat dark
    bright = sum(1 for r, g, b in row if r + g + b > 110)
    green = sum(1 for r, g, b in row if g > 120 and g > r + 20)
    if bright <= 3 and green == 0:
        cut = y
    else:
        break
if cut < card.height - 8:
    draw.rectangle((0, cut, card.width, card.height), fill=(22, 24, 28))
    print('covered bottom from', cut)

out_w, out_h = 1600, 900
canvas = Image.new('RGB', (out_w, out_h), (12, 14, 18))

glow = Image.new('RGB', (out_w, out_h), (12, 14, 18))
gdraw = ImageDraw.Draw(glow)
cx, cy = out_w // 2, out_h // 2
for radius, color in ((900, (18, 42, 36)), (520, (14, 30, 26))):
    gdraw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color)
glow = glow.filter(ImageFilter.GaussianBlur(110))
canvas = Image.blend(canvas, glow, 0.6)

# Fit entire HUD in landscape — readable, not cropped, not a tiny island.
pad = 0.92
scale = min(out_w / card.width, out_h / card.height) * pad
new_w = int(card.width * scale)
new_h = int(card.height * scale)
hero = card.resize((new_w, new_h), Image.Resampling.LANCZOS)
print('scale', round(scale, 2), 'hero', new_w, new_h)

x = (out_w - new_w) // 2
y = (out_h - new_h) // 2
canvas.paste(hero, (x, y))

out = root / 'xohub-hud.png'
canvas.save(out, optimize=True)
canvas.save(root / 'xohub.png', optimize=True)
# Keep a named horizontal capture too
canvas.save(root / 'xohub-landscape.png', optimize=True)
print('saved', out, canvas.size)
