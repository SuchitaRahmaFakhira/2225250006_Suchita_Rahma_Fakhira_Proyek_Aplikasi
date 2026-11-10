// Generator soal acak berbasis templat (docs/KONTEN.md bagian 5).
// Pengecoh pilihan ganda dibuat dari miskonsepsi (bagian 6) agar umpan balik bisa spesifik.
import {
  hitungUn, hitungSn, rumusUn, jenisBilangan, angkaSatuan, formatAngka as f
} from './rumus.js'

export const RENTANG = {
  T1: { 1: [1, 99], 2: [100, 999], 3: [1000, 99999] },
  UN: { 1: [5, 15], 2: [16, 50], 3: [51, 500] },
  SN: { 1: [3, 10], 2: [11, 30], 3: [31, 100] }
}

export const LABEL_TIPE = {
  T1: 'Jenis bilangan',
  T2: 'Suku berikutnya',
  T3: 'Pilih rumus',
  T4: 'Suku ke-n genap',
  T5: 'Suku ke-n ganjil',
  T6: 'Mencari n',
  T7: 'Jumlah suku genap',
  T8: 'Jumlah suku ganjil'
}

/** Batas n mulai memakai isian bertahap (docs/PRD.md F6). */
export const BATAS_BERTAHAP = 20

let pengacak = Math.random
/** Untuk pengujian: ganti sumber acak. */
export function aturPengacak(fn) { pengacak = fn ?? Math.random }

export function acak(min, max) { return Math.floor(pengacak() * (max - min + 1)) + min }
export function acakDari(daftar) { return daftar[acak(0, daftar.length - 1)] }
export function kocok(daftar) {
  const hasil = [...daftar]
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = acak(0, i)
    ;[hasil[i], hasil[j]] = [hasil[j], hasil[i]]
  }
  return hasil
}

let nomorSoal = 0
const idBaru = () => `s${Date.now().toString(36)}${(nomorSoal++).toString(36)}`
const acakPola = () => acakDari(['genap', 'ganjil'])
const lainPola = (pola) => (pola === 'genap' ? 'ganjil' : 'genap')
const contohBarisan = (pola, mulai = 1, banyak = 4) =>
  Array.from({ length: banyak }, (_, i) => f(hitungUn(pola, mulai + i))).join(', ')

/**
 * Menyusun 4 pilihan: 1 kunci + 3 pengecoh unik (bertanda kode miskonsepsi).
 * @param {number|string} benar
 * @param {{nilai: number|string, kode: string|null}[]} pengecoh
 */
export function susunPilihan(benar, pengecoh, cadangan = () => null) {
  const terpakai = new Set([String(benar)])
  const dipilih = []
  for (const p of pengecoh) {
    const kunciTeks = String(p.nilai)
    if (dipilih.length < 3 && !terpakai.has(kunciTeks) && !(typeof p.nilai === 'number' && p.nilai < 0)) {
      terpakai.add(kunciTeks)
      dipilih.push(p)
    }
  }
  let percobaan = 0
  while (dipilih.length < 3 && percobaan++ < 50) {
    const nilai = cadangan()
    if (nilai !== null && !terpakai.has(String(nilai)) && !(typeof nilai === 'number' && nilai < 0)) {
      terpakai.add(String(nilai))
      dipilih.push({ nilai, kode: null })
    }
  }
  const semua = kocok([{ nilai: benar, kode: null, benar: true }, ...dipilih])
  return {
    pilihan: semua.map((p) => ({ teks: typeof p.nilai === 'number' ? f(p.nilai) : p.nilai, kode: p.kode })),
    kunci: semua.findIndex((p) => p.benar)
  }
}

function petunjukUn(pola, n) {
  return [
    'Lihat suku pertama barisan. Mulai dari 1 atau 2?',
    pola === 'genap' ? 'Mulai dari 2 → pola genap: Un = 2n.' : 'Mulai dari 1 → pola ganjil: Un = 2n − 1.',
    pola === 'genap' ? `U${n} = 2 × ${n}. Hitung perkaliannya.` : `U${n} = 2 × ${n} − 1. Hitung 2 × ${n} dulu.`
  ]
}

