import { Smartphone, Share, PlusSquare, MoreVertical } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import JudulHalaman from '../components/JudulHalaman.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { usePasang, pasangAplikasi } from '../logic/pasang.js'

/** Petunjuk memasang PolaKu tanpa Play Store/App Store. */
export default function PetunjukPasang() {
  const { terpasang, bisaOtomatis, ios } = usePasang()

  return (
    <>
      <HeaderHalaman judul="Pasang Aplikasi" />
      <div className="tumpuk-besar">
        <JudulHalaman Ikon={Smartphone} warna="ungu" judul="Pasang PolaKu di HP" subjudul="Tidak perlu Play Store atau App Store." />

        {terpasang && <KotakIngat judul="Sudah terpasang">PolaKu sudah terpasang. Buka dari layar utama HP-mu.</KotakIngat>}

        {!terpasang && bisaOtomatis && (
          <button className="tombol penuh" onClick={pasangAplikasi}>Pasang Sekarang</button>
        )}

        <section className="kartu tumpuk" style={{ order: ios ? -1 : 0 }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.0625rem' }}>iPhone / iPad (Safari)</h2>
          <ol className="langkah-pasang">
            <li><span>Buka PolaKu di <b>Safari</b>, lalu ketuk tombol <b>Bagikan</b> <Share size={16} style={{ verticalAlign: 'middle' }} aria-label="ikon bagikan" /> di bawah layar.</span></li>
            <li><span>Gulir lalu pilih <b>Tambahkan ke Layar Utama</b> <PlusSquare size={16} style={{ verticalAlign: 'middle' }} aria-label="ikon tambah" />.</span></li>
            <li><span>Ketuk <b>Tambah</b>. Ikon PolaKu muncul di layar utama.</span></li>
          </ol>
        </section>

        <section className="kartu tumpuk">
          <h2 style={{ fontWeight: 800, fontSize: '1.0625rem' }}>Android (Chrome)</h2>
          <ol className="langkah-pasang">
            <li><span>Ketuk tombol <b>Pasang Sekarang</b> di Beranda, atau menu <MoreVertical size={16} style={{ verticalAlign: 'middle' }} aria-label="ikon menu" /> di pojok kanan atas Chrome.</span></li>
            <li><span>Pilih <b>Instal aplikasi</b> / <b>Tambahkan ke layar utama</b>.</span></li>
            <li><span>Buka PolaKu dari layar utama — tampil layar penuh seperti aplikasi biasa.</span></li>
          </ol>
        </section>

        <KotakIngat judul="Catatan" ikon="info">
          Pemasangan hanya bisa dari alamat yang diawali <b>https://</b>. Setelah terpasang, materi dan latihan tetap bisa dipakai tanpa internet.
        </KotakIngat>
      </div>
    </>
  )
}
