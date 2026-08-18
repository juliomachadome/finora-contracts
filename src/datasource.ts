import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'
import {
  aiRetentionPolicySchema,
  connectorCapabilitySchema,
  dataSourceKindSchema,
} from './enums.js'

/**
 * Data sources (§98).
 *
 * The rule that decides whether plugging in a Xero six months from now is *an
 * adapter* or *a rewrite*: **no source talks directly to normalization**. They
 * all end in the same `RawBatch` and enter the identical pipeline.
 *
 *   FileUpload ─┐
 *   Xero ───────┼─→ RawBatch ─→ Mapping ─→ Normalization ─→ Validation ─→ Dedup
 *   OpenBanking ┘
 *
 * In M0 only the file connector exists. The others are in the enum without an
 * implementation (§107) — that is what guarantees they fit without a migration.
 */

export const dataSourceSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: dataSourceKindSchema,
  name: z.string(),
  capabilities: z.array(connectorCapabilitySchema),
  /**
   * Non-secret configuration: endpoint, remote company id, filters.
   * Credentials never live here — they live encrypted and never leave the backend.
   */
  config: z.record(z.string(), z.unknown()),
  /** Never `true` so the frontend knows the key; only whether it exists. */
  hasCredentials: z.boolean(),
  lastSyncAt: isoDateTimeSchema.nullable(),
  lastSyncError: z.string().nullable(),
  createdAt: isoDateTimeSchema,
})
export type DataSource = z.infer<typeof dataSourceSchema>

/**
 * Incremental synchronization cursor.
 *
 * Exists in M0 without anyone using it because adding it later forces
 * reprocessing history to find out where things stopped.
 */
export const syncCursorSchema = z.object({
  /** Supplier watermark: timestamp, sequential id or opaque token. */
  value: z.string(),
  updatedAt: isoDateTimeSchema,
})
export type SyncCursor = z.infer<typeof syncCursorSchema>

/**
 * Structure discovered at the source.
 *
 * A file returns sheets and columns; an API returns entities and fields. The
 * same shape in both cases is what lets the mapping UI (§27) be a single one.
 */
export const discoveredFieldSchema = z.object({
  name: z.string(),
  /** Type inferred from the sample, not declared. Excel lies about types. */
  inferredType: z.enum(['date', 'number', 'string', 'boolean', 'empty', 'mixed']),
  /** First rows, for the user to recognize the column when mapping. */
  sampleValues: z.array(z.string()),
  nullRatio: z.number().min(0).max(1),
})
export type DiscoveredField = z.infer<typeof discoveredFieldSchema>

export const discoveredEntitySchema = z.object({
  /** Name of the sheet, table or remote entity. */
  name: z.string(),
  rowCount: z.number().int().nonnegative(),
  fields: z.array(discoveredFieldSchema),
  /**
   * Flagged when the columns look like a payroll sheet.
   *
   * It is the file with a salary tied to an identified person — personal data of
   * third parties and the number one reason for a CFO not to upload anything.
   * Detecting it allows offering pseudonymization before persisting, instead of
   * finding out afterwards.
   */
  suspectedPayroll: z.boolean(),
})
export type DiscoveredEntity = z.infer<typeof discoveredEntitySchema>

export const discoveredSchemaSchema = z.object({
  entities: z.array(discoveredEntitySchema),
})
export type DiscoveredSchema = z.infer<typeof discoveredSchemaSchema>

export const connectionHealthSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
  checkedAt: isoDateTimeSchema,
})
export type ConnectionHealth = z.infer<typeof connectionHealthSchema>

/**
 * AI provider configuration per organization (§12 BYOK).
 *
 * The key is never returned — only the mask (`sk-…4f2a`), which is enough for
 * the user to recognize which one they configured.
 *
 * `retentionPolicy` exists because some providers train on API data depending on
 * the tier, and a badly chosen key puts a client's financial data into a
 * training corpus, which cannot be undone. The UI flags it before use.
 */
export const aiProviderConfigSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: z.string(),
  model: z.string(),
  baseUrl: z.string().nullable(),
  apiKeyMask: z.string().nullable(),
  embeddingModel: z.string().nullable(),
  retentionPolicy: aiRetentionPolicySchema,
  /** False when the endpoint leaves the client's machine or region. */
  dataStaysLocal: z.boolean(),
  isActive: z.boolean(),
  createdAt: isoDateTimeSchema,
})
export type AIProviderConfig = z.infer<typeof aiProviderConfigSchema>

export const upsertAIProviderConfigInputSchema = z.object({
  kind: z.string(),
  model: z.string().min(1),
  baseUrl: z.string().url().nullable().optional(),
  /** Only on the write. Never comes back on a read. */
  apiKey: z.string().min(1).nullable().optional(),
  embeddingModel: z.string().nullable().optional(),
  retentionPolicy: aiRetentionPolicySchema.optional(),
})
export type UpsertAIProviderConfigInput = z.infer<typeof upsertAIProviderConfigInputSchema>
