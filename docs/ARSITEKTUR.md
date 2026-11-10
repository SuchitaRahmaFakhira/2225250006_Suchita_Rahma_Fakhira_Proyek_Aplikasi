# ARSITEKTUR — Python (Flask) + JavaScript (React) sebagai PWA

## 1. Gambaran Umum
```
 HP siswa (Chrome Android / Safari iOS) · Laptop (Chrome/Edge)
 ┌──────────────────────────────────────────────┐
 │  PolaKu (PWA, ter-install di layar utama)    │
 │  JavaScript: React + Vite                    │
 │  ├─ Tampilan, materi, Kalkulator, Generator  │
 │  ├─ Generator soal & penilaian (offline)     │
 │  ├─ Service worker → cache aplikasi          │
 │  └─ localStorage → progres + antrean sinkron │
 └───────────────┬──────────────────────────────┘
                 │ HTTPS (saat online)
                 ▼
 ┌──────────────────────────────────────────────┐
 │  Server Python: Flask  (PythonAnywhere)      │
 │  ├─ "/"          → file build React (PWA)    │
 │  ├─ "/api/..."   → REST API JSON             │
 │  ├─ "/guru"      → rekap guru + unduh CSV    │
 │  └─ SQLite: data.db                          │
 └──────────────────────────────────────────────┘
```

### Pembagian peran
| Bagian | Bahasa | Tanggung jawab |
|---|---|---|
| Frontend | **JavaScript** (React) | Semua tampilan sesuai mockup; materi bertahap; Kalkulator & Generator; generator soal latihan; penilaian & umpan balik miskonsepsi; progres lokal; antrean sinkron; tombol "Pasang aplikasi" |
| Backend | **Python** (Flask) | Pendaftaran siswa (cukup nama panggilan, terbuka untuk semua); penyimpanan hasil latihan/evaluasi/angket; bank soal evaluasi (pre/post-test); rekap guru & CSV untuk analisis penelitian; menyajikan file PWA |
| Database | SQL (SQLite) | Data siswa (nama panggilan) dan hasil belajar |

**Alasan:** logika belajar diletakkan di JavaScript agar aplikasi tetap berjalan tanpa internet (persona: kuota terbatas). Python mengelola data bersama (semua pengguna) yang tidak mungkin disimpan di satu HP, dan menghasilkan data untuk tahap Evaluation ADDIE.

## 2. Struktur Folder
```
frontend/
├─ public/
│  ├─ icons/icon-192.png, icon-512.png, icon-maskable-512.png, apple-touch-icon.png
│  └─ petunjuk-ios.png                 # gambar langkah "Tambahkan ke Layar Utama"
├─ src/
│  ├─ main.jsx, App.jsx                # routing (HashRouter)
│  ├─ pages/                           # Masuk, Beranda, Materi, modul/, Kalkulator, Generator,
│  │                                   # Latihan, Evaluasi, HasilBelajar, Pengaturan, PetunjukPasang
│  ├─ components/                      # lihat DESAIN.md 4.5
│  ├─ logic/
│  │  ├─ rumus.js                      # hitungUn, hitungSn, jenisBilangan, bagiDua
│  │  ├─ generatorSoal.js              # buatSoal(tipe, level) + pengecoh
│  │  ├─ penilaian.js                  # periksaJawaban → {benar, kodeMiskonsepsi}
│  │  ├─ progres.js                    # baca/simpan progres (localStorage, try/catch)
│  │  ├─ api.js                        # fetch + antrean sinkron
│  │  └─ pasang.js                     # beforeinstallprompt, deteksi iOS & mode standalone
│  ├─ data/                            # materi.js, contohSoal.js, templatSoal.js, miskonsepsi.js
│  └─ styles/                          # tokens.css, global.css
├─ vite.config.js
└─ package.json

backend/
├─ app.py                              # create_app(); rute statis frontend; perintah CLI init-db
├─ db.py                               # get_db(), init_db(), skema
├─ routes/
│  ├─ api.py                           # Blueprint /api
│  └─ guru.py                          # Blueprint /guru
├─ templates/guru.html                 # Jinja, memakai token warna yang sama
├─ data/bank_soal_evaluasi.json        # soal pre/post-test versi A & B (KONTEN.md bagian 10)
├─ tests/test_api.py, test_guru.py
├─ requirements.txt                    # Flask, python-dotenv (produksi)
├─ requirements-dev.txt                # + pytest, Pillow (pengembangan)
├─ .env.example                        # SECRET_KEY=..., KUNCI_GURU_DEFAULT=...
└─ wsgi.py                             # titik masuk PythonAnywhere
```

