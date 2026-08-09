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

/**
 * **Chave de tradução e parâmetros, nunca texto pronto.**
 *
 * A v0.3.0 descrevia `title` e `description` como texto "já traduzido no locale
 * do pedido", e estava errada sobre o que o produto faz. Traduzir no servidor
 * obrigava-o a ter o seu próprio catálogo em quatro idiomas, com o seu próprio
 * gate de paridade — uma segunda cópia da infraestrutura de i18n, e a garantia
 * de que as duas divergiriam. Pior: a redacção passaria a viver em dois sítios.
 *
 * Por baixo disto há uma separação que vale por si: **decidir o que é anómalo e
 * decidir como se diz são trabalhos diferentes**. O primeiro é determinístico e
 * testa-se com números; o segundo é editorial e revê-se lendo. Separados, o
 * detector testa-se sem uma única palavra de português no meio.
 *
 * O desvio ao §37 está registado em `docs/ARCHITECTURE.md`.
 */
export const insightSchema = z.object({
  id: idSchema,
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** Ex.: `insights.REVENUE_DECLINE.title`. Resolve-se contra `messages/`. */
  titleKey: z.string(),
  /**
   * A mesma afirmação tem redacções diferentes conforme o que se sabe — com ou
   * sem os clientes que explicam a queda, com ou sem a comparação com a
   * carteira. É o detector que escolhe, porque é ele que sabe o que apurou.
   */
  descriptionKey: z.string(),
  /**
   * Valores para o ICU. Uma lista de nomes viaja como **array**, nunca como
   * string já unida: o separador de lista muda com o idioma, e juntá-la no
   * servidor seria escrever português. Quem a junta é o `Intl.ListFormat`.
   */
  params: z.record(z.string(), z.union([z.string(), z.number(), z.array(z.string())])),
  metricId: metricIdSchema.nullable(),
  /**
   * A entidade a que a afirmação se refere — o cliente que caiu, a rubrica que
   * estourou. Com o `metricId` e o `period`, é o endereço da prova **e** o
   * destino do clique: os dois têm de ser a mesma coisa, senão o painel mostra
   * linhas diferentes das que o clique abre.
   */
  entityId: idSchema.nullable(),
  dimension: z.enum(['customer', 'supplier', 'category']).nullable(),
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
 * A resposta do endpoint, e não só a lista.
 *
 * A moeda vem aqui para a página não ter de pedir o resumo do dashboard só para
 * poder formatar meia dúzia de valores — seriam três queries e uma avaliação
 * inteira do grafo de métricas. A versão do dataset vem porque é o que torna a
 * lista reproduzível (§46): os mesmos insights sobre os mesmos dados.
 *
 * Repare no que **não** está aqui: `organizationId`. O tenant é implícito na
 * sessão, e devolvê-lo em cada objecto seria repetir em cada linha uma coisa que
 * o cliente já sabe e não pode escolher.
 */
export const insightsResponseSchema = z.object({
  period: periodSchema,
  currency: z.string().length(3),
  datasetVersion: z.number().int(),
  insights: z.array(insightSchema),
})
export type InsightsResponse = z.infer<typeof insightsResponseSchema>

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

/**
 * Item do "What changed?" (§35). Cada linha é clicável até à evidência.
 *
 * `direction` e `sentiment` são minúsculas, ao contrário de todos os outros
 * enums deste pacote. Não é descuido: os outros são valores **persistidos** —
 * papéis, estados, tipos —, e estes são vocabulário de apresentação que nunca
 * chega à base. Uniformizá-los obrigaria a converter em ambos os lados para não
 * ganhar nada.
 */
export const changeItemSchema = z.object({
  metricId: metricIdSchema,
  unit: z.string(),
  /** O valor no período, para a UI não voltar a pedir o resumo. */
  actual: z.number(),
  changeAbsolute: z.number(),
  /**
   * `null` para margens, e para quem não tem base de comparação.
   *
   * Uma margem varia em **pontos percentuais**, não em percentagem: de 40% para
   * 42% são +2pp, e dizer "+5%" é verdade sobre o rácio e enganador sobre o
   * negócio. Os dois campos existem separados para a UI não ter de adivinhar
   * qual é o certo — o que estiver preenchido é o que se mostra.
   */
  changePercent: z.number().nullable(),
  changePoints: z.number().nullable(),
  direction: z.enum(['up', 'down']),
  /** Se subir é bom ou mau depende da métrica: despesa a subir não é vitória. */
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
   * `z.coerce.boolean()` está proibido aqui, e não é preferência: a coerção do
   * Zod é `Boolean(valor)`, e qualquer string não vazia é verdadeira —
   * `?includeDismissed=false` chegaria como `true`. Armadilha já paga uma vez
   * neste projecto.
   */
  includeDismissed: z
    .enum(['true', 'false'])
    .default('false')
    .transform((valor) => valor === 'true'),
})
export type InsightFilter = z.infer<typeof insightFilterSchema>
