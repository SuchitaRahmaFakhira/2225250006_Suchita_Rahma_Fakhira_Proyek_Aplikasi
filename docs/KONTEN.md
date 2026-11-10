# KONTEN — Naskah Materi, Contoh Soal, dan Bank Soal

Aturan penulisan: kalimat pendek, maksimal 3 kalimat per layar, bahasa sehari-hari siswa SMP.

## 0. Rumus Acuan (wajib benar)
| | Genap | Ganjil |
|---|---|---|
| Barisan | 2, 4, 6, 8, … | 1, 3, 5, 7, … |
| Suku pertama | 2 | 1 |
| Suku ke-n | Un = 2n | Un = 2n − 1 |
| Jumlah n suku pertama | Sn = n(n + 1) | Sn = n² |

Cek: U6 ganjil = 11, U100 ganjil = 199 (sesuai catatan siswa); S4 ganjil = 16; S3 genap = 12; U10 genap = 20; S10 genap = 110.

## 1. Modul 1 — Kenali Ganjil & Genap
| Layar | Isi |
|---|---|
| 1.1 Pemanasan | "Kelipatan 2: 2, 4, 6, 8, 10, … Bilangan ini bisa dibagi 2 tanpa sisa." |
| 1.2 Genap | Visual titik berpasangan. "Bilangan **genap** bisa dipasangkan semua. Angka satuannya 0, 2, 4, 6, atau 8." |
| 1.3 Ganjil | Visual titik dengan sisa 1. "Bilangan **ganjil** selalu bersisa 1 jika dipasangkan. Angka satuannya 1, 3, 5, 7, atau 9." |
| 1.4 Tips | "Cukup lihat **angka terakhir**. 348 → 8 → genap. 1.275 → 5 → ganjil." |
| 1.5 Kuis | 5 soal: tentukan ganjil/genap (angka 1–3 digit, lalu 4 digit) |

## 2. Modul 2 — Pola & Rumus Un
| Layar | Isi |
|---|---|
| 2.1 Apa itu pola? | "Pola bilangan adalah barisan bilangan yang mengikuti aturan tetap. Un artinya **suku ke-n**." |
| 2.2 Pola genap | Tabel n=1..5 → Un=2,4,6,8,10. "Setiap suku = 2 × n. Jadi **Un = 2n**." |
| 2.3 Pola ganjil | Tabel n=1..5 → Un=1,3,5,7,9. "Setiap suku = 2 × n lalu dikurangi 1. Jadi **Un = 2n − 1**." |
| 2.4 Bandingkan | Dua tabel berdampingan (ungu = genap, biru = ganjil). "Suku ganjil selalu 1 lebih kecil dari suku genap pada n yang sama." |
| 2.5 Pilih Rumus | Penuntun: "Suku pertama 2 → genap → 2n. Suku pertama 1 → ganjil → 2n − 1." + 3 soal pilih rumus |

## 3. Modul 3 — Contoh Soal
**Worked example (langkah dibuka satu per satu):**

**Contoh A (genap, n kecil):** Suku ke-8 dari 2, 4, 6, …?
1. Suku pertama 2 → pola genap → Un = 2n
2. U8 = 2 × 8
3. U8 = **16**
4. Cek: 2, 4, 6, 8, 10, 12, 14, **16** ✓

**Contoh B (ganjil, n besar):** Suku ke-45 dari 1, 3, 5, …?
1. Suku pertama 1 → pola ganjil → Un = 2n − 1
2. U45 = 2 × 45 − 1
3. 2 × 45 = 90
4. 90 − 1 = **89**
5. Cek: hasilnya ganjil ✓

**Contoh C (mencari n):** Bilangan ganjil 37 adalah suku ke berapa?
1. Pola ganjil: 2n − 1 = 37
2. 2n = 38
3. n = **19**

**Faded example:** soal sejenis A/B/C dengan langkah 3–4 dikosongkan untuk diisi siswa, plus pertanyaan self-explanation: "Mengapa memakai rumus 2n − 1?" (a) karena suku pertama 1 ✓ (b) karena n besar (c) karena hasilnya genap.

