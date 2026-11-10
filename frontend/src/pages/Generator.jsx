import { useState } from 'react'
import { Check, Minus, Plus, Sparkles } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import JudulHalaman from '../components/JudulHalaman.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { DeretSuku } from '../components/VisualPola.jsx'
import { hitungUn, hitungSn, rumusUn, sukuPertama, formatAngka } from '../logic/rumus.js'
import { useProgres, terbuka } from '../logic/progres.js'

const MIN = 1
const MAKS = 20

function IkonTitik({ pola }) {
  const warna = pola === 'genap' ? 'var(--genap)' : 'var(--ganjil)'
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
      {[[5, 5], [17, 5], [5, 17], [17, 17]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="4.5" fill={warna} />)}
    </svg>
  )
}

/** Generator Pola Bilangan (mockup layar 3, PRD F17). */
export default function Generator() {
  const progres = useProgres()
  const tampilSn = terbuka('modul-4', progres)
  const [pola, setPola] = useState('genap')
  const [jumlah, setJumlah] = useState(5)
  const [hasil, setHasil] = useState(null)
  const [dipilih, setDipilih] = useState(null)

  function buat() {
    setHasil({ pola, jumlah })
    setDipilih(null)
  }

  const contohIlustrasi = (
    <div className="deret-suku" aria-hidden="true">
      {[2, 4, 6, 8, 10].map((x) => <span key={x} className="kotak-suku genap">{x}</span>)}
    </div>
  )

  return (
    <>
      <HeaderHalaman judul="Generator Pola Bilangan" kembaliKe="/" />
      <div className="tumpuk-besar">
        <JudulHalaman judul="Generator Pola Bilangan" subjudul="Pilih jenis pola dan tentukan jumlah suku.">
          {contohIlustrasi}
        </JudulHalaman>

        <div>
          <p className="label" id="label-jenis">Jenis Pola</p>
          <div className="pilihan-jenis" role="group" aria-labelledby="label-jenis">
            {['genap', 'ganjil'].map((p) => (
              <button key={p} type="button" aria-pressed={pola === p} onClick={() => setPola(p)}>
                <IkonTitik pola={p} />
                {p === 'genap' ? 'Genap' : 'Ganjil'}
                {pola === p && <span className="centang" aria-hidden="true"><Check size={16} /></span>}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="label" id="label-jumlah">Jumlah Suku</p>
          <div className="stepper" role="group" aria-labelledby="label-jumlah">
            <button type="button" onClick={() => setJumlah((j) => Math.max(MIN, j - 1))} disabled={jumlah <= MIN} aria-label="Kurangi jumlah suku">
              <Minus size={20} />
            </button>
            <output aria-live="polite">{jumlah}</output>
            <button type="button" onClick={() => setJumlah((j) => Math.min(MAKS, j + 1))} disabled={jumlah >= MAKS} aria-label="Tambah jumlah suku">
              <Plus size={20} />
            </button>
          </div>
        </div>

        <button className="tombol penuh" onClick={buat}>
          <Sparkles size={20} /> Generate Pola
        </button>

        {hasil && (
          <>
            <section className="kartu tumpuk" aria-live="polite">
              <h2 className="tengah" style={{ fontSize: '1.0625rem', fontWeight: 700 }}>
                Hasil Pola Bilangan {hasil.pola === 'genap' ? 'Genap' : 'Ganjil'}
              </h2>
              <DeretSuku pola={hasil.pola} n={hasil.jumlah} dipilih={dipilih} onPilih={setDipilih} />
              <p className="kecil muted tengah">Ketuk salah satu kotak untuk melihat cara menghitungnya.</p>
              {dipilih && (
                <div className={`kotak-rumus ${hasil.pola}`}>
                  U{dipilih} = 2 × {dipilih}{hasil.pola === 'ganjil' ? ' − 1' : ''} = {formatAngka(hitungUn(hasil.pola, dipilih))}
                </div>
              )}
            </section>
            <KotakIngat judul="Keterangan:" ikon="info">
              <ul>
                <li>Suku pertama = {sukuPertama(hasil.pola)}</li>
                <li>Beda = 2</li>
                <li>Rumus: {rumusUn(hasil.pola)}</li>
                {tampilSn && (
                  <li>
                    Jumlah {hasil.jumlah} suku: S{hasil.jumlah} = {hasil.jumlah} × {hasil.pola === 'genap' ? hasil.jumlah + 1 : hasil.jumlah} = {formatAngka(hitungSn(hasil.pola, hasil.jumlah))}
                  </li>
                )}
              </ul>
            </KotakIngat>
          </>
        )}
      </div>
    </>
  )
}
