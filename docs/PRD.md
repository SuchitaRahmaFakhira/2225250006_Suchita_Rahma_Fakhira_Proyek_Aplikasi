# PRD — Product Requirements Document
**Nama kerja aplikasi:** PolaKu — Belajar Pola Bilangan Ganjil & Genap
**Versi dokumen:** 1.2 (10 November 2026 — PWA bisa di-install tanpa Store; Python (Flask) + JavaScript (React)) · **Penyusun:** Suchita Rahma Fakhira

## 1. Latar Belakang
Wawancara dengan siswa kelas VIII (lihat `ANALISIS.md`) menunjukkan bahwa kesulitan utama pada materi pola bilangan ganjil–genap adalah **membedakan pola dan memilih rumus yang tepat**, **menghitung dengan angka besar**, dan **mencari jumlah suku (Sn)**. Beban ini bertambah karena penjelasan di kelas sering **terlalu cepat dan terlalu panjang**. Siswa merasa terbantu oleh **contoh soal**, **tabel/gambar berwarna**, dan **latihan soal yang mirip**.

Aplikasi ini dirancang dengan prinsip **Cognitive Load Theory (CLT)** agar siswa dapat belajar mandiri sesuai tempo masing-masing dan meningkatkan **literasi matematika**.

**Bentuk produk:** aplikasi web **PWA** yang dibuka lewat browser HP dan bisa **di-install ke layar utama tanpa Play Store/App Store**. Frontend ditulis dengan **JavaScript (React)**, backend dengan **Python (Flask + SQLite)**. Detail teknis ada di `ARSITEKTUR.md`.

## 2. Tujuan
| No | Tujuan | Indikator |
|---|---|---|
| T1 | Siswa dapat membedakan pola ganjil dan genap serta memilih rumus Un yang tepat | ≥ 80% benar pada soal "pilih rumus" |
| T2 | Siswa dapat menghitung Un untuk n kecil dan n besar | ≥ 75% benar pada soal Un level 3 |
| T3 | Siswa dapat menghitung Sn pola ganjil dan genap | ≥ 70% benar pada soal Sn |
| T4 | Siswa dapat menyelesaikan soal konteks (literasi): **merumuskan** situasi ke pola, **menerapkan** rumus, **menafsirkan** hasil | ≥ 60% benar pada soal konteks |
| T5 | Beban kognitif yang dirasakan menurun | Skor angket beban kognitif (skala 1–9, Paas) lebih rendah dibanding belajar konvensional |

## 3. Pengguna (Persona)
**Siswa kelas VIII.**
- Memakai HP Android dengan layar ±6 inci; kuota terbatas.
- Hafal ciri bilangan ganjil/genap dari angka satuan, tetapi sering tertukar rumus `2n` dan `2n − 1`.
- Mudah bosan dengan teks panjang; suka contoh soal; sering mengecek ulang jawaban.
- Belajar di rumah, kadang bersama teman.

Pengguna sekunder: **guru/peneliti** — membagikan link aplikasi dan melihat rekap nilai lewat halaman `/guru` dengan kunci guru (data untuk tahap Evaluation ADDIE). Aplikasi siswa **terbuka untuk semua orang** tanpa kode kelas.

