import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'
import {
  aiRetentionPolicySchema,
  connectorCapabilitySchema,
  dataSourceKindSchema,
} from './enums.js'

/**
 * Fontes de dados (§98).
 *
 * A regra que decide se ligar um Xero daqui a seis meses é *um adapter* ou *uma
 * reescrita*: **nenhuma fonte fala directamente com a normalização**. Todas
 * terminam no mesmo `RawBatch` e entram no pipeline idêntico.
 *
 *   FileUpload ─┐
 *   Xero ───────┼─→ RawBatch ─→ Mapping ─→ Normalização ─→ Validação ─→ Dedup
 *   OpenBanking ┘
 *
 * No M0 só existe o conector de ficheiro. Os outros estão no enum sem
 * implementação (§107) — é o que garante que cabem sem migração.
 */

export const dataSourceSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: dataSourceKindSchema,
  name: z.string(),
  capabilities: z.array(connectorCapabilitySchema),
  /**
   * Configuração não secreta: endpoint, id de empresa remota, filtros.
   * As credenciais nunca vivem aqui — vivem cifradas e nunca saem do backend.
   */
  config: z.record(z.string(), z.unknown()),
  /** Nunca `true` para o frontend saber a chave; só se ela existe. */
  hasCredentials: z.boolean(),
  lastSyncAt: isoDateTimeSchema.nullable(),
  lastSyncError: z.string().nullable(),
  createdAt: isoDateTimeSchema,
})
export type DataSource = z.infer<typeof dataSourceSchema>

/**
 * Cursor de sincronização incremental.
 *
 * Existe no M0 sem ninguém o usar porque acrescentá-lo depois obriga a
 * reprocessar histórico para descobrir onde se ficou.
 */
export const syncCursorSchema = z.object({
  /** Marca de água do fornecedor: timestamp, id sequencial ou token opaco. */
  value: z.string(),
  updatedAt: isoDateTimeSchema,
})
export type SyncCursor = z.infer<typeof syncCursorSchema>

/**
 * Estrutura descoberta na origem.
 *
 * Um ficheiro devolve folhas e colunas; uma API devolve entidades e campos. A
 * mesma forma nos dois casos é o que permite à UI de mapeamento (§27) ser uma só.
 */
export const discoveredFieldSchema = z.object({
  name: z.string(),
  /** Tipo inferido da amostra, não declarado. Excel mente sobre tipos. */
  inferredType: z.enum(['date', 'number', 'string', 'boolean', 'empty', 'mixed']),
  /** Primeiras linhas, para o utilizador reconhecer a coluna ao mapear. */
  sampleValues: z.array(z.string()),
  nullRatio: z.number().min(0).max(1),
})
export type DiscoveredField = z.infer<typeof discoveredFieldSchema>

export const discoveredEntitySchema = z.object({
  /** Nome da folha, tabela ou entidade remota. */
  name: z.string(),
  rowCount: z.number().int().nonnegative(),
  fields: z.array(discoveredFieldSchema),
  /**
   * Sinalizado quando as colunas parecem folha de salários.
   *
   * É o ficheiro com salário associado a pessoa identificada — dado pessoal de
   * terceiros e a razão nº1 para um CFO não carregar nada. Detectar permite
   * oferecer pseudonimização antes de persistir, em vez de descobrir depois.
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
 * Configuração de provider de IA por organização (§12 BYOK).
 *
 * A chave nunca é devolvida — só a máscara (`sk-…4f2a`), que chega para o
 * utilizador reconhecer qual configurou.
 *
 * `retentionPolicy` existe porque alguns providers treinam com dados da API
 * consoante o tier, e uma chave mal escolhida põe dados financeiros de cliente
 * num corpus de treino, o que não se desfaz. A UI sinaliza antes do uso.
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
  /** Falso quando o endpoint sai da máquina ou da região do cliente. */
  dataStaysLocal: z.boolean(),
  isActive: z.boolean(),
  createdAt: isoDateTimeSchema,
})
export type AIProviderConfig = z.infer<typeof aiProviderConfigSchema>

export const upsertAIProviderConfigInputSchema = z.object({
  kind: z.string(),
  model: z.string().min(1),
  baseUrl: z.string().url().nullable().optional(),
  /** Só na escrita. Nunca volta numa leitura. */
  apiKey: z.string().min(1).nullable().optional(),
  embeddingModel: z.string().nullable().optional(),
  retentionPolicy: aiRetentionPolicySchema.optional(),
})
export type UpsertAIProviderConfigInput = z.infer<typeof upsertAIProviderConfigInputSchema>
