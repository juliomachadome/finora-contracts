import { describe, it, expect } from 'vitest'
import {
  columnMappingSchema,
  confirmMappingInputSchema,
  dataQualitySummarySchema,
  importFilterSchema,
  importMappingSchema,
  importPreviewSchema,
  importProgressSchema,
  importSchema,
  previewRowSchema,
  TARGET_FIELDS,
} from '../src/ingestion.js'

/**
 * Ingestion is where third-party bytes become numbers a CFO signs.
 *
 * Every case here is one of the two failure modes that matter: a mapping the API
 * accepts and the importer cannot honour, and a counter that says more rows went
 * in than did.
 */

const UUID = '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d'

const mapping = {
  sourceColumn: 'Data do documento',
  targetField: 'date' as const,
  confidence: 0.92,
  format: 'DD/MM/YYYY',
}

describe('columnMappingSchema', () => {
  it('accepts a detected mapping with its format', () => {
    expect(columnMappingSchema.parse(mapping).format).toBe('DD/MM/YYYY')
  })

  it('requires the format to be present as null when there is none', () => {
    // Optional would let a producer omit it and a consumer read `undefined`
    // where it expected "not detected". Explicit null is one state, not two.
    expect(() =>
      columnMappingSchema.parse({ sourceColumn: 'Valor', targetField: 'amount', confidence: 1 }),
    ).toThrow()
  })

  it('keeps confidence inside 0–1', () => {
    // The screen preselects above a threshold and asks below it. A confidence of
    // 92 instead of 0.92 would preselect everything, including the guesses.
    expect(() => columnMappingSchema.parse({ ...mapping, confidence: 92 })).toThrow()
    expect(() => columnMappingSchema.parse({ ...mapping, confidence: -0.1 })).toThrow()
  })

  it('refuses a target field the importer does not know', () => {
    expect(() => columnMappingSchema.parse({ ...mapping, targetField: 'iban' })).toThrow()
  })

  it('carries an explicit way to discard a column', () => {
    // Without `ignore`, a column the user does not want has to be mapped to
    // something — and everything it lands on is wrong.
    expect(TARGET_FIELDS).toContain('ignore')
    expect(columnMappingSchema.parse({ ...mapping, targetField: 'ignore' }).targetField).toBe(
      'ignore',
    )
  })
})

describe('confirmMappingInputSchema', () => {
  it('defaults pseudonymization to off', () => {
    // Defaulting it on would silently rewrite the names in a file of ordinary
    // suppliers, and the user would find out at the drill-down.
    const parsed = confirmMappingInputSchema.parse({
      sheetName: 'Movimentos',
      transactionType: 'EXPENSE',
      columns: [mapping],
    })
    expect(parsed.pseudonymizeNames).toBe(false)
  })

  it('requires the transaction type', () => {
    // Importing expenses as revenue is the one mistake in this flow that inverts
    // every number downstream, so it is never inferred here.
    expect(() =>
      confirmMappingInputSchema.parse({ sheetName: null, columns: [mapping] }),
    ).toThrow()
  })

  it('accepts a file with no sheets, as CSV has', () => {
    expect(
      confirmMappingInputSchema.parse({
        sheetName: null,
        transactionType: 'REVENUE',
        columns: [mapping],
      }).sheetName,
    ).toBeNull()
  })
})

describe('importMappingSchema', () => {
  it('binds a mapping to the import it belongs to', () => {
    // A mapping with no import is a mapping that can be applied to the wrong
    // file, which is a whole month of somebody else's numbers.
    expect(() =>
      importMappingSchema.parse({
        importId: 'not-a-uuid',
        sheetName: null,
        transactionType: 'REVENUE',
        columns: [],
      }),
    ).toThrow()
  })
})

describe('importSchema', () => {
  const record = {
    id: UUID,
    organizationId: UUID,
    dataSourceId: UUID,
    datasetId: null,
    trigger: 'MANUAL_UPLOAD',
    state: 'COMPLETED',
    fileName: 'despesas_julho.xlsx',
    fileSizeBytes: 240_000,
    fileHash: 'a'.repeat(64),
    rowsTotal: 1200,
    rowsImported: 1180,
    rowsSkipped: 20,
    errorMessage: null,
    createdAt: '2026-07-01T10:00:00.000Z',
    completedAt: '2026-07-01T10:00:12.000Z',
  }

  it('accepts a completed import', () => {
    expect(importSchema.parse(record).rowsImported).toBe(1180)
  })

  it('refuses a negative row count', () => {
    // Counts are what the quality panel reconciles against. A negative one is
    // not a small display bug: it is an arithmetic that cannot be reconciled.
    expect(() => importSchema.parse({ ...record, rowsSkipped: -1 })).toThrow()
  })

  it('refuses a fractional row count', () => {
    expect(() => importSchema.parse({ ...record, rowsTotal: 12.5 })).toThrow()
  })

  it('allows an import with no dataset yet', () => {
    // The dataset only exists once something has been imported into it.
    expect(importSchema.parse({ ...record, datasetId: null, state: 'UPLOADED' }).datasetId).toBeNull()
  })

  it('refuses a state the pipeline does not have', () => {
    expect(() => importSchema.parse({ ...record, state: 'QUASE_PRONTO' })).toThrow()
  })
})

