import { useState } from 'react'
import { ClipboardCheck, Sigma, BookText } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import KartuMenu from '../components/KartuMenu.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { useProgres, terbuka, PESAN_TERKUNCI } from '../logic/progres.js'

const DAFTAR = [
  { id: 'un', kunci: 'latihan-un', Ikon: ClipboardCheck, warna: 'kuning', judul: 'Latihan Un (Suku ke-n)', deskripsi: 'Pilih rumus, suku berikutnya, suku ke-n, mencari n.' },
  { id: 'sn', kunci: 'latihan-sn', Ikon: Sigma, warna: 'hijau', judul: 'Latihan Sn (Jumlah Suku)', deskripsi: 'Jumlah bilangan ganjil dan genap.' },
  { id: 'konteks', kunci: 'latihan-konteks', Ikon: BookText, warna: 'ungu', judul: 'Soal Cerita', deskripsi: 'Pola bilangan dalam kehidupan sehari-hari.' }
]

export default function Latihan() {
  const progres = useProgres()
  const [pesan, setPesan] = useState(null)

  return (
    <>
      <HeaderHalaman judul="Latihan Soal" kembaliKe="/" kartuRumus />
      <div className="tumpuk">
        <div className="kartu lembut baris">
          <span className="kotak-ikon ikon-ungu" aria-hidden="true"><ClipboardCheck size={24} /></span>
          <div>
            <div style={{ fontWeight: 700 }}>Latihan Soal</div>
            <div className="kecil muted">Soal selalu berbeda setiap kali kamu berlatih. Kerjakan dengan tepat dan teliti!</div>
          </div>
        </div>
        {DAFTAR.map((d) => {
          const riwayat = progres.latihan.filter((l) => l.jenis === d.id)
          const terakhir = riwayat[riwayat.length - 1]
          return (
            <KartuMenu
              key={d.id}
              ke={`/latihan/${d.id}`}
              Ikon={d.Ikon}
              warna={d.warna}
              judul={d.judul}
              deskripsi={d.deskripsi}
              terkunci={!terbuka(d.kunci, progres)}
              onTerkunci={() => setPesan(PESAN_TERKUNCI[d.kunci])}
              lencana={terakhir ? `${terakhir.skor}/${terakhir.maks}` : null}
            />
          )
        })}
        {pesan && <KotakIngat judul="Belum terbuka" ikon="info">{pesan}</KotakIngat>}
      </div>
    </>
  )
}
