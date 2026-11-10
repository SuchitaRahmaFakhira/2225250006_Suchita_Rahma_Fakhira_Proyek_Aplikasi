// Rumus pola bilangan ganjil & genap (lihat docs/KONTEN.md bagian 0).
// pola: 'genap' | 'ganjil'

export function hitungUn(pola, n) {
  return pola === 'genap' ? 2 * n : 2 * n - 1
}

export function hitungSn(pola, n) {
  return pola === 'genap' ? n * (n + 1) : n * n
}

/** Mencari n dari nilai suku x (kebalikan Un). */
export function cariN(pola, x) {
  return pola === 'genap' ? x / 2 : (x + 1) / 2
}

export function rumusUn(pola) {
  return pola === 'genap' ? 'Un = 2n' : 'Un = 2n − 1'
}

export function rumusSn(pola) {
  return pola === 'genap' ? 'Sn = n(n + 1)' : 'Sn = n²'
}

export function sukuPertama(pola) {
  return pola === 'genap' ? 2 : 1
}

export function deret(pola, banyak, mulai = 1) {
  return Array.from({ length: banyak }, (_, i) => hitungUn(pola, mulai + i))
}

/** Jenis bilangan bulat (boleh negatif). */
export function jenisBilangan(x) {
  return Math.abs(x) % 2 === 0 ? 'genap' : 'ganjil'
}

/** Pembagian dengan 2 untuk Kalkulator: memakai nilai mutlak agar mudah dipahami siswa. */
export function bagiDua(x) {
  const mutlak = Math.abs(x)
  return { mutlak, hasil: Math.floor(mutlak / 2), sisa: mutlak % 2 }
}

export function angkaSatuan(x) {
  return Math.abs(x) % 10
}

/** Format angka gaya Indonesia: 1275 → "1.275", -7 → "−7". */
export function formatAngka(x) {
  const teks = Math.abs(x).toLocaleString('id-ID')
  return x < 0 ? `−${teks}` : teks
}

/**
 * Membaca masukan Kalkulator.
 * Menerima "17", "-7", "1.275" (titik ribuan). Menolak desimal dan huruf.
 * @returns {{ok: true, nilai: number} | {ok: false, pesan: string}}
 */
export function bacaBilangan(teks) {
  const bersih = (teks ?? '').trim().replace(/\s+/g, '').replace(/^[−–]/, '-')
  if (bersih === '') return { ok: false, pesan: 'Masukkan bilangan dulu, ya.' }
  let angka = bersih
  if (/^-?\d{1,3}(\.\d{3})+$/.test(bersih)) angka = bersih.replace(/\./g, '')
  if (!/^-?\d+$/.test(angka)) return { ok: false, pesan: 'Masukkan bilangan bulat, misalnya 17.' }
  if (angka.replace('-', '').length > 15) return { ok: false, pesan: 'Angkanya terlalu panjang.' }
  return { ok: true, nilai: Number(angka) }
}
