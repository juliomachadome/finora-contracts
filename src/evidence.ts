import { z } from 'zod'
import { idSchema, moneySchema, periodSchema } from './api.js'
import { lineageRefSchema } from './financial.js'
import { metricIdSchema } from './metrics.js'

/**
 * Evidence — the piece that holds up the product's promise.
 *
 * Every financial AI tool gives an answer. This one lets you verify it. The path
 * always has to be walkable:
 *
 *   conclusion → calculation → metric → entity → transaction → file → row
 *
 * Without this, the product is indistinguishable from an LLM with an Excel — and
 * the user has no way to catch the error, which is exactly the value being sold.
 */

/**
 * How a number was obtained.
 *
 * `inputs` are the values that went in, `formula` is what was done with them.
 * Shown in the evidence panel for the user to redo the sum in their head if they
 * want — and that is what builds trust, not the promise that it is right.
 */
export const calculationSchema = z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  formula: z.string(),
  inputs: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      metricId: metricIdSchema.nullable(),
    }),
  ),
  result: z.number(),
})
export type Calculation = z.infer<typeof calculationSchema>

/** Transaction cited as proof, with the original row it came from. */
export const evidenceTransactionSchema = z.object({
  id: idSchema,
  date: z.string(),
  description: z.string(),
  amount: moneySchema,
  counterpartyName: z.string().nullable(),
  lineage: lineageRefSchema,
})
export type EvidenceTransaction = z.infer<typeof evidenceTransactionSchema>

/**
 * Evidence bundle for a statement.
 *
 * `transactionCount` and `sampleTransactions` exist separately on purpose: a
 * statement can rest on thousands of rows, and returning them all would be
 * useless for the user and expensive for the database. The real count and a
 * sample are shown, with a path to see the rest in the explorer.
 */
export const evidenceSchema = z.object({
  id: idSchema,
  claim: z.string(),
  calculations: z.array(calculationSchema),
  transactionCount: z.number().int().nonnegative(),
  sampleTransactions: z.array(evidenceTransactionSchema),
  /** Files that contributed, for the user to recognize the origin. */
  sources: z.array(
    z.object({
      importId: idSchema,
      fileName: z.string(),
      sheetName: z.string().nullable(),
      rowRange: z.string().nullable(),
    }),
  ),
  datasetVersion: z.number().int(),
})
export type Evidence = z.infer<typeof evidenceSchema>
