// Jenis-jenis layar materi (lihat data/materi.js).
// Setiap layar memanggil onSiap(true) bila siswa boleh lanjut ke layar berikutnya.
import { useEffect, useState } from 'react'
import { RotateCcw, ChevronRight, Check } from 'lucide-react'
import VisualPola from './VisualPola.jsx'
import KotakIngat from './KotakIngat.jsx'
import UmpanBalik from './UmpanBalik.jsx'
import PilihanGanda from './PilihanGanda.jsx'
import DaftarLangkah from './DaftarLangkah.jsx'
import SesiSoal from './SesiSoal.jsx'
import RingkasanSkor from './RingkasanSkor.jsx'
import { buatSoalSesi, RENCANA_SESI } from '../logic/generatorSoal.js'
import { bacaBilangan } from '../logic/rumus.js'

const polaDariRumus = (rumus) => (rumus?.includes('− 1') || rumus?.includes('n²') ? 'ganjil' : 'genap')

export function LayarKonsep({ layar, onSiap }) {
  useEffect(() => onSiap(true), [layar, onSiap])
  return (
    <div className="kartu tumpuk">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{layar.judul}</h2>
      <VisualPola visual={layar.visual} />
      {layar.teks.map((t, i) => <p key={i}>{t}</p>)}
      {layar.rumus && <div className={`kotak-rumus ${layar.visual?.pola ?? polaDariRumus(layar.rumus)}`}>{layar.rumus}</div>}
      {layar.ingat && <KotakIngat>{layar.ingat}</KotakIngat>}
    </div>
  )
}

/** Penuntun "Pilih Rumus" (IL01): suku pertama 1 atau 2? */
export function LayarPilihRumus({ layar, onSiap }) {
  const [jawab, setJawab] = useState(null)
  const benar = layar.pola === 'genap' ? 2 : 1
  useEffect(() => { setJawab(null); onSiap(false) }, [layar, onSiap])

  function pilih(n) {
    setJawab(n)
    onSiap(n === benar)
  }

  return (
    <div className="kartu tumpuk">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{layar.judul}</h2>
      <p className="muted">Barisan:</p>
      <p className="teks-soal" style={{ fontSize: '1.375rem' }}>{layar.barisan}</p>
      <p style={{ fontWeight: 600 }}>Suku pertamanya berapa?</p>
      <div className="baris-dua">
        {[1, 2].map((n) => (
          <button key={n} className={`tombol ${jawab === n ? '' : 'kedua'}`} onClick={() => pilih(n)} aria-pressed={jawab === n}>
            {n}
          </button>
        ))}
      </div>
      {jawab === benar && (
        <>
          <UmpanBalik benar judul={`${benar} → barisan ${layar.pola.toUpperCase()}`} />
          <div className={`kotak-rumus ${layar.pola}`}>{layar.pola === 'genap' ? 'Un = 2n' : 'Un = 2n − 1'}</div>
        </>
      )}
      {jawab !== null && jawab !== benar && (
        <UmpanBalik benar={false}>Lihat lagi angka paling depan pada barisan, ya.</UmpanBalik>
      )}
    </div>
  )
}

/** Worked example: langkah dibuka satu per satu oleh siswa (EL01: tidak terlalu cepat). */
export function LayarContoh({ layar, onSiap }) {
  const [tampil, setTampil] = useState(1)
  useEffect(() => { setTampil(1) }, [layar])
  useEffect(() => onSiap(tampil >= layar.langkah.length), [tampil, layar, onSiap])

  return (
    <div className="kartu tumpuk">
      <span className="label-tipe" style={{ alignSelf: 'flex-start' }}>{layar.judul}</span>
      <p className="teks-soal">{layar.soal}</p>
      <hr style={{ border: 0, borderTop: '1px solid var(--border)', width: '100%', margin: '4px 0' }} />
      <DaftarLangkah langkah={layar.langkah.slice(0, tampil)} terakhirBaru />
      <div className="baris-dua">
        <button className="tombol kedua kecil" onClick={() => setTampil(1)} disabled={tampil === 1}>
          <RotateCcw size={18} /> Ulangi
        </button>
        <button className="tombol kecil" onClick={() => setTampil((t) => t + 1)} disabled={tampil >= layar.langkah.length}>
          Langkah <ChevronRight size={18} />
        </button>
      </div>
      <p className="kecil muted tengah">Langkah {tampil} dari {layar.langkah.length}</p>
    </div>
  )
}

