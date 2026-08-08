import { z } from 'zod'
import { currencySchema, idSchema, isoDateTimeSchema, periodSchema } from './api.js'
import { forecastScenarioSchema, scenarioTypeSchema } from './enums.js'
import { assumptionSchema } from './ai.js'
import { metricIdSchema } from './metrics.js'

/**
 * Cenários e previsão (§39, §40).
 *
 * O cálculo é determinístico e corre sobre o mesmo grafo de métricas: mudar um
 * pressuposto muda um nó, e a mudança propaga-se pelas dependências. A IA
 * explica o resultado; não o produz.
 *
 * É isso que permite a mesma pergunta dar sempre a mesma resposta — requisito
 * óbvio para quem vai levar o número a um conselho, e que um modelo generativo
 * sozinho não garante.
 */

export const scenarioInputSchema = z.object({
  type: scenarioTypeSchema,
  name: z.string().min(1).max(160),
  basePeriod: periodSchema,
  /** Meses a projectar a partir do período base. */
  horizonMonths: z.number().int().min(1).max(36).default(12),
  /**
   * Parâmetros da alteração, conforme o tipo:
   *
   *   REVENUE_CHANGE   { percent: -10 }
   *   EXPENSE_CHANGE   { categoryId, percent: 20 }
   *   HIRING           { headcount: 3, monthlyCostCents: 350000 }
   *   CUSTOMER_LOSS    { customerId }
   *   PRICE_CHANGE     { percent: 5 }
   */
  parameters: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
})
export type ScenarioInput = z.infer<typeof scenarioInputSchema>

export const scenarioImpactSchema = z.object({
  metricId: metricIdSchema,
  baseline: z.number(),
  projected: z.number(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
})
export type ScenarioImpact = z.infer<typeof scenarioImpactSchema>

export const scenarioResultSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  type: scenarioTypeSchema,
  basePeriod: periodSchema,
  currency: currencySchema,
  impacts: z.array(scenarioImpactSchema),
  assumptions: z.array(assumptionSchema),
  /** Redigida pela IA a partir dos impactos já calculados (M7). */
  explanation: z.string().nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema,
})
export type ScenarioResult = z.infer<typeof scenarioResultSchema>

export const forecastPointSchema = z.object({
  period: periodSchema,
  scenario: forecastScenarioSchema,
  revenue: z.number().int(),
  expenses: z.number().int(),
  grossProfit: z.number().int(),
  cash: z.number().int().nullable(),
})
export type ForecastPoint = z.infer<typeof forecastPointSchema>

/**
 * Previsão com os três cenários do §40.
 *
 * `assumptions` nunca é opcional: uma previsão sem pressupostos à vista é um
 * número com ar de certeza, e o §40 obriga a mostrá-los.
 */
export const forecastSchema = z.object({
  organizationId: idSchema,
  generatedFrom: periodSchema,
  horizonMonths: z.number().int(),
  currency: currencySchema,
  points: z.array(forecastPointSchema),
  assumptions: z.array(assumptionSchema),
  datasetVersion: z.number().int(),
})
export type Forecast = z.infer<typeof forecastSchema>
