import { CheckCircle2, XCircle } from 'lucide-react'

export default function UmpanBalik({ benar, judul, children }) {
  const Ikon = benar ? CheckCircle2 : XCircle
  return (
    <div className={`umpan-balik ${benar ? 'benar' : 'salah'}`} role="status" aria-live="polite">
      <Ikon size={24} aria-hidden="true" style={{ flexShrink: 0 }} />
      <div className="tumpuk" style={{ gap: 4 }}>
        <div className="judul">{judul ?? (benar ? 'Tepat!' : 'Belum tepat')}</div>
        {children && <div className="isi-umpan">{children}</div>}
      </div>
    </div>
  )
}
