// Menilai jawaban dan memilih umpan balik berbasis miskonsepsi.
import { pesanMiskonsepsi } from '../data/miskonsepsi.js'
import { bacaBilangan } from './rumus.js'

/** Menilai soal pilihan ganda. */
export function periksaPG(soal, indeksPilihan) {
  if (indeksPilihan === soal.kunci) return { benar: true, kode: null, pesan: null }
  const kode = soal.pilihan[indeksPilihan]?.kode ?? 'UMUM'
  return { benar: false, kode, pesan: pesanMiskonsepsi(kode, soal) }
}

/**
 * Menilai soal isian bertahap (angka besar).
 * @param {object} soal  soal dengan format 'bertahap'
 * @param {(number|string|null)[]} jawaban  isian per langkah (indeks pilihan untuk langkah 'pilih')
 */
export function periksaBertahap(soal, jawaban) {
  for (let i = 0; i < soal.langkah.length; i++) {
    const langkah = soal.langkah[i]
    const isi = jawaban[i]
    let benar
    let kode = langkah.kodeSalah
    if (langkah.tipe === 'pilih') {
      benar = isi === langkah.kunci
    } else {
      const baca = bacaBilangan(String(isi ?? ''))
      benar = baca.ok && baca.nilai === langkah.jawaban
      // Langkah terakhir pola ganjil: lupa dikurangi 1?
      if (!benar && baca.ok && soal.pola === 'ganjil' && i === soal.langkah.length - 1 && baca.nilai === 2 * soal.n) {
        kode = 'M3'
      }
    }
    if (!benar) return { benar: false, indeksSalah: i, kode, pesan: pesanMiskonsepsi(kode, soal) }
  }
  return { benar: true, indeksSalah: -1, kode: null, pesan: null }
}
