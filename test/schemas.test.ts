import { describe, it, expect } from 'vitest'
import {
  dashboardSummarySchema,
  OVERVIEW_SECTIONS,
  overviewShapeSchema,
  varianceTreeSchema,
} from '../src/metrics.js'
import { createOpportunityInputSchema } from '../src/commercial.js'
import { aiAnswerSchema } from '../src/ai.js'
import { LOCALES, DATA_CLASSES, AI_RETENTION_POLICIES } from '../src/enums.js'
import { paginationQuerySchema } from '../src/api.js'
import { passwordSchema, PASSWORD_MIN_LENGTH, sessionUserSchema } from '../src/auth.js'
import { changeItemSchema, insightFilterSchema, insightSchema } from '../src/insight.js'

describe('varianceTreeSchema', () => {
  it('accepts the recursive tree from §24', () => {
    // "Why?" repeats itself: profit fell because of expenses, expenses because of
    // marketing, marketing because of three invoices. The schema has to survive
    // that recursion without a fixed depth.
    const tree = {
      label: 'Profit',
      metricId: 'OPERATING_PROFIT' as const,
      entityId: null,
      changeAbsolute: -42000_00,
      changePercent: -18.2,
      contributionPercent: 100,
      children: [
        {
          label: 'Expenses',
          metricId: 'EXPENSES' as const,
          entityId: null,
          changeAbsolute: 32000_00,
          changePercent: 12.4,
          contributionPercent: 76.2,
          children: [
            {
              label: 'Marketing',
              metricId: null,
              entityId: '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
              changeAbsolute: 21000_00,
              changePercent: 31,
              contributionPercent: 65.6,
              children: [],
            },
          ],
        },
      ],
    }
    expect(varianceTreeSchema.parse(tree).children[0]?.children[0]?.label).toBe('Marketing')
  })
})

/**
 * The Overview's composition, which until now nobody had ever parsed.
 *
 * It is what makes the dashboard's shape follow the business — the panel drops
 * the budget section when no budget was uploaded, and moves customers up when
 * one of them is worth 40% of the revenue. A shape nothing validates is a panel
 * that renders an unknown section name as an empty box, in front of a customer,
 * with nothing in any log.
 */
describe('overviewShapeSchema', () => {
  const shape = {
    metrics: ['REVENUE', 'GROSS_MARGIN', 'EBITDA'],
    sections: ['METRICS', 'WHAT_CHANGED', 'CUSTOMERS'],
    reasons: ['One customer is worth 41% of the revenue.'],
  }

  it('accepts a composition derived from the data', () => {
    const parsed = overviewShapeSchema.parse(shape)
    expect(parsed.sections).toEqual(['METRICS', 'WHAT_CHANGED', 'CUSTOMERS'])
  })

  it('refuses a section the panel cannot render', () => {
    // The failure without this is silent: an unknown name renders as nothing,
    // and the Overview quietly loses a block.
    expect(() =>
      overviewShapeSchema.parse({ ...shape, sections: ['METRICS', 'FORECAST'] }),
    ).toThrow()
  })

  it('refuses a metric the graph does not define', () => {
    expect(() =>
      overviewShapeSchema.parse({ ...shape, metrics: ['REVENUE', 'NET_MARGIN_TYPO'] }),
    ).toThrow()
  })

  it('accepts an empty composition without inventing a default', () => {
    // An organization with nothing imported has no shape to derive. Empty is the
    // honest answer, and the panel falls back to the fixed order.
    expect(overviewShapeSchema.parse({ metrics: [], sections: [], reasons: [] }).reasons).toEqual([])
  })

  it('carries the reasons, which is what stops a moving panel reading as instability', () => {
    // §66: the sections change with the business. Without `reasons`, a customer
    // whose dashboard rearranged itself has no way to know it was deliberate.
    expect(overviewShapeSchema.parse(shape).reasons[0]).toContain('41%')
  })

  it('names every section the product knows how to draw', () => {
    // Pins the list: adding a section to the enum without teaching the panel to
    // draw it is the same silent empty box, arriving from the other direction.
    expect([...OVERVIEW_SECTIONS]).toEqual([
      'METRICS',
      'WHAT_CHANGED',
      'ALERTS',
      'TRENDS',
      'CUSTOMERS',
      'CATEGORIES',
      'BUDGET',
      'TREASURY',
    ])
  })
})

