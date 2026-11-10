# DESAIN — Desain Instruksional & Antarmuka

**Acuan visual utama:** [`docs/mockup/mockup-v1.jpg`](mockup/mockup-v1.jpg) (4 layar: Beranda, Kalkulator Ganjil Genap, Generator Pola Bilangan, Latihan Soal). Semua layar lain dibuat dengan gaya yang sama.

## 1. Prinsip Desain Berbasis Cognitive Load Theory
| Prinsip CLT | Penerapan di aplikasi | Dasar wawancara |
|---|---|---|
| **Segmenting** (memecah materi) | Satu konsep per layar; tombol "Lanjut" | EL01, EL03 |
| **Pacing oleh siswa** | Tidak ada auto-play; siswa yang menekan lanjut/ulang | EL01, EL04 |
| **Pre-training** | Modul 1 mengulang kelipatan 2 dan ciri ganjil/genap sebelum rumus | IL03, DS02 |
| **Worked example** | Contoh soal lengkap sebelum latihan | GL01, Penutup 2 |
| **Fading / completion problem** | Contoh yang sebagian langkahnya dikosongkan | GL03 |
| **Signaling** (penanda) | Kode warna konsisten: genap = ungu, ganjil = biru, selalu dengan label | EL02 |
| **Hindari split attention** | Rumus, kotak suku, dan keterangan dalam satu kartu yang berdekatan (seperti Generator di mockup) | IL02 |
| **Hindari redundancy** | Tidak mengulang informasi yang sama dalam teks + gambar + suara | DS03 |
| **Coherence** | Ilustrasi hanya di Beranda (kubus angka, statis); tanpa maskot/musik | DS03 |
| **Isolated → interacting elements** | Un dulu, baru Sn; n kecil dulu, baru n besar | IL04, IL05 |
| **Self-explanation** | Prompt "Mengapa memakai rumus ini?" pada faded example | GL04 |
| **Alat bantu cek mandiri** | Kalkulator & Generator untuk memeriksa jawaban sendiri | GL02, GL05 |

**Keselarasan mockup dengan wawancara (DS03 "warna tidak terlalu terang, tidak terlalu banyak gambar/animasi"):**
- Ungu dipakai dengan saturasi sedang; latar tetap pastel lavender.
- Ilustrasi hanya di header Beranda dan ikon kecil di header halaman; semuanya statis.
- Garis "sparkle" dekoratif di mockup dibuat statis (tanpa animasi) atau dihilangkan.
- Transisi maksimal 200 ms.

## 2. Peta Layar & Navigasi
```
Pertama kali dibuka:  [Masuk] (cukup nama panggilan — tanpa kode kelas) → Beranda
                       (tanpa bottom nav; setelah masuk tidak ditampilkan lagi)

Bottom nav (selalu tampil):  [🏠 Beranda] [📖 Materi] [🏆 Nilai] [⚙ Pengaturan]

Beranda
 ├─ Indikator sinkron (☁) di pojok kanan atas
 ├─ Kartu "Pasang Aplikasi" (hanya jika belum ter-install; bisa ditutup) → dialog install / Petunjuk Pasang (iPhone)
 ├─ Banner "Ayo mulai belajar!" (→ lanjut ke posisi terakhir / Modul 1)
 └─ Menu Utama
     ├─ Materi ───────────────► daftar modul
     │                           ① Kenali Ganjil & Genap
     │                           ② Pola & Rumus Un
     │                           ③ Contoh Soal
     │                           ④ Jumlah Suku (Sn)   🔒 terbuka setelah Latihan Un
     ├─ Kalkulator Ganjil Genap
     ├─ Generator Pola Bilangan
     ├─ Latihan Soal ─────────► pilih: Latihan Un / Latihan Sn / Soal Konteks (P1)
     ├─ Evaluasi ─────────────► Pre-test / Post-test
     └─ Hasil Belajar  (= tab Nilai)

Pengaturan: profil (nama panggilan) · pasang aplikasi · mode gelap · ukuran huruf
            · status sinkron · reset progres · tentang aplikasi
Kartu Rumus: tombol 📘 di header halaman Materi & Latihan → bottom sheet

Halaman guru (terpisah, dirender Python/Flask, dibuka di browser):  /guru → Rekap Kelas → Unduh CSV
```
Setiap halaman selain Beranda memakai **HeaderHalaman**: tombol kembali (‹) di kiri, judul di tengah.

