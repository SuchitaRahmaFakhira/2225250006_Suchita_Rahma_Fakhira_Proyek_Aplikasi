/**
 * Isian bertahap untuk soal angka besar (PRD F6): rumus → kalikan → kurangi.
 * Setiap langkah dinilai terpisah agar siswa tahu di mana salahnya (IL04, EL05).
 */
export default function KolomLangkah({ langkah, jawaban, onUbah, indeksSalah = -1, terkunci = false }) {
  return (
    <div className="kolom-langkah">
      {langkah.map((l, i) => {
        const id = `langkah-${i}`
        const status = indeksSalah === i ? 'salah' : indeksSalah > i || (terkunci && indeksSalah === -1) ? 'benar' : ''
        return (
          <div key={i} className={`baris-langkah ${status}`}>
            <label htmlFor={id}>
              <span className="muted kecil">Langkah {i + 1}</span>
              <br />
              {l.label}
            </label>
            {l.tipe === 'pilih' ? (
              <select
                id={id}
                value={jawaban[i] ?? ''}
                disabled={terkunci}
                onChange={(e) => onUbah(i, e.target.value === '' ? null : Number(e.target.value))}
                style={{ width: 150 }}
              >
                <option value="">Pilih…</option>
                {l.pilihan.map((p, j) => <option key={j} value={j}>{p}</option>)}
              </select>
            ) : (
              <input
                id={id}
                inputMode="numeric"
                autoComplete="off"
                value={jawaban[i] ?? ''}
                disabled={terkunci}
                onChange={(e) => onUbah(i, e.target.value)}
                aria-invalid={status === 'salah'}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
