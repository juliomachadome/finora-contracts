import { describe, it, expect } from 'vitest'
import {
  breakdownItemSchema,
  budgetSchema,
  lineageRefSchema,
  timeSeriesPointSchema,
  transactionFilterSchema,
  transactionSchema,
} from '../src/financial.js'

/**
 * The financial core, tested on the promise the product is sold on.
 *
 * "Three clicks between 'the margin fell 3.2pp' and the exact rows that prove
 * it" is a property of this shape before it is a property of any screen: a
 * transaction that cannot say which file and which row it came from cannot be
 * checked by anyone.
 */

const UUID = '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d'

const lineage = {
  importId: UUID,
  fileName: 'despesas_julho.xlsx',
  sheetName: 'Marketing',
  rowNumber: 142,
}

describe('lineageRefSchema', () => {
  it('carries the file, the sheet and the row', () => {
    expect(lineageRefSchema.parse(lineage).rowNumber).toBe(142)
  })

  it('numbers rows from one, as the user sees them in Excel', () => {
    // A zero-based row number sends whoever checks it to the line above the one
    // that proves the point — which is worse than showing no row at all,
    // because it looks right.
    expect(() => lineageRefSchema.parse({ ...lineage, rowNumber: 0 })).toThrow()
  })

  it('allows no row for data that did not come from a file', () => {
    // An API connector has no row number. The field is nullable so that case is
    // stated, rather than being faked with a zero.
    expect(lineageRefSchema.parse({ ...lineage, rowNumber: null, sheetName: null }).rowNumber).toBeNull()
  })

  it('requires the import, always', () => {
    // Lineage without an import is a claim with no address. Everything else here
    // is optional detail; this one is what makes the claim checkable.
    const orphan: Record<string, unknown> = { ...lineage }
    delete orphan.importId
    expect(() => lineageRefSchema.parse(orphan)).toThrow()
  })
})

describe('transactionSchema', () => {
  const transaction = {
    id: UUID,
    organizationId: UUID,
    type: 'EXPENSE' as const,
    date: '2026-07-15',
    description: 'Campanha digital',
    amount: { amountCents: -450_000, currency: 'EUR' },
    customerId: null,
    customerName: null,
    supplierId: UUID,
    supplierName: 'Agência Norte',
    categoryId: UUID,
    categoryName: 'Marketing',
    invoiceNumber: 'FT 2026/1183',
    reference: null,
    lineage,
  }

  it('accepts an expense with its supplier and its proof', () => {
    expect(transactionSchema.parse(transaction).lineage.fileName).toBe('despesas_julho.xlsx')
  })

  it('holds money in whole cents', () => {
    // Floating point does not represent 0.1 exactly, and twenty thousand rows of
    // accumulated error show up as missing cents in a report a CFO signs.
    expect(() =>
      transactionSchema.parse({ ...transaction, amount: { amountCents: -4500.5, currency: 'EUR' } }),
    ).toThrow()
  })

  it('allows a negative amount, because a refund is one', () => {
    expect(
      transactionSchema.parse({
        ...transaction,
        amount: { amountCents: -1_000, currency: 'EUR' },
      }).amount.amountCents,
    ).toBe(-1_000)
  })

  it('dates a transaction by day, not by instant', () => {
    /*
     * A full ISO instant would be refused, and that is the point.
     *
     * An invoice happens on a day. Storing an instant makes the same
     * transaction fall in June or July depending on the reader's time zone,
     * which is a month-end that does not reconcile.
     */
    expect(() => transactionSchema.parse({ ...transaction, date: '2026-07-15T00:00:00Z' })).toThrow()
  })

  it('lets a transaction have neither customer nor supplier', () => {
    // A bank line has neither, and it still has to be importable.
    const parsed = transactionSchema.parse({
      ...transaction,
      supplierId: null,
      supplierName: null,
    })
    expect(parsed.supplierId).toBeNull()
  })

  it('refuses a transaction with no lineage at all', () => {
    const orphan: Record<string, unknown> = { ...transaction }
    delete orphan.lineage
    expect(() => transactionSchema.parse(orphan)).toThrow()
  })
})