## 3. Wireframe (lebar HP 360 px)

### 3.1 Beranda (sesuai mockup)
```
┌──────────────────────────────┐
│ Pola Bilangan        ┌1┐┌2┐  │
│ Ganjil Genap          └3┘    │ ← ilustrasi kubus angka (statis)
│ Belajar, latihan, dan pahami │
│ pola bilangan dengan mudah!  │
│ ┌──────────────────────────┐ │
│ │ 💡 Ayo mulai belajar!  ⟩ │ │ ← BannerMulai (ungu muda)
│ │ Kenali konsep bilangan…  │ │   jika ada progres: "Lanjutkan: Modul 2"
│ └──────────────────────────┘ │
│ Menu Utama                   │
│ ┌──────────────────────────┐ │
│ │[📖] Materi             ⟩ │ │ ← KartuMenu, ikon kotak biru pastel
│ │     Pelajari konsep dasar│ │
│ └──────────────────────────┘ │
│ [🧮] Kalkulator Ganjil Genap⟩│ ← biru
│ [▦ ] Generator Pola Bilangan⟩│ ← hijau
│ [▦ ] Latihan Soal          ⟩ │ ← kuning
│ [🏆] Evaluasi              ⟩ │ ← ungu
│ [📊] Hasil Belajar         ⟩ │ ← kuning
├──────────────────────────────┤
│ 🏠      📖      🏆      ⚙   │ ← BottomNav (aktif = ungu)
└──────────────────────────────┘
```

### 3.2 Kalkulator Ganjil Genap (sesuai mockup)
```
┌──────────────────────────────┐
│ ‹    Kalkulator Ganjil Genap │
│          [ 🧮 ]              │ ← ikon besar dalam kotak ungu muda
│   Kalkulator Ganjil Genap    │
│ Masukkan angka yang ingin    │
│ diperiksa                    │
│ Masukkan bilangan            │
│ ┌──────────────────────(✕)┐  │
│ │ Contoh: 17              │  │ ← inputmode="numeric"
│ └─────────────────────────┘  │
│ (      🧮  Hitung         )  │ ← tombol pil ungu
│ ┌──────────────────────────┐ │
│ │     [Hasil Perhitungan]  │ │
│ │ ┌──────────────────────┐ │ │
│ │ │   BILANGAN GANJIL    │ │ │ ← KartuHasil (warna sesuai jenis)
│ │ │         17           │ │ │
│ │ └──────────────────────┘ │ │
│ │ Cara Perhitungan:        │ │
│ │ 17 ÷ 2 = 8 sisa 1        │ │
│ │ Karena sisanya 1, maka 17│ │
│ │ termasuk bilangan ganjil.│ │
│ │   (✓ Perhitungan berhasil)│ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │💡 Ingat! Genap sisa 0,   │ │ ← KotakIngat
│ │   ganjil sisa 1.         │ │
│ └──────────────────────────┘ │
│ 🏠      📖      🏆      ⚙   │
└──────────────────────────────┘
```
Tambahan (opsional, P1): baris "Cara cepat: lihat angka satuannya → 7 → ganjil".

