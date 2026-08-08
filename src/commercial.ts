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
 * Contexto comercial — CRM leve.
 *
 * O §1.1 do PRD declara que o produto não é um CRM. Isto estende esse âmbito
 * por decisão explícita, e por isso fica em contexto próprio, com milestone
 * próprio (M8), depois de a promessa financeira estar entregue.
 *
 * O que o impede de ser um CRM medíocre colado ao lado de um produto financeiro
 * bom são os laços ao financeiro:
 *
 *   - oportunidade ganha confrontada com a receita real do cliente;
 *   - pipeline ponderado (`value × probability`) como nó do grafo de forecast;
 *   - detectores de churn e renovação a alimentar os insights;
 *   - contexto comercial nas respostas da IA — "o cliente caiu 18% e tem
 *     renovação a 30 dias sem oportunidade aberta".
 *
 * Aviso de privacidade: leads e contactos são **dados pessoais de terceiros**
 * (classe S2). O cliente é o responsável pelo tratamento e pela base legal;
 * nós somos subcontratante. Ver `docs/SEGURANCA_E_PRIVACIDADE.md`.
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
  /** 0–100. Multiplicada pelo valor dá o pipeline ponderado do forecast (§40). */
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

/** Alvo de uma actividade. Polimórfico para não haver três tabelas iguais. */
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

/** Resumo do pipeline por estágio, para o funil e para o forecast. */
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
// Escrita
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
    message: 'oportunidade tem de pertencer a um cliente ou a um lead',
    path: ['customerId'],
  })
export type CreateOpportunityInput = z.infer<typeof createOpportunityInputSchema>

export const leadFilterSchema = paginationQuerySchema.extend({
  status: leadStatusSchema.optional(),
  ownerId: idSchema.optional(),
  search: z.string().max(200).optional(),
})
export type LeadFilter = z.infer<typeof leadFilterSchema>