## 4. User Stories
| ID | Sebagai… | Saya ingin… | Agar… |
|---|---|---|---|
| US1 | siswa | mempelajari materi sedikit demi sedikit dengan tombol "lanjut" | tidak tertinggal seperti saat guru menjelaskan terlalu cepat |
| US2 | siswa | melihat pola dalam bentuk titik dan tabel berwarna | lebih mudah melihat polanya |
| US3 | siswa | dibantu menentukan apakah pola itu ganjil atau genap | tidak salah memilih rumus |
| US4 | siswa | membuka kartu rumus kapan saja | tidak perlu menghafal sebelum paham |
| US5 | siswa | melihat contoh soal lengkap sebelum latihan | punya acuan cara mengerjakan |
| US6 | siswa | mengerjakan banyak latihan soal yang mirip | lebih mudah mengingat |
| US7 | siswa | mendapat petunjuk bertahap ketika buntu | tetap bisa menyelesaikan sendiri |
| US8 | siswa | tahu letak kesalahan saya | bisa memperbaikinya |
| US9 | siswa | perhitungan angka besar dipecah langkahnya | tidak salah hitung |
| US10 | siswa | mengecek jawaban dengan cara lain | yakin jawaban saya benar |
| US11 | siswa | melanjutkan belajar dari posisi terakhir | tidak mengulang dari awal |
| US12 | siswa | memasang aplikasi di layar utama HP tanpa Play Store | bisa membukanya seperti aplikasi biasa |
| US13 | siswa | tetap bisa belajar saat tidak ada kuota/sinyal | belajar tidak terputus |
| US14 | siswa | masuk cukup dengan nama panggilan, tanpa kode kelas | siapa pun bisa langsung belajar tanpa mengingat kode/password |
| US15 | guru/peneliti | melihat dan mengunduh nilai seluruh siswa di kelas | bisa menganalisis hasil belajar |

## 5. Ruang Lingkup Fitur

### P0 — Wajib ada (MVP)
| ID | Fitur | Deskripsi | Sumber |
|---|---|---|---|
| F1 | **Modul 1 – Kenali Ganjil & Genap** | Pemanasan kelipatan 2; ciri angka satuan; visual titik berpasangan (genap = semua berpasangan, ganjil = sisa 1); kuis cepat 5 soal | K03, IL03, EL02 |
| F2 | **Modul 2 – Pola & Rumus Un** | Barisan genap & ganjil ditampilkan dalam tabel n–Un berwarna; penurunan rumus dari tabel; penuntun **"Pilih Rumus"** (Suku pertama 2 → genap → `2n`; suku pertama 1 → ganjil → `2n − 1`) | IL01, IL02, DS02 |
| F3 | **Modul 3 – Contoh Soal Bertahap** | *Worked example* lengkap yang dibuka langkah demi langkah; lalu *faded example* (sebagian langkah diisi siswa) | GL01, GL03, EL01 |
| F4 | **Latihan Soal** | Format **pilihan ganda A–D** seperti mockup (bilah progres "x/5", tombol Periksa → Selanjutnya) dan **isian bertahap** untuk Un dengan n besar; soal diacak dari templat (lihat `KONTEN.md`), 3 level (n kecil → besar); petunjuk 3 tingkat; umpan balik berbasis miskonsepsi; tombol "Contoh serupa"; label tipe soal. Satu sesi = 5 soal | DS01, GL05, IL04 |
| F5 | **Modul 4 – Jumlah Suku (Sn)** (Materi ④) | Hanya terbuka setelah Modul 1–3 dan Latihan Un; visual: jumlah ganjil membentuk persegi (n²), jumlah genap membentuk persegi panjang n(n+1); contoh + latihan | IL05 |
| F6 | **Penyelesaian Bertahap untuk Angka Besar** | Kolom langkah: (1) tulis rumus, (2) substitusi n, (3) kalikan, (4) kurangi/tambah | IL04, EL05 |
| F7 | **Kartu Rumus** | Tombol tetap (pojok kanan atas) yang membuka lembar ringkas 4 rumus | IL01 |
| F9 | **Progres Lokal** | Menyimpan modul selesai, skor terakhir, posisi terakhir di `localStorage` (sekaligus disinkronkan ke server lewat F23); banner "Ayo mulai belajar!" di Beranda berubah menjadi "Lanjutkan: …" | EL04 |
| F13 | **Install tanpa Store (PWA) & Offline** | Manifest + service worker; tombol "Pasang Aplikasi" (Android/laptop) dan halaman petunjuk "Tambahkan ke Layar Utama" (iPhone); materi, Kalkulator, Generator, Latihan, dan Evaluasi berjalan tanpa internet | Persona (kuota), syarat proyek |
| F22 | **Masuk Pertama Kali** | Cukup nama panggilan — **tanpa kode kelas dan password**, terbuka untuk semua orang; disimpan di HP sehingga tidak perlu masuk ulang; server memberi ID acak (membedakan nama yang sama); nama bisa diganti di Pengaturan | Akses terbuka |
| F23 | **Sinkronisasi Nilai ke Server Python** | Hasil latihan/evaluasi/angket masuk antrean di HP lalu dikirim ke Flask `/api/hasil` saat online; kirim ulang otomatis; indikator "Tersimpan di HP" / "Tersinkron ✓" | Syarat penelitian, persona |
| F16 | **Kalkulator Ganjil Genap** | Input bilangan bulat → kartu hasil "BILANGAN GANJIL/GENAP" + cara perhitungan (n ÷ 2 = q sisa r) + alasan + kotak "Ingat!" (mockup layar 2) | K03, GL02 |
| F17 | **Generator Pola Bilangan** | Pilih Genap/Ganjil + jumlah suku 1–20 (stepper) → kotak suku + keterangan (suku pertama, beda, rumus Un; Sn setelah modul Sn terbuka); ketuk suku → "U3 = 2 × 3 = 6" (mockup layar 3) | EL02, IL01, GL05 |
| F18 | **Evaluasi** | Pre-test & post-test pilihan ganda, 10 soal, tanpa petunjuk; pembahasan di akhir; nilai disimpan. Post-test terbuka setelah semua modul selesai | Metrik bagian 9 |
| F19 | **Hasil Belajar (tab Nilai)** | Nilai pre/post-test, progres modul, riwayat latihan | EL04, GL02 |
| F20 | **Pengaturan** | Mode gelap, ukuran huruf (3 tingkat), reset progres (dengan konfirmasi), tentang aplikasi | DS03, aksesibilitas |
| F21 | **Navigasi & Tampilan sesuai mockup** | Bottom nav 4 tab (Beranda, Materi, Nilai, Pengaturan); header dengan tombol kembali; Beranda dengan Menu Utama 6 kartu (lihat `DESAIN.md`) | Mockup |

