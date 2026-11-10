// Identitas siswa: cukup nama panggilan (tanpa kode kelas, tanpa password).
// siswaId diberikan server Python saat pertama kali online.
import { useEffect, useState } from 'react'
import { baca, simpan, hapus } from './penyimpanan.js'

const KUNCI = 'polaku.profil'
const EVENT = 'polaku-profil'

/** @returns {{nama: string, siswaId: string|null, namaBelumTerkirim?: boolean} | null} */
export function bacaProfil() {
  return baca(KUNCI, null)
}

export function simpanProfil(profil) {
  simpan(KUNCI, profil)
  window.dispatchEvent(new Event(EVENT))
}

export function hapusProfil() {
  hapus(KUNCI)
  window.dispatchEvent(new Event(EVENT))
}

export function useProfil() {
  const [profil, setProfil] = useState(bacaProfil)
  useEffect(() => {
    const segarkan = () => setProfil(bacaProfil())
    window.addEventListener(EVENT, segarkan)
    return () => window.removeEventListener(EVENT, segarkan)
  }, [])
  return profil
}
