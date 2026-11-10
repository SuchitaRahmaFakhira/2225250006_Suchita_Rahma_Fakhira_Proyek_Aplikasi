"""Membuat ikon PWA PolaKu (PNG) dengan Python + Pillow.

Jalankan dari folder proyek:
    backend\\.venv\\Scripts\\python tools\\buat_ikon.py
Hasil: frontend/public/icons/*.png
"""
import os

from PIL import Image, ImageDraw, ImageFont

UNGU = (108, 92, 231)
UNGU_MUDA = (143, 130, 240)
PUTIH = (255, 255, 255)
FOLDER = os.path.join(os.path.dirname(__file__), "..", "frontend", "public", "icons")


def cari_font(ukuran):
    for nama in ("arialbd.ttf", "seguisb.ttf", "DejaVuSans-Bold.ttf", "Arial Bold.ttf"):
        try:
            return ImageFont.truetype(nama, ukuran)
        except OSError:
            continue
    return ImageFont.load_default(ukuran)


def gambar_ikon(ukuran, maskable=False, sudut_bulat=True):
    skala = 4  # gambar lebih besar lalu dikecilkan agar halus
    s = ukuran * skala
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    if maskable or not sudut_bulat:
        d.rectangle([0, 0, s, s], fill=UNGU)
    else:
        d.rounded_rectangle([0, 0, s - 1, s - 1], radius=int(s * 0.22), fill=UNGU)

    # Area aman: ikon maskable perlu margin ±20% agar tidak terpotong.
    aman = 0.62 if maskable else 0.78
    kotak = s * aman / 2.2
    jarak = kotak * 0.2
    font = cari_font(int(kotak * 0.62))
    pusat_x, pusat_y = s / 2, s / 2

    posisi = [  # kubus 1 dan 2 di atas, 3 di bawah (seperti ilustrasi Beranda)
        ("1", pusat_x - kotak - jarak / 2, pusat_y - kotak - jarak / 2, PUTIH, UNGU),
        ("2", pusat_x + jarak / 2, pusat_y - kotak - jarak / 2, UNGU_MUDA, PUTIH),
        ("3", pusat_x - kotak / 2, pusat_y + jarak / 2, PUTIH, UNGU),
    ]
    for teks, x, y, latar, warna_teks in posisi:
        d.rounded_rectangle([x, y, x + kotak, y + kotak], radius=int(kotak * 0.22), fill=latar)
        d.text((x + kotak / 2, y + kotak / 2), teks, font=font, fill=warna_teks, anchor="mm")

    return img.resize((ukuran, ukuran), Image.LANCZOS)


def main():
    os.makedirs(FOLDER, exist_ok=True)
    keluaran = {
        "icon-192.png": gambar_ikon(192),
        "icon-512.png": gambar_ikon(512),
        "icon-maskable-512.png": gambar_ikon(512, maskable=True),
        "apple-touch-icon.png": gambar_ikon(180, sudut_bulat=False),
        "favicon-32.png": gambar_ikon(32),
    }
    for nama, img in keluaran.items():
        jalur = os.path.join(FOLDER, nama)
        img.save(jalur)
        print("Dibuat:", os.path.normpath(jalur))


if __name__ == "__main__":
    main()
