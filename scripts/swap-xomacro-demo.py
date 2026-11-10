"""Swap XoMacro macros to a portfolio-safe daily demo, then restore later."""

from __future__ import annotations

import json
import shutil
import sys
from pathlib import Path

appdata = Path.home() / 'AppData' / 'Roaming' / 'XoMacro'
macros = appdata / 'macros.json'
backup = appdata / 'macros.portfolio-backup.json'
demo = Path(__file__).with_name('xomacro-demo-macros.json')


def swap() -> None:
    if not backup.exists():
        shutil.copy2(macros, backup)
    shutil.copy2(demo, macros)
    print('swapped demo macros ->', macros)


def restore() -> None:
    if not backup.exists():
        raise SystemExit(f'missing backup: {backup}')
    shutil.copy2(backup, macros)
    print('restored macros from', backup)


if __name__ == '__main__':
    cmd = sys.argv[1] if len(sys.argv) > 1 else 'swap'
    if cmd == 'swap':
        swap()
    elif cmd == 'restore':
        restore()
    else:
        raise SystemExit('usage: swap-xomacro-demo.py [swap|restore]')
