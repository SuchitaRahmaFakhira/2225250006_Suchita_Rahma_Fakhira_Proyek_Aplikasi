import { Lightbulb, Info } from 'lucide-react'

export default function KotakIngat({ judul = 'Ingat!', ikon = 'lampu', children }) {
  const Ikon = ikon === 'info' ? Info : Lightbulb
  return (
    <div className="kotak-ingat">
      <Ikon size={22} className="ikon" aria-hidden="true" />
      <div>
        <div className="judul">{judul}</div>
        <div className="isi-ingat">{children}</div>
      </div>
    </div>
  )
}
