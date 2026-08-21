import { z } from 'zod'
import {
  currencySchema,
  deltaSchema,
  idSchema,
  isoDateTimeSchema,
  periodSchema,
} from './api.js'

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
  /*
   * Commercial (§M8, T24).
   *
   * The pipeline was built as its own module with a good seam to the financial
   * side at conversion, and **none of it was a node of this graph**. The
   * consequence was not cosmetic: an area is not a separate graph, it is a set
   * of target metrics whose graph is `requiredFor(targets)` — so with nothing
   * commercial in here, sales and marketing objectives had nothing to attach
   * to.
   *
   * Two graphs would have been the worse answer: two definitions of revenue
   * that one day disagree. Cuts share the edges, and it is that sharing the
   * arbiter walks to return a trade-off.
   */
  'PIPELINE_OPEN',
  'PIPELINE_WEIGHTED',
  'DEALS_WON',
  'DEALS_LOST',
  'WIN_RATE',
  /*
   * Inventory (§107, T38).
   *
   * The module that exists to prove the entitlement seam, and that earns its
   * place: a shop that does not know which product makes money is the same
   * blindness `product` was added to remove, one level down.
   *
   * Stock **value** and days of inventory are absent, and deliberately: a stock
   * level is a position, a position needs a file the ingestion does not accept,
   * and declaring a node nothing can feed is a metric that is permanently a
   * dash.
   */
  'UNITS_SOLD',
  /*
   * Revenue on the rows that declared a quantity.
   *
   * It exists to make `MARGIN_PER_UNIT` refuse when it cannot be trusted. A
   * business that records units on some lines and not others has a gross profit
   * covering everything and a unit count covering a fraction — and dividing one
   * by the other gave, on the demonstration data, a margin of €21 352 per
   * bicycle. Plausible arithmetic, meaningless number.
   */
  'QUANTIFIED_REVENUE',
  'MARGIN_PER_UNIT',
  /*
   * Marketing (§34, T32).
   *
   * `ACQUISITION_SPEND` is a leaf and it is **declared**, not inferred: it sums
   * the expenses in the categories a human marked as acquisition cost. Deriving
   * it from category names would put a number a founder quotes to an investor
   * on top of a string match.
   *
   * `NEW_CUSTOMERS` counts whoever invoiced for the **first time ever**, not
   * for the first time this year. A customer who comes back after a quiet
   * quarter was not acquired again, and counting them would make the cost of
   * acquisition fall every time somebody returned.
   */
  'ACQUISITION_SPEND',
  'NEW_CUSTOMERS',
  'CAC',
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
export const METRIC_UNITS = [
  'MONEY',
  'PERCENT',
  'MONTHS',
  'RATIO',
  'COUNT',
  /*
   * Physical units, added by the inventory module (§107, T38).
   *
   * `QUANTITY` is things — units sold, units in stock. It differs from `COUNT`
   * on purpose: a count is how many rows, a quantity is how many items, and a
   * file with one line for two hundred screws means one of each.
   *
   * `DAYS` is duration at the resolution stock is measured in. `MONTHS` is the
   * wrong grain for it — "48 days of inventory" is a decision and "1.6 months"
   * is a shrug.
   *
   * **`DAYS` is declared and not yet used**, the same way `DATA_SOURCE_KINDS`
   * carries fifteen connectors with one implemented. Days of inventory needs a
   * stock **position**, and a position needs a file the ingestion does not
   * accept — so the node that would use it is not built. Being in the enum is
   * what guarantees the formatter and the graph accommodate it the day it is,
   * and `formatByUnit` already handles it.
   */
  'QUANTITY',
  'DAYS',
] as const
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

/**
 * What kind of business this is, derived from the data (§34, T21).
 *
 * ## Why the signals travel with the archetype
 *
 * Because "recurring" on its own is an opinion with a label. The measurements
 * behind it — 68% of revenue from customers billed in three of the last four
 * months, at similar amounts — are what make it a derivation somebody can
 * check, and checking is the whole product.
 *
 * ## Why `UNDETERMINED` is in the enum
 *
 * Four months of history do not distinguish project work from seasonal retail
 * having a quiet spring. Declaring anyway would put a guess where every
 * threshold downstream reads a fact. The reason travels too, because "we cannot
 * tell yet" and "we cannot tell from this" send a person to different places.
 */
