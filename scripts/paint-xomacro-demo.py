"""Overwrite game-specific labels in the XoMacro shot with a daily demo."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

root = Path(r'C:\Users\XoD\Documents\www\Portfolio\public\shots')
src = root / 'xomacro-base.png'
img = Image.open(src).convert('RGB')
draw = ImageDraw.Draw(img)
w, h = img.size
print('size', w, h)

# Sample a few UI tones from the original capture.
bg = img.getpixel((60, 200))
panel = img.getpixel((520, 220))
print('tones', bg, panel)

try:
    font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 14)
    font_sm = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 12)
    font_b = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
except OSError:
    font = ImageFont.load_default()
    font_sm = font
    font_b = font

text = (232, 234, 238)
mute = (148, 154, 166)
accent = (130, 190, 255)
sel = (46, 52, 66)


def box(x0, y0, x1, y1, color):
    draw.rectangle((x0, y0, x1, y1), fill=color)


# Cover the whole left content column under "Programa" through the macro list.
# Measured against the real 1120x740 XoMacro capture.
box(24, 108, 448, 330, bg)

# Programa label stays in chrome above; rewrite value field.
box(24, 108, 448, 150, bg)
draw.text((32, 118), 'Programa', font=font_sm, fill=mute)
box(32, 138, 440, 164, sel)
draw.text((42, 143), 'explorer.exe — (salvo)', font=font, fill=text)

# Macro table header + single demo row
draw.text((36, 178), 'Macros', font=font_sm, fill=mute)
headers = [(40, 198, 'Nome'), (250, 198, 'Duração'), (320, 198, 'Eventos'), (380, 198, 'Atalho')]
for x, y, label in headers:
    draw.text((x, y), label, font=font_sm, fill=mute)

box(32, 218, 440, 248, sel)
draw.text((40, 224), 'Rotina da manhã', font=font_b, fill=text)
draw.text((250, 225), '3,05s', font=font_sm, fill=mute)
draw.text((330, 225), '8', font=font_sm, fill=mute)
draw.text((380, 225), 'F8', font=font_sm, fill=accent)

# Trigger / interval block often shows Lateral 4 — rewrite
box(24, 340, 448, 430, bg)
draw.text((36, 348), 'Programa e botão', font=font_sm, fill=mute)
draw.text((36, 372), 'Trigger', font=font_sm, fill=mute)
box(100, 368, 220, 394, sel)
draw.text((110, 374), 'F8', font=font, fill=text)
draw.text((240, 374), 'Intervalo', font=font_sm, fill=mute)
box(300, 368, 380, 394, sel)
draw.text((310, 374), '1 ms', font=font, fill=text)
draw.text((36, 408), '☑  Repetir enquanto eu seguro', font=font_sm, fill=text)

# Right steps panel
box(464, 108, 1095, 640, panel)
draw.text((480, 120), 'Passos', font=font_sm, fill=mute)
for x, label in [(480, '#'), (520, 'Ação'), (820, 'Segurar'), (940, 'Depois'), (1040, 'Ciclo')]:
    draw.text((x, 148), label, font=font_sm, fill=mute)

steps = [
    ('1', 'Win + D', '80 ms', '300 ms'),
    ('2', 'Win + 1', '80 ms', '400 ms'),
    ('3', 'Esperar 500 ms', '—', '—'),
    ('4', 'Digitar: bom dia — checklist', '—', '250 ms'),
    ('5', 'Enter', '60 ms', '200 ms'),
    ('6', 'Ctrl + T', '60 ms', '250 ms'),
    ('7', 'Digitar: calendar.google.com', '—', '200 ms'),
    ('8', 'Enter', '60 ms', '300 ms'),
]
y = 176
for num, action, hold, after in steps:
    row = sel if int(num) % 2 else panel
    box(472, y - 4, 1088, y + 24, row)
    draw.text((484, y), num, font=font_sm, fill=mute)
    draw.text((520, y), action, font=font, fill=text)
    draw.text((820, y), hold, font=font_sm, fill=mute)
    draw.text((940, y), after, font=font_sm, fill=mute)
    draw.text((1048, y), '—', font=font_sm, fill=mute)
    y += 32

# Bottom status
box(200, 668, 560, 698, bg)
draw.text((210, 676), 'Macro desligado: Rotina da manhã', font=font_sm, fill=mute)

out = root / 'xomacro.png'
img.save(out, optimize=True)
print('saved', out)