describe('dashboardSummarySchema', () => {
  const summary = {
    period: '2026-07',
    comparePeriod: '2026-06',
    currency: 'EUR',
    datasetVersion: 4,
    metrics: [
      {
        metricId: 'GROSS_MARGIN',
        period: '2026-07',
        unit: 'PERCENT',
        value: null,
        currency: null,
        delta: null,
        datasetVersion: 4,
      },
    ],
  }

  it('keeps the shape optional, so an older backend stays valid', () => {
    // The field arrived later than the rest. Required, it would have made every
    // deployed backend invalid the moment the contract was bumped.
    expect(dashboardSummarySchema.parse(summary).shape).toBeUndefined()
  })

  it('validates the shape when it is there', () => {
    expect(() =>
      dashboardSummarySchema.parse({ ...summary, shape: { metrics: [], sections: ['X'], reasons: [] } }),
    ).toThrow()
  })

  it('lets a metric be uncalculable without turning it into zero', () => {
    // A margin with no revenue has no basis to exist. "0.0%" in front of a CFO
    // whose month was profitable is asserting a false fact about their company.
    expect(dashboardSummarySchema.parse(summary).metrics[0]?.value).toBeNull()
  })
})

describe('createOpportunityInputSchema', () => {
  it('requires a customer or a lead', () => {
    // An orphan opportunity cannot be confronted with real revenue, which is the
    // only reason for the CRM to live inside a financial product.
    expect(() =>
      createOpportunityInputSchema.parse({ title: 'Renovação', valueCents: 500000 }),
    ).toThrow()
  })

  it('accepts one with a customer', () => {
    const o = createOpportunityInputSchema.parse({
      customerId: '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
      title: 'Renovação',
      valueCents: 500000,
    })
    expect(o.probability).toBe(50)
    expect(o.stage).toBe('DISCOVERY')
  })

  it('rejects a probability outside 0–100', () => {
    expect(() =>
      createOpportunityInputSchema.parse({
        leadId: '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
        title: 'x',
        valueCents: 1,
        probability: 120,
      }),
    ).toThrow()
  })
})

