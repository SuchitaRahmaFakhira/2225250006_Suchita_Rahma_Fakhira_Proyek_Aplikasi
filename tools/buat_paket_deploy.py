"""Membuat paket ZIP siap unggah ke PythonAnywhere.

Jalankan dari folder proyek SETELAH `npm run build` di folder frontend:
    backend\\.venv\\Scripts\\python tools\\buat_paket_deploy.py

Hasil: polaku-deploy.zip berisi
    polaku/backend/...        (kode Python, tanpa .venv, database, dan .env)
    polaku/frontend/dist/...  (hasil build PWA)
"""
import os
import sys
import zipfile

AKAR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
KELUARAN = os.path.join(AKAR, "polaku-deploy.zip")

DILEWATI_FOLDER = {".venv", "instance", "__pycache__", ".pytest_cache", "tests"}
DILEWATI_FILE = {".env"}


def tambah_folder(zf, sumber, tujuan):
    for akar, folder, berkas in os.walk(sumber):
        folder[:] = [f for f in folder if f not in DILEWATI_FOLDER]
        for nama in berkas:
            if nama in DILEWATI_FILE or nama.endswith(".pyc"):
                continue
            jalur = os.path.join(akar, nama)
            relatif = os.path.relpath(jalur, sumber)
            zf.write(jalur, os.path.join(tujuan, relatif).replace(os.sep, "/"))


def main():
    dist = os.path.join(AKAR, "frontend", "dist")
    if not os.path.isfile(os.path.join(dist, "index.html")):
        sys.exit("frontend/dist belum ada. Jalankan dulu: cd frontend && npm run build")
    with zipfile.ZipFile(KELUARAN, "w", zipfile.ZIP_DEFLATED) as zf:
        tambah_folder(zf, os.path.join(AKAR, "backend"), "polaku/backend")
        tambah_folder(zf, dist, "polaku/frontend/dist")
    print(f"Paket dibuat: {KELUARAN} ({os.path.getsize(KELUARAN) // 1024} KB)")


if __name__ == "__main__":
    main()
