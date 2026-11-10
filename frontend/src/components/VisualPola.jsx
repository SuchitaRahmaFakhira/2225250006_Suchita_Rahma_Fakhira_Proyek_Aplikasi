// Visual pola bilangan: kotak suku, titik berpasangan, tabel n–Un, persegi Sn.
// Warna bermakna: genap = ungu, ganjil = biru, selalu disertai label (EL02).
import { Fragment } from 'react'
import { hitungUn, hitungSn, jenisBilangan, angkaSatuan, formatAngka } from '../logic/rumus.js'

const warna = (pola) => (pola === 'genap' ? 'var(--genap)' : 'var(--ganjil)')
const namaPola = (pola) => (pola === 'genap' ? 'Genap' : 'Ganjil')

export function DeretSuku({ pola, n, mulai = 1, label = false, dipilih, onPilih }) {
  return (
    <div className="deret-suku">
      {Array.from({ length: n }, (_, i) => {
        const k = mulai + i
        const kotak = (
          <button
            type="button"
            className={`kotak-suku ${pola} ${dipilih === k ? 'dipilih' : ''}`}
            onClick={onPilih ? () => onPilih(k) : undefined}
            tabIndex={onPilih ? 0 : -1}
            aria-label={`Suku ke-${k}: ${hitungUn(pola, k)}`}
            style={onPilih ? undefined : { cursor: 'default' }}
          >
            {formatAngka(hitungUn(pola, k))}
          </button>
        )
        return label ? (
          <div key={k}>
            {kotak}
            <div className="label-n">U{k}</div>
          </div>
        ) : (
          <Fragment key={k}>{kotak}</Fragment>
        )
      })}
    </div>
  )
}

/** Titik berpasangan dua baris; bilangan ganjil punya satu titik sisa. */
export function TitikBerpasangan({ nilai, r = 9, jarak = 26 }) {
  const atas = Math.ceil(nilai / 2)
  const bawah = Math.floor(nilai / 2)
  const pola = jenisBilangan(nilai)
  const lebar = atas * jarak + 8
  const tinggi = 2 * jarak + 26
  return (
    <svg viewBox={`0 0 ${lebar} ${tinggi}`} width={lebar} height={tinggi} role="img" aria-label={`${nilai} titik, ${pola === 'genap' ? 'semua berpasangan' : 'sisa satu'}`}>
      {Array.from({ length: atas }, (_, i) => {
        const sisa = pola === 'ganjil' && i === atas - 1
        const cx = 4 + jarak / 2 + i * jarak
        return (
          <g key={`a${i}`}>
            <circle cx={cx} cy={jarak / 2} r={r} fill={warna(pola)} />
            {sisa && <circle cx={cx} cy={jarak / 2} r={r + 4} fill="none" stroke="var(--salah)" strokeWidth="2" strokeDasharray="4 3" />}
          </g>
        )
      })}
      {Array.from({ length: bawah }, (_, i) => (
        <circle key={`b${i}`} cx={4 + jarak / 2 + i * jarak} cy={jarak * 1.5} r={r} fill={warna(pola)} opacity="0.55" />
      ))}
      <text x={lebar / 2} y={tinggi - 4} textAnchor="middle" fontSize="13" fontWeight="700" fill="var(--text-muted)">
        {nilai} = {pola === 'genap' ? `${bawah} pasang` : `${bawah} pasang + sisa 1`}
      </text>
    </svg>
  )
}

function TitikMini({ nilai }) {
  const atas = Math.ceil(nilai / 2)
  const bawah = Math.floor(nilai / 2)
  const j = 9
  return (
    <svg viewBox={`0 0 ${atas * j} ${2 * j}`} width={atas * j} height={2 * j} aria-hidden="true">
      {Array.from({ length: atas }, (_, i) => <circle key={`a${i}`} cx={j / 2 + i * j} cy={j / 2} r={3.2} fill={warna(jenisBilangan(nilai))} />)}
      {Array.from({ length: bawah }, (_, i) => <circle key={`b${i}`} cx={j / 2 + i * j} cy={j * 1.5} r={3.2} fill={warna(jenisBilangan(nilai))} opacity="0.55" />)}
    </svg>
  )
}

export function TabelPola({ pola, n = 5, titik = false }) {
  const kolom = Array.from({ length: n }, (_, i) => i + 1)
  return (
    <div style={{ width: '100%' }}>
      {titik && (
        <div className="deret-suku" style={{ alignItems: 'flex-end', marginBottom: 8 }}>
          {kolom.map((k) => <TitikMini key={k} nilai={hitungUn(pola, k)} />)}
        </div>
      )}
      <table className="tabel-pola">
        <caption className="sr-only">Tabel pola bilangan {pola}</caption>
        <tbody>
          <tr><th scope="row">n</th>{kolom.map((k) => <th key={k} scope="col">{k}</th>)}</tr>
          <tr><th scope="row">Un</th>{kolom.map((k) => <td key={k} className={pola}>{hitungUn(pola, k)}</td>)}</tr>
        </tbody>
      </table>
      <div className="tengah" style={{ marginTop: 6 }}>
        <span className={`lencana-pola ${pola}`}>Pola {namaPola(pola)}</span>
      </div>
    </div>
  )
}

