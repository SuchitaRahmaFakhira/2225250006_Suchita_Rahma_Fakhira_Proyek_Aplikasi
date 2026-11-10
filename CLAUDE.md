# CLAUDE.md — Panduan Proyek "PolaKu: Pola Bilangan Ganjil–Genap"

File ini adalah panduan utama untuk AI asisten (Claude) dan pengembang yang bekerja di proyek ini. **Baca file ini sebelum menulis kode.**

## 1. Ringkasan Proyek
- **Apa:** Aplikasi web pembelajaran matematika berbentuk **PWA (Progressive Web App)**. Bisa dibuka di smartphone dan browser, dan bisa **di-install ke layar utama HP tanpa Play Store/App Store**.
- **Bahasa pemrograman:** **JavaScript** (frontend: React + Vite) dan **Python** (backend: Flask + SQLite).
- **Materi:** Pola bilangan ganjil dan genap — SMP kelas VIII (Un, Sn, soal konteks).
- **Tujuan pedagogis:** Mengelola *cognitive load* siswa (menurunkan *extraneous load*, mengelola *intrinsic load*, mendorong *germane load*) agar kemampuan **literasi matematika** siswa meningkat.
- **Model pengembangan:** ADDIE. Analysis = wawancara siswa (lihat `docs/ANALISIS.md`). Dokumen di folder `docs/` = tahap Design.
- **Pengembang:** Suchita Rahma Fakhira (NIM 2225250006), mata kuliah Algoritma dan Pemrograman, dosen Dr. Aan Hendrayana, S.Si., M.Pd.

## 2. Dokumen Rujukan (wajib dibaca sesuai kebutuhan)
| File | Isi | Kapan dibaca |
|---|---|---|
| `docs/ANALISIS.md` | Ringkasan hasil wawancara & implikasinya | Saat ragu *mengapa* sebuah fitur ada |
| `docs/PRD.md` | Kebutuhan produk, fitur, prioritas, kriteria penerimaan | Sebelum membuat/ubah fitur |
| `docs/ARSITEKTUR.md` | Arsitektur Python + JavaScript, API, database, PWA | Sebelum menyentuh backend, API, atau PWA |
| `docs/DEPLOY.md` | Link sementara (Cloudflare Tunnel) & permanen (PythonAnywhere); `tools/buat_paket_deploy.py` | Saat menerbitkan/memperbarui versi online |
| `docs/DESAIN.md` | Prinsip CLT, alur layar, wireframe, design system (token warna, font, komponen) | Sebelum membuat UI/komponen |
| `docs/mockup/mockup-v1.jpg` | **Mockup tampilan dari Suchita — acuan visual utama** | Sebelum membuat UI/komponen |
| `docs/KONTEN.md` | Naskah materi, contoh soal, templat soal, miskonsepsi, teks UI | Saat mengisi data materi/soal/teks |

## 3. Tech Stack
### Frontend — JavaScript
- **React 18 + Vite** (JavaScript, bukan TypeScript — agar mudah dipahami pemula).
- **PWA:** `vite-plugin-pwa` (manifest + service worker Workbox) → bisa di-install & dipakai offline.
- **Routing:** `react-router-dom` (HashRouter — tidak perlu konfigurasi rute di server).
- **Styling:** CSS biasa + CSS variables (token di `frontend/src/styles/tokens.css`, nilainya dari `docs/DESAIN.md` bagian 4). Tanpa framework UI berat.
- **Font:** Plus Jakarta Sans (Google Fonts, di-cache service worker), fallback `system-ui`.
- **Ikon:** `lucide-react`.
- **Tampilan:** gaya mockup — latar lavender lembut, kartu putih radius 16 px, warna utama ungu `#6C5CE7`, tombol berbentuk pil, ikon menu dalam kotak pastel, **bottom nav 4 tab** (Beranda, Materi, Nilai, Pengaturan).
- **Notasi matematika:** teks/HTML biasa (`U<sub>n</sub> = 2n − 1`). Tanpa MathJax.

