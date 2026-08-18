import { z } from 'zod'
import {
  idSchema,
  isoDateSchema,
  isoDateTimeSchema,
  moneySchema,
  paginationQuerySchema,
} from './api.js'
import { activityTypeSchema, leadStatusSchema, opportunityStageSchema } from './enums.js'

/**
 * Commercial context — lightweight CRM.
 *
 * §1.1 of the PRD states that the product is not a CRM. This extends that scope
 * by an explicit decision, and for that reason it stays in its own context, with
 * its own milestone (M8), after the financial promise has been delivered.
 *
 * What stops it from being a mediocre CRM glued next to a good financial product
 * are the ties to the financial side:
 *
 *   - a won opportunity confronted with the client's real revenue;
 *   - weighted pipeline (`value × probability`) as a node of the forecast graph;
 *   - churn and renewal detectors feeding the insights;
 *   - commercial context in the AI answers — "the client dropped 18% and has a
 *     renewal in 30 days with no open opportunity".
 *
 * Privacy notice: leads and contacts are **personal data of third parties**
 * (class S2). The client is the controller and holds the legal basis; we are the
 * processor. See `docs/SEGURANCA_E_PRIVACIDADE.md`.
 */

export const leadSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  source: z.string().nullable(),
  status: leadStatusSchema,
  estimatedValue: moneySchema.nullable(),
  ownerId: idSchema.nullable(),
  ownerName: z.string().nullable(),
  convertedToCustomerId: idSchema.nullable(),
  /**
   * The optimistic locking version, and it travels on the read on purpose.
   *
   * The write routes require the version that was read — without it in the
   * response, an honest client can only guess: it sends zero, works on the first
   * lead and fails on every one that has already been touched. A lock the
   * consumer cannot satisfy is not security, it is a broken feature.
   */
  version: z.number().int().nonnegative(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
})
export type Lead = z.infer<typeof leadSchema>

export const opportunitySchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  customerId: idSchema.nullable(),
  leadId: idSchema.nullable(),
  title: z.string(),
  stage: opportunityStageSchema,
  value: moneySchema,
  /** 0–100. Multiplied by the value it gives the forecast's weighted pipeline (§40). */
  probability: z.number().min(0).max(100),
  expectedCloseDate: isoDateSchema.nullable(),
  closedAt: isoDateTimeSchema.nullable(),
  lostReason: z.string().nullable(),
  ownerId: idSchema.nullable(),
  ownerName: z.string().nullable(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
})
export type Opportunity = z.infer<typeof opportunitySchema>

/** Target of an activity. Polymorphic so there are not three identical tables. */
export const ACTIVITY_SUBJECTS = ['LEAD', 'CUSTOMER', 'OPPORTUNITY'] as const
export const activitySubjectSchema = z.enum(ACTIVITY_SUBJECTS)
export type ActivitySubject = z.infer<typeof activitySubjectSchema>

export const activitySchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  subjectType: activitySubjectSchema,
  subjectId: idSchema,
  type: activityTypeSchema,
  content: z.string(),
  dueAt: isoDateTimeSchema.nullable(),
  completedAt: isoDateTimeSchema.nullable(),
  userId: idSchema,
  userName: z.string(),
  createdAt: isoDateTimeSchema,
})
export type Activity = z.infer<typeof activitySchema>

/** Pipeline summary by stage, for the funnel and for the forecast. */
export const pipelineSummarySchema = z.object({
  stages: z.array(
    z.object({
      stage: opportunityStageSchema,
      count: z.number().int().nonnegative(),
      totalValue: moneySchema,
      weightedValue: moneySchema,
    }),
  ),
  totalWeightedValue: moneySchema,
})
export type PipelineSummary = z.infer<typeof pipelineSummarySchema>

// ---------------------------------------------------------------------------
// Writing
// ---------------------------------------------------------------------------

export const createLeadInputSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().max(40).nullable().optional(),
  source: z.string().max(80).nullable().optional(),
  estimatedValueCents: z.number().int().nullable().optional(),
  ownerId: idSchema.nullable().optional(),
})
export type CreateLeadInput = z.infer<typeof createLeadInputSchema>

export const updateLeadInputSchema = createLeadInputSchema.partial().extend({
  status: leadStatusSchema.optional(),
})
export type UpdateLeadInput = z.infer<typeof updateLeadInputSchema>

export const createOpportunityInputSchema = z
  .object({
    customerId: idSchema.nullable().optional(),
    leadId: idSchema.nullable().optional(),
    title: z.string().min(1).max(200),
    stage: opportunityStageSchema.default('DISCOVERY'),
    valueCents: z.number().int(),
    probability: z.number().min(0).max(100).default(50),
    expectedCloseDate: isoDateSchema.nullable().optional(),
    ownerId: idSchema.nullable().optional(),
  })
  .refine((o) => Boolean(o.customerId) || Boolean(o.leadId), {
    message: 'an opportunity must belong to a customer or to a lead',
    path: ['customerId'],
  })
export type CreateOpportunityInput = z.infer<typeof createOpportunityInputSchema>

export const leadFilterSchema = paginationQuerySchema.extend({
  status: leadStatusSchema.optional(),
  ownerId: idSchema.optional(),
  search: z.string().max(200).optional(),
})
export type LeadFilter = z.infer<typeof leadFilterSchema>
