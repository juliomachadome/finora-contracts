import { z } from 'zod';

/**
 * Enums partilhados entre a API e o frontend.
 *
 * Cada um existe como array `const` (para iterar na UI e alimentar o Prisma) e
 * como schema Zod (para validar na fronteira). O tipo sai do Zod, nunca escrito
 * à mão — assim não há hipótese de o tipo e a validação divergirem.
 */
declare const ROLES: readonly ["OWNER", "ADMIN", "CFO", "FINANCE_MANAGER", "ANALYST", "VIEWER", "AUDITOR"];
declare const roleSchema: z.ZodEnum<{
    OWNER: "OWNER";
    ADMIN: "ADMIN";
    CFO: "CFO";
    FINANCE_MANAGER: "FINANCE_MANAGER";
    ANALYST: "ANALYST";
    VIEWER: "VIEWER";
    AUDITOR: "AUDITOR";
}>;
type Role = z.infer<typeof roleSchema>;
declare const PERMISSIONS: readonly ["upload_data", "delete_data", "view_financials", "ask_ai", "run_scenarios", "export_reports", "manage_billing", "manage_ai", "manage_users", "view_audit_logs", "view_crm", "manage_crm"];
declare const permissionSchema: z.ZodEnum<{
    upload_data: "upload_data";
    delete_data: "delete_data";
    view_financials: "view_financials";
    ask_ai: "ask_ai";
    run_scenarios: "run_scenarios";
    export_reports: "export_reports";
    manage_billing: "manage_billing";
    manage_ai: "manage_ai";
    manage_users: "manage_users";
    view_audit_logs: "view_audit_logs";
    view_crm: "view_crm";
    manage_crm: "manage_crm";
}>;
type Permission = z.infer<typeof permissionSchema>;
/**
 * Permissões por papel.
 *
 * Vive nos contratos, e não só no backend, porque o frontend precisa de esconder
 * o que o utilizador não pode fazer. O backend continua a ser quem decide: isto
 * é conveniência de UI, nunca autorização (§71 — autorização é sempre no
 * servidor).
 */
declare const ROLE_PERMISSIONS: Readonly<Record<Role, readonly Permission[]>>;
declare const DATA_SOURCE_KINDS: readonly ["FILE_UPLOAD", "XERO", "QUICKBOOKS", "SAGE", "PRIMAVERA", "PHC", "OMIE", "CONTA_AZUL", "SAP", "ORACLE", "NETSUITE", "STRIPE", "SHOPIFY", "HUBSPOT", "SALESFORCE", "OPEN_BANKING"];
declare const dataSourceKindSchema: z.ZodEnum<{
    FILE_UPLOAD: "FILE_UPLOAD";
    XERO: "XERO";
    QUICKBOOKS: "QUICKBOOKS";
    SAGE: "SAGE";
    PRIMAVERA: "PRIMAVERA";
    PHC: "PHC";
    OMIE: "OMIE";
    CONTA_AZUL: "CONTA_AZUL";
    SAP: "SAP";
    ORACLE: "ORACLE";
    NETSUITE: "NETSUITE";
    STRIPE: "STRIPE";
    SHOPIFY: "SHOPIFY";
    HUBSPOT: "HUBSPOT";
    SALESFORCE: "SALESFORCE";
    OPEN_BANKING: "OPEN_BANKING";
}>;
type DataSourceKind = z.infer<typeof dataSourceKindSchema>;
declare const CONNECTOR_CAPABILITIES: readonly ["OAUTH", "INCREMENTAL_SYNC", "WEBHOOK", "BACKFILL"];
declare const connectorCapabilitySchema: z.ZodEnum<{
    OAUTH: "OAUTH";
    INCREMENTAL_SYNC: "INCREMENTAL_SYNC";
    WEBHOOK: "WEBHOOK";
    BACKFILL: "BACKFILL";
}>;
type ConnectorCapability = z.infer<typeof connectorCapabilitySchema>;
declare const IMPORT_STATES: readonly ["UPLOADED", "PROCESSING", "MAPPING_REQUIRED", "NORMALIZING", "VALIDATING", "COMPLETED", "FAILED"];
declare const importStateSchema: z.ZodEnum<{
    UPLOADED: "UPLOADED";
    PROCESSING: "PROCESSING";
    MAPPING_REQUIRED: "MAPPING_REQUIRED";
    NORMALIZING: "NORMALIZING";
    VALIDATING: "VALIDATING";
    COMPLETED: "COMPLETED";
    FAILED: "FAILED";
}>;
type ImportState = z.infer<typeof importStateSchema>;
declare const IMPORT_TRIGGERS: readonly ["MANUAL_UPLOAD", "SCHEDULED_SYNC", "WEBHOOK"];
declare const importTriggerSchema: z.ZodEnum<{
    WEBHOOK: "WEBHOOK";
    MANUAL_UPLOAD: "MANUAL_UPLOAD";
    SCHEDULED_SYNC: "SCHEDULED_SYNC";
}>;
type ImportTrigger = z.infer<typeof importTriggerSchema>;
declare const DATA_QUALITY_ISSUE_TYPES: readonly ["MISSING_CATEGORY", "MISSING_CUSTOMER", "DUPLICATE_TRANSACTION", "INVALID_DATE", "INVALID_AMOUNT", "INCONSISTENT_CURRENCY", "UNMAPPED_COLUMN", "SUSPECTED_PAYROLL"];
declare const dataQualityIssueTypeSchema: z.ZodEnum<{
    MISSING_CATEGORY: "MISSING_CATEGORY";
    MISSING_CUSTOMER: "MISSING_CUSTOMER";
    DUPLICATE_TRANSACTION: "DUPLICATE_TRANSACTION";
    INVALID_DATE: "INVALID_DATE";
    INVALID_AMOUNT: "INVALID_AMOUNT";
    INCONSISTENT_CURRENCY: "INCONSISTENT_CURRENCY";
    UNMAPPED_COLUMN: "UNMAPPED_COLUMN";
    SUSPECTED_PAYROLL: "SUSPECTED_PAYROLL";
}>;
type DataQualityIssueType = z.infer<typeof dataQualityIssueTypeSchema>;
declare const TRANSACTION_TYPES: readonly ["REVENUE", "EXPENSE", "BANK"];
declare const transactionTypeSchema: z.ZodEnum<{
    REVENUE: "REVENUE";
    EXPENSE: "EXPENSE";
    BANK: "BANK";
}>;
type TransactionType = z.infer<typeof transactionTypeSchema>;
declare const PERIOD_GRANULARITIES: readonly ["MONTH", "QUARTER", "YEAR"];
declare const periodGranularitySchema: z.ZodEnum<{
    MONTH: "MONTH";
    QUARTER: "QUARTER";
    YEAR: "YEAR";
}>;
type PeriodGranularity = z.infer<typeof periodGranularitySchema>;
declare const INSIGHT_TYPES: readonly ["REVENUE_DECLINE", "EXPENSE_SPIKE", "MARGIN_DETERIORATION", "CUSTOMER_DECLINE", "CUSTOMER_CONCENTRATION", "BUDGET_OVERRUN", "CASH_RISK"];
declare const insightTypeSchema: z.ZodEnum<{
    REVENUE_DECLINE: "REVENUE_DECLINE";
    EXPENSE_SPIKE: "EXPENSE_SPIKE";
    MARGIN_DETERIORATION: "MARGIN_DETERIORATION";
    CUSTOMER_DECLINE: "CUSTOMER_DECLINE";
    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
    BUDGET_OVERRUN: "BUDGET_OVERRUN";
    CASH_RISK: "CASH_RISK";
}>;
type InsightType = z.infer<typeof insightTypeSchema>;
declare const SEVERITIES: readonly ["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"];
declare const severitySchema: z.ZodEnum<{
    INFO: "INFO";
    LOW: "LOW";
    MEDIUM: "MEDIUM";
    HIGH: "HIGH";
    CRITICAL: "CRITICAL";
}>;
type Severity = z.infer<typeof severitySchema>;
declare const AI_PROVIDER_KINDS: readonly ["mock", "openai-compatible", "gemini", "anthropic"];
declare const aiProviderKindSchema: z.ZodEnum<{
    mock: "mock";
    "openai-compatible": "openai-compatible";
    gemini: "gemini";
    anthropic: "anthropic";
}>;
type AIProviderKind = z.infer<typeof aiProviderKindSchema>;
/**
 * Tarefas com routing independente (§16).
 *
 * Cada uma resolve o seu provider e modelo, para dar análise rápida num modelo
 * barato e raciocínio pesado num caro sem trocar de fornecedor à mão. Trocar
 * silenciosamente para um provider não autorizado é proibido pelo §16.
 */
declare const AI_TASKS: readonly ["FAST_ANALYSIS", "COMPLEX_REASONING", "DOCUMENT_EXTRACTION", "EMBEDDINGS", "EXECUTIVE_SUMMARY"];
declare const aiTaskSchema: z.ZodEnum<{
    FAST_ANALYSIS: "FAST_ANALYSIS";
    COMPLEX_REASONING: "COMPLEX_REASONING";
    DOCUMENT_EXTRACTION: "DOCUMENT_EXTRACTION";
    EMBEDDINGS: "EMBEDDINGS";
    EXECUTIVE_SUMMARY: "EXECUTIVE_SUMMARY";
}>;
type AITask = z.infer<typeof aiTaskSchema>;
/**
 * Tipo de afirmação numa resposta de IA (§20).
 *
 * Separar facto de inferência não é cosmético: é o que permite ao utilizador
 * saber o que pode levar a uma reunião e o que tem de confirmar primeiro.
 */
declare const AI_RESPONSE_TYPES: readonly ["FACT", "CALCULATION", "INFERENCE", "RECOMMENDATION"];
declare const aiResponseTypeSchema: z.ZodEnum<{
    FACT: "FACT";
    CALCULATION: "CALCULATION";
    INFERENCE: "INFERENCE";
    RECOMMENDATION: "RECOMMENDATION";
}>;
type AIResponseType = z.infer<typeof aiResponseTypeSchema>;
/**
 * Política de retenção do endpoint de IA configurado.
 *
 * Existe porque alguns providers treinam com dados da API consoante o tier, e
 * uma chave mal escolhida põe dados financeiros de cliente num corpus de treino
 * — o que não se desfaz. A UI sinaliza antes do uso, não depois.
 */
declare const AI_RETENTION_POLICIES: readonly ["ZERO_RETENTION", "RETAINED_NO_TRAINING", "TRAINS_ON_DATA", "UNKNOWN"];
declare const aiRetentionPolicySchema: z.ZodEnum<{
    ZERO_RETENTION: "ZERO_RETENTION";
    RETAINED_NO_TRAINING: "RETAINED_NO_TRAINING";
    TRAINS_ON_DATA: "TRAINS_ON_DATA";
    UNKNOWN: "UNKNOWN";
}>;
type AIRetentionPolicy = z.infer<typeof aiRetentionPolicySchema>;
declare const CUSTOMER_STATUSES: readonly ["PROSPECT", "ACTIVE", "AT_RISK", "CHURNED"];
declare const customerStatusSchema: z.ZodEnum<{
    PROSPECT: "PROSPECT";
    ACTIVE: "ACTIVE";
    AT_RISK: "AT_RISK";
    CHURNED: "CHURNED";
}>;
type CustomerStatus = z.infer<typeof customerStatusSchema>;
declare const LEAD_STATUSES: readonly ["NEW", "CONTACTED", "QUALIFIED", "DISQUALIFIED", "CONVERTED"];
declare const leadStatusSchema: z.ZodEnum<{
    NEW: "NEW";
    CONTACTED: "CONTACTED";
    QUALIFIED: "QUALIFIED";
    DISQUALIFIED: "DISQUALIFIED";
    CONVERTED: "CONVERTED";
}>;
type LeadStatus = z.infer<typeof leadStatusSchema>;
declare const OPPORTUNITY_STAGES: readonly ["DISCOVERY", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];
declare const opportunityStageSchema: z.ZodEnum<{
    DISCOVERY: "DISCOVERY";
    PROPOSAL: "PROPOSAL";
    NEGOTIATION: "NEGOTIATION";
    WON: "WON";
    LOST: "LOST";
}>;
type OpportunityStage = z.infer<typeof opportunityStageSchema>;
declare const ACTIVITY_TYPES: readonly ["NOTE", "CALL", "EMAIL", "MEETING", "TASK"];
declare const activityTypeSchema: z.ZodEnum<{
    NOTE: "NOTE";
    CALL: "CALL";
    EMAIL: "EMAIL";
    MEETING: "MEETING";
    TASK: "TASK";
}>;
type ActivityType = z.infer<typeof activityTypeSchema>;
declare const SCENARIO_TYPES: readonly ["REVENUE_CHANGE", "EXPENSE_CHANGE", "HIRING", "CUSTOMER_LOSS", "PRICE_CHANGE"];
declare const scenarioTypeSchema: z.ZodEnum<{
    REVENUE_CHANGE: "REVENUE_CHANGE";
    EXPENSE_CHANGE: "EXPENSE_CHANGE";
    HIRING: "HIRING";
    CUSTOMER_LOSS: "CUSTOMER_LOSS";
    PRICE_CHANGE: "PRICE_CHANGE";
}>;
type ScenarioType = z.infer<typeof scenarioTypeSchema>;
declare const FORECAST_SCENARIOS: readonly ["BASE", "UPSIDE", "DOWNSIDE"];
declare const forecastScenarioSchema: z.ZodEnum<{
    BASE: "BASE";
    UPSIDE: "UPSIDE";
    DOWNSIDE: "DOWNSIDE";
}>;
type ForecastScenario = z.infer<typeof forecastScenarioSchema>;
declare const EXPORT_FORMATS: readonly ["CSV", "XLSX", "PDF"];
declare const exportFormatSchema: z.ZodEnum<{
    CSV: "CSV";
    XLSX: "XLSX";
    PDF: "PDF";
}>;
type ExportFormat = z.infer<typeof exportFormatSchema>;
declare const PLAN_TIERS: readonly ["STARTER", "GROWTH", "BUSINESS", "ENTERPRISE"];
declare const planTierSchema: z.ZodEnum<{
    STARTER: "STARTER";
    GROWTH: "GROWTH";
    BUSINESS: "BUSINESS";
    ENTERPRISE: "ENTERPRISE";
}>;
type PlanTier = z.infer<typeof planTierSchema>;
declare const SUBSCRIPTION_STATUSES: readonly ["TRIALING", "ACTIVE", "PAST_DUE", "CANCELED", "INCOMPLETE"];
declare const subscriptionStatusSchema: z.ZodEnum<{
    ACTIVE: "ACTIVE";
    TRIALING: "TRIALING";
    PAST_DUE: "PAST_DUE";
    CANCELED: "CANCELED";
    INCOMPLETE: "INCOMPLETE";
}>;
type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>;
declare const PAYMENT_PROVIDERS: readonly ["mock", "stripe", "openpix"];
declare const paymentProviderSchema: z.ZodEnum<{
    mock: "mock";
    stripe: "stripe";
    openpix: "openpix";
}>;
type PaymentProviderKind = z.infer<typeof paymentProviderSchema>;
/**
 * Português são dois locales, não um.
 *
 * O vocabulário financeiro diverge a sério entre Portugal e Brasil —
 * facturação/faturamento, IVA/ICMS, tesouraria/caixa — e servir os dois
 * mercados com uma tradução só soa a estrangeiro nos dois lados.
 */