describe('transactionFilterSchema', () => {
  it('sorts by date, newest first, unless told otherwise', () => {
    const parsed = transactionFilterSchema.parse({})
    expect(parsed.sortBy).toBe('date')
    expect(parsed.sortDir).toBe('desc')
  })

  it('coerces the numbers that arrive from a query string', () => {
    // Everything in a URL is a string. Without coercion the explorer's amount
    // filters would reject every real request.
    const parsed = transactionFilterSchema.parse({ minAmountCents: '10000', page: '3' })
    expect(parsed.minAmountCents).toBe(10_000)
    expect(parsed.page).toBe(3)
  })

  it('refuses a sort column that is not indexed', () => {
    // Sorting by an unindexed column is a full scan on a table that grows for
    // ever, and it arrives as a URL anybody can type.
    expect(() => transactionFilterSchema.parse({ sortBy: 'supplierName' })).toThrow()
  })

  it('caps the page jump', () => {
    // The numbered jump coexists with the cursor; the ceiling is what keeps its
    // cost in milliseconds. Beyond it, you filter.
    expect(() => transactionFilterSchema.parse({ page: 5000 })).toThrow()
  })

  it('bounds the search string', () => {
    expect(() => transactionFilterSchema.parse({ search: 'x'.repeat(500) })).toThrow()
  })
})

describe('breakdownItemSchema', () => {
  it('allows a change with no comparison base', () => {
    // A customer who first invoiced this month has no previous period. Dividing
    // by zero is not infinite growth, it is the absence of a base.
    const parsed = breakdownItemSchema.parse({
      id: UUID,
      label: 'Vega Partners SA',
      amount: { amountCents: 250_000, currency: 'EUR' },
      sharePercent: 25,
      changePercent: null,
      transactionCount: 12,
    })

    expect(parsed.changePercent).toBeNull()
  })

  it('allows a row with no entity behind it', () => {
    // "Uncategorized" is a real row in the breakdown and has no id to click
    // through to. Requiring one would force a fake uuid nobody can resolve.
    expect(
      breakdownItemSchema.parse({
        id: null,
        label: 'Sem categoria',
        amount: { amountCents: 12_000, currency: 'EUR' },
        sharePercent: 1.2,
        changePercent: null,
        transactionCount: 3,
      }).id,
    ).toBeNull()
  })
})

describe('budgetSchema', () => {
  it('budgets one category for one month', () => {
    const parsed = budgetSchema.parse({
      id: UUID,
      organizationId: UUID,
      period: '2026-07',
      categoryId: UUID,
      categoryName: 'Marketing',
      budgetAmount: { amountCents: 2_500_000, currency: 'EUR' },
      createdAt: '2026-06-30T09:00:00.000Z',
    })

    expect(parsed.budgetAmount.amountCents).toBe(2_500_000)
  })

  it('refuses a period that is not a month', () => {
    // A budget for "2026" cannot be compared with a month of actuals, and the
    // overrun detector would silently find nothing.
    expect(() =>
      budgetSchema.parse({
        id: UUID,
        organizationId: UUID,
        period: '2026',
        categoryId: UUID,
        categoryName: 'Marketing',
        budgetAmount: { amountCents: 1, currency: 'EUR' },
        createdAt: '2026-06-30T09:00:00.000Z',
      }),
    ).toThrow()
  })
})

describe('timeSeriesPointSchema', () => {
  it('carries the currency on every point', () => {
    // A chart of a company that changed base currency mid-history is two series
    // wearing one axis. The currency travels with the point so that is visible.
    const parsed = timeSeriesPointSchema.parse({
      period: '2026-07',
      revenue: 1_000_000,
      expenses: 800_000,
      grossProfit: 600_000,
      currency: 'eur',
    })

    // Upper-cased by the schema: `eur` and `EUR` must not be two currencies.
    expect(parsed.currency).toBe('EUR')
  })

  it('keeps the figures in whole cents', () => {
    expect(() =>
      timeSeriesPointSchema.parse({
        period: '2026-07',
        revenue: 1_000_000.4,
        expenses: 800_000,
        grossProfit: 600_000,
        currency: 'EUR',
      }),
    ).toThrow()
  })
})
