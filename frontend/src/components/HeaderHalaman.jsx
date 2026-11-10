import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, BookMarked } from 'lucide-react'
import KartuRumus from './KartuRumus.jsx'

/**
 * Header halaman: tombol kembali (‹) di kiri, judul di tengah, aksi di kanan.
 * Tombol kembali wajib ada karena mode standalone (PWA) tidak punya tombol kembali browser.
 */
export default function HeaderHalaman({ judul, kembaliKe, kartuRumus = false, aksi = null }) {
  const navigate = useNavigate()
  const [rumusTerbuka, setRumusTerbuka] = useState(false)

  const kembali = () => {
    if (kembaliKe) navigate(kembaliKe)
    else if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  return (
    <>
      <header className="header">
        <button className="tombol-ikon" onClick={kembali} aria-label="Kembali">
          <ChevronLeft size={26} />
        </button>
        <h1>{judul}</h1>
        {kartuRumus ? (
          <button className="tombol-ikon" onClick={() => setRumusTerbuka(true)} aria-label="Buka kartu rumus" title="Kartu Rumus">
            <BookMarked size={22} />
          </button>
        ) : (
          aksi ?? <span />
        )}
      </header>
      {rumusTerbuka && <KartuRumus tutup={() => setRumusTerbuka(false)} />}
    </>
  )
}
