import { useEffect } from 'react'
import { X } from 'lucide-react'

/** Bottom sheet sederhana. Tutup dengan tombol ✕, ketuk latar, atau tombol Esc. */
export default function LembarBawah({ judul, tutup, children }) {
  useEffect(() => {
    const tekan = (e) => e.key === 'Escape' && tutup()
    window.addEventListener('keydown', tekan)
    return () => window.removeEventListener('keydown', tekan)
  }, [tutup])

  return (
    <div className="lapisan" onClick={tutup}>
      <div className="lembar" role="dialog" aria-modal="true" aria-label={judul} onClick={(e) => e.stopPropagation()}>
        <div className="pegangan" aria-hidden="true" />
        <div className="lembar-kepala">
          <h2>{judul}</h2>
          <button className="tombol-ikon" onClick={tutup} aria-label="Tutup">
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
