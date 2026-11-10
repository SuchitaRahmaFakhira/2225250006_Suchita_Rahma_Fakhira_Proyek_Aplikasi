/** Daftar langkah penyelesaian bernomor. */
export default function DaftarLangkah({ langkah, terakhirBaru = false }) {
  return (
    <ol className="langkah-daftar">
      {langkah.map((teks, i) => (
        <li key={i} className={terakhirBaru && i === langkah.length - 1 ? 'baru' : ''}>
          <span className="no" aria-hidden="true">{i + 1}</span>
          <span>{teks}</span>
        </li>
      ))}
    </ol>
  )
}