export const archetypeSchema = z.enum([
  'RECURRING',
  'PROJECT',
  'RETAIL',
  'INDUSTRY',
  'UNDETERMINED',
])
export type Archetype = z.infer<typeof archetypeSchema>

export const profileSignalIdSchema = z.enum([
  'recurrence',
  'churn',
  'concentration',
  'customerCount',
  'ticketSpread',
  'costStructure',
  'dso',
  'seasonality',
])
export type ProfileSignalId = z.infer<typeof profileSignalIdSchema>

export const profileSignalSchema = z.object({
  id: profileSignalIdSchema,
  /** `null` when the data cannot answer. Never zero standing in for unknown. */
  value: z.number().nullable(),
  /** The numbers this was measured from, so the claim can be checked. */
  detail: z.record(z.string(), z.number()),
})
export type ProfileSignal = z.infer<typeof profileSignalSchema>

/**
 * Who this company sells to (§34, T35).
 *
 * Derived and not configured: a settings field is a field that is wrong for
 * everybody who skipped the onboarding, and the signals that answer it are
 * already measured.
 *
 * It changes which conclusions are meaningful. A concentration alert on a shop
 * with forty thousand buyers is not a false positive to be tuned away — it is a
 * question that does not apply, and the second time somebody sees one they stop
 * reading the alerts.
 */
export const businessTypeSchema = z.enum(['B2B', 'B2C', 'MIXED', 'UNDETERMINED'])
export type BusinessType = z.infer<typeof businessTypeSchema>

export const businessProfileSchema = z.object({
  archetype: archetypeSchema,
  businessType: businessTypeSchema,
  /** Every signal, including the ones that came back `null`. */
  signals: z.array(profileSignalSchema),
  /** The signals that carried the decision. Empty when nothing was declared. */
  because: z.array(profileSignalIdSchema),
  undeterminedReason: z
    .enum(['NOT_ENOUGH_HISTORY', 'NO_CUSTOMERS', 'TOO_CLOSE_TO_CALL'])
    .nullable(),
  period: periodSchema,
  datasetVersion: z.number().int(),
})
export type BusinessProfile = z.infer<typeof businessProfileSchema>

/**
 * The Business Model Canvas, half derived and half declared (§34, T26).
 *
 * ## Why the halves are marked, and never mixed
 *
 * Four blocks come out of the transactions — partners from suppliers, segments
 * from customer concentration, cost structure from the COGS/OPEX split, revenue
 * streams from recurrence and mix. Five do not, and never will: value
 * proposition, key activities, key resources, customer relationships, channels.
 *
 * Filling those five with a model would be invention on the first screen a
 * customer sees, and it would contradict the one rule this product sells. They
 * arrive **empty**, and `kind` is what stops a screen from ever drawing the two
 * halves the same way — the reader has to be able to tell "we measured this"
 * from "somebody wrote this" without being told.
 *
 * ## Why empty is the feature
 *
 * An empty block is an invitation to declare what only this person knows, and
 * what they write there becomes the input to objectives by area. Onboarding
 * stops being "ingest a file" and starts producing strategic context.
 */
export const CANVAS_BLOCKS = [
  // Derived — computed on read, never stored, so they cannot drift from the
  // numbers they came from.
  'partners',
  'segments',
  'costStructure',
  'revenueStreams',
  // Declared — not in the data, and not for a model to guess.
  'valueProposition',
  'keyActivities',
  'keyResources',
  'customerRelationships',
  'channels',
] as const
export const canvasBlockIdSchema = z.enum(CANVAS_BLOCKS)
export type CanvasBlockId = z.infer<typeof canvasBlockIdSchema>

/** One measured line inside a derived block: what it is, and what it is worth. */
export const canvasEvidenceSchema = z.object({
  label: z.string(),
  /** Cents when the block is about money, a plain number otherwise. */
  value: z.number(),
  /** Share of the block's total, 0–100. `null` when a share means nothing here. */
  share: z.number().nullable(),
})
export type CanvasEvidence = z.infer<typeof canvasEvidenceSchema>

