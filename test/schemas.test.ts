import { describe, it, expect } from 'vitest'
import { varianceTreeSchema } from '../src/metrics.js'
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
      actual: 58.5,
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
