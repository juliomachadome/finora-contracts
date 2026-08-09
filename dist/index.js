import { z } from 'zod';

// src/enums.ts
var ROLES = [
  "OWNER",
  "ADMIN",
  "CFO",
  "FINANCE_MANAGER",
  "ANALYST",
  "VIEWER",
  "AUDITOR"
];
var roleSchema = z.enum(ROLES);
var PERMISSIONS = [
  "upload_data",
  "delete_data",
  "view_financials",
  "ask_ai",
  "run_scenarios",
  "export_reports",
  "manage_billing",
  "manage_ai",
  "manage_users",
  "view_audit_logs",
  "view_crm",
  "manage_crm"
];
var permissionSchema = z.enum(PERMISSIONS);
var ROLE_PERMISSIONS = {
  OWNER: [...PERMISSIONS],
  ADMIN: [
    "upload_data",
    "delete_data",
    "view_financials",
    "ask_ai",
    "run_scenarios",
    "export_reports",
    "manage_ai",
    "manage_users",
    "view_audit_logs",
    "view_crm",
    "manage_crm"
  ],
  CFO: [
    "upload_data",
    "view_financials",
    "ask_ai",
    "run_scenarios",
    "export_reports",
    "view_audit_logs",
    "view_crm",
    "manage_crm"
  ],
  FINANCE_MANAGER: [
    "upload_data",
    "view_financials",
    "ask_ai",
    "run_scenarios",
    "export_reports",
    "view_crm"
  ],
  ANALYST: ["view_financials", "ask_ai", "run_scenarios", "export_reports", "view_crm"],
  VIEWER: ["view_financials", "view_crm"],
  // O auditor vê tudo o que é histórico e não altera nada — nem sequer pergunta
  // à IA, porque uma resposta gerada não é evidência auditável.
  AUDITOR: ["view_financials", "view_audit_logs", "export_reports"]
};
var DATA_SOURCE_KINDS = [
  "FILE_UPLOAD",
  // Declarados agora, implementados quando houver procura (§98, §107).
  // Estar no enum é o que garante que a arquitectura os acomoda sem migração.
  "XERO",
  "QUICKBOOKS",
  "SAGE",
  "PRIMAVERA",
  "PHC",
  "OMIE",
  "CONTA_AZUL",
  "SAP",
  "ORACLE",
  "NETSUITE",
  "STRIPE",
  "SHOPIFY",
  "HUBSPOT",
  "SALESFORCE",
  "OPEN_BANKING"
];
var dataSourceKindSchema = z.enum(DATA_SOURCE_KINDS);
var CONNECTOR_CAPABILITIES = [
  "OAUTH",
  "INCREMENTAL_SYNC",
  "WEBHOOK",
  "BACKFILL"
];
var connectorCapabilitySchema = z.enum(CONNECTOR_CAPABILITIES);
var IMPORT_STATES = [
  "UPLOADED",
  "PROCESSING",
  "MAPPING_REQUIRED",
  "NORMALIZING",
  "VALIDATING",
  "COMPLETED",
  "FAILED"
];
var importStateSchema = z.enum(IMPORT_STATES);
var IMPORT_TRIGGERS = ["MANUAL_UPLOAD", "SCHEDULED_SYNC", "WEBHOOK"];
var importTriggerSchema = z.enum(IMPORT_TRIGGERS);
var DATA_QUALITY_ISSUE_TYPES = [
  "MISSING_CATEGORY",
  "MISSING_CUSTOMER",
  "DUPLICATE_TRANSACTION",
  "INVALID_DATE",
  "INVALID_AMOUNT",
  "INCONSISTENT_CURRENCY",
  "UNMAPPED_COLUMN",
  "SUSPECTED_PAYROLL"
];
var dataQualityIssueTypeSchema = z.enum(DATA_QUALITY_ISSUE_TYPES);
var TRANSACTION_TYPES = ["REVENUE", "EXPENSE", "BANK"];
var transactionTypeSchema = z.enum(TRANSACTION_TYPES);
var PERIOD_GRANULARITIES = ["MONTH", "QUARTER", "YEAR"];
var periodGranularitySchema = z.enum(PERIOD_GRANULARITIES);
var INSIGHT_TYPES = [
  "REVENUE_DECLINE",
  "EXPENSE_SPIKE",
  "MARGIN_DETERIORATION",
  "CUSTOMER_DECLINE",
  "CUSTOMER_CONCENTRATION",
  "BUDGET_OVERRUN",
  "CASH_RISK"
];
var insightTypeSchema = z.enum(INSIGHT_TYPES);
var SEVERITIES = ["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"];
var severitySchema = z.enum(SEVERITIES);
var AI_PROVIDER_KINDS = [
  "mock",
  // Um único adapter serve tudo o que fala o protocolo OpenAI: OpenAI, Ollama,
  // vLLM, LM Studio, Groq, OpenRouter, DeepSeek, Mistral, xAI e o gateway de IA
  // do cliente (§13).
  "openai-compatible",
  // Adapters nativos, para aproveitar tool calling, structured output e caching
  // próprios (M7).
  "gemini",
  "anthropic"
];
var aiProviderKindSchema = z.enum(AI_PROVIDER_KINDS);
var AI_TASKS = [
  "FAST_ANALYSIS",
  "COMPLEX_REASONING",
  "DOCUMENT_EXTRACTION",
  "EMBEDDINGS",
  "EXECUTIVE_SUMMARY"
];
var aiTaskSchema = z.enum(AI_TASKS);
var AI_RESPONSE_TYPES = ["FACT", "CALCULATION", "INFERENCE", "RECOMMENDATION"];
var aiResponseTypeSchema = z.enum(AI_RESPONSE_TYPES);
var AI_RETENTION_POLICIES = [
  "ZERO_RETENTION",
  "RETAINED_NO_TRAINING",
  "TRAINS_ON_DATA",
  "UNKNOWN"
];
var aiRetentionPolicySchema = z.enum(AI_RETENTION_POLICIES);
var CUSTOMER_STATUSES = ["PROSPECT", "ACTIVE", "AT_RISK", "CHURNED"];
var customerStatusSchema = z.enum(CUSTOMER_STATUSES);
var LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DISQUALIFIED",
  "CONVERTED"
];
var leadStatusSchema = z.enum(LEAD_STATUSES);
var OPPORTUNITY_STAGES = [
  "DISCOVERY",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST"
];
var opportunityStageSchema = z.enum(OPPORTUNITY_STAGES);
var ACTIVITY_TYPES = ["NOTE", "CALL", "EMAIL", "MEETING", "TASK"];
var activityTypeSchema = z.enum(ACTIVITY_TYPES);
var SCENARIO_TYPES = [
  "REVENUE_CHANGE",
  "EXPENSE_CHANGE",
  "HIRING",
  "CUSTOMER_LOSS",
  "PRICE_CHANGE"
];
var scenarioTypeSchema = z.enum(SCENARIO_TYPES);
var FORECAST_SCENARIOS = ["BASE", "UPSIDE", "DOWNSIDE"];
var forecastScenarioSchema = z.enum(FORECAST_SCENARIOS);
var EXPORT_FORMATS = ["CSV", "XLSX", "PDF"];
var exportFormatSchema = z.enum(EXPORT_FORMATS);
var PLAN_TIERS = ["STARTER", "GROWTH", "BUSINESS", "ENTERPRISE"];
var planTierSchema = z.enum(PLAN_TIERS);
var SUBSCRIPTION_STATUSES = [
  "TRIALING",
  "ACTIVE",
  "PAST_DUE",
  "CANCELED",
  "INCOMPLETE"
];
var subscriptionStatusSchema = z.enum(SUBSCRIPTION_STATUSES);
var PAYMENT_PROVIDERS = ["mock", "stripe", "openpix"];
var paymentProviderSchema = z.enum(PAYMENT_PROVIDERS);
var LOCALES = ["pt-PT", "pt-BR", "es", "en"];
var localeSchema = z.enum(LOCALES);
var DEFAULT_LOCALE = "en";
var DATA_CLASSES = ["S0", "S1", "S2", "S3"];
var dataClassSchema = z.enum(DATA_CLASSES);
var AUDIT_ACTIONS = [
  "USER_LOGIN",
  "USER_LOGOUT",
  "USER_INVITED",
  "USER_ROLE_CHANGED",
  "DATA_UPLOADED",
  "DATA_DELETED",
  "MAPPING_CHANGED",
  "DATA_CORRECTED",
  "AI_REQUESTED",
  "REPORT_GENERATED",
  "DATA_EXPORTED",
  "SCENARIO_RUN",
  "BILLING_CHANGED",
  "AI_PROVIDER_CONFIGURED",
  "ORGANIZATION_SETTINGS_CHANGED"
];
var auditActionSchema = z.enum(AUDIT_ACTIONS);
var idSchema = z.string().uuid();
var isoDateTimeSchema = z.iso.datetime();
var isoDateSchema = z.iso.date();
var periodSchema = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "per\xEDodo tem de ser YYYY-MM");
var currencySchema = z.string().length(3).toUpperCase();
var moneySchema = z.object({
  /** Inteiro em cêntimos. 1234 = 12,34. Negativo é permitido (estornos). */
  amountCents: z.number().int(),
  currency: currencySchema
});
var percentageSchema = z.number();
var deltaSchema = z.object({
  current: z.number(),
  previous: z.number(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  /** Para margens, em pontos percentuais. 2.8 = +2,8pp. */
  changePoints: z.number().nullable().optional()
});
var apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.array(z.string())).optional(),
  /** Para o utilizador citar ao pedir apoio, e para cruzar com o log. */
  requestId: z.string().optional()
});
var paginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50)
});
var paginatedSchema = (item) => z.object({
  items: z.array(item),
  nextCursor: z.string().nullable(),
  /** Só quando é barato de obter. Ausente não significa zero. */
  totalCount: z.number().int().optional()
});
var periodRangeSchema = z.object({
  from: periodSchema,
  to: periodSchema
}).refine((r) => r.from <= r.to, {
  message: "from tem de ser anterior ou igual a to",
  path: ["from"]
});
var PASSWORD_MIN_LENGTH = 12;
var passwordSchema = z.string().min(PASSWORD_MIN_LENGTH, `m\xEDnimo de ${PASSWORD_MIN_LENGTH} caracteres`).max(200);
var emailSchema = z.string().email().toLowerCase().trim();
var signupInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1).max(120).trim(),
  /** Criada no mesmo passo: uma conta sem organização não faz nada. */
  organizationName: z.string().min(1).max(160).trim(),
  locale: localeSchema.optional(),
  acceptedTermsAt: isoDateTimeSchema
});
var loginInputSchema = z.object({
  email: emailSchema,
  password: z.string().min(1)
});
var refreshInputSchema = z.object({
  refreshToken: z.string().min(1)
});
var requestPasswordResetInputSchema = z.object({
  email: emailSchema
});
var resetPasswordInputSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema
});
var tokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  /** Segundos até o access expirar. O cliente renova antes, não depois de falhar. */
  expiresIn: z.number().int().positive()
});
var sessionOrganizationSchema = z.object({
  id: idSchema,
  name: z.string(),
  slug: z.string(),
  role: roleSchema,
  permissions: z.array(permissionSchema),
  baseCurrency: z.string().length(3)
});
var sessionUserSchema = z.object({
  id: idSchema,
  email: emailSchema,
  name: z.string(),
  locale: localeSchema,
  organizations: z.array(sessionOrganizationSchema),
  currentOrganizationId: idSchema.nullable()
});
var authResponseSchema = z.object({
  user: sessionUserSchema,
  tokens: tokenPairSchema
});
var organizationSchema = z.object({
  id: idSchema,
  name: z.string(),
  slug: z.string(),
  partnerId: idSchema.nullable(),
  baseCurrency: currencySchema,
  locale: localeSchema,
  /** IANA, ex. `Europe/Lisbon`. Decide a que mês pertence uma transacção. */
  timezone: z.string(),
  /** Mês em que começa o ano fiscal, 1–12. Nem toda a empresa fecha em Dezembro. */
  fiscalYearStartMonth: z.number().int().min(1).max(12),
  createdAt: isoDateTimeSchema
});
var membershipSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  userId: idSchema,
  role: roleSchema,
  createdAt: isoDateTimeSchema
});
var memberSchema = z.object({
  id: idSchema,
  userId: idSchema,
  name: z.string(),
  email: z.string(),
  role: roleSchema,
  createdAt: isoDateTimeSchema,
  lastActiveAt: isoDateTimeSchema.nullable()
});
var partnerSchema = z.object({
  id: idSchema,
  name: z.string(),
  slug: z.string(),
  createdAt: isoDateTimeSchema
});
var brandingConfigSchema = z.object({
  productName: z.string().max(60).nullable(),
  logoUrl: z.string().url().nullable(),
  faviconUrl: z.string().url().nullable(),
  primaryColor: z.string().regex(/^#[0-9a-fA-F]{6}$/, "cor tem de ser hexadecimal, ex. #1a1a1a").nullable(),
  customDomain: z.string().nullable()
});
var organizationSettingsSchema = z.object({
  baseCurrency: currencySchema,
  locale: localeSchema,
  timezone: z.string(),
  fiscalYearStartMonth: z.number().int().min(1).max(12),
  dataRetentionMonths: z.number().int().min(1).max(120).nullable(),
  aiDataProcessingConsent: z.boolean(),
  /** Pseudonimizar nomes ao detectar padrão de folha de salários na ingestão. */
  pseudonymizePayroll: z.boolean(),
  branding: brandingConfigSchema.nullable()
});
var updateOrganizationSettingsInputSchema = organizationSettingsSchema.partial();
var inviteMemberInputSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  role: roleSchema
});
var dataSourceSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: dataSourceKindSchema,
  name: z.string(),
  capabilities: z.array(connectorCapabilitySchema),
  /**
   * Configuração não secreta: endpoint, id de empresa remota, filtros.
   * As credenciais nunca vivem aqui — vivem cifradas e nunca saem do backend.
   */
  config: z.record(z.string(), z.unknown()),
  /** Nunca `true` para o frontend saber a chave; só se ela existe. */
  hasCredentials: z.boolean(),
  lastSyncAt: isoDateTimeSchema.nullable(),
  lastSyncError: z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var syncCursorSchema = z.object({
  /** Marca de água do fornecedor: timestamp, id sequencial ou token opaco. */
  value: z.string(),
  updatedAt: isoDateTimeSchema
});
var discoveredFieldSchema = z.object({
  name: z.string(),
  /** Tipo inferido da amostra, não declarado. Excel mente sobre tipos. */
  inferredType: z.enum(["date", "number", "string", "boolean", "empty", "mixed"]),
  /** Primeiras linhas, para o utilizador reconhecer a coluna ao mapear. */
  sampleValues: z.array(z.string()),
  nullRatio: z.number().min(0).max(1)
});
var discoveredEntitySchema = z.object({
  /** Nome da folha, tabela ou entidade remota. */
  name: z.string(),
  rowCount: z.number().int().nonnegative(),
  fields: z.array(discoveredFieldSchema),
  /**
   * Sinalizado quando as colunas parecem folha de salários.
   *
   * É o ficheiro com salário associado a pessoa identificada — dado pessoal de
   * terceiros e a razão nº1 para um CFO não carregar nada. Detectar permite
   * oferecer pseudonimização antes de persistir, em vez de descobrir depois.
   */
  suspectedPayroll: z.boolean()
});
var discoveredSchemaSchema = z.object({
  entities: z.array(discoveredEntitySchema)
});
var connectionHealthSchema = z.object({
  ok: z.boolean(),
  message: z.string(),
  checkedAt: isoDateTimeSchema
});
var aiProviderConfigSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: z.string(),
  model: z.string(),
  baseUrl: z.string().nullable(),
  apiKeyMask: z.string().nullable(),
  embeddingModel: z.string().nullable(),
  retentionPolicy: aiRetentionPolicySchema,
  /** Falso quando o endpoint sai da máquina ou da região do cliente. */
  dataStaysLocal: z.boolean(),
  isActive: z.boolean(),
  createdAt: isoDateTimeSchema
});
var upsertAIProviderConfigInputSchema = z.object({
  kind: z.string(),
  model: z.string().min(1),
  baseUrl: z.string().url().nullable().optional(),
  /** Só na escrita. Nunca volta numa leitura. */
  apiKey: z.string().min(1).nullable().optional(),
  embeddingModel: z.string().nullable().optional(),
  retentionPolicy: aiRetentionPolicySchema.optional()
});
var datasetSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  /**
   * Sobe a cada import concluído.
   *
   * É a peça que torna os relatórios reproduzíveis (§46) e que invalida o cache
   * de métricas por construção: chave nova, valores antigos deixam de ser lidos,
   * sem invalidação manual — que é onde nascem os números errados em cache.
   */
  version: z.number().int().positive(),
  transactionCount: z.number().int().nonnegative(),
  updatedAt: isoDateTimeSchema
});
var importSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  dataSourceId: idSchema,
  datasetId: idSchema.nullable(),
  trigger: importTriggerSchema,
  state: importStateSchema,
  fileName: z.string(),
  fileSizeBytes: z.number().int().nonnegative(),
  /**
   * SHA-256 do conteúdo.
   *
   * Com `unique(organizationId, fileHash)` na base, carregar duas vezes o mesmo
   * ficheiro é rejeitado pela constraint (§92). A verificação é a constraint, e
   * não um `findFirst` antes do `create` — entre o ler e o escrever cabe outro
   * pedido, e é assim que nascem duplicados em produção.
   */
  fileHash: z.string(),
  rowsTotal: z.number().int().nonnegative(),
  rowsImported: z.number().int().nonnegative(),
  rowsSkipped: z.number().int().nonnegative(),
  errorMessage: z.string().nullable(),
  createdAt: isoDateTimeSchema,
  completedAt: isoDateTimeSchema.nullable()
});
var TARGET_FIELDS = [
  "date",
  "description",
  "amount",
  "currency",
  "customer",
  "supplier",
  "category",
  "invoiceNumber",
  "reference",
  "externalId",
  "ignore"
];
var targetFieldSchema = z.enum(TARGET_FIELDS);
var columnMappingSchema = z.object({
  sourceColumn: z.string(),
  targetField: targetFieldSchema,
  confidence: z.number().min(0).max(1),
  /** Formato detectado, ex. `DD/MM/YYYY` ou `1.234,56`. */
  format: z.string().nullable()
});
var importMappingSchema = z.object({
  importId: idSchema,
  sheetName: z.string().nullable(),
  transactionType: transactionTypeSchema,
  columns: z.array(columnMappingSchema)
});
var confirmMappingInputSchema = z.object({
  sheetName: z.string().nullable(),
  transactionType: transactionTypeSchema,
  columns: z.array(columnMappingSchema),
  /** Pseudonimizar nomes quando a folha parece de salários. */
  pseudonymizeNames: z.boolean().default(false)
});
var dataQualityIssueSchema = z.object({
  id: idSchema,
  importId: idSchema,
  type: dataQualityIssueTypeSchema,
  severity: severitySchema,
  message: z.string(),
  affectedRows: z.number().int().nonnegative(),
  sampleRowNumbers: z.array(z.number().int()),
  resolvedAt: isoDateTimeSchema.nullable()
});
var dataQualitySummarySchema = z.object({
  importId: idSchema,
  rowsProcessed: z.number().int().nonnegative(),
  detectedCurrency: z.string().nullable(),
  issues: z.array(dataQualityIssueSchema)
});
var importProgressSchema = z.object({
  importId: idSchema,
  state: importStateSchema,
  /** 0–100. Estimativa; a UI mostra barra, não promessa de tempo. */
  progressPercent: z.number().min(0).max(100),
  message: z.string().nullable()
});
var importFilterSchema = paginationQuerySchema.extend({
  state: importStateSchema.optional(),
  dataSourceId: idSchema.optional()
});
var lineageRefSchema = z.object({
  importId: idSchema,
  fileName: z.string(),
  sheetName: z.string().nullable(),
  /** Número da linha no ficheiro original, tal como o utilizador a vê no Excel. */
  rowNumber: z.number().int().positive().nullable()
});
var transactionSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  type: transactionTypeSchema,
  date: isoDateSchema,
  description: z.string(),
  amount: moneySchema,
  customerId: idSchema.nullable(),
  customerName: z.string().nullable(),
  supplierId: idSchema.nullable(),
  supplierName: z.string().nullable(),
  categoryId: idSchema.nullable(),
  categoryName: z.string().nullable(),
  invoiceNumber: z.string().nullable(),
  reference: z.string().nullable(),
  lineage: lineageRefSchema
});
var customerSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  /** Enriquecimento comercial (M8). Nulo enquanto ninguém preencher. */
  segment: z.string().nullable(),
  country: z.string().nullable(),
  status: customerStatusSchema,
  contractStart: isoDateSchema.nullable(),
  contractEnd: isoDateSchema.nullable(),
  renewalDate: isoDateSchema.nullable(),
  annualValue: moneySchema.nullable(),
  ownerId: idSchema.nullable(),
  tags: z.array(z.string()),
  createdAt: isoDateTimeSchema
});
var supplierSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  country: z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var categorySchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  type: transactionTypeSchema,
  /** Hierarquia rasa: uma categoria pode ter pai, o pai não tem avô. */
  parentId: idSchema.nullable(),
  createdAt: isoDateTimeSchema
});
var budgetSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  period: periodSchema,
  categoryId: idSchema,
  categoryName: z.string(),
  budgetAmount: moneySchema,
  createdAt: isoDateTimeSchema
});
var transactionFilterSchema = paginationQuerySchema.extend({
  type: transactionTypeSchema.optional(),
  from: isoDateSchema.optional(),
  to: isoDateSchema.optional(),
  customerId: idSchema.optional(),
  supplierId: idSchema.optional(),
  categoryId: idSchema.optional(),
  importId: idSchema.optional(),
  /** Pesquisa por descrição, cliente, fornecedor ou número de factura. */
  search: z.string().max(200).optional(),
  minAmountCents: z.coerce.number().int().optional(),
  maxAmountCents: z.coerce.number().int().optional(),
  sortBy: z.enum(["date", "amount", "description"]).default("date"),
  sortDir: z.enum(["asc", "desc"]).default("desc")
});
var breakdownItemSchema = z.object({
  id: idSchema.nullable(),
  label: z.string(),
  amount: moneySchema,
  /** Peso no total do período, 0–100. */
  sharePercent: z.number(),
  /** Variação face ao período anterior; nulo quando não havia base. */
  changePercent: z.number().nullable(),
  transactionCount: z.number().int().nonnegative()
});
var timeSeriesPointSchema = z.object({
  period: periodSchema,
  revenue: z.number().int(),
  expenses: z.number().int(),
  grossProfit: z.number().int(),
  currency: currencySchema
});
var leadSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  company: z.string().nullable(),
  email: z.string().nullable(),
  phone: z.string().nullable(),
  source: z.string().nullable(),
  status: leadStatusSchema,
  estimatedValue: moneySchema.nullable(),
  ownerId: idSchema.nullable(),
  ownerName: z.string().nullable(),
  convertedToCustomerId: idSchema.nullable(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema
});
var opportunitySchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  customerId: idSchema.nullable(),
  leadId: idSchema.nullable(),
  title: z.string(),
  stage: opportunityStageSchema,
  value: moneySchema,
  /** 0–100. Multiplicada pelo valor dá o pipeline ponderado do forecast (§40). */
  probability: z.number().min(0).max(100),
  expectedCloseDate: isoDateSchema.nullable(),
  closedAt: isoDateTimeSchema.nullable(),
  lostReason: z.string().nullable(),
  ownerId: idSchema.nullable(),
  ownerName: z.string().nullable(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema
});
var ACTIVITY_SUBJECTS = ["LEAD", "CUSTOMER", "OPPORTUNITY"];
var activitySubjectSchema = z.enum(ACTIVITY_SUBJECTS);
var activitySchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  subjectType: activitySubjectSchema,
  subjectId: idSchema,
  type: activityTypeSchema,
  content: z.string(),
  dueAt: isoDateTimeSchema.nullable(),
  completedAt: isoDateTimeSchema.nullable(),
  userId: idSchema,
  userName: z.string(),
  createdAt: isoDateTimeSchema
});
var pipelineSummarySchema = z.object({
  stages: z.array(
    z.object({
      stage: opportunityStageSchema,
      count: z.number().int().nonnegative(),
      totalValue: moneySchema,
      weightedValue: moneySchema
    })
  ),
  totalWeightedValue: moneySchema
});
var createLeadInputSchema = z.object({
  name: z.string().min(1).max(200),
  company: z.string().max(200).nullable().optional(),
  email: z.string().email().nullable().optional(),
  phone: z.string().max(40).nullable().optional(),
  source: z.string().max(80).nullable().optional(),
  estimatedValueCents: z.number().int().nullable().optional(),
  ownerId: idSchema.nullable().optional()
});
var updateLeadInputSchema = createLeadInputSchema.partial().extend({
  status: leadStatusSchema.optional()
});
var createOpportunityInputSchema = z.object({
  customerId: idSchema.nullable().optional(),
  leadId: idSchema.nullable().optional(),
  title: z.string().min(1).max(200),
  stage: opportunityStageSchema.default("DISCOVERY"),
  valueCents: z.number().int(),
  probability: z.number().min(0).max(100).default(50),
  expectedCloseDate: isoDateSchema.nullable().optional(),
  ownerId: idSchema.nullable().optional()
}).refine((o) => Boolean(o.customerId) || Boolean(o.leadId), {
  message: "oportunidade tem de pertencer a um cliente ou a um lead",
  path: ["customerId"]
});
var leadFilterSchema = paginationQuerySchema.extend({
  status: leadStatusSchema.optional(),
  ownerId: idSchema.optional(),
  search: z.string().max(200).optional()
});
var METRIC_IDS = [
  // Folhas — as únicas que consultam a base directamente
  "REVENUE",
  "EXPENSES",
  "COGS",
  "OPEX",
  "CASH",
  "ACCOUNTS_RECEIVABLE",
  "ACCOUNTS_PAYABLE",
  "BUDGETED_EXPENSES",
  // Derivadas — funções puras das suas dependências
  "GROSS_PROFIT",
  "GROSS_MARGIN",
  "OPERATING_PROFIT",
  "EBITDA",
  "EBITDA_MARGIN",
  "REVENUE_GROWTH",
  "EXPENSE_GROWTH",
  "CUSTOMER_CONCENTRATION",
  "BURN",
  "RUNWAY",
  "BUDGET_VARIANCE"
];
var metricIdSchema = z.enum(METRIC_IDS);
var METRIC_UNITS = ["MONEY", "PERCENT", "MONTHS", "RATIO", "COUNT"];
var metricUnitSchema = z.enum(METRIC_UNITS);
var metricNodeSpecSchema = z.object({
  id: metricIdSchema,
  unit: metricUnitSchema,
  dependsOn: z.array(metricIdSchema),
  /** Verdadeiro quando o nó agrega transacções em vez de derivar de outros nós. */
  isLeaf: z.boolean(),
  /** Fórmula legível, ex. `GROSS_PROFIT - OPEX`. Mostrada no painel de evidência. */
  formula: z.string().nullable()
});
var metricValueSchema = z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  unit: metricUnitSchema,
  /** Cêntimos quando MONEY; número simples nas outras unidades. */
  value: z.number(),
  currency: currencySchema.nullable(),
  /** Nulo quando não há período anterior com que comparar. */
  delta: deltaSchema.nullable(),
  /**
   * Versão do dataset que produziu este valor.
   *
   * Vai em todo o lado porque um relatório tem de ser reproduzível (§46): sem
   * ela, reimprimir o relatório de Julho depois de corrigir um ficheiro dá outro
   * número e ninguém sabe qual estava certo.
   */
  datasetVersion: z.number().int()
});
var varianceContributionSchema = z.object({
  label: z.string(),
  /** Presente quando o ramo é uma métrica; ausente quando é uma dimensão. */
  metricId: metricIdSchema.nullable(),
  /** Presente quando o ramo é um cliente, categoria ou fornecedor. */
  entityId: idSchema.nullable(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  contributionPercent: z.number()
});
var varianceTreeSchema = z.lazy(
  () => varianceContributionSchema.extend({
    children: z.array(varianceTreeSchema)
  })
);
var metricQuerySchema = z.object({
  period: periodSchema,
  /** Omitido usa o período anterior imediato. */
  comparePeriod: periodSchema.optional(),
  metrics: z.array(metricIdSchema).optional()
});
var dashboardSummarySchema = z.object({
  period: periodSchema,
  comparePeriod: periodSchema,
  currency: currencySchema,
  datasetVersion: z.number().int(),
  metrics: z.array(metricValueSchema)
});
var calculationSchema = z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  formula: z.string(),
  inputs: z.array(
    z.object({
      label: z.string(),
      value: z.number(),
      metricId: metricIdSchema.nullable()
    })
  ),
  result: z.number()
});
var evidenceTransactionSchema = z.object({
  id: idSchema,
  date: z.string(),
  description: z.string(),
  amount: moneySchema,
  counterpartyName: z.string().nullable(),
  lineage: lineageRefSchema
});
var evidenceSchema = z.object({
  id: idSchema,
  claim: z.string(),
  calculations: z.array(calculationSchema),
  transactionCount: z.number().int().nonnegative(),
  sampleTransactions: z.array(evidenceTransactionSchema),
  /** Ficheiros que contribuíram, para o utilizador reconhecer a origem. */
  sources: z.array(
    z.object({
      importId: idSchema,
      fileName: z.string(),
      sheetName: z.string().nullable(),
      rowRange: z.string().nullable()
    })
  ),
  datasetVersion: z.number().int()
});
var insightSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** Já traduzido no locale do pedido. */
  title: z.string(),
  description: z.string(),
  metricId: metricIdSchema.nullable(),
  /** Números que sustentam a afirmação, para a UI mostrar sem recalcular. */
  supportingData: z.record(z.string(), z.number()),
  evidence: evidenceSchema.nullable(),
  /** Dispensado pelo utilizador: não volta a aparecer para o mesmo período. */
  dismissedAt: isoDateTimeSchema.nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema
});
var recommendationSchema = z.object({
  id: idSchema,
  insightId: idSchema.nullable(),
  title: z.string(),
  rationale: z.string(),
  /** Sempre `RECOMMENDATION`, para a UI nunca a mostrar como facto. */
  kind: z.literal("RECOMMENDATION"),
  createdAt: isoDateTimeSchema
});
var changeItemSchema = z.object({
  label: z.string(),
  metricId: metricIdSchema.nullable(),
  entityId: idSchema.nullable(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  changePoints: z.number().nullable(),
  direction: z.enum(["UP", "DOWN", "FLAT"]),
  /** Se subir é bom ou mau depende da métrica: despesa a subir não é vitória. */
  sentiment: z.enum(["POSITIVE", "NEGATIVE", "NEUTRAL"])
});
var insightFilterSchema = z.object({
  period: periodSchema.optional(),
  type: insightTypeSchema.optional(),
  severity: severitySchema.optional(),
  includeDismissed: z.coerce.boolean().default(false)
});
var keyPointSchema = z.object({
  type: aiResponseTypeSchema,
  text: z.string(),
  /** Presente em FACT e CALCULATION. Ausente é sinal de afirmação não suportada. */
  evidenceId: idSchema.nullable()
});
var assumptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  /** Verdadeiro quando foi o modelo a assumir, não o utilizador a declarar. */
  inferred: z.boolean()
});
var aiRecommendationSchema = z.object({
  title: z.string(),
  rationale: z.string()
});
var aiAnswerSchema = z.object({
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
  insufficientData: z.boolean()
});
var aiMessageSchema = z.object({
  id: idSchema,
  conversationId: idSchema,
  role: z.enum(["USER", "ASSISTANT"]),
  content: z.string(),
  answer: aiAnswerSchema.nullable(),
  /** Guardado com a resposta para o relatório ser reproduzível (§46, §47). */
  provider: z.string().nullable(),
  model: z.string().nullable(),
  promptVersion: z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var aiConversationSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  title: z.string(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema
});
var askInputSchema = z.object({
  question: z.string().min(1).max(2e3),
  conversationId: idSchema.nullable().optional(),
  locale: localeSchema.optional()
});
var aiUsageSchema = z.object({
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
  createdAt: isoDateTimeSchema
});
var aiUsageSummarySchema = z.object({
  period: z.string(),
  totalCostCents: z.number().int().nonnegative(),
  byProvider: z.array(
    z.object({
      provider: z.string(),
      costCents: z.number().int().nonnegative(),
      requestCount: z.number().int().nonnegative()
    })
  )
});
var aiPrivacyStatusSchema = z.object({
  providerKind: aiProviderKindSchema,
  model: z.string(),
  /** Falso quando o endpoint sai da máquina ou da região configurada. */
  dataStaysLocal: z.boolean(),
  retentionPolicy: aiRetentionPolicySchema,
  isBYOK: z.boolean(),
  /** Onde o pedido é processado, tanto quanto se sabe do endpoint. */
  processingRegion: z.string().nullable()
});
var scenarioInputSchema = z.object({
  type: scenarioTypeSchema,
  name: z.string().min(1).max(160),
  basePeriod: periodSchema,
  /** Meses a projectar a partir do período base. */
  horizonMonths: z.number().int().min(1).max(36).default(12),
  /**
   * Parâmetros da alteração, conforme o tipo:
   *
   *   REVENUE_CHANGE   { percent: -10 }
   *   EXPENSE_CHANGE   { categoryId, percent: 20 }
   *   HIRING           { headcount: 3, monthlyCostCents: 350000 }
   *   CUSTOMER_LOSS    { customerId }
   *   PRICE_CHANGE     { percent: 5 }
   */
  parameters: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()]))
});
var scenarioImpactSchema = z.object({
  metricId: metricIdSchema,
  baseline: z.number(),
  projected: z.number(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable()
});
var scenarioResultSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  type: scenarioTypeSchema,
  basePeriod: periodSchema,
  currency: currencySchema,
  impacts: z.array(scenarioImpactSchema),
  assumptions: z.array(assumptionSchema),
  /** Redigida pela IA a partir dos impactos já calculados (M7). */
  explanation: z.string().nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema
});
var forecastPointSchema = z.object({
  period: periodSchema,
  scenario: forecastScenarioSchema,
  revenue: z.number().int(),
  expenses: z.number().int(),
  grossProfit: z.number().int(),
  cash: z.number().int().nullable()
});
var forecastSchema = z.object({
  organizationId: idSchema,
  generatedFrom: periodSchema,
  horizonMonths: z.number().int(),
  currency: currencySchema,
  points: z.array(forecastPointSchema),
  assumptions: z.array(assumptionSchema),
  datasetVersion: z.number().int()
});
var REPORT_SECTION_KINDS = [
  "EXECUTIVE_SUMMARY",
  "REVENUE",
  "EXPENSES",
  "PROFIT",
  "MARGIN",
  "CASH",
  "MAJOR_CHANGES",
  "RISKS",
  "OPPORTUNITIES",
  "RECOMMENDATIONS",
  "EVIDENCE",
  "APPENDIX"
];
var reportSectionKindSchema = z.enum(REPORT_SECTION_KINDS);
var reportSectionSchema = z.object({
  kind: reportSectionKindSchema,
  title: z.string(),
  /** Markdown. Por template no M6, redigido pela IA a partir do M7. */
  body: z.string(),
  /** Verdadeiro quando o texto saiu de um modelo — o PDF marca-o. */
  aiGenerated: z.boolean()
});
var reportMetadataSchema = z.object({
  organizationId: idSchema,
  period: periodSchema,
  datasetVersion: z.number().int(),
  metricsVersion: z.string(),
  aiProvider: z.string().nullable(),
  aiModel: z.string().nullable(),
  promptVersion: z.string().nullable(),
  locale: localeSchema,
  generatedAt: isoDateTimeSchema,
  generatedByUserId: idSchema
});
var reportSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  title: z.string(),
  period: periodSchema,
  sections: z.array(reportSectionSchema),
  metadata: reportMetadataSchema,
  createdAt: isoDateTimeSchema
});
var generateReportInputSchema = z.object({
  period: periodSchema,
  locale: localeSchema.optional(),
  /** Sem IA gera as secções por template — o comportamento do M6. */
  useAI: z.boolean().default(false)
});
var exportRequestSchema = z.object({
  format: exportFormatSchema,
  locale: localeSchema.optional()
});
var exportResultSchema = z.object({
  url: z.string().url(),
  fileName: z.string(),
  expiresAt: isoDateTimeSchema
});
var planLimitsSchema = z.object({
  maxUsers: z.number().int().positive().nullable(),
  maxTransactions: z.number().int().positive().nullable(),
  maxOrganizations: z.number().int().positive().nullable(),
  /** Cêntimos de consumo de IA incluídos por mês. */
  aiMonthlyAllowanceCents: z.number().int().nonnegative().nullable(),
  /** Deixa continuar acima do limite e cobra o excedente. */
  allowAIOverage: z.boolean(),
  // Funcionalidades de soberania — o que legitimamente escala por preço
  canUseBYOK: z.boolean(),
  canUseLocalAI: z.boolean(),
  canChooseDataRegion: z.boolean(),
  canUseSSO: z.boolean(),
  canExportAuditLog: z.boolean(),
  canWhiteLabel: z.boolean(),
  auditLogRetentionMonths: z.number().int().positive().nullable()
});
var planSchema = z.object({
  tier: planTierSchema,
  name: z.string(),
  /** Cêntimos por mês. Configurável — o §80 exige preço não codificado. */
  monthlyPriceCents: z.number().int().nonnegative(),
  yearlyPriceCents: z.number().int().nonnegative(),
  currency: z.string().length(3),
  limits: planLimitsSchema
});
var subscriptionSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  tier: planTierSchema,
  status: subscriptionStatusSchema,
  provider: paymentProviderSchema,
  currentPeriodEnd: isoDateTimeSchema.nullable(),
  cancelAtPeriodEnd: z.boolean(),
  trialEndsAt: isoDateTimeSchema.nullable(),
  createdAt: isoDateTimeSchema
});
var createCheckoutInputSchema = z.object({
  tier: planTierSchema,
  interval: z.enum(["MONTHLY", "YEARLY"]),
  provider: paymentProviderSchema.optional(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url()
});
var checkoutSessionSchema = z.object({
  url: z.string().url(),
  sessionId: z.string()
});
var usageSummarySchema = z.object({
  organizationId: idSchema,
  tier: planTierSchema,
  users: z.object({ used: z.number().int(), limit: z.number().int().nullable() }),
  transactions: z.object({ used: z.number().int(), limit: z.number().int().nullable() }),
  ai: z.object({
    spent: moneySchema,
    allowance: moneySchema.nullable(),
    overageAllowed: z.boolean()
  })
});

export { ACTIVITY_SUBJECTS, ACTIVITY_TYPES, AI_PROVIDER_KINDS, AI_RESPONSE_TYPES, AI_RETENTION_POLICIES, AI_TASKS, AUDIT_ACTIONS, CONNECTOR_CAPABILITIES, CUSTOMER_STATUSES, DATA_CLASSES, DATA_QUALITY_ISSUE_TYPES, DATA_SOURCE_KINDS, DEFAULT_LOCALE, EXPORT_FORMATS, FORECAST_SCENARIOS, IMPORT_STATES, IMPORT_TRIGGERS, INSIGHT_TYPES, LEAD_STATUSES, LOCALES, METRIC_IDS, METRIC_UNITS, OPPORTUNITY_STAGES, PASSWORD_MIN_LENGTH, PAYMENT_PROVIDERS, PERIOD_GRANULARITIES, PERMISSIONS, PLAN_TIERS, REPORT_SECTION_KINDS, ROLES, ROLE_PERMISSIONS, SCENARIO_TYPES, SEVERITIES, SUBSCRIPTION_STATUSES, TARGET_FIELDS, TRANSACTION_TYPES, activitySchema, activitySubjectSchema, activityTypeSchema, aiAnswerSchema, aiConversationSchema, aiMessageSchema, aiPrivacyStatusSchema, aiProviderConfigSchema, aiProviderKindSchema, aiRecommendationSchema, aiResponseTypeSchema, aiRetentionPolicySchema, aiTaskSchema, aiUsageSchema, aiUsageSummarySchema, apiErrorSchema, askInputSchema, assumptionSchema, auditActionSchema, authResponseSchema, brandingConfigSchema, breakdownItemSchema, budgetSchema, calculationSchema, categorySchema, changeItemSchema, checkoutSessionSchema, columnMappingSchema, confirmMappingInputSchema, connectionHealthSchema, connectorCapabilitySchema, createCheckoutInputSchema, createLeadInputSchema, createOpportunityInputSchema, currencySchema, customerSchema, customerStatusSchema, dashboardSummarySchema, dataClassSchema, dataQualityIssueSchema, dataQualityIssueTypeSchema, dataQualitySummarySchema, dataSourceKindSchema, dataSourceSchema, datasetSchema, deltaSchema, discoveredEntitySchema, discoveredFieldSchema, discoveredSchemaSchema, emailSchema, evidenceSchema, evidenceTransactionSchema, exportFormatSchema, exportRequestSchema, exportResultSchema, forecastPointSchema, forecastScenarioSchema, forecastSchema, generateReportInputSchema, idSchema, importFilterSchema, importMappingSchema, importProgressSchema, importSchema, importStateSchema, importTriggerSchema, insightFilterSchema, insightSchema, insightTypeSchema, inviteMemberInputSchema, isoDateSchema, isoDateTimeSchema, keyPointSchema, leadFilterSchema, leadSchema, leadStatusSchema, lineageRefSchema, localeSchema, loginInputSchema, memberSchema, membershipSchema, metricIdSchema, metricNodeSpecSchema, metricQuerySchema, metricUnitSchema, metricValueSchema, moneySchema, opportunitySchema, opportunityStageSchema, organizationSchema, organizationSettingsSchema, paginatedSchema, paginationQuerySchema, partnerSchema, passwordSchema, paymentProviderSchema, percentageSchema, periodGranularitySchema, periodRangeSchema, periodSchema, permissionSchema, pipelineSummarySchema, planLimitsSchema, planSchema, planTierSchema, recommendationSchema, refreshInputSchema, reportMetadataSchema, reportSchema, reportSectionKindSchema, reportSectionSchema, requestPasswordResetInputSchema, resetPasswordInputSchema, roleSchema, scenarioImpactSchema, scenarioInputSchema, scenarioResultSchema, scenarioTypeSchema, sessionOrganizationSchema, sessionUserSchema, severitySchema, signupInputSchema, subscriptionSchema, subscriptionStatusSchema, supplierSchema, syncCursorSchema, targetFieldSchema, timeSeriesPointSchema, tokenPairSchema, transactionFilterSchema, transactionSchema, transactionTypeSchema, updateLeadInputSchema, updateOrganizationSettingsInputSchema, upsertAIProviderConfigInputSchema, usageSummarySchema, varianceContributionSchema, varianceTreeSchema };