### 3.3 Generator Pola Bilangan (sesuai mockup)
```
┌──────────────────────────────┐
│ ‹    Generator Pola Bilangan │
│   [2][4][6][8][10]           │ ← ilustrasi kotak suku
│   Generator Pola Bilangan    │
│ Pilih jenis pola dan tentukan│
│ jumlah suku.                 │
│ Jenis Pola                   │
│ ┌───────────✓┐ ┌───────────┐ │
│ │ ⁘ Genap    │ │ ⁘ Ganjil  │ │ ← toggle; terpilih = border ungu + ✓
│ └────────────┘ └───────────┘ │
│ Jumlah Suku                  │
│ ┌──────────────────────────┐ │
│ │   (−)      5      (+)    │ │ ← Stepper 1–20
│ └──────────────────────────┘ │
│ (    ✦  Generate Pola     )  │
│ ┌──────────────────────────┐ │
│ │  Hasil Pola Bilangan     │ │
│ │  Genap                   │ │
│ │ [2] [4] [6] [8] [10]     │ │ ← KotakSuku (wrap ke baris baru)
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ⓘ Keterangan:             │ │
│ │ • Suku pertama = 2       │ │
│ │ • Beda = 2               │ │
│ │ • Rumus: Un = 2n         │ │
│ │ • Jumlah 5 suku: S5 = 30 │ │ ← tambahan (setelah Modul Sn dibuka)
│ └──────────────────────────┘ │
│ 🏠      📖      🏆      ⚙   │
└──────────────────────────────┘
```
Ketuk satu kotak suku → tampil "U3 = 2 × 3 = 6" (menghubungkan suku dengan rumus).

### 3.4 Latihan Soal — pilihan ganda (sesuai mockup)
```
┌──────────────────────────────┐
│ ‹        Latihan Soal   [📘] │
│ ┌──────────────────────────┐ │
│ │[📋] Latihan Soal         │ │
│ │ Kerjakan soal berikut    │ │
│ │ dengan tepat dan teliti! │ │
│ └──────────────────────────┘ │
│ ▓▓▓▓░░░░░░░░░░░░░░    1/5    │
│ ┌──────────────────────────┐ │
│ │ 1. Bilangan berikut yang │ │
│ │ termasuk bilangan genap  │ │
│ │ adalah …                 │ │
│ │ (A) 7                  ○ │ │
│ │ (B) 12                 ◉ │ │ ← terpilih: border & latar ungu muda
│ │ (C) 15                 ○ │ │
│ │ (D) 21                 ○ │ │
│ └──────────────────────────┘ │
│ [💡 Petunjuk] [Contoh serupa]│ ← ditambahkan (GL03, GL05)
│ (       Periksa  →        )  │ ← setelah diperiksa → "Selanjutnya →"
│ 🏠      📖      🏆      ⚙   │
└──────────────────────────────┘
```
Alur per soal: pilih → **Periksa** → kotak umpan balik (3.7) → **Selanjutnya →**.

### 3.5 Latihan Soal — isian bertahap (untuk Un dengan n besar)
```
┌──────────────────────────────┐
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░    4/5    │
│ Suku ke-30 dari 1, 3, 5, ... │
│ ① Rumus:      [ 2n − 1 ▾ ]   │
│ ② 2 × 30 =    [      ]       │
│ ③ … − 1 =     [      ]       │
│ (          Periksa         ) │
└──────────────────────────────┘
```

### 3.6 Materi — layar konsep (satu konsep per layar)
```
┌──────────────────────────────┐
│ ‹   Pola & Rumus Un  [📘] 3/6│
│ ▓▓▓▓▓▓▓▓░░░░░░░░░░           │
│ ┌──────────────────────────┐ │
│ │ Pola Bilangan Ganjil     │ │
│ │ •  •   •    •     •      │ │ ← visual titik (biru)
│ │    ••  ••   •••   ••••   │ │
│ │ [1] [3] [5] [7] [9]      │ │ ← KotakSuku
│ │ n : 1   2   3   4   5    │ │
│ │ Setiap suku = 2 × n,     │ │
│ │ lalu dikurangi 1.        │ │ ← maks 2–3 kalimat
│ │ ┌──────────────────────┐ │ │
│ │ │ Un = 2n − 1          │ │ │ ← kotak rumus
│ │ └──────────────────────┘ │ │
│ └──────────────────────────┘ │
│ ( ‹ Kembali )  (  Lanjut ›  )│
└──────────────────────────────┘
```

