import { z } from 'zod'
import {
  currencySchema,
  idSchema,
  isoDateSchema,
  isoDateTimeSchema,
  moneySchema,
  paginationQuerySchema,
  periodSchema,
} from './api.js'
import { customerStatusSchema, transactionTypeSchema } from './enums.js'

/**
 * Financial core.
 *
 * Modelling decision: **a single `Transaction` table as the one fact**, with a
 * `type` discriminator and optional `customerId`/`supplierId` — instead of
 * separate tables for revenue and expense.
 *
 * With separate tables, each metric would need two queries and two sets of
 * indexes, and the drill-down would have two different paths for the same user
 * gesture. `Revenue` and `Expense` still exist as domain concepts; they just are
 * not tables.
 */

// ---------------------------------------------------------------------------
// Lineage — what makes the "you can check everything" promise verifiable
// ---------------------------------------------------------------------------

/**
 * Where this row came from, exactly.
 *
 * It is what makes it possible to go from "the margin fell 3.2pp" to "these 47
 * rows, from the file despesas_julho.xlsx, sheet Marketing, rows 142–189".
 * Without this stored at ingestion time, there is no way to reconstruct it later.
 */
export const lineageRefSchema = z.object({
  importId: idSchema,
  fileName: z.string(),
  sheetName: z.string().nullable(),
  /** Row number in the original file, just as the user sees it in Excel. */
  rowNumber: z.number().int().positive().nullable(),
})
export type LineageRef = z.infer<typeof lineageRefSchema>

// ---------------------------------------------------------------------------
// Entities
// ---------------------------------------------------------------------------

export const transactionSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  type: transactionTypeSchema,
  date: isoDateSchema,
  description: z.string(),
  amount: moneySchema,
  customerId: idSchema.nullable(),
  customerName: z.string().nullable(),
  supplierId: idSchema.nullable(),
  supplierName: z.string().nullable(),
  categoryId: idSchema.nullable(),
  categoryName: z.string().nullable(),
  invoiceNumber: z.string().nullable(),
  reference: z.string().nullable(),
  lineage: lineageRefSchema,
})
export type Transaction = z.infer<typeof transactionSchema>

export const customerSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  /** Commercial enrichment (M8). Null until someone fills it in. */
  segment: z.string().nullable(),
  country: z.string().nullable(),
  status: customerStatusSchema,
  contractStart: isoDateSchema.nullable(),
  contractEnd: isoDateSchema.nullable(),
  renewalDate: isoDateSchema.nullable(),
  annualValue: moneySchema.nullable(),
  ownerId: idSchema.nullable(),
  tags: z.array(z.string()),
  createdAt: isoDateTimeSchema,
})
export type Customer = z.infer<typeof customerSchema>

export const supplierSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  country: z.string().nullable(),
  createdAt: isoDateTimeSchema,
})
export type Supplier = z.infer<typeof supplierSchema>

export const categorySchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  type: transactionTypeSchema,
  /** Shallow hierarchy: a category can have a parent, the parent has no grandparent. */
  parentId: idSchema.nullable(),
  createdAt: isoDateTimeSchema,
})
export type Category = z.infer<typeof categorySchema>

export const budgetSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  period: periodSchema,
  categoryId: idSchema,
  categoryName: z.string(),
  budgetAmount: moneySchema,
  createdAt: isoDateTimeSchema,
})
export type Budget = z.infer<typeof budgetSchema>

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

export const transactionFilterSchema = paginationQuerySchema.extend({
  type: transactionTypeSchema.optional(),
  from: isoDateSchema.optional(),
  to: isoDateSchema.optional(),
  customerId: idSchema.optional(),
  supplierId: idSchema.optional(),
  categoryId: idSchema.optional(),
  importId: idSchema.optional(),
  /** Search by description, customer, supplier or invoice number. */
  search: z.string().max(200).optional(),
  minAmountCents: z.coerce.number().int().optional(),
  maxAmountCents: z.coerce.number().int().optional(),
  sortBy: z.enum(['date', 'amount', 'description']).default('date'),
  sortDir: z.enum(['asc', 'desc']).default('desc'),
  /**
   * Jump to a numbered page. Coexists with the cursor, which remains the default
   * path: a cursor says where to continue, not where page 7 is — and the
   * explorer is where someone looks for a transaction from March. The ceiling of
   * 200 keeps the cost of the jump in milliseconds; beyond it, you filter.
   */
  page: z.coerce.number().int().min(1).max(200).optional(),
})
export type TransactionFilter = z.infer<typeof transactionFilterSchema>

/** Aggregate by dimension — customers, categories, suppliers. */
export const breakdownItemSchema = z.object({
  id: idSchema.nullable(),
  label: z.string(),
  amount: moneySchema,
  /** Weight in the period total, 0–100. */
  sharePercent: z.number(),
  /** Variation against the previous period; null when there was no base. */
  changePercent: z.number().nullable(),
  transactionCount: z.number().int().nonnegative(),
})
export type BreakdownItem = z.infer<typeof breakdownItemSchema>

/** Point of a time series, for the charts of §66. */
export const timeSeriesPointSchema = z.object({
  period: periodSchema,
  revenue: z.number().int(),
  expenses: z.number().int(),
  grossProfit: z.number().int(),
  currency: currencySchema,
})
export type TimeSeriesPoint = z.infer<typeof timeSeriesPointSchema>
