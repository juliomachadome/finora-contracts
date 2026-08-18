import { z } from 'zod'
import { idSchema, isoDateTimeSchema, periodSchema } from './api.js'
import { insightTypeSchema, severitySchema } from './enums.js'
import { evidenceSchema } from './evidence.js'
import { metricIdSchema } from './metrics.js'

/**
 * Insights — what the system says before being asked (§36, §115).
 *
 * The difference between a dashboard and this product is here: the dashboard
 * waits for the user to discover; this one opens straight away with "there are
 * three things you should know".
 *
 * Each insight is born of a deterministic detector over calculated metrics,
 * never of a model giving an opinion. The AI, when it arrives in M7, writes — it
 * does not decide what is anomalous.
 */

/**
 * **Translation key and parameters, never ready-made text.**
 *
 * v0.3.0 described `title` and `description` as text "already translated in the
 * locale of the request", and was wrong about what the product does. Translating
 * on the server forced it to have its own catalogue in four languages, with its
 * own parity gate — a second copy of the i18n infrastructure, and the guarantee
 * that the two would diverge. Worse: the wording would come to live in two
 * places.
 *
 * Underneath this there is a separation that is worth it on its own: **deciding
 * what is anomalous and deciding how it is said are different jobs**. The first
 * is deterministic and is tested with numbers; the second is editorial and is
 * reviewed by reading. Separated, the detector is tested without a single word
 * of Portuguese in the middle.
 *
 * The deviation from §37 is recorded in `docs/ARCHITECTURE.md`.
 */
export const insightSchema = z.object({
  id: idSchema,
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** E.g.: `insights.REVENUE_DECLINE.title`. Resolved against `messages/`. */
  titleKey: z.string(),
  /**
   * The same statement has different wordings depending on what is known — with
   * or without the customers that explain the drop, with or without the
   * comparison against the portfolio. It is the detector that chooses, because
   * it is the one that knows what it found.
   */
  descriptionKey: z.string(),
  /**
   * Values for ICU. A list of names travels as an **array**, never as an
   * already-joined string: the list separator changes with the language, and
   * joining it on the server would be writing Portuguese. What joins it is
   * `Intl.ListFormat`.
   */
  params: z.record(z.string(), z.union([z.string(), z.number(), z.array(z.string())])),
  metricId: metricIdSchema.nullable(),
  /**
   * The entity the statement refers to — the customer that dropped, the line
   * item that blew up. Together with `metricId` and `period`, it is the address
   * of the proof **and** the destination of the click: the two have to be the
   * same thing, otherwise the panel shows different rows from the ones the click
   * opens.
   */
  entityId: idSchema.nullable(),
  dimension: z.enum(['customer', 'supplier', 'category']).nullable(),
  /** Numbers that support the statement, for the UI to show without recalculating. */
  supportingData: z.record(z.string(), z.number()),
  evidence: evidenceSchema.nullable(),
  /** Dismissed by the user: does not appear again for the same period. */
  dismissedAt: isoDateTimeSchema.nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema,
})
export type Insight = z.infer<typeof insightSchema>

/**
 * The endpoint's response, and not just the list.
 *
 * The currency comes here so the page does not have to request the dashboard
 * summary just to be able to format half a dozen values — that would be three
 * queries and a whole evaluation of the metrics graph. The dataset version comes
 * because it is what makes the list reproducible (§46): the same insights over
 * the same data.
 *
 * Note what is **not** here: `organizationId`. The tenant is implicit in the
 * session, and returning it in every object would be repeating on every row
 * something the client already knows and cannot choose.
 */
export const insightsResponseSchema = z.object({
  period: periodSchema,
  currency: z.string().length(3),
  datasetVersion: z.number().int(),
  insights: z.array(insightSchema),
})
export type InsightsResponse = z.infer<typeof insightsResponseSchema>

/**
 * Recommendation (§38).
 *
 * Separate from the insight on purpose. The insight is what happened, and it is
 * verifiable; the recommendation is what to do next, and it is opinion. Mixing
 * the two would make a debatable suggestion inherit the authority of a fact —
 * which is exactly the confusion §20 requires avoiding.
 */
export const recommendationSchema = z.object({
  id: idSchema,
  insightId: idSchema.nullable(),
  title: z.string(),
  rationale: z.string(),
  /** Always `RECOMMENDATION`, so the UI never shows it as a fact. */
  kind: z.literal('RECOMMENDATION'),
  createdAt: isoDateTimeSchema,
})
export type Recommendation = z.infer<typeof recommendationSchema>

/**
 * "What changed?" item (§35). Each row is clickable through to the evidence.
 *
 * `direction` and `sentiment` are lowercase, unlike every other enum in this
 * package. It is not carelessness: the others are **persisted** values — roles,
 * states, types —, and these are presentation vocabulary that never reaches the
 * database. Uniformizing them would force converting on both sides to gain
 * nothing.
 */
export const changeItemSchema = z.object({
  metricId: metricIdSchema,
  unit: z.string(),
  /** The value in the period, so the UI does not request the summary again. */
  current: z.number(),
  changeAbsolute: z.number(),
  /**
   * `null` for margins, and for whatever has no comparison base.
   *
   * A margin varies in **percentage points**, not in percentage: from 40% to 42%
   * is +2pp, and saying "+5%" is true about the ratio and misleading about the
   * business. The two fields exist separately so the UI does not have to guess
   * which is the right one — whichever is filled in is what is shown.
   */
  changePercent: z.number().nullable(),
  changePoints: z.number().nullable(),
  direction: z.enum(['up', 'down']),
  /** Whether going up is good or bad depends on the metric: expenses rising is no win. */
  sentiment: z.enum(['positive', 'negative']),
})
export type ChangeItem = z.infer<typeof changeItemSchema>

export const whatChangedResponseSchema = z.object({
  period: periodSchema,
  currency: z.string().length(3),
  changes: z.array(changeItemSchema),
})
export type WhatChangedResponse = z.infer<typeof whatChangedResponseSchema>

export const insightFilterSchema = z.object({
  period: periodSchema.optional(),
  type: insightTypeSchema.optional(),
  severity: severitySchema.optional(),
  /**
   * `z.coerce.boolean()` is forbidden here, and it is not a preference: Zod's
   * coercion is `Boolean(value)`, and any non-empty string is true —
   * `?includeDismissed=false` would arrive as `true`. A trap already paid for
   * once in this project.
   */
  includeDismissed: z
    .enum(['true', 'false'])
    .default('false')
    .transform((valor) => valor === 'true'),
})
export type InsightFilter = z.infer<typeof insightFilterSchema>
