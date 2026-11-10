import { useState } from 'react'
import { kirimAntrean, ubahNama } from '../logic/api.js'
import { simpanProfil } from '../logic/profil.js'

const MAKS_NAMA = 30

export function IlustrasiKubus() {
  return (
    <div className="ilustrasi-kubus" aria-hidden="true">
      <span>1</span><span>2</span><span>3</span>
    </div>
  )
}

/**
 * Masuk pertama kali: cukup nama panggilan (PRD F22).
 * Tidak ada kode kelas maupun password — siapa pun bisa langsung belajar.
 */
export default function Masuk({ ubahMode = false, profilLama = null, onSelesai }) {
  const [nama, setNama] = useState(profilLama?.nama ?? '')
  const [galat, setGalat] = useState(null)

  function mulai(e) {
    e.preventDefault()
    const bersih = nama.trim().replace(/\s+/g, ' ')
    if (!bersih) return setGalat('Tulis nama panggilanmu dulu, ya.')
    if (bersih.length > MAKS_NAMA) return setGalat(`Nama terlalu panjang (maks. ${MAKS_NAMA} huruf).`)
    if (ubahMode) {
      ubahNama(bersih)
    } else {
      simpanProfil({ nama: bersih, siswaId: null })
      kirimAntrean() // mendaftar ke server Python bila online
    }
    onSelesai?.()
  }

  return (
    <form className="tumpuk-besar" onSubmit={mulai} noValidate style={{ paddingTop: ubahMode ? 0 : 56 }}>
      {!ubahMode && (
        <div className="tumpuk tengah" style={{ alignItems: 'center' }}>
          <IlustrasiKubus />
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Halo! Selamat datang di PolaKu</h1>
          <p className="muted">Belajar pola bilangan ganjil dan genap dengan mudah.</p>
        </div>
      )}

      <div>
        <label className="label" htmlFor="nama">Nama panggilanmu</label>
        <input
          id="nama"
          className="input"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          placeholder="Contoh: Rani"
          maxLength={40}
          autoComplete="nickname"
          aria-invalid={!!galat}
          aria-describedby="galat-nama"
        />
        {galat && <p id="galat-nama" className="pesan-galat">{galat}</p>}
      </div>

      <button className="tombol penuh" type="submit">{ubahMode ? 'Simpan' : 'Mulai Belajar'}</button>
      {!ubahMode && <p className="kecil muted tengah">Tidak perlu daftar akun atau password.</p>}
    </form>
  )
}
