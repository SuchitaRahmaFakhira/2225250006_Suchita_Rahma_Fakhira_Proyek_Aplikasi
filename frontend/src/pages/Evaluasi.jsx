import { useState } from 'react'
import { Trophy, FileText, FileCheck2 } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import JudulHalaman from '../components/JudulHalaman.jsx'
import KartuMenu from '../components/KartuMenu.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { useProgres, terbuka, nilaiTerakhir, PESAN_TERKUNCI } from '../logic/progres.js'

export default function Evaluasi() {
  const progres = useProgres()
  const [pesan, setPesan] = useState(null)
  const pre = nilaiTerakhir(progres, 'pretest')
  const post = nilaiTerakhir(progres, 'posttest')

  return (
    <>
      <HeaderHalaman judul="Evaluasi" kembaliKe="/" />
      <div className="tumpuk-besar">
        <JudulHalaman Ikon={Trophy} warna="ungu" judul="Evaluasi" subjudul="Uji pemahamanmu dengan tes pilihan ganda." />
        <div className="tumpuk">
          <KartuMenu ke="/evaluasi/pretest" Ikon={FileText} warna="biru" judul="Tes Awal (Pre-test)" deskripsi="10 soal · tanpa petunjuk · kerjakan sebelum belajar" lencana={pre != null ? pre : null} />
          <KartuMenu
            ke="/evaluasi/posttest"
            Ikon={FileCheck2}
            warna="hijau"
            judul="Tes Akhir (Post-test)"
            deskripsi="10 soal · terbuka setelah semua materi selesai"
            terkunci={!terbuka('posttest', progres)}
            onTerkunci={() => setPesan(PESAN_TERKUNCI.posttest)}
            lencana={post != null ? post : null}
          />
          {pesan && <KotakIngat judul="Belum terbuka" ikon="info">{pesan}</KotakIngat>}
        </div>
        <KotakIngat judul="Tips" ikon="info">Kerjakan sendiri dengan jujur agar kamu tahu kemajuan belajarmu. Kartu rumus tidak tersedia saat tes.</KotakIngat>
      </div>
    </>
  )
}