declare const LOCALES: readonly ["pt-PT", "pt-BR", "es", "en"];
declare const localeSchema: z.ZodEnum<{
    "pt-PT": "pt-PT";
    "pt-BR": "pt-BR";
    es: "es";
    en: "en";
}>;
type Locale = z.infer<typeof localeSchema>;
declare const DEFAULT_LOCALE: Locale;
/**
 * Sensibilidade do dado, aplicada em código e não só em documento
 * (`docs/SEGURANCA_E_PRIVACIDADE.md`).
 *
 * Alimenta a lista de redacção do logger, a decisão de cifrar em repouso e o
 * que pode chegar a um provider de IA.
 *
 *   S3  chaves e credenciais       nunca em log, nunca ao frontend, nunca à IA
 *   S2  ficheiros, linhas, payroll cifrado, redigido, à IA só por ferramenta
 *   S1  métricas e nomes           escopo de tenant, valores fora do log
 *   S0  contagens e latências      pode alimentar telemetria
 */
declare const DATA_CLASSES: readonly ["S0", "S1", "S2", "S3"];
declare const dataClassSchema: z.ZodEnum<{
    S0: "S0";
    S1: "S1";
    S2: "S2";
    S3: "S3";
}>;
type DataClass = z.infer<typeof dataClassSchema>;
declare const AUDIT_ACTIONS: readonly ["USER_LOGIN", "USER_LOGOUT", "USER_INVITED", "USER_ROLE_CHANGED", "DATA_UPLOADED", "DATA_DELETED", "MAPPING_CHANGED", "DATA_CORRECTED", "AI_REQUESTED", "REPORT_GENERATED", "DATA_EXPORTED", "SCENARIO_RUN", "BILLING_CHANGED", "AI_PROVIDER_CONFIGURED", "ORGANIZATION_SETTINGS_CHANGED"];
declare const auditActionSchema: z.ZodEnum<{
    USER_LOGIN: "USER_LOGIN";
    USER_LOGOUT: "USER_LOGOUT";
    USER_INVITED: "USER_INVITED";
    USER_ROLE_CHANGED: "USER_ROLE_CHANGED";
    DATA_UPLOADED: "DATA_UPLOADED";
    DATA_DELETED: "DATA_DELETED";
    MAPPING_CHANGED: "MAPPING_CHANGED";
    DATA_CORRECTED: "DATA_CORRECTED";
    AI_REQUESTED: "AI_REQUESTED";
    REPORT_GENERATED: "REPORT_GENERATED";
    DATA_EXPORTED: "DATA_EXPORTED";
    SCENARIO_RUN: "SCENARIO_RUN";
    BILLING_CHANGED: "BILLING_CHANGED";
    AI_PROVIDER_CONFIGURED: "AI_PROVIDER_CONFIGURED";
    ORGANIZATION_SETTINGS_CHANGED: "ORGANIZATION_SETTINGS_CHANGED";
}>;
type AuditAction = z.infer<typeof auditActionSchema>;

/**
 * Primitivas partilhadas por toda a API.
 */
declare const idSchema: z.ZodString;
type Id = z.infer<typeof idSchema>;
/** ISO-8601. Serializado como string porque JSON não tem tipo data. */
declare const isoDateTimeSchema: z.ZodISODateTime;
type IsoDateTime = z.infer<typeof isoDateTimeSchema>;
/** Dia sem hora, `YYYY-MM-DD`. Transacções têm data, não instante. */
declare const isoDateSchema: z.ZodISODate;
type IsoDate = z.infer<typeof isoDateSchema>;
/** Período mensal `YYYY-MM`. Unidade natural de reporte financeiro. */
declare const periodSchema: z.ZodString;
type Period = z.infer<typeof periodSchema>;
/** ISO-4217. */
declare const currencySchema: z.ZodString;
type Currency = z.infer<typeof currencySchema>;
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
declare const moneySchema: z.ZodObject<{
    amountCents: z.ZodNumber;
    currency: z.ZodString;
}, z.core.$strip>;
type Money = z.infer<typeof moneySchema>;
/**
 * Percentagem como número, não como fracção: 12.4 significa 12,4%.
 *
 * A alternativa (0.124) engana à leitura e produz o clássico erro de multiplicar
 * por 100 duas vezes.
 */
declare const percentageSchema: z.ZodNumber;
type Percentage = z.infer<typeof percentageSchema>;
/**
 * Variação entre dois períodos.
 *
 * `changePercent` é nulo quando o período anterior é zero — divisão por zero não
 * é "crescimento infinito", é ausência de base de comparação, e a UI tem de
 * mostrar isso em vez de um número inventado.
 */
declare const deltaSchema: z.ZodObject<{
    current: z.ZodNumber;
    previous: z.ZodNumber;
    changeAbsolute: z.ZodNumber;
    changePercent: z.ZodNullable<z.ZodNumber>;
    changePoints: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
type Delta = z.infer<typeof deltaSchema>;
/**
 * Erro da API, formato único.
 *
 * `message` é para humano e vem já traduzido no locale do pedido. `code` é para
 * a máquina e nunca muda. `details` transporta erros de campo em formulário.
 *
 * Nunca inclui stack trace, query, nem valor de campo sensível — o corpo do erro
 * é o sítio onde mais segredo escapa por descuido.
 */
declare const apiErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
    requestId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type ApiError = z.infer<typeof apiErrorSchema>;
/**
 * Paginação por cursor, não por offset.
 *
 * `OFFSET 20000` obriga o Postgres a ler vinte mil linhas para as deitar fora, e
 * degrada à medida que o cliente acumula histórico — exactamente ao contrário do
 * que se quer. O cursor lê sempre a mesma quantidade, e não salta linhas quando
 * chegam registos novos a meio da navegação.
 */
declare const paginationQuerySchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
type PaginationQuery = z.infer<typeof paginationQuerySchema>;
declare const paginatedSchema: <T extends z.ZodTypeAny>(item: T) => z.ZodObject<{
    items: z.ZodArray<T>;
    nextCursor: z.ZodNullable<z.ZodString>;
    totalCount: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
type Paginated<T> = {
    items: T[];
    nextCursor: string | null;
    totalCount?: number;
};
declare const periodRangeSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
}, z.core.$strip>;
type PeriodRange = z.infer<typeof periodRangeSchema>;

/**
 * O registo de auditoria (§77).
 *
 * Append-only do lado do servidor: este contrato só descreve leitura, e é de
 * propósito que não existe schema de escrita nem de alteração — um registo que
 * se pode editar não é prova, e é como prova que ele existe.
 *
 * O `metadata` nunca transporta valores sensíveis: guarda o suficiente para
 * reconstruir o quê, quem e quando. Um registo que precise de ser tratado como
 * confidencial não se pode entregar a um auditor, o que anula a razão de existir.
 */
declare const auditEventSchema: z.ZodObject<{
    id: z.ZodString;
    action: z.ZodString;
    resourceType: z.ZodNullable<z.ZodString>;
    resourceId: z.ZodNullable<z.ZodString>;
    userId: z.ZodNullable<z.ZodString>;
    metadata: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    ipAddress: z.ZodNullable<z.ZodString>;
    requestId: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type AuditEvent = z.infer<typeof auditEventSchema>;

/**
 * Autenticação — JWT próprio, sem dependência de fornecedor.
 *
 * O §7.4 exige modo on-premise e o §113 proíbe o domínio conhecer Supabase.
 * Autenticação delegada a um SaaS quebraria os dois no ponto mais difícil de
 * mudar depois, que é a identidade.
 */
/**
 * Política de password.
 *
 * Comprimento mínimo a sério em vez do teatro de "uma maiúscula e um símbolo":
 * as regras de composição empurram para `Password1!` e o NIST desaconselha-as há
 * anos. O que protege é comprimento e não ser uma password conhecida — a
 * verificação contra listas de fugas acontece no servidor, onde há como consultar.
 */
declare const PASSWORD_MIN_LENGTH = 12;
declare const passwordSchema: z.ZodString;
declare const emailSchema: z.ZodString;
declare const signupInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
    organizationName: z.ZodString;
    locale: z.ZodOptional<z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>>;
    acceptedTermsAt: z.ZodISODateTime;
}, z.core.$strip>;
type SignupInput = z.infer<typeof signupInputSchema>;
declare const loginInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
type LoginInput = z.infer<typeof loginInputSchema>;
declare const refreshInputSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
type RefreshInput = z.infer<typeof refreshInputSchema>;
declare const requestPasswordResetInputSchema: z.ZodObject<{
    email: z.ZodString;
}, z.core.$strip>;
type RequestPasswordResetInput = z.infer<typeof requestPasswordResetInputSchema>;
declare const resetPasswordInputSchema: z.ZodObject<{
    token: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>;
/**
 * Par de tokens.
 *
 * O refresh é rotativo: cada uso emite um novo e invalida o anterior. Se um
 * token já usado reaparecer, é sinal de que foi roubado — nesse caso cai toda a
 * família de tokens daquela sessão, não só o repetido.
 */
declare const tokenPairSchema: z.ZodObject<{
    accessToken: z.ZodString;
    refreshToken: z.ZodString;
    expiresIn: z.ZodNumber;
}, z.core.$strip>;
type TokenPair = z.infer<typeof tokenPairSchema>;
declare const sessionOrganizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    role: z.ZodEnum<{
        OWNER: "OWNER";
        ADMIN: "ADMIN";
        CFO: "CFO";
        FINANCE_MANAGER: "FINANCE_MANAGER";
        ANALYST: "ANALYST";
        VIEWER: "VIEWER";
        AUDITOR: "AUDITOR";
    }>;
    permissions: z.ZodArray<z.ZodEnum<{
        upload_data: "upload_data";
        delete_data: "delete_data";
        view_financials: "view_financials";
        ask_ai: "ask_ai";
        run_scenarios: "run_scenarios";
        export_reports: "export_reports";
        manage_billing: "manage_billing";
        manage_ai: "manage_ai";
        manage_users: "manage_users";
        view_audit_logs: "view_audit_logs";
        view_crm: "view_crm";
        manage_crm: "manage_crm";
    }>>;
    baseCurrency: z.ZodString;
}, z.core.$strip>;
type SessionOrganization = z.infer<typeof sessionOrganizationSchema>;
/**
 * Utilizador da sessão.
 *
 * Nunca transporta hash de password, tokens nem qualquer campo S3 — este objecto
 * vai para o frontend e para o estado do cliente.
 */
declare const sessionUserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    name: z.ZodString;
    locale: z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>;
    organizations: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        name: z.ZodString;
        slug: z.ZodString;
        role: z.ZodEnum<{
            OWNER: "OWNER";
            ADMIN: "ADMIN";
            CFO: "CFO";
            FINANCE_MANAGER: "FINANCE_MANAGER";
            ANALYST: "ANALYST";
            VIEWER: "VIEWER";
            AUDITOR: "AUDITOR";
        }>;
        permissions: z.ZodArray<z.ZodEnum<{
            upload_data: "upload_data";
            delete_data: "delete_data";
            view_financials: "view_financials";
            ask_ai: "ask_ai";
            run_scenarios: "run_scenarios";
            export_reports: "export_reports";
            manage_billing: "manage_billing";
            manage_ai: "manage_ai";
            manage_users: "manage_users";
            view_audit_logs: "view_audit_logs";
            view_crm: "view_crm";
            manage_crm: "manage_crm";
        }>>;
        baseCurrency: z.ZodString;
    }, z.core.$strip>>;
    currentOrganizationId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type SessionUser = z.infer<typeof sessionUserSchema>;
declare const authResponseSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodString;
        email: z.ZodString;
        name: z.ZodString;
        locale: z.ZodEnum<{
            "pt-PT": "pt-PT";
            "pt-BR": "pt-BR";
            es: "es";
            en: "en";
        }>;
        organizations: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            name: z.ZodString;
            slug: z.ZodString;
            role: z.ZodEnum<{
                OWNER: "OWNER";
                ADMIN: "ADMIN";
                CFO: "CFO";
                FINANCE_MANAGER: "FINANCE_MANAGER";
                ANALYST: "ANALYST";
                VIEWER: "VIEWER";
                AUDITOR: "AUDITOR";
            }>;
            permissions: z.ZodArray<z.ZodEnum<{
                upload_data: "upload_data";
                delete_data: "delete_data";
                view_financials: "view_financials";
                ask_ai: "ask_ai";
                run_scenarios: "run_scenarios";
                export_reports: "export_reports";
                manage_billing: "manage_billing";
                manage_ai: "manage_ai";
                manage_users: "manage_users";
                view_audit_logs: "view_audit_logs";
                view_crm: "view_crm";
                manage_crm: "manage_crm";
            }>>;
            baseCurrency: z.ZodString;
        }, z.core.$strip>>;
        currentOrganizationId: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>;
    tokens: z.ZodObject<{
        accessToken: z.ZodString;
        refreshToken: z.ZodString;
        expiresIn: z.ZodNumber;
    }, z.core.$strip>;
}, z.core.$strip>;
type AuthResponse = z.infer<typeof authResponseSchema>;

/**
 * Organizações, membros e hierarquia de parceiros.
 *
 * Estrutura (§69):
 *
 *   Plataforma
 *    ├── Parceiro (firma de contabilidade)
 *    │    ├── Organização
 *    │    └── Organização
 *    └── Organização directa
 *
 * O nível de parceiro existe no modelo desde o M0 mesmo sem UI: é o canal de
 * distribuição mais provável, e enxertar um nível de tenant depois obriga a
 * migrar todas as chaves estrangeiras da base.
 */
declare const organizationSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    partnerId: z.ZodNullable<z.ZodString>;
    baseCurrency: z.ZodString;
    locale: z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>;
    timezone: z.ZodString;
    fiscalYearStartMonth: z.ZodNumber;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Organization = z.infer<typeof organizationSchema>;
declare const membershipSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    userId: z.ZodString;
    role: z.ZodEnum<{
        OWNER: "OWNER";
        ADMIN: "ADMIN";
        CFO: "CFO";
        FINANCE_MANAGER: "FINANCE_MANAGER";
        ANALYST: "ANALYST";
        VIEWER: "VIEWER";
        AUDITOR: "AUDITOR";
    }>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Membership = z.infer<typeof membershipSchema>;
declare const memberSchema: z.ZodObject<{
    id: z.ZodString;
    userId: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        OWNER: "OWNER";
        ADMIN: "ADMIN";
        CFO: "CFO";
        FINANCE_MANAGER: "FINANCE_MANAGER";
        ANALYST: "ANALYST";
        VIEWER: "VIEWER";
        AUDITOR: "AUDITOR";
    }>;
    createdAt: z.ZodISODateTime;
    lastActiveAt: z.ZodNullable<z.ZodISODateTime>;
}, z.core.$strip>;
type Member = z.infer<typeof memberSchema>;
declare const partnerSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    slug: z.ZodString;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Partner = z.infer<typeof partnerSchema>;
/**
 * Marca personalizável (§8, §101).
 *
 * É a mesma peça que suporta a mudança de nome do produto: o `brand.ts` do
 * frontend define o padrão e isto sobrepõe-o por organização. Construir para o
 * rename constrói o white-label.
 */
