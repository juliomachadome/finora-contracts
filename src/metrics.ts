import { z } from 'zod'
import { currencySchema, deltaSchema, idSchema, periodSchema } from './api.js'

/**
 * Metrics as a directed acyclic graph.
 *
 * One metric depends on others: `EBITDA` depends on `GROSS_PROFIT` and `OPEX`;
 * `GROSS_MARGIN` depends on `GROSS_PROFIT` and `REVENUE`. Modelling that as a
 * graph instead of loose functions solves four things at once:
 *
 *   1. the order of calculation stops being the responsibility of whoever writes
 *      the metric;
 *   2. only the leaves touch the database — everything else is a pure function,
 *      and is tested without Postgres, which is what makes the regression of §87
 *      practicable;
 *   3. variance attribution (§24) comes for free: to know why profit fell, you
 *      walk down the graph attributing the delta to each child;
 *   4. the cache invalidates by construction, because the key includes the
 *      dataset version.
 *
 * Not to be confused with the evidence graph (`evidence.ts`): this one links
 * metric to metric and lives in code; that one links metric to transactions and
 * to file rows, and is built by query. They touch at the leaves.
 */

export const METRIC_IDS = [
  // Leaves — the only ones that query the database directly
  'REVENUE',
  'EXPENSES',
  'COGS',
  'OPEX',
  'CASH',
  'ACCOUNTS_RECEIVABLE',
  'ACCOUNTS_PAYABLE',
  'BUDGETED_EXPENSES',
  // Derived — pure functions of their dependencies
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
 * Unit of the value.
 *
 * Exists so that formatting does not have to guess: 42 can be €42, 42% or 42
 * months, and an `Intl.NumberFormat` with the wrong unit produces a plausible
 * and false number — the worst kind in a financial report.
 */
export const METRIC_UNITS = ['MONEY', 'PERCENT', 'MONTHS', 'RATIO', 'COUNT'] as const
export const metricUnitSchema = z.enum(METRIC_UNITS)
export type MetricUnit = z.infer<typeof metricUnitSchema>

/**
 * Declaration of a node, without the calculation function.
 *
 * The implementation lives in the backend; this is what the frontend needs to
 * know to draw the graph and explain where each number comes from.
 */
export const metricNodeSpecSchema = z.object({
  id: metricIdSchema,
  unit: metricUnitSchema,
  dependsOn: z.array(metricIdSchema),
  /** True when the node aggregates transactions instead of deriving from other nodes. */
  isLeaf: z.boolean(),
  /** Readable formula, e.g. `GROSS_PROFIT - OPEX`. Shown in the evidence panel. */
  formula: z.string().nullable(),
})
export type MetricNodeSpec = z.infer<typeof metricNodeSpecSchema>

export const metricValueSchema = z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  unit: metricUnitSchema,
  /**
   * Cents when MONEY; a plain number in the other units.
   *
   * **`null` means "not calculable", and not zero.** A margin without revenue, a
   * runway without burn or a growth without a previous period are not worth zero
   * — they have no basis to exist.
   *
   * The distinction is not fussiness: showing "0.0 months" of runway to a CFO
   * whose month was profitable is asserting a false fact about their business.
   * The UI shows a dash.
   */
  value: z.number().nullable(),
  currency: currencySchema.nullable(),
  /** Null when there is no previous period to compare with. */
  delta: deltaSchema.nullable(),
  /**
   * Version of the dataset that produced this value.
   *
   * It goes everywhere because a report has to be reproducible (§46): without
   * it, reprinting the July report after correcting a file gives another number
   * and nobody knows which one was right.
   */
  datasetVersion: z.number().int(),
})
export type MetricValue = z.infer<typeof metricValueSchema>

/**
 * One branch of the explanation of a variation.
 *
 * `contributionPercent` is this child's slice of the parent's delta — it is what
 * makes it possible to say "two customers explain 72% of the drop" instead of
 * listing twenty rows with no hierarchy.
 */
export const varianceContributionSchema = z.object({
  label: z.string(),
  /** Present when the branch is a metric; absent when it is a dimension. */
  metricId: metricIdSchema.nullable(),
  /** Present when the branch is a customer, category or supplier. */
  entityId: idSchema.nullable(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  contributionPercent: z.number(),
})
export type VarianceContribution = z.infer<typeof varianceContributionSchema>

/**
 * Variance attribution tree (§24).
 *
 * Recursive, because the question "why?" repeats: profit fell because of
 * expenses, expenses because of marketing, marketing because of three invoices.
 * Each node is clickable all the way to the row of the file.
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
  /** Omitted uses the immediately previous period. */
  comparePeriod: periodSchema.optional(),
  metrics: z.array(metricIdSchema).optional(),
})
export type MetricQuery = z.infer<typeof metricQuerySchema>

/**
 * The sections the Overview can have, and the shape the business gives it.
 *
 * The composition is derived from the data, not generated: with no budget
 * uploaded there is no variance to show, and a customer worth 40% of the revenue
 * moves up to first. `reasons` carries the why — it is what stops a panel that
 * changes shape from reading as instability.
 *
 * `TREASURY` rather than `CASH`, which would have been the literal translation:
 * `CASH` is already a `MetricId`, and the composer pushes onto both arrays a few
 * lines apart. One word meaning two things there is a typo the compiler accepts.
 */
export const OVERVIEW_SECTIONS = [
  'METRICS',
  'WHAT_CHANGED',
  'ALERTS',
  'TRENDS',
  'CUSTOMERS',
  'CATEGORIES',
  'BUDGET',
  'TREASURY',
] as const
export const overviewSectionSchema = z.enum(OVERVIEW_SECTIONS)
export type OverviewSection = z.infer<typeof overviewSectionSchema>

export const overviewShapeSchema = z.object({
  metrics: z.array(metricIdSchema),
  sections: z.array(overviewSectionSchema),
  reasons: z.array(z.string()),
})
export type OverviewShape = z.infer<typeof overviewShapeSchema>

/** Overview response, in a single request so the dashboard does not make ten. */
export const dashboardSummarySchema = z.object({
  period: periodSchema,
  comparePeriod: periodSchema,
  currency: currencySchema,
  datasetVersion: z.number().int(),
  metrics: z.array(metricValueSchema),
  /** Optional so a response without a composed shape stays valid: the panel then uses the fixed order. */
  shape: overviewShapeSchema.optional(),
})
export type DashboardSummary = z.infer<typeof dashboardSummarySchema>
