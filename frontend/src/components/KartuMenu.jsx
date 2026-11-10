import { Link } from 'react-router-dom'
import { ChevronRight, Lock } from 'lucide-react'

/** Kartu menu: ikon dalam kotak pastel + judul + deskripsi + › (seperti mockup Beranda). */
export default function KartuMenu({ ke, Ikon, warna = 'biru', judul, deskripsi, terkunci = false, lencana, kananKhusus, onTerkunci }) {
  const isi = (
    <>
      <span className={`kotak-ikon ikon-${warna}`} aria-hidden="true">
        <Ikon size={24} />
      </span>
      <span className="teks">
        <span className="judul" style={{ display: 'block' }}>{judul}</span>
        {deskripsi && <span className="deskripsi" style={{ display: 'block' }}>{deskripsi}</span>}
      </span>
      {lencana != null && <span className="lencana">{lencana}</span>}
      {kananKhusus ?? (terkunci ? <Lock size={20} className="muted" aria-label="Terkunci" /> : <ChevronRight size={22} className="panah" aria-hidden="true" />)}
    </>
  )

  if (terkunci) {
    return (
      <button type="button" className="kartu-menu terkunci" onClick={onTerkunci} aria-disabled="true">
        {isi}
      </button>
    )
  }
  return (
    <Link to={ke} className="kartu-menu">
      {isi}
    </Link>
  )
}
