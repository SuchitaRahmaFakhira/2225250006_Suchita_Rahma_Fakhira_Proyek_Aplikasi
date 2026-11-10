import { describe, expect, it } from 'vitest'
import { hitungUn, hitungSn, cariN, jenisBilangan, bagiDua, bacaBilangan, formatAngka, deret } from './rumus.js'

describe('rumus pola bilangan (docs/KONTEN.md bagian 0)', () => {
  it('Un genap = 2n dan Un ganjil = 2n − 1', () => {
    expect(hitungUn('genap', 10)).toBe(20)
    expect(hitungUn('ganjil', 6)).toBe(11) // sesuai catatan siswa
    expect(hitungUn('ganjil', 100)).toBe(199)
  })

  it('Sn genap = n(n + 1) dan Sn ganjil = n²', () => {
    expect(hitungSn('genap', 3)).toBe(12)
    expect(hitungSn('genap', 10)).toBe(110)
    expect(hitungSn('ganjil', 4)).toBe(16)
    expect(hitungSn('ganjil', 20)).toBe(400)
  })

  it('Sn sama dengan menjumlahkan deretnya untuk n = 1–100', () => {
    for (const pola of ['genap', 'ganjil']) {
      for (let n = 1; n <= 100; n++) {
        const jumlah = deret(pola, n).reduce((a, b) => a + b, 0)
        expect(hitungSn(pola, n)).toBe(jumlah)
      }
    }
  })

  it('cariN kebalikan dari Un', () => {
    expect(cariN('ganjil', 37)).toBe(19)
    expect(cariN('genap', 48)).toBe(24)
  })

  it('jenis bilangan & pembagian dengan 2 (Kalkulator)', () => {
    expect(jenisBilangan(17)).toBe('ganjil')
    expect(jenisBilangan(0)).toBe('genap')
    expect(jenisBilangan(-7)).toBe('ganjil')
    expect(bagiDua(17)).toEqual({ mutlak: 17, hasil: 8, sisa: 1 })
    expect(bagiDua(348)).toEqual({ mutlak: 348, hasil: 174, sisa: 0 })
    expect(bagiDua(-7)).toEqual({ mutlak: 7, hasil: 3, sisa: 1 })
  })

  it('membaca masukan Kalkulator', () => {
    expect(bacaBilangan('17')).toEqual({ ok: true, nilai: 17 })
    expect(bacaBilangan(' -7 ')).toEqual({ ok: true, nilai: -7 })
    expect(bacaBilangan('1.275')).toEqual({ ok: true, nilai: 1275 })
    expect(bacaBilangan('').ok).toBe(false)
    expect(bacaBilangan('17.5').ok).toBe(false)
    expect(bacaBilangan('abc').ok).toBe(false)
    expect(bacaBilangan('1234567890123456').ok).toBe(false)
  })

  it('format angka Indonesia', () => {
    expect(formatAngka(1275)).toBe('1.275')
    expect(formatAngka(-7)).toBe('−7')
  })
})