### 3.7 Penuntun "Pilih Rumus" & Contoh Bertahap
```
Pilih Rumus                        Contoh Bertahap
┌────────────────────────────┐     ┌────────────────────────────┐
│ Barisan: 2, 4, 6, 8, ...   │     │ Suku ke-25 dari 1, 3, 5, … │
│ Suku pertamanya berapa?    │     │ ① Pola ganjil → Un = 2n − 1│
│  ( 1 )        ( 2 )        │     │ ② U25 = 2 × 25 − 1         │
│ ✓ 2 → barisan GENAP        │     │ ③ 2 × 25 = 50              │
│ ┌────────────────────────┐ │     │ ④ 50 − 1 = 49              │
│ │ Un = 2n                │ │     │ ( Ulangi ) ( Langkah › )   │
│ └────────────────────────┘ │     └────────────────────────────┘
└────────────────────────────┘     Faded: ③/④ berupa kotak isian
```

### 3.8 Umpan Balik
```
┌──────────────────────────────┐   ┌──────────────────────────────┐
│ ✗ Belum tepat                │   │ ✓ Tepat!                     │
│ Kamu memakai rumus genap     │   │ U30 = 59                     │
│ (2n). Barisan ini mulai dari │   │                              │
│ 1, jadi pakai Un = 2n − 1.   │   │ (     Selanjutnya →      )   │
│ ( Coba lagi )                │   └──────────────────────────────┘
└──────────────────────────────┘   latar hijau muda
latar merah muda lembut
```

### 3.9 Evaluasi
```
┌──────────────────────────────┐
│ ‹          Evaluasi          │
│          [ 🏆 ]              │
│ Uji pemahamanmu dengan tes   │
│ pilihan ganda.               │
│ ┌──────────────────────────┐ │
│ │ Tes Awal (Pre-test)    ⟩ │ │ ← nilai terakhir tampil di kanan
│ │ 10 soal · tanpa petunjuk │ │
│ └──────────────────────────┘ │
│ ┌──────────────────────────┐ │
│ │ Tes Akhir (Post-test)  ⟩ │ │ ← terbuka setelah semua modul selesai
│ └──────────────────────────┘ │
└──────────────────────────────┘
Layar soal = format 3.4 tanpa tombol Petunjuk/Contoh; umpan balik
ditampilkan di akhir (pembahasan per soal).
```

### 3.10 Hasil Belajar / Nilai
```
┌──────────────────────────────┐
│ ‹        Hasil Belajar       │
│ ┌────────────┐┌────────────┐ │
│ │ Pre-test   ││ Post-test  │ │
│ │   60       ││   90       │ │ ← kartu nilai
│ └────────────┘└────────────┘ │
│ Progres Materi               │
│ ① Kenali Ganjil & Genap   ✓  │
│ ② Pola & Rumus Un         ✓  │
│ ③ Contoh Soal             ●  │
│ ④ Jumlah Suku (Sn)        🔒 │
│ Riwayat Latihan              │
│ Latihan Un · 10 Nov · 4/5    │
│ Latihan Un · 9 Nov  · 3/5    │
└──────────────────────────────┘
```

### 3.11 Pengaturan
```
┌──────────────────────────────┐
│ ‹         Pengaturan         │
│ ┌──────────────────────────┐ │
│ │ 👤 Rani                  │ │
│ │    Nama panggilan  Ubah ⟩│ │
│ └──────────────────────────┘ │
│ 📲 Pasang aplikasi       ⟩   │ ← sembunyi jika sudah ter-install
│ ☁ Sinkron: Tersinkron ✓      │ ← atau "3 hasil menunggu" + (Kirim sekarang)
│ Mode gelap          [ ○—]    │
│ Ukuran huruf (A−) Normal (A+)│
│ Reset progres            ⟩   │ ← konfirmasi dulu
│ Tentang aplikasi         ⟩   │
└──────────────────────────────┘
```