function petunjukSn(pola, n) {
  return [
    'Soal menanyakan JUMLAH, jadi pakai rumus Sn.',
    'Genap: Sn = n(n + 1). Ganjil: Sn = n².',
    pola === 'genap' ? `S${n} = ${n} × ${n + 1}.` : `S${n} = ${n} × ${n}.`
  ]
}

// ---------- Templat per tipe ----------

function soalT1(level) {
  const x = acak(...RENTANG.T1[level])
  const jenis = jenisBilangan(x)
  return {
    tipe: 'T1', x, jawaban: jenis,
    teks: `Apakah ${f(x)} bilangan ganjil atau genap?`,
    pilihan: [{ teks: 'Ganjil', kode: jenis === 'ganjil' ? null : 'M10' }, { teks: 'Genap', kode: jenis === 'genap' ? null : 'M10' }],
    kunci: jenis === 'ganjil' ? 0 : 1,
    petunjuk: [
      'Lihat angka paling belakang (angka satuan).',
      'Angka satuan 0, 2, 4, 6, 8 → genap. Angka satuan 1, 3, 5, 7, 9 → ganjil.',
      `Angka satuan ${f(x)} adalah ${angkaSatuan(x)}.`
    ]
  }
}

function soalT2(level, pola = acakPola()) {
  const mulai = level === 1 ? 1 : acak(4, level === 2 ? 30 : 200)
  const akhir = hitungUn(pola, mulai + 3)
  const benar = akhir + 2
  return {
    tipe: 'T2', pola, jawaban: benar,
    teks: `${contohBarisan(pola, mulai)}, … Suku berikutnya adalah …`,
    ...susunPilihan(benar, [
      { nilai: akhir + 1, kode: 'M12' },
      { nilai: akhir + 4, kode: 'M12' },
      { nilai: akhir + 3, kode: 'M12' }
    ]),
    petunjuk: ['Hitung selisih dua suku yang berdekatan.', 'Selisihnya selalu 2.', `Suku berikutnya = ${f(akhir)} + 2.`]
  }
}

function soalT3(_level, pola = acakPola()) {
  const benar = rumusUn(pola)
  return {
    tipe: 'T3', pola, jawaban: benar,
    teks: `Rumus suku ke-n dari barisan ${contohBarisan(pola)}, … adalah …`,
    ...susunPilihan(benar, [
      { nilai: rumusUn(lainPola(pola)), kode: pola === 'genap' ? 'M2' : 'M1' },
      { nilai: 'Un = n²', kode: null },
      { nilai: pola === 'genap' ? 'Un = n + 2' : 'Un = 2n + 1', kode: null }
    ]),
    petunjuk: [
      'Lihat suku pertama barisan.',
      'Mulai dari 2 → genap. Mulai dari 1 → ganjil.',
      pola === 'genap' ? 'Pola genap memakai Un = 2n.' : 'Pola ganjil memakai Un = 2n − 1.'
    ]
  }
}

function soalUn(level, pola = acakPola(), opsi = {}) {
  const n = acak(...RENTANG.UN[level])
  const benar = hitungUn(pola, n)
  const dasar = {
    tipe: pola === 'genap' ? 'T4' : 'T5', pola, n, jawaban: benar,
    teks: `Suku ke-${f(n)} dari barisan ${contohBarisan(pola, 1, 3)}, … adalah …`,
    petunjuk: petunjukUn(pola, n)
  }
  if (n >= BATAS_BERTAHAP && opsi.bolehBertahap !== false) {
    const langkah = [
      { label: 'Rumus yang dipakai', tipe: 'pilih', pilihan: ['Un = 2n', 'Un = 2n − 1'], kunci: pola === 'genap' ? 0 : 1, kodeSalah: pola === 'genap' ? 'M2' : 'M1' },
      { label: `2 × ${f(n)} =`, tipe: 'angka', jawaban: 2 * n, kodeSalah: 'M4' }
    ]
    if (pola === 'ganjil') langkah.push({ label: 'Hasil tadi − 1 =', tipe: 'angka', jawaban: benar, kodeSalah: 'UMUM' })
    return { ...dasar, format: 'bertahap', langkah }
  }
  return {
    ...dasar,
    ...susunPilihan(benar, [
      { nilai: hitungUn(lainPola(pola), n), kode: pola === 'genap' ? 'M2' : 'M1' },
      { nilai: hitungUn(pola, n + 1), kode: 'M9' },
      { nilai: hitungUn(pola, n - 1), kode: 'M9' },
      { nilai: hitungSn(pola, n), kode: 'M6' }
    ])
  }
}