## 3. Skema Database (SQLite)
```sql
-- Tidak ada tabel kelas: aplikasi terbuka untuk semua orang.
CREATE TABLE siswa (
  id              TEXT PRIMARY KEY,      -- UUID dibuat server (membedakan nama yang sama)
  nama_panggilan  TEXT NOT NULL,         -- maks 30 karakter
  dibuat          TEXT NOT NULL          -- ISO 8601
);

CREATE TABLE hasil (
  id                TEXT PRIMARY KEY,    -- UUID dibuat di HP (mencegah data ganda saat kirim ulang)
  siswa_id          TEXT NOT NULL REFERENCES siswa(id),
  jenis             TEXT NOT NULL CHECK (jenis IN ('latihan','evaluasi','angket','modul')),
  modul             TEXT,                -- mis. "latihan-un", "pretest-A", "modul-2"
  skor              INTEGER,
  maks              INTEGER,
  petunjuk_dipakai  INTEGER DEFAULT 0,
  detail_json       TEXT,                -- jawaban per soal, kode miskonsepsi, skor angket
  waktu             TEXT NOT NULL        -- waktu di HP saat dikerjakan
);
```

## 4. API (JSON)
Semua respons: `{"ok": true, ...}` atau `{"ok": false, "pesan": "..."}` dengan kode HTTP yang sesuai.

| Metode & Rute | Masukan | Keluaran | Catatan |
|---|---|---|---|
| `POST /api/siswa` | `{nama_panggilan}` | `{ok, siswa_id}` | Terbuka untuk semua; nama 1–30 karakter |
| `PUT /api/siswa/<id>` | `{nama_panggilan}` | `{ok}` | Ganti nama dari Pengaturan |
| `POST /api/hasil` | `{siswa_id, hasil: [ {id, jenis, modul, skor, maks, petunjuk_dipakai, detail, waktu}, ... ]}` | `{ok, diterima: n}` | Batch; `id` duplikat diabaikan (idempoten) |
| `GET /api/soal/evaluasi?versi=A` | – | `{ok, soal: [...]}` | Disajikan dan di-cache untuk offline; kunci jawaban ikut dikirim agar penilaian bisa offline (wajar untuk konteks kelas) |
| `GET /api/kesehatan` | – | `{ok: true}` | Cek koneksi untuk indikator sinkron |
| `GET /guru` | form kunci guru (`KUNCI_GURU` di `.env`) | halaman HTML | Rekap semua siswa |
| `GET /guru/rekap.csv` | sesi guru | file CSV | Untuk analisis (Excel/SPSS) |
| `GET /` dan file statis | – | `frontend/dist` | Termasuk `manifest.webmanifest` & `sw.js` |

## 5. Alur Data & Sinkronisasi Offline
```
Siswa menyelesaikan latihan
   → penilaian.js menilai langsung (offline)
   → progres.js menyimpan progres lokal
   → api.js menambahkan item ke antrean "polaku.antrean" (localStorage), id = crypto.randomUUID()
   → jika navigator.onLine: POST /api/hasil (batch)
        berhasil → hapus item dari antrean → indikator "Tersinkron ✓"
        gagal    → biarkan di antrean → indikator "Tersimpan di HP"
   → kirim ulang saat: aplikasi dibuka, event "online", atau setiap 60 detik saat terbuka
```
Saat pertama kali online, `api.js` mendaftarkan siswa (`POST /api/siswa`) untuk mendapat `siswa_id`, lalu mengirim antrean.

## 6. PWA — Install Tanpa Play Store/App Store
### 6.1 Manifest (`vite-plugin-pwa`)
```js
manifest: {
  name: 'PolaKu – Pola Bilangan Ganjil Genap',
  short_name: 'PolaKu',
  description: 'Belajar pola bilangan ganjil dan genap untuk SMP kelas VIII',
  lang: 'id',
  start_url: '/',
  scope: '/',
  display: 'standalone',
  orientation: 'portrait',
  theme_color: '#6C5CE7',
  background_color: '#F6F5FC',
  icons: [
    { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
    { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    { src: 'icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ]
}
```
Tambahan di `index.html`: `<link rel="apple-touch-icon">`, `<meta name="theme-color">`, `<meta name="apple-mobile-web-app-capable" content="yes">`.

### 6.2 Service Worker (Workbox via `vite-plugin-pwa`)
- `registerType: 'autoUpdate'`; pra-cache semua file build (HTML, JS, CSS, ikon, font).
- `GET /api/soal/evaluasi` → *StaleWhileRevalidate* (bisa dipakai offline).
- `POST /api/*` → tidak di-cache (ditangani antrean di `api.js`).
- Pemberitahuan kecil "Versi baru tersedia — muat ulang" saat ada pembaruan.