### 3.12 Kartu Rumus (bottom sheet)
```
┌──────────────────────────────┐
│ Kartu Rumus             [✕]  │
│        GENAP     │  GANJIL   │
│ Mulai   2        │   1       │
│ Un     2n        │  2n − 1   │
│ Sn     n(n + 1)  │   n²      │
│ Tip: lihat suku pertama!     │
└──────────────────────────────┘
```

### 3.13 Masuk Pertama Kali
```
┌──────────────────────────────┐
│          ┌1┐┌2┐              │
│           └3┘                │ ← ilustrasi yang sama dengan Beranda
│   Halo! Selamat datang di    │
│          PolaKu              │
│ Nama panggilanmu             │
│ ┌──────────────────────────┐ │
│ │ Contoh: Rani             │ │
│ └──────────────────────────┘ │
│ (        Mulai Belajar     ) │
│ Tidak perlu daftar akun atau │
│ password.                    │
└──────────────────────────────┘
Tanpa kode kelas: siapa pun bisa langsung belajar.
Offline saat masuk: tetap bisa; pendaftaran ke server menyusul saat online.
```

### 3.14 Kartu "Pasang Aplikasi" & Petunjuk iPhone
```
Di Beranda (di atas banner, bisa ditutup ✕)    Halaman Petunjuk Pasang (iPhone)
┌──────────────────────────────┐              ┌──────────────────────────────┐
│ [📲] Pasang PolaKu di HP  ✕  │              │ ‹       Pasang Aplikasi      │
│ Buka lebih cepat & bisa      │              │ ① Ketuk tombol Bagikan [⬆]   │
│ dipakai tanpa internet.      │              │    di bawah layar Safari.    │
│ (      Pasang Sekarang     ) │              │ ② Pilih "Tambahkan ke Layar  │
└──────────────────────────────┘              │    Utama" [+].               │
Android/laptop → dialog install browser        │ ③ Ketuk "Tambah".            │
iPhone → buka Halaman Petunjuk                 │ [gambar petunjuk]            │
Sudah ter-install → kartu tidak tampil         └──────────────────────────────┘
```

### 3.15 Indikator Sinkron
```
Header Beranda kanan atas:  ☁✓  Tersinkron  ·  ☁↑ Menunggu (3)  ·  ☁✕ Offline
Ketuk → toast singkat: "Kamu sedang offline. Nilaimu disimpan di HP dan akan dikirim nanti."
```

### 3.16 Rekap Guru (halaman web Flask, layar laptop/HP)
```
┌──────────────────────────────────────────────────────────┐
│ Rekap Nilai Siswa PolaKu        [Unduh CSV] [Keluar]     │
│ 24 siswa · terakhir diperbarui 10 Nov 2026 14.05         │
│ ┌──────────┬────────┬────────┬──────────┬─────────┬─────┐│
│ │ Nama     │Pre-test│Post-tst│Rata latih│Petunjuk │Angkt││
│ ├──────────┼────────┼────────┼──────────┼─────────┼─────┤│
│ │Rani #8988│  60    │  90    │   84     │  1,3    │  4  ││
│ │Dimas #1a2│  50    │   –    │   62     │  2,0    │  6  ││
│ └──────────┴────────┴────────┴──────────┴─────────┴─────┘│
└──────────────────────────────────────────────────────────┘
Halaman masuk guru: satu kunci guru (KUNCI_GURU di .env server). #kode membedakan nama yang sama.
```

## 4. Design System (diturunkan dari mockup)

