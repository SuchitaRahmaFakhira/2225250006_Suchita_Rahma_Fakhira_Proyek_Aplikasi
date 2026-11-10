import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import BottomNav from './components/BottomNav.jsx'
import PemberitahuanVersi from './components/PemberitahuanVersi.jsx'
import { useProfil } from './logic/profil.js'
import Masuk from './pages/Masuk.jsx'
import Beranda from './pages/Beranda.jsx'
import Materi from './pages/Materi.jsx'
import ModulBelajar from './pages/ModulBelajar.jsx'
import Kalkulator from './pages/Kalkulator.jsx'
import Generator from './pages/Generator.jsx'
import Latihan from './pages/Latihan.jsx'
import LatihanSesi from './pages/LatihanSesi.jsx'
import Evaluasi from './pages/Evaluasi.jsx'
import EvaluasiSesi from './pages/EvaluasiSesi.jsx'
import HasilBelajar from './pages/HasilBelajar.jsx'
import Pengaturan from './pages/Pengaturan.jsx'
import PetunjukPasang from './pages/PetunjukPasang.jsx'

function GulirKeAtas() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Kerangka() {
  const profil = useProfil()
  const { pathname } = useLocation()

  if (!profil && pathname !== '/masuk') return <Navigate to="/masuk" replace />
  const denganNav = pathname !== '/masuk'

  return (
    <div className="aplikasi">
      <main className={`isi ${denganNav ? '' : 'tanpa-nav'}`}>
        <div className="halaman" key={pathname}>
          <Routes>
            <Route path="/masuk" element={profil ? <Navigate to="/" replace /> : <Masuk />} />
            <Route path="/" element={<Beranda />} />
            <Route path="/materi" element={<Materi />} />
            <Route path="/materi/:id" element={<ModulBelajar />} />
            <Route path="/kalkulator" element={<Kalkulator />} />
            <Route path="/generator" element={<Generator />} />
            <Route path="/latihan" element={<Latihan />} />
            <Route path="/latihan/:jenis" element={<LatihanSesi />} />
            <Route path="/evaluasi" element={<Evaluasi />} />
            <Route path="/evaluasi/:jenis" element={<EvaluasiSesi />} />
            <Route path="/nilai" element={<HasilBelajar />} />
            <Route path="/pengaturan" element={<Pengaturan />} />
            <Route path="/pasang" element={<PetunjukPasang />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
      {denganNav && <BottomNav />}
      <PemberitahuanVersi />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <GulirKeAtas />
      <Kerangka />
    </HashRouter>
  )
}
