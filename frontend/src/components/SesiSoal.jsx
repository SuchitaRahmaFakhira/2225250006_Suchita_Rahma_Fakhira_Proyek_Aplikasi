// Mesin sesi soal: pilihan ganda / isian bertahap, petunjuk 3 tingkat,
// umpan balik miskonsepsi, contoh serupa, dan kesulitan adaptif.
import { useMemo, useState } from 'react'
import { Lightbulb, BookOpenCheck, ArrowRight } from 'lucide-react'
import BilahProgres from './BilahProgres.jsx'
import PilihanGanda from './PilihanGanda.jsx'
import KolomLangkah from './KolomLangkah.jsx'
import UmpanBalik from './UmpanBalik.jsx'
import DaftarLangkah from './DaftarLangkah.jsx'
import LembarBawah from './LembarBawah.jsx'
import { periksaPG, periksaBertahap } from '../logic/penilaian.js'
import { contohSerupa, langkahPenyelesaian, levelBerikut, teksJawaban } from '../logic/generatorSoal.js'

const MAKS_PERCOBAAN = 2

/**
 * @param {(indeks: number, level: number) => object} buatSoal
 * @param {number} jumlah
 * @param {(hasil: {skor, maks, petunjuk, detail, level}) => void} onSelesai
 */
export default function SesiSoal({ buatSoal, jumlah, levelAwal = 1, adaptif = false, onSelesai, tampilProgres = true }) {
  const [indeks, setIndeks] = useState(0)
  const [level, setLevel] = useState(levelAwal)
  const [soal, setSoal] = useState(() => buatSoal(0, levelAwal))
  const [riwayat, setRiwayat] = useState([]) // benar/salah percobaan pertama, satu per soal
  const [awalLevel, setAwalLevel] = useState(0) // indeks soal saat level terakhir berubah
  const [detail, setDetail] = useState([])
  const [pesanLevel, setPesanLevel] = useState(null)

  // status per soal
  const [dipilih, setDipilih] = useState(null)
  const [isian, setIsian] = useState([])
  const [percobaan, setPercobaan] = useState(0)
  const [tanda, setTanda] = useState({})
  const [hasil, setHasil] = useState(null)
  const [selesai, setSelesai] = useState(false)
  const [petunjuk, setPetunjuk] = useState(0)
  const [contoh, setContoh] = useState(null)

  const bertahap = soal.format === 'bertahap'
  const bisaPeriksa = !selesai && (bertahap ? soal.langkah.every((_, i) => isian[i] !== undefined && isian[i] !== null && isian[i] !== '') : dipilih !== null)
  const skor = riwayat.filter(Boolean).length
  const pembahasan = useMemo(() => langkahPenyelesaian(soal), [soal])

  function periksa() {
    const h = bertahap ? periksaBertahap(soal, isian) : periksaPG(soal, dipilih)
    const percobaanBaru = percobaan + 1
    if (percobaan === 0) setRiwayat((r) => [...r, h.benar])
    setPercobaan(percobaanBaru)
    setHasil(h)
    if (h.benar) {
      setSelesai(true)
      if (!bertahap) setTanda((t) => ({ ...t, [dipilih]: 'benar' }))
    } else if (percobaanBaru >= MAKS_PERCOBAAN) {
      setSelesai(true)
      if (!bertahap) setTanda((t) => ({ ...t, [dipilih]: 'salah', [soal.kunci]: 'benar' }))
    } else if (!bertahap) {
      setTanda((t) => ({ ...t, [dipilih]: 'dicoret' }))
      setDipilih(null)
    }
  }

  function berikutnya() {
    const benarPertama = riwayat[indeks]
    const catatan = [...detail, { tipe: soal.tipe, level: soal.level, benar: benarPertama, percobaan, petunjuk, kode: hasil?.kode ?? null }]
    setDetail(catatan)
    const totalPetunjuk = catatan.reduce((a, d) => a + d.petunjuk, 0)

    if (indeks + 1 >= jumlah) {
      onSelesai({ skor, maks: jumlah, petunjuk: totalPetunjuk, detail: catatan, level })
      return
    }
    let lvl = level
    if (adaptif) {
      const r = levelBerikut(level, riwayat.slice(awalLevel))
      if (r.berubah) {
        setPesanLevel(r.level > level ? 'Hebat! Soal berikutnya sedikit lebih menantang.' : 'Tidak apa-apa. Kita coba soal yang lebih ringan dulu.')
        setAwalLevel(indeks + 1) // hitung ulang jawaban beruntun setelah level berubah
      } else setPesanLevel(null)
      lvl = r.level
      setLevel(lvl)
    }
    setIndeks(indeks + 1)
    setSoal(buatSoal(indeks + 1, lvl))
    setDipilih(null); setIsian([]); setPercobaan(0); setTanda({}); setHasil(null); setSelesai(false); setPetunjuk(0)
  }

  return (
    <div className="tumpuk-besar">
      {tampilProgres && <BilahProgres nilai={indeks + (selesai ? 1 : 0)} total={jumlah} />}
      {pesanLevel && <p className="kecil muted tengah">{pesanLevel}</p>}

      <div className="kartu tumpuk">
        <div className="baris" style={{ justifyContent: 'space-between' }}>
          <span className="label-tipe">{soal.label}</span>
          <span className="kecil muted">Soal {indeks + 1}</span>
        </div>
        {soal.cerita && <p className="cerita">{soal.cerita}</p>}
        <p className="teks-soal">{soal.teks}</p>

        {bertahap ? (
          <KolomLangkah
            langkah={soal.langkah}
            jawaban={isian}
            onUbah={(i, v) => setIsian((s) => { const b = [...s]; b[i] = v; return b })}
            indeksSalah={hasil && !hasil.benar ? hasil.indeksSalah : -1}
            terkunci={selesai}
          />
        ) : (
          <PilihanGanda pilihan={soal.pilihan} dipilih={dipilih} onPilih={setDipilih} tanda={tanda} terkunci={selesai} />
        )}
      </div>

      {hasil && (
        <UmpanBalik benar={hasil.benar} judul={hasil.benar ? `Tepat! Jawabannya ${teksJawaban(soal)}` : selesai ? 'Belum tepat — ini pembahasannya' : 'Belum tepat, coba sekali lagi'}>
          {!hasil.benar && <p>{hasil.pesan}</p>}
          {selesai && !hasil.benar && (
            <div style={{ marginTop: 8 }}>
              <DaftarLangkah langkah={pembahasan} />
              <p style={{ marginTop: 6, fontWeight: 700 }}>Jawaban: {teksJawaban(soal)}</p>
            </div>
          )}
        </UmpanBalik>
      )}

      {!selesai && petunjuk > 0 && (
        <div className="petunjuk-daftar" aria-live="polite">
          {soal.petunjuk.slice(0, petunjuk).map((p, i) => <p key={i}>💡 {p}</p>)}
        </div>
      )}

      {!selesai && (
        <div className="baris-dua">
          <button className="tombol kedua kecil" onClick={() => setPetunjuk((p) => Math.min(p + 1, soal.petunjuk.length))} disabled={petunjuk >= soal.petunjuk.length}>
            <Lightbulb size={18} /> Petunjuk {petunjuk > 0 ? `${petunjuk}/${soal.petunjuk.length}` : ''}
          </button>
          <button className="tombol kedua kecil" onClick={() => setContoh(contohSerupa(soal))} disabled={soal.tipe === 'K'}>
            <BookOpenCheck size={18} /> Contoh serupa
          </button>
        </div>
      )}

      {selesai ? (
        <button className="tombol penuh" onClick={berikutnya}>
          {indeks + 1 >= jumlah ? 'Lihat Hasil' : 'Selanjutnya'} <ArrowRight size={20} />
        </button>
      ) : (
        <button className="tombol penuh" onClick={periksa} disabled={!bisaPeriksa}>
          Periksa
        </button>
      )}

      {contoh && (
        <LembarBawah judul="Contoh Serupa" tutup={() => setContoh(null)}>
          <div className="tumpuk">
            <p className="teks-soal">{contoh.teks}</p>
            <DaftarLangkah langkah={contoh.langkah} />
            <p style={{ fontWeight: 700 }}>Jawaban: {contoh.jawaban}</p>
            <button className="tombol penuh" onClick={() => setContoh(null)}>Coba soal saya lagi</button>
          </div>
        </LembarBawah>
      )}
    </div>
  )
}
