import { NavLink, useLocation } from 'react-router-dom'
import { Home, BookOpen, Trophy, Settings } from 'lucide-react'

const TAB = [
  { ke: '/', label: 'Beranda', Ikon: Home },
  { ke: '/materi', label: 'Materi', Ikon: BookOpen },
  { ke: '/nilai', label: 'Nilai', Ikon: Trophy },
  { ke: '/pengaturan', label: 'Pengaturan', Ikon: Settings }
]

/** Tab aktif: Materi/Nilai/Pengaturan sesuai jalurnya; selain itu Beranda (seperti mockup). */
function tabAktif(pathname) {
  if (pathname.startsWith('/materi')) return '/materi'
  if (pathname.startsWith('/nilai')) return '/nilai'
  if (pathname.startsWith('/pengaturan') || pathname.startsWith('/pasang')) return '/pengaturan'
  return '/'
}

export default function BottomNav() {
  const { pathname } = useLocation()
  const aktif = tabAktif(pathname)
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <ul>
        {TAB.map(({ ke, label, Ikon }) => (
          <li key={ke}>
            <NavLink to={ke} className={aktif === ke ? 'aktif' : ''} aria-current={aktif === ke ? 'page' : undefined}>
              <Ikon size={24} strokeWidth={aktif === ke ? 2.4 : 2} aria-hidden="true" />
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
