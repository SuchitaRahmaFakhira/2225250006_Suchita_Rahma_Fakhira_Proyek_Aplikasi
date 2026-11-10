/** Ikon besar dalam kotak + judul + subjudul (Kalkulator, Generator, Evaluasi). */
export default function JudulHalaman({ Ikon, warna = 'ungu', judul, subjudul, children }) {
  return (
    <div className="judul-halaman">
      {children ?? (
        <span className={`kotak-ikon besar ikon-${warna}`} aria-hidden="true">
          <Ikon size={44} />
        </span>
      )}
      <h2>{judul}</h2>
      {subjudul && <p className="muted">{subjudul}</p>}
    </div>
  )
}
