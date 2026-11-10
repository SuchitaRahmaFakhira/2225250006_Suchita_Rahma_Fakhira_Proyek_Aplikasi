// Katalog miskonsepsi & umpan balik (docs/KONTEN.md bagian 6).
// Setiap pesan: apa yang salah → mengapa → apa yang benar (maks. 3 kalimat).

const nama = (pola) => (pola === 'genap' ? 'genap' : 'ganjil')

export const MISKONSEPSI = {
  M1: () => 'Kamu memakai rumus genap (2n). Barisan ini dimulai dari 1, jadi pakai Un = 2n − 1.',
  M2: () => 'Kamu memakai rumus ganjil (2n − 1). Barisan ini dimulai dari 2, jadi pola genap: Un = 2n.',
  M3: () => 'Hampir! Setelah menghitung 2 × n, jangan lupa dikurangi 1.',
  M4: (s) => `Rumusnya sudah benar. Coba hitung lagi 2 × ${s.n}.`,
  M5: (s) => `Soal menanyakan jumlah, bukan suku ke-${s.n}. Pakai rumus Sn.`,
  M6: (s) => `Soal menanyakan satu suku saja, bukan jumlah. Pakai rumus Un untuk n = ${s.n}.`,
  M7: () => 'n² adalah rumus jumlah bilangan ganjil. Untuk bilangan genap pakai Sn = n(n + 1).',
  M8: () => 'n(n + 1) adalah rumus jumlah bilangan genap. Untuk bilangan ganjil cukup n × n.',
  M9: (s) => `Hampir! Itu suku sebelum/sesudahnya. Periksa lagi, n = ${s.n}.`,
  M10: (s) => {
    const d = Math.abs(s.x ?? 0) % 10
    return `Lihat angka terakhirnya: ${d}. Angka ${d} menandakan bilangan ${nama(d % 2 === 0 ? 'genap' : 'ganjil')}.`
  },
  M11: () => 'Itu bilangannya sendiri. Yang ditanyakan adalah urutan sukunya (nilai n).',
  M12: () => 'Selisih tiap suku pada pola ini selalu 2. Tambahkan 2 pada suku terakhir.',
  UMUM: () => 'Belum tepat. Coba buka petunjuk 💡 atau lihat contoh serupa.'
}

export function pesanMiskonsepsi(kode, soal = {}) {
  const fn = MISKONSEPSI[kode] ?? MISKONSEPSI.UMUM
  return fn(soal)
}
