import { useState } from 'react'
import { Check, Lock, BookOpen, Hash, Lightbulb, Sigma, CircleDot } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import KartuMenu from '../components/KartuMenu.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { MODUL } from '../data/materi.js'
import { useProgres, terbuka, PESAN_TERKUNCI } from '../logic/progres.js'

const IKON = { 'modul-1': Hash, 'modul-2': BookOpen, 'modul-3': Lightbulb, 'modul-4': Sigma }
const WARNA = { 'modul-1': 'biru', 'modul-2': 'ungu', 'modul-3': 'kuning', 'modul-4': 'hijau' }

function StatusModul({ status }) {
  if (status === 'selesai') return <span className="status-modul selesai" aria-label="Selesai"><Check size={18} /></span>
  if (status === 'terkunci') return <span className="status-modul terkunci" aria-label="Terkunci"><Lock size={18} /></span>
  if (status === 'berjalan') return <span className="status-modul berjalan" aria-label="Sedang dipelajari"><CircleDot size={18} /></span>
  return null
}

export default function Materi() {
  const progres = useProgres()
  const [pesan, setPesan] = useState(null)

  return (
    <>
      <HeaderHalaman judul="Materi" kembaliKe="/" kartuRumus />
      <div className="tumpuk">
        <p className="muted kecil">Pelajari berurutan: konsep → rumus → contoh → latihan.</p>
        {MODUL.map((m) => {
          const buka = terbuka(m.id, progres)
          const status = progres.modul[m.id] ? 'selesai' : !buka ? 'terkunci' : progres.posisi?.modulId === m.id ? 'berjalan' : null
          return (
            <KartuMenu
              key={m.id}
              ke={`/materi/${m.id}`}
              Ikon={IKON[m.id]}
              warna={WARNA[m.id]}
              judul={`${m.nomor}. ${m.judul}`}
              deskripsi={m.deskripsi}
              terkunci={!buka}
              onTerkunci={() => setPesan(PESAN_TERKUNCI[m.id])}
              kananKhusus={status ? <StatusModul status={status} /> : undefined}
            />
          )
        })}
        {pesan && <KotakIngat judul="Belum terbuka" ikon="info">{pesan}</KotakIngat>}
      </div>
    </>
  )
}
