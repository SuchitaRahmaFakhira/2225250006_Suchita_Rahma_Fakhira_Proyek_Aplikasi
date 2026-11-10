import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react'
import HeaderHalaman from '../components/HeaderHalaman.jsx'
import BilahProgres from '../components/BilahProgres.jsx'
import PilihanGanda from '../components/PilihanGanda.jsx'
import RingkasanSkor from '../components/RingkasanSkor.jsx'
import KotakIngat from '../components/KotakIngat.jsx'
import Angket from '../components/Angket.jsx'
import { ambilSoalEvaluasi, catatHasil } from '../logic/api.js'
import { useProgres, terbuka, catatEvaluasi, PESAN_TERKUNCI } from '../logic/progres.js'

const INFO = {
  pretest: { judul: 'Tes Awal', versi: 'A' },
  posttest: { judul: 'Tes Akhir', versi: 'B' }
}
const HURUF = 'ABCD'

/** Evaluasi pre-test/post-test (PRD F18): tanpa petunjuk, pembahasan di akhir. */
export default function EvaluasiSesi() {
  const { jenis } = useParams()
  const info = INFO[jenis]
  const progres = useProgres()
  const [soal, setSoal] = useState(null)
  const [mulai, setMulai] = useState(false)
  const [indeks, setIndeks] = useState(0)
  const [jawaban, setJawaban] = useState([])
  const [selesai, setSelesai] = useState(false)
  const [angketSelesai, setAngketSelesai] = useState(false)

  useEffect(() => {
    if (info) ambilSoalEvaluasi(info.versi).then(setSoal)
  }, [info])

  if (!info) return <Navigate to="/evaluasi" replace />
  if (!terbuka(jenis, progres)) {
    return (
      <>
        <HeaderHalaman judul={info.judul} kembaliKe="/evaluasi" />
        <KotakIngat judul="Belum terbuka" ikon="info">{PESAN_TERKUNCI[jenis]}</KotakIngat>
      </>
    )
  }

  const skor = soal ? soal.filter((s, i) => jawaban[i] === s.kunci).length : 0

  function kumpulkan() {
    if (!window.confirm('Kumpulkan jawaban sekarang?')) return
    const benar = soal.filter((s, i) => jawaban[i] === s.kunci).length
    catatEvaluasi(jenis, { skor: benar, maks: soal.length })
    catatHasil({
      jenis: 'evaluasi',
      modul: `${jenis}-${info.versi}`,
      skor: benar,
      maks: soal.length,
      detail: { jawaban: soal.map((s, i) => ({ no: s.no, pilih: jawaban[i] ?? null, benar: jawaban[i] === s.kunci, kode: jawaban[i] != null ? s.pengecoh[jawaban[i]] : null })) }
    })
    setSelesai(true)
    window.scrollTo(0, 0)
  }

  if (selesai) {
    return (
      <>
        <HeaderHalaman judul={`Hasil ${info.judul}`} kembaliKe="/evaluasi" />
        <div className="tumpuk-besar">
          <RingkasanSkor skor={skor} maks={soal.length} />
          {!angketSelesai && <Angket konteks={jenis} onSelesai={() => setAngketSelesai(true)} />}
          <h2 className="judul-bagian">Pembahasan</h2>
          {soal.map((s, i) => {
            const benar = jawaban[i] === s.kunci
            return (
              <div key={s.no} className="kartu tumpuk">
                <div className="baris" style={{ alignItems: 'flex-start' }}>
                  {benar ? <CheckCircle2 color="var(--benar)" aria-label="Benar" /> : <XCircle color="var(--salah)" aria-label="Salah" />}
                  <p style={{ fontWeight: 700, flex: 1 }}>{s.no}. {s.teks}</p>
                </div>
                <p className="kecil">Jawabanmu: <b>{jawaban[i] != null ? `${HURUF[jawaban[i]]}. ${s.pilihan[jawaban[i]]}` : '—'}</b></p>
                {!benar && <p className="kecil">Jawaban benar: <b>{HURUF[s.kunci]}. {s.pilihan[s.kunci]}</b></p>}
                <p className="kecil muted">{s.pembahasan}</p>
              </div>
            )
          })}
          <Link className="tombol penuh" to={jenis === 'pretest' ? '/materi' : '/nilai'}>
            {jenis === 'pretest' ? 'Mulai Belajar Materi' : 'Lihat Hasil Belajar'}
          </Link>
        </div>
      </>
    )
  }

  if (!mulai) {
    return (
      <>
        <HeaderHalaman judul={info.judul} kembaliKe="/evaluasi" />
        <div className="tumpuk-besar">
          <div className="kartu tumpuk">
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>{info.judul}</h2>
            <ul style={{ margin: 0, paddingLeft: 20 }} className="tumpuk">
              <li>10 soal pilihan ganda.</li>
              <li>Tidak ada petunjuk dan kartu rumus.</li>
              <li>Pembahasan muncul setelah semua soal dikumpulkan.</li>
              <li>Tes ini tetap bisa dikerjakan tanpa internet.</li>
            </ul>
          </div>
          <button className="tombol penuh" onClick={() => setMulai(true)} disabled={!soal}>
            {soal ? 'Mulai Tes' : 'Memuat soal…'}
          </button>
        </div>
      </>
    )
  }

  const s = soal[indeks]
  const terakhir = indeks === soal.length - 1
  return (
    <>
      <HeaderHalaman judul={info.judul} kembaliKe="/evaluasi" />
      <div className="tumpuk-besar">
        <BilahProgres nilai={indeks + 1} total={soal.length} />
        <div className="kartu tumpuk">
          <p className="teks-soal">{s.no}. {s.teks}</p>
          <PilihanGanda
            pilihan={s.pilihan.map((teks) => ({ teks }))}
            dipilih={jawaban[indeks] ?? null}
            onPilih={(p) => setJawaban((j) => { const b = [...j]; b[indeks] = p; return b })}
          />
        </div>
        <div className="baris-dua">
          <button className="tombol kedua" onClick={() => setIndeks(indeks - 1)} disabled={indeks === 0}>
            <ArrowLeft size={20} /> Sebelumnya
          </button>
          {terakhir ? (
            <button className="tombol" onClick={kumpulkan} disabled={jawaban.filter((j) => j != null).length < soal.length}>
              Kumpulkan
            </button>
          ) : (
            <button className="tombol" onClick={() => setIndeks(indeks + 1)} disabled={jawaban[indeks] == null}>
              Selanjutnya <ArrowRight size={20} />
            </button>
          )}
        </div>
      </div>
    </>
  )
}
