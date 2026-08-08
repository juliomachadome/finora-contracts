import { describe, it, expect } from 'vitest'
import { moneySchema, periodSchema, periodRangeSchema, deltaSchema } from '../src/api.js'

/**
 * Dinheiro e período.
 *
 * Estes testes existem porque as duas classes de erro que apanham são silenciosas:
 * um cêntimo fraccionário não rebenta, acumula; e um período mal formado passa
 * pela API e só falha no fundo da query.
 */

describe('moneySchema', () => {
  it('aceita cêntimos como inteiro', () => {
    const parsed = moneySchema.parse({ amountCents: 123456, currency: 'EUR' })
    expect(parsed.amountCents).toBe(123456)
  })

  it('rejeita cêntimo fraccionário', () => {
    // Vírgula flutuante não representa 0,1 exactamente. Numa soma de dez mil
    // linhas o erro acumula e aparece como cêntimos a faltar num relatório
    // assinado — fatal num produto cuja promessa é "podes conferir tudo".
    expect(() => moneySchema.parse({ amountCents: 12.5, currency: 'EUR' })).toThrow()
  })

  it('aceita valor negativo, porque estornos existem', () => {
    expect(moneySchema.parse({ amountCents: -5000, currency: 'EUR' }).amountCents).toBe(-5000)
  })

  it('normaliza a moeda para maiúsculas', () => {
    expect(moneySchema.parse({ amountCents: 1, currency: 'eur' }).currency).toBe('EUR')
  })

  it('rejeita moeda que não seja ISO-4217 de três letras', () => {
    expect(() => moneySchema.parse({ amountCents: 1, currency: 'EURO' })).toThrow()
  })
})

describe('periodSchema', () => {
  it.each(['2026-01', '2026-12'])('aceita %s', (p) => {
    expect(periodSchema.parse(p)).toBe(p)
  })

  it.each(['2026-13', '2026-00', '2026-1', '202601', 'Janeiro/2026'])('rejeita %s', (p) => {
    expect(() => periodSchema.parse(p)).toThrow()
  })
})

describe('periodRangeSchema', () => {
  it('aceita intervalo com início antes do fim', () => {
    expect(periodRangeSchema.parse({ from: '2025-01', to: '2026-06' })).toBeTruthy()
  })

  it('aceita intervalo de um só mês', () => {
    expect(periodRangeSchema.parse({ from: '2026-03', to: '2026-03' })).toBeTruthy()
  })

  it('rejeita intervalo invertido', () => {
    // O formato YYYY-MM ordena correctamente como string, e é por isso que a
    // comparação lexicográfica basta aqui.
    expect(() => periodRangeSchema.parse({ from: '2026-06', to: '2025-01' })).toThrow()
  })
})

describe('deltaSchema', () => {
  it('permite changePercent nulo quando não há base de comparação', () => {
    // Divisão por zero não é "crescimento infinito": é ausência de base. A UI tem
    // de mostrar isso em vez de um número inventado.
    const d = deltaSchema.parse({
      current: 1000,
      previous: 0,
      changeAbsolute: 1000,
      changePercent: null,
    })
    expect(d.changePercent).toBeNull()
  })
})
