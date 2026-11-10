"""Build a widescreen XoH shot that expands from the center into the frame."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

root = Path(r'C:\Users\XoD\Documents\www\Portfolio\public\shots')
full = Image.open(root / 'xohub-full.png').convert('RGB')

# Tight crop of the floating module window in the 1920x1080 landing capture.
left, top, right, bottom = 955, 120, 1510, 655
card = full.crop((left, top, right, bottom))

# Cover faint marketing placeholder if present near the bottom of the panel.
draw_card = ImageDraw.Draw(card)
draw_card.rectangle((0, card.height - 36, card.width, card.height), fill=(22, 24, 28))

out_w, out_h = 1600, 900
canvas = Image.new('RGB', (out_w, out_h), (10, 12, 16))

# Soft mint glow from the center so the panel feels like it blooms outward.
glow = Image.new('RGB', (out_w, out_h), (10, 12, 16))
gdraw = ImageDraw.Draw(glow)
cx, cy = out_w // 2, out_h // 2
for radius, color in (
    (900, (20, 48, 40)),
    (560, (16, 36, 30)),
    (280, (12, 24, 22)),
):
    gdraw.ellipse((cx - radius, cy - radius, cx + radius, cy + radius), fill=color)
glow = glow.filter(ImageFilter.GaussianBlur(110))
canvas = Image.blend(canvas, glow, 0.7)

# Overscale so the HUD bleeds past the frame edges (starts center, expands out).
scale = max(out_w / card.width, out_h / card.height) * 1.08
new_w = int(card.width * scale)
new_h = int(card.height * scale)
hero = card.resize((new_w, new_h), Image.Resampling.LANCZOS)

x = (out_w - new_w) // 2
y = (out_h - new_h) // 2 - 10
canvas.paste(hero, (x, y))

# Light edge falloff only — keep the panel dominant.
vignette = Image.new('L', (out_w, out_h), 255)
vdraw = ImageDraw.Draw(vignette)
# Darken only the far corners a little
for inset, value in ((0, 210), (40, 235), (90, 250)):
    vdraw.rectangle((inset, inset, out_w - inset, out_h - inset), outline=value, width=28)
vignette = vignette.filter(ImageFilter.GaussianBlur(40))
dark = Image.new('RGB', (out_w, out_h), (10, 12, 16))
canvas = Image.composite(canvas, dark, vignette)

out = root / 'xohub-hud.png'
canvas.save(out, optimize=True)
canvas.save(root / 'xohub.png', optimize=True)
print('saved', out, canvas.size, 'scale', round(scale, 2), 'hero', new_w, new_h)
