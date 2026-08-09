import { describe, it, expect } from 'vitest'
import { varianceTreeSchema } from '../src/metrics.js'
import { createOpportunityInputSchema } from '../src/commercial.js'
import { aiAnswerSchema } from '../src/ai.js'
import { LOCALES, DATA_CLASSES, AI_RETENTION_POLICIES } from '../src/enums.js'
import { paginationQuerySchema } from '../src/api.js'
import { passwordSchema, PASSWORD_MIN_LENGTH, sessionUserSchema } from '../src/auth.js'
import { changeItemSchema, insightFilterSchema, insightSchema } from '../src/insight.js'

describe('varianceTreeSchema', () => {
  it('aceita a árvore recursiva do §24', () => {
    // "Porquê?" repete-se: o lucro caiu por causa das despesas, as despesas por
    // causa do marketing, o marketing por causa de três facturas. O schema tem de
    // aguentar essa recursão sem profundidade fixa.
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
  it('exige cliente ou lead', () => {
    // Uma oportunidade órfã não se consegue confrontar com receita real, que é a
    // única razão para o CRM viver dentro de um produto financeiro.
    expect(() =>
      createOpportunityInputSchema.parse({ title: 'Renovação', valueCents: 500000 }),
    ).toThrow()
  })

  it('aceita com cliente', () => {
    const o = createOpportunityInputSchema.parse({
      customerId: '3f1b2c4d-5e6f-4a7b-8c9d-0e1f2a3b4c5d',
      title: 'Renovação',
      valueCents: 500000,
    })
    expect(o.probability).toBe(50)
    expect(o.stage).toBe('DISCOVERY')
  })

  it('rejeita probabilidade fora de 0–100', () => {
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
  it('exige insufficientData explícito', () => {
    // O §21 obriga a IA a dizer quando os dados não chegam, em vez de preencher o
    // vazio com algo plausível. Campo obrigatório é o que torna isso estrutural
    // em vez de dependente do prompt.
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

  it('obriga cada keyPoint a declarar o tipo de afirmação', () => {
    // Separar facto de inferência (§20) é o que impede uma suposição plausível de
    // herdar a autoridade de um dado auditado.
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
  it('trata português de Portugal e do Brasil como locales distintos', () => {
    // facturação/faturamento, IVA/ICMS, tesouraria/caixa. Uma tradução só soa a
    // estrangeiro nos dois mercados.
    expect(LOCALES).toContain('pt-PT')
    expect(LOCALES).toContain('pt-BR')
  })

  it('cobre os quatro mercados iniciais', () => {
    expect([...LOCALES].sort()).toEqual(['en', 'es', 'pt-BR', 'pt-PT'])
  })
})

describe('paginationQuerySchema', () => {
  it('impõe tecto ao limite pedido', () => {
    // Sem tecto, um cliente pede limit=1000000 e transforma uma listagem numa
    // exportação acidental da base.
    expect(() => paginationQuerySchema.parse({ limit: 5000 })).toThrow()
  })

  it('assume 50 por omissão', () => {
    expect(paginationQuerySchema.parse({}).limit).toBe(50)
  })

  it('aceita limite vindo como string de query', () => {
    expect(paginationQuerySchema.parse({ limit: '25' }).limit).toBe(25)
  })
})

describe('passwordSchema', () => {
  it(`exige ${PASSWORD_MIN_LENGTH} caracteres`, () => {
    // Comprimento em vez do teatro de "uma maiúscula e um símbolo", que empurra
    // para Password1! e é desaconselhado pelo NIST há anos.
    expect(() => passwordSchema.parse('curta1!')).toThrow()
    expect(passwordSchema.parse('uma frase razoavelmente longa')).toBeTruthy()
  })
})

describe('sessionUserSchema', () => {
  it('não tem onde transportar segredo', () => {
    // Este objecto vai para o frontend e para o estado do cliente. Um campo de
    // hash ou token aqui seria fuga com aparência de funcionalidade.
    const chaves = Object.keys(sessionUserSchema.shape)
    for (const proibida of ['password', 'passwordHash', 'refreshToken', 'apiKey']) {
      expect(chaves).not.toContain(proibida)
    }
  })
})

describe('classificação de dados', () => {
  it('mantém as quatro classes', () => {
    // Alimenta a lista de redacção do logger, a cifragem e o que chega à IA.
    expect([...DATA_CLASSES]).toEqual(['S0', 'S1', 'S2', 'S3'])
  })

  it('prevê o caso do provider que treina com dados da API', () => {
    // Ligar a chave errada põe dados de cliente num corpus de treino, e isso não
    // se desfaz. Tem de ser representável para a UI sinalizar antes do uso.
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

  it('transporta chaves de tradução, não frases', () => {
    // Traduzir no servidor obrigava-o a um segundo catálogo em quatro idiomas.
    // O detector decide o que é anómalo; quem redige é o frontend.
    const parsed = insightSchema.parse(insight)
    expect(parsed.titleKey).toContain('.')
    expect(Object.keys(insightSchema.shape)).not.toContain('title')
    expect(Object.keys(insightSchema.shape)).not.toContain('description')
  })

  it('aceita uma lista de nomes como array, e não já unida', () => {
    // O separador de lista muda com o idioma — " e ", " y ", vírgula antes do
    // "and". Uni-la no servidor seria escrever português na API.
    const parsed = insightSchema.parse(insight)
    expect(parsed.params.names).toEqual(['Vega Partners SA'])
  })

  it('guarda o endereço da prova, que é também o destino do clique', () => {
    // Se o painel de evidência mostrasse linhas diferentes das que o clique
    // abre, o produto estaria a mentir no sítio onde promete não mentir.
    const parsed = insightSchema.parse(insight)
    expect(parsed.metricId).toBe('REVENUE')
    expect(parsed.dimension).toBe('customer')
    expect(parsed.entityId).toBeTruthy()
  })

  it('não repete o tenant em cada linha', () => {
    // A organização é implícita na sessão e o cliente não pode escolhê-la.
    expect(Object.keys(insightSchema.shape)).not.toContain('organizationId')
  })

  it('recusa um insight sem gravidade conhecida', () => {
    expect(() => insightSchema.parse({ ...insight, severity: 'URGENTE' })).toThrow()
  })
})

describe('insightFilterSchema', () => {
  it('lê "false" como falso', () => {
    // `z.coerce.boolean()` faria `Boolean("false")`, que é `true`. Armadilha já
    // paga uma vez neste projecto.
    expect(insightFilterSchema.parse({ includeDismissed: 'false' }).includeDismissed).toBe(false)
    expect(insightFilterSchema.parse({ includeDismissed: 'true' }).includeDismissed).toBe(true)
    expect(insightFilterSchema.parse({}).includeDismissed).toBe(false)
  })
})

describe('changeItemSchema', () => {
  it('separa pontos percentuais de percentagem', () => {
    // Uma margem de 40% que passa a 42% subiu 2pp. Dizer "+5%" é verdade sobre o
    // rácio e enganador sobre o negócio — a confusão mais comum em relatórios
    // financeiros, e a que este produto não pode cometer.
    const margem = changeItemSchema.parse({
      metricId: 'GROSS_MARGIN',
      unit: 'PERCENT',
      actual: 58.5,
      changeAbsolute: -2.4,
      changePercent: null,
      changePoints: -2.4,
      direction: 'down',
      sentiment: 'negative',
    })
    expect(margem.changePercent).toBeNull()
    expect(margem.changePoints).toBe(-2.4)
  })
})