/** Faded example: sebagian langkah diisi siswa + pertanyaan "mengapa" (self-explanation). */
export function LayarFaded({ layar, onSiap }) {
  const isian = layar.langkah.map((l, i) => ({ ...l, i })).filter((l) => l.jawaban !== undefined)
  const [nilai, setNilai] = useState({})
  const [status, setStatus] = useState({}) // i → 'benar' | 'salah'
  const [percobaan, setPercobaan] = useState(0)
  const [alasan, setAlasan] = useState(null)

  useEffect(() => { setNilai({}); setStatus({}); setPercobaan(0); setAlasan(null) }, [layar])

  const semuaBenar = isian.every((l) => status[l.i] === 'benar')
  const tampilJawaban = !semuaBenar && percobaan >= 2
  const langkahSelesai = semuaBenar || tampilJawaban
  const alasanSelesai = !layar.alasan || alasan === layar.alasan.kunci

  useEffect(() => onSiap(langkahSelesai && alasanSelesai), [langkahSelesai, alasanSelesai, onSiap])

  function periksa() {
    const baru = {}
    for (const l of isian) {
      const b = bacaBilangan(String(nilai[l.i] ?? ''))
      baru[l.i] = b.ok && b.nilai === l.jawaban ? 'benar' : 'salah'
    }
    setStatus(baru)
    setPercobaan((p) => p + 1)
  }

  return (
    <div className="kartu tumpuk">
      <span className="label-tipe" style={{ alignSelf: 'flex-start' }}>{layar.judul}</span>
      <p className="teks-soal">{layar.soal}</p>
      <ol className="langkah-daftar">
        {layar.langkah.map((l, i) => (
          <li key={i}>
            <span className="no" aria-hidden="true">{i + 1}</span>
            {l.jawaban === undefined ? (
              <span>{l.teks}</span>
            ) : (
              <span className="baris" style={{ flexWrap: 'wrap', gap: 8 }}>
                <label htmlFor={`isi-${i}`}>{l.teks}</label>
                <input
                  id={`isi-${i}`}
                  inputMode="numeric"
                  autoComplete="off"
                  value={tampilJawaban ? l.jawaban : (nilai[i] ?? '')}
                  disabled={langkahSelesai}
                  onChange={(e) => setNilai((v) => ({ ...v, [i]: e.target.value }))}
                  aria-invalid={status[i] === 'salah'}
                  className="input"
                  style={{
                    width: 110, minHeight: 44, padding: '0 10px', textAlign: 'center', fontWeight: 700,
                    borderColor: status[i] === 'benar' ? 'var(--benar)' : status[i] === 'salah' ? 'var(--salah)' : undefined
                  }}
                />
                {status[i] === 'benar' && <Check size={20} color="var(--benar)" aria-label="Benar" />}
              </span>
            )}
          </li>
        ))}
      </ol>

      {!langkahSelesai && (
        <button className="tombol penuh" onClick={periksa} disabled={isian.some((l) => !String(nilai[l.i] ?? '').trim())}>
          Periksa
        </button>
      )}
      {percobaan > 0 && !langkahSelesai && <UmpanBalik benar={false}>Periksa lagi kotak yang merah. Hitung pelan-pelan, ya.</UmpanBalik>}
      {semuaBenar && <UmpanBalik benar judul="Tepat! Kamu bisa mengerjakannya sendiri." />}
      {tampilJawaban && <UmpanBalik benar={false} judul="Ini jawaban yang benar">Perhatikan langkahnya, lalu lanjutkan.</UmpanBalik>}

      {langkahSelesai && layar.alasan && (
        <div className="tumpuk">
          <p style={{ fontWeight: 700 }}>{layar.alasan.tanya}</p>
          <PilihanGanda
            pilihan={layar.alasan.pilihan.map((teks) => ({ teks }))}
            dipilih={alasan}
            onPilih={setAlasan}
            tanda={alasan === null ? {} : { [alasan]: alasan === layar.alasan.kunci ? 'benar' : 'salah' }}
            terkunci={alasanSelesai}
            label={layar.alasan.tanya}
          />
          {alasan !== null && !alasanSelesai && <p className="pesan-galat">Belum tepat. Lihat lagi suku pertama barisannya.</p>}
        </div>
      )}
    </div>
  )
}

/** Kuis singkat di akhir modul (memakai mesin soal yang sama dengan Latihan). */
export function LayarKuis({ layar, onSiap, onHasil }) {
  const [hasil, setHasil] = useState(null)
  useEffect(() => { onSiap(false) }, [layar, onSiap])

  if (hasil) return <RingkasanSkor skor={hasil.skor} maks={hasil.maks} petunjuk={hasil.petunjuk} />
  return (
    <div className="tumpuk">
      <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{layar.judul}</h2>
      <SesiSoal
        buatSoal={(i, lvl) => buatSoalSesi(layar.jenis, i, lvl)}
        jumlah={RENCANA_SESI[layar.jenis].length}
        onSelesai={(h) => { setHasil(h); onHasil?.(h); onSiap(true) }}
      />
    </div>
  )
}
