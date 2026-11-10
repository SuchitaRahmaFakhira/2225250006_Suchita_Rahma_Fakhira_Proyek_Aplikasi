// pasang.js diimpor paling awal agar event "beforeinstallprompt" tidak terlewat.
import './logic/pasang.js'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { terapkanPengaturan } from './logic/pengaturan.js'
import { mulaiSinkronOtomatis } from './logic/api.js'
import './styles/global.css'

terapkanPengaturan()
mulaiSinkronOtomatis()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
