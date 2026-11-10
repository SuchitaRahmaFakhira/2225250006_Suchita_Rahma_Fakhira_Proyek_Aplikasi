// Progres belajar siswa (disimpan di HP).
import { useEffect, useState } from 'react'
import { baca, simpan, hapus } from './penyimpanan.js'

const KUNCI = 'polaku.progres'
const EVENT = 'polaku-progres'

const BAWAAN = {
  modul: {},            // { 'modul-1': '2026-11-10T...' }
  posisi: null,         // { modulId, layar }
  latihan: [],          // [{ jenis, skor, maks, petunjuk, waktu }]
  evaluasi: {},         // { pretest: [{skor, maks, waktu}], posttest: [...] }
  level: { un: 1, sn: 1 },
  kartuPasangDitutup: false
}

export function bacaProgres() {
  return { ...BAWAAN, ...baca(KUNCI, {}) }
}

export function ubahProgres(ubah) {
  const baru = ubah(structuredClone(bacaProgres()))
  simpan(KUNCI, baru)
  window.dispatchEvent(new Event(EVENT))
  return baru
}

export function resetProgres() {
  hapus(KUNCI)
  window.dispatchEvent(new Event(EVENT))
}

export function useProgres() {
  const [progres, setProgres] = useState(bacaProgres)
  useEffect(() => {
    const segarkan = () => setProgres(bacaProgres())
    window.addEventListener(EVENT, segarkan)
    window.addEventListener('storage', segarkan)
    return () => {
      window.removeEventListener(EVENT, segarkan)
      window.removeEventListener('storage', segarkan)
    }
  }, [])
  return progres
}

export const selesaikanModul = (id) =>
  ubahProgres((p) => {
    p.modul[id] ??= new Date().toISOString()
    if (p.posisi?.modulId === id) p.posisi = null
    return p
  })

export const simpanPosisi = (modulId, layar) =>
  ubahProgres((p) => ({ ...p, posisi: { modulId, layar } }))

export const catatLatihan = (hasil) =>
  ubahProgres((p) => {
    p.latihan.push({ ...hasil, waktu: new Date().toISOString() })
    p.latihan = p.latihan.slice(-50)
    return p
  })

export const catatEvaluasi = (jenis, hasil) =>
  ubahProgres((p) => {
    p.evaluasi[jenis] = [...(p.evaluasi[jenis] ?? []), { ...hasil, waktu: new Date().toISOString() }]
    return p
  })

export const simpanLevel = (jenis, level) =>
  ubahProgres((p) => ({ ...p, level: { ...p.level, [jenis]: level } }))

// ---------- Aturan membuka materi (urutan DS02) ----------
export const DAFTAR_MODUL = ['modul-1', 'modul-2', 'modul-3', 'modul-4']

const sudahLatihan = (p, jenis) => p.latihan.some((l) => l.jenis === jenis)

export function terbuka(id, p) {
  switch (id) {
    case 'modul-1':
    case 'pretest':
      return true
    case 'modul-2': return !!p.modul['modul-1']
    case 'modul-3': return !!p.modul['modul-2']
    case 'latihan-un': return !!p.modul['modul-3']
    case 'modul-4': return sudahLatihan(p, 'un')
    case 'latihan-sn':
    case 'latihan-konteks':
      return !!p.modul['modul-4']
    case 'posttest': return DAFTAR_MODUL.every((m) => p.modul[m])
    default: return false
  }
}

export const PESAN_TERKUNCI = {
  'modul-2': 'Selesaikan Modul 1 dulu, ya.',
  'modul-3': 'Selesaikan Modul 2 dulu, ya.',
  'latihan-un': 'Selesaikan Modul 3 (Contoh Soal) dulu, ya.',
  'modul-4': 'Kerjakan Latihan Un minimal sekali dulu, ya.',
  'latihan-sn': 'Selesaikan Modul 4 (Jumlah Suku) dulu, ya.',
  'latihan-konteks': 'Selesaikan Modul 4 (Jumlah Suku) dulu, ya.',
  posttest: 'Tes akhir terbuka setelah semua modul materi selesai.'
}

export function nilaiTerakhir(p, jenis) {
  const daftar = p.evaluasi[jenis]
  if (!daftar?.length) return null
  const t = daftar[daftar.length - 1]
  return Math.round((t.skor * 100) / t.maks)
}