### Backend — Python
- **Python 3.11+ dengan Flask**; database **SQLite** (modul `sqlite3` bawaan).
- Tugas: mendaftarkan siswa (cukup nama panggilan), menyimpan hasil latihan/evaluasi/angket, menyajikan bank soal evaluasi, halaman rekap guru + unduh CSV, dan menyajikan hasil build frontend.
- Pengujian: `pytest` (`requirements-dev.txt`). Tanpa CORS: saat pengembangan, Vite mem-proxy `/api` & `/guru` ke Flask; saat produksi satu domain.
- `tools/buat_ikon.py` (Python + Pillow) membuat ikon PWA ke `frontend/public/icons/`.

### Identitas & Penyimpanan
- **Terbuka untuk semua orang:** tanpa kode kelas, tanpa password. Identitas = **nama panggilan** + ID acak dari server. Disimpan di HP setelah pertama kali masuk.
- Halaman rekap `/guru` dilindungi satu kunci: variabel lingkungan `KUNCI_GURU` (file `backend/.env`).
- Progres & nilai disimpan **di HP dulu** (`localStorage`, antrean sinkron), lalu dikirim ke server Python saat online.

### Deploy
- **PythonAnywhere** (gratis, HTTPS bawaan — HTTPS wajib untuk PWA). Satu server Flask menyajikan frontend + API di domain yang sama. Siswa membuka URL/QR code → "Pasang aplikasi".

## 4. Perintah
```bash
# Backend (Python) — dari folder backend/
python -m venv .venv
.venv\Scripts\activate            # Windows  (macOS/Linux: source .venv/bin/activate)
pip install -r requirements-dev.txt
copy .env.example .env            # isi SECRET_KEY & KUNCI_GURU
flask --app app init-db           # buat database
flask --app app run --debug       # http://localhost:5000
pytest                            # uji backend

# Frontend (JavaScript) — dari folder frontend/
npm install
npm run dev                       # http://localhost:5173 (proxy /api → localhost:5000)
npm run dev -- --host             # buka dari HP di jaringan Wi-Fi yang sama (tanpa PWA)
npm run build                     # hasil ke frontend/dist → disajikan oleh Flask
npm run test                      # uji logika JS (vitest)
```
**Catatan uji di HP:** service worker/install PWA hanya aktif di **HTTPS** atau `localhost`. Uji fitur install pada URL HTTPS hasil deploy (PythonAnywhere).

## 5. Struktur Folder (ringkas — detail di `docs/ARSITEKTUR.md`)
```
/
├─ CLAUDE.md
├─ docs/                      # dokumen perencanaan (ADDIE: Analysis & Design)
├─ frontend/                  # JavaScript (React + Vite + PWA)
│  ├─ public/                 # ikon PWA (192, 512, maskable)
│  ├─ src/
│  │  ├─ pages/               # Masuk, Beranda, Materi, Kalkulator, Generator, Latihan,
│  │  │                       # Evaluasi, HasilBelajar, Pengaturan, PetunjukPasang
│  │  ├─ components/          # BottomNav, HeaderHalaman, KartuMenu, TombolUtama, KotakSuku, ...
│  │  ├─ logic/               # rumus.js, generatorSoal.js, penilaian.js, progres.js, api.js, pasang.js
│  │  ├─ data/                # materi.js, contohSoal.js, templatSoal.js, miskonsepsi.js
│  │  └─ styles/              # tokens.css, global.css
│  ├─ vite.config.js          # termasuk konfigurasi PWA & proxy /api
│  └─ package.json
└─ backend/                   # Python (Flask + SQLite)
   ├─ app.py                  # create_app, sajikan frontend/dist, perintah init-db
   ├─ db.py                   # koneksi & skema SQLite
   ├─ routes/api.py           # /api/...
   ├─ routes/guru.py          # /guru (rekap + CSV)
   ├─ templates/guru.html
   ├─ data/bank_soal_evaluasi.json
   ├─ tests/
   └─ requirements.txt
```