describe('aiAnswerSchema', () => {
  it('requires an explicit insufficientData', () => {
    // §21 forces the AI to say when the data is not enough, instead of filling the
    // gap with something plausible. A required field is what makes that structural
    // rather than dependent on the prompt.
    const base = {
      answer: 'A margem caiu 3,2pp.',
      keyPoints: [],
      evidence: [],
      calculations: [],
      assumptions: [],
      recommendations: [],
      followUpQuestions: [],
    }
    expect(() => aiAnswerSchema.parse(base)).toThrow()
    expect(aiAnswerSchema.parse({ ...base, insufficientData: false }).insufficientData).toBe(false)
  })

  it('makes every keyPoint declare the kind of claim it is', () => {
    // Separating fact from inference (§20) is what stops a plausible guess from
    // inheriting the authority of an audited figure.
    expect(() =>
      aiAnswerSchema.parse({
        answer: 'x',
        keyPoints: [{ text: 'A receita caiu', evidenceId: null }],
        evidence: [],
        calculations: [],
        assumptions: [],
        recommendations: [],
        followUpQuestions: [],
        insufficientData: false,
      }),
    ).toThrow()
  })

  const answerCiting = (evidenceId: string | null) => ({
    answer: 'x',
    keyPoints: [{ type: 'FACT' as const, text: 'O valor mensal é 45.000,00 EUR.', evidenceId }],
    evidence: [],
    calculations: [],
    assumptions: [],
    recommendations: [],
    followUpQuestions: [],
    insufficientData: false,
  })

  it('accepts a citation to evidence the engine built', () => {
    expect(() =>
      aiAnswerSchema.parse(answerCiting('3f2504e0-4f89-41d3-9a0c-0305e82c3301')),
    ).not.toThrow()
  })

  it('accepts a citation to a line of an attached document', () => {
    /*
     * The shape that used to be refused, and the refusal was invisible.
     *
     * The server extracts values from attachments and anchors each to its line,
     * and the anti-hallucination guard accepts them. With `evidenceId` declared
     * as a uuid, every answer that quoted a contract failed to parse **before**
     * the guard ever ran — a legitimate citation, a real extraction, and a
     * contract that said the wrong thing.
     */
    expect(() =>
      aiAnswerSchema.parse(answerCiting('doc:3f2504e0-4f89-41d3-9a0c-0305e82c3301:6')),
    ).not.toThrow()
  })

  it('accepts a citation to a document as a whole', () => {
    // A claim about what a clause says has no line of figures behind it.
    expect(() =>
      aiAnswerSchema.parse(answerCiting('doc:3f2504e0-4f89-41d3-9a0c-0305e82c3301')),
    ).not.toThrow()
  })

  it('still refuses anything that is neither', () => {
    // The id reaches the server from a model's answer and leaves in a URL. Two
    // shapes are described; a third is an invention, and an invented citation is
    // exactly what §21 exists to erase.
    expect(() => aiAnswerSchema.parse(answerCiting('doc:../../etc/passwd'))).toThrow()
    expect(() => aiAnswerSchema.parse(answerCiting('REVENUE:2026-08'))).toThrow()
    expect(() => aiAnswerSchema.parse(answerCiting('doc:not-a-uuid:6'))).toThrow()
  })
})

describe('locales', () => {
  it('treats European and Brazilian Portuguese as distinct locales', () => {
    // facturação/faturamento, IVA/ICMS, tesouraria/caixa. A single translation
    // sounds foreign in both markets.
    expect(LOCALES).toContain('pt-PT')
    expect(LOCALES).toContain('pt-BR')
  })

  it('covers the four initial markets', () => {
    expect([...LOCALES].sort()).toEqual(['en', 'es', 'pt-BR', 'pt-PT'])
  })
})

describe('paginationQuerySchema', () => {
  it('caps the requested limit', () => {
    // Without a cap, a client asks for limit=1000000 and turns a listing into an
    // accidental export of the database.
    expect(() => paginationQuerySchema.parse({ limit: 5000 })).toThrow()
  })

  it('defaults to 50', () => {
    expect(paginationQuerySchema.parse({}).limit).toBe(50)
  })

  it('accepts a limit arriving as a query string', () => {
    expect(paginationQuerySchema.parse({ limit: '25' }).limit).toBe(25)
  })
})

describe('passwordSchema', () => {
  it(`requires ${PASSWORD_MIN_LENGTH} characters`, () => {
    // Length instead of the "one capital and one symbol" theatre, which pushes
    // people to Password1! and has been advised against by NIST for years.
    expect(() => passwordSchema.parse('curta1!')).toThrow()
    expect(passwordSchema.parse('uma frase razoavelmente longa')).toBeTruthy()
  })
})

describe('sessionUserSchema', () => {
  it('has nowhere to carry a secret', () => {
    // This object goes to the frontend and into client state. A hash or token
    // field here would be a leak with the appearance of a feature.
    const keys = Object.keys(sessionUserSchema.shape)
    for (const forbidden of ['password', 'passwordHash', 'refreshToken', 'apiKey']) {
      expect(keys).not.toContain(forbidden)
    }
  })
})