## 4. Modul 4 — Jumlah Suku (Sn) (Materi ④)
| Layar | Isi |
|---|---|
| 5.1 Apa itu Sn? | "Sn adalah **jumlah** suku pertama sampai suku ke-n. Beda dengan Un yang hanya satu suku." |
| 5.2 Ganjil → persegi | Visual: 1, 1+3, 1+3+5 membentuk persegi 1×1, 2×2, 3×3. "Jadi **Sn = n²**." |
| 5.3 Genap → persegi panjang | Visual n × (n+1). "Jadi **Sn = n(n + 1)**." |
| 5.4 Un vs Sn | "Ditanya *suku ke-* → Un. Ditanya *jumlah* → Sn." |
| 5.5 Contoh | S10 genap = 10 × 11 = **110**; S15 ganjil = 15 × 15 = **225** |

## 5. Templat Soal Latihan (untuk generator acak)
| Kode | Tipe | Templat | Jawaban | Level & rentang |
|---|---|---|---|---|
| T1 | Jenis bilangan | "Apakah {x} ganjil atau genap?" | x mod 2 | L1: x 1–99 · L2: 100–999 · L3: 1.000–99.999 |
| T2 | Suku berikutnya | "{a,b,c,d}, … suku berikutnya?" | suku ke-5 | L1 (mulai dari suku pertama) · L2 (mulai dari tengah, mis. 13, 15, 17, …) |
| T3 | Pilih rumus | "Rumus Un dari {barisan} adalah …" (pilihan ganda) | 2n / 2n − 1 | L1 |
| T4 | Un genap | "Suku ke-{n} dari 2, 4, 6, … ?" | 2n | L1: n 5–15 · L2: 16–50 · L3: 51–500 |
| T5 | Un ganjil | "Suku ke-{n} dari 1, 3, 5, … ?" | 2n − 1 | sama dengan T4 |
| T6 | Cari n | "{x} adalah suku ke berapa pada pola {jenis}?" | x/2 atau (x+1)/2 | L2–L3 |
| T7 | Sn genap | "Jumlah {n} bilangan genap pertama?" | n(n+1) | L1: n 3–10 · L2: 11–30 · L3: 31–100 |
| T8 | Sn ganjil | "Jumlah {n} bilangan ganjil pertama?" | n² | sama dengan T7 |
| T9 | Konteks (P1) | lihat bagian 7 | – | L2–L3 |

Aturan generator: untuk L3 (n ≥ 20) wajib memakai `KolomLangkah`. Hindari dua soal identik berturut-turut. Satu sesi latihan = 5 soal (sesuai mockup "1/5") dengan campuran tipe yang setara. Untuk format pilihan ganda, pengecoh dibuat otomatis dari miskonsepsi (bagian 6), mis. untuk Un ganjil: 2n (M1/M3), U(n−1) dan U(n+1) (M9), n² (M6).

## 6. Katalog Miskonsepsi & Umpan Balik
| Kode | Miskonsepsi | Deteksi (jawaban siswa) | Umpan balik |
|---|---|---|---|
| M1 | Tertukar rumus (pakai 2n untuk ganjil) | = 2n pada soal ganjil | "Kamu memakai rumus genap. Barisan ini dimulai dari 1, jadi pakai Un = 2n − 1." |
| M2 | Tertukar rumus (pakai 2n − 1 untuk genap) | = 2n − 1 pada soal genap | "Barisan ini dimulai dari 2, jadi pola genap: Un = 2n." |
| M3 | Lupa dikurangi 1 | = 2n pada langkah akhir ganjil | "Hampir! Setelah 2 × n, jangan lupa dikurangi 1." |
| M4 | Salah hitung perkalian | rumus benar, hasil kali salah | "Rumusnya sudah benar. Coba hitung lagi 2 × {n}." |
| M5 | Menjawab Un padahal ditanya Sn | = Un | "Soal menanyakan **jumlah**, bukan suku ke-{n}. Pakai rumus Sn." |
| M6 | Menjawab Sn padahal ditanya Un | = Sn | "Soal menanyakan **satu suku**, bukan jumlah. Pakai rumus Un." |
| M7 | Sn genap dihitung n² | = n² pada soal genap | "n² untuk jumlah bilangan **ganjil**. Untuk genap: n(n + 1)." |
| M8 | Sn ganjil dihitung n(n+1) | = n(n+1) pada soal ganjil | "n(n + 1) untuk jumlah **genap**. Untuk ganjil cukup n × n." |
| M9 | Menjawab suku ke-(n±1) | = U(n−1) atau U(n+1) | "Hampir! Itu suku ke-{n±1}. Periksa lagi nilai n yang dimasukkan." |
| M10 | Salah jenis bilangan | salah pada T1 | "Lihat angka terakhirnya: {d}. {d} adalah bilangan {jenis}." |
| Lain | Tidak terdeteksi | – | "Belum tepat. Coba buka petunjuk 💡." |

