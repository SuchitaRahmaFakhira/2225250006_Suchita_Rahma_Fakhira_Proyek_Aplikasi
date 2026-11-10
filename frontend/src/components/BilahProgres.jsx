export default function BilahProgres({ nilai, total }) {
  const persen = total ? Math.round((nilai / total) * 100) : 0
  return (
    <div className="bilah-progres">
      <div className="jalur" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={nilai} aria-label="Kemajuan">
        <div className="isi-bilah" style={{ width: `${persen}%` }} />
      </div>
      <span className="angka">{nilai}/{total}</span>
    </div>
  )
}
