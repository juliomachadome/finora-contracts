import { describe, it, expect } from 'vitest'
import { moneySchema, periodSchema, periodRangeSchema, deltaSchema } from '../src/api.js'

/**
 * Money and period.
 *
 * These tests exist because the two classes of error they catch are silent: a
 * fractional cent does not blow up, it accumulates; and a malformed period gets
 * through the API and only fails at the bottom of the query.
 */

describe('moneySchema', () => {
  it('accepts cents as an integer', () => {
    const parsed = moneySchema.parse({ amountCents: 123456, currency: 'EUR' })
    expect(parsed.amountCents).toBe(123456)
  })

  it('rejects a fractional cent', () => {
    // Floating point does not represent 0.1 exactly. Over a sum of ten thousand
    // rows the error accumulates and shows up as missing cents in a signed
    // report — fatal in a product whose promise is "you can check everything".
    expect(() => moneySchema.parse({ amountCents: 12.5, currency: 'EUR' })).toThrow()
  })

  it('accepts a negative value, because refunds exist', () => {
    expect(moneySchema.parse({ amountCents: -5000, currency: 'EUR' }).amountCents).toBe(-5000)
  })

  it('normalizes the currency to upper case', () => {
    expect(moneySchema.parse({ amountCents: 1, currency: 'eur' }).currency).toBe('EUR')
  })

  it('rejects a currency that is not a three-letter ISO-4217 code', () => {
    expect(() => moneySchema.parse({ amountCents: 1, currency: 'EURO' })).toThrow()
  })
})

describe('periodSchema', () => {
  it.each(['2026-01', '2026-12'])('accepts %s', (p) => {
    expect(periodSchema.parse(p)).toBe(p)
  })

  it.each(['2026-13', '2026-00', '2026-1', '202601', 'Janeiro/2026'])('rejects %s', (p) => {
    expect(() => periodSchema.parse(p)).toThrow()
  })
})

describe('periodRangeSchema', () => {
  it('accepts a range that starts before it ends', () => {
    expect(periodRangeSchema.parse({ from: '2025-01', to: '2026-06' })).toBeTruthy()
  })

  it('accepts a range of a single month', () => {
    expect(periodRangeSchema.parse({ from: '2026-03', to: '2026-03' })).toBeTruthy()
  })

  it('rejects an inverted range', () => {
    // The YYYY-MM format sorts correctly as a string, which is why a
    // lexicographic comparison is enough here.
    expect(() => periodRangeSchema.parse({ from: '2026-06', to: '2025-01' })).toThrow()
  })
})

describe('deltaSchema', () => {
  it('allows a null changePercent when there is no basis for comparison', () => {
    // Division by zero is not "infinite growth": it is the absence of a basis.
    // The UI has to show that instead of an invented number.
    const d = deltaSchema.parse({
      current: 1000,
      previous: 0,
      changeAbsolute: 1000,
      changePercent: null,
    })
    expect(d.changePercent).toBeNull()
  })
})
