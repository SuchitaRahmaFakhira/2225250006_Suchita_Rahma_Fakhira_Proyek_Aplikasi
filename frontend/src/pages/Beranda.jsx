import { Link } from 'react-router-dom'
import { Lightbulb, ChevronRight, BookOpen, Calculator, LayoutGrid, ClipboardCheck, Trophy, BarChart3 } from 'lucide-react'
import KartuMenu from '../components/KartuMenu.jsx'
import KartuPasang from '../components/KartuPasang.jsx'
import IndikatorSinkron from '../components/IndikatorSinkron.jsx'
import { IlustrasiKubus } from './Masuk.jsx'
import { useProgres, terbuka, DAFTAR_MODUL } from '../logic/progres.js'
import { useProfil } from '../logic/profil.js'
import { MODUL, cariModul } from '../data/materi.js'

/** Menentukan isi banner: lanjutkan posisi terakhir atau langkah berikutnya yang disarankan. */
function langkahBerikut(p) {
  if (p.posisi) {
    const m = cariModul(p.posisi.modulId)
    if (m) return { ke: `/materi/${m.id}`, judul: `Lanjutkan: Modul ${m.nomor}`, deskripsi: `${m.judul} · layar ${p.posisi.layar + 1} dari ${m.layar.length}` }
  }
  if (!p.evaluasi.pretest?.length) return { ke: '/evaluasi/pretest', judul: 'Ayo mulai belajar!', deskripsi: 'Kerjakan tes awal dulu, lalu kenali konsep ganjil dan genap.' }
  const belum = MODUL.find((m) => !p.modul[m.id] && terbuka(m.id, p))
  if (belum) return { ke: `/materi/${belum.id}`, judul: p.modul['modul-1'] ? `Lanjut ke Modul ${belum.nomor}` : 'Ayo mulai belajar!', deskripsi: belum.judul }
  if (terbuka('latihan-un', p) && !p.latihan.some((l) => l.jenis === 'un')) return { ke: '/latihan/un', judul: 'Saatnya latihan!', deskripsi: 'Kerjakan Latihan Un untuk membuka materi Jumlah Suku.' }
  if (DAFTAR_MODUL.every((m) => p.modul[m]) && !p.evaluasi.posttest?.length) return { ke: '/evaluasi/posttest', judul: 'Siap tes akhir?', deskripsi: 'Semua materi selesai. Ukur kemajuanmu!' }
  return { ke: '/latihan', judul: 'Terus berlatih!', deskripsi: 'Latihan soal yang mirip membantu kamu mengingat.' }
}

export default function Beranda() {
  const progres = useProgres()
  const profil = useProfil()
  const banner = langkahBerikut(progres)

  return (
    <div className="tumpuk-besar">
      <div className="beranda-kepala">
        <div>
          <p className="kecil" style={{ marginTop: 0, marginBottom: 6 }}>Halo, {profil?.nama ?? 'Teman'} 👋</p>
          <h1>Pola Bilangan Ganjil Genap</h1>
          <p>Belajar, latihan, dan pahami pola bilangan dengan mudah!</p>
        </div>
        <div className="tumpuk" style={{ alignItems: 'flex-end' }}>
          <IndikatorSinkron />
          <IlustrasiKubus />
        </div>
      </div>

      <KartuPasang />

      <Link to={banner.ke} className="banner">
        <span className="kotak-ikon" style={{ background: 'var(--surface)', color: 'var(--primary)' }} aria-hidden="true"><Lightbulb size={26} /></span>
        <span style={{ flex: 1 }}>
          <span className="judul" style={{ display: 'block' }}>{banner.judul}</span>
          <span className="deskripsi" style={{ display: 'block' }}>{banner.deskripsi}</span>
        </span>
        <span className="bulat" aria-hidden="true"><ChevronRight size={22} /></span>
      </Link>

      <section className="tumpuk" aria-labelledby="menu-utama">
        <h2 id="menu-utama" className="judul-bagian">Menu Utama</h2>
        <KartuMenu ke="/materi" Ikon={BookOpen} warna="biru" judul="Materi" deskripsi="Pelajari konsep dasar bilangan ganjil dan genap." />
        <KartuMenu ke="/kalkulator" Ikon={Calculator} warna="biru" judul="Kalkulator Ganjil Genap" deskripsi="Cek bilangan dan lihat cara perhitungannya." />
        <KartuMenu ke="/generator" Ikon={LayoutGrid} warna="hijau" judul="Generator Pola Bilangan" deskripsi="Buat pola bilangan secara otomatis." />
        <KartuMenu ke="/latihan" Ikon={ClipboardCheck} warna="kuning" judul="Latihan Soal" deskripsi="Kerjakan soal interaktif sesuai materi." />
        <KartuMenu ke="/evaluasi" Ikon={Trophy} warna="ungu" judul="Evaluasi" deskripsi="Uji pemahamanmu dengan tes pilihan ganda." />
        <KartuMenu ke="/nilai" Ikon={BarChart3} warna="kuning" judul="Hasil Belajar" deskripsi="Lihat perkembangan belajarmu." />
      </section>
    </div>
  )
}