### P1 — Sebaiknya ada
| ID | Fitur | Deskripsi | Sumber |
|---|---|---|---|
| F8 | **Cek Jawabanku** | Setelah menjawab Un, tombol yang membuka Generator/Kalkulator dengan nilai soal terisi otomatis (mis. Generator ganjil 20 suku) | GL02 |
| F11 | **Soal Konteks (Literasi)** | Soal cerita sehari-hari (kursi gedung, nomor rumah, tumpukan, dsb.) dengan 3 tahap: merumuskan → menerapkan → menafsirkan | Tujuan T4 |
| F12 | **Kesulitan Adaptif** | 3 benar berturut → naik level; 2 salah berturut → turun level + tampilkan contoh serupa | GL03 |
| F14 | **Rekap untuk Guru (Python/Flask)** | Halaman `/guru` (masuk dengan satu kunci guru dari `.env` server): tabel semua siswa (pre/post-test, latihan, petunjuk dipakai, angket) + tombol "Unduh CSV" | Metrik bagian 9 |
| F15 | **Angket Beban Kognitif** | Satu pertanyaan skala 1–9 (Paas) setelah tiap modul dan setelah Evaluasi, untuk keperluan penelitian | T5 |

### P2 — Nanti (jika waktu cukup)
| ID | Fitur | Deskripsi | Sumber |
|---|---|---|---|
| F10 | **Refleksi "Jelaskan ke Teman"** | Kotak isian singkat di akhir modul: "Bagaimana kamu menjelaskan cara memilih rumus ke temanmu?" (disinkronkan ke server) | GL04 |
| F24 | **Grafik di Rekap Guru** | Grafik pre-test vs post-test per kelas di halaman `/guru` | Metrik bagian 9 |

### Di Luar Cakupan
- Akun dengan password, login email/Google, leaderboard/peringkat (berpotensi menambah beban & kecemasan).
- File APK atau rilis di Play Store/App Store (distribusi cukup lewat URL/QR code + install PWA).
- Materi pola lain (persegi, segitiga, persegi panjang, Fibonacci) — kandidat versi berikutnya.
- Video, suara narasi, maskot animasi (bertentangan dengan DS03).

