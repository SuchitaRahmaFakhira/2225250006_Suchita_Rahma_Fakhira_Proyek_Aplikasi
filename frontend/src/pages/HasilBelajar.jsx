import { Link } from 'react-router-dom'
import { Check, Lock, CircleDot, Circle } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import { useProgres, terbuka, nilaiTerakhir } from '../logic/progres.js'
import { MODUL } from '../data/materi.js'

const NAMA_LATIHAN = { un: 'Latihan Un', sn: 'Latihan Sn', konteks: 'Soal Cerita' }
const tanggal = (iso) => new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })

export default function HasilBelajar() {
  const progres = useProgres()
  const pre = nilaiTerakhir(progres, 'pretest')
  const post = nilaiTerakhir(progres, 'posttest')
  const riwayat = [...progres.latihan].reverse().slice(0, 10)

  return (
    <>
      <HeaderHalaman judul="Hasil Belajar" kembaliKe="/" />
      <div className="tumpuk-besar">
        <div className="baris-dua">
          <div className="kartu kartu-nilai">
            <div className="muted kecil">Tes Awal</div>
            <div className="angka-besar">{pre ?? '–'}</div>
          </div>
          <div className="kartu kartu-nilai">
            <div className="muted kecil">Tes Akhir</div>
            <div className="angka-besar">{post ?? '–'}</div>
          </div>
        </div>
        {pre != null && post != null && (
          <p className="tengah" style={{ fontWeight: 600 }}>
            {post > pre ? `Nilaimu naik ${post - pre} poin. Hebat!` : post === pre ? 'Nilaimu tetap. Terus berlatih, ya!' : 'Ayo ulangi materi dan latihan lagi.'}
          </p>
        )}

        <section className="kartu">
          <h2 className="judul-bagian" style={{ marginTop: 0 }}>Progres Materi</h2>
          <ul className="daftar-sederhana">
            {MODUL.map((m) => {
              const selesai = !!progres.modul[m.id]
              const buka = terbuka(m.id, progres)
              const berjalan = progres.posisi?.modulId === m.id
              return (
                <li key={m.id}>
                  <Link to={`/materi/${m.id}`} style={{ color: 'inherit', textDecoration: 'none', flex: 1 }}>{m.nomor}. {m.judul}</Link>
                  {selesai ? (
                    <span className="status-modul selesai" aria-label="Selesai"><Check size={18} /></span>
                  ) : !buka ? (
                    <span className="status-modul terkunci" aria-label="Terkunci"><Lock size={18} /></span>
                  ) : berjalan ? (
                    <span className="status-modul berjalan" aria-label="Sedang dipelajari"><CircleDot size={18} /></span>
                  ) : (
                    <span className="status-modul terkunci" aria-label="Belum dimulai"><Circle size={18} /></span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="kartu">
          <h2 className="judul-bagian" style={{ marginTop: 0 }}>Riwayat Latihan</h2>
          {riwayat.length === 0 ? (
            <p className="muted kecil" style={{ marginTop: 8 }}>Belum ada latihan. Yuk mulai dari menu Latihan Soal!</p>
          ) : (
            <ul className="daftar-sederhana">
              {riwayat.map((l, i) => (
                <li key={i}>
                  <span>{NAMA_LATIHAN[l.jenis] ?? l.jenis}</span>
                  <span className="muted kecil">{tanggal(l.waktu)}</span>
                  <span style={{ fontWeight: 700 }}>{l.skor}/{l.maks}</span>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  )
}
