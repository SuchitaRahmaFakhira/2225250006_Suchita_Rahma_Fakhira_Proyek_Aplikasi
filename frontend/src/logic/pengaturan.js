// Pengaturan tampilan: tema & ukuran huruf.
import { useEffect, useState } from 'react'
import { baca, simpan } from './penyimpanan.js'

const KUNCI = 'polaku.pengaturan'
const EVENT = 'polaku-pengaturan'
const SKALA = { kecil: 0.9, normal: 1, besar: 1.15 }

export const bacaPengaturan = () => ({ tema: 'otomatis', huruf: 'normal', ...baca(KUNCI, {}) })

export function terapkanPengaturan(p = bacaPengaturan()) {
  const html = document.documentElement
  if (p.tema === 'otomatis') delete html.dataset.tema
  else html.dataset.tema = p.tema
  html.style.setProperty('--skala', SKALA[p.huruf] ?? 1)
}

export function ubahPengaturan(perubahan) {
  const baru = { ...bacaPengaturan(), ...perubahan }
  simpan(KUNCI, baru)
  terapkanPengaturan(baru)
  window.dispatchEvent(new Event(EVENT))
}

export function usePengaturan() {
  const [p, setP] = useState(bacaPengaturan)
  useEffect(() => {
    const segarkan = () => setP(bacaPengaturan())
    window.addEventListener(EVENT, segarkan)
    return () => window.removeEventListener(EVENT, segarkan)
  }, [])
  return p
}
