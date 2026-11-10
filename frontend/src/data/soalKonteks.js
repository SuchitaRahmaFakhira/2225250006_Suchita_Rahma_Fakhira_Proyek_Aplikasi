// Soal konteks/literasi (docs/KONTEN.md bagian 7).
// Setiap cerita punya 3 tahap literasi: Merumuskan → Menerapkan → Menafsirkan.
import { kocok } from '../logic/generatorSoal.js'

const CERITA = [
  {
    id: 'kursi',
    cerita: 'Baris pertama gedung pertunjukan berisi 1 kursi, baris kedua 3 kursi, baris ketiga 5 kursi, dan seterusnya.',
    tahap: [
      {
        label: 'Merumuskan', teks: 'Banyak kursi tiap baris membentuk pola apa?',
        pilihan: [['Pola ganjil, Un = 2n − 1', null], ['Pola genap, Un = 2n', 'M1'], ['Pola persegi, Un = n²', null]], kunci: 0,
        pembahasan: ['Barisannya 1, 3, 5, … dimulai dari 1.', 'Jadi pola ganjil dengan Un = 2n − 1.']
      },
      {
        label: 'Menerapkan', teks: 'Berapa kursi di baris ke-20?',
        pilihan: [['40', 'M3'], ['39', null], ['400', 'M6'], ['41', 'M9']], kunci: 1, n: 20,
        pembahasan: ['U20 = 2 × 20 − 1', '= 40 − 1 = 39 kursi']
      },
      {
        label: 'Menafsirkan', teks: 'Gedung punya 20 baris. Apakah cukup untuk 350 penonton?',
        pilihan: [['Cukup, total kursinya 400', null], ['Tidak cukup, hanya ada 39 kursi', 'M6'], ['Cukup, total kursinya 420', 'M8']], kunci: 0, n: 20,
        pembahasan: ['Total kursi = S20 = 20² = 400.', '400 lebih dari 350, jadi cukup.']
      }
    ]
  },
  {
    id: 'rumah',
    cerita: 'Rumah di sisi kanan sebuah jalan bernomor genap: 2, 4, 6, dan seterusnya.',
    tahap: [
      {
        label: 'Merumuskan', teks: 'Nomor rumah di sisi kanan mengikuti rumus apa?',
        pilihan: [['Un = 2n − 1', 'M2'], ['Un = 2n', null], ['Un = n + 2', null]], kunci: 1,
        pembahasan: ['Barisannya 2, 4, 6, … dimulai dari 2.', 'Jadi pola genap dengan Un = 2n.']
      },
      {
        label: 'Menerapkan', teks: 'Rumah ke-35 di sisi kanan bernomor berapa?',
        pilihan: [['69', 'M2'], ['70', null], ['72', 'M9'], ['1.260', 'M6']], kunci: 1, n: 35,
        pembahasan: ['U35 = 2 × 35', '= 70']
      },
      {
        label: 'Menafsirkan', teks: 'Rumah Pak Budi bernomor 48 di sisi kanan. Rumah itu ke berapa dari ujung jalan?',
        pilihan: [['Ke-24', null], ['Ke-48', 'M11'], ['Ke-96', null], ['Ke-23', 'M9']], kunci: 0,
        pembahasan: ['2n = 48', 'n = 48 ÷ 2 = 24, jadi rumah ke-24.']
      }
    ]
  },
  {
    id: 'tabungan',
    cerita: 'Dina menabung Rp2.000 di hari ke-1, Rp4.000 di hari ke-2, Rp6.000 di hari ke-3, dan seterusnya.',
    tahap: [
      {
        label: 'Merumuskan', teks: 'Jika dihitung dalam ribuan rupiah, tabungan harian Dina membentuk pola apa?',
        pilihan: [['Pola genap', null], ['Pola ganjil', 'M2'], ['Tidak berpola', null]], kunci: 0,
        pembahasan: ['Dalam ribuan: 2, 4, 6, … dimulai dari 2.', 'Jadi pola genap.']
      },
      {
        label: 'Menerapkan', teks: 'Berapa uang yang ditabung Dina pada hari ke-10 saja?',
        pilihan: [['Rp20.000', null], ['Rp19.000', 'M2'], ['Rp110.000', 'M6'], ['Rp22.000', 'M9']], kunci: 0, n: 10,
        pembahasan: ['U10 = 2 × 10 = 20 (ribu)', 'Jadi Rp20.000.']
      },
      {
        label: 'Menafsirkan', teks: 'Setelah 10 hari, cukupkah tabungan Dina untuk membeli buku seharga Rp100.000?',
        pilihan: [['Cukup, tabungannya Rp110.000', null], ['Tidak cukup, tabungannya Rp20.000', 'M6'], ['Tidak cukup, tabungannya Rp100.000 pas', 'M7']], kunci: 0, n: 10,
        pembahasan: ['Total = S10 genap = 10 × 11 = 110 (ribu).', 'Rp110.000 > Rp100.000, jadi cukup dan sisa Rp10.000.']
      }
    ]
  },
  {
    id: 'ubin',
    cerita: 'Ubin disusun membentuk huruf L: susunan ke-1 memakai 1 ubin, ke-2 memakai 3 ubin, ke-3 memakai 5 ubin, dan seterusnya.',
    tahap: [
      {
        label: 'Merumuskan', teks: 'Banyak ubin tiap susunan mengikuti rumus apa?',
        pilihan: [['Un = 2n', 'M1'], ['Un = 2n − 1', null], ['Un = n²', null]], kunci: 1,
        pembahasan: ['Barisannya 1, 3, 5, … dimulai dari 1.', 'Jadi Un = 2n − 1.']
      },
      {
        label: 'Menerapkan', teks: 'Berapa ubin pada susunan ke-50?',
        pilihan: [['100', 'M3'], ['99', null], ['101', 'M9'], ['2.500', 'M6']], kunci: 1, n: 50,
        pembahasan: ['U50 = 2 × 50 − 1', '= 100 − 1 = 99 ubin']
      },
      {
        label: 'Menafsirkan', teks: 'Ada 90 ubin. Cukupkah untuk membuat susunan ke-1 sampai ke-10?',
        pilihan: [['Cukup, butuh 19 ubin', 'M6'], ['Tidak cukup, butuh 100 ubin', null], ['Cukup, butuh 90 ubin', null]], kunci: 1, n: 10,
        pembahasan: ['Total ubin = S10 ganjil = 10² = 100.', '90 < 100, jadi kurang 10 ubin.']
      }
    ]
  }
]

/** Membuat sesi soal konteks: 2 cerita acak × 3 tahap = 6 soal. */
export function buatSesiKonteks() {
  const dipilih = kocok(CERITA).slice(0, 2)
  return dipilih.flatMap((c) =>
    c.tahap.map((t, i) => ({
      id: `${c.id}-${i}-${Date.now().toString(36)}`,
      tipe: 'K',
      format: 'pg',
      label: `Konteks · ${t.label}`,
      cerita: c.cerita,
      teks: t.teks,
      n: t.n,
      pilihan: t.pilihan.map(([teks, kode]) => ({ teks, kode })),
      kunci: t.kunci,
      jawaban: t.pilihan[t.kunci][0],
      pembahasan: t.pembahasan,
      petunjuk: [
        'Baca ceritanya pelan-pelan. Bilangan apa saja yang disebut?',
        'Lihat suku pertamanya: 1 → ganjil, 2 → genap. Ditanya satu suku (Un) atau jumlah (Sn)?',
        t.pembahasan[0]
      ]
    }))
  )
}

export const JUMLAH_CERITA = CERITA.length
