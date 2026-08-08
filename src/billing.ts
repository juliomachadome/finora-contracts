import { z } from 'zod'
import { idSchema, isoDateTimeSchema, moneySchema } from './api.js'
import { paymentProviderSchema, planTierSchema, subscriptionStatusSchema } from './enums.js'

/**
 * Faturação (§78–§81).
 *
 * Dois princípios que moldam o modelo:
 *
 * 1. **Nunca cobrar IA por mensagem.** Cobrar por pergunta ensina o cliente a
 *    evitar a funcionalidade central. O modelo é limite por plano com consumo
 *    sempre à vista (§81).
 *
 * 2. **Segurança não é plano pago.** Cifragem, isolamento, audit log e o direito
 *    a exportar e apagar são iguais em todos os planos — o RGPD Art. 32 e a LGPD
 *    Art. 46 obrigam a medidas adequadas para todo o tratamento, e um plano "sem
 *    protecção" seria prova documentada de incumprimento. O que escala por preço
 *    é **soberania e controlo**: residência de dados, on-premise, BYOK, IA
 *    privada, SSO, retenção à medida. Ver `docs/SEGURANCA_E_PRIVACIDADE.md`.
 */

/**
 * Limites por plano.
 *
 * `null` significa sem limite. Ultrapassar bloqueia a acção nova, nunca apaga
 * nem esconde dados já lá — perder acesso ao histórico por causa de faturação
 * seria reter dados do cliente como refém.
 */
export const planLimitsSchema = z.object({
  maxUsers: z.number().int().positive().nullable(),
  maxTransactions: z.number().int().positive().nullable(),
  maxOrganizations: z.number().int().positive().nullable(),
  /** Cêntimos de consumo de IA incluídos por mês. */
  aiMonthlyAllowanceCents: z.number().int().nonnegative().nullable(),
  /** Deixa continuar acima do limite e cobra o excedente. */
  allowAIOverage: z.boolean(),
  // Funcionalidades de soberania — o que legitimamente escala por preço
  canUseBYOK: z.boolean(),
  canUseLocalAI: z.boolean(),
  canChooseDataRegion: z.boolean(),
  canUseSSO: z.boolean(),
  canExportAuditLog: z.boolean(),
  canWhiteLabel: z.boolean(),
  auditLogRetentionMonths: z.number().int().positive().nullable(),
})
export type PlanLimits = z.infer<typeof planLimitsSchema>

export const planSchema = z.object({
  tier: planTierSchema,
  name: z.string(),
  /** Cêntimos por mês. Configurável — o §80 exige preço não codificado. */
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

/** Consumo face aos limites, para o painel nunca esconder o gasto (§81). */
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
