from pathlib import Path

from PIL import Image

root = Path(r'C:\Users\XoD\Documents\www\Portfolio\public\shots')
full = Image.open(root / 'xohub-full.png').convert('RGB')

# Fixed crop of the floating XoH module window in the hero (1920x1080 capture).
# Left edge was measured from mint icons; width covers both module columns + chrome.
left, top, right, bottom = 955, 120, 1510, 690
card = full.crop((left, top, right, bottom))

pad_x, pad_y = 72, 64
canvas = Image.new('RGB', (card.width + pad_x * 2, card.height + pad_y * 2), (12, 14, 20))
canvas.paste(card, (pad_x, pad_y))
out = root / 'xohub.png'
canvas.save(out, optimize=True)
print('saved', out, canvas.size)
