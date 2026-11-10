import { CheckCircle2, XCircle } from 'lucide-react'

const HURUF = 'ABCDEFGH'

/**
 * Pilihan ganda A–D (seperti mockup Latihan Soal).
 * @param {{teks: string}[]} pilihan
 * @param {number|null} dipilih
 * @param {Record<number, 'benar'|'salah'|'dicoret'>} tanda  penanda setelah diperiksa
 */
export default function PilihanGanda({ pilihan, dipilih, onPilih, tanda = {}, terkunci = false, label = 'Pilihan jawaban' }) {
  return (
    <div className="pilihan-ganda" role="radiogroup" aria-label={label}>
      {pilihan.map((p, i) => {
        const t = tanda[i]
        const nonaktif = terkunci || t === 'dicoret'
        return (
          <button
            key={i}
            type="button"
            role="radio"
            aria-checked={dipilih === i}
            className={`opsi ${t ?? ''}`}
            disabled={nonaktif}
            onClick={() => onPilih(i)}
          >
            <span className="huruf">{HURUF[i]}</span>
            <span className="teks-opsi">{p.teks}</span>
            {t === 'benar' ? <CheckCircle2 size={22} aria-label="Benar" /> : t === 'salah' ? <XCircle size={22} aria-label="Salah" /> : <span className="radio" aria-hidden="true" />}
          </button>
        )
      })}
    </div>
  )
}
