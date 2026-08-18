import { z } from 'zod'
import { currencySchema, idSchema, isoDateTimeSchema, periodSchema } from './api.js'
import { forecastScenarioSchema, scenarioTypeSchema } from './enums.js'
import { assumptionSchema } from './ai.js'
import { metricIdSchema } from './metrics.js'

/**
 * Scenarios and forecast (§39, §40).
 *
 * The calculation is deterministic and runs over the same metrics graph:
 * changing an assumption changes a node, and the change propagates through the
 * dependencies. The AI explains the result; it does not produce it.
 *
 * That is what allows the same question to always give the same answer — an
 * obvious requirement for whoever is going to take the number to a board, and
 * one a generative model on its own does not guarantee.
 */

export const scenarioInputSchema = z.object({
  type: scenarioTypeSchema,
  name: z.string().min(1).max(160),
  basePeriod: periodSchema,
  /** Months to project from the base period. */
  horizonMonths: z.number().int().min(1).max(36).default(12),
  /**
   * Parameters of the change, according to the type:
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
  /** Written by the AI from the already calculated impacts (M7). */
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
 * Forecast with the three scenarios of §40.
 *
 * `assumptions` is never optional: a forecast without assumptions in sight is a
 * number with the air of certainty, and §40 requires showing them.
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
