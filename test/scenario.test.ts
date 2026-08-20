import { describe, it, expect } from 'vitest'
import {
  forecastPointSchema,
  forecastSchema,
  scenarioImpactSchema,
  scenarioInputSchema,
  scenarioResultSchema,
} from '../src/scenario.js'

/**
 * A scenario is a number somebody takes to a board.
 *
 * That is the whole reason these cases exist: the shape has to make it
 * impossible to publish a projection without its assumptions, and impossible to
 * report a percentage change against a base of zero as if it were growth.
 */

const UUID = '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d'

describe('scenarioInputSchema', () => {
  const input = {
    type: 'CUSTOMER_LOSS' as const,
    name: 'Perder a Vega Partners',
    basePeriod: '2026-07',
    parameters: { customerId: UUID },
  }

  it('defaults the horizon rather than leaving it to the caller', () => {
    expect(scenarioInputSchema.parse(input).horizonMonths).toBe(12)
  })

  it('caps the horizon at three years', () => {
    // A ten-year projection from one month of data is not a forecast, it is a
    // straight line with a confident label on it.
    expect(() => scenarioInputSchema.parse({ ...input, horizonMonths: 120 })).toThrow()
    expect(() => scenarioInputSchema.parse({ ...input, horizonMonths: 0 })).toThrow()
  })

  it('refuses a base period that is not a month', () => {
    // `2026-13` and `julho` both reach the engine as a period and come back with
    // no data, which reads as "the company had no revenue".
    expect(() => scenarioInputSchema.parse({ ...input, basePeriod: '2026-13' })).toThrow()
    expect(() => scenarioInputSchema.parse({ ...input, basePeriod: '2026-7' })).toThrow()
  })

  it('takes only scalars as parameters', () => {
    /*
     * Levers read parameters as numbers, strings or booleans, and nothing else.
     *
     * A nested object would arrive at `numberParam` and fail with a type error
     * from deep inside the domain, instead of being refused at the edge where
     * the message can name the field.
     */
    expect(() =>
      scenarioInputSchema.parse({ ...input, parameters: { range: { from: 1, to: 2 } } }),
    ).toThrow()
  })

  it('accepts the parameters each lever actually takes', () => {
    expect(
      scenarioInputSchema.parse({ ...input, type: 'REVENUE_CHANGE', parameters: { percent: -10 } })
        .parameters.percent,
    ).toBe(-10)

    expect(
      scenarioInputSchema.parse({
        ...input,
        type: 'HIRING',
        parameters: { headcount: 3, monthlyCostCents: 350_000 },
      }).parameters.headcount,
    ).toBe(3)
  })

  it('requires a name, because a saved scenario nobody can tell apart is not saved', () => {
    expect(() => scenarioInputSchema.parse({ ...input, name: '' })).toThrow()
  })

  it('refuses a scenario type with no lever behind it', () => {
    expect(() => scenarioInputSchema.parse({ ...input, type: 'MARKET_CRASH' })).toThrow()
  })
})

describe('scenarioImpactSchema', () => {
  it('allows the percentage change to be absent', () => {
    /*
     * A change against a baseline of zero has no percentage.
     *
     * Not `Infinity`, and above all not a large number: "expenses rose 12000%"
     * in front of someone whose expenses went from nothing to something is the
     * kind of sentence that costs the product its credibility on everything else
     * on the page.
     */
    const parsed = scenarioImpactSchema.parse({
      metricId: 'EXPENSES',
      baseline: 0,
      projected: 120_000,
      changeAbsolute: 120_000,
      changePercent: null,
    })

    expect(parsed.changePercent).toBeNull()
  })

  it('refuses a metric the graph does not define', () => {
    expect(() =>
      scenarioImpactSchema.parse({
        metricId: 'EBITDA_AJUSTADO',
        baseline: 1,
        projected: 2,
        changeAbsolute: 1,
        changePercent: 100,
      }),
    ).toThrow()
  })
})

describe('scenarioResultSchema', () => {
  const result = {
    id: UUID,
    organizationId: UUID,
    name: 'Perder a Vega Partners',
    type: 'CUSTOMER_LOSS' as const,
    basePeriod: '2026-07',
    currency: 'EUR',
    impacts: [
      {
        metricId: 'REVENUE',
        baseline: 1_000_000,
        projected: 750_000,
        changeAbsolute: -250_000,
        changePercent: -25,
      },
    ],
    assumptions: [
      { label: 'Model', value: 'Vega Partners SA leaves.', inferred: true },
    ],
    explanation: null,
    datasetVersion: 4,
    createdAt: '2026-08-18T10:30:00.000Z',
  }

  it('never carries a result without assumptions', () => {
    // §40: a projection with its assumptions out of sight is a number wearing
    // the air of certainty. The field is required, not optional.
    expect(() => scenarioResultSchema.parse({ ...result, assumptions: undefined })).toThrow()
  })

  it('allows the explanation to be missing, because the arithmetic does not need it', () => {
    // The AI narrates a result it did not produce. A scenario with no narration
    // is complete; one with no impacts is not.
    expect(scenarioResultSchema.parse(result).explanation).toBeNull()
  })

  it('pins the dataset the result was computed from', () => {
    /*
     * Without it, a scenario is unreproducible.
     *
     * The same question over a corrected import gives a different answer, and
     * "the same question always gives the same answer" only holds if the answer
     * says which data it was asked about.
     */
    expect(scenarioResultSchema.parse(result).datasetVersion).toBe(4)
  })
})

describe('forecastSchema', () => {
  const point = {
    period: '2026-08',
    scenario: 'BASE' as const,
    revenue: 1_000_000,
    expenses: 800_000,
    grossProfit: 600_000,
    cash: 2_000_000,
  }

  it('keeps every figure in whole cents', () => {
    // A fractional cent in a projection is a rounding argument in a board
    // meeting.
    expect(() => forecastPointSchema.parse({ ...point, revenue: 1_000_000.5 })).toThrow()
  })

  it('allows cash to be unknown without turning it into zero', () => {
    // A company with no bank feed has no cash series. "Cash falls to 0" is a
    // very different sentence from "we cannot see the cash".
    expect(forecastPointSchema.parse({ ...point, cash: null }).cash).toBeNull()
  })

  it('refuses a scenario band that is not one of the three', () => {
    expect(() => forecastPointSchema.parse({ ...point, scenario: 'MEDIO' })).toThrow()
  })

  it('requires the assumptions on the forecast as well', () => {
    expect(() =>
      forecastSchema.parse({
        organizationId: UUID,
        generatedFrom: '2026-07',
        horizonMonths: 12,
        currency: 'EUR',
        points: [point],
        history: [],
        datasetVersion: 4,
      }),
    ).toThrow()
  })

  it('refuses a forecast that arrives without the months it was fitted to', () => {
    /*
     * The projection is unreadable on its own.
     *
     * The trend is least squares over the whole window, weighing every month
     * the same, so it can start above the month that just happened. Whoever
     * reads the chart has to be able to see the join — and they can only see it
     * if the history travels with the projection. Making the field required is
     * what stops a future endpoint from quietly omitting it.
     */
    expect(() =>
      forecastSchema.parse({
        organizationId: UUID,
        generatedFrom: '2026-07',
        horizonMonths: 12,
        currency: 'EUR',
        points: [point],
        assumptions: [],
        datasetVersion: 4,
      }),
    ).toThrow()
  })
})
