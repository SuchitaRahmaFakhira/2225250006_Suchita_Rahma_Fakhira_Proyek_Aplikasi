import LembarBawah from './LembarBawah.jsx'
import KotakIngat from './KotakIngat.jsx'
import { useProgres, terbuka } from '../logic/progres.js'

/** Lembar ringkas rumus — selalu bisa dibuka (IL01: siswa lupa/tertukar rumus). */
export default function KartuRumus({ tutup }) {
  const progres = useProgres()
  const tampilSn = terbuka('modul-4', progres)
  return (
    <LembarBawah judul="Kartu Rumus" tutup={tutup}>
      <table className="tabel-rumus">
        <thead>
          <tr>
            <th scope="col"><span className="sr-only">Keterangan</span></th>
            <th scope="col" className="genap">Genap</th>
            <th scope="col" className="ganjil">Ganjil</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Barisan</th><td>2, 4, 6, …</td><td>1, 3, 5, …</td></tr>
          <tr><th scope="row">Mulai dari</th><td>2</td><td>1</td></tr>
          <tr><th scope="row">Suku ke-n</th><td>Un = 2n</td><td>Un = 2n − 1</td></tr>
          {tampilSn && <tr><th scope="row">Jumlah n suku</th><td>Sn = n(n + 1)</td><td>Sn = n²</td></tr>}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <KotakIngat judul="Tip">Lihat suku pertamanya dulu: 2 → genap, 1 → ganjil.</KotakIngat>
      </div>
    </LembarBawah>
  )
}
