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
 * Ingestão — do ficheiro à transacção normalizada.
 *
 *   Upload → validação → armazenamento → parsing → detecção de folha e coluna
 *   → mapeamento → normalização → validação → deduplicação → persistência
 *
 * O pipeline é o mesmo venha o dado de um Excel ou de uma API (§98). O que muda
 * é só o conector que produz o lote.
 */

export const datasetSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  /**
   * Sobe a cada import concluído.
   *
   * É a peça que torna os relatórios reproduzíveis (§46) e que invalida o cache
   * de métricas por construção: chave nova, valores antigos deixam de ser lidos,
   * sem invalidação manual — que é onde nascem os números errados em cache.
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
   * SHA-256 do conteúdo.
   *
   * Com `unique(organizationId, fileHash)` na base, carregar duas vezes o mesmo
   * ficheiro é rejeitado pela constraint (§92). A verificação é a constraint, e
   * não um `findFirst` antes do `create` — entre o ler e o escrever cabe outro
   * pedido, e é assim que nascem duplicados em produção.
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

/** Campos de destino que uma coluna pode alimentar. */
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
 * Mapeamento de uma coluna do ficheiro para um campo do domínio (§27).
 *
 * `confidence` alimenta a UI: acima de um limiar mostra-se pré-seleccionado com
 * visto; abaixo, pede-se confirmação. Mapear errado em silêncio é pior do que
 * perguntar.
 */
export const columnMappingSchema = z.object({
  sourceColumn: z.string(),
  targetField: targetFieldSchema,
  confidence: z.number().min(0).max(1),
  /** Formato detectado, ex. `DD/MM/YYYY` ou `1.234,56`. */
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
  /** Pseudonimizar nomes quando a folha parece de salários. */
  pseudonymizeNames: z.boolean().default(false),
})
export type ConfirmMappingInput = z.infer<typeof confirmMappingInputSchema>

/**
 * Problema encontrado nos dados (§30).
 *
 * Guardado em vez de apenas contado: o utilizador tem de poder abrir "12
 * transacções duplicadas" e ver quais, senão o painel de qualidade é decoração.
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
  /** 0–100. Estimativa; a UI mostra barra, não promessa de tempo. */
  progressPercent: z.number().min(0).max(100),
  message: z.string().nullable(),
})
export type ImportProgress = z.infer<typeof importProgressSchema>

export const importFilterSchema = paginationQuerySchema.extend({
  state: importStateSchema.optional(),
  dataSourceId: idSchema.optional(),
})
export type ImportFilter = z.infer<typeof importFilterSchema>