export const canvasBlockSchema = z.discriminatedUnion('kind', [
  z.object({
    kind: z.literal('DERIVED'),
    id: canvasBlockIdSchema,
    /** The signal that supports it. Empty when the data has nothing to say yet. */
    evidence: z.array(canvasEvidenceSchema),
    /** `MONEY` when the values are cents, `COUNT` when they are things. */
    unit: z.enum(['MONEY', 'COUNT', 'PERCENT']),
  }),
  z.object({
    kind: z.literal('DECLARED'),
    id: canvasBlockIdSchema,
    /** `null` means nobody has written it. Never a placeholder sentence. */
    content: z.string().nullable(),
    authorName: z.string().nullable(),
    updatedAt: isoDateTimeSchema.nullable(),
  }),
])
export type CanvasBlock = z.infer<typeof canvasBlockSchema>

export const businessCanvasSchema = z.object({
  blocks: z.array(canvasBlockSchema),
  period: periodSchema,
  currency: currencySchema,
  datasetVersion: z.number().int(),
})
export type BusinessCanvas = z.infer<typeof businessCanvasSchema>

/** Writing one of the five declared blocks. */
export const declareCanvasBlockSchema = z.object({
  block: z.enum(['valueProposition', 'keyActivities', 'keyResources', 'customerRelationships', 'channels']),
  /**
   * Bounded, and deliberately short.
   *
   * A canvas block is a sentence, not a document. Six hundred characters is
   * about a paragraph — enough to say what the business does and too little to
   * turn the box into a place where strategy goes to be forgotten.
   */
  content: z.string().trim().min(1).max(600),
})
export type DeclareCanvasBlock = z.infer<typeof declareCanvasBlockSchema>

/**
 * The opinions one organization is judged by (§36, T22).
 *
 * ## Why both sets travel, and not only the effective one
 *
 * So the screen can say **what was inherited and what was chosen**. A settings
 * page whose numbers have no provenance is one nobody trusts — and the same
 * reasoning that makes an insight carry its evidence makes a threshold carry
 * where it came from.
 *
 * ## Why the limits are sent rather than hard-coded in the client
 *
 * They are the engine's opinion about what a sane threshold is, and a second
 * copy in the frontend would disagree the first time one moved. The client
 * renders the range it was given; the server refuses anything outside it.
 */
export const thresholdSetSchema = z.object({
  revenueMinimumFall: z.number(),
  expenseMinimumRise: z.number(),
  expenseMinimumShare: z.number(),
  marginMinimumFall: z.number(),
  customerMinimumShare: z.number(),
  customerMinimumExcess: z.number(),
  minimumConcentration: z.number(),
  budgetMinimumOverrun: z.number(),
  budgetMinimumShare: z.number(),
  runwayAlertMonths: z.number(),
  cashFallingMonths: z.number(),
})
export type ThresholdSet = z.infer<typeof thresholdSetSchema>

export const effectiveThresholdsSchema = z.object({
  archetype: archetypeSchema,
  /** What the engine will actually judge with. */
  effective: thresholdSetSchema,
  /** What this organization would be judged with if it declared nothing. */
  inherited: thresholdSetSchema,
  /** The fields deliberately moved, so the screen can mark them. */
  overridden: z.array(z.string()),
  /** `[min, max]` per field. The client renders it; the server enforces it. */
  limits: z.record(z.string(), z.tuple([z.number(), z.number()])),
  /**
   * The fingerprint this organization's insights carry.
   *
   * On the wire because it is the honest answer to *"are my alerts comparable
   * to the defaults?"* — and because a screen that changes thresholds should be
   * able to show that the change took effect.
   */
  version: z.string(),
  declaredBy: z.string().nullable(),
  declaredAt: isoDateTimeSchema.nullable(),
})
export type EffectiveThresholds = z.infer<typeof effectiveThresholdsSchema>

/**
 * Declaring thresholds, or importing a set.
 *
 * Replaces rather than merges: with a merge there is no gesture for "forget
 * what I said", and a field once moved could never go back to the published
 * opinion. An empty object is how an organization returns to inheriting
 * everything.
 */
export const declareThresholdsSchema = z.object({
  overrides: z.record(z.string(), z.number()),
})
export type DeclareThresholds = z.infer<typeof declareThresholdsSchema>