## 6. Alur Belajar
**Pertama kali:** buka URL/QR code di browser HP → (opsional) Pasang Aplikasi → Masuk (nama panggilan saja) → Beranda.

**Alur yang disarankan** (dipandu banner "Ayo mulai belajar!" di Beranda):
```
Evaluasi: Pre-test → Materi ① Kenali → ② Rumus Un → ③ Contoh Soal → Latihan Un
→ Materi ④ Jumlah Suku (Sn) → Latihan Sn → [P1] Soal Konteks → Evaluasi: Post-test → Hasil Belajar
```
**Akses bebas:** Kalkulator Ganjil Genap dan Generator Pola Bilangan bisa dibuka kapan saja dari Beranda sebagai alat bantu.

Modul materi berikutnya terbuka setelah modul sebelumnya selesai (bisa diulang kapan saja). Kartu Rumus tersedia di header halaman Materi dan Latihan. Struktur menu dan navigasi mengikuti mockup (`docs/mockup/mockup-v1.jpg`).

## 7. Kriteria Penerimaan
| Fitur | Kriteria |
|---|---|
| F1 | Siswa dapat menjawab kuis 5 soal; setiap jawaban salah menampilkan alasan (mis. "Lihat angka satuannya: 7 → ganjil") |
| F2 | Tabel n–Un menampilkan n = 1–5; rumus muncul setelah siswa menekan "Lanjut"; penuntun "Pilih Rumus" mengarahkan ke rumus yang benar untuk barisan 2,4,6,… dan 1,3,5,… |
| F3 | Setiap langkah contoh muncul satu per satu lewat tombol; tersedia tombol "Ulangi"; minimal 2 worked example + 2 faded example per jenis (ganjil/genap) |
| F4 | Soal berbeda tiap sesi (angka diacak); pilihan ganda A–D dengan satu pilihan aktif; tombol Periksa nonaktif sebelum memilih; ada 3 tingkat petunjuk; umpan balik spesifik untuk minimal 4 jenis miskonsepsi; skor tampil di akhir 5 soal |
| F5 | Tidak bisa dibuka sebelum Latihan Un selesai; menampilkan visual Sn; rumus Sn benar untuk n = 1–100 |
| F6 | Untuk n ≥ 20, soal menampilkan kolom langkah; setiap langkah divalidasi terpisah |
| F7 | Dapat dibuka dan ditutup dari semua halaman dalam ≤ 1 ketukan |
| F9 | Menutup lalu membuka kembali aplikasi tetap menampilkan progres; aplikasi tetap berjalan jika `localStorage` diblokir |
| F16 | Input 17 → "BILANGAN GANJIL", "17 ÷ 2 = 8 sisa 1", alasan benar; input 0 → genap; bilangan negatif ditangani (−7 → ganjil); input kosong/bukan angka → pesan "Masukkan bilangan bulat"; tombol ✕ mengosongkan input |
| F17 | Genap 5 suku → 2, 4, 6, 8, 10 + "Suku pertama = 2, Beda = 2, Un = 2n"; ganjil 5 suku → 1, 3, 5, 7, 9 + "Un = 2n − 1"; stepper tidak bisa < 1 atau > 20; kotak suku membungkus ke baris baru di 360 px |
| F18 | 10 soal pilihan ganda; tanpa tombol petunjuk; nilai (0–100) dan pembahasan tampil setelah soal terakhir; nilai tersimpan |
| F19 | Menampilkan nilai pre/post-test terakhir, status tiap modul, dan minimal 5 riwayat latihan terakhir |
| F20 | Mode gelap & ukuran huruf langsung berlaku dan tersimpan; reset progres meminta konfirmasi |
| F21 | Bottom nav tampil di semua layar dengan tab aktif berwarna ungu; tampilan Beranda, Kalkulator, Generator, Latihan sesuai mockup |
| F13 | Lighthouse menyatakan "Installable"; di Chrome Android tombol "Pasang Aplikasi" memunculkan dialog install dan ikon PolaKu muncul di layar utama; aplikasi terbuka layar penuh (tanpa address bar); di iPhone halaman petunjuk tampil; dalam mode pesawat materi, Kalkulator, Generator, Latihan, dan Evaluasi tetap bisa dipakai; kartu "Pasang Aplikasi" tidak muncul jika sudah ter-install |
| F22 | Tidak ada isian kode kelas; nama kosong/> 30 karakter ditolak; masuk tetap bisa saat offline (pendaftaran ke server menyusul saat online); membuka ulang aplikasi langsung ke Beranda |
| F23 | Hasil yang dikerjakan offline terkirim otomatis setelah online; tidak ada data ganda saat dikirim ulang; indikator status berubah sesuai keadaan |
| F14 | `/guru` menolak kunci salah dan terkunci jika `KUNCI_GURU` belum diatur; menampilkan semua siswa; CSV bisa dibuka di Excel dengan kolom: nama, pre-test, post-test, rata-rata latihan, petunjuk, angket |
| Umum | Tampilan rapi pada lebar 360 px; tidak ada blok teks > 3 kalimat; tidak ada animasi > 200 ms; warna & komponen mengikuti token di `DESAIN.md` |

