import { z } from 'zod'
import { idSchema, moneySchema, periodSchema } from './api.js'
import { lineageRefSchema } from './financial.js'
import { metricIdSchema } from './metrics.js'

/**
 * Evidência — a peça que sustenta a promessa do produto.
 *
 * Todas as ferramentas de IA financeira dão uma resposta. Esta deixa verificá-la.
 * O caminho tem de ser sempre percorrível:
 *
 *   conclusão → cálculo → métrica → entidade → transacção → ficheiro → linha
 *
 * Sem isto, o produto é indistinguível de um LLM com um Excel — e o utilizador
 * não tem como apanhar o erro, que é exactamente o valor que se vende.
 */

/**
 * Como um número foi obtido.
 *
 * `inputs` são os valores que entraram, `formula` é o que se fez com eles.
 * Mostrado no painel de evidência para o utilizador refazer a conta de cabeça se
 * quiser — e é isso que constrói confiança, não a promessa de que está certo.
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

/** Transacção citada como prova, com a linha original de onde saiu. */
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
 * Pacote de evidência de uma afirmação.
 *
 * `transactionCount` e `sampleTransactions` existem separados de propósito: uma
 * afirmação pode assentar em milhares de linhas, e devolvê-las todas seria
 * inútil para o utilizador e caro para a base. Mostra-se a contagem real e uma
 * amostra, com caminho para ver o resto no explorador.
 */
export const evidenceSchema = z.object({
  id: idSchema,
  claim: z.string(),
  calculations: z.array(calculationSchema),
  transactionCount: z.number().int().nonnegative(),
  sampleTransactions: z.array(evidenceTransactionSchema),
  /** Ficheiros que contribuíram, para o utilizador reconhecer a origem. */
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
