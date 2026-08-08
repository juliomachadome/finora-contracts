import { z } from 'zod'
import { idSchema, isoDateTimeSchema, periodSchema } from './api.js'
import { insightTypeSchema, severitySchema } from './enums.js'
import { evidenceSchema } from './evidence.js'
import { metricIdSchema } from './metrics.js'

/**
 * Insights — o que o sistema diz antes de lhe perguntarem (§36, §115).
 *
 * A diferença entre um dashboard e este produto está aqui: o dashboard espera
 * que o utilizador descubra; isto abre já com "há três coisas que devias saber".
 *
 * Cada insight nasce de um detector determinístico sobre métricas calculadas,
 * nunca de um modelo a opinar. A IA, quando chegar no M7, redige — não decide o
 * que é anómalo.
 */

export const insightSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** Já traduzido no locale do pedido. */
  title: z.string(),
  description: z.string(),
  metricId: metricIdSchema.nullable(),
  /** Números que sustentam a afirmação, para a UI mostrar sem recalcular. */
  supportingData: z.record(z.string(), z.number()),
  evidence: evidenceSchema.nullable(),
  /** Dispensado pelo utilizador: não volta a aparecer para o mesmo período. */
  dismissedAt: isoDateTimeSchema.nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema,
})
export type Insight = z.infer<typeof insightSchema>

/**
 * Recomendação (§38).
 *
 * Separada do insight de propósito. O insight é o que aconteceu, e é verificável;
 * a recomendação é o que fazer a seguir, e é opinião. Misturar as duas faria uma
 * sugestão discutível herdar a autoridade de um facto — que é exactamente a
 * confusão que o §20 obriga a evitar.
 */
export const recommendationSchema = z.object({
  id: idSchema,
  insightId: idSchema.nullable(),
  title: z.string(),
  rationale: z.string(),
  /** Sempre `RECOMMENDATION`, para a UI nunca a mostrar como facto. */
  kind: z.literal('RECOMMENDATION'),
  createdAt: isoDateTimeSchema,
})
export type Recommendation = z.infer<typeof recommendationSchema>

/** Item do "What changed?" (§35). Cada linha é clicável até à evidência. */
export const changeItemSchema = z.object({
  label: z.string(),
  metricId: metricIdSchema.nullable(),
  entityId: idSchema.nullable(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  changePoints: z.number().nullable(),
  direction: z.enum(['UP', 'DOWN', 'FLAT']),
  /** Se subir é bom ou mau depende da métrica: despesa a subir não é vitória. */
  sentiment: z.enum(['POSITIVE', 'NEGATIVE', 'NEUTRAL']),
})
export type ChangeItem = z.infer<typeof changeItemSchema>

export const insightFilterSchema = z.object({
  period: periodSchema.optional(),
  type: insightTypeSchema.optional(),
  severity: severitySchema.optional(),
  includeDismissed: z.coerce.boolean().default(false),
})
export type InsightFilter = z.infer<typeof insightFilterSchema>