function Bandingkan({ n = 5 }) {
  const kolom = Array.from({ length: n }, (_, i) => i + 1)
  return (
    <table className="tabel-pola">
      <caption className="sr-only">Perbandingan pola genap dan ganjil</caption>
      <tbody>
        <tr><th scope="row">n</th>{kolom.map((k) => <th key={k} scope="col">{k}</th>)}</tr>
        <tr><th scope="row">Genap</th>{kolom.map((k) => <td key={k} className="genap">{hitungUn('genap', k)}</td>)}</tr>
        <tr><th scope="row">Ganjil</th>{kolom.map((k) => <td key={k} className="ganjil">{hitungUn('ganjil', k)}</td>)}</tr>
      </tbody>
    </table>
  )
}

function ContohSatuan({ contoh }) {
  return (
    <ul className="daftar-sederhana" style={{ width: '100%' }}>
      {contoh.map((x) => {
        const pola = jenisBilangan(x)
        return (
          <li key={x}>
            <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>
              {formatAngka(x).slice(0, -1)}
              <span style={{ color: warna(pola), textDecoration: 'underline', textUnderlineOffset: 4 }}>{angkaSatuan(x)}</span>
            </span>
            <span className="muted">satuan {angkaSatuan(x)} →</span>
            <span className={`lencana-pola ${pola}`}>{namaPola(pola)}</span>
          </li>
        )
      })}
    </ul>
  )
}

function Penjumlahan({ pola, n }) {
  return (
    <div className="deret-suku" style={{ alignItems: 'center' }}>
      {Array.from({ length: n }, (_, i) => (
        <Fragment key={i}>
          {i > 0 && <span style={{ fontWeight: 800 }}>+</span>}
          <span className={`kotak-suku ${pola}`}>{hitungUn(pola, i + 1)}</span>
        </Fragment>
      ))}
      <span style={{ fontWeight: 800 }}>=</span>
      <span className="kotak-suku" style={{ background: 'var(--surface-soft)' }}>{hitungSn(pola, n)}</span>
    </div>
  )
}

/** Persegi (ganjil, n×n) atau persegi panjang (genap, n×(n+1)); tiap "siku" = satu suku. */
export function PersegiSn({ pola, n }) {
  const baris = n
  const kolom = pola === 'genap' ? n + 1 : n
  const s = 26
  const g = 4
  const lebar = kolom * (s + g)
  const tinggi = baris * (s + g)
  const sel = []
  for (let r = 0; r < baris; r++) {
    for (let c = 0; c < kolom; c++) {
      const lapis = pola === 'genap' ? Math.max(r, c - 1) : Math.max(r, c)
      sel.push(<rect key={`${r}-${c}`} x={c * (s + g)} y={r * (s + g)} width={s} height={s} rx="6" fill={warna(pola)} opacity={lapis % 2 === 0 ? 1 : 0.45} />)
    }
  }
  return (
    <div className="tumpuk" style={{ alignItems: 'center' }}>
      <svg viewBox={`0 0 ${lebar} ${tinggi}`} width={lebar} height={tinggi} role="img" aria-label={`${baris} baris kali ${kolom} kolom sama dengan ${baris * kolom}`}>
        {sel}
      </svg>
      <span className="muted kecil" style={{ fontWeight: 600 }}>
        {baris} baris × {kolom} kolom = {baris * kolom}
      </span>
    </div>
  )
}

export default function VisualPola({ visual }) {
  if (!visual) return null
  let isi = null
  switch (visual.jenis) {
    case 'suku': isi = <DeretSuku pola={visual.pola} n={visual.n} label={visual.label} />; break
    case 'titik': isi = <TitikBerpasangan nilai={visual.nilai} />; break
    case 'tabel': isi = <TabelPola pola={visual.pola} n={visual.n} titik={visual.titik} />; break
    case 'bandingkan': isi = <Bandingkan n={visual.n} />; break
    case 'satuan': isi = <ContohSatuan contoh={visual.contoh} />; break
    case 'jumlah': isi = <Penjumlahan pola={visual.pola} n={visual.n} />; break
    case 'sn': isi = <PersegiSn pola={visual.pola} n={visual.n} />; break
    default: return null
  }
  return <div className="visual">{isi}</div>
}