function soalT6(level, pola = acakPola()) {
  const n = acak(...RENTANG.UN[level])
  const x = hitungUn(pola, n)
  return {
    tipe: 'T6', pola, n, x, jawaban: n,
    teks: `Bilangan ${f(x)} adalah suku ke berapa pada barisan bilangan ${pola}?`,
    ...susunPilihan(n, [
      { nilai: n - 1, kode: 'M9' },
      { nilai: n + 1, kode: 'M9' },
      { nilai: x, kode: 'M11' }
    ]),
    petunjuk: [
      'Tulis rumus Un, lalu samakan dengan bilangannya.',
      pola === 'genap' ? `2n = ${f(x)}` : `2n − 1 = ${f(x)}, jadi 2n = ${f(x + 1)}`,
      pola === 'genap' ? `n = ${f(x)} ÷ 2` : `n = ${f(x + 1)} ÷ 2`
    ]
  }
}

function soalSn(level, pola = acakPola()) {
  const n = acak(...RENTANG.SN[level])
  const benar = hitungSn(pola, n)
  return {
    tipe: pola === 'genap' ? 'T7' : 'T8', pola, n, jawaban: benar,
    teks: `Jumlah ${f(n)} bilangan ${pola} pertama adalah …`,
    ...susunPilihan(benar, [
      { nilai: hitungSn(lainPola(pola), n), kode: pola === 'genap' ? 'M7' : 'M8' },
      { nilai: hitungUn(pola, n), kode: 'M5' },
      { nilai: n * (n - 1), kode: null }
    ], () => benar + acakDari([-2, 2, 10, -10]) * acak(1, 3)),
    petunjuk: petunjukSn(pola, n)
  }
}

const TEMPLAT = { T1: soalT1, T2: soalT2, T3: soalT3, UN: soalUn, T6: soalT6, SN: soalSn }

/**
 * Membuat satu soal.
 * @param {'T1'|'T2'|'T3'|'UN'|'T4'|'T5'|'T6'|'SN'|'T7'|'T8'} tipe
 * @param {1|2|3} level
 */
export function buatSoal(tipe, level = 1, opsi = {}) {
  let kunciTemplat = tipe
  let pola = opsi.pola
  if (tipe === 'T4' || tipe === 'T5') { kunciTemplat = 'UN'; pola = tipe === 'T4' ? 'genap' : 'ganjil' }
  if (tipe === 'T7' || tipe === 'T8') { kunciTemplat = 'SN'; pola = tipe === 'T7' ? 'genap' : 'ganjil' }
  const pembuat = TEMPLAT[kunciTemplat]
  if (!pembuat) throw new Error(`Tipe soal tidak dikenal: ${tipe}`)
  const soal = pembuat(level, pola ?? undefined, opsi)
  return { id: idBaru(), format: 'pg', level, ...soal, label: LABEL_TIPE[soal.tipe] }
}

// ---------- Rencana sesi ----------
export const RENCANA_SESI = {
  un: ['T3', 'T2', 'UN', 'UN', 'T6'],
  sn: ['SN', 'SN', 'UN', 'SN', 'SN'], // satu soal Un untuk melatih membedakan Un vs Sn
  'kuis-jenis': ['T1', 'T1', 'T1', 'T1', 'T1'],
  'kuis-rumus': ['T3', 'T3', 'T3'],
  'kuis-sn': ['SN', 'SN', 'SN']
}

/** Level untuk kuis di dalam modul (dari mudah ke sulit, tidak adaptif). */
const LEVEL_KUIS = { 'kuis-jenis': [1, 1, 2, 2, 3], 'kuis-rumus': [1, 1, 1], 'kuis-sn': [1, 1, 2] }

