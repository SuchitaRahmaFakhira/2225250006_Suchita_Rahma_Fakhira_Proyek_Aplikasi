import { useCallback, useState } from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight, PartyPopper } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import BilahProgres from '../components/BilahProgres.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import Angket from '../components/Angket.jsx'
import { LayarKonsep, LayarPilihRumus, LayarContoh, LayarFaded, LayarKuis } from '../components/LayarMateri.jsx'
import { cariModul, MODUL } from '../data/materi.js'
import { bacaProgres, useProgres, terbuka, PESAN_TERKUNCI, simpanPosisi, selesaikanModul } from '../logic/progres.js'
import { catatHasil } from '../logic/api.js'

const KOMPONEN = { konsep: LayarKonsep, pilihRumus: LayarPilihRumus, contoh: LayarContoh, faded: LayarFaded, kuis: LayarKuis }

export default function ModulBelajar() {
  const { id } = useParams()
  const modul = cariModul(id)
  const progres = useProgres()
  const [layarKe, setLayarKe] = useState(() => {
    const posisi = bacaProgres().posisi
    return posisi?.modulId === id ? Math.min(posisi.layar, (modul?.layar.length ?? 1) - 1) : 0
  })
  const [siap, setSiap] = useState(false)
  const [hasilKuis, setHasilKuis] = useState(null)
  const [selesai, setSelesai] = useState(false)
  const [angketSelesai, setAngketSelesai] = useState(false)
  const onSiap = useCallback((nilai) => setSiap(nilai), [])

  if (!modul) return <Navigate to="/materi" replace />
  if (!terbuka(id, progres) && !selesai) {
    return (
      <>
        <HeaderHalaman judul={`Modul ${modul.nomor}`} kembaliKe="/materi" />
        <KotakIngat judul="Belum terbuka" ikon="info">{PESAN_TERKUNCI[id]}</KotakIngat>
      </>
    )
  }

  const layar = modul.layar[layarKe]
  const Komponen = KOMPONEN[layar.tipe]
  const terakhir = layarKe === modul.layar.length - 1
  const berikut = MODUL[MODUL.findIndex((m) => m.id === id) + 1]

  function pindah(ke) {
    setSiap(false)
    setLayarKe(ke)
    simpanPosisi(id, ke)
    window.scrollTo(0, 0)
  }

  function tamat() {
    const sudahPernah = !!bacaProgres().modul[id]
    selesaikanModul(id)
    if (!sudahPernah) {
      catatHasil({ jenis: 'modul', modul: id, skor: hasilKuis?.skor ?? null, maks: hasilKuis?.maks ?? null, petunjuk_dipakai: hasilKuis?.petunjuk ?? 0, detail: hasilKuis?.detail ?? null })
    }
    setSelesai(true)
    window.scrollTo(0, 0)
  }

  if (selesai) {
    return (
      <>
        <HeaderHalaman judul={`Modul ${modul.nomor}`} kembaliKe="/materi" />
        <div className="tumpuk-besar">
          <div className="kartu tumpuk tengah" style={{ alignItems: 'center' }}>
            <span className="kotak-ikon besar ikon-hijau" aria-hidden="true"><PartyPopper size={44} /></span>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800 }}>Modul {modul.nomor} selesai!</h2>
            <p className="muted">{modul.judul}</p>
          </div>
          {!angketSelesai && <Angket konteks={id} onSelesai={() => setAngketSelesai(true)} />}
          {id === 'modul-3' && <Link className="tombol penuh" to="/latihan/un">Lanjut ke Latihan Un</Link>}
          {id === 'modul-4' && <Link className="tombol penuh" to="/latihan/sn">Lanjut ke Latihan Sn</Link>}
          {berikut && terbuka(berikut.id, progres) && <Link className="tombol penuh" to={`/materi/${berikut.id}`} onClick={() => setSelesai(false)}>Lanjut ke Modul {berikut.nomor}</Link>}
          <Link className="tombol kedua penuh" to="/materi">Kembali ke Materi</Link>
        </div>
      </>
    )
  }

  return (
    <>
      <HeaderHalaman judul={modul.judul} kembaliKe="/materi" kartuRumus />
      <div className="tumpuk-besar">
        <BilahProgres nilai={layarKe + 1} total={modul.layar.length} />
        <Komponen key={`${id}-${layarKe}`} layar={layar} onSiap={onSiap} onHasil={setHasilKuis} />
        <div className="baris-dua">
          <button className="tombol kedua" onClick={() => pindah(layarKe - 1)} disabled={layarKe === 0}>
            <ChevronLeft size={20} /> Kembali
          </button>
          {terakhir ? (
            <button className="tombol" onClick={tamat} disabled={!siap}>Selesai</button>
          ) : (
            <button className="tombol" onClick={() => pindah(layarKe + 1)} disabled={!siap}>
              Lanjut <ChevronRight size={20} />
            </button>
          )}
        </div>
        {!siap && layar.tipe !== 'konsep' && layar.tipe !== 'kuis' && (
          <p className="kecil muted tengah">Selesaikan layar ini dulu untuk lanjut.</p>
        )}
      </div>
    </>
  )
}
