import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ClipboardList, RotateCcw } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import SesiSoal from '../components/SesiSoal.jsx'
import RingkasanSkor from '../components/RingkasanSkor.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { buatSoalSesi, RENCANA_SESI } from '../logic/generatorSoal.js'
import { buatSesiKonteks } from '../data/soalKonteks.js'
import { bacaProgres, useProgres, terbuka, PESAN_TERKUNCI, catatLatihan, simpanLevel } from '../logic/progres.js'
import { catatHasil } from '../logic/api.js'

const JUDUL = { un: 'Latihan Un', sn: 'Latihan Sn', konteks: 'Soal Cerita' }

export default function LatihanSesi() {
  const { jenis } = useParams()
  const progres = useProgres()
  const [putaran, setPutaran] = useState(0)
  const [hasil, setHasil] = useState(null)
  const soalKonteks = useMemo(() => (jenis === 'konteks' ? buatSesiKonteks() : null), [jenis, putaran])

  if (!JUDUL[jenis]) return <Navigate to="/latihan" replace />
  const kunci = `latihan-${jenis}`
  if (!terbuka(kunci, progres)) {
    return (
      <>
        <HeaderHalaman judul={JUDUL[jenis]} kembaliKe="/latihan" />
        <KotakIngat judul="Belum terbuka" ikon="info">{PESAN_TERKUNCI[kunci]}</KotakIngat>
      </>
    )
  }

  const adaptif = jenis !== 'konteks'
  const levelAwal = adaptif ? bacaProgres().level[jenis] ?? 1 : 1
  const jumlah = jenis === 'konteks' ? soalKonteks.length : RENCANA_SESI[jenis].length

  function selesai(h) {
    setHasil(h)
    catatLatihan({ jenis, skor: h.skor, maks: h.maks, petunjuk: h.petunjuk })
    if (adaptif) simpanLevel(jenis, h.level)
    catatHasil({ jenis: 'latihan', modul: `latihan-${jenis}`, skor: h.skor, maks: h.maks, petunjuk_dipakai: h.petunjuk, detail: { level: h.level, soal: h.detail } })
  }

  return (
    <>
      <HeaderHalaman judul="Latihan Soal" kembaliKe="/latihan" kartuRumus />
      {hasil ? (
        <div className="tumpuk-besar">
          <RingkasanSkor skor={hasil.skor} maks={hasil.maks} petunjuk={hasil.petunjuk} />
          <button className="tombol penuh" onClick={() => { setHasil(null); setPutaran((p) => p + 1) }}>
            <RotateCcw size={20} /> Latihan lagi (soal baru)
          </button>
          {jenis === 'un' && terbuka('modul-4', bacaProgres()) && <Link className="tombol garis penuh" to="/materi/modul-4">Lanjut ke Materi Jumlah Suku</Link>}
          <Link className="tombol kedua penuh" to="/latihan">Kembali ke Latihan</Link>
        </div>
      ) : (
        <div className="tumpuk-besar">
          <div className="kartu lembut baris">
            <span className="kotak-ikon ikon-ungu" aria-hidden="true"><ClipboardList size={24} /></span>
            <div>
              <div style={{ fontWeight: 700 }}>{JUDUL[jenis]}</div>
              <div className="kecil muted">Kerjakan soal berikut dengan tepat dan teliti!</div>
            </div>
          </div>
          <SesiSoal
            key={putaran}
            buatSoal={(i, lvl) => (jenis === 'konteks' ? soalKonteks[i] : buatSoalSesi(jenis, i, lvl))}
            jumlah={jumlah}
            levelAwal={levelAwal}
            adaptif={adaptif}
            onSelesai={selesai}
          />
        </div>
      )}
    </>
  )
}