## 6. Aturan Desain yang TIDAK BOLEH dilanggar (berasal dari wawancara)
1. **Teks singkat:** maksimal 2–3 kalimat per blok penjelasan; satu konsep per layar (EL03, DS03).
2. **Siswa yang mengatur tempo:** penjelasan langkah demi langkah dengan tombol "Langkah berikutnya"; selalu bisa kembali/ulang (EL01, EL04).
3. **Urutan materi tetap:** konsep ganjil–genap → rumus → contoh soal → latihan (DS02).
4. **Animasi minimal:** hanya transisi halus ≤ 200 ms; tanpa animasi dekoratif, tanpa suara otomatis (DS03).
5. **Ikuti mockup & token warna:** warna utama ungu lembut, latar pastel lavender, tidak terlalu terang. Warna bermakna: **genap = ungu, ganjil = biru**, selalu disertai label teks (EL02, DS03). Jangan memakai warna di luar token `DESAIN.md`.
6. **Rumus selalu bisa diakses** lewat tombol "Kartu Rumus" (IL01: siswa lupa/tertukar rumus).
7. **Umpan balik menjelaskan, bukan sekadar "Salah"** — sebutkan jenis kesalahannya (GL03).
8. **Angka besar dipecah langkahnya** (substitusi → kali → kurang/tambah) (IL04, EL05).
9. **Hindari *split attention*:** rumus, gambar, dan langkah yang berkaitan diletakkan berdekatan dalam satu layar.
10. **Ilustrasi hanya di Beranda** (kubus angka 1-2-3, statis). Hiasan "sparkle" di mockup dibuat statis atau dihilangkan.

## 7. Aturan Arsitektur
1. **Offline-first:** materi, Kalkulator, Generator, dan Latihan **wajib tetap berjalan tanpa internet**. Jangan membuat fitur belajar yang bergantung pada server.
2. **Logika matematika ada di JavaScript** (`frontend/src/logic/`) agar bisa offline. Python **hanya memvalidasi dan menyimpan** data, serta menyajikan bank soal evaluasi (yang juga di-cache untuk offline).
3. **Semua panggilan API lewat satu modul** `frontend/src/logic/api.js` yang memakai antrean: simpan ke `localStorage` → kirim saat online → hapus dari antrean jika berhasil.
4. **Akses terbuka & privasi:** jangan menambahkan kode kelas atau login. Hanya nama panggilan + hasil belajar yang dikirim ke server. Jangan meminta email, nomor HP, atau password.
5. Endpoint baru harus didokumentasikan di `docs/ARSITEKTUR.md` dan diuji dengan `pytest`.
6. Rahasia (`KUNCI_GURU`, `SECRET_KEY`) disimpan di variabel lingkungan / file `.env` yang tidak di-commit.

## 8. Konvensi Kode
- Semua teks yang tampil di UI menggunakan **Bahasa Indonesia** yang sederhana untuk siswa SMP.
- **JavaScript:** komponen PascalCase (`TabelPola.jsx`); fungsi/variabel camelCase berbahasa Indonesia (`hitungUn`, `buatSoal`); satu file satu komponen; akses `localStorage` selalu dibungkus `try/catch`.
- **Python:** PEP 8; fungsi/variabel snake_case (`simpan_hasil`); query SQL selalu memakai parameter `?` (bukan f-string) untuk mencegah SQL injection; respons API berformat JSON `{ "ok": true, ... }` atau `{ "ok": false, "pesan": "..." }`.
- Desain mobile-first: uji pada lebar **360 px**; tombol minimal **44×44 px**.
- Rumus wajib benar (cek ulang dengan `docs/KONTEN.md`):
  - Genap: `Un = 2n`, `Sn = n(n + 1)`
  - Ganjil: `Un = 2n − 1`, `Sn = n²`

## 9. Definisi "Selesai" untuk setiap fitur
- Memenuhi kriteria penerimaan di `docs/PRD.md`.
- Tampil baik di lebar 360 px dan desktop; konsisten dengan mockup (`docs/mockup/mockup-v1.jpg`).
- Tidak melanggar aturan pada bagian 6 dan 7.
- Fitur belajar tetap berjalan dalam mode pesawat (offline).
- Fungsi di `frontend/src/logic/` sudah dicoba dengan beberapa nilai n (kecil dan besar); endpoint Python lolos `pytest`.
