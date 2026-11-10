import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Smartphone, X } from 'lucide-react'
import { usePasang, pasangAplikasi } from '../logic/pasang.js'
import { useProgres, ubahProgres } from '../logic/progres.js'

/** Ajakan memasang PolaKu di HP (PWA, tanpa Play Store/App Store). */
export default function KartuPasang({ bisaDitutup = true }) {
  const { terpasang, bisaOtomatis, ios } = usePasang()
  const progres = useProgres()
  const navigate = useNavigate()
  const [pesan, setPesan] = useState(null)

  if (terpasang) {
    return pesan ? <p className="kecil muted tengah">{pesan}</p> : null
  }
  if (bisaDitutup && progres.kartuPasangDitutup) return null

  async function pasang() {
    if (bisaOtomatis) {
      const hasil = await pasangAplikasi()
      if (hasil === 'accepted') setPesan('PolaKu sudah terpasang. Buka dari layar utama HP-mu.')
    } else {
      navigate('/pasang')
    }
  }

  return (
    <div className="kartu kartu-pasang">
      <span className="kotak-ikon ikon-ungu" aria-hidden="true"><Smartphone size={24} /></span>
      <div className="teks tumpuk" style={{ gap: 8 }}>
        <div>
          <div style={{ fontWeight: 700 }}>Pasang PolaKu di HP</div>
          <div className="kecil muted">Buka lebih cepat & bisa dipakai tanpa internet.{ios ? ' Ikuti petunjuk untuk iPhone.' : ''}</div>
        </div>
        <button className="tombol kecil" onClick={pasang} style={{ alignSelf: 'flex-start' }}>
          {bisaOtomatis ? 'Pasang Sekarang' : 'Lihat Cara Pasang'}
        </button>
      </div>
      {bisaDitutup && (
        <button className="tombol-ikon" aria-label="Tutup ajakan pasang" onClick={() => ubahProgres((p) => ({ ...p, kartuPasangDitutup: true }))}>
          <X size={20} />
        </button>
      )}
    </div>
  )
}
