import { useRegisterSW } from 'virtual:pwa-register/react'

/** Memberi tahu saat versi baru PolaKu tersedia (service worker baru). */
export default function PemberitahuanVersi() {
  const {
    needRefresh: [perluMuatUlang, setPerluMuatUlang],
    updateServiceWorker
  } = useRegisterSW()

  if (!perluMuatUlang) return null
  return (
    <div className="toast" role="status">
      <span>Versi baru PolaKu tersedia.</span>
      <span>
        <button onClick={() => setPerluMuatUlang(false)}>Nanti</button>
        <button onClick={() => updateServiceWorker(true)}>Muat ulang</button>
      </span>
    </div>
  )
}
