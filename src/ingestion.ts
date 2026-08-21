import { z } from 'zod'
import { currencySchema, idSchema, isoDateTimeSchema, paginationQuerySchema } from './api.js'
import {
  dataQualityIssueTypeSchema,
  importStateSchema,
  importTriggerSchema,
  severitySchema,
  transactionTypeSchema,
} from './enums.js'

/**
 * Ingestion — from the file to the normalized transaction.
 *
 *   Upload → validation → storage → parsing → sheet and column detection
 *   → mapping → normalization → validation → deduplication → persistence
 *
 * The pipeline is the same whether the data comes from an Excel or from an API
 * (§98). All that changes is the connector that produces the batch.
 */

export const datasetSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  /**
   * Goes up on each completed import.
   *
   * It is the piece that makes reports reproducible (§46) and that invalidates
   * the metrics cache by construction: new key, old values stop being read, with
   * no manual invalidation — which is where wrong cached numbers are born.
   */
  version: z.number().int().positive(),
  transactionCount: z.number().int().nonnegative(),
  updatedAt: isoDateTimeSchema,
})
export type Dataset = z.infer<typeof datasetSchema>

export const importSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  dataSourceId: idSchema,
  datasetId: idSchema.nullable(),
  trigger: importTriggerSchema,
  state: importStateSchema,
  fileName: z.string(),
  fileSizeBytes: z.number().int().nonnegative(),
  /**
   * SHA-256 of the content.
   *
   * With `unique(organizationId, fileHash)` in the database, uploading the same
   * file twice is rejected by the constraint (§92). The check is the constraint,
   * and not a `findFirst` before the `create` — between the read and the write
   * another request fits, and that is how duplicates are born in production.
   */
  fileHash: z.string(),
  rowsTotal: z.number().int().nonnegative(),
  rowsImported: z.number().int().nonnegative(),
  rowsSkipped: z.number().int().nonnegative(),
  errorMessage: z.string().nullable(),
  createdAt: isoDateTimeSchema,
  completedAt: isoDateTimeSchema.nullable(),
})
export type Import = z.infer<typeof importSchema>

/** Target fields a column can feed. */
export const TARGET_FIELDS = [
  'date',
  'description',
  'amount',
  'currency',
  'customer',
  'supplier',
  'category',
  /*
   * The product or line of business (T20).
   *
   * A dimension of its own and not the category, because `category` is already
   * the cost taxonomy — cost of sales, salaries, marketing. Feeding product
   * lines into it would list "Bicicletas" beside "Salários" on every screen
   * that groups by category, as though they were both places money goes.
   */
  'product',
  'invoiceNumber',
  'reference',
  'externalId',
  'ignore',
] as const
export const targetFieldSchema = z.enum(TARGET_FIELDS)
export type TargetField = z.infer<typeof targetFieldSchema>

/**
 * How the suggestion for a column was arrived at (§27, D10).
 *
 * ## Why this travels beside the confidence and does not replace it
 *
 * The confidence is a number the interface compares against a threshold. This
 * is the **reason**, and it is the part that lets a screen say something a
 * person can act on: "the name contains «data», but it is not exactly that" is
 * checkable against the file in front of them; "confidence 0.6" is not.
 *
 * Deriving it from the confidence in the frontend would put the detector's
 * thresholds in two places, which is how one of them ends up stale.
 *
 * `MANUAL` is what a human choice leaves behind. It is not a match at all, and
 * recording it as `EXACT` would make the mapping feedback of T13 report a
 * correction as a confirmed synonym.
 */
export const COLUMN_MATCHES = ['EXACT', 'PARTIAL', 'NONE', 'MANUAL'] as const
export const columnMatchSchema = z.enum(COLUMN_MATCHES)
export type ColumnMatch = z.infer<typeof columnMatchSchema>

/**
 * Mapping of a column of the file to a domain field (§27).
 *
 * `confidence` feeds the UI: above a threshold it is shown preselected with a
 * tick; below it, confirmation is asked for. Mapping wrongly in silence is worse
 * than asking.
 */
export const columnMappingSchema = z.object({
  sourceColumn: z.string(),
  targetField: targetFieldSchema,
  confidence: z.number().min(0).max(1),
  /**
   * Why the suggestion says what it says.
   *
   * Optional so a client built against an older contract still validates — the
   * screen falls back to the sentence it had before, which is the correct
   * degradation for a field that only makes a warning more specific.
   */
  match: columnMatchSchema.optional(),
  /** Detected format, e.g. `DD/MM/YYYY` or `1.234,56`. */
  format: z.string().nullable(),
})
export type ColumnMapping = z.infer<typeof columnMappingSchema>