describe('importProgressSchema', () => {
  it('keeps the percentage inside 0–100', () => {
    // The bar is an estimate, and it still cannot show 140%.
    expect(() =>
      importProgressSchema.parse({
        importId: UUID,
        state: 'NORMALIZING',
        progressPercent: 140,
        message: null,
      }),
    ).toThrow()
  })
})

describe('dataQualitySummarySchema', () => {
  it('carries the rows of each issue, not just how many', () => {
    // "12 duplicate transactions" that cannot be opened is decoration. The
    // sample row numbers are what make the panel a starting point.
    const parsed = dataQualitySummarySchema.parse({
      importId: UUID,
      rowsProcessed: 1200,
      detectedCurrency: 'EUR',
      issues: [
        {
          id: UUID,
          importId: UUID,
          type: 'DUPLICATE_TRANSACTION',
          severity: 'MEDIUM',
          message: '12 transacções duplicadas',
          affectedRows: 12,
          sampleRowNumbers: [142, 143, 189],
          resolvedAt: null,
        },
      ],
    })

    expect(parsed.issues[0]?.sampleRowNumbers).toEqual([142, 143, 189])
  })

  it('allows a file whose currency could not be detected', () => {
    // Guessing the currency is how a €200k month becomes a $200k month.
    expect(
      dataQualitySummarySchema.parse({
        importId: UUID,
        rowsProcessed: 10,
        detectedCurrency: null,
        issues: [],
      }).detectedCurrency,
    ).toBeNull()
  })
})

describe('previewRowSchema', () => {
  const row = {
    rowNumber: 142,
    date: '2026-07-31',
    description: 'Fornecimento de energia',
    amountCents: '-124556',
    currency: 'EUR',
    counterparty: 'EDP Comercial',
    category: 'Utilities',
  }

  it('accepts a row already interpreted, cents and all', () => {
    expect(previewRowSchema.parse(row).amountCents).toBe('-124556')
  })

  it('keeps the amount a string, because a BigInt does not survive JSON', () => {
    // Sent as a number, twenty thousand rows of it reintroduce exactly the
    // floating point the engine is built to avoid.
    expect(() => previewRowSchema.parse({ ...row, amountCents: -124556 })).toThrow()
  })

  it('refuses an amount with a decimal point', () => {
    // This is the failure the cast used to let through: `"1245.56"` reaching the
    // screen and becoming 1245 cents after `Number()`, quietly, on every row.
    expect(() => previewRowSchema.parse({ ...row, amountCents: '1245.56' })).toThrow()
  })

  it('allows a row with no counterparty and no category', () => {
    // Plenty of files have neither. Requiring them would reject the preview of a
    // file that imports perfectly well.
    const parsed = previewRowSchema.parse({ ...row, counterparty: null, category: null })
    expect(parsed.counterparty).toBeNull()
  })

  it('points at the line of the original file', () => {
    // The row number is what makes the preview checkable: without it the person
    // is comparing five rows against a file of twenty thousand.
    expect(() => previewRowSchema.parse({ ...row, rowNumber: 0 })).toThrow()
  })
})

describe('importPreviewSchema', () => {
  const preview = {
    rows: [
      {
        rowNumber: 2,
        date: '2026-07-01',
        description: 'Avença mensal',
        amountCents: '450000',
        currency: 'EUR',
        counterparty: 'Acme Lda',
        category: null,
      },
    ],
    rowsReady: 1180,
    rowsSkipped: 20,
    duplicates: 12,
    formats: { date: 'DD/MM/YYYY', amount: '1.234,56' },
  }

  it('accepts the response the preview endpoint returns', () => {
    expect(importPreviewSchema.parse(preview).rowsReady).toBe(1180)
  })

  it('shows fewer rows than it counts', () => {
    // `rows` is a sample and `rowsReady` is the total. Reading the length of the
    // sample as the total is how "5 rows imported" appears over a full file.
    const parsed = importPreviewSchema.parse(preview)
    expect(parsed.rows.length).toBeLessThan(parsed.rowsReady)
  })

  it('carries how the file was read, which is the whole point of the step', () => {
    // `1.234,56` read as American gives 1.23. The format shown next to the rows
    // is what lets somebody recognise the mistake before it is saved.
    expect(importPreviewSchema.parse(preview).formats.amount).toBe('1.234,56')
  })

  it('refuses a negative count', () => {
    expect(() => importPreviewSchema.parse({ ...preview, duplicates: -1 })).toThrow()
  })

  it('refuses a row the interpretation could not produce', () => {
    // The reason this is in the contract at all: the frontend used to cast this
    // response, and a cast checks nothing.
    expect(() =>
      importPreviewSchema.parse({ ...preview, rows: [{ ...preview.rows[0], currency: 'EUROS' }] }),
    ).toThrow()
  })
})

describe('importFilterSchema', () => {
  it('paginates by cursor, with a default page size', () => {
    expect(importFilterSchema.parse({}).limit).toBe(50)
  })

  it('caps the page size', () => {
    // The ceiling is the protection against one request asking for the whole
    // history and holding a connection while it is built.
    expect(() => importFilterSchema.parse({ limit: 5000 })).toThrow()
  })

  it('coerces the limit that arrives from a query string', () => {
    // Everything in a URL is a string; without coercion the filter would reject
    // every real request.
    expect(importFilterSchema.parse({ limit: '25' }).limit).toBe(25)
  })
})
