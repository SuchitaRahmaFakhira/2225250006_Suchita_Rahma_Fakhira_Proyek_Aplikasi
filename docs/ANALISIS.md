# ANALISIS — Tahap Analysis (ADDIE)

Sumber: *Hasil Wawancara Cognitive Load ADDIE Siswa SMP pada Materi Pola Bilangan Ganjil Genap* (pewawancara: Suchita Rahma Fakhira).

## 1. Profil Responden
| Aspek | Keterangan |
|---|---|
| Kode siswa | S01 |
| Kelas | VIII SMP |
| Tanggal | 4 November 2026 |
| Durasi | 21 menit (daring, video call) |
| Artefak pemicu | Latihan soal (soal pemantik) |
| Bukti belajar | Catatan siswa: pola titik ganjil (1, 3, 5, 7, 9), `Un = 2n − 1`, contoh `U6 = 11`, `U100 = 199`; pola genap, persegi, segitiga, persegi panjang beserta rumusnya |

## 2. Pengalaman Belajar (K)
- Belajar materi di awal kelas VIII; pola pembelajaran: guru menjelaskan → latihan soal → kadang diskusi kelompok (K02).
- Masih ingat rumus dasar `Un = 2n` (genap) dan `Un = 2n − 1` (ganjil) (K01).
- Bisa membedakan bilangan ganjil/genap dari **angka satuan**, tetapi **bingung memilih rumus** (K03).

## 3. Temuan per Jenis Beban Kognitif

### Intrinsic Load (IL) — kompleksitas materi
| Kode | Kutipan inti | Makna |
|---|---|---|
| IL01 | "Yang paling sulit itu membedakan pola ganjil dan genap, terus menentukan rumusnya. Kadang saya tertukar dan lupa rumusnya." | Kesulitan utama: identifikasi pola & pemilihan rumus |
| IL02 | "Harus memahami konsepnya dulu, tetapi terkadang masih bingung menggunakan rumus." | Perlu memahami informasi soal sebelum memilih rumus |
| IL03 | "Materi perkalian dan kelipatan membantu saya." | Prasyarat: perkalian & kelipatan 2 |
| IL04 | "Kalau angkanya besar, saya agak kesulitan... Kalau hanya mencari angka selanjutnya, lebih mudah." | Angka besar menambah beban; suku berikutnya mudah |
| IL05 | "Bingung kalau diminta mencari jumlah suku dari suku pertama sampai suku tertentu." | Jumlah suku (Sn) adalah titik sulit kedua |

### Extraneous Load (EL) — beban dari cara penyajian
| Kode | Kutipan inti | Makna |
|---|---|---|
| EL01 | "Kadang saya tertinggal langkahnya karena penjelasan guru terlalu cepat." | Butuh kontrol tempo sendiri |
| EL02 | "Kalau ada gambar atau tabel berwarna, saya lebih mudah memahami." | Visual & tabel berwarna membantu |
| EL03 | "Kalau penjelasannya terlalu panjang, saya jadi bosan. Lebih suka singkat, sederhana, dan jelas." | Teks ringkas |
| EL04 | "Kalau belum paham, saya membaca dan mempelajarinya lagi." | Materi harus bisa diulang |
| EL05 | "Kalau angkanya besar, saya lebih sulit mengerjakan perkalian dan pengurangannya." | Pecah perhitungan |

### Germane Load (GL) — beban yang membangun pemahaman
| Kode | Kutipan inti | Makna |
|---|---|---|
| GL01 | "Contoh soal membantu saya mengingat materi." | *Worked example* efektif |
| GL02 | "Saya memeriksa kembali jawaban supaya tahu apakah ada langkah yang terlewat." | Fasilitasi pengecekan |
| GL03 | "Kalau ada contoh soal, saya lebih mudah mengerjakan soal baru yang bentuknya hampir sama." | Contoh serupa → kemandirian |
| GL04 | "Pernah menjelaskan rumus kepada teman sebangku... belajar bersama membantu." | Self-explanation membantu |
| GL05 | "Kalau menemukan pola baru, saya mencocokkannya dengan soal yang pernah dikerjakan." | Penalaran analogis |

### Rekomendasi Desain dari Siswa (DS)
| Kode | Kutipan inti |
|---|---|
| DS01 | "Saya paling membutuhkan latihan soal... kalau sering mengerjakan soal yang mirip, saya lebih mudah mengingatnya." |
| DS02 | "Dijelaskan dulu bilangan ganjil dan genap, kemudian rumusnya, lalu diberikan contoh sebelum latihan soal." |
| DS03 | "Jangan terlalu banyak penjelasan panjang, gambar, atau animasi. Tampilannya sederhana, jelas, dan warnanya tidak terlalu terang." |

**Kesimpulan siswa:** kesulitan terbesar = *membedakan pola dan menentukan rumus*; yang paling membantu = *contoh soal dan penjelasan yang jelas*.

## 4. Matriks Temuan → Implikasi Desain
| Kode | Temuan | Implikasi untuk aplikasi | Fitur (lihat PRD) |
|---|---|---|---|
| IL01, K03, Penutup 1 | Tertukar pola ganjil/genap, lupa rumus | Penuntun "Pilih Rumus" ("Suku pertama 1 atau 2?") + Kartu Rumus selalu tersedia | F2, F7 |
| IL05 | Bingung Sn | Modul Sn terpisah, setelah Un dikuasai | F5 |
| IL04, EL05 | Angka besar sulit | Langkah dipecah; level n kecil → besar | F3, F4 |
| IL03 | Perkalian/kelipatan membantu | Pemanasan kelipatan 2 | F1 |
| EL01, EL04 | Penjelasan terlalu cepat | Tombol "Langkah berikutnya", bisa diulang | F1–F5 |
| EL03, DS03 | Penjelasan panjang membosankan; tampilan ramai | ≤ 3 kalimat per layar, animasi minimal, warna kalem | Desain |
| EL02 | Gambar/tabel berwarna membantu | Visual titik + tabel n–Un berkode warna | F1, F2 |
| GL01, GL03 | Contoh soal membantu | Worked example → faded example → latihan | F3, F4 |
| GL02 | Mengecek jawaban | "Cek Jawabanku" (daftar suku awal) | F8 |
| GL05 | Mencocokkan dengan soal lama | Label tipe soal + "Lihat contoh serupa" | F4 |
| DS01 | Butuh banyak latihan mirip | Generator soal acak per tipe | F4 |
| DS02 | Urutan materi | Alur modul tetap | Alur |
| GL04 | Menjelaskan ke teman | Prompt refleksi "Jelaskan dengan kata-katamu" | F10 |

## 5. Keterbatasan Analisis
- Hanya **1 responden** (S01) → temuan bersifat indikatif. Disarankan menambah 2–4 siswa atau mewawancarai guru pada tahap evaluasi.
- Wawancara belum menggali soal **konteks/cerita** (literasi). Aspek literasi pada PRD bersumber dari kerangka literasi matematika (PISA: merumuskan, menerapkan, menafsirkan) dan perlu divalidasi pada uji coba.
