# DEPLOY — Membuat PolaKu Bisa Diakses Umum

Ada dua cara:

| Cara | Kegunaan | Alamat | Hidup selama |
|---|---|---|---|
| **A. Cloudflare Tunnel** (sementara) | Mencoba cepat di HP/teman, demo di kelas | `https://<acak>.trycloudflare.com` (berubah tiap dijalankan) | Laptop menyala & terminal tunnel terbuka |
| **B. PythonAnywhere** (permanen) | Dipakai siswa sungguhan | `https://SuchitaRahmaFakhira.pythonanywhere.com` (tetap) | 24 jam (server di internet) |

Keduanya memakai **HTTPS**, jadi bisa dibuka di Chrome, Safari, Firefox, Edge, Samsung Internet, dan bisa **di-install sebagai aplikasi** (PWA).

---

## A. Link Sementara — Cloudflare Tunnel (tanpa akun)

1. Terminal 1 — jalankan server Python dari folder `backend/` (pastikan `frontend/dist` sudah di-build):
   ```bash
   .venv\Scripts\flask --app app run --port 5000
   ```
2. Terminal 2 — buka tunnel:
   ```bash
   cloudflared tunnel --url http://localhost:5000
   ```
3. Salin alamat `https://….trycloudflare.com` yang muncul, lalu bagikan.
4. Selesai memakai: tutup kedua terminal (link otomatis mati).

> Catatan: link Cloudflare gratis ini untuk uji coba, bukan untuk dipakai siswa jangka panjang.

---

## B. Link Permanen — PythonAnywhere (gratis)

### 1. Siapkan paket di laptop
```bash
cd frontend
npm run build
cd ..
backend\.venv\Scripts\python tools\buat_paket_deploy.py
```
Hasilnya file **`polaku-deploy.zip`** di folder proyek.

### 2. Buat akun
Daftar di **https://www.pythonanywhere.com** → *Pricing & signup* → **Create a Beginner account** (gratis).
Nama pengguna (username) akan menjadi alamat aplikasi: `https://<username>.pythonanywhere.com`.

### 3. Unggah & ekstrak
1. Menu **Files** → tombol **Upload a file** → pilih `polaku-deploy.zip`.
2. Menu **Consoles** → **Bash**, lalu jalankan:
   ```bash
   unzip -o polaku-deploy.zip
   cd polaku/backend
   python3.11 -m venv .venv
   .venv/bin/pip install -r requirements.txt
   ```

### 4. Buat file rahasia `.env`
Masih di konsol Bash (ganti `KUNCI-ANDA` dengan kunci guru pilihan sendiri):
```bash
cat > .env <<EOF
SECRET_KEY=$(python3.11 -c "import secrets; print(secrets.token_hex(32))")
KUNCI_GURU=KUNCI-ANDA
EOF
.venv/bin/flask --app app init-db
```

### 5. Buat Web App
1. Menu **Web** → **Add a new web app** → *Next* → pilih **Manual configuration** → **Python 3.11** → *Next*.
2. Bagian **Virtualenv**: isi `/home/<username>/polaku/backend/.venv`
3. Bagian **Code** → klik tautan **WSGI configuration file**, **hapus semua isinya**, ganti dengan:
   ```python
   import sys
   jalur = "/home/<username>/polaku/backend"
   if jalur not in sys.path:
       sys.path.insert(0, jalur)
   from wsgi import application
   ```
   (ganti `<username>`), lalu **Save**.
4. Bagian **Security** → aktifkan **Force HTTPS**.
5. Klik tombol hijau **Reload** di bagian atas.

### 6. Uji
- Buka `https://<username>.pythonanywhere.com` di Chrome/Safari HP → isi nama → belajar.
- Pasang aplikasi: Android (Chrome) → tombol **Pasang Sekarang**; iPhone (Safari) → **Bagikan → Tambahkan ke Layar Utama**.
- Rekap guru: `https://<username>.pythonanywhere.com/guru` → masukkan `KUNCI_GURU`.
- Bagikan link (atau QR code dari link tersebut) ke siswa.

### 7. Memperbarui aplikasi
Ulangi langkah 1 dan 3 (`unzip -o` menimpa file lama; database `instance/` dan `.env` **tidak** ikut tertimpa karena tidak ada di paket), lalu klik **Reload** di menu Web.

### Catatan akun gratis
- Masuk ke PythonAnywhere minimal sekali per 3 bulan dan klik **Run until 3 months from today** di menu Web agar aplikasi tidak dinonaktifkan.
- Akun gratis cukup untuk satu aplikasi dan puluhan siswa sekaligus.