declare const brandingConfigSchema: z.ZodObject<{
    productName: z.ZodNullable<z.ZodString>;
    logoUrl: z.ZodNullable<z.ZodString>;
    faviconUrl: z.ZodNullable<z.ZodString>;
    primaryColor: z.ZodNullable<z.ZodString>;
    customDomain: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type BrandingConfig = z.infer<typeof brandingConfigSchema>;
/**
 * Definições de organização.
 *
 * `dataRetentionMonths` e `aiDataProcessingConsent` não são preferências de
 * conforto: são o cumprimento do §76 e a base legal para enviar seja o que for a
 * um provider de IA externo. Sem consentimento explícito, a organização só pode
 * usar provider local.
 */
declare const organizationSettingsSchema: z.ZodObject<{
    baseCurrency: z.ZodString;
    locale: z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>;
    timezone: z.ZodString;
    fiscalYearStartMonth: z.ZodNumber;
    dataRetentionMonths: z.ZodNullable<z.ZodNumber>;
    aiDataProcessingConsent: z.ZodBoolean;
    pseudonymizePayroll: z.ZodBoolean;
    branding: z.ZodNullable<z.ZodObject<{
        productName: z.ZodNullable<z.ZodString>;
        logoUrl: z.ZodNullable<z.ZodString>;
        faviconUrl: z.ZodNullable<z.ZodString>;
        primaryColor: z.ZodNullable<z.ZodString>;
        customDomain: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type OrganizationSettings = z.infer<typeof organizationSettingsSchema>;
declare const updateOrganizationSettingsInputSchema: z.ZodObject<{
    baseCurrency: z.ZodOptional<z.ZodString>;
    locale: z.ZodOptional<z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>>;
    timezone: z.ZodOptional<z.ZodString>;
    fiscalYearStartMonth: z.ZodOptional<z.ZodNumber>;
    dataRetentionMonths: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    aiDataProcessingConsent: z.ZodOptional<z.ZodBoolean>;
    pseudonymizePayroll: z.ZodOptional<z.ZodBoolean>;
    branding: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        productName: z.ZodNullable<z.ZodString>;
        logoUrl: z.ZodNullable<z.ZodString>;
        faviconUrl: z.ZodNullable<z.ZodString>;
        primaryColor: z.ZodNullable<z.ZodString>;
        customDomain: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
type UpdateOrganizationSettingsInput = z.infer<typeof updateOrganizationSettingsInputSchema>;
declare const inviteMemberInputSchema: z.ZodObject<{
    email: z.ZodString;
    role: z.ZodEnum<{
        OWNER: "OWNER";
        ADMIN: "ADMIN";
        CFO: "CFO";
        FINANCE_MANAGER: "FINANCE_MANAGER";
        ANALYST: "ANALYST";
        VIEWER: "VIEWER";
        AUDITOR: "AUDITOR";
    }>;
}, z.core.$strip>;
type InviteMemberInput = z.infer<typeof inviteMemberInputSchema>;

/**
 * Fontes de dados (§98).
 *
 * A regra que decide se ligar um Xero daqui a seis meses é *um adapter* ou *uma
 * reescrita*: **nenhuma fonte fala directamente com a normalização**. Todas
 * terminam no mesmo `RawBatch` e entram no pipeline idêntico.
 *
 *   FileUpload ─┐
 *   Xero ───────┼─→ RawBatch ─→ Mapping ─→ Normalização ─→ Validação ─→ Dedup
 *   OpenBanking ┘
 *
 * No M0 só existe o conector de ficheiro. Os outros estão no enum sem
 * implementação (§107) — é o que garante que cabem sem migração.
 */
declare const dataSourceSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    kind: z.ZodEnum<{
        FILE_UPLOAD: "FILE_UPLOAD";
        XERO: "XERO";
        QUICKBOOKS: "QUICKBOOKS";
        SAGE: "SAGE";
        PRIMAVERA: "PRIMAVERA";
        PHC: "PHC";
        OMIE: "OMIE";
        CONTA_AZUL: "CONTA_AZUL";
        SAP: "SAP";
        ORACLE: "ORACLE";
        NETSUITE: "NETSUITE";
        STRIPE: "STRIPE";
        SHOPIFY: "SHOPIFY";
        HUBSPOT: "HUBSPOT";
        SALESFORCE: "SALESFORCE";
        OPEN_BANKING: "OPEN_BANKING";
    }>;
    name: z.ZodString;
    capabilities: z.ZodArray<z.ZodEnum<{
        OAUTH: "OAUTH";
        INCREMENTAL_SYNC: "INCREMENTAL_SYNC";
        WEBHOOK: "WEBHOOK";
        BACKFILL: "BACKFILL";
    }>>;
    config: z.ZodRecord<z.ZodString, z.ZodUnknown>;
    hasCredentials: z.ZodBoolean;
    lastSyncAt: z.ZodNullable<z.ZodISODateTime>;
    lastSyncError: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type DataSource = z.infer<typeof dataSourceSchema>;
/**
 * Cursor de sincronização incremental.
 *
 * Existe no M0 sem ninguém o usar porque acrescentá-lo depois obriga a
 * reprocessar histórico para descobrir onde se ficou.
 */
declare const syncCursorSchema: z.ZodObject<{
    value: z.ZodString;
    updatedAt: z.ZodISODateTime;
}, z.core.$strip>;
type SyncCursor = z.infer<typeof syncCursorSchema>;
/**
 * Estrutura descoberta na origem.
 *
 * Um ficheiro devolve folhas e colunas; uma API devolve entidades e campos. A
 * mesma forma nos dois casos é o que permite à UI de mapeamento (§27) ser uma só.
 */
declare const discoveredFieldSchema: z.ZodObject<{
    name: z.ZodString;
    inferredType: z.ZodEnum<{
        string: "string";
        number: "number";
        boolean: "boolean";
        date: "date";
        empty: "empty";
        mixed: "mixed";
    }>;
    sampleValues: z.ZodArray<z.ZodString>;
    nullRatio: z.ZodNumber;
}, z.core.$strip>;
type DiscoveredField = z.infer<typeof discoveredFieldSchema>;
declare const discoveredEntitySchema: z.ZodObject<{
    name: z.ZodString;
    rowCount: z.ZodNumber;
    fields: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        inferredType: z.ZodEnum<{
            string: "string";
            number: "number";
            boolean: "boolean";
            date: "date";
            empty: "empty";
            mixed: "mixed";
        }>;
        sampleValues: z.ZodArray<z.ZodString>;
        nullRatio: z.ZodNumber;
    }, z.core.$strip>>;
    suspectedPayroll: z.ZodBoolean;
}, z.core.$strip>;
type DiscoveredEntity = z.infer<typeof discoveredEntitySchema>;
declare const discoveredSchemaSchema: z.ZodObject<{
    entities: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        rowCount: z.ZodNumber;
        fields: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            inferredType: z.ZodEnum<{
                string: "string";
                number: "number";
                boolean: "boolean";
                date: "date";
                empty: "empty";
                mixed: "mixed";
            }>;
            sampleValues: z.ZodArray<z.ZodString>;
            nullRatio: z.ZodNumber;
        }, z.core.$strip>>;
        suspectedPayroll: z.ZodBoolean;
    }, z.core.$strip>>;
}, z.core.$strip>;
type DiscoveredSchema = z.infer<typeof discoveredSchemaSchema>;
declare const connectionHealthSchema: z.ZodObject<{
    ok: z.ZodBoolean;
    message: z.ZodString;
    checkedAt: z.ZodISODateTime;
}, z.core.$strip>;
type ConnectionHealth = z.infer<typeof connectionHealthSchema>;
/**
 * Configuração de provider de IA por organização (§12 BYOK).
 *
 * A chave nunca é devolvida — só a máscara (`sk-…4f2a`), que chega para o
 * utilizador reconhecer qual configurou.
 *
 * `retentionPolicy` existe porque alguns providers treinam com dados da API
 * consoante o tier, e uma chave mal escolhida põe dados financeiros de cliente
 * num corpus de treino, o que não se desfaz. A UI sinaliza antes do uso.
 */
declare const aiProviderConfigSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    kind: z.ZodString;
    model: z.ZodString;
    baseUrl: z.ZodNullable<z.ZodString>;
    apiKeyMask: z.ZodNullable<z.ZodString>;
    embeddingModel: z.ZodNullable<z.ZodString>;
    retentionPolicy: z.ZodEnum<{
        ZERO_RETENTION: "ZERO_RETENTION";
        RETAINED_NO_TRAINING: "RETAINED_NO_TRAINING";
        TRAINS_ON_DATA: "TRAINS_ON_DATA";
        UNKNOWN: "UNKNOWN";
    }>;
    dataStaysLocal: z.ZodBoolean;
    isActive: z.ZodBoolean;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type AIProviderConfig = z.infer<typeof aiProviderConfigSchema>;
declare const upsertAIProviderConfigInputSchema: z.ZodObject<{
    kind: z.ZodString;
    model: z.ZodString;
    baseUrl: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    apiKey: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    embeddingModel: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    retentionPolicy: z.ZodOptional<z.ZodEnum<{
        ZERO_RETENTION: "ZERO_RETENTION";
        RETAINED_NO_TRAINING: "RETAINED_NO_TRAINING";
        TRAINS_ON_DATA: "TRAINS_ON_DATA";
        UNKNOWN: "UNKNOWN";
    }>>;
}, z.core.$strip>;
type UpsertAIProviderConfigInput = z.infer<typeof upsertAIProviderConfigInputSchema>;

/**
 * Ingestão — do ficheiro à transacção normalizada.
 *
 *   Upload → validação → armazenamento → parsing → detecção de folha e coluna
 *   → mapeamento → normalização → validação → deduplicação → persistência
 *
 * O pipeline é o mesmo venha o dado de um Excel ou de uma API (§98). O que muda
 * é só o conector que produz o lote.
 */
declare const datasetSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    version: z.ZodNumber;
    transactionCount: z.ZodNumber;
    updatedAt: z.ZodISODateTime;
}, z.core.$strip>;
type Dataset = z.infer<typeof datasetSchema>;
declare const importSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    dataSourceId: z.ZodString;
    datasetId: z.ZodNullable<z.ZodString>;
    trigger: z.ZodEnum<{
        WEBHOOK: "WEBHOOK";
        MANUAL_UPLOAD: "MANUAL_UPLOAD";
        SCHEDULED_SYNC: "SCHEDULED_SYNC";
    }>;
    state: z.ZodEnum<{
        UPLOADED: "UPLOADED";
        PROCESSING: "PROCESSING";
        MAPPING_REQUIRED: "MAPPING_REQUIRED";
        NORMALIZING: "NORMALIZING";
        VALIDATING: "VALIDATING";
        COMPLETED: "COMPLETED";
        FAILED: "FAILED";
    }>;
    fileName: z.ZodString;
    fileSizeBytes: z.ZodNumber;
    fileHash: z.ZodString;
    rowsTotal: z.ZodNumber;
    rowsImported: z.ZodNumber;
    rowsSkipped: z.ZodNumber;
    errorMessage: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
    completedAt: z.ZodNullable<z.ZodISODateTime>;
}, z.core.$strip>;
type Import = z.infer<typeof importSchema>;
/** Campos de destino que uma coluna pode alimentar. */
declare const TARGET_FIELDS: readonly ["date", "description", "amount", "currency", "customer", "supplier", "category", "invoiceNumber", "reference", "externalId", "ignore"];
declare const targetFieldSchema: z.ZodEnum<{
    date: "date";
    currency: "currency";
    description: "description";
    amount: "amount";
    customer: "customer";
    supplier: "supplier";
    category: "category";
    invoiceNumber: "invoiceNumber";
    reference: "reference";
    externalId: "externalId";
    ignore: "ignore";
}>;
type TargetField = z.infer<typeof targetFieldSchema>;
/**
 * Mapeamento de uma coluna do ficheiro para um campo do domínio (§27).
 *
 * `confidence` alimenta a UI: acima de um limiar mostra-se pré-seleccionado com
 * visto; abaixo, pede-se confirmação. Mapear errado em silêncio é pior do que
 * perguntar.
 */
