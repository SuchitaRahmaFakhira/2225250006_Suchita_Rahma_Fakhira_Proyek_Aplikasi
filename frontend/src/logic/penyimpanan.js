// Pembungkus localStorage yang aman (bisa diblokir di mode privat).
// Jika gagal, data disimpan di memori agar aplikasi tetap berjalan.
const cadangan = new Map()

export function baca(kunci, bawaan) {
  try {
    const teks = window.localStorage.getItem(kunci)
    if (teks !== null) return JSON.parse(teks)
  } catch {
    if (cadangan.has(kunci)) return cadangan.get(kunci)
  }
  return cadangan.has(kunci) ? cadangan.get(kunci) : bawaan
}

export function simpan(kunci, nilai) {
  cadangan.set(kunci, nilai)
  try {
    window.localStorage.setItem(kunci, JSON.stringify(nilai))
  } catch {
    /* tetap tersimpan di memori */
  }
}

export function hapus(kunci) {
  cadangan.delete(kunci)
  try {
    window.localStorage.removeItem(kunci)
  } catch {
    /* abaikan */
  }
}

export function idUnik() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}-${Math.random().toString(36).slice(2, 10)}`
}
