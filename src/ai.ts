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
 * Camada de IA.
 *
 * A regra que estrutura tudo (§9): a IA **interpreta**, não calcula. Recebe
 * métricas já calculadas de forma determinística e explica-as. Um número que
 * saia de um modelo nunca é verdade financeira.
 *
 *   dados → normalização → domínio → cálculo → métricas → evidência → IA → explicação
 *
 * O caminho `Excel → LLM → verdade financeira` está proibido, e é a diferença
 * entre este produto e um chat com uma folha de cálculo.
 */

/**
 * Uma afirmação dentro de uma resposta (§20).
 *
 * `type` obriga a separar facto de inferência. Não é cosmético: é o que permite
 * ao utilizador saber o que pode levar a uma reunião e o que tem de confirmar
 * primeiro. Sem esta separação, uma suposição plausível ganha o peso de um dado
 * auditado.
 */
export const keyPointSchema = z.object({
  type: aiResponseTypeSchema,
  text: z.string(),
  /** Presente em FACT e CALCULATION. Ausente é sinal de afirmação não suportada. */
  evidenceId: idSchema.nullable(),
})
export type KeyPoint = z.infer<typeof keyPointSchema>

/**
 * Pressuposto assumido pela resposta (§40).
 *
 * Toda a projecção assenta em pressupostos, e escondê-los é como se apresenta
 * uma opinião como previsão. Ficam explícitos e editáveis.
 */
export const assumptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  /** Verdadeiro quando foi o modelo a assumir, não o utilizador a declarar. */
  inferred: z.boolean(),
})
export type Assumption = z.infer<typeof assumptionSchema>

export const aiRecommendationSchema = z.object({
  title: z.string(),
  rationale: z.string(),
})
export type AIRecommendation = z.infer<typeof aiRecommendationSchema>

/**
 * Contrato de resposta (§19).
 *
 * Estruturado em vez de texto livre porque a UI precisa de renderizar cada parte
 * de forma diferente — e porque um contrato validável é o que permite testar que
 * o modelo não fugiu do formato (§87, testes de contrato de IA).
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
   * Verdadeiro quando os dados não chegavam para responder.
   *
   * O §21 obriga a dizê-lo em vez de preencher o vazio com algo plausível — e
   * admitir falta de dados é o comportamento que sustenta a confiança a longo
   * prazo.
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
  /** Guardado com a resposta para o relatório ser reproduzível (§46, §47). */
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
 * Consumo de IA (§15).
 *
 * Registado por pedido e nunca escondido do cliente (§81). Cobrar por mensagem
 * seria penalizar o uso da funcionalidade central; o modelo é limite por plano
 * com consumo à vista.
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
  /** Cêntimos. Estimativa — o valor verdadeiro é o da factura do provider. */
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
 * O que o ecrã de privacidade mostra (§74).
 *
 * Sem eufemismo: que provider, que modelo, e **se os dados saem**. Um provider
 * rotulado "local" que envia para fora é exactamente o que destrói a confiança
 * que este produto vende.
 */
export const aiPrivacyStatusSchema = z.object({
  providerKind: aiProviderKindSchema,
  model: z.string(),
  /** Falso quando o endpoint sai da máquina ou da região configurada. */
  dataStaysLocal: z.boolean(),
  retentionPolicy: aiRetentionPolicySchema,
  isBYOK: z.boolean(),
  /** Onde o pedido é processado, tanto quanto se sabe do endpoint. */
  processingRegion: z.string().nullable(),
})
export type AIPrivacyStatus = z.infer<typeof aiPrivacyStatusSchema>