export function buatSoalSesi(jenis, indeks, level = 1) {
  const tipe = RENCANA_SESI[jenis][indeks]
  const lvl = LEVEL_KUIS[jenis]?.[indeks] ?? level
  const opsi = jenis === 'sn' && tipe === 'UN' ? { bolehBertahap: false } : {}
  return buatSoal(tipe, lvl, opsi)
}

/** Aturan kesulitan adaptif (PRD F12): 3 benar berturut → naik, 2 salah berturut → turun. */
export function levelBerikut(level, riwayatBenar) {
  const tiga = riwayatBenar.slice(-3)
  const dua = riwayatBenar.slice(-2)
  if (tiga.length === 3 && tiga.every(Boolean)) return { level: Math.min(3, level + 1), berubah: level < 3 }
  if (dua.length === 2 && dua.every((b) => !b)) return { level: Math.max(1, level - 1), berubah: level > 1 }
  return { level, berubah: false }
}

// ---------- Langkah penyelesaian & contoh serupa ----------

export function langkahPenyelesaian(soal) {
  const { pola, n, x } = soal
  switch (soal.tipe) {
    case 'T1':
      return [`Angka satuan ${f(x)} adalah ${angkaSatuan(x)}.`, `${angkaSatuan(x)} termasuk angka ${soal.jawaban}, jadi ${f(x)} bilangan ${soal.jawaban}.`]
    case 'T2':
      return ['Selisih tiap suku adalah 2.', `Suku berikutnya = ${f(soal.jawaban - 2)} + 2 = ${f(soal.jawaban)}.`]
    case 'T3':
      return [`Suku pertama barisan adalah ${pola === 'genap' ? 2 : 1} → pola ${pola}.`, `Rumusnya: ${rumusUn(pola)}.`]
    case 'T4':
    case 'T5':
      return pola === 'genap'
        ? [`Suku pertama 2 → pola genap → Un = 2n.`, `U${f(n)} = 2 × ${f(n)}`, `U${f(n)} = ${f(2 * n)}`]
        : [`Suku pertama 1 → pola ganjil → Un = 2n − 1.`, `U${f(n)} = 2 × ${f(n)} − 1`, `2 × ${f(n)} = ${f(2 * n)}`, `${f(2 * n)} − 1 = ${f(2 * n - 1)}`]
    case 'T6':
      return pola === 'genap'
        ? [`Pola genap: 2n = ${f(x)}`, `n = ${f(x)} ÷ 2 = ${f(n)}`]
        : [`Pola ganjil: 2n − 1 = ${f(x)}`, `2n = ${f(x)} + 1 = ${f(x + 1)}`, `n = ${f(x + 1)} ÷ 2 = ${f(n)}`]
    case 'T7':
      return ['Ditanya jumlah bilangan genap → Sn = n(n + 1).', `S${f(n)} = ${f(n)} × ${f(n + 1)}`, `S${f(n)} = ${f(hitungSn('genap', n))}`]
    case 'T8':
      return ['Ditanya jumlah bilangan ganjil → Sn = n².', `S${f(n)} = ${f(n)} × ${f(n)}`, `S${f(n)} = ${f(hitungSn('ganjil', n))}`]
    default:
      return soal.pembahasan ?? []
  }
}

export function teksJawaban(soal) {
  if (soal.format === 'bertahap' || typeof soal.jawaban === 'number') return f(soal.jawaban)
  if (soal.tipe === 'T1') return soal.jawaban === 'genap' ? 'Genap' : 'Ganjil'
  return String(soal.jawaban)
}

/** Contoh serupa (GL03/GL05): soal tipe sama dengan angka berbeda, lengkap dengan langkahnya. */
export function contohSerupa(soal) {
  if (!LABEL_TIPE[soal.tipe]) return null // soal konteks tidak punya contoh acak
  const buat = () => buatSoal(soal.tipe, 1, { pola: soal.pola, bolehBertahap: false })
  let contoh = buat()
  for (let i = 0; i < 5 && contoh.jawaban === soal.jawaban; i++) contoh = buat()
  return { teks: contoh.teks, langkah: langkahPenyelesaian(contoh), jawaban: teksJawaban(contoh) }
}
