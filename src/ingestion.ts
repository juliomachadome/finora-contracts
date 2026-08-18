import { z } from 'zod'
import { idSchema, isoDateTimeSchema, paginationQuerySchema } from './api.js'
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
  'invoiceNumber',
  'reference',
  'externalId',
  'ignore',
] as const
export const targetFieldSchema = z.enum(TARGET_FIELDS)
export type TargetField = z.infer<typeof targetFieldSchema>

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
