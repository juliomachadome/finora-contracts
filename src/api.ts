import { z } from 'zod'

/**
 * Primitives shared across the whole API.
 */

// ---------------------------------------------------------------------------
// Identifiers
// ---------------------------------------------------------------------------

export const idSchema = z.string().uuid()
export type Id = z.infer<typeof idSchema>

/** ISO-8601. Serialized as a string because JSON has no date type. */
export const isoDateTimeSchema = z.iso.datetime()
export type IsoDateTime = z.infer<typeof isoDateTimeSchema>

/** Day without a time, `YYYY-MM-DD`. Transactions have a date, not an instant. */
export const isoDateSchema = z.iso.date()
export type IsoDate = z.infer<typeof isoDateSchema>

/** Monthly period `YYYY-MM`. The natural unit of financial reporting. */
export const periodSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, 'period must be YYYY-MM')
export type Period = z.infer<typeof periodSchema>

/** ISO-4217. */
export const currencySchema = z.string().length(3).toUpperCase()
export type Currency = z.infer<typeof currencySchema>

// ---------------------------------------------------------------------------
// Money
// ---------------------------------------------------------------------------

/**
 * Monetary value in **cents**, always an integer.
 *
 * Floating point does not represent 0.1 exactly, and a sum of ten thousand rows
 * accumulates an error that shows up as missing cents in a report signed by a
 * CFO. In a product whose promise is "you can check everything", that is fatal.
 *
 * Rule: cents as an integer throughout transport and storage; formatting for
 * humans happens only at the presentation boundary, with `Intl`.
 */
export const moneySchema = z.object({
  /** Integer in cents. 1234 = 12.34. Negative is allowed (refunds). */
  amountCents: z.number().int(),
  currency: currencySchema,
})
export type Money = z.infer<typeof moneySchema>

/**
 * Percentage as a number, not as a fraction: 12.4 means 12.4%.
 *
 * The alternative (0.124) misleads on reading and produces the classic mistake
 * of multiplying by 100 twice.
 */
export const percentageSchema = z.number()
export type Percentage = z.infer<typeof percentageSchema>

/**
 * Variation between two periods.
 *
 * `changePercent` is null when the previous period is zero — division by zero is
 * not "infinite growth", it is the absence of a comparison base, and the UI has
 * to show that instead of an invented number.
 */
export const deltaSchema = z.object({
  current: z.number(),
  previous: z.number(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  /** For margins, in percentage points. 2.8 = +2.8pp. */
  changePoints: z.number().nullable().optional(),
})
export type Delta = z.infer<typeof deltaSchema>

// ---------------------------------------------------------------------------
// Envelopes
// ---------------------------------------------------------------------------

/**
 * API error, single format.
 *
 * `message` is for a human and comes already translated in the locale of the
 * request. `code` is for the machine and never changes. `details` carries field
 * errors in a form.
 *
 * Never includes a stack trace, a query, nor a sensitive field value — the error
 * body is the place where most secrets escape by carelessness.
 */
export const apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.array(z.string())).optional(),
  /** For the user to quote when asking for support, and to cross with the log. */
  requestId: z.string().optional(),
})
export type ApiError = z.infer<typeof apiErrorSchema>

/**
 * Cursor pagination, not offset.
 *
 * `OFFSET 20000` forces Postgres to read twenty thousand rows in order to throw
 * them away, and degrades as the client accumulates history — exactly the
 * opposite of what is wanted. The cursor always reads the same amount, and does
 * not skip rows when new records arrive mid-navigation.
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
    /** Only when it is cheap to obtain. Absent does not mean zero. */
    totalCount: z.number().int().optional(),
  })

export type Paginated<T> = {
  items: T[]
  nextCursor: string | null
  totalCount?: number
}

// ---------------------------------------------------------------------------
// Period filters
// ---------------------------------------------------------------------------

export const periodRangeSchema = z
  .object({
    from: periodSchema,
    to: periodSchema,
  })
  .refine((r) => r.from <= r.to, {
    message: 'from must be earlier than or equal to to',
    path: ['from'],
  })
export type PeriodRange = z.infer<typeof periodRangeSchema>
