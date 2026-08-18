import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'
import {
  aiProviderKindSchema,
  aiResponseTypeSchema,
  aiRetentionPolicySchema,
  aiTaskSchema,
  localeSchema,
} from './enums.js'
import { evidenceSchema, calculationSchema } from './evidence.js'

/**
 * AI layer.
 *
 * The rule that structures everything (§9): the AI **interprets**, it does not
 * calculate. It receives metrics already calculated deterministically and
 * explains them. A number that comes out of a model is never financial truth.
 *
 *   data → normalization → domain → calculation → metrics → evidence → AI → explanation
 *
 * The path `Excel → LLM → financial truth` is forbidden, and it is the
 * difference between this product and a chat with a spreadsheet.
 */

/**
 * A statement inside an answer (§20).
 *
 * `type` forces separating fact from inference. It is not cosmetic: it is what
 * lets the user know what can be taken to a meeting and what has to be confirmed
 * first. Without this separation, a plausible assumption gains the weight of an
 * audited datum.
 */
export const keyPointSchema = z.object({
  type: aiResponseTypeSchema,
  text: z.string(),
  /** Present in FACT and CALCULATION. Absent is a sign of an unsupported statement. */
  evidenceId: idSchema.nullable(),
})
export type KeyPoint = z.infer<typeof keyPointSchema>

/**
 * Assumption taken by the answer (§40).
 *
 * Every projection rests on assumptions, and hiding them is how an opinion gets
 * presented as a forecast. They stay explicit and editable.
 */
export const assumptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  /** True when it was the model assuming, not the user declaring. */
  inferred: z.boolean(),
})
export type Assumption = z.infer<typeof assumptionSchema>

export const aiRecommendationSchema = z.object({
  title: z.string(),
  rationale: z.string(),
})
export type AIRecommendation = z.infer<typeof aiRecommendationSchema>

/**
 * Answer contract (§19).
 *
 * Structured instead of free text because the UI needs to render each part
 * differently — and because a validatable contract is what allows testing that
 * the model did not stray from the format (§87, AI contract tests).
 */
export const aiAnswerSchema = z.object({
  answer: z.string(),
  keyPoints: z.array(keyPointSchema),
  evidence: z.array(evidenceSchema),
  calculations: z.array(calculationSchema),
  assumptions: z.array(assumptionSchema),
  recommendations: z.array(aiRecommendationSchema),
  followUpQuestions: z.array(z.string()),
  /**
   * True when the data was not enough to answer.
   *
   * §21 requires saying so instead of filling the void with something plausible
   * — and admitting a lack of data is the behaviour that sustains trust in the
   * long run.
   */
  insufficientData: z.boolean(),
})
export type AIAnswer = z.infer<typeof aiAnswerSchema>

export const aiMessageSchema = z.object({
  id: idSchema,
  conversationId: idSchema,
  role: z.enum(['USER', 'ASSISTANT']),
  content: z.string(),
  answer: aiAnswerSchema.nullable(),
  /** Stored with the answer so the report is reproducible (§46, §47). */
  provider: z.string().nullable(),
  model: z.string().nullable(),
  promptVersion: z.string().nullable(),
  createdAt: isoDateTimeSchema,
})
export type AIMessage = z.infer<typeof aiMessageSchema>

export const aiConversationSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  title: z.string(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
})
export type AIConversation = z.infer<typeof aiConversationSchema>

export const askInputSchema = z.object({
  question: z.string().min(1).max(2000),
  conversationId: idSchema.nullable().optional(),
  locale: localeSchema.optional(),
})
export type AskInput = z.infer<typeof askInputSchema>

/**
 * AI consumption (§15).
 *
 * Recorded per request and never hidden from the client (§81). Charging per
 * message would be penalizing the use of the central feature; the model is a
 * per-plan limit with consumption in sight.
 */
export const aiUsageSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  userId: idSchema.nullable(),
  provider: z.string(),
  model: z.string(),
  task: aiTaskSchema,
  inputTokens: z.number().int().nonnegative(),
  outputTokens: z.number().int().nonnegative(),
  cachedTokens: z.number().int().nonnegative(),
  /** Cents. An estimate — the true value is the one on the provider's invoice. */
  estimatedCostCents: z.number().int().nonnegative(),
  latencyMs: z.number().int().nonnegative(),
  createdAt: isoDateTimeSchema,
})
export type AIUsage = z.infer<typeof aiUsageSchema>

export const aiUsageSummarySchema = z.object({
  period: z.string(),
  totalCostCents: z.number().int().nonnegative(),
  byProvider: z.array(
    z.object({
      provider: z.string(),
      costCents: z.number().int().nonnegative(),
      requestCount: z.number().int().nonnegative(),
    }),
  ),
})
export type AIUsageSummary = z.infer<typeof aiUsageSummarySchema>

/**
 * What the privacy screen shows (§74).
 *
 * Without euphemism: which provider, which model, and **whether the data
 * leaves**. A provider labelled "local" that sends data outside is exactly what
 * destroys the trust this product sells.
 */
export const aiPrivacyStatusSchema = z.object({
  providerKind: aiProviderKindSchema,
  model: z.string(),
  /** False when the endpoint leaves the configured machine or region. */
  dataStaysLocal: z.boolean(),
  retentionPolicy: aiRetentionPolicySchema,
  isBYOK: z.boolean(),
  /** Where the request is processed, as far as is known from the endpoint. */
  processingRegion: z.string().nullable(),
})
export type AIPrivacyStatus = z.infer<typeof aiPrivacyStatusSchema>
