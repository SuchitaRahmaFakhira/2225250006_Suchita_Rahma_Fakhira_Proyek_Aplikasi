// Semua komunikasi dengan server Python (Flask) lewat modul ini.
// Prinsip offline-first: hasil masuk antrean di HP, lalu dikirim saat online.
import { useEffect, useState } from 'react'
import { baca, simpan, idUnik } from './penyimpanan.js'
import { bacaProfil, simpanProfil } from './profil.js'
import bankSoalLokal from '../../../backend/data/bank_soal_evaluasi.json'

const KUNCI_ANTREAN = 'polaku.antrean'
const EVENT = 'polaku-sinkron'
const UKURAN_KIRIM = 100

let statusSaatIni = { status: 'tersinkron', menunggu: 0 }
let sedangKirim = false

function aturStatus(status) {
  statusSaatIni = { status, menunggu: bacaAntrean().length }
  window.dispatchEvent(new Event(EVENT))
}

const bacaAntrean = () => baca(KUNCI_ANTREAN, [])
const online = () => typeof navigator === 'undefined' || navigator.onLine !== false

async function minta(url, opsi = {}) {
  const resp = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...opsi,
    body: opsi.body ? JSON.stringify(opsi.body) : undefined
  })
  let data = {}
  try { data = await resp.json() } catch { /* bukan JSON */ }
  return { status: resp.status, data }
}

/**
 * Pastikan siswa sudah terdaftar di server (mendapat siswaId) dan nama terbarunya terkirim.
 * Tidak ada kode kelas: siapa pun bisa langsung terdaftar.
 */
async function pastikanTerdaftar(profil) {
  if (!profil.siswaId) {
    const { status, data } = await minta('/api/siswa', { method: 'POST', body: { nama_panggilan: profil.nama } })
    if (status !== 201) throw new Error(data.pesan || 'Server belum bisa dihubungi')
    const baru = { ...profil, siswaId: data.siswa_id, namaBelumTerkirim: false }
    simpanProfil(baru)
    return baru
  }
  if (profil.namaBelumTerkirim) {
    const { status } = await minta(`/api/siswa/${profil.siswaId}`, { method: 'PUT', body: { nama_panggilan: profil.nama } })
    if (status === 404) return pastikanTerdaftar({ ...profil, siswaId: null })
    if (status !== 200) throw new Error('Server belum bisa dihubungi')
    const baru = { ...profil, namaBelumTerkirim: false }
    simpanProfil(baru)
    return baru
  }
  return profil
}

/** Mengirim seluruh antrean ke server. Aman dipanggil berkali-kali. */
export async function kirimAntrean() {
  let profil = bacaProfil()
  if (!profil) return
  if (!online()) return aturStatus('offline')
  if (sedangKirim) return
  sedangKirim = true
  try {
    profil = await pastikanTerdaftar(profil)
    let antrean = bacaAntrean()
    while (antrean.length) {
      const kiriman = antrean.slice(0, UKURAN_KIRIM)
      const { status, data } = await minta('/api/hasil', {
        method: 'POST',
        body: { siswa_id: profil.siswaId, hasil: kiriman }
      })
      if (status === 404 && data.pesan?.includes('Siswa')) {
        // Data siswa hilang di server (mis. database direset): daftar ulang.
        profil = await pastikanTerdaftar({ ...profil, siswaId: null })
        continue
      }
      if (status === 400) {
        // Data rusak tidak akan pernah diterima — buang agar antrean tidak macet.
        console.warn('Hasil ditolak server:', data.pesan)
      } else if (status !== 200) {
        throw new Error(data.pesan || `HTTP ${status}`)
      }
      const terkirim = new Set(kiriman.map((h) => h.id))
      antrean = bacaAntrean().filter((h) => !terkirim.has(h.id))
      simpan(KUNCI_ANTREAN, antrean)
    }
    aturStatus('tersinkron')
  } catch {
    aturStatus(online() ? 'menunggu' : 'offline')
  } finally {
    sedangKirim = false
  }
}

/**
 * Mencatat hasil belajar: masuk antrean di HP, lalu dikirim ke server Python saat online.
 * @param {{jenis: 'latihan'|'evaluasi'|'angket'|'modul', modul: string, skor?: number, maks?: number, petunjuk_dipakai?: number, detail?: object}} hasil
 */
export function catatHasil(hasil) {
  const item = {
    id: idUnik(),
    petunjuk_dipakai: 0,
    detail: null,
    skor: null,
    maks: null,
    ...hasil,
    waktu: new Date().toISOString()
  }
  simpan(KUNCI_ANTREAN, [...bacaAntrean(), item])
  aturStatus(online() ? 'menunggu' : 'offline')
  kirimAntrean()
}

/** Mengganti nama panggilan; dikirim ke server saat online. */
export function ubahNama(nama) {
  const profil = bacaProfil()
  simpanProfil({ ...profil, nama, namaBelumTerkirim: !!profil?.siswaId })
  kirimAntrean()
}

export function mulaiSinkronOtomatis() {
  kirimAntrean()
  window.addEventListener('online', kirimAntrean)
  window.addEventListener('offline', () => aturStatus('offline'))
  setInterval(() => {
    if (bacaAntrean().length) kirimAntrean()
  }, 60_000)
}

export function useStatusSinkron() {
  const [nilai, setNilai] = useState(statusSaatIni)
  useEffect(() => {
    const segarkan = () => setNilai({ ...statusSaatIni })
    window.addEventListener(EVENT, segarkan)
    return () => window.removeEventListener(EVENT, segarkan)
  }, [])
  return nilai
}

/** Soal evaluasi dari server Python; jika offline pakai salinan yang ikut terpasang. */
export async function ambilSoalEvaluasi(versi) {
  if (online()) {
    try {
      const { status, data } = await minta(`/api/soal/evaluasi?versi=${versi}`)
      if (status === 200 && Array.isArray(data.soal)) return data.soal
    } catch { /* pakai salinan lokal */ }
  }
  return bankSoalLokal[versi]
}
