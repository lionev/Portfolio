"""Draw a clean XoMacro portfolio demo shot (no capture artifacts)."""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

root = Path(r'C:\Users\XoD\Documents\www\Portfolio\public\shots')

W, H = 1280, 820
bg = (12, 12, 16)
surface = (22, 22, 28)
header = (28, 28, 36)
border = (48, 48, 58)
text = (244, 244, 245)
muted = (161, 161, 170)
accent = (129, 140, 248)
selected = (72, 82, 148)
button = (44, 44, 56)
button_border = (92, 92, 110)
ok = (52, 211, 153)

img = Image.new('RGB', (W, H), bg)
d = ImageDraw.Draw(img)

try:
    font_title = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 28)
    font = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 14)
    font_sm = ImageFont.truetype('C:/Windows/Fonts/segoeui.ttf', 12)
    font_b = ImageFont.truetype('C:/Windows/Fonts/segoeuib.ttf', 14)
except OSError:
    font_title = font = font_sm = font_b = ImageFont.load_default()


def round_rect(xy, radius, fill, outline=None, width=1):
    d.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


# Top bar
d.rectangle((0, 0, W, 64), fill=header)
d.line((0, 64, W, 64), fill=border)
d.text((18, 14), 'XoMacro', font=font_title, fill=text)
round_rect((148, 22, 188, 42), 10, (58, 66, 118))
d.text((156, 24), 'v65', font=font_sm, fill=(199, 210, 254))
d.text((210, 24), 'Segure o Trigger na janela em que quiser reproduzir. Solte para parar.', font=font_sm, fill=muted)
round_rect((980, 18, 1060, 46), 14, button, button_border)
d.text((1000, 24), 'Escuro', font=font_sm, fill=text)
d.text((1080, 24), '☑  Marca d’água', font=font_sm, fill=muted)

# Left panel
round_rect((16, 80, 400, 720), 14, surface, border)
d.text((32, 96), 'Programa', font=font_sm, fill=muted)
round_rect((32, 116, 384, 148), 10, header, border)
d.text((44, 124), 'explorer.exe — (salvo)', font=font, fill=text)

d.text((32, 168), 'Macros', font=font_sm, fill=muted)
for i, label in enumerate(['Nome', 'Duração', 'Eventos', 'Atalho']):
    d.text((40 + i * 88, 190), label, font=font_sm, fill=muted)
d.line((32, 210, 384, 210), fill=border)
round_rect((32, 218, 384, 250), 8, selected)
d.text((44, 226), 'Rotina da manhã', font=font_b, fill=text)
d.text((200, 227), '3,05s', font=font_sm, fill=(220, 220, 230))
d.text((280, 227), '8', font=font_sm, fill=(220, 220, 230))
d.text((340, 227), 'F8', font=font_sm, fill=(165, 180, 252))

d.text((32, 280), 'Programa e botão', font=font_sm, fill=muted)
d.text((32, 308), 'Trigger', font=font_sm, fill=muted)
d.text((210, 308), 'Intervalo', font=font_sm, fill=muted)
round_rect((32, 328, 180, 360), 10, header, border)
d.text((44, 336), 'F8', font=font, fill=text)
round_rect((210, 328, 384, 360), 10, header, border)
d.text((222, 336), '250 ms', font=font, fill=text)
d.text((32, 384), '☑  Por etapa (continuar de onde parei)', font=font_sm, fill=text)
d.text((32, 414), '☐  Macro ativo', font=font_sm, fill=muted)

for i, label in enumerate(['Novo', 'Renomear', 'Excluir', 'Importar']):
    x0 = 32 + i * 90
    round_rect((x0, 460, x0 + 82, 492), 10, button, button_border)
    d.text((x0 + 14, 468), label, font=font_sm, fill=text)

# Right panel
round_rect((420, 80, 1264, 720), 14, surface, border)
d.text((440, 96), 'Passos', font=font_sm, fill=muted)
headers = [(440, '#'), (480, 'Ação'), (860, 'Segurar'), (1000, 'Depois'), (1140, 'Ciclo')]
for x, label in headers:
    d.text((x, 124), label, font=font_sm, fill=muted)
d.line((440, 148, 1244, 148), fill=border)

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
y = 160
for num, action, hold, after in steps:
    fill = header if int(num) % 2 else surface
    round_rect((440, y, 1244, y + 34), 6, fill)
    d.text((448, y + 8), num, font=font_sm, fill=muted)
    d.text((480, y + 8), action, font=font, fill=text)
    d.text((860, y + 8), hold, font=font_sm, fill=muted)
    d.text((1000, y + 8), after, font=font_sm, fill=muted)
    d.text((1148, y + 8), '—', font=font_sm, fill=muted)
    y += 40

for i, label in enumerate(['+ Passo', 'Editar', 'Remover']):
    x0 = 440 + i * 110
    round_rect((x0, 520, x0 + 96, 552), 10, button, button_border)
    d.text((x0 + 18, 528), label, font=font_sm, fill=text)

# Bottom bar
d.rectangle((0, 740, W, H), fill=surface)
d.line((0, 740, W, 740), fill=border)
round_rect((18, 758, 140, 796), 10, ok)
d.text((40, 768), 'Reproduzir', font=font_b, fill=(5, 46, 28))
round_rect((152, 758, 240, 796), 10, button, button_border)
d.text((174, 768), 'Parar', font=font_b, fill=text)
d.text((260, 770), 'Macro desligado: Rotina da manhã', font=font_sm, fill=muted)
d.text((860, 770), '☑  Loop infinito', font=font_sm, fill=muted)
d.text((1020, 770), 'Velocidade', font=font_sm, fill=muted)
round_rect((1110, 776, 1210, 786), 4, border)
round_rect((1110, 776, 1160, 786), 4, accent)
d.text((1220, 770), '1,00×', font=font_b, fill=text)

demo = root / 'xomacro-demo.png'
img.save(demo, optimize=True)
img.save(root / 'xomacro.png', optimize=True)

# Horizontal framed version
out_w, out_h = 1600, 900
canvas = Image.new('RGB', (out_w, out_h), (12, 14, 18))
scale = min(out_w / W, out_h / H) * 0.94
nw, nh = int(W * scale), int(H * scale)
hero = img.resize((nw, nh), Image.Resampling.LANCZOS)
canvas.paste(hero, ((out_w - nw) // 2, (out_h - nh) // 2))
land = root / 'xomacro-landscape.png'
canvas.save(land, optimize=True)
print('saved', demo, img.size, 'and', land, canvas.size)