## 7. Soal Konteks / Literasi (P1)
Setiap soal memiliki 3 tahap: **Merumuskan** (pola apa? rumus apa?) → **Menerapkan** (hitung) → **Menafsirkan** (apa arti hasilnya?).

1. **Kursi gedung:** Baris pertama gedung pertunjukan memiliki 1 kursi, baris kedua 3, baris ketiga 5, dan seterusnya. Berapa kursi di baris ke-20? (39) Berapa total kursi di 20 baris? (400) *Tafsir: apakah gedung cukup untuk 350 penonton?*
2. **Nomor rumah:** Rumah di sisi kanan jalan bernomor genap 2, 4, 6, … Rumah ke-35 di sisi kanan bernomor berapa? (70)
3. **Tabungan:** Dina menabung Rp2.000 di hari ke-1, Rp4.000 di hari ke-2, Rp6.000 di hari ke-3, dan seterusnya. Berapa total tabungan setelah 10 hari? (dalam ribuan: 2 + 4 + … + 20 = S10 genap = 10 × 11 = 110 → **Rp110.000**)
4. **Susunan ubin:** Ubin disusun membentuk huruf L: 1, 3, 5, 7 ubin. Berapa ubin pada susunan ke-50? (99)

*Catatan:* soal konteks perlu divalidasi oleh dosen/guru sebelum dipakai.

## 8. Naskah Kalkulator Ganjil Genap
| Elemen | Teks |
|---|---|
| Judul / subjudul | "Kalkulator Ganjil Genap" · "Masukkan angka yang ingin diperiksa" |
| Label & placeholder | "Masukkan bilangan" · "Contoh: 17" |
| Tombol | "Hitung" |
| Kartu hasil | "BILANGAN GANJIL" / "BILANGAN GENAP" + angka |
| Cara perhitungan | "{n} ÷ 2 = {q} sisa {r}" |
| Alasan | r = 1: "Karena sisanya 1, maka {n} termasuk bilangan ganjil." · r = 0: "Karena sisanya 0 (habis dibagi 2), maka {n} termasuk bilangan genap." |
| Status | "Perhitungan berhasil" |
| Cara cepat (P1) | "Cara cepat: angka satuannya {d}, jadi {n} bilangan {jenis}." |
| Kotak Ingat! | "Bilangan genap memiliki sisa 0, sedangkan bilangan ganjil memiliki sisa 1 jika dibagi 2." |
| Validasi | kosong → "Masukkan bilangan dulu, ya." · desimal/huruf → "Masukkan bilangan bulat, misalnya 17." · lebih dari 15 digit → "Angkanya terlalu panjang." |
| Bilangan negatif | Hitung dari nilai mutlaknya: "−7 → 7 ÷ 2 = 3 sisa 1 → ganjil". Nol → "0 ÷ 2 = 0 sisa 0 → genap". |

Contoh uji: 17 → 8 sisa 1 (ganjil) · 348 → 174 sisa 0 (genap) · 0 → genap · −7 → ganjil · 1.275 → 637 sisa 1 (ganjil).

## 9. Naskah Generator Pola Bilangan
| Elemen | Teks |
|---|---|
| Judul / subjudul | "Generator Pola Bilangan" · "Pilih jenis pola dan tentukan jumlah suku." |
| Pilihan | "Genap" · "Ganjil" (bawaan: Genap) |
| Jumlah suku | Stepper 1–20 (bawaan 5) |
| Tombol | "Generate Pola" |
| Hasil | "Hasil Pola Bilangan {Genap/Ganjil}" + kotak suku |
| Keterangan genap | "Suku pertama = 2 · Beda = 2 · Rumus: Un = 2n" |
| Keterangan ganjil | "Suku pertama = 1 · Beda = 2 · Rumus: Un = 2n − 1" |
| Jumlah (setelah Materi ④ terbuka) | genap: "Jumlah {n} suku: Sn = {n} × {n+1} = {hasil}" · ganjil: "Jumlah {n} suku: Sn = {n} × {n} = {hasil}" |
| Ketuk suku ke-k | genap: "U{k} = 2 × {k} = {2k}" · ganjil: "U{k} = 2 × {k} − 1 = {2k−1}" |

Contoh uji: genap 5 → 2, 4, 6, 8, 10 (S5 = 30) · ganjil 5 → 1, 3, 5, 7, 9 (S5 = 25) · ganjil 20 → … 39 (S20 = 400).

