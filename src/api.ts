import { z } from 'zod'

/**
 * Primitivas partilhadas por toda a API.
 */

// ---------------------------------------------------------------------------
// Identificadores
// ---------------------------------------------------------------------------

export const idSchema = z.string().uuid()
export type Id = z.infer<typeof idSchema>

/** ISO-8601. Serializado como string porque JSON não tem tipo data. */
export const isoDateTimeSchema = z.iso.datetime()
export type IsoDateTime = z.infer<typeof isoDateTimeSchema>

/** Dia sem hora, `YYYY-MM-DD`. Transacções têm data, não instante. */
export const isoDateSchema = z.iso.date()
export type IsoDate = z.infer<typeof isoDateSchema>

/** Período mensal `YYYY-MM`. Unidade natural de reporte financeiro. */
export const periodSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'período tem de ser YYYY-MM')
export type Period = z.infer<typeof periodSchema>

/** ISO-4217. */
export const currencySchema = z.string().length(3).toUpperCase()
export type Currency = z.infer<typeof currencySchema>

// ---------------------------------------------------------------------------
// Dinheiro
// ---------------------------------------------------------------------------

/**
 * Valor monetário em **cêntimos**, sempre inteiro.
 *
 * Vírgula flutuante não representa 0,1 exactamente, e uma soma de dez mil linhas
 * acumula erro que aparece como cêntimos a faltar num relatório assinado por um
 * CFO. Num produto cuja promessa é "podes conferir tudo", isso é fatal.
 *
 * Regra: cêntimos como inteiro em todo o transporte e armazenamento; a
 * formatação para humano acontece só na fronteira de apresentação, com `Intl`.
 */
export const moneySchema = z.object({
  /** Inteiro em cêntimos. 1234 = 12,34. Negativo é permitido (estornos). */
  amountCents: z.number().int(),
  currency: currencySchema,
})
export type Money = z.infer<typeof moneySchema>

/**
 * Percentagem como número, não como fracção: 12.4 significa 12,4%.
 *
 * A alternativa (0.124) engana à leitura e produz o clássico erro de multiplicar
 * por 100 duas vezes.
 */
export const percentageSchema = z.number()
export type Percentage = z.infer<typeof percentageSchema>

/**
 * Variação entre dois períodos.
 *
 * `changePercent` é nulo quando o período anterior é zero — divisão por zero não
 * é "crescimento infinito", é ausência de base de comparação, e a UI tem de
 * mostrar isso em vez de um número inventado.
 */
export const deltaSchema = z.object({
  current: z.number(),
  previous: z.number(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  /** Para margens, em pontos percentuais. 2.8 = +2,8pp. */
  changePoints: z.number().nullable().optional(),
})
export type Delta = z.infer<typeof deltaSchema>

// ---------------------------------------------------------------------------
// Envelopes
// ---------------------------------------------------------------------------

/**
 * Erro da API, formato único.
 *
 * `message` é para humano e vem já traduzido no locale do pedido. `code` é para
 * a máquina e nunca muda. `details` transporta erros de campo em formulário.
 *
 * Nunca inclui stack trace, query, nem valor de campo sensível — o corpo do erro
 * é o sítio onde mais segredo escapa por descuido.
 */
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.array(z.string())).optional(),
  /** Para o utilizador citar ao pedir apoio, e para cruzar com o log. */
  requestId: z.string().optional(),
})
export type ApiError = z.infer<typeof apiErrorSchema>

/**
 * Paginação por cursor, não por offset.
 *
 * `OFFSET 20000` obriga o Postgres a ler vinte mil linhas para as deitar fora, e
 * degrada à medida que o cliente acumula histórico — exactamente ao contrário do
 * que se quer. O cursor lê sempre a mesma quantidade, e não salta linhas quando
 * chegam registos novos a meio da navegação.
 */
export const paginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50),
})
export type PaginationQuery = z.infer<typeof paginationQuerySchema>

export const paginatedSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    nextCursor: z.string().nullable(),
    /** Só quando é barato de obter. Ausente não significa zero. */
    totalCount: z.number().int().optional(),
  })

export type Paginated<T> = {
  items: T[]
  nextCursor: string | null
  totalCount?: number
}

// ---------------------------------------------------------------------------
// Filtros de período
// ---------------------------------------------------------------------------

export const periodRangeSchema = z
  .object({
    from: periodSchema,
    to: periodSchema,
  })
  .refine((r) => r.from <= r.to, {
    message: 'from tem de ser anterior ou igual a to',
    path: ['from'],
  })
export type PeriodRange = z.infer<typeof periodRangeSchema>
