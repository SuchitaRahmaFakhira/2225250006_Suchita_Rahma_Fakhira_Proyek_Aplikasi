import { useState } from 'react'
import { User, ChevronRight } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import KartuPasang from '../components/KartuPasang.jsx'
import LembarBawah from '../components/LembarBawah.jsx'
import { INFO_SINKRON } from '../components/IndikatorSinkron.jsx'
import Masuk from './Masuk.jsx'
import { useProfil } from '../logic/profil.js'
import { usePengaturan, ubahPengaturan } from '../logic/pengaturan.js'
import { useStatusSinkron, kirimAntrean } from '../logic/api.js'
import { resetProgres } from '../logic/progres.js'
import { usePasang } from '../logic/pasang.js'

function Segmen({ pilihan, nilai, onUbah, label }) {
  return (
    <div className="segmen" role="group" aria-label={label}>
      {pilihan.map(([kunci, teks]) => (
        <button key={kunci} type="button" aria-pressed={nilai === kunci} onClick={() => onUbah(kunci)}>{teks}</button>
      ))}
    </div>
  )
}

export default function Pengaturan() {
  const profil = useProfil()
  const atur = usePengaturan()
  const { status, menunggu } = useStatusSinkron()
  const { terpasang } = usePasang()
  const [ubahProfil, setUbahProfil] = useState(false)
  const [tentang, setTentang] = useState(false)

  function reset() {
    if (window.confirm('Hapus semua progres dan nilai di HP ini? Tindakan ini tidak bisa dibatalkan.')) resetProgres()
  }

  return (
    <>
      <HeaderHalaman judul="Pengaturan" kembaliKe="/" />
      <div className="tumpuk-besar">
        <button className="kartu-menu" onClick={() => setUbahProfil(true)}>
          <span className="kotak-ikon ikon-ungu" aria-hidden="true"><User size={24} /></span>
          <span className="teks">
            <span className="judul" style={{ display: 'block' }}>{profil?.nama}</span>
            <span className="deskripsi" style={{ display: 'block' }}>Nama panggilan</span>
          </span>
          <span className="lencana">Ubah</span>
          <ChevronRight size={22} className="panah" aria-hidden="true" />
        </button>

        {!terpasang && <KartuPasang bisaDitutup={false} />}

        <section className="kartu">
          <div className="baris-pengaturan">
            <div>
              <div className="label-atur">Status sinkron</div>
              <div className="kecil muted">{INFO_SINKRON[status]?.pesan}{status === 'menunggu' && menunggu ? ` (${menunggu} hasil)` : ''}</div>
            </div>
            {(status === 'menunggu' || status === 'offline') && <button className="tombol kecil kedua" onClick={kirimAntrean}>Kirim</button>}
          </div>
          <div className="baris-pengaturan">
            <span className="label-atur">Tema</span>
            <Segmen label="Tema" nilai={atur.tema} onUbah={(tema) => ubahPengaturan({ tema })} pilihan={[['otomatis', 'Ikuti HP'], ['terang', 'Terang'], ['gelap', 'Gelap']]} />
          </div>
          <div className="baris-pengaturan">
            <span className="label-atur">Ukuran huruf</span>
            <Segmen label="Ukuran huruf" nilai={atur.huruf} onUbah={(huruf) => ubahPengaturan({ huruf })} pilihan={[['kecil', 'A−'], ['normal', 'Normal'], ['besar', 'A+']]} />
          </div>
          <div className="baris-pengaturan">
            <span className="label-atur">Reset progres</span>
            <button className="tombol kecil garis" onClick={reset}>Reset</button>
          </div>
          <div className="baris-pengaturan">
            <span className="label-atur">Tentang aplikasi</span>
            <button className="tombol kecil kedua" onClick={() => setTentang(true)}>Lihat</button>
          </div>
        </section>
      </div>

      {ubahProfil && (
        <LembarBawah judul="Ubah nama panggilan" tutup={() => setUbahProfil(false)}>
          <Masuk ubahMode profilLama={profil} onSelesai={() => setUbahProfil(false)} />
        </LembarBawah>
      )}
      {tentang && (
        <LembarBawah judul="Tentang PolaKu" tutup={() => setTentang(false)}>
          <div className="tumpuk kecil">
            <p><b>PolaKu</b> — aplikasi belajar pola bilangan ganjil dan genap untuk SMP kelas VIII, dirancang berdasarkan Cognitive Load Theory.</p>
            <p>Dikembangkan oleh Suchita Rahma Fakhira (NIM 2225250006), mata kuliah Algoritma dan Pemrograman, dosen pengampu Dr. Aan Hendrayana, S.Si., M.Pd.</p>
            <p className="muted">Dibangun dengan JavaScript (React) dan Python (Flask). Data yang dikirim hanya nama panggilan dan hasil belajar.</p>
          </div>
        </LembarBawah>
      )}
    </>
  )
}