## 10. Bank Soal Pilihan Ganda (contoh untuk Latihan & Evaluasi)
Kunci ditandai ✓; pengecoh dipetakan ke miskonsepsi.

| No | Soal | A | B | C | D |
|---|---|---|---|---|---|
| 1 | Bilangan berikut yang termasuk bilangan genap adalah … | 7 (M10) | **12 ✓** | 15 (M10) | 21 (M10) |
| 2 | Rumus suku ke-n dari barisan 1, 3, 5, 7, … adalah … | 2n (M1) | **2n − 1 ✓** | n + 2 | 2n + 1 |
| 3 | Rumus suku ke-n dari barisan 2, 4, 6, 8, … adalah … | **2n ✓** | 2n − 1 (M2) | n² | n + 1 |
| 4 | Suku ke-10 dari barisan 2, 4, 6, … adalah … | 19 (M2) | **20 ✓** | 22 (M9) | 110 (M6) |
| 5 | Suku ke-25 dari barisan 1, 3, 5, … adalah … | 50 (M3) | **49 ✓** | 47 (M9) | 625 (M6) |
| 6 | Suku ke-100 dari barisan bilangan ganjil adalah … | 200 (M3) | 201 (M9) | **199 ✓** | 197 (M9) |
| 7 | Bilangan 37 adalah suku ke berapa pada barisan bilangan ganjil? | 18 | **19 ✓** | 20 | 37 |
| 8 | Jumlah 10 bilangan genap pertama adalah … | 100 (M7) | 20 (M5) | 90 | **110 ✓** |
| 9 | Jumlah 15 bilangan ganjil pertama adalah … | **225 ✓** | 240 (M8) | 29 (M5) | 210 |
| 10 | Baris pertama gedung berisi 1 kursi, baris kedua 3 kursi, baris ketiga 5 kursi, dan seterusnya. Banyak kursi di baris ke-20 adalah … | 40 (M3) | **39 ✓** | 400 (M6) | 41 (M9) |

File sumber untuk server Python: `backend/data/bank_soal_evaluasi.json` (format: `{versi, soal: [{no, teks, pilihan: [..4], kunci, pengecoh: {A: "M10", ...}}]}`).

Pre-test dan post-test memakai soal yang **setara** (tipe sama, angka berbeda) agar hasilnya bisa dibandingkan. Soal di atas adalah versi A; versi B dibuat dengan mengganti angka (mis. suku ke-12, ke-30, ke-150).

## 11. Teks Antarmuka: Masuk, Pasang Aplikasi, Sinkron
### 11.1 Layar Masuk
| Elemen | Teks |
|---|---|
| Judul | "Halo! Selamat datang di PolaKu" |
| Label | "Nama panggilanmu" (placeholder "Contoh: Rani") — **tidak ada isian kode kelas** (aplikasi terbuka untuk semua orang) |
| Tombol | "Mulai Belajar" |
| Keterangan | "Tidak perlu daftar akun atau password." |
| Error | nama kosong → "Tulis nama panggilanmu dulu, ya." · nama > 30 huruf → "Nama terlalu panjang (maks. 30 huruf)." |

### 11.2 Pasang Aplikasi
| Elemen | Teks |
|---|---|
| Kartu di Beranda | Judul "Pasang PolaKu di HP" · isi "Buka lebih cepat & bisa dipakai tanpa internet." · tombol "Pasang Sekarang" |
| Setelah berhasil | "PolaKu sudah terpasang. Buka dari layar utama HP-mu." |
| Petunjuk iPhone | ① "Ketuk tombol **Bagikan** ⬆ di bawah layar Safari." ② "Pilih **Tambahkan ke Layar Utama** ➕." ③ "Ketuk **Tambah**." |
| Petunjuk Android (cadangan) | ① "Ketuk menu ⋮ di pojok kanan atas Chrome." ② "Pilih **Instal aplikasi** / **Tambahkan ke layar utama**." |

### 11.3 Sinkron & Pembaruan
| Keadaan | Teks |
|---|---|
| Tersinkron | "Tersinkron ✓ — nilaimu sudah terkirim ke guru." |
| Menunggu | "{n} hasil menunggu dikirim." · tombol "Kirim sekarang" |
| Offline | "Kamu sedang offline. Nilaimu disimpan di HP dan akan dikirim nanti." |
| Versi baru | "Versi baru PolaKu tersedia." · tombol "Muat ulang" |
