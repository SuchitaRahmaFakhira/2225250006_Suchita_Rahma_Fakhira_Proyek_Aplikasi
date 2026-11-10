// Naskah materi per modul (docs/KONTEN.md bagian 1–4).
// Aturan: satu konsep per layar, maks. 2–3 kalimat (EL03, DS03).
//
// Jenis layar:
//  konsep     { judul, teks[], visual?, rumus?, ingat? }
//  pilihRumus { judul, barisan, pola }
//  contoh     { judul, soal, langkah[] }                 → worked example, dibuka per langkah
//  faded      { judul, soal, langkah[{teks, jawaban?}], alasan? } → sebagian langkah diisi siswa
//  kuis       { judul, jenis }                           → memakai generator soal

export const MODUL = [
  {
    id: 'modul-1',
    nomor: 1,
    judul: 'Kenali Ganjil & Genap',
    deskripsi: 'Ciri bilangan ganjil dan genap.',
    layar: [
      {
        tipe: 'konsep',
        judul: 'Ingat Kelipatan 2',
        teks: ['Kelipatan 2 adalah 2, 4, 6, 8, 10, dan seterusnya.', 'Bilangan ini bisa dibagi 2 tanpa sisa.'],
        visual: { jenis: 'suku', pola: 'genap', n: 5 }
      },
      {
        tipe: 'konsep',
        judul: 'Bilangan Genap',
        teks: ['Bilangan genap bisa dipasangkan semua, tidak ada sisa.', 'Angka satuannya 0, 2, 4, 6, atau 8.'],
        visual: { jenis: 'titik', nilai: 8 }
      },
      {
        tipe: 'konsep',
        judul: 'Bilangan Ganjil',
        teks: ['Bilangan ganjil selalu bersisa 1 jika dipasangkan.', 'Angka satuannya 1, 3, 5, 7, atau 9.'],
        visual: { jenis: 'titik', nilai: 7 }
      },
      {
        tipe: 'konsep',
        judul: 'Cukup Lihat Angka Terakhir',
        teks: ['Untuk bilangan besar, lihat angka satuannya saja.'],
        visual: { jenis: 'satuan', contoh: [348, 1275, 90, 2023] },
        ingat: 'Angka satuan genap → bilangan genap. Angka satuan ganjil → bilangan ganjil.'
      },
      { tipe: 'kuis', judul: 'Kuis Cepat', jenis: 'kuis-jenis' }
    ]
  },
  {
    id: 'modul-2',
    nomor: 2,
    judul: 'Pola & Rumus Un',
    deskripsi: 'Menemukan rumus suku ke-n.',
    layar: [
      {
        tipe: 'konsep',
        judul: 'Apa itu Pola Bilangan?',
        teks: ['Pola bilangan adalah barisan bilangan dengan aturan tetap.', 'Un artinya suku ke-n. U1 suku pertama, U2 suku kedua, dan seterusnya.'],
        visual: { jenis: 'suku', pola: 'ganjil', n: 5, label: true }
      },
      {
        tipe: 'konsep',
        judul: 'Pola Bilangan Genap',
        teks: ['Perhatikan tabelnya. Setiap suku sama dengan 2 × n.'],
        visual: { jenis: 'tabel', pola: 'genap', n: 5 },
        rumus: 'Un = 2n'
      },
      {
        tipe: 'konsep',
        judul: 'Pola Bilangan Ganjil',
        teks: ['Setiap suku sama dengan 2 × n, lalu dikurangi 1.'],
        visual: { jenis: 'tabel', pola: 'ganjil', n: 5, titik: true },
        rumus: 'Un = 2n − 1'
      },
      {
        tipe: 'konsep',
        judul: 'Bandingkan Keduanya',
        teks: ['Pada n yang sama, suku ganjil selalu 1 lebih kecil dari suku genap.'],
        visual: { jenis: 'bandingkan', n: 5 },
        ingat: 'Lihat suku pertama: 2 → genap (2n), 1 → ganjil (2n − 1).'
      },
      { tipe: 'pilihRumus', judul: 'Pilih Rumusnya', barisan: '2, 4, 6, 8, …', pola: 'genap' },
      { tipe: 'pilihRumus', judul: 'Pilih Rumusnya', barisan: '1, 3, 5, 7, …', pola: 'ganjil' },
      { tipe: 'kuis', judul: 'Kuis Pilih Rumus', jenis: 'kuis-rumus' }
    ]
  },
  {
    id: 'modul-3',
    nomor: 3,
    judul: 'Contoh Soal',
    deskripsi: 'Contoh lengkap, lalu coba sendiri.',
    layar: [
      {
        tipe: 'contoh',
        judul: 'Contoh 1 · Suku ke-n genap',
        soal: 'Tentukan suku ke-8 dari barisan 2, 4, 6, …',
        langkah: ['Suku pertama 2 → pola genap → Un = 2n', 'U8 = 2 × 8', 'U8 = 16', 'Cek: 2, 4, 6, 8, 10, 12, 14, 16 ✓']
      },
      {
        tipe: 'contoh',
        judul: 'Contoh 2 · Suku ke-n ganjil',
        soal: 'Tentukan suku ke-45 dari barisan 1, 3, 5, …',
        langkah: ['Suku pertama 1 → pola ganjil → Un = 2n − 1', 'U45 = 2 × 45 − 1', '2 × 45 = 90', '90 − 1 = 89', 'Cek: 89 bilangan ganjil ✓']
      },
      {
        tipe: 'contoh',
        judul: 'Contoh 3 · Angka besar',
        soal: 'Tentukan suku ke-40 dari barisan 2, 4, 6, …',
        langkah: ['Suku pertama 2 → pola genap → Un = 2n', 'U40 = 2 × 40', 'U40 = 80', 'Cek: 80 bilangan genap ✓']
      },
      {
        tipe: 'contoh',
        judul: 'Contoh 4 · Mencari n',
        soal: 'Bilangan ganjil 37 adalah suku ke berapa?',
        langkah: ['Pola ganjil: 2n − 1 = 37', '2n = 37 + 1 = 38', 'n = 38 ÷ 2 = 19', 'Jadi 37 adalah suku ke-19']
      },
      {
        tipe: 'faded',
        judul: 'Coba Sendiri 1 · Genap',
        soal: 'Tentukan suku ke-15 dari barisan 2, 4, 6, …',
        langkah: [{ teks: 'Suku pertama 2 → pola genap → Un = 2n' }, { teks: 'U15 = 2 × 15' }, { teks: 'U15 =', jawaban: 30 }],
        alasan: { tanya: 'Mengapa memakai rumus Un = 2n?', pilihan: ['Karena suku pertamanya 2', 'Karena n-nya besar', 'Karena hasilnya ganjil'], kunci: 0 }
      },
      {
        tipe: 'faded',
        judul: 'Coba Sendiri 2 · Ganjil',
        soal: 'Tentukan suku ke-25 dari barisan 1, 3, 5, …',
        langkah: [{ teks: 'Suku pertama 1 → pola ganjil → Un = 2n − 1' }, { teks: 'U25 = 2 × 25 − 1' }, { teks: '2 × 25 =', jawaban: 50 }, { teks: '50 − 1 =', jawaban: 49 }],
        alasan: { tanya: 'Mengapa memakai rumus Un = 2n − 1?', pilihan: ['Karena n = 25 ganjil', 'Karena suku pertamanya 1', 'Karena hasilnya genap'], kunci: 1 }
      },
      {
        tipe: 'faded',
        judul: 'Coba Sendiri 3 · Ganjil',
        soal: 'Tentukan suku ke-60 dari barisan 1, 3, 5, …',
        langkah: [{ teks: 'Suku pertama 1 → pola ganjil → Un = 2n − 1' }, { teks: 'U60 = 2 × 60 − 1' }, { teks: '2 × 60 =', jawaban: 120 }, { teks: '120 − 1 =', jawaban: 119 }]
      },
      {
        tipe: 'faded',
        judul: 'Coba Sendiri 4 · Mencari n',
        soal: 'Bilangan genap 48 adalah suku ke berapa?',
        langkah: [{ teks: 'Pola genap: 2n = 48' }, { teks: 'n = 48 ÷ 2 =', jawaban: 24 }]
      }
    ]
  },
  {
    id: 'modul-4',
    nomor: 4,
    judul: 'Jumlah Suku (Sn)',
    deskripsi: 'Menjumlahkan suku pertama sampai suku ke-n.',
    layar: [
      {
        tipe: 'konsep',
        judul: 'Apa itu Sn?',
        teks: ['Sn adalah jumlah suku pertama sampai suku ke-n.', 'Beda dengan Un yang hanya satu suku.'],
        visual: { jenis: 'jumlah', pola: 'ganjil', n: 4 }
      },
      {
        tipe: 'konsep',
        judul: 'Jumlah Ganjil = Persegi',
        teks: ['1 + 3 + 5 + 7 = 16 = 4 × 4.', 'Setiap bilangan ganjil menambah satu "siku" pada persegi.'],
        visual: { jenis: 'sn', pola: 'ganjil', n: 4 },
        rumus: 'Sn = n²'
      },
      {
        tipe: 'konsep',
        judul: 'Jumlah Genap = Persegi Panjang',
        teks: ['2 + 4 + 6 = 12 = 3 × 4.', 'Bentuknya n baris dan (n + 1) kolom.'],
        visual: { jenis: 'sn', pola: 'genap', n: 3 },
        rumus: 'Sn = n(n + 1)'
      },
      {
        tipe: 'konsep',
        judul: 'Un atau Sn?',
        teks: ['Ditanya "suku ke-…" → pakai Un.', 'Ditanya "jumlah …" → pakai Sn.'],
        ingat: 'Un = satu suku. Sn = jumlah banyak suku.'
      },
      {
        tipe: 'contoh',
        judul: 'Contoh · Jumlah genap',
        soal: 'Berapa jumlah 10 bilangan genap pertama?',
        langkah: ['Ditanya jumlah bilangan genap → Sn = n(n + 1)', 'S10 = 10 × 11', 'S10 = 110']
      },
      {
        tipe: 'contoh',
        judul: 'Contoh · Jumlah ganjil',
        soal: 'Berapa jumlah 15 bilangan ganjil pertama?',
        langkah: ['Ditanya jumlah bilangan ganjil → Sn = n²', 'S15 = 15 × 15', 'S15 = 225']
      },
      { tipe: 'kuis', judul: 'Kuis Jumlah Suku', jenis: 'kuis-sn' }
    ]
  }
]

export const cariModul = (id) => MODUL.find((m) => m.id === id)