export const importMappingSchema = z.object({
  importId: idSchema,
  sheetName: z.string().nullable(),
  transactionType: transactionTypeSchema,
  columns: z.array(columnMappingSchema),
})
export type ImportMapping = z.infer<typeof importMappingSchema>

export const confirmMappingInputSchema = z.object({
  sheetName: z.string().nullable(),
  transactionType: transactionTypeSchema,
  columns: z.array(columnMappingSchema),
  /** Pseudonymize names when the sheet looks like payroll. */
  pseudonymizeNames: z.boolean().default(false),
})
export type ConfirmMappingInput = z.infer<typeof confirmMappingInputSchema>

/**
 * One row of the preview, already interpreted (§29).
 *
 * This is the step that catches the expensive mistake: an American file read as
 * a European one imports twenty thousand rows off by an order of magnitude, in
 * silence, and it is only found weeks later when the report does not add up.
 * Showing five rows **as they would be saved** puts that error in front of the
 * one person able to recognise it in a second.
 */
export const previewRowSchema = z.object({
  /** The line in the original file, so the person can go and look at it. */
  rowNumber: z.number().int().positive(),
  /** `YYYY-MM-DD`. Already normalized: it is the interpretation being checked. */
  date: z.string(),
  description: z.string(),
  /**
   * Integer cents, **as a string**.
   *
   * A `BigInt` does not survive `JSON.stringify`, and turning it into a `number`
   * on the way out would put back exactly the floating point the engine spends
   * its whole design avoiding. The string crosses the wire intact and the UI
   * converts it once, at the formatting boundary.
   *
   * The pattern is not decoration: it is what makes a stray `"12.34"` fail here,
   * at the parse, instead of arriving as a silent `12` after `Number()`.
   */
  amountCents: z.string().regex(/^-?\d+$/),
  currency: currencySchema,
  /** The customer or the supplier, whichever the document type makes it. */
  counterparty: z.string().nullable(),
  category: z.string().nullable(),
})
export type PreviewRow = z.infer<typeof previewRowSchema>

/**
 * What `POST /imports/:id/preview` answers.
 *
 * It exists in the contract, and not as a hand-written type on each side,
 * because it is the only response the frontend used to read through a cast — and
 * a cast checks nothing. The shape could drift on the backend and the screen
 * would carry on compiling while rendering `undefined`.
 */
export const importPreviewSchema = z.object({
  /** Only the first few. The count of what would go in is `rowsReady`. */
  rows: z.array(previewRowSchema),
  rowsReady: z.number().int().nonnegative(),
  rowsSkipped: z.number().int().nonnegative(),
  /** Of the skipped ones, how many were skipped for being repeats. */
  duplicates: z.number().int().nonnegative(),
  /** How the file was read, e.g. `DD/MM/YYYY` and `1.234,56`. */
  formats: z.object({ date: z.string(), amount: z.string() }),
})
export type ImportPreview = z.infer<typeof importPreviewSchema>

/**
 * Problem found in the data (§30).
 *
 * Stored rather than merely counted: the user has to be able to open "12
 * duplicate transactions" and see which ones, otherwise the quality panel is
 * decoration.
 */
export const dataQualityIssueSchema = z.object({
  id: idSchema,
  importId: idSchema,
  type: dataQualityIssueTypeSchema,
  severity: severitySchema,
  message: z.string(),
  affectedRows: z.number().int().nonnegative(),
  sampleRowNumbers: z.array(z.number().int()),
  resolvedAt: isoDateTimeSchema.nullable(),
})
export type DataQualityIssue = z.infer<typeof dataQualityIssueSchema>

export const dataQualitySummarySchema = z.object({
  importId: idSchema,
  rowsProcessed: z.number().int().nonnegative(),
  detectedCurrency: z.string().nullable(),
  issues: z.array(dataQualityIssueSchema),
})
export type DataQualitySummary = z.infer<typeof dataQualitySummarySchema>

export const importProgressSchema = z.object({
  importId: idSchema,
  state: importStateSchema,
  /** 0–100. An estimate; the UI shows a bar, not a promise of time. */
  progressPercent: z.number().min(0).max(100),
  message: z.string().nullable(),
})
export type ImportProgress = z.infer<typeof importProgressSchema>

export const importFilterSchema = paginationQuerySchema.extend({
  state: importStateSchema.optional(),
  dataSourceId: idSchema.optional(),
})
export type ImportFilter = z.infer<typeof importFilterSchema>