## 8. Kebutuhan Non-Fungsional
- **Teknologi:** frontend **JavaScript** (React + Vite + vite-plugin-pwa); backend **Python 3.11+** (Flask + SQLite).
- **Akses & instalasi:** dapat dibuka di browser smartphone dan laptop; dapat di-install sebagai PWA **tanpa Play Store/App Store**; wajib disajikan lewat **HTTPS** (PythonAnywhere).
- **Offline:** fitur belajar berjalan tanpa internet setelah kunjungan pertama.
- **Performa:** ukuran build frontend < 500 KB (gzip); tampil < 3 detik di jaringan 3G; respons API < 1 detik.
- **Kompatibilitas:** Chrome Android (2 versi terakhir), Samsung Internet, Safari iOS 16.4+, Chrome/Edge/Firefox desktop.
- **Aksesibilitas:** kontras teks ≥ 4.5:1; ukuran huruf dasar 16–18 px; warna tidak menjadi satu-satunya penanda (selalu disertai label "Ganjil"/"Genap").
- **Akses & privasi:** aplikasi terbuka untuk semua orang (tanpa kode kelas/login); yang dikirim ke server hanya nama panggilan + hasil belajar; tidak ada email, nomor HP, atau password; kunci guru hanya disimpan di `.env` server.

## 9. Metrik Keberhasilan (tahap Evaluation ADDIE)
- Skor rata-rata latihan per modul dan perubahan skor pre-test → post-test.
- Rata-rata jumlah petunjuk yang dipakai per soal (semakin turun = semakin mandiri).
- Skor angket beban kognitif (Paas 1–9).
- Umpan balik kualitatif dari siswa (wawancara ulang singkat).

## 10. Rencana Tahapan (ADDIE)
| Tahap | Keluaran |
|---|---|
| Analysis | `ANALISIS.md` (selesai) |
| Design | `PRD.md`, `ARSITEKTUR.md`, `DESAIN.md`, `KONTEN.md`, `CLAUDE.md` |
| Development | 1) Setup backend Flask + SQLite (`init-db`, `/api/siswa`, `/api/hasil`) + pytest → 2) Setup frontend Vite + PWA (manifest, ikon, service worker) → 3) token & komponen dasar (BottomNav, Header, KartuMenu) → 4) Masuk & Beranda (+ Pasang Aplikasi) → 5) Kalkulator & Generator → 6) Materi → 7) Latihan → 8) Evaluasi & Hasil Belajar + sinkron → 9) Pengaturan → 10) Rekap guru `/guru` → 11) Deploy PythonAnywhere |
| Implementation | Bagikan URL/QR code; siswa memasang PWA di HP; uji coba dengan 3–5 siswa kelas VIII |
| Evaluation | Unduh CSV dari `/guru` → analisis skor pre/post-test, petunjuk, angket beban kognitif; wawancara ulang → revisi |
