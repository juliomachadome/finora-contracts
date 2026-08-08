import { describe, it, expect } from 'vitest'
import { varianceTreeSchema } from '../src/metrics.js'
import { createOpportunityInputSchema } from '../src/commercial.js'
import { aiAnswerSchema } from '../src/ai.js'
import { LOCALES, DATA_CLASSES, AI_RETENTION_POLICIES } from '../src/enums.js'
import { paginationQuerySchema } from '../src/api.js'
import { passwordSchema, PASSWORD_MIN_LENGTH, sessionUserSchema } from '../src/auth.js'

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
