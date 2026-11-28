"""Gera o logo da Arcanos com fundo transparente a partir da arte do PDF comercial.

A arte é clara (prata e ouro) sobre um fundo quase preto. Para cada pixel, a opacidade
é o quanto ele se afasta do fundo; a cor é "descomposta" desse fundo. Recompor sobre
um fundo escuro devolve a arte original, sem a caixa preta em volta.
"""
import sys
import numpy as np
from PIL import Image

src, out_dir = sys.argv[1], sys.argv[2]
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float64)
bg = np.median(np.concatenate([im[:12, :12].reshape(-1, 3), im[:12, -12:].reshape(-1, 3),
                               im[-12:, :12].reshape(-1, 3), im[-12:, -12:].reshape(-1, 3)]), axis=0)

den = np.maximum(255.0 - bg, 1.0)
a = np.clip(((im - bg) / den).max(axis=2), 0.0, 1.0)
a = np.where(a < 0.035, 0.0, a)                     # ruído do fundo (vinheta) vira transparente
a = np.clip((a - 0.035) / (1 - 0.035), 0.0, 1.0)
safe = np.maximum(a, 1e-6)[..., None]
fg = np.clip(bg + (im - bg) / safe, 0, 255)
rgba = np.dstack([fg, a * 255]).astype(np.uint8)
art = Image.fromarray(rgba, "RGBA")


def recorte(box):
    return art.crop(box)


# Faixas medidas na arte (855x451): símbolo y 28-275, nome y 313-369, slogan y 405-438.
simbolo = recorte((280, 10, 585, 285))
nome_slogan = recorte((20, 303, 850, 445))
vertical = recorte((20, 10, 850, 445))

vertical.save(f"{out_dir}/arcanos-logo-vertical.png", optimize=True)

# Horizontal: símbolo à esquerda, nome sobre o slogan à direita.
alvo_h = 220
s = simbolo.resize((round(simbolo.width * alvo_h / simbolo.height), alvo_h), Image.LANCZOS)
gap = 26
w = s.width + gap + nome_slogan.width
h = max(s.height, nome_slogan.height)
canvas = Image.new("RGBA", (w, h), (0, 0, 0, 0))
canvas.paste(s, (0, (h - s.height) // 2), s)
canvas.paste(nome_slogan, (s.width + gap, (h - nome_slogan.height) // 2), nome_slogan)
canvas.save(f"{out_dir}/arcanos-logo-horizontal.png", optimize=True)

print("fundo", bg.round(1), "vertical", vertical.size, "horizontal", canvas.size)