### 4.1 Token Warna
| Token | Terang | Gelap | Kegunaan |
|---|---|---|---|
| `--bg` | `#F6F5FC` | `#16152B` | Latar aplikasi (lavender sangat lembut) |
| `--surface` | `#FFFFFF` | `#22213B` | Kartu |
| `--surface-soft` | `#F1EFFB` | `#2B2A47` | Banner, kotak keterangan, kotak Ingat |
| `--border` | `#E6E4F2` | `#38365A` | Garis kartu & input |
| `--text` | `#1F2140` | `#ECEBF7` | Teks utama |
| `--text-muted` | `#6B6E85` | `#A6A5C2` | Deskripsi |
| `--primary` | `#6C5CE7` | `#8F82F0` | Tombol utama, nav aktif, genap |
| `--primary-soft` | `#EEEBFF` | `#332F5C` | Latar terpilih, kotak suku, kartu hasil |
| `--genap` | `= --primary` | | Semua hal "genap" |
| `--ganjil` | `#4C7CF0` | `#7FA2F5` | Semua hal "ganjil" |
| `--ganjil-soft` | `#E6EEFF` | `#25335A` | Kotak suku/kartu hasil ganjil |
| `--benar` | `#2FB673` / soft `#E3F6EC` | `#5ED39A` | Umpan balik benar, "Perhitungan berhasil" |
| `--salah` | `#E5675C` / soft `#FDECEA` | `#F08C83` | Umpan balik salah |

**Ikon menu (kotak pastel 48 px, radius 14 px):**
| Menu | Latar | Ikon |
|---|---|---|
| Materi, Kalkulator | `#E6EEFF` | `#4C7CF0` |
| Generator | `#E3F6EC` | `#2FB673` |
| Latihan, Hasil Belajar | `#FFF3DC` | `#F5A524` |
| Evaluasi | `#EFE9FF` | `#7B61FF` |

Kontras: teks putih di atas `--primary` ≈ 4.9:1 (lolos AA). Warna genap/ganjil **selalu** disertai label teks.

### 4.2 Tipografi
- Font: **Plus Jakarta Sans** (Google Fonts), fallback `system-ui, sans-serif`.
- Judul halaman Beranda 28 px / 800 · judul header 18 px / 700 · judul kartu 17 px / 700 · isi 15–16 px / 400–500 · deskripsi kartu 13–14 px muted · angka hasil/suku 22–36 px / 800.
- Tinggi baris 1.5.

### 4.3 Bentuk, Spasi, Bayangan
- Kelipatan 4/8 px; margin tepi layar 16–20 px; jarak antar kartu menu 12 px.
- Radius: kartu 16 px · kotak ikon 14 px · kotak suku 12 px · input 14 px · tombol **pil** 999 px.
- Tombol utama: tinggi 52 px, lebar penuh, `--primary`, teks putih 16 px / 600, ikon di kiri teks.
- Bayangan kartu: `0 4px 16px rgba(108, 92, 231, 0.08)`; tanpa bayangan tebal.
- Bottom nav: tinggi 64 px + safe-area, latar `--surface`, garis atas 1 px; ikon 24 px + label 12 px; aktif = `--primary`.
- Area sentuh minimal 44 × 44 px.

### 4.4 Ikon
`lucide-react` (garis, ringan): `Home`, `BookOpen`, `Trophy`, `Settings`, `Calculator`, `LayoutGrid`, `ClipboardCheck`, `BarChart3`, `Lightbulb`, `ChevronLeft`, `ChevronRight`, `Sparkles`, `Info`, `CheckCircle2`, `XCircle`, `Minus`, `Plus`, `X`.