describe('data classification', () => {
  it('keeps the four classes', () => {
    // Feeds the logger redaction list, the encryption and what reaches the AI.
    expect([...DATA_CLASSES]).toEqual(['S0', 'S1', 'S2', 'S3'])
  })

  it('allows for the provider that trains on API data', () => {
    // Plugging in the wrong key puts customer data into a training corpus, and
    // that cannot be undone. It has to be representable so the UI can flag it
    // before use.
    expect(AI_RETENTION_POLICIES).toContain('TRAINS_ON_DATA')
    expect(AI_RETENTION_POLICIES).toContain('UNKNOWN')
  })
})

describe('insightSchema', () => {
  const insight = {
    id: '3f1e4d5c-6b7a-4980-9a1b-2c3d4e5f6a7b',
    type: 'CUSTOMER_DECLINE',
    severity: 'CRITICAL',
    period: '2026-08',
    titleKey: 'insights.CUSTOMER_DECLINE.title',
    descriptionKey: 'insights.CUSTOMER_DECLINE.bodyVsMarket',
    params: { name: 'Vega Partners SA', percent: 40.4, names: ['Vega Partners SA'] },
    metricId: 'REVENUE',
    entityId: '6dcd7b0f-09f6-4088-baad-beb3c4a89f3a',
    dimension: 'customer',
    supportingData: { previous: 26_740_000, current: 15_940_000 },
    evidence: null,
    dismissedAt: null,
    datasetVersion: 1,
    createdAt: '2026-08-09T15:00:00.000Z',
  }

  it('carries translation keys, not sentences', () => {
    // Translating on the server would force a second catalogue in four languages.
    // The detector decides what is anomalous; the frontend does the wording.
    const parsed = insightSchema.parse(insight)
    expect(parsed.titleKey).toContain('.')
    expect(Object.keys(insightSchema.shape)).not.toContain('title')
    expect(Object.keys(insightSchema.shape)).not.toContain('description')
  })

  it('accepts a list of names as an array, not already joined', () => {
    // The list separator changes with the language — " e ", " y ", comma before
    // the "and". Joining it on the server would be writing Portuguese into the API.
    const parsed = insightSchema.parse(insight)
    expect(parsed.params.names).toEqual(['Vega Partners SA'])
  })

  it('keeps the address of the proof, which is also where the click goes', () => {
    // If the evidence panel showed rows other than the ones the click opens, the
    // product would be lying in the very place where it promises not to.
    const parsed = insightSchema.parse(insight)
    expect(parsed.metricId).toBe('REVENUE')
    expect(parsed.dimension).toBe('customer')
    expect(parsed.entityId).toBeTruthy()
  })

  it('does not repeat the tenant on every row', () => {
    // The organization is implicit in the session and the client cannot choose it.
    expect(Object.keys(insightSchema.shape)).not.toContain('organizationId')
  })

  it('refuses an insight without a known severity', () => {
    expect(() => insightSchema.parse({ ...insight, severity: 'URGENTE' })).toThrow()
  })
})

describe('insightFilterSchema', () => {
  it('reads "false" as false', () => {
    // `z.coerce.boolean()` would do `Boolean("false")`, which is `true`. A trap
    // already paid for once in this project.
    expect(insightFilterSchema.parse({ includeDismissed: 'false' }).includeDismissed).toBe(false)
    expect(insightFilterSchema.parse({ includeDismissed: 'true' }).includeDismissed).toBe(true)
    expect(insightFilterSchema.parse({}).includeDismissed).toBe(false)
  })
})

describe('changeItemSchema', () => {
  it('separates percentage points from percentage', () => {
    // A margin of 40% that becomes 42% rose 2pp. Saying "+5%" is true about the
    // ratio and misleading about the business — the commonest confusion in
    // financial reports, and the one this product cannot make.
    const margin = changeItemSchema.parse({
      metricId: 'GROSS_MARGIN',
      unit: 'PERCENT',
      current: 58.5,
      changeAbsolute: -2.4,
      changePercent: null,
      changePoints: -2.4,
      direction: 'down',
      sentiment: 'negative',
    })
    expect(margin.changePercent).toBeNull()
    expect(margin.changePoints).toBe(-2.4)
  })
})
