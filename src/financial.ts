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
 * Núcleo financeiro.
 *
 * Decisão de modelação: **uma tabela `Transaction` como facto único**, com
 * discriminador `type` e `customerId`/`supplierId` opcionais — em vez de tabelas
 * separadas para receita e despesa.
 *
 * Com tabelas separadas, cada métrica precisaria de duas queries e dois
 * conjuntos de índices, e o drill-down teria dois caminhos diferentes para o
 * mesmo gesto do utilizador. `Revenue` e `Expense` continuam a existir como
 * conceitos de domínio; só não são tabelas.
 */

// ---------------------------------------------------------------------------
// Linhagem — o que torna a promessa "podes conferir tudo" verificável
// ---------------------------------------------------------------------------

/**
 * De onde veio esta linha, exactamente.
 *
 * É o que permite ir de "a margem caiu 3,2pp" até "estas 47 linhas, do ficheiro
 * despesas_julho.xlsx, folha Marketing, linhas 142–189". Sem isto guardado no
 * momento da ingestão, não há como reconstruir depois.
 */
export const lineageRefSchema = z.object({
  importId: idSchema,
  fileName: z.string(),
  sheetName: z.string().nullable(),
  /** Número da linha no ficheiro original, tal como o utilizador a vê no Excel. */
  rowNumber: z.number().int().positive().nullable(),
})
export type LineageRef = z.infer<typeof lineageRefSchema>

// ---------------------------------------------------------------------------
// Entidades
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
  /** Enriquecimento comercial (M8). Nulo enquanto ninguém preencher. */
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
  /** Hierarquia rasa: uma categoria pode ter pai, o pai não tem avô. */
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
// Consultas
// ---------------------------------------------------------------------------

export const transactionFilterSchema = paginationQuerySchema.extend({
  type: transactionTypeSchema.optional(),
  from: isoDateSchema.optional(),
  to: isoDateSchema.optional(),
  customerId: idSchema.optional(),
  supplierId: idSchema.optional(),
  categoryId: idSchema.optional(),
  importId: idSchema.optional(),
  /** Pesquisa por descrição, cliente, fornecedor ou número de factura. */
  search: z.string().max(200).optional(),
  minAmountCents: z.coerce.number().int().optional(),
  maxAmountCents: z.coerce.number().int().optional(),
  sortBy: z.enum(['date', 'amount', 'description']).default('date'),
  sortDir: z.enum(['asc', 'desc']).default('desc'),
})
export type TransactionFilter = z.infer<typeof transactionFilterSchema>

/** Agregado por dimensão — clientes, categorias, fornecedores. */
export const breakdownItemSchema = z.object({
  id: idSchema.nullable(),
  label: z.string(),
  amount: moneySchema,
  /** Peso no total do período, 0–100. */
  sharePercent: z.number(),
  /** Variação face ao período anterior; nulo quando não havia base. */
  changePercent: z.number().nullable(),
  transactionCount: z.number().int().nonnegative(),
})
export type BreakdownItem = z.infer<typeof breakdownItemSchema>

/** Ponto de uma série temporal, para os gráficos do §66. */
export const timeSeriesPointSchema = z.object({
  period: periodSchema,
  revenue: z.number().int(),
  expenses: z.number().int(),
  grossProfit: z.number().int(),
  currency: currencySchema,
})
export type TimeSeriesPoint = z.infer<typeof timeSeriesPointSchema>