### 4.5 Komponen
| Komponen | Fungsi | Dipakai di |
|---|---|---|
| `BottomNav` | 4 tab navigasi | semua layar |
| `HeaderHalaman` | tombol ‹ + judul tengah + aksi kanan (📘) | semua kecuali Beranda |
| `KartuMenu` | ikon pastel + judul + deskripsi + › | Beranda, Materi, Evaluasi |
| `BannerMulai` | ajakan mulai/lanjutkan belajar | Beranda |
| `IkonJudul` | ikon besar dalam kotak + judul + subjudul | Kalkulator, Generator, Evaluasi |
| `InputBilangan` | input angka dengan tombol hapus (✕) | Kalkulator |
| `TombolUtama` | tombol pil ungu | semua |
| `KartuHasil` | label jenis + angka besar, warna sesuai jenis | Kalkulator |
| `KotakIngat` | tips singkat dengan ikon 💡 | Kalkulator, Materi |
| `PilihanJenis` | toggle Genap/Ganjil dengan ✓ | Generator |
| `Stepper` | − angka + | Generator |
| `KotakSuku` | deret angka dalam kotak; bisa diketuk | Generator, Materi |
| `KotakKeterangan` | daftar poin dengan ikon ⓘ | Generator |
| `BilahProgres` | progres + "x/y" | Latihan, Evaluasi, Materi |
| `PilihanGanda` | opsi A–D dengan radio | Latihan, Evaluasi |
| `KolomLangkah` | isian bertahap angka besar | Latihan |
| `PanelPetunjuk` | petunjuk 3 tingkat | Latihan |
| `UmpanBalik` | kotak benar/salah sesuai miskonsepsi | Latihan |
| `TabelPola` / `VisualTitik` | tabel n–Un & gambar titik (SVG) | Materi |
| `PenuntunRumus` / `ContohBertahap` | lihat 3.7 | Materi |
| `KartuRumus` | bottom sheet rumus | Materi, Latihan |
| `FormMasuk` | nama panggilan + validasi (tanpa kode kelas) | Masuk, Pengaturan |
| `KartuPasang` | ajakan install PWA (Android: dialog; iPhone: ke halaman petunjuk) | Beranda, Pengaturan |
| `IndikatorSinkron` | ikon awan status sinkron + toast | Beranda, Pengaturan |
| `PemberitahuanVersi` | "Versi baru tersedia — Muat ulang" | global |

### 4.6 Gerak
- Transisi halaman/langkah: fade 150–200 ms; tombol: perubahan warna saat ditekan.
- Hormati `prefers-reduced-motion`. Tidak ada konfeti, animasi karakter, atau gerak berulang.

## 5. Aturan Petunjuk & Umpan Balik
**Petunjuk 3 tingkat (dibuka satu per satu):**
1. *Arah:* "Lihat suku pertama barisan. Ganjil atau genap?"
2. *Rumus:* "Pola ganjil memakai Un = 2n − 1."
3. *Langkah pertama:* "U30 = 2 × 30 − 1. Hitung 2 × 30 dulu."

**Umpan balik salah** dipetakan ke miskonsepsi (`KONTEN.md` bagian 6). Format: *apa yang salah* → *mengapa* → *apa yang benar*, maksimal 3 kalimat. Setelah 2 kali salah pada soal yang sama → tawarkan "Contoh serupa".

**Umpan balik benar:** singkat ("✓ Tepat! U30 = 59").

**Evaluasi:** tanpa petunjuk dan tanpa umpan balik langsung; pembahasan ditampilkan setelah tes selesai.

## 6. Aksesibilitas & Responsif
- Mobile-first 360 px; di desktop konten dibatasi lebar maksimal 480 px di tengah layar dengan latar `--bg` (tampilan seperti HP).
- Kontras ≥ 4.5:1; fokus keyboard terlihat; `aria-label` pada tombol ikon.
- Input angka memakai `inputmode="numeric"`.
- Mode gelap: ikut perangkat secara default, bisa diubah di Pengaturan.
- Ukuran huruf: 3 pilihan (Kecil 90%, Normal 100%, Besar 115%) melalui variabel CSS skala.

## 7. Tampilan sebagai Aplikasi Ter-install (PWA)
- Mode `standalone`: tanpa address bar; warna status bar = `--primary` (`theme-color`).
- Beri ruang *safe area* (`env(safe-area-inset-*)`) untuk HP berponi dan bottom nav.
- Splash screen otomatis dari `background_color #F6F5FC` + ikon 512 px.
- **Ikon aplikasi:** kotak ungu `#6C5CE7` sudut membulat dengan angka "1 2 3" putih (selaras ilustrasi Beranda); versi *maskable* dengan margin aman 20%.
- Tombol kembali (‹) di header wajib ada, karena dalam mode standalone tidak ada tombol kembali browser (terutama di iPhone).
