import { Trophy } from 'lucide-react'

export function pesanSkor(persen) {
  if (persen === 100) return 'Luar biasa! Semua benar.'
  if (persen >= 80) return 'Hebat! Kamu sudah paham.'
  if (persen >= 60) return 'Bagus! Sedikit lagi, coba ulangi bagian yang salah.'
  return 'Tidak apa-apa. Pelajari lagi contohnya, lalu coba lagi.'
}

export default function RingkasanSkor({ skor, maks, petunjuk }) {
  const persen = Math.round((skor * 100) / maks)
  return (
    <div className="kartu tumpuk tengah" style={{ alignItems: 'center' }}>
      <span className="kotak-ikon besar ikon-kuning" aria-hidden="true"><Trophy size={44} /></span>
      <div className="kartu-nilai">
        <div className="angka-besar">{skor}/{maks}</div>
        <div className="muted kecil">Nilai {persen}{petunjuk != null ? ` · petunjuk dipakai ${petunjuk}×` : ''}</div>
      </div>
      <p style={{ fontWeight: 600 }}>{pesanSkor(persen)}</p>
    </div>
  )
}
