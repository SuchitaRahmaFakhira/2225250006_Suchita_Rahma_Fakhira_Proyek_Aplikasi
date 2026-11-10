import { describe, expect, it } from 'vitest'
import { buatSoal, buatSoalSesi, RENCANA_SESI, levelBerikut, langkahPenyelesaian, contohSerupa, BATAS_BERTAHAP } from './generatorSoal.js'
import { periksaPG, periksaBertahap } from './penilaian.js'
import { hitungUn } from './rumus.js'

const ULANG = 300

describe('generator soal', () => {
  it('setiap soal pilihan ganda punya pilihan unik dan kunci yang benar', () => {
    for (const tipe of ['T1', 'T2', 'T3', 'UN', 'T6', 'SN']) {
      for (const level of [1, 2, 3]) {
        for (let i = 0; i < ULANG / 10; i++) {
          const s = buatSoal(tipe, level, { bolehBertahap: false })
          const teks = s.pilihan.map((p) => p.teks)
          expect(new Set(teks).size).toBe(teks.length)
          expect(s.pilihan[s.kunci].kode).toBeNull()
          expect(periksaPG(s, s.kunci).benar).toBe(true)
          if (tipe !== 'T1') expect(s.pilihan).toHaveLength(4)
          expect(s.petunjuk).toHaveLength(3)
        }
      }
    }
  })

  it('jawaban Un dan Sn sesuai rumus', () => {
    for (let i = 0; i < ULANG; i++) {
      const s = buatSoal('UN', 2, { bolehBertahap: false })
      expect(s.jawaban).toBe(hitungUn(s.pola, s.n))
      expect(s.pilihan[s.kunci].teks.replace(/\./g, '')).toBe(String(s.jawaban))
    }
  })

  it('rentang n mengikuti level', () => {
    for (let i = 0; i < ULANG; i++) {
      expect(buatSoal('UN', 1).n).toBeLessThanOrEqual(15)
      expect(buatSoal('UN', 3).n).toBeGreaterThanOrEqual(51)
    }
  })

  it('n besar memakai isian bertahap', () => {
    const s = buatSoal('T5', 3)
    expect(s.n).toBeGreaterThanOrEqual(BATAS_BERTAHAP)
    expect(s.format).toBe('bertahap')
    expect(s.langkah).toHaveLength(3)
  })

  it('pengecoh memberi kode miskonsepsi', () => {
    const s = buatSoal('T5', 1)
    const salahRumus = s.pilihan.findIndex((p) => p.kode === 'M1')
    expect(salahRumus).toBeGreaterThanOrEqual(0)
    const h = periksaPG(s, salahRumus)
    expect(h.benar).toBe(false)
    expect(h.pesan).toMatch(/2n − 1/)
  })

  it('rencana sesi bisa dibuat untuk semua jenis', () => {
    for (const jenis of Object.keys(RENCANA_SESI)) {
      RENCANA_SESI[jenis].forEach((_, i) => expect(buatSoalSesi(jenis, i, 2).teks).toBeTruthy())
    }
  })

  it('soal Un di sesi Sn tidak bertahap', () => {
    for (let i = 0; i < 50; i++) expect(buatSoalSesi('sn', 2, 3).format).toBe('pg')
  })

  it('langkah penyelesaian & contoh serupa tersedia', () => {
    for (const tipe of ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8']) {
      const s = buatSoal(tipe, 1)
      expect(langkahPenyelesaian(s).length).toBeGreaterThan(0)
      expect(contohSerupa(s).langkah.length).toBeGreaterThan(0)
    }
  })
})

describe('penilaian isian bertahap', () => {
  const soal = buatSoal('T5', 3)
  const n = soal.n

  it('semua langkah benar', () => {
    expect(periksaBertahap(soal, [1, String(2 * n), String(2 * n - 1)]).benar).toBe(true)
  })

  it('salah rumus terdeteksi di langkah 1', () => {
    const h = periksaBertahap(soal, [0, String(2 * n), String(2 * n - 1)])
    expect(h).toMatchObject({ benar: false, indeksSalah: 0, kode: 'M1' })
  })

  it('salah perkalian terdeteksi (M4)', () => {
    expect(periksaBertahap(soal, [1, String(2 * n + 10), '1']).kode).toBe('M4')
  })

  it('lupa dikurangi 1 terdeteksi (M3)', () => {
    expect(periksaBertahap(soal, [1, String(2 * n), String(2 * n)]).kode).toBe('M3')
  })
})

describe('kesulitan adaptif', () => {
  it('3 benar berturut → naik, 2 salah berturut → turun', () => {
    expect(levelBerikut(1, [true, true, true])).toEqual({ level: 2, berubah: true })
    expect(levelBerikut(3, [true, true, true])).toEqual({ level: 3, berubah: false })
    expect(levelBerikut(2, [true, false, false])).toEqual({ level: 1, berubah: true })
    expect(levelBerikut(2, [true, false])).toEqual({ level: 2, berubah: false })
  })
})
