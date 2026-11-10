import { useState } from 'react'
import { Cloud, CloudOff, CloudUpload } from 'lucide-react'
import { useStatusSinkron, kirimAntrean } from '../logic/api.js'

export const INFO_SINKRON = {
  tersinkron: { Ikon: Cloud, label: 'Tersinkron', pesan: 'Tersinkron ✓ — nilaimu sudah tersimpan di server.' },
  menunggu: { Ikon: CloudUpload, label: 'Menunggu', pesan: 'Ada hasil yang menunggu dikirim.' },
  offline: { Ikon: CloudOff, label: 'Offline', pesan: 'Kamu sedang offline. Nilaimu disimpan di HP dan akan dikirim nanti.' }
}

export default function IndikatorSinkron() {
  const { status, menunggu } = useStatusSinkron()
  const [toast, setToast] = useState(false)
  const info = INFO_SINKRON[status] ?? INFO_SINKRON.menunggu
  const { Ikon } = info

  return (
    <>
      <button
        className={`indikator-sinkron ${status}`}
        onClick={() => { setToast(true); kirimAntrean(); setTimeout(() => setToast(false), 3500) }}
        aria-label={`Status sinkron: ${info.label}`}
      >
        <Ikon size={16} aria-hidden="true" />
        {info.label}{status === 'menunggu' && menunggu ? ` (${menunggu})` : ''}
      </button>
      {toast && (
        <div className="toast" role="status">
          <span>{info.pesan}</span>
          <button onClick={() => setToast(false)}>Tutup</button>
        </div>
      )}
    </>
  )
}