declare const columnMappingSchema: z.ZodObject<{
    sourceColumn: z.ZodString;
    targetField: z.ZodEnum<{
        date: "date";
        currency: "currency";
        description: "description";
        amount: "amount";
        customer: "customer";
        supplier: "supplier";
        category: "category";
        invoiceNumber: "invoiceNumber";
        reference: "reference";
        externalId: "externalId";
        ignore: "ignore";
    }>;
    confidence: z.ZodNumber;
    format: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type ColumnMapping = z.infer<typeof columnMappingSchema>;
declare const importMappingSchema: z.ZodObject<{
    importId: z.ZodString;
    sheetName: z.ZodNullable<z.ZodString>;
    transactionType: z.ZodEnum<{
        REVENUE: "REVENUE";
        EXPENSE: "EXPENSE";
        BANK: "BANK";
    }>;
    columns: z.ZodArray<z.ZodObject<{
        sourceColumn: z.ZodString;
        targetField: z.ZodEnum<{
            date: "date";
            currency: "currency";
            description: "description";
            amount: "amount";
            customer: "customer";
            supplier: "supplier";
            category: "category";
            invoiceNumber: "invoiceNumber";
            reference: "reference";
            externalId: "externalId";
            ignore: "ignore";
        }>;
        confidence: z.ZodNumber;
        format: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type ImportMapping = z.infer<typeof importMappingSchema>;
declare const confirmMappingInputSchema: z.ZodObject<{
    sheetName: z.ZodNullable<z.ZodString>;
    transactionType: z.ZodEnum<{
        REVENUE: "REVENUE";
        EXPENSE: "EXPENSE";
        BANK: "BANK";
    }>;
    columns: z.ZodArray<z.ZodObject<{
        sourceColumn: z.ZodString;
        targetField: z.ZodEnum<{
            date: "date";
            currency: "currency";
            description: "description";
            amount: "amount";
            customer: "customer";
            supplier: "supplier";
            category: "category";
            invoiceNumber: "invoiceNumber";
            reference: "reference";
            externalId: "externalId";
            ignore: "ignore";
        }>;
        confidence: z.ZodNumber;
        format: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    pseudonymizeNames: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
type ConfirmMappingInput = z.infer<typeof confirmMappingInputSchema>;
/**
 * Problema encontrado nos dados (§30).
 *
 * Guardado em vez de apenas contado: o utilizador tem de poder abrir "12
 * transacções duplicadas" e ver quais, senão o painel de qualidade é decoração.
 */
declare const dataQualityIssueSchema: z.ZodObject<{
    id: z.ZodString;
    importId: z.ZodString;
    type: z.ZodEnum<{
        MISSING_CATEGORY: "MISSING_CATEGORY";
        MISSING_CUSTOMER: "MISSING_CUSTOMER";
        DUPLICATE_TRANSACTION: "DUPLICATE_TRANSACTION";
        INVALID_DATE: "INVALID_DATE";
        INVALID_AMOUNT: "INVALID_AMOUNT";
        INCONSISTENT_CURRENCY: "INCONSISTENT_CURRENCY";
        UNMAPPED_COLUMN: "UNMAPPED_COLUMN";
        SUSPECTED_PAYROLL: "SUSPECTED_PAYROLL";
    }>;
    severity: z.ZodEnum<{
        INFO: "INFO";
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        CRITICAL: "CRITICAL";
    }>;
    message: z.ZodString;
    affectedRows: z.ZodNumber;
    sampleRowNumbers: z.ZodArray<z.ZodNumber>;
    resolvedAt: z.ZodNullable<z.ZodISODateTime>;
}, z.core.$strip>;
type DataQualityIssue = z.infer<typeof dataQualityIssueSchema>;
declare const dataQualitySummarySchema: z.ZodObject<{
    importId: z.ZodString;
    rowsProcessed: z.ZodNumber;
    detectedCurrency: z.ZodNullable<z.ZodString>;
    issues: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        importId: z.ZodString;
        type: z.ZodEnum<{
            MISSING_CATEGORY: "MISSING_CATEGORY";
            MISSING_CUSTOMER: "MISSING_CUSTOMER";
            DUPLICATE_TRANSACTION: "DUPLICATE_TRANSACTION";
            INVALID_DATE: "INVALID_DATE";
            INVALID_AMOUNT: "INVALID_AMOUNT";
            INCONSISTENT_CURRENCY: "INCONSISTENT_CURRENCY";
            UNMAPPED_COLUMN: "UNMAPPED_COLUMN";
            SUSPECTED_PAYROLL: "SUSPECTED_PAYROLL";
        }>;
        severity: z.ZodEnum<{
            INFO: "INFO";
            LOW: "LOW";
            MEDIUM: "MEDIUM";
            HIGH: "HIGH";
            CRITICAL: "CRITICAL";
        }>;
        message: z.ZodString;
        affectedRows: z.ZodNumber;
        sampleRowNumbers: z.ZodArray<z.ZodNumber>;
        resolvedAt: z.ZodNullable<z.ZodISODateTime>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type DataQualitySummary = z.infer<typeof dataQualitySummarySchema>;
declare const importProgressSchema: z.ZodObject<{
    importId: z.ZodString;
    state: z.ZodEnum<{
        UPLOADED: "UPLOADED";
        PROCESSING: "PROCESSING";
        MAPPING_REQUIRED: "MAPPING_REQUIRED";
        NORMALIZING: "NORMALIZING";
        VALIDATING: "VALIDATING";
        COMPLETED: "COMPLETED";
        FAILED: "FAILED";
    }>;
    progressPercent: z.ZodNumber;
    message: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type ImportProgress = z.infer<typeof importProgressSchema>;
declare const importFilterSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    state: z.ZodOptional<z.ZodEnum<{
        UPLOADED: "UPLOADED";
        PROCESSING: "PROCESSING";
        MAPPING_REQUIRED: "MAPPING_REQUIRED";
        NORMALIZING: "NORMALIZING";
        VALIDATING: "VALIDATING";
        COMPLETED: "COMPLETED";
        FAILED: "FAILED";
    }>>;
    dataSourceId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type ImportFilter = z.infer<typeof importFilterSchema>;

/**
 * Núcleo financeiro.
 *
 * Decisão de modelação: **uma tabela `Transaction` como facto único**, com
 * discriminador `type` e `customerId`/`supplierId` opcionais — em vez de tabelas
 * separadas para receita e despesa.
 *
 * Com tabelas separadas, cada métrica precisaria de duas queries e dois
 * conjuntos de índices, e o drill-down teria dois caminhos diferentes para o
 * mesmo gesto do utilizador. `Revenue` e `Expense` continuam a existir como
 * conceitos de domínio; só não são tabelas.
 */
/**
 * De onde veio esta linha, exactamente.
 *
 * É o que permite ir de "a margem caiu 3,2pp" até "estas 47 linhas, do ficheiro
 * despesas_julho.xlsx, folha Marketing, linhas 142–189". Sem isto guardado no
 * momento da ingestão, não há como reconstruir depois.
 */
declare const lineageRefSchema: z.ZodObject<{
    importId: z.ZodString;
    fileName: z.ZodString;
    sheetName: z.ZodNullable<z.ZodString>;
    rowNumber: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type LineageRef = z.infer<typeof lineageRefSchema>;
declare const transactionSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    type: z.ZodEnum<{
        REVENUE: "REVENUE";
        EXPENSE: "EXPENSE";
        BANK: "BANK";
    }>;
    date: z.ZodISODate;
    description: z.ZodString;
    amount: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
    customerId: z.ZodNullable<z.ZodString>;
    customerName: z.ZodNullable<z.ZodString>;
    supplierId: z.ZodNullable<z.ZodString>;
    supplierName: z.ZodNullable<z.ZodString>;
    categoryId: z.ZodNullable<z.ZodString>;
    categoryName: z.ZodNullable<z.ZodString>;
    invoiceNumber: z.ZodNullable<z.ZodString>;
    reference: z.ZodNullable<z.ZodString>;
    lineage: z.ZodObject<{
        importId: z.ZodString;
        fileName: z.ZodString;
        sheetName: z.ZodNullable<z.ZodString>;
        rowNumber: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
type Transaction = z.infer<typeof transactionSchema>;
declare const customerSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    segment: z.ZodNullable<z.ZodString>;
    country: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        PROSPECT: "PROSPECT";
        ACTIVE: "ACTIVE";
        AT_RISK: "AT_RISK";
        CHURNED: "CHURNED";
    }>;
    contractStart: z.ZodNullable<z.ZodISODate>;
    contractEnd: z.ZodNullable<z.ZodISODate>;
    renewalDate: z.ZodNullable<z.ZodISODate>;
    annualValue: z.ZodNullable<z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>>;
    ownerId: z.ZodNullable<z.ZodString>;
    tags: z.ZodArray<z.ZodString>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Customer = z.infer<typeof customerSchema>;
declare const supplierSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    country: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Supplier = z.infer<typeof supplierSchema>;
declare const categorySchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
        REVENUE: "REVENUE";
        EXPENSE: "EXPENSE";
        BANK: "BANK";
    }>;
    parentId: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Category = z.infer<typeof categorySchema>;
declare const budgetSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    period: z.ZodString;
    categoryId: z.ZodString;
    categoryName: z.ZodString;
    budgetAmount: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Budget = z.infer<typeof budgetSchema>;
declare const transactionFilterSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    type: z.ZodOptional<z.ZodEnum<{
        REVENUE: "REVENUE";
        EXPENSE: "EXPENSE";
        BANK: "BANK";
    }>>;
    from: z.ZodOptional<z.ZodISODate>;
    to: z.ZodOptional<z.ZodISODate>;
    customerId: z.ZodOptional<z.ZodString>;
    supplierId: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodString>;
    importId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
    minAmountCents: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxAmountCents: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        date: "date";
        description: "description";
        amount: "amount";
    }>>;
    sortDir: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
type TransactionFilter = z.infer<typeof transactionFilterSchema>;
/** Agregado por dimensão — clientes, categorias, fornecedores. */
declare const breakdownItemSchema: z.ZodObject<{
    id: z.ZodNullable<z.ZodString>;
    label: z.ZodString;
    amount: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
    sharePercent: z.ZodNumber;
    changePercent: z.ZodNullable<z.ZodNumber>;
    transactionCount: z.ZodNumber;
}, z.core.$strip>;
type BreakdownItem = z.infer<typeof breakdownItemSchema>;
/** Ponto de uma série temporal, para os gráficos do §66. */
declare const timeSeriesPointSchema: z.ZodObject<{
    period: z.ZodString;
    revenue: z.ZodNumber;
    expenses: z.ZodNumber;
    grossProfit: z.ZodNumber;
    currency: z.ZodString;
}, z.core.$strip>;
type TimeSeriesPoint = z.infer<typeof timeSeriesPointSchema>;

/**
 * Contexto comercial — CRM leve.
 *
 * O §1.1 do PRD declara que o produto não é um CRM. Isto estende esse âmbito
 * por decisão explícita, e por isso fica em contexto próprio, com milestone
 * próprio (M8), depois de a promessa financeira estar entregue.
 *
 * O que o impede de ser um CRM medíocre colado ao lado de um produto financeiro
 * bom são os laços ao financeiro:
 *
 *   - oportunidade ganha confrontada com a receita real do cliente;
 *   - pipeline ponderado (`value × probability`) como nó do grafo de forecast;
 *   - detectores de churn e renovação a alimentar os insights;
 *   - contexto comercial nas respostas da IA — "o cliente caiu 18% e tem
 *     renovação a 30 dias sem oportunidade aberta".
 *
 * Aviso de privacidade: leads e contactos são **dados pessoais de terceiros**
 * (classe S2). O cliente é o responsável pelo tratamento e pela base legal;
 * nós somos subcontratante. Ver `docs/SEGURANCA_E_PRIVACIDADE.md`.
 */
declare const leadSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    company: z.ZodNullable<z.ZodString>;
    email: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    source: z.ZodNullable<z.ZodString>;
    status: z.ZodEnum<{
        NEW: "NEW";
        CONTACTED: "CONTACTED";
        QUALIFIED: "QUALIFIED";
        DISQUALIFIED: "DISQUALIFIED";
        CONVERTED: "CONVERTED";
    }>;
    estimatedValue: z.ZodNullable<z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>>;
    ownerId: z.ZodNullable<z.ZodString>;
    ownerName: z.ZodNullable<z.ZodString>;
    convertedToCustomerId: z.ZodNullable<z.ZodString>;
    version: z.ZodNumber;
    createdAt: z.ZodISODateTime;
    updatedAt: z.ZodISODateTime;
}, z.core.$strip>;
type Lead = z.infer<typeof leadSchema>;
declare const opportunitySchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    customerId: z.ZodNullable<z.ZodString>;
    leadId: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    stage: z.ZodEnum<{
        DISCOVERY: "DISCOVERY";
        PROPOSAL: "PROPOSAL";
        NEGOTIATION: "NEGOTIATION";
        WON: "WON";
        LOST: "LOST";
    }>;
    value: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
    probability: z.ZodNumber;
    expectedCloseDate: z.ZodNullable<z.ZodISODate>;
    closedAt: z.ZodNullable<z.ZodISODateTime>;
    lostReason: z.ZodNullable<z.ZodString>;
    ownerId: z.ZodNullable<z.ZodString>;
    ownerName: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
    updatedAt: z.ZodISODateTime;
}, z.core.$strip>;
type Opportunity = z.infer<typeof opportunitySchema>;
/** Alvo de uma actividade. Polimórfico para não haver três tabelas iguais. */
declare const ACTIVITY_SUBJECTS: readonly ["LEAD", "CUSTOMER", "OPPORTUNITY"];
declare const activitySubjectSchema: z.ZodEnum<{
    LEAD: "LEAD";
    CUSTOMER: "CUSTOMER";
    OPPORTUNITY: "OPPORTUNITY";
}>;
type ActivitySubject = z.infer<typeof activitySubjectSchema>;
declare const activitySchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    subjectType: z.ZodEnum<{
        LEAD: "LEAD";
        CUSTOMER: "CUSTOMER";
        OPPORTUNITY: "OPPORTUNITY";
    }>;
    subjectId: z.ZodString;
    type: z.ZodEnum<{
        NOTE: "NOTE";
        CALL: "CALL";
        EMAIL: "EMAIL";
        MEETING: "MEETING";
        TASK: "TASK";
    }>;
    content: z.ZodString;
    dueAt: z.ZodNullable<z.ZodISODateTime>;
    completedAt: z.ZodNullable<z.ZodISODateTime>;
    userId: z.ZodString;
    userName: z.ZodString;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Activity = z.infer<typeof activitySchema>;
/** Resumo do pipeline por estágio, para o funil e para o forecast. */
declare const pipelineSummarySchema: z.ZodObject<{
    stages: z.ZodArray<z.ZodObject<{
        stage: z.ZodEnum<{
            DISCOVERY: "DISCOVERY";
            PROPOSAL: "PROPOSAL";
            NEGOTIATION: "NEGOTIATION";
            WON: "WON";
            LOST: "LOST";
        }>;
        count: z.ZodNumber;
        totalValue: z.ZodObject<{
            amountCents: z.ZodNumber;
            currency: z.ZodString;
        }, z.core.$strip>;
        weightedValue: z.ZodObject<{
            amountCents: z.ZodNumber;
            currency: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    totalWeightedValue: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
type PipelineSummary = z.infer<typeof pipelineSummarySchema>;
declare const createLeadInputSchema: z.ZodObject<{
    name: z.ZodString;
    company: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    email: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    source: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    estimatedValueCents: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    ownerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
type CreateLeadInput = z.infer<typeof createLeadInputSchema>;
declare const updateLeadInputSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    company: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    email: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    source: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    estimatedValueCents: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    ownerId: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    status: z.ZodOptional<z.ZodEnum<{
        NEW: "NEW";
        CONTACTED: "CONTACTED";
        QUALIFIED: "QUALIFIED";
        DISQUALIFIED: "DISQUALIFIED";
        CONVERTED: "CONVERTED";
    }>>;
}, z.core.$strip>;
type UpdateLeadInput = z.infer<typeof updateLeadInputSchema>;
declare const createOpportunityInputSchema: z.ZodObject<{
    customerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    leadId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    title: z.ZodString;
    stage: z.ZodDefault<z.ZodEnum<{
        DISCOVERY: "DISCOVERY";
        PROPOSAL: "PROPOSAL";
        NEGOTIATION: "NEGOTIATION";
        WON: "WON";
        LOST: "LOST";
    }>>;
    valueCents: z.ZodNumber;
    probability: z.ZodDefault<z.ZodNumber>;
    expectedCloseDate: z.ZodOptional<z.ZodNullable<z.ZodISODate>>;
    ownerId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
type CreateOpportunityInput = z.infer<typeof createOpportunityInputSchema>;
declare const leadFilterSchema: z.ZodObject<{
    cursor: z.ZodOptional<z.ZodString>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodEnum<{
        NEW: "NEW";
        CONTACTED: "CONTACTED";
        QUALIFIED: "QUALIFIED";
        DISQUALIFIED: "DISQUALIFIED";
        CONVERTED: "CONVERTED";
    }>>;
    ownerId: z.ZodOptional<z.ZodString>;
    search: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type LeadFilter = z.infer<typeof leadFilterSchema>;

/**
 * Métricas como grafo dirigido acíclico.
 *
 * Uma métrica depende de outras: `EBITDA` depende de `GROSS_PROFIT` e `OPEX`;
 * `GROSS_MARGIN` depende de `GROSS_PROFIT` e `REVENUE`. Modelar isso como grafo
 * em vez de funções soltas resolve quatro coisas de uma vez:
 *
 *   1. a ordem de cálculo deixa de ser responsabilidade de quem escreve a métrica;
 *   2. só as folhas tocam na base — todo o resto é função pura, e testa-se sem
 *      Postgres, que é o que torna a regressão do §87 praticável;
 *   3. a atribuição de variância (§24) sai de graça: para saber por que caiu o
 *      lucro, desce-se o grafo atribuindo o delta a cada filho;
 *   4. o cache invalida-se por construção, porque a chave inclui a versão do
 *      dataset.
 *
 * Não confundir com o grafo de evidência (`evidence.ts`): este liga métrica a
 * métrica e vive em código; aquele liga métrica a transacções e a linhas de
 * ficheiro, e é construído por consulta. Tocam-se nas folhas.
 */
declare const METRIC_IDS: readonly ["REVENUE", "EXPENSES", "COGS", "OPEX", "CASH", "ACCOUNTS_RECEIVABLE", "ACCOUNTS_PAYABLE", "BUDGETED_EXPENSES", "GROSS_PROFIT", "GROSS_MARGIN", "OPERATING_PROFIT", "EBITDA", "EBITDA_MARGIN", "REVENUE_GROWTH", "EXPENSE_GROWTH", "CUSTOMER_CONCENTRATION", "BURN", "RUNWAY", "BUDGET_VARIANCE"];
declare const metricIdSchema: z.ZodEnum<{
    REVENUE: "REVENUE";
    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
    EXPENSES: "EXPENSES";
    COGS: "COGS";
    OPEX: "OPEX";
    CASH: "CASH";
    ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
    ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
    BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
    GROSS_PROFIT: "GROSS_PROFIT";
    GROSS_MARGIN: "GROSS_MARGIN";
    OPERATING_PROFIT: "OPERATING_PROFIT";
    EBITDA: "EBITDA";
    EBITDA_MARGIN: "EBITDA_MARGIN";
    REVENUE_GROWTH: "REVENUE_GROWTH";
    EXPENSE_GROWTH: "EXPENSE_GROWTH";
    BURN: "BURN";
    RUNWAY: "RUNWAY";
    BUDGET_VARIANCE: "BUDGET_VARIANCE";
}>;
type MetricId = z.infer<typeof metricIdSchema>;
/**
 * Unidade do valor.
 *
 * Existe para a formatação não adivinhar: 42 pode ser 42 €, 42% ou 42 meses, e
 * um `Intl.NumberFormat` com a unidade errada produz um número plausível e
 * falso — a pior espécie num relatório financeiro.
 */
declare const METRIC_UNITS: readonly ["MONEY", "PERCENT", "MONTHS", "RATIO", "COUNT"];
declare const metricUnitSchema: z.ZodEnum<{
    MONEY: "MONEY";
    PERCENT: "PERCENT";
    MONTHS: "MONTHS";
    RATIO: "RATIO";
    COUNT: "COUNT";
}>;
type MetricUnit = z.infer<typeof metricUnitSchema>;
/**
 * Declaração de um nó, sem a função de cálculo.
 *
 * A implementação vive no backend; isto é o que o frontend precisa de saber para
 * desenhar o grafo e explicar de onde vem cada número.
 */
declare const metricNodeSpecSchema: z.ZodObject<{
    id: z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>;
    unit: z.ZodEnum<{
        MONEY: "MONEY";
        PERCENT: "PERCENT";
        MONTHS: "MONTHS";
        RATIO: "RATIO";
        COUNT: "COUNT";
    }>;
    dependsOn: z.ZodArray<z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>>;
    isLeaf: z.ZodBoolean;
    formula: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type MetricNodeSpec = z.infer<typeof metricNodeSpecSchema>;
declare const metricValueSchema: z.ZodObject<{
    metricId: z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>;
    period: z.ZodString;
    unit: z.ZodEnum<{
        MONEY: "MONEY";
        PERCENT: "PERCENT";
        MONTHS: "MONTHS";
        RATIO: "RATIO";
        COUNT: "COUNT";
    }>;
    value: z.ZodNullable<z.ZodNumber>;
    currency: z.ZodNullable<z.ZodString>;
    delta: z.ZodNullable<z.ZodObject<{
        current: z.ZodNumber;
        previous: z.ZodNumber;
        changeAbsolute: z.ZodNumber;
        changePercent: z.ZodNullable<z.ZodNumber>;
        changePoints: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    }, z.core.$strip>>;
    datasetVersion: z.ZodNumber;
}, z.core.$strip>;
type MetricValue = z.infer<typeof metricValueSchema>;
/**
 * Um ramo da explicação de uma variação.
 *
 * `contributionPercent` é a fatia deste filho no delta do pai — é o que permite
 * dizer "dois clientes explicam 72% da queda" em vez de listar vinte linhas sem
 * hierarquia.
 */
declare const varianceContributionSchema: z.ZodObject<{
    label: z.ZodString;
    metricId: z.ZodNullable<z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>>;
    entityId: z.ZodNullable<z.ZodString>;
    changeAbsolute: z.ZodNumber;
    changePercent: z.ZodNullable<z.ZodNumber>;
    contributionPercent: z.ZodNumber;
}, z.core.$strip>;
type VarianceContribution = z.infer<typeof varianceContributionSchema>;
/**
 * Árvore de atribuição de variância (§24).
 *
 * Recursiva, porque a pergunta "porquê?" repete-se: o lucro caiu por causa das
 * despesas, as despesas por causa do marketing, o marketing por causa de três
 * facturas. Cada nó é clicável até chegar à linha do ficheiro.
 */
interface VarianceTree {
    label: string;
    metricId: MetricId | null;
    entityId: string | null;
    changeAbsolute: number;
    changePercent: number | null;
    contributionPercent: number;
    children: VarianceTree[];
}
declare const varianceTreeSchema: z.ZodType<VarianceTree>;
declare const metricQuerySchema: z.ZodObject<{
    period: z.ZodString;
    comparePeriod: z.ZodOptional<z.ZodString>;
    metrics: z.ZodOptional<z.ZodArray<z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>>>;
}, z.core.$strip>;
type MetricQuery = z.infer<typeof metricQuerySchema>;
/**
 * As secções que a Visão geral pode ter, e a forma que o negócio lhe dá.
 *
 * A composição é derivada dos dados, não gerada: sem orçamento carregado não há
 * desvio que mostrar, e um cliente a valer 40% da receita sobe para primeiro.
 * O `porque` transporta as razões — é o que impede um painel que muda de forma
 * de se ler como instabilidade.
 */
declare const OVERVIEW_SECTIONS: readonly ["METRICAS", "O_QUE_MUDOU", "ALERTAS", "EVOLUCAO", "CLIENTES", "CATEGORIAS", "ORCAMENTO", "TESOURARIA"];
declare const overviewSectionSchema: z.ZodEnum<{
    METRICAS: "METRICAS";
    O_QUE_MUDOU: "O_QUE_MUDOU";
    ALERTAS: "ALERTAS";
    EVOLUCAO: "EVOLUCAO";
    CLIENTES: "CLIENTES";
    CATEGORIAS: "CATEGORIAS";
    ORCAMENTO: "ORCAMENTO";
    TESOURARIA: "TESOURARIA";
}>;
type OverviewSection = z.infer<typeof overviewSectionSchema>;
declare const overviewShapeSchema: z.ZodObject<{
    metricas: z.ZodArray<z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>>;
    seccoes: z.ZodArray<z.ZodEnum<{
        METRICAS: "METRICAS";
        O_QUE_MUDOU: "O_QUE_MUDOU";
        ALERTAS: "ALERTAS";
        EVOLUCAO: "EVOLUCAO";
        CLIENTES: "CLIENTES";
        CATEGORIAS: "CATEGORIAS";
        ORCAMENTO: "ORCAMENTO";
        TESOURARIA: "TESOURARIA";
    }>>;
    porque: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
type OverviewShape = z.infer<typeof overviewShapeSchema>;
/** Resposta do Overview, num só pedido para o dashboard não fazer dez. */
declare const dashboardSummarySchema: z.ZodObject<{
    period: z.ZodString;
    comparePeriod: z.ZodString;
    currency: z.ZodString;
    datasetVersion: z.ZodNumber;
    metrics: z.ZodArray<z.ZodObject<{
        metricId: z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>;
        period: z.ZodString;
        unit: z.ZodEnum<{
            MONEY: "MONEY";
            PERCENT: "PERCENT";
            MONTHS: "MONTHS";
            RATIO: "RATIO";
            COUNT: "COUNT";
        }>;
        value: z.ZodNullable<z.ZodNumber>;
        currency: z.ZodNullable<z.ZodString>;
        delta: z.ZodNullable<z.ZodObject<{
            current: z.ZodNumber;
            previous: z.ZodNumber;
            changeAbsolute: z.ZodNumber;
            changePercent: z.ZodNullable<z.ZodNumber>;
            changePoints: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
        }, z.core.$strip>>;
        datasetVersion: z.ZodNumber;
    }, z.core.$strip>>;
    shape: z.ZodOptional<z.ZodObject<{
        metricas: z.ZodArray<z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>>;
        seccoes: z.ZodArray<z.ZodEnum<{
            METRICAS: "METRICAS";
            O_QUE_MUDOU: "O_QUE_MUDOU";
            ALERTAS: "ALERTAS";
            EVOLUCAO: "EVOLUCAO";
            CLIENTES: "CLIENTES";
            CATEGORIAS: "CATEGORIAS";
            ORCAMENTO: "ORCAMENTO";
            TESOURARIA: "TESOURARIA";
        }>>;
        porque: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type DashboardSummary = z.infer<typeof dashboardSummarySchema>;

/**
 * Evidência — a peça que sustenta a promessa do produto.
 *
 * Todas as ferramentas de IA financeira dão uma resposta. Esta deixa verificá-la.
 * O caminho tem de ser sempre percorrível:
 *
 *   conclusão → cálculo → métrica → entidade → transacção → ficheiro → linha
 *
 * Sem isto, o produto é indistinguível de um LLM com um Excel — e o utilizador
 * não tem como apanhar o erro, que é exactamente o valor que se vende.
 */
/**
 * Como um número foi obtido.
 *
 * `inputs` são os valores que entraram, `formula` é o que se fez com eles.
 * Mostrado no painel de evidência para o utilizador refazer a conta de cabeça se
 * quiser — e é isso que constrói confiança, não a promessa de que está certo.
 */
declare const calculationSchema: z.ZodObject<{
    metricId: z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>;
    period: z.ZodString;
    formula: z.ZodString;
    inputs: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodNumber;
        metricId: z.ZodNullable<z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>>;
    }, z.core.$strip>>;
    result: z.ZodNumber;
}, z.core.$strip>;
type Calculation = z.infer<typeof calculationSchema>;
/** Transacção citada como prova, com a linha original de onde saiu. */
declare const evidenceTransactionSchema: z.ZodObject<{
    id: z.ZodString;
    date: z.ZodString;
    description: z.ZodString;
    amount: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
    counterpartyName: z.ZodNullable<z.ZodString>;
    lineage: z.ZodObject<{
        importId: z.ZodString;
        fileName: z.ZodString;
        sheetName: z.ZodNullable<z.ZodString>;
        rowNumber: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
type EvidenceTransaction = z.infer<typeof evidenceTransactionSchema>;
/**
 * Pacote de evidência de uma afirmação.
 *
 * `transactionCount` e `sampleTransactions` existem separados de propósito: uma
 * afirmação pode assentar em milhares de linhas, e devolvê-las todas seria
 * inútil para o utilizador e caro para a base. Mostra-se a contagem real e uma
 * amostra, com caminho para ver o resto no explorador.
 */
declare const evidenceSchema: z.ZodObject<{
    id: z.ZodString;
    claim: z.ZodString;
    calculations: z.ZodArray<z.ZodObject<{
        metricId: z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>;
        period: z.ZodString;
        formula: z.ZodString;
        inputs: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodNumber;
            metricId: z.ZodNullable<z.ZodEnum<{
                REVENUE: "REVENUE";
                CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                EXPENSES: "EXPENSES";
                COGS: "COGS";
                OPEX: "OPEX";
                CASH: "CASH";
                ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                GROSS_PROFIT: "GROSS_PROFIT";
                GROSS_MARGIN: "GROSS_MARGIN";
                OPERATING_PROFIT: "OPERATING_PROFIT";
                EBITDA: "EBITDA";
                EBITDA_MARGIN: "EBITDA_MARGIN";
                REVENUE_GROWTH: "REVENUE_GROWTH";
                EXPENSE_GROWTH: "EXPENSE_GROWTH";
                BURN: "BURN";
                RUNWAY: "RUNWAY";
                BUDGET_VARIANCE: "BUDGET_VARIANCE";
            }>>;
        }, z.core.$strip>>;
        result: z.ZodNumber;
    }, z.core.$strip>>;
    transactionCount: z.ZodNumber;
    sampleTransactions: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        date: z.ZodString;
        description: z.ZodString;
        amount: z.ZodObject<{
            amountCents: z.ZodNumber;
            currency: z.ZodString;
        }, z.core.$strip>;
        counterpartyName: z.ZodNullable<z.ZodString>;
        lineage: z.ZodObject<{
            importId: z.ZodString;
            fileName: z.ZodString;
            sheetName: z.ZodNullable<z.ZodString>;
            rowNumber: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    sources: z.ZodArray<z.ZodObject<{
        importId: z.ZodString;
        fileName: z.ZodString;
        sheetName: z.ZodNullable<z.ZodString>;
        rowRange: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    datasetVersion: z.ZodNumber;
}, z.core.$strip>;
type Evidence = z.infer<typeof evidenceSchema>;

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
declare const insightSchema: z.ZodObject<{
    id: z.ZodString;
    type: z.ZodEnum<{
        REVENUE_DECLINE: "REVENUE_DECLINE";
        EXPENSE_SPIKE: "EXPENSE_SPIKE";
        MARGIN_DETERIORATION: "MARGIN_DETERIORATION";
        CUSTOMER_DECLINE: "CUSTOMER_DECLINE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        BUDGET_OVERRUN: "BUDGET_OVERRUN";
        CASH_RISK: "CASH_RISK";
    }>;
    severity: z.ZodEnum<{
        INFO: "INFO";
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        CRITICAL: "CRITICAL";
    }>;
    period: z.ZodString;
    titleKey: z.ZodString;
    descriptionKey: z.ZodString;
    params: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodArray<z.ZodString>]>>;
    metricId: z.ZodNullable<z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>>;
    entityId: z.ZodNullable<z.ZodString>;
    dimension: z.ZodNullable<z.ZodEnum<{
        customer: "customer";
        supplier: "supplier";
        category: "category";
    }>>;
    supportingData: z.ZodRecord<z.ZodString, z.ZodNumber>;
    evidence: z.ZodNullable<z.ZodObject<{
        id: z.ZodString;
        claim: z.ZodString;
        calculations: z.ZodArray<z.ZodObject<{
            metricId: z.ZodEnum<{
                REVENUE: "REVENUE";
                CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                EXPENSES: "EXPENSES";
                COGS: "COGS";
                OPEX: "OPEX";
                CASH: "CASH";
                ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                GROSS_PROFIT: "GROSS_PROFIT";
                GROSS_MARGIN: "GROSS_MARGIN";
                OPERATING_PROFIT: "OPERATING_PROFIT";
                EBITDA: "EBITDA";
                EBITDA_MARGIN: "EBITDA_MARGIN";
                REVENUE_GROWTH: "REVENUE_GROWTH";
                EXPENSE_GROWTH: "EXPENSE_GROWTH";
                BURN: "BURN";
                RUNWAY: "RUNWAY";
                BUDGET_VARIANCE: "BUDGET_VARIANCE";
            }>;
            period: z.ZodString;
            formula: z.ZodString;
            inputs: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodNumber;
                metricId: z.ZodNullable<z.ZodEnum<{
                    REVENUE: "REVENUE";
                    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                    EXPENSES: "EXPENSES";
                    COGS: "COGS";
                    OPEX: "OPEX";
                    CASH: "CASH";
                    ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                    ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                    BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                    GROSS_PROFIT: "GROSS_PROFIT";
                    GROSS_MARGIN: "GROSS_MARGIN";
                    OPERATING_PROFIT: "OPERATING_PROFIT";
                    EBITDA: "EBITDA";
                    EBITDA_MARGIN: "EBITDA_MARGIN";
                    REVENUE_GROWTH: "REVENUE_GROWTH";
                    EXPENSE_GROWTH: "EXPENSE_GROWTH";
                    BURN: "BURN";
                    RUNWAY: "RUNWAY";
                    BUDGET_VARIANCE: "BUDGET_VARIANCE";
                }>>;
            }, z.core.$strip>>;
            result: z.ZodNumber;
        }, z.core.$strip>>;
        transactionCount: z.ZodNumber;
        sampleTransactions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            date: z.ZodString;
            description: z.ZodString;
            amount: z.ZodObject<{
                amountCents: z.ZodNumber;
                currency: z.ZodString;
            }, z.core.$strip>;
            counterpartyName: z.ZodNullable<z.ZodString>;
            lineage: z.ZodObject<{
                importId: z.ZodString;
                fileName: z.ZodString;
                sheetName: z.ZodNullable<z.ZodString>;
                rowNumber: z.ZodNullable<z.ZodNumber>;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        sources: z.ZodArray<z.ZodObject<{
            importId: z.ZodString;
            fileName: z.ZodString;
            sheetName: z.ZodNullable<z.ZodString>;
            rowRange: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
        datasetVersion: z.ZodNumber;
    }, z.core.$strip>>;
    dismissedAt: z.ZodNullable<z.ZodISODateTime>;
    datasetVersion: z.ZodNumber;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Insight = z.infer<typeof insightSchema>;
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
declare const insightsResponseSchema: z.ZodObject<{
    period: z.ZodString;
    currency: z.ZodString;
    datasetVersion: z.ZodNumber;
    insights: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        type: z.ZodEnum<{
            REVENUE_DECLINE: "REVENUE_DECLINE";
            EXPENSE_SPIKE: "EXPENSE_SPIKE";
            MARGIN_DETERIORATION: "MARGIN_DETERIORATION";
            CUSTOMER_DECLINE: "CUSTOMER_DECLINE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            BUDGET_OVERRUN: "BUDGET_OVERRUN";
            CASH_RISK: "CASH_RISK";
        }>;
        severity: z.ZodEnum<{
            INFO: "INFO";
            LOW: "LOW";
            MEDIUM: "MEDIUM";
            HIGH: "HIGH";
            CRITICAL: "CRITICAL";
        }>;
        period: z.ZodString;
        titleKey: z.ZodString;
        descriptionKey: z.ZodString;
        params: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodArray<z.ZodString>]>>;
        metricId: z.ZodNullable<z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>>;
        entityId: z.ZodNullable<z.ZodString>;
        dimension: z.ZodNullable<z.ZodEnum<{
            customer: "customer";
            supplier: "supplier";
            category: "category";
        }>>;
        supportingData: z.ZodRecord<z.ZodString, z.ZodNumber>;
        evidence: z.ZodNullable<z.ZodObject<{
            id: z.ZodString;
            claim: z.ZodString;
            calculations: z.ZodArray<z.ZodObject<{
                metricId: z.ZodEnum<{
                    REVENUE: "REVENUE";
                    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                    EXPENSES: "EXPENSES";
                    COGS: "COGS";
                    OPEX: "OPEX";
                    CASH: "CASH";
                    ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                    ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                    BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                    GROSS_PROFIT: "GROSS_PROFIT";
                    GROSS_MARGIN: "GROSS_MARGIN";
                    OPERATING_PROFIT: "OPERATING_PROFIT";
                    EBITDA: "EBITDA";
                    EBITDA_MARGIN: "EBITDA_MARGIN";
                    REVENUE_GROWTH: "REVENUE_GROWTH";
                    EXPENSE_GROWTH: "EXPENSE_GROWTH";
                    BURN: "BURN";
                    RUNWAY: "RUNWAY";
                    BUDGET_VARIANCE: "BUDGET_VARIANCE";
                }>;
                period: z.ZodString;
                formula: z.ZodString;
                inputs: z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    value: z.ZodNumber;
                    metricId: z.ZodNullable<z.ZodEnum<{
                        REVENUE: "REVENUE";
                        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                        EXPENSES: "EXPENSES";
                        COGS: "COGS";
                        OPEX: "OPEX";
                        CASH: "CASH";
                        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                        GROSS_PROFIT: "GROSS_PROFIT";
                        GROSS_MARGIN: "GROSS_MARGIN";
                        OPERATING_PROFIT: "OPERATING_PROFIT";
                        EBITDA: "EBITDA";
                        EBITDA_MARGIN: "EBITDA_MARGIN";
                        REVENUE_GROWTH: "REVENUE_GROWTH";
                        EXPENSE_GROWTH: "EXPENSE_GROWTH";
                        BURN: "BURN";
                        RUNWAY: "RUNWAY";
                        BUDGET_VARIANCE: "BUDGET_VARIANCE";
                    }>>;
                }, z.core.$strip>>;
                result: z.ZodNumber;
            }, z.core.$strip>>;
            transactionCount: z.ZodNumber;
            sampleTransactions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                date: z.ZodString;
                description: z.ZodString;
                amount: z.ZodObject<{
                    amountCents: z.ZodNumber;
                    currency: z.ZodString;
                }, z.core.$strip>;
                counterpartyName: z.ZodNullable<z.ZodString>;
                lineage: z.ZodObject<{
                    importId: z.ZodString;
                    fileName: z.ZodString;
                    sheetName: z.ZodNullable<z.ZodString>;
                    rowNumber: z.ZodNullable<z.ZodNumber>;
                }, z.core.$strip>;
            }, z.core.$strip>>;
            sources: z.ZodArray<z.ZodObject<{
                importId: z.ZodString;
                fileName: z.ZodString;
                sheetName: z.ZodNullable<z.ZodString>;
                rowRange: z.ZodNullable<z.ZodString>;
            }, z.core.$strip>>;
            datasetVersion: z.ZodNumber;
        }, z.core.$strip>>;
        dismissedAt: z.ZodNullable<z.ZodISODateTime>;
        datasetVersion: z.ZodNumber;
        createdAt: z.ZodISODateTime;
    }, z.core.$strip>>;
}, z.core.$strip>;
type InsightsResponse = z.infer<typeof insightsResponseSchema>;
/**
 * Recomendação (§38).
 *
 * Separada do insight de propósito. O insight é o que aconteceu, e é verificável;
 * a recomendação é o que fazer a seguir, e é opinião. Misturar as duas faria uma
 * sugestão discutível herdar a autoridade de um facto — que é exactamente a
 * confusão que o §20 obriga a evitar.
 */
declare const recommendationSchema: z.ZodObject<{
    id: z.ZodString;
    insightId: z.ZodNullable<z.ZodString>;
    title: z.ZodString;
    rationale: z.ZodString;
    kind: z.ZodLiteral<"RECOMMENDATION">;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Recommendation = z.infer<typeof recommendationSchema>;
/**
 * Item do "What changed?" (§35). Cada linha é clicável até à evidência.
 *
 * `direction` e `sentiment` são minúsculas, ao contrário de todos os outros
 * enums deste pacote. Não é descuido: os outros são valores **persistidos** —
 * papéis, estados, tipos —, e estes são vocabulário de apresentação que nunca
 * chega à base. Uniformizá-los obrigaria a converter em ambos os lados para não
 * ganhar nada.
 */
declare const changeItemSchema: z.ZodObject<{
    metricId: z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>;
    unit: z.ZodString;
    actual: z.ZodNumber;
    changeAbsolute: z.ZodNumber;
    changePercent: z.ZodNullable<z.ZodNumber>;
    changePoints: z.ZodNullable<z.ZodNumber>;
    direction: z.ZodEnum<{
        up: "up";
        down: "down";
    }>;
    sentiment: z.ZodEnum<{
        positive: "positive";
        negative: "negative";
    }>;
}, z.core.$strip>;
type ChangeItem = z.infer<typeof changeItemSchema>;
declare const whatChangedResponseSchema: z.ZodObject<{
    period: z.ZodString;
    currency: z.ZodString;
    changes: z.ZodArray<z.ZodObject<{
        metricId: z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>;
        unit: z.ZodString;
        actual: z.ZodNumber;
        changeAbsolute: z.ZodNumber;
        changePercent: z.ZodNullable<z.ZodNumber>;
        changePoints: z.ZodNullable<z.ZodNumber>;
        direction: z.ZodEnum<{
            up: "up";
            down: "down";
        }>;
        sentiment: z.ZodEnum<{
            positive: "positive";
            negative: "negative";
        }>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type WhatChangedResponse = z.infer<typeof whatChangedResponseSchema>;
declare const insightFilterSchema: z.ZodObject<{
    period: z.ZodOptional<z.ZodString>;
    type: z.ZodOptional<z.ZodEnum<{
        REVENUE_DECLINE: "REVENUE_DECLINE";
        EXPENSE_SPIKE: "EXPENSE_SPIKE";
        MARGIN_DETERIORATION: "MARGIN_DETERIORATION";
        CUSTOMER_DECLINE: "CUSTOMER_DECLINE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        BUDGET_OVERRUN: "BUDGET_OVERRUN";
        CASH_RISK: "CASH_RISK";
    }>>;
    severity: z.ZodOptional<z.ZodEnum<{
        INFO: "INFO";
        LOW: "LOW";
        MEDIUM: "MEDIUM";
        HIGH: "HIGH";
        CRITICAL: "CRITICAL";
    }>>;
    includeDismissed: z.ZodPipe<z.ZodDefault<z.ZodEnum<{
        true: "true";
        false: "false";
    }>>, z.ZodTransform<boolean, "true" | "false">>;
}, z.core.$strip>;
type InsightFilter = z.infer<typeof insightFilterSchema>;

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
declare const keyPointSchema: z.ZodObject<{
    type: z.ZodEnum<{
        FACT: "FACT";
        CALCULATION: "CALCULATION";
        INFERENCE: "INFERENCE";
        RECOMMENDATION: "RECOMMENDATION";
    }>;
    text: z.ZodString;
    evidenceId: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type KeyPoint = z.infer<typeof keyPointSchema>;
/**
 * Pressuposto assumido pela resposta (§40).
 *
 * Toda a projecção assenta em pressupostos, e escondê-los é como se apresenta
 * uma opinião como previsão. Ficam explícitos e editáveis.
 */
declare const assumptionSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    inferred: z.ZodBoolean;
}, z.core.$strip>;
type Assumption = z.infer<typeof assumptionSchema>;
declare const aiRecommendationSchema: z.ZodObject<{
    title: z.ZodString;
    rationale: z.ZodString;
}, z.core.$strip>;
type AIRecommendation = z.infer<typeof aiRecommendationSchema>;
/**
 * Contrato de resposta (§19).
 *
 * Estruturado em vez de texto livre porque a UI precisa de renderizar cada parte
 * de forma diferente — e porque um contrato validável é o que permite testar que
 * o modelo não fugiu do formato (§87, testes de contrato de IA).
 */
declare const aiAnswerSchema: z.ZodObject<{
    answer: z.ZodString;
    keyPoints: z.ZodArray<z.ZodObject<{
        type: z.ZodEnum<{
            FACT: "FACT";
            CALCULATION: "CALCULATION";
            INFERENCE: "INFERENCE";
            RECOMMENDATION: "RECOMMENDATION";
        }>;
        text: z.ZodString;
        evidenceId: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    evidence: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        claim: z.ZodString;
        calculations: z.ZodArray<z.ZodObject<{
            metricId: z.ZodEnum<{
                REVENUE: "REVENUE";
                CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                EXPENSES: "EXPENSES";
                COGS: "COGS";
                OPEX: "OPEX";
                CASH: "CASH";
                ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                GROSS_PROFIT: "GROSS_PROFIT";
                GROSS_MARGIN: "GROSS_MARGIN";
                OPERATING_PROFIT: "OPERATING_PROFIT";
                EBITDA: "EBITDA";
                EBITDA_MARGIN: "EBITDA_MARGIN";
                REVENUE_GROWTH: "REVENUE_GROWTH";
                EXPENSE_GROWTH: "EXPENSE_GROWTH";
                BURN: "BURN";
                RUNWAY: "RUNWAY";
                BUDGET_VARIANCE: "BUDGET_VARIANCE";
            }>;
            period: z.ZodString;
            formula: z.ZodString;
            inputs: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodNumber;
                metricId: z.ZodNullable<z.ZodEnum<{
                    REVENUE: "REVENUE";
                    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                    EXPENSES: "EXPENSES";
                    COGS: "COGS";
                    OPEX: "OPEX";
                    CASH: "CASH";
                    ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                    ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                    BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                    GROSS_PROFIT: "GROSS_PROFIT";
                    GROSS_MARGIN: "GROSS_MARGIN";
                    OPERATING_PROFIT: "OPERATING_PROFIT";
                    EBITDA: "EBITDA";
                    EBITDA_MARGIN: "EBITDA_MARGIN";
                    REVENUE_GROWTH: "REVENUE_GROWTH";
                    EXPENSE_GROWTH: "EXPENSE_GROWTH";
                    BURN: "BURN";
                    RUNWAY: "RUNWAY";
                    BUDGET_VARIANCE: "BUDGET_VARIANCE";
                }>>;
            }, z.core.$strip>>;
            result: z.ZodNumber;
        }, z.core.$strip>>;
        transactionCount: z.ZodNumber;
        sampleTransactions: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            date: z.ZodString;
            description: z.ZodString;
            amount: z.ZodObject<{
                amountCents: z.ZodNumber;
                currency: z.ZodString;
            }, z.core.$strip>;
            counterpartyName: z.ZodNullable<z.ZodString>;
            lineage: z.ZodObject<{
                importId: z.ZodString;
                fileName: z.ZodString;
                sheetName: z.ZodNullable<z.ZodString>;
                rowNumber: z.ZodNullable<z.ZodNumber>;
            }, z.core.$strip>;
        }, z.core.$strip>>;
        sources: z.ZodArray<z.ZodObject<{
            importId: z.ZodString;
            fileName: z.ZodString;
            sheetName: z.ZodNullable<z.ZodString>;
            rowRange: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
        datasetVersion: z.ZodNumber;
    }, z.core.$strip>>;
    calculations: z.ZodArray<z.ZodObject<{
        metricId: z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>;
        period: z.ZodString;
        formula: z.ZodString;
        inputs: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodNumber;
            metricId: z.ZodNullable<z.ZodEnum<{
                REVENUE: "REVENUE";
                CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                EXPENSES: "EXPENSES";
                COGS: "COGS";
                OPEX: "OPEX";
                CASH: "CASH";
                ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                GROSS_PROFIT: "GROSS_PROFIT";
                GROSS_MARGIN: "GROSS_MARGIN";
                OPERATING_PROFIT: "OPERATING_PROFIT";
                EBITDA: "EBITDA";
                EBITDA_MARGIN: "EBITDA_MARGIN";
                REVENUE_GROWTH: "REVENUE_GROWTH";
                EXPENSE_GROWTH: "EXPENSE_GROWTH";
                BURN: "BURN";
                RUNWAY: "RUNWAY";
                BUDGET_VARIANCE: "BUDGET_VARIANCE";
            }>>;
        }, z.core.$strip>>;
        result: z.ZodNumber;
    }, z.core.$strip>>;
    assumptions: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        inferred: z.ZodBoolean;
    }, z.core.$strip>>;
    recommendations: z.ZodArray<z.ZodObject<{
        title: z.ZodString;
        rationale: z.ZodString;
    }, z.core.$strip>>;
    followUpQuestions: z.ZodArray<z.ZodString>;
    insufficientData: z.ZodBoolean;
}, z.core.$strip>;
type AIAnswer = z.infer<typeof aiAnswerSchema>;
declare const aiMessageSchema: z.ZodObject<{
    id: z.ZodString;
    conversationId: z.ZodString;
    role: z.ZodEnum<{
        USER: "USER";
        ASSISTANT: "ASSISTANT";
    }>;
    content: z.ZodString;
    answer: z.ZodNullable<z.ZodObject<{
        answer: z.ZodString;
        keyPoints: z.ZodArray<z.ZodObject<{
            type: z.ZodEnum<{
                FACT: "FACT";
                CALCULATION: "CALCULATION";
                INFERENCE: "INFERENCE";
                RECOMMENDATION: "RECOMMENDATION";
            }>;
            text: z.ZodString;
            evidenceId: z.ZodNullable<z.ZodString>;
        }, z.core.$strip>>;
        evidence: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            claim: z.ZodString;
            calculations: z.ZodArray<z.ZodObject<{
                metricId: z.ZodEnum<{
                    REVENUE: "REVENUE";
                    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                    EXPENSES: "EXPENSES";
                    COGS: "COGS";
                    OPEX: "OPEX";
                    CASH: "CASH";
                    ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                    ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                    BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                    GROSS_PROFIT: "GROSS_PROFIT";
                    GROSS_MARGIN: "GROSS_MARGIN";
                    OPERATING_PROFIT: "OPERATING_PROFIT";
                    EBITDA: "EBITDA";
                    EBITDA_MARGIN: "EBITDA_MARGIN";
                    REVENUE_GROWTH: "REVENUE_GROWTH";
                    EXPENSE_GROWTH: "EXPENSE_GROWTH";
                    BURN: "BURN";
                    RUNWAY: "RUNWAY";
                    BUDGET_VARIANCE: "BUDGET_VARIANCE";
                }>;
                period: z.ZodString;
                formula: z.ZodString;
                inputs: z.ZodArray<z.ZodObject<{
                    label: z.ZodString;
                    value: z.ZodNumber;
                    metricId: z.ZodNullable<z.ZodEnum<{
                        REVENUE: "REVENUE";
                        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                        EXPENSES: "EXPENSES";
                        COGS: "COGS";
                        OPEX: "OPEX";
                        CASH: "CASH";
                        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                        GROSS_PROFIT: "GROSS_PROFIT";
                        GROSS_MARGIN: "GROSS_MARGIN";
                        OPERATING_PROFIT: "OPERATING_PROFIT";
                        EBITDA: "EBITDA";
                        EBITDA_MARGIN: "EBITDA_MARGIN";
                        REVENUE_GROWTH: "REVENUE_GROWTH";
                        EXPENSE_GROWTH: "EXPENSE_GROWTH";
                        BURN: "BURN";
                        RUNWAY: "RUNWAY";
                        BUDGET_VARIANCE: "BUDGET_VARIANCE";
                    }>>;
                }, z.core.$strip>>;
                result: z.ZodNumber;
            }, z.core.$strip>>;
            transactionCount: z.ZodNumber;
            sampleTransactions: z.ZodArray<z.ZodObject<{
                id: z.ZodString;
                date: z.ZodString;
                description: z.ZodString;
                amount: z.ZodObject<{
                    amountCents: z.ZodNumber;
                    currency: z.ZodString;
                }, z.core.$strip>;
                counterpartyName: z.ZodNullable<z.ZodString>;
                lineage: z.ZodObject<{
                    importId: z.ZodString;
                    fileName: z.ZodString;
                    sheetName: z.ZodNullable<z.ZodString>;
                    rowNumber: z.ZodNullable<z.ZodNumber>;
                }, z.core.$strip>;
            }, z.core.$strip>>;
            sources: z.ZodArray<z.ZodObject<{
                importId: z.ZodString;
                fileName: z.ZodString;
                sheetName: z.ZodNullable<z.ZodString>;
                rowRange: z.ZodNullable<z.ZodString>;
            }, z.core.$strip>>;
            datasetVersion: z.ZodNumber;
        }, z.core.$strip>>;
        calculations: z.ZodArray<z.ZodObject<{
            metricId: z.ZodEnum<{
                REVENUE: "REVENUE";
                CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                EXPENSES: "EXPENSES";
                COGS: "COGS";
                OPEX: "OPEX";
                CASH: "CASH";
                ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                GROSS_PROFIT: "GROSS_PROFIT";
                GROSS_MARGIN: "GROSS_MARGIN";
                OPERATING_PROFIT: "OPERATING_PROFIT";
                EBITDA: "EBITDA";
                EBITDA_MARGIN: "EBITDA_MARGIN";
                REVENUE_GROWTH: "REVENUE_GROWTH";
                EXPENSE_GROWTH: "EXPENSE_GROWTH";
                BURN: "BURN";
                RUNWAY: "RUNWAY";
                BUDGET_VARIANCE: "BUDGET_VARIANCE";
            }>;
            period: z.ZodString;
            formula: z.ZodString;
            inputs: z.ZodArray<z.ZodObject<{
                label: z.ZodString;
                value: z.ZodNumber;
                metricId: z.ZodNullable<z.ZodEnum<{
                    REVENUE: "REVENUE";
                    CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
                    EXPENSES: "EXPENSES";
                    COGS: "COGS";
                    OPEX: "OPEX";
                    CASH: "CASH";
                    ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
                    ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
                    BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
                    GROSS_PROFIT: "GROSS_PROFIT";
                    GROSS_MARGIN: "GROSS_MARGIN";
                    OPERATING_PROFIT: "OPERATING_PROFIT";
                    EBITDA: "EBITDA";
                    EBITDA_MARGIN: "EBITDA_MARGIN";
                    REVENUE_GROWTH: "REVENUE_GROWTH";
                    EXPENSE_GROWTH: "EXPENSE_GROWTH";
                    BURN: "BURN";
                    RUNWAY: "RUNWAY";
                    BUDGET_VARIANCE: "BUDGET_VARIANCE";
                }>>;
            }, z.core.$strip>>;
            result: z.ZodNumber;
        }, z.core.$strip>>;
        assumptions: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodString;
            inferred: z.ZodBoolean;
        }, z.core.$strip>>;
        recommendations: z.ZodArray<z.ZodObject<{
            title: z.ZodString;
            rationale: z.ZodString;
        }, z.core.$strip>>;
        followUpQuestions: z.ZodArray<z.ZodString>;
        insufficientData: z.ZodBoolean;
    }, z.core.$strip>>;
    provider: z.ZodNullable<z.ZodString>;
    model: z.ZodNullable<z.ZodString>;
    promptVersion: z.ZodNullable<z.ZodString>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type AIMessage = z.infer<typeof aiMessageSchema>;
declare const aiConversationSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    title: z.ZodString;
    createdAt: z.ZodISODateTime;
    updatedAt: z.ZodISODateTime;
}, z.core.$strip>;
type AIConversation = z.infer<typeof aiConversationSchema>;
declare const askInputSchema: z.ZodObject<{
    question: z.ZodString;
    conversationId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    locale: z.ZodOptional<z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>>;
}, z.core.$strip>;
type AskInput = z.infer<typeof askInputSchema>;
/**
 * Consumo de IA (§15).
 *
 * Registado por pedido e nunca escondido do cliente (§81). Cobrar por mensagem
 * seria penalizar o uso da funcionalidade central; o modelo é limite por plano
 * com consumo à vista.
 */
declare const aiUsageSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    userId: z.ZodNullable<z.ZodString>;
    provider: z.ZodString;
    model: z.ZodString;
    task: z.ZodEnum<{
        FAST_ANALYSIS: "FAST_ANALYSIS";
        COMPLEX_REASONING: "COMPLEX_REASONING";
        DOCUMENT_EXTRACTION: "DOCUMENT_EXTRACTION";
        EMBEDDINGS: "EMBEDDINGS";
        EXECUTIVE_SUMMARY: "EXECUTIVE_SUMMARY";
    }>;
    inputTokens: z.ZodNumber;
    outputTokens: z.ZodNumber;
    cachedTokens: z.ZodNumber;
    estimatedCostCents: z.ZodNumber;
    latencyMs: z.ZodNumber;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type AIUsage = z.infer<typeof aiUsageSchema>;
declare const aiUsageSummarySchema: z.ZodObject<{
    period: z.ZodString;
    totalCostCents: z.ZodNumber;
    byProvider: z.ZodArray<z.ZodObject<{
        provider: z.ZodString;
        costCents: z.ZodNumber;
        requestCount: z.ZodNumber;
    }, z.core.$strip>>;
}, z.core.$strip>;
type AIUsageSummary = z.infer<typeof aiUsageSummarySchema>;
/**
 * O que o ecrã de privacidade mostra (§74).
 *
 * Sem eufemismo: que provider, que modelo, e **se os dados saem**. Um provider
 * rotulado "local" que envia para fora é exactamente o que destrói a confiança
 * que este produto vende.
 */
declare const aiPrivacyStatusSchema: z.ZodObject<{
    providerKind: z.ZodEnum<{
        mock: "mock";
        "openai-compatible": "openai-compatible";
        gemini: "gemini";
        anthropic: "anthropic";
    }>;
    model: z.ZodString;
    dataStaysLocal: z.ZodBoolean;
    retentionPolicy: z.ZodEnum<{
        ZERO_RETENTION: "ZERO_RETENTION";
        RETAINED_NO_TRAINING: "RETAINED_NO_TRAINING";
        TRAINS_ON_DATA: "TRAINS_ON_DATA";
        UNKNOWN: "UNKNOWN";
    }>;
    isBYOK: z.ZodBoolean;
    processingRegion: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type AIPrivacyStatus = z.infer<typeof aiPrivacyStatusSchema>;

/**
 * Cenários e previsão (§39, §40).
 *
 * O cálculo é determinístico e corre sobre o mesmo grafo de métricas: mudar um
 * pressuposto muda um nó, e a mudança propaga-se pelas dependências. A IA
 * explica o resultado; não o produz.
 *
 * É isso que permite a mesma pergunta dar sempre a mesma resposta — requisito
 * óbvio para quem vai levar o número a um conselho, e que um modelo generativo
 * sozinho não garante.
 */
declare const scenarioInputSchema: z.ZodObject<{
    type: z.ZodEnum<{
        REVENUE_CHANGE: "REVENUE_CHANGE";
        EXPENSE_CHANGE: "EXPENSE_CHANGE";
        HIRING: "HIRING";
        CUSTOMER_LOSS: "CUSTOMER_LOSS";
        PRICE_CHANGE: "PRICE_CHANGE";
    }>;
    name: z.ZodString;
    basePeriod: z.ZodString;
    horizonMonths: z.ZodDefault<z.ZodNumber>;
    parameters: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean]>>;
}, z.core.$strip>;
type ScenarioInput = z.infer<typeof scenarioInputSchema>;
declare const scenarioImpactSchema: z.ZodObject<{
    metricId: z.ZodEnum<{
        REVENUE: "REVENUE";
        CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
        EXPENSES: "EXPENSES";
        COGS: "COGS";
        OPEX: "OPEX";
        CASH: "CASH";
        ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
        ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
        BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
        GROSS_PROFIT: "GROSS_PROFIT";
        GROSS_MARGIN: "GROSS_MARGIN";
        OPERATING_PROFIT: "OPERATING_PROFIT";
        EBITDA: "EBITDA";
        EBITDA_MARGIN: "EBITDA_MARGIN";
        REVENUE_GROWTH: "REVENUE_GROWTH";
        EXPENSE_GROWTH: "EXPENSE_GROWTH";
        BURN: "BURN";
        RUNWAY: "RUNWAY";
        BUDGET_VARIANCE: "BUDGET_VARIANCE";
    }>;
    baseline: z.ZodNumber;
    projected: z.ZodNumber;
    changeAbsolute: z.ZodNumber;
    changePercent: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type ScenarioImpact = z.infer<typeof scenarioImpactSchema>;
declare const scenarioResultSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    name: z.ZodString;
    type: z.ZodEnum<{
        REVENUE_CHANGE: "REVENUE_CHANGE";
        EXPENSE_CHANGE: "EXPENSE_CHANGE";
        HIRING: "HIRING";
        CUSTOMER_LOSS: "CUSTOMER_LOSS";
        PRICE_CHANGE: "PRICE_CHANGE";
    }>;
    basePeriod: z.ZodString;
    currency: z.ZodString;
    impacts: z.ZodArray<z.ZodObject<{
        metricId: z.ZodEnum<{
            REVENUE: "REVENUE";
            CUSTOMER_CONCENTRATION: "CUSTOMER_CONCENTRATION";
            EXPENSES: "EXPENSES";
            COGS: "COGS";
            OPEX: "OPEX";
            CASH: "CASH";
            ACCOUNTS_RECEIVABLE: "ACCOUNTS_RECEIVABLE";
            ACCOUNTS_PAYABLE: "ACCOUNTS_PAYABLE";
            BUDGETED_EXPENSES: "BUDGETED_EXPENSES";
            GROSS_PROFIT: "GROSS_PROFIT";
            GROSS_MARGIN: "GROSS_MARGIN";
            OPERATING_PROFIT: "OPERATING_PROFIT";
            EBITDA: "EBITDA";
            EBITDA_MARGIN: "EBITDA_MARGIN";
            REVENUE_GROWTH: "REVENUE_GROWTH";
            EXPENSE_GROWTH: "EXPENSE_GROWTH";
            BURN: "BURN";
            RUNWAY: "RUNWAY";
            BUDGET_VARIANCE: "BUDGET_VARIANCE";
        }>;
        baseline: z.ZodNumber;
        projected: z.ZodNumber;
        changeAbsolute: z.ZodNumber;
        changePercent: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
    assumptions: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        inferred: z.ZodBoolean;
    }, z.core.$strip>>;
    explanation: z.ZodNullable<z.ZodString>;
    datasetVersion: z.ZodNumber;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type ScenarioResult = z.infer<typeof scenarioResultSchema>;
declare const forecastPointSchema: z.ZodObject<{
    period: z.ZodString;
    scenario: z.ZodEnum<{
        BASE: "BASE";
        UPSIDE: "UPSIDE";
        DOWNSIDE: "DOWNSIDE";
    }>;
    revenue: z.ZodNumber;
    expenses: z.ZodNumber;
    grossProfit: z.ZodNumber;
    cash: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type ForecastPoint = z.infer<typeof forecastPointSchema>;
/**
 * Previsão com os três cenários do §40.
 *
 * `assumptions` nunca é opcional: uma previsão sem pressupostos à vista é um
 * número com ar de certeza, e o §40 obriga a mostrá-los.
 */
declare const forecastSchema: z.ZodObject<{
    organizationId: z.ZodString;
    generatedFrom: z.ZodString;
    horizonMonths: z.ZodNumber;
    currency: z.ZodString;
    points: z.ZodArray<z.ZodObject<{
        period: z.ZodString;
        scenario: z.ZodEnum<{
            BASE: "BASE";
            UPSIDE: "UPSIDE";
            DOWNSIDE: "DOWNSIDE";
        }>;
        revenue: z.ZodNumber;
        expenses: z.ZodNumber;
        grossProfit: z.ZodNumber;
        cash: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
    assumptions: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodString;
        inferred: z.ZodBoolean;
    }, z.core.$strip>>;
    datasetVersion: z.ZodNumber;
}, z.core.$strip>;
type Forecast = z.infer<typeof forecastSchema>;

/**
 * Relatórios (§44, §45, §46).
 *
 * O Monthly Financial Review é o artefacto que cumpre a promessa vendável:
 * carrega os ficheiros, recebe a revisão mensal de gestão em cinco minutos. É o
 * que substitui as quatro horas que um Finance Manager gasta todos os meses.
 *
 * Entregue no M6 com secções geradas por template — sem IA. A IA chega no M7
 * para redigir a narrativa do que já existe, o que é acréscimo e não requisito.
 */
declare const REPORT_SECTION_KINDS: readonly ["EXECUTIVE_SUMMARY", "REVENUE", "EXPENSES", "PROFIT", "MARGIN", "CASH", "MAJOR_CHANGES", "RISKS", "OPPORTUNITIES", "RECOMMENDATIONS", "EVIDENCE", "APPENDIX"];
declare const reportSectionKindSchema: z.ZodEnum<{
    REVENUE: "REVENUE";
    EXECUTIVE_SUMMARY: "EXECUTIVE_SUMMARY";
    EXPENSES: "EXPENSES";
    CASH: "CASH";
    PROFIT: "PROFIT";
    MARGIN: "MARGIN";
    MAJOR_CHANGES: "MAJOR_CHANGES";
    RISKS: "RISKS";
    OPPORTUNITIES: "OPPORTUNITIES";
    RECOMMENDATIONS: "RECOMMENDATIONS";
    EVIDENCE: "EVIDENCE";
    APPENDIX: "APPENDIX";
}>;
type ReportSectionKind = z.infer<typeof reportSectionKindSchema>;
declare const reportSectionSchema: z.ZodObject<{
    kind: z.ZodEnum<{
        REVENUE: "REVENUE";
        EXECUTIVE_SUMMARY: "EXECUTIVE_SUMMARY";
        EXPENSES: "EXPENSES";
        CASH: "CASH";
        PROFIT: "PROFIT";
        MARGIN: "MARGIN";
        MAJOR_CHANGES: "MAJOR_CHANGES";
        RISKS: "RISKS";
        OPPORTUNITIES: "OPPORTUNITIES";
        RECOMMENDATIONS: "RECOMMENDATIONS";
        EVIDENCE: "EVIDENCE";
        APPENDIX: "APPENDIX";
    }>;
    title: z.ZodString;
    body: z.ZodString;
    aiGenerated: z.ZodBoolean;
}, z.core.$strip>;
type ReportSection = z.infer<typeof reportSectionSchema>;
/**
 * Metadados de reprodutibilidade (§46).
 *
 * Sem isto, reimprimir o relatório de Julho depois de alguém corrigir um
 * ficheiro dá outro número, e ninguém consegue dizer qual estava certo. Num
 * documento que vai para um banco ou um conselho, é a diferença entre relatório
 * e rascunho.
 */
declare const reportMetadataSchema: z.ZodObject<{
    organizationId: z.ZodString;
    period: z.ZodString;
    datasetVersion: z.ZodNumber;
    metricsVersion: z.ZodString;
    aiProvider: z.ZodNullable<z.ZodString>;
    aiModel: z.ZodNullable<z.ZodString>;
    promptVersion: z.ZodNullable<z.ZodString>;
    locale: z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>;
    generatedAt: z.ZodISODateTime;
    generatedByUserId: z.ZodString;
}, z.core.$strip>;
type ReportMetadata = z.infer<typeof reportMetadataSchema>;
declare const reportSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    title: z.ZodString;
    period: z.ZodString;
    sections: z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            REVENUE: "REVENUE";
            EXECUTIVE_SUMMARY: "EXECUTIVE_SUMMARY";
            EXPENSES: "EXPENSES";
            CASH: "CASH";
            PROFIT: "PROFIT";
            MARGIN: "MARGIN";
            MAJOR_CHANGES: "MAJOR_CHANGES";
            RISKS: "RISKS";
            OPPORTUNITIES: "OPPORTUNITIES";
            RECOMMENDATIONS: "RECOMMENDATIONS";
            EVIDENCE: "EVIDENCE";
            APPENDIX: "APPENDIX";
        }>;
        title: z.ZodString;
        body: z.ZodString;
        aiGenerated: z.ZodBoolean;
    }, z.core.$strip>>;
    metadata: z.ZodObject<{
        organizationId: z.ZodString;
        period: z.ZodString;
        datasetVersion: z.ZodNumber;
        metricsVersion: z.ZodString;
        aiProvider: z.ZodNullable<z.ZodString>;
        aiModel: z.ZodNullable<z.ZodString>;
        promptVersion: z.ZodNullable<z.ZodString>;
        locale: z.ZodEnum<{
            "pt-PT": "pt-PT";
            "pt-BR": "pt-BR";
            es: "es";
            en: "en";
        }>;
        generatedAt: z.ZodISODateTime;
        generatedByUserId: z.ZodString;
    }, z.core.$strip>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Report = z.infer<typeof reportSchema>;
declare const generateReportInputSchema: z.ZodObject<{
    period: z.ZodString;
    locale: z.ZodOptional<z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>>;
    useAI: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
type GenerateReportInput = z.infer<typeof generateReportInputSchema>;
declare const exportRequestSchema: z.ZodObject<{
    format: z.ZodEnum<{
        CSV: "CSV";
        XLSX: "XLSX";
        PDF: "PDF";
    }>;
    locale: z.ZodOptional<z.ZodEnum<{
        "pt-PT": "pt-PT";
        "pt-BR": "pt-BR";
        es: "es";
        en: "en";
    }>>;
}, z.core.$strip>;
type ExportRequest = z.infer<typeof exportRequestSchema>;
/**
 * Ficheiro exportado.
 *
 * URL assinado e de vida curta, servido de fora do domínio da aplicação — um
 * relatório financeiro acessível por link permanente seria fuga com aparência de
 * funcionalidade.
 */
declare const exportResultSchema: z.ZodObject<{
    url: z.ZodString;
    fileName: z.ZodString;
    expiresAt: z.ZodISODateTime;
}, z.core.$strip>;
type ExportResult = z.infer<typeof exportResultSchema>;

/**
 * Faturação (§78–§81).
 *
 * Dois princípios que moldam o modelo:
 *
 * 1. **Nunca cobrar IA por mensagem.** Cobrar por pergunta ensina o cliente a
 *    evitar a funcionalidade central. O modelo é limite por plano com consumo
 *    sempre à vista (§81).
 *
 * 2. **Segurança não é plano pago.** Cifragem, isolamento, audit log e o direito
 *    a exportar e apagar são iguais em todos os planos — o RGPD Art. 32 e a LGPD
 *    Art. 46 obrigam a medidas adequadas para todo o tratamento, e um plano "sem
 *    protecção" seria prova documentada de incumprimento. O que escala por preço
 *    é **soberania e controlo**: residência de dados, on-premise, BYOK, IA
 *    privada, SSO, retenção à medida. Ver `docs/SEGURANCA_E_PRIVACIDADE.md`.
 */
/**
 * Limites por plano.
 *
 * `null` significa sem limite. Ultrapassar bloqueia a acção nova, nunca apaga
 * nem esconde dados já lá — perder acesso ao histórico por causa de faturação
 * seria reter dados do cliente como refém.
 */
declare const planLimitsSchema: z.ZodObject<{
    maxUsers: z.ZodNullable<z.ZodNumber>;
    maxTransactions: z.ZodNullable<z.ZodNumber>;
    maxOrganizations: z.ZodNullable<z.ZodNumber>;
    aiMonthlyAllowanceCents: z.ZodNullable<z.ZodNumber>;
    allowAIOverage: z.ZodBoolean;
    canUseBYOK: z.ZodBoolean;
    canUseLocalAI: z.ZodBoolean;
    canChooseDataRegion: z.ZodBoolean;
    canUseSSO: z.ZodBoolean;
    canExportAuditLog: z.ZodBoolean;
    canWhiteLabel: z.ZodBoolean;
    auditLogRetentionMonths: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type PlanLimits = z.infer<typeof planLimitsSchema>;
declare const planSchema: z.ZodObject<{
    tier: z.ZodEnum<{
        STARTER: "STARTER";
        GROWTH: "GROWTH";
        BUSINESS: "BUSINESS";
        ENTERPRISE: "ENTERPRISE";
    }>;
    name: z.ZodString;
    monthlyPriceCents: z.ZodNumber;
    yearlyPriceCents: z.ZodNumber;
    currency: z.ZodString;
    limits: z.ZodObject<{
        maxUsers: z.ZodNullable<z.ZodNumber>;
        maxTransactions: z.ZodNullable<z.ZodNumber>;
        maxOrganizations: z.ZodNullable<z.ZodNumber>;
        aiMonthlyAllowanceCents: z.ZodNullable<z.ZodNumber>;
        allowAIOverage: z.ZodBoolean;
        canUseBYOK: z.ZodBoolean;
        canUseLocalAI: z.ZodBoolean;
        canChooseDataRegion: z.ZodBoolean;
        canUseSSO: z.ZodBoolean;
        canExportAuditLog: z.ZodBoolean;
        canWhiteLabel: z.ZodBoolean;
        auditLogRetentionMonths: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
}, z.core.$strip>;
type Plan = z.infer<typeof planSchema>;
declare const subscriptionSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    tier: z.ZodEnum<{
        STARTER: "STARTER";
        GROWTH: "GROWTH";
        BUSINESS: "BUSINESS";
        ENTERPRISE: "ENTERPRISE";
    }>;
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        TRIALING: "TRIALING";
        PAST_DUE: "PAST_DUE";
        CANCELED: "CANCELED";
        INCOMPLETE: "INCOMPLETE";
    }>;
    provider: z.ZodEnum<{
        mock: "mock";
        stripe: "stripe";
        openpix: "openpix";
    }>;
    currentPeriodEnd: z.ZodNullable<z.ZodISODateTime>;
    cancelAtPeriodEnd: z.ZodBoolean;
    trialEndsAt: z.ZodNullable<z.ZodISODateTime>;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Subscription = z.infer<typeof subscriptionSchema>;
declare const createCheckoutInputSchema: z.ZodObject<{
    tier: z.ZodEnum<{
        STARTER: "STARTER";
        GROWTH: "GROWTH";
        BUSINESS: "BUSINESS";
        ENTERPRISE: "ENTERPRISE";
    }>;
    interval: z.ZodEnum<{
        MONTHLY: "MONTHLY";
        YEARLY: "YEARLY";
    }>;
    provider: z.ZodOptional<z.ZodEnum<{
        mock: "mock";
        stripe: "stripe";
        openpix: "openpix";
    }>>;
    successUrl: z.ZodString;
    cancelUrl: z.ZodString;
}, z.core.$strip>;
type CreateCheckoutInput = z.infer<typeof createCheckoutInputSchema>;
declare const checkoutSessionSchema: z.ZodObject<{
    url: z.ZodString;
    sessionId: z.ZodString;
}, z.core.$strip>;
type CheckoutSession = z.infer<typeof checkoutSessionSchema>;
/** Consumo face aos limites, para o painel nunca esconder o gasto (§81). */
declare const usageSummarySchema: z.ZodObject<{
    organizationId: z.ZodString;
    tier: z.ZodEnum<{
        STARTER: "STARTER";
        GROWTH: "GROWTH";
        BUSINESS: "BUSINESS";
        ENTERPRISE: "ENTERPRISE";
    }>;
    users: z.ZodObject<{
        used: z.ZodNumber;
        limit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
    transactions: z.ZodObject<{
        used: z.ZodNumber;
        limit: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>;
    ai: z.ZodObject<{
        spent: z.ZodObject<{
            amountCents: z.ZodNumber;
            currency: z.ZodString;
        }, z.core.$strip>;
        allowance: z.ZodNullable<z.ZodObject<{
            amountCents: z.ZodNumber;
            currency: z.ZodString;
        }, z.core.$strip>>;
        overageAllowed: z.ZodBoolean;
    }, z.core.$strip>;
}, z.core.$strip>;
type UsageSummary = z.infer<typeof usageSummarySchema>;

export { ACTIVITY_SUBJECTS, ACTIVITY_TYPES, type AIAnswer, type AIConversation, type AIMessage, type AIPrivacyStatus, type AIProviderConfig, type AIProviderKind, type AIRecommendation, type AIResponseType, type AIRetentionPolicy, type AITask, type AIUsage, type AIUsageSummary, AI_PROVIDER_KINDS, AI_RESPONSE_TYPES, AI_RETENTION_POLICIES, AI_TASKS, AUDIT_ACTIONS, type Activity, type ActivitySubject, type ActivityType, type ApiError, type AskInput, type Assumption, type AuditAction, type AuditEvent, type AuthResponse, type BrandingConfig, type BreakdownItem, type Budget, CONNECTOR_CAPABILITIES, CUSTOMER_STATUSES, type Calculation, type Category, type ChangeItem, type CheckoutSession, type ColumnMapping, type ConfirmMappingInput, type ConnectionHealth, type ConnectorCapability, type CreateCheckoutInput, type CreateLeadInput, type CreateOpportunityInput, type Currency, type Customer, type CustomerStatus, DATA_CLASSES, DATA_QUALITY_ISSUE_TYPES, DATA_SOURCE_KINDS, DEFAULT_LOCALE, type DashboardSummary, type DataClass, type DataQualityIssue, type DataQualityIssueType, type DataQualitySummary, type DataSource, type DataSourceKind, type Dataset, type Delta, type DiscoveredEntity, type DiscoveredField, type DiscoveredSchema, EXPORT_FORMATS, type Evidence, type EvidenceTransaction, type ExportFormat, type ExportRequest, type ExportResult, FORECAST_SCENARIOS, type Forecast, type ForecastPoint, type ForecastScenario, type GenerateReportInput, IMPORT_STATES, IMPORT_TRIGGERS, INSIGHT_TYPES, type Id, type Import, type ImportFilter, type ImportMapping, type ImportProgress, type ImportState, type ImportTrigger, type Insight, type InsightFilter, type InsightType, type InsightsResponse, type InviteMemberInput, type IsoDate, type IsoDateTime, type KeyPoint, LEAD_STATUSES, LOCALES, type Lead, type LeadFilter, type LeadStatus, type LineageRef, type Locale, type LoginInput, METRIC_IDS, METRIC_UNITS, type Member, type Membership, type MetricId, type MetricNodeSpec, type MetricQuery, type MetricUnit, type MetricValue, type Money, OPPORTUNITY_STAGES, OVERVIEW_SECTIONS, type Opportunity, type OpportunityStage, type Organization, type OrganizationSettings, type OverviewSection, type OverviewShape, PASSWORD_MIN_LENGTH, PAYMENT_PROVIDERS, PERIOD_GRANULARITIES, PERMISSIONS, PLAN_TIERS, type Paginated, type PaginationQuery, type Partner, type PaymentProviderKind, type Percentage, type Period, type PeriodGranularity, type PeriodRange, type Permission, type PipelineSummary, type Plan, type PlanLimits, type PlanTier, REPORT_SECTION_KINDS, ROLES, ROLE_PERMISSIONS, type Recommendation, type RefreshInput, type Report, type ReportMetadata, type ReportSection, type ReportSectionKind, type RequestPasswordResetInput, type ResetPasswordInput, type Role, SCENARIO_TYPES, SEVERITIES, SUBSCRIPTION_STATUSES, type ScenarioImpact, type ScenarioInput, type ScenarioResult, type ScenarioType, type SessionOrganization, type SessionUser, type Severity, type SignupInput, type Subscription, type SubscriptionStatus, type Supplier, type SyncCursor, TARGET_FIELDS, TRANSACTION_TYPES, type TargetField, type TimeSeriesPoint, type TokenPair, type Transaction, type TransactionFilter, type TransactionType, type UpdateLeadInput, type UpdateOrganizationSettingsInput, type UpsertAIProviderConfigInput, type UsageSummary, type VarianceContribution, type VarianceTree, type WhatChangedResponse, activitySchema, activitySubjectSchema, activityTypeSchema, aiAnswerSchema, aiConversationSchema, aiMessageSchema, aiPrivacyStatusSchema, aiProviderConfigSchema, aiProviderKindSchema, aiRecommendationSchema, aiResponseTypeSchema, aiRetentionPolicySchema, aiTaskSchema, aiUsageSchema, aiUsageSummarySchema, apiErrorSchema, askInputSchema, assumptionSchema, auditActionSchema, auditEventSchema, authResponseSchema, brandingConfigSchema, breakdownItemSchema, budgetSchema, calculationSchema, categorySchema, changeItemSchema, checkoutSessionSchema, columnMappingSchema, confirmMappingInputSchema, connectionHealthSchema, connectorCapabilitySchema, createCheckoutInputSchema, createLeadInputSchema, createOpportunityInputSchema, currencySchema, customerSchema, customerStatusSchema, dashboardSummarySchema, dataClassSchema, dataQualityIssueSchema, dataQualityIssueTypeSchema, dataQualitySummarySchema, dataSourceKindSchema, dataSourceSchema, datasetSchema, deltaSchema, discoveredEntitySchema, discoveredFieldSchema, discoveredSchemaSchema, emailSchema, evidenceSchema, evidenceTransactionSchema, exportFormatSchema, exportRequestSchema, exportResultSchema, forecastPointSchema, forecastScenarioSchema, forecastSchema, generateReportInputSchema, idSchema, importFilterSchema, importMappingSchema, importProgressSchema, importSchema, importStateSchema, importTriggerSchema, insightFilterSchema, insightSchema, insightTypeSchema, insightsResponseSchema, inviteMemberInputSchema, isoDateSchema, isoDateTimeSchema, keyPointSchema, leadFilterSchema, leadSchema, leadStatusSchema, lineageRefSchema, localeSchema, loginInputSchema, memberSchema, membershipSchema, metricIdSchema, metricNodeSpecSchema, metricQuerySchema, metricUnitSchema, metricValueSchema, moneySchema, opportunitySchema, opportunityStageSchema, organizationSchema, organizationSettingsSchema, overviewSectionSchema, overviewShapeSchema, paginatedSchema, paginationQuerySchema, partnerSchema, passwordSchema, paymentProviderSchema, percentageSchema, periodGranularitySchema, periodRangeSchema, periodSchema, permissionSchema, pipelineSummarySchema, planLimitsSchema, planSchema, planTierSchema, recommendationSchema, refreshInputSchema, reportMetadataSchema, reportSchema, reportSectionKindSchema, reportSectionSchema, requestPasswordResetInputSchema, resetPasswordInputSchema, roleSchema, scenarioImpactSchema, scenarioInputSchema, scenarioResultSchema, scenarioTypeSchema, sessionOrganizationSchema, sessionUserSchema, severitySchema, signupInputSchema, subscriptionSchema, subscriptionStatusSchema, supplierSchema, syncCursorSchema, targetFieldSchema, timeSeriesPointSchema, tokenPairSchema, transactionFilterSchema, transactionSchema, transactionTypeSchema, updateLeadInputSchema, updateOrganizationSettingsInputSchema, upsertAIProviderConfigInputSchema, usageSummarySchema, varianceContributionSchema, varianceTreeSchema, whatChangedResponseSchema };
