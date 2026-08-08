import { z } from 'zod'
import { currencySchema, deltaSchema, idSchema, periodSchema } from './api.js'

/**
 * Métricas como grafo dirigido acíclico.
 *
 * Uma métrica depende de outras: `EBITDA` depende de `GROSS_PROFIT` e `OPEX`;
 * `GROSS_MARGIN` depende de `GROSS_PROFIT` e `REVENUE`. Modelar isso como grafo
 * em vez de funções soltas resolve quatro coisas de uma vez:
 *
 *   1. a ordem de cálculo deixa de ser responsabilidade de quem escreve a métrica;
 *   2. só as folhas tocam na base — todo o resto é função pura, e testa-se sem
 *      Postgres, que é o que torna a regressão do §87 praticável;
 *   3. a atribuição de variância (§24) sai de graça: para saber por que caiu o
 *      lucro, desce-se o grafo atribuindo o delta a cada filho;
 *   4. o cache invalida-se por construção, porque a chave inclui a versão do
 *      dataset.
 *
 * Não confundir com o grafo de evidência (`evidence.ts`): este liga métrica a
 * métrica e vive em código; aquele liga métrica a transacções e a linhas de
 * ficheiro, e é construído por consulta. Tocam-se nas folhas.
 */

export const METRIC_IDS = [
  // Folhas — as únicas que consultam a base directamente
  'REVENUE',
  'EXPENSES',
  'COGS',
  'OPEX',
  'CASH',
  'ACCOUNTS_RECEIVABLE',
  'ACCOUNTS_PAYABLE',
  'BUDGETED_EXPENSES',
  // Derivadas — funções puras das suas dependências
  'GROSS_PROFIT',
  'GROSS_MARGIN',
  'OPERATING_PROFIT',
  'EBITDA',
  'EBITDA_MARGIN',
  'REVENUE_GROWTH',
  'EXPENSE_GROWTH',
  'CUSTOMER_CONCENTRATION',
  'BURN',
  'RUNWAY',
  'BUDGET_VARIANCE',
] as const
export const metricIdSchema = z.enum(METRIC_IDS)
export type MetricId = z.infer<typeof metricIdSchema>

/**
 * Unidade do valor.
 *
 * Existe para a formatação não adivinhar: 42 pode ser 42 €, 42% ou 42 meses, e
 * um `Intl.NumberFormat` com a unidade errada produz um número plausível e
 * falso — a pior espécie num relatório financeiro.
 */
export const METRIC_UNITS = ['MONEY', 'PERCENT', 'MONTHS', 'RATIO', 'COUNT'] as const
export const metricUnitSchema = z.enum(METRIC_UNITS)
export type MetricUnit = z.infer<typeof metricUnitSchema>

/**
 * Declaração de um nó, sem a função de cálculo.
 *
 * A implementação vive no backend; isto é o que o frontend precisa de saber para
 * desenhar o grafo e explicar de onde vem cada número.
 */
export const metricNodeSpecSchema = z.object({
  id: metricIdSchema,
  unit: metricUnitSchema,
  dependsOn: z.array(metricIdSchema),
  /** Verdadeiro quando o nó agrega transacções em vez de derivar de outros nós. */
  isLeaf: z.boolean(),
  /** Fórmula legível, ex. `GROSS_PROFIT - OPEX`. Mostrada no painel de evidência. */
  formula: z.string().nullable(),
})
export type MetricNodeSpec = z.infer<typeof metricNodeSpecSchema>

export const metricValueSchema = z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  unit: metricUnitSchema,
  /** Cêntimos quando MONEY; número simples nas outras unidades. */
  value: z.number(),
  currency: currencySchema.nullable(),
  /** Nulo quando não há período anterior com que comparar. */
  delta: deltaSchema.nullable(),
  /**
   * Versão do dataset que produziu este valor.
   *
   * Vai em todo o lado porque um relatório tem de ser reproduzível (§46): sem
   * ela, reimprimir o relatório de Julho depois de corrigir um ficheiro dá outro
   * número e ninguém sabe qual estava certo.
   */
  datasetVersion: z.number().int(),
})
export type MetricValue = z.infer<typeof metricValueSchema>

/**
 * Um ramo da explicação de uma variação.
 *
 * `contributionPercent` é a fatia deste filho no delta do pai — é o que permite
 * dizer "dois clientes explicam 72% da queda" em vez de listar vinte linhas sem
 * hierarquia.
 */
export const varianceContributionSchema = z.object({
  label: z.string(),
  /** Presente quando o ramo é uma métrica; ausente quando é uma dimensão. */
  metricId: metricIdSchema.nullable(),
  /** Presente quando o ramo é um cliente, categoria ou fornecedor. */
  entityId: idSchema.nullable(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  contributionPercent: z.number(),
})
export type VarianceContribution = z.infer<typeof varianceContributionSchema>

/**
 * Árvore de atribuição de variância (§24).
 *
 * Recursiva, porque a pergunta "porquê?" repete-se: o lucro caiu por causa das
 * despesas, as despesas por causa do marketing, o marketing por causa de três
 * facturas. Cada nó é clicável até chegar à linha do ficheiro.
 */
export interface VarianceTree {
  label: string
  metricId: MetricId | null
  entityId: string | null
  changeAbsolute: number
  changePercent: number | null
  contributionPercent: number
  children: VarianceTree[]
}

export const varianceTreeSchema: z.ZodType<VarianceTree> = z.lazy(() =>
  varianceContributionSchema.extend({
    children: z.array(varianceTreeSchema),
  }),
)

export const metricQuerySchema = z.object({
  period: periodSchema,
  /** Omitido usa o período anterior imediato. */
  comparePeriod: periodSchema.optional(),
  metrics: z.array(metricIdSchema).optional(),
})
export type MetricQuery = z.infer<typeof metricQuerySchema>

/** Resposta do Overview, num só pedido para o dashboard não fazer dez. */
export const dashboardSummarySchema = z.object({
  period: periodSchema,
  comparePeriod: periodSchema,
  currency: currencySchema,
  datasetVersion: z.number().int(),
  metrics: z.array(metricValueSchema),
})
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>
