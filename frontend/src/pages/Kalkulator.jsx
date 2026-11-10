import { useState } from 'react'
import { Calculator, X, CheckCircle2 } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import JudulHalaman from '../components/JudulHalaman.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import { bacaBilangan, bagiDua, jenisBilangan, angkaSatuan, formatAngka } from '../logic/rumus.js'

/** Kalkulator Ganjil Genap (mockup layar 2, PRD F16). */
export default function Kalkulator() {
  const [teks, setTeks] = useState('')
  const [hasil, setHasil] = useState(null)
  const [galat, setGalat] = useState(null)

  function hitung(e) {
    e.preventDefault()
    const baca = bacaBilangan(teks)
    if (!baca.ok) {
      setGalat(baca.pesan)
      setHasil(null)
      return
    }
    setGalat(null)
    const x = baca.nilai
    setHasil({ x, jenis: jenisBilangan(x), ...bagiDua(x) })
  }

  function kosongkan() {
    setTeks('')
    setHasil(null)
    setGalat(null)
  }

  return (
    <>
      <HeaderHalaman judul="Kalkulator Ganjil Genap" kembaliKe="/" />
      <form className="tumpuk-besar" onSubmit={hitung} noValidate>
        <JudulHalaman Ikon={Calculator} warna="ungu" judul="Kalkulator Ganjil Genap" subjudul="Masukkan angka yang ingin diperiksa" />

        <div>
          <label className="label" htmlFor="bilangan">Masukkan bilangan</label>
          <div className="input-wadah">
            <input
              id="bilangan"
              className="input"
              inputMode="numeric"
              autoComplete="off"
              placeholder="Contoh: 17"
              value={teks}
              onChange={(e) => setTeks(e.target.value)}
              aria-invalid={!!galat}
              aria-describedby="galat-bilangan"
            />
            {teks && (
              <button type="button" className="input-hapus" onClick={kosongkan} aria-label="Kosongkan">
                <X size={18} />
              </button>
            )}
          </div>
          {galat && <p id="galat-bilangan" className="pesan-galat" role="alert">{galat}</p>}
        </div>

        <button className="tombol penuh" type="submit">
          <Calculator size={20} /> Hitung
        </button>

        {hasil && (
          <section className="kartu tumpuk" aria-live="polite">
            <span className="chip ungu" style={{ alignSelf: 'center' }}>Hasil Perhitungan</span>
            <div className={`kartu-hasil ${hasil.jenis}`}>
              <div className="jenis">BILANGAN {hasil.jenis.toUpperCase()}</div>
              <div className="angka">{formatAngka(hasil.x)}</div>
            </div>
            <div>
              <p style={{ fontWeight: 700 }}>Cara Perhitungan:</p>
              {hasil.x < 0 && <p className="kecil muted">Bilangan negatif: kita hitung dari {formatAngka(hasil.mutlak)}.</p>}
              <p style={{ fontSize: '1.375rem', fontWeight: 800 }}>
                {formatAngka(hasil.mutlak)} ÷ 2 = {formatAngka(hasil.hasil)} sisa {hasil.sisa}
              </p>
            </div>
            <p className="tengah">
              {hasil.sisa === 1
                ? `Karena sisanya 1, maka ${formatAngka(hasil.x)} termasuk bilangan ganjil.`
                : `Karena sisanya 0 (habis dibagi 2), maka ${formatAngka(hasil.x)} termasuk bilangan genap.`}
            </p>
            <p className="kecil muted tengah">
              Cara cepat: angka satuannya {angkaSatuan(hasil.x)}, jadi {formatAngka(hasil.x)} bilangan {hasil.jenis}.
            </p>
            <span className="chip hijau" style={{ alignSelf: 'center' }}>
              <CheckCircle2 size={16} /> Perhitungan berhasil
            </span>
          </section>
        )}

        <KotakIngat>Bilangan genap memiliki sisa 0, sedangkan bilangan ganjil memiliki sisa 1 jika dibagi 2.</KotakIngat>
      </form>
    </>
  )
}