### 6.3 Cara Install
| Perangkat | Cara | Dukungan di aplikasi |
|---|---|---|
| Android (Chrome, Edge, Samsung Internet) | Tombol **"Pasang Aplikasi"** di Beranda → dialog bawaan browser → ikon PolaKu muncul di layar utama | `pasang.js` menangkap `beforeinstallprompt` dan memanggil `prompt()` |
| iPhone/iPad (Safari, iOS 16.4+) | **Bagikan ⬆ → Tambahkan ke Layar Utama** | Halaman `PetunjukPasang` bergambar (iOS tidak mendukung tombol otomatis) |
| Laptop (Chrome/Edge) | Ikon install di address bar atau tombol "Pasang Aplikasi" | Sama dengan Android |
- Kartu "Pasang Aplikasi" disembunyikan jika aplikasi sudah berjalan dalam mode standalone (`matchMedia('(display-mode: standalone)')`).
- Distribusi ke siswa: **URL + QR code** (dicetak/dibagikan di grup kelas). Tidak ada APK, tidak lewat Play Store/App Store.

## 7. Pengembangan Lokal
1. Terminal 1 — `backend/`: aktifkan venv → `flask --app app init-db` → `flask --app app run --debug` (port 5000).
2. Terminal 2 — `frontend/`: `npm run dev` (port 5173). `vite.config.js` mem-proxy `/api` dan `/guru` ke `http://localhost:5000`.
3. Uji tampilan di HP: `npm run dev -- --host`, buka `http://<IP-laptop>:5173` di HP (Wi-Fi sama). *Install PWA tidak tersedia di http — uji install setelah deploy.*
4. Uji PWA di laptop: `npm run build && npm run preview` → buka `http://localhost:4173` (localhost dianggap aman) → Lighthouse.

## 8. Deploy ke PythonAnywhere (gratis, HTTPS)
1. Buat akun → URL aplikasi: `https://<username>.pythonanywhere.com`.
2. Di laptop: `cd frontend && npm run build` → menghasilkan `frontend/dist`.
3. Unggah folder `backend/` dan `frontend/dist/` (via Git atau menu Files).
4. Di konsol Bash PythonAnywhere: buat virtualenv Python 3.11 → `pip install -r backend/requirements.txt` → buat `backend/.env` berisi `SECRET_KEY` dan `KUNCI_GURU` → `flask --app app init-db`.
5. Menu **Web** → *Add a new web app* → *Manual configuration (Python 3.11)* → atur file WSGI agar mengimpor `app` dari `backend/wsgi.py`; atur virtualenv; atur variabel lingkungan (`SECRET_KEY`, dsb.).
6. Aktifkan **Force HTTPS** → *Reload*.
7. Buka URL di HP → cek tombol "Pasang Aplikasi" → install → uji mode pesawat.
8. Buat QR code dari URL untuk dibagikan ke siswa.
Catatan: akun gratis PythonAnywhere perlu "diperpanjang" (klik tombol) setiap 3 bulan.

## 9. Keamanan & Privasi
- Aplikasi siswa terbuka untuk semua orang (tanpa kode kelas/login). Data pribadi minimal: hanya nama panggilan. Tidak ada email, nomor HP, atau password siswa.
- Rekap `/guru` dilindungi satu kunci (`KUNCI_GURU`, dibandingkan dengan `hmac.compare_digest`); jika kunci belum diatur, rekap terkunci.
- Halaman `/guru` memakai sesi Flask (cookie bertanda tangan `SECRET_KEY`).
- Validasi semua masukan di server (panjang nama, `jenis` yang diizinkan, skor 0–maks, ukuran batch maks 100).
- SQL selalu memakai parameter `?`.
- `SECRET_KEY` dan kunci guru dari variabel lingkungan; `.env` dan `data.db` tidak di-commit (`.gitignore`).
- Mode produksi: CORS dimatikan (frontend & API satu domain).

## 10. Pengujian
| Lapisan | Alat | Contoh |
|---|---|---|
| Logika JS | `vitest` | `hitungUn('ganjil', 100) === 199`, `hitungSn('genap', 10) === 110`, `bagiDua(17) → {hasil: 8, sisa: 1}`, deteksi miskonsepsi M1–M10 |
| API Python | `pytest` + Flask test client | daftar siswa (valid/kode salah/nama kosong), simpan hasil batch, id duplikat diabaikan, rekap CSV butuh kunci |
| PWA | Lighthouse | "Installable" lolos; berjalan offline |
| Manual | HP Android (+ iPhone bila ada) | install, mode pesawat, sinkron setelah online, tampilan 360 px |
