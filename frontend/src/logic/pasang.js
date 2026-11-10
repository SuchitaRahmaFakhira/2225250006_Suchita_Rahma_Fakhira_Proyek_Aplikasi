// Dukungan "Pasang Aplikasi" (install PWA tanpa Play Store/App Store).
// Modul ini diimpor paling awal (main.jsx) agar event beforeinstallprompt tidak terlewat.
import { useEffect, useState } from 'react'

const EVENT = 'polaku-pasang'
let promptTertunda = null
let baruTerpasang = false

const kabari = () => window.dispatchEvent(new Event(EVENT))

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault() // tampilkan tombol kita sendiri
  promptTertunda = e
  kabari()
})

window.addEventListener('appinstalled', () => {
  promptTertunda = null
  baruTerpasang = true
  kabari()
})

export function sudahTerpasang() {
  return (
    baruTerpasang ||
    window.matchMedia?.('(display-mode: standalone)').matches ||
    window.navigator.standalone === true
  )
}

export function perangkatIOS() {
  const ua = window.navigator.userAgent
  return /iphone|ipad|ipod/i.test(ua) || (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1)
}

/** Memunculkan dialog install bawaan browser (Android/laptop). */
export async function pasangAplikasi() {
  if (!promptTertunda) return 'tidak-tersedia'
  promptTertunda.prompt()
  const { outcome } = await promptTertunda.userChoice
  promptTertunda = null
  kabari()
  return outcome // 'accepted' | 'dismissed'
}

export function usePasang() {
  const hitung = () => ({
    terpasang: sudahTerpasang(),
    bisaOtomatis: !!promptTertunda,
    ios: perangkatIOS()
  })
  const [nilai, setNilai] = useState(hitung)
  useEffect(() => {
    const segarkan = () => setNilai(hitung())
    window.addEventListener(EVENT, segarkan)
    return () => window.removeEventListener(EVENT, segarkan)
  }, [])
  return nilai
}
