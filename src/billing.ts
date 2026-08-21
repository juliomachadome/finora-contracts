import { z } from 'zod'
import { idSchema, isoDateTimeSchema, moneySchema } from './api.js'
import { paymentProviderSchema, planTierSchema, subscriptionStatusSchema } from './enums.js'

/**
 * Billing (§78–§81).
 *
 * Two principles that shape the model:
 *
 * 1. **Never charge for AI per message.** Charging per question teaches the
 *    client to avoid the central feature. The model is a per-plan limit with
 *    consumption always in sight (§81).
 *
 * 2. **Security is not a paid plan.** Encryption, isolation, audit log and the
 *    right to export and delete are the same on every plan — GDPR Art. 32 and
 *    LGPD Art. 46 require adequate measures for all processing, and a plan
 *    "without protection" would be documented proof of non-compliance. What
 *    scales by price is **sovereignty and control**: data residency,
 *    on-premise, BYOK, private AI, SSO, custom retention. See
 *    `docs/SEGURANCA_E_PRIVACIDADE.md`.
 */

/**
 * Per-plan limits.
 *
 * `null` means no limit. Exceeding it blocks the new action, never deletes nor
 * hides data already there — losing access to the history because of billing
 * would be holding the client's data hostage.
 */
export const planLimitsSchema = z.object({
  maxUsers: z.number().int().positive().nullable(),
  maxTransactions: z.number().int().positive().nullable(),
  maxOrganizations: z.number().int().positive().nullable(),
  /** Cents of AI consumption included per month. */
  aiMonthlyAllowanceCents: z.number().int().nonnegative().nullable(),
  /** Lets it carry on above the limit and charges the overage. */
  allowAIOverage: z.boolean(),
  // Sovereignty features — what legitimately scales by price
  canUseBYOK: z.boolean(),
  canUseLocalAI: z.boolean(),
  canChooseDataRegion: z.boolean(),
  canUseSSO: z.boolean(),
  canExportAuditLog: z.boolean(),
  canWhiteLabel: z.boolean(),
  auditLogRetentionMonths: z.number().int().positive().nullable(),
  /**
   * The modules this tier switches on, beyond the core engine (§107, T37, D9).
   *
   * ## The core engine is not in here, and that is the decision
   *
   * Import, metrics, alerts, the report, scenarios and the forecast are every
   * tier's, including the cheapest. They cost near nothing per customer — it is
   * arithmetic over rows already in the database — and charging for them prices
   * out the company this product exists for, which is the small one that has
   * nothing today.
   *
   * What is metered is the AI, because that is the only part with a real
   * invoice per use, and bringing your own key removes the meter.
   *
   * ## Why a list of names and not a plugin
   *
   * A module is a set of **target metrics**; the active graph of an
   * organization is `requiredFor` of those targets. Third-party code inside the
   * engine would end the claim that the AI interprets and never calculates.
   * This is a row in a table.
   */
  modules: z.array(z.enum(['COMMERCIAL', 'INVENTORY'])).default([]),
})
export type PlanLimits = z.infer<typeof planLimitsSchema>

export const planSchema = z.object({
  tier: planTierSchema,
  name: z.string(),
  /** Cents per month. Configurable — §80 requires the price not be hard-coded. */
  monthlyPriceCents: z.number().int().nonnegative(),
  yearlyPriceCents: z.number().int().nonnegative(),
  currency: z.string().length(3),
  limits: planLimitsSchema,
})
export type Plan = z.infer<typeof planSchema>

export const subscriptionSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  tier: planTierSchema,
  status: subscriptionStatusSchema,
  provider: paymentProviderSchema,
  currentPeriodEnd: isoDateTimeSchema.nullable(),
  cancelAtPeriodEnd: z.boolean(),
  trialEndsAt: isoDateTimeSchema.nullable(),
  createdAt: isoDateTimeSchema,
})
export type Subscription = z.infer<typeof subscriptionSchema>

export const createCheckoutInputSchema = z.object({
  tier: planTierSchema,
  interval: z.enum(['MONTHLY', 'YEARLY']),
  provider: paymentProviderSchema.optional(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
})
export type CreateCheckoutInput = z.infer<typeof createCheckoutInputSchema>

export const checkoutSessionSchema = z.object({
  url: z.string().url(),
  sessionId: z.string(),
})
export type CheckoutSession = z.infer<typeof checkoutSessionSchema>

/** Consumption against the limits, so the panel never hides the spend (§81). */
export const usageSummarySchema = z.object({
  organizationId: idSchema,
  tier: planTierSchema,
  users: z.object({ used: z.number().int(), limit: z.number().int().nullable() }),
  transactions: z.object({ used: z.number().int(), limit: z.number().int().nullable() }),
  ai: z.object({
    spent: moneySchema,
    allowance: moneySchema.nullable(),
    overageAllowed: z.boolean(),
  }),
})
export type UsageSummary = z.infer<typeof usageSummarySchema>
