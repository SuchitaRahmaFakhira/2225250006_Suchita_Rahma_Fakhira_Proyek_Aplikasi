import { useState } from 'react'
import { catatHasil } from '../logic/api.js'

/**
 * Angket beban kognitif satu butir (skala Paas 1–9), PRD F15.
 * Hasil dikirim ke server Python sebagai jenis 'angket'.
 */
export default function Angket({ konteks, onSelesai }) {
  const [nilai, setNilai] = useState(null)

  function kirim() {
    catatHasil({ jenis: 'angket', modul: `angket-${konteks}`, skor: nilai, maks: 9 })
    onSelesai()
  }

  return (
    <div className="kartu tumpuk">
      <p style={{ fontWeight: 700 }}>Seberapa besar usaha berpikirmu tadi?</p>
      <div className="skala-angket" role="radiogroup" aria-label="Skala 1 sampai 9">
        {Array.from({ length: 9 }, (_, i) => i + 1).map((n) => (
          <button key={n} type="button" role="radio" aria-checked={nilai === n}onClick={() => setNilai(n)}>
            {n}
          </button>
        ))}
      </div>
      <div className="baris kecil muted" style={{ justifyContent: 'space-between' }}>
        <span>1 = sangat ringan</span>
        <span>9 = sangat berat</span>
      </div>
      <div className="baris-dua">
        <button className="tombol kedua kecil" onClick={onSelesai}>Lewati</button>
        <button className="tombol kecil" onClick={kirim} disabled={nilai === null}>Kirim</button>
      </div>
    </div>
  )
}
