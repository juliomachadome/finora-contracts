'use strict';

var zod = require('zod');

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
var roleSchema = zod.z.enum(ROLES);
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
var permissionSchema = zod.z.enum(PERMISSIONS);
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
var dataSourceKindSchema = zod.z.enum(DATA_SOURCE_KINDS);
var CONNECTOR_CAPABILITIES = [
  "OAUTH",
  "INCREMENTAL_SYNC",
  "WEBHOOK",
  "BACKFILL"
];
var connectorCapabilitySchema = zod.z.enum(CONNECTOR_CAPABILITIES);
var IMPORT_STATES = [
  "UPLOADED",
  "PROCESSING",
  "MAPPING_REQUIRED",
  "NORMALIZING",
  "VALIDATING",
  "COMPLETED",
  "FAILED"
];
var importStateSchema = zod.z.enum(IMPORT_STATES);
var IMPORT_TRIGGERS = ["MANUAL_UPLOAD", "SCHEDULED_SYNC", "WEBHOOK"];
var importTriggerSchema = zod.z.enum(IMPORT_TRIGGERS);
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
var dataQualityIssueTypeSchema = zod.z.enum(DATA_QUALITY_ISSUE_TYPES);
var TRANSACTION_TYPES = ["REVENUE", "EXPENSE", "BANK"];
var transactionTypeSchema = zod.z.enum(TRANSACTION_TYPES);
var PERIOD_GRANULARITIES = ["MONTH", "QUARTER", "YEAR"];
var periodGranularitySchema = zod.z.enum(PERIOD_GRANULARITIES);
var INSIGHT_TYPES = [
  "REVENUE_DECLINE",
  "EXPENSE_SPIKE",
  "MARGIN_DETERIORATION",
  "CUSTOMER_DECLINE",
  "CUSTOMER_CONCENTRATION",
  "BUDGET_OVERRUN",
  "CASH_RISK"
];
var insightTypeSchema = zod.z.enum(INSIGHT_TYPES);
var SEVERITIES = ["INFO", "LOW", "MEDIUM", "HIGH", "CRITICAL"];
var severitySchema = zod.z.enum(SEVERITIES);
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
var aiProviderKindSchema = zod.z.enum(AI_PROVIDER_KINDS);
var AI_TASKS = [
  "FAST_ANALYSIS",
  "COMPLEX_REASONING",
  "DOCUMENT_EXTRACTION",
  "EMBEDDINGS",
  "EXECUTIVE_SUMMARY"
];
var aiTaskSchema = zod.z.enum(AI_TASKS);
var AI_RESPONSE_TYPES = ["FACT", "CALCULATION", "INFERENCE", "RECOMMENDATION"];
var aiResponseTypeSchema = zod.z.enum(AI_RESPONSE_TYPES);
var AI_RETENTION_POLICIES = [
  "ZERO_RETENTION",
  "RETAINED_NO_TRAINING",
  "TRAINS_ON_DATA",
  "UNKNOWN"
];
var aiRetentionPolicySchema = zod.z.enum(AI_RETENTION_POLICIES);
var CUSTOMER_STATUSES = ["PROSPECT", "ACTIVE", "AT_RISK", "CHURNED"];
var customerStatusSchema = zod.z.enum(CUSTOMER_STATUSES);
var LEAD_STATUSES = [
  "NEW",
  "CONTACTED",
  "QUALIFIED",
  "DISQUALIFIED",
  "CONVERTED"
];
var leadStatusSchema = zod.z.enum(LEAD_STATUSES);
var OPPORTUNITY_STAGES = [
  "DISCOVERY",
  "PROPOSAL",
  "NEGOTIATION",
  "WON",
  "LOST"
];
var opportunityStageSchema = zod.z.enum(OPPORTUNITY_STAGES);
var ACTIVITY_TYPES = ["NOTE", "CALL", "EMAIL", "MEETING", "TASK"];
var activityTypeSchema = zod.z.enum(ACTIVITY_TYPES);
var SCENARIO_TYPES = [
  "REVENUE_CHANGE",
  "EXPENSE_CHANGE",
  "HIRING",
  "CUSTOMER_LOSS",
  "PRICE_CHANGE"
];
var scenarioTypeSchema = zod.z.enum(SCENARIO_TYPES);
var FORECAST_SCENARIOS = ["BASE", "UPSIDE", "DOWNSIDE"];
var forecastScenarioSchema = zod.z.enum(FORECAST_SCENARIOS);
var EXPORT_FORMATS = ["CSV", "XLSX", "PDF"];
var exportFormatSchema = zod.z.enum(EXPORT_FORMATS);
var PLAN_TIERS = ["STARTER", "GROWTH", "BUSINESS", "ENTERPRISE"];
var planTierSchema = zod.z.enum(PLAN_TIERS);
var SUBSCRIPTION_STATUSES = [
  "TRIALING",
  "ACTIVE",
  "PAST_DUE",
  "CANCELED",
  "INCOMPLETE"
];
var subscriptionStatusSchema = zod.z.enum(SUBSCRIPTION_STATUSES);
var PAYMENT_PROVIDERS = ["mock", "stripe", "openpix"];
var paymentProviderSchema = zod.z.enum(PAYMENT_PROVIDERS);
var LOCALES = ["pt-PT", "pt-BR", "es", "en"];
var localeSchema = zod.z.enum(LOCALES);
var DEFAULT_LOCALE = "en";
var DATA_CLASSES = ["S0", "S1", "S2", "S3"];
var dataClassSchema = zod.z.enum(DATA_CLASSES);
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
var auditActionSchema = zod.z.enum(AUDIT_ACTIONS);
var idSchema = zod.z.string().uuid();
var isoDateTimeSchema = zod.z.iso.datetime();
var isoDateSchema = zod.z.iso.date();
var periodSchema = zod.z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "per\xEDodo tem de ser YYYY-MM");
var currencySchema = zod.z.string().length(3).toUpperCase();
var moneySchema = zod.z.object({
  /** Inteiro em cêntimos. 1234 = 12,34. Negativo é permitido (estornos). */
  amountCents: zod.z.number().int(),
  currency: currencySchema
});
var percentageSchema = zod.z.number();
var deltaSchema = zod.z.object({
  current: zod.z.number(),
  previous: zod.z.number(),
  changeAbsolute: zod.z.number(),
  changePercent: zod.z.number().nullable(),
  /** Para margens, em pontos percentuais. 2.8 = +2,8pp. */
  changePoints: zod.z.number().nullable().optional()
});
var apiErrorSchema = zod.z.object({
  code: zod.z.string(),
  message: zod.z.string(),
  details: zod.z.record(zod.z.string(), zod.z.array(zod.z.string())).optional(),
  /** Para o utilizador citar ao pedir apoio, e para cruzar com o log. */
  requestId: zod.z.string().optional()
});
var paginationQuerySchema = zod.z.object({
  cursor: zod.z.string().optional(),
  limit: zod.z.coerce.number().int().min(1).max(200).default(50)
});
var paginatedSchema = (item) => zod.z.object({
  items: zod.z.array(item),
  nextCursor: zod.z.string().nullable(),
  /** Só quando é barato de obter. Ausente não significa zero. */
  totalCount: zod.z.number().int().optional()
});
var periodRangeSchema = zod.z.object({
  from: periodSchema,
  to: periodSchema
}).refine((r) => r.from <= r.to, {
  message: "from tem de ser anterior ou igual a to",
  path: ["from"]
});
var PASSWORD_MIN_LENGTH = 12;
var passwordSchema = zod.z.string().min(PASSWORD_MIN_LENGTH, `m\xEDnimo de ${PASSWORD_MIN_LENGTH} caracteres`).max(200);
var emailSchema = zod.z.string().email().toLowerCase().trim();
var signupInputSchema = zod.z.object({
  email: emailSchema,
  password: passwordSchema,
  name: zod.z.string().min(1).max(120).trim(),
  /** Criada no mesmo passo: uma conta sem organização não faz nada. */
  organizationName: zod.z.string().min(1).max(160).trim(),
  locale: localeSchema.optional(),
  acceptedTermsAt: isoDateTimeSchema
});
var loginInputSchema = zod.z.object({
  email: emailSchema,
  password: zod.z.string().min(1)
});
var refreshInputSchema = zod.z.object({
  refreshToken: zod.z.string().min(1)
});
var requestPasswordResetInputSchema = zod.z.object({
  email: emailSchema
});
var resetPasswordInputSchema = zod.z.object({
  token: zod.z.string().min(1),
  password: passwordSchema
});
var tokenPairSchema = zod.z.object({
  accessToken: zod.z.string(),
  refreshToken: zod.z.string(),
  /** Segundos até o access expirar. O cliente renova antes, não depois de falhar. */
  expiresIn: zod.z.number().int().positive()
});
var sessionOrganizationSchema = zod.z.object({
  id: idSchema,
  name: zod.z.string(),
  slug: zod.z.string(),
  role: roleSchema,
  permissions: zod.z.array(permissionSchema),
  baseCurrency: zod.z.string().length(3)
});
var sessionUserSchema = zod.z.object({
  id: idSchema,
  email: emailSchema,
  name: zod.z.string(),
  locale: localeSchema,
  organizations: zod.z.array(sessionOrganizationSchema),
  currentOrganizationId: idSchema.nullable()
});
var authResponseSchema = zod.z.object({
  user: sessionUserSchema,
  tokens: tokenPairSchema
});
var organizationSchema = zod.z.object({
  id: idSchema,
  name: zod.z.string(),
  slug: zod.z.string(),
  partnerId: idSchema.nullable(),
  baseCurrency: currencySchema,
  locale: localeSchema,
  /** IANA, ex. `Europe/Lisbon`. Decide a que mês pertence uma transacção. */
  timezone: zod.z.string(),
  /** Mês em que começa o ano fiscal, 1–12. Nem toda a empresa fecha em Dezembro. */
  fiscalYearStartMonth: zod.z.number().int().min(1).max(12),
  createdAt: isoDateTimeSchema
});
var membershipSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  userId: idSchema,
  role: roleSchema,
  createdAt: isoDateTimeSchema
});
var memberSchema = zod.z.object({
  id: idSchema,
  userId: idSchema,
  name: zod.z.string(),
  email: zod.z.string(),
  role: roleSchema,
  createdAt: isoDateTimeSchema,
  lastActiveAt: isoDateTimeSchema.nullable()
});
var partnerSchema = zod.z.object({
  id: idSchema,
  name: zod.z.string(),
  slug: zod.z.string(),
  createdAt: isoDateTimeSchema
});
var brandingConfigSchema = zod.z.object({
  productName: zod.z.string().max(60).nullable(),
  logoUrl: zod.z.string().url().nullable(),
  faviconUrl: zod.z.string().url().nullable(),
  primaryColor: zod.z.string().regex(/^#[0-9a-fA-F]{6}$/, "cor tem de ser hexadecimal, ex. #1a1a1a").nullable(),
  customDomain: zod.z.string().nullable()
});
var organizationSettingsSchema = zod.z.object({
  baseCurrency: currencySchema,
  locale: localeSchema,
  timezone: zod.z.string(),
  fiscalYearStartMonth: zod.z.number().int().min(1).max(12),
  dataRetentionMonths: zod.z.number().int().min(1).max(120).nullable(),
  aiDataProcessingConsent: zod.z.boolean(),
  /** Pseudonimizar nomes ao detectar padrão de folha de salários na ingestão. */
  pseudonymizePayroll: zod.z.boolean(),
  branding: brandingConfigSchema.nullable()
});
var updateOrganizationSettingsInputSchema = organizationSettingsSchema.partial();
var inviteMemberInputSchema = zod.z.object({
  email: zod.z.string().email().toLowerCase().trim(),
  role: roleSchema
});
var dataSourceSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: dataSourceKindSchema,
  name: zod.z.string(),
  capabilities: zod.z.array(connectorCapabilitySchema),
  /**
   * Configuração não secreta: endpoint, id de empresa remota, filtros.
   * As credenciais nunca vivem aqui — vivem cifradas e nunca saem do backend.
   */
  config: zod.z.record(zod.z.string(), zod.z.unknown()),
  /** Nunca `true` para o frontend saber a chave; só se ela existe. */
  hasCredentials: zod.z.boolean(),
  lastSyncAt: isoDateTimeSchema.nullable(),
  lastSyncError: zod.z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var syncCursorSchema = zod.z.object({
  /** Marca de água do fornecedor: timestamp, id sequencial ou token opaco. */
  value: zod.z.string(),
  updatedAt: isoDateTimeSchema
});
var discoveredFieldSchema = zod.z.object({
  name: zod.z.string(),
  /** Tipo inferido da amostra, não declarado. Excel mente sobre tipos. */
  inferredType: zod.z.enum(["date", "number", "string", "boolean", "empty", "mixed"]),
  /** Primeiras linhas, para o utilizador reconhecer a coluna ao mapear. */
  sampleValues: zod.z.array(zod.z.string()),
  nullRatio: zod.z.number().min(0).max(1)
});
var discoveredEntitySchema = zod.z.object({
  /** Nome da folha, tabela ou entidade remota. */
  name: zod.z.string(),
  rowCount: zod.z.number().int().nonnegative(),
  fields: zod.z.array(discoveredFieldSchema),
  /**
   * Sinalizado quando as colunas parecem folha de salários.
   *
   * É o ficheiro com salário associado a pessoa identificada — dado pessoal de
   * terceiros e a razão nº1 para um CFO não carregar nada. Detectar permite
   * oferecer pseudonimização antes de persistir, em vez de descobrir depois.
   */
  suspectedPayroll: zod.z.boolean()
});
var discoveredSchemaSchema = zod.z.object({
  entities: zod.z.array(discoveredEntitySchema)
});
var connectionHealthSchema = zod.z.object({
  ok: zod.z.boolean(),
  message: zod.z.string(),
  checkedAt: isoDateTimeSchema
});
var aiProviderConfigSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  kind: zod.z.string(),
  model: zod.z.string(),
  baseUrl: zod.z.string().nullable(),
  apiKeyMask: zod.z.string().nullable(),
  embeddingModel: zod.z.string().nullable(),
  retentionPolicy: aiRetentionPolicySchema,
  /** Falso quando o endpoint sai da máquina ou da região do cliente. */
  dataStaysLocal: zod.z.boolean(),
  isActive: zod.z.boolean(),
  createdAt: isoDateTimeSchema
});
var upsertAIProviderConfigInputSchema = zod.z.object({
  kind: zod.z.string(),
  model: zod.z.string().min(1),
  baseUrl: zod.z.string().url().nullable().optional(),
  /** Só na escrita. Nunca volta numa leitura. */
  apiKey: zod.z.string().min(1).nullable().optional(),
  embeddingModel: zod.z.string().nullable().optional(),
  retentionPolicy: aiRetentionPolicySchema.optional()
});
var datasetSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  /**
   * Sobe a cada import concluído.
   *
   * É a peça que torna os relatórios reproduzíveis (§46) e que invalida o cache
   * de métricas por construção: chave nova, valores antigos deixam de ser lidos,
   * sem invalidação manual — que é onde nascem os números errados em cache.
   */
  version: zod.z.number().int().positive(),
  transactionCount: zod.z.number().int().nonnegative(),
  updatedAt: isoDateTimeSchema
});
var importSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  dataSourceId: idSchema,
  datasetId: idSchema.nullable(),
  trigger: importTriggerSchema,
  state: importStateSchema,
  fileName: zod.z.string(),
  fileSizeBytes: zod.z.number().int().nonnegative(),
  /**
   * SHA-256 do conteúdo.
   *
   * Com `unique(organizationId, fileHash)` na base, carregar duas vezes o mesmo
   * ficheiro é rejeitado pela constraint (§92). A verificação é a constraint, e
   * não um `findFirst` antes do `create` — entre o ler e o escrever cabe outro
   * pedido, e é assim que nascem duplicados em produção.
   */
  fileHash: zod.z.string(),
  rowsTotal: zod.z.number().int().nonnegative(),
  rowsImported: zod.z.number().int().nonnegative(),
  rowsSkipped: zod.z.number().int().nonnegative(),
  errorMessage: zod.z.string().nullable(),
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
var targetFieldSchema = zod.z.enum(TARGET_FIELDS);
var columnMappingSchema = zod.z.object({
  sourceColumn: zod.z.string(),
  targetField: targetFieldSchema,
  confidence: zod.z.number().min(0).max(1),
  /** Formato detectado, ex. `DD/MM/YYYY` ou `1.234,56`. */
  format: zod.z.string().nullable()
});
var importMappingSchema = zod.z.object({
  importId: idSchema,
  sheetName: zod.z.string().nullable(),
  transactionType: transactionTypeSchema,
  columns: zod.z.array(columnMappingSchema)
});
var confirmMappingInputSchema = zod.z.object({
  sheetName: zod.z.string().nullable(),
  transactionType: transactionTypeSchema,
  columns: zod.z.array(columnMappingSchema),
  /** Pseudonimizar nomes quando a folha parece de salários. */
  pseudonymizeNames: zod.z.boolean().default(false)
});
var dataQualityIssueSchema = zod.z.object({
  id: idSchema,
  importId: idSchema,
  type: dataQualityIssueTypeSchema,
  severity: severitySchema,
  message: zod.z.string(),
  affectedRows: zod.z.number().int().nonnegative(),
  sampleRowNumbers: zod.z.array(zod.z.number().int()),
  resolvedAt: isoDateTimeSchema.nullable()
});
var dataQualitySummarySchema = zod.z.object({
  importId: idSchema,
  rowsProcessed: zod.z.number().int().nonnegative(),
  detectedCurrency: zod.z.string().nullable(),
  issues: zod.z.array(dataQualityIssueSchema)
});
var importProgressSchema = zod.z.object({
  importId: idSchema,
  state: importStateSchema,
  /** 0–100. Estimativa; a UI mostra barra, não promessa de tempo. */
  progressPercent: zod.z.number().min(0).max(100),
  message: zod.z.string().nullable()
});
var importFilterSchema = paginationQuerySchema.extend({
  state: importStateSchema.optional(),
  dataSourceId: idSchema.optional()
});
var lineageRefSchema = zod.z.object({
  importId: idSchema,
  fileName: zod.z.string(),
  sheetName: zod.z.string().nullable(),
  /** Número da linha no ficheiro original, tal como o utilizador a vê no Excel. */
  rowNumber: zod.z.number().int().positive().nullable()
});
var transactionSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  type: transactionTypeSchema,
  date: isoDateSchema,
  description: zod.z.string(),
  amount: moneySchema,
  customerId: idSchema.nullable(),
  customerName: zod.z.string().nullable(),
  supplierId: idSchema.nullable(),
  supplierName: zod.z.string().nullable(),
  categoryId: idSchema.nullable(),
  categoryName: zod.z.string().nullable(),
  invoiceNumber: zod.z.string().nullable(),
  reference: zod.z.string().nullable(),
  lineage: lineageRefSchema
});
var customerSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  /** Enriquecimento comercial (M8). Nulo enquanto ninguém preencher. */
  segment: zod.z.string().nullable(),
  country: zod.z.string().nullable(),
  status: customerStatusSchema,
  contractStart: isoDateSchema.nullable(),
  contractEnd: isoDateSchema.nullable(),
  renewalDate: isoDateSchema.nullable(),
  annualValue: moneySchema.nullable(),
  ownerId: idSchema.nullable(),
  tags: zod.z.array(zod.z.string()),
  createdAt: isoDateTimeSchema
});
var supplierSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  country: zod.z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var categorySchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  type: transactionTypeSchema,
  /** Hierarquia rasa: uma categoria pode ter pai, o pai não tem avô. */
  parentId: idSchema.nullable(),
  createdAt: isoDateTimeSchema
});
var budgetSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  period: periodSchema,
  categoryId: idSchema,
  categoryName: zod.z.string(),
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
  search: zod.z.string().max(200).optional(),
  minAmountCents: zod.z.coerce.number().int().optional(),
  maxAmountCents: zod.z.coerce.number().int().optional(),
  sortBy: zod.z.enum(["date", "amount", "description"]).default("date"),
  sortDir: zod.z.enum(["asc", "desc"]).default("desc")
});
var breakdownItemSchema = zod.z.object({
  id: idSchema.nullable(),
  label: zod.z.string(),
  amount: moneySchema,
  /** Peso no total do período, 0–100. */
  sharePercent: zod.z.number(),
  /** Variação face ao período anterior; nulo quando não havia base. */
  changePercent: zod.z.number().nullable(),
  transactionCount: zod.z.number().int().nonnegative()
});
var timeSeriesPointSchema = zod.z.object({
  period: periodSchema,
  revenue: zod.z.number().int(),
  expenses: zod.z.number().int(),
  grossProfit: zod.z.number().int(),
  currency: currencySchema
});
var leadSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  company: zod.z.string().nullable(),
  email: zod.z.string().nullable(),
  phone: zod.z.string().nullable(),
  source: zod.z.string().nullable(),
  status: leadStatusSchema,
  estimatedValue: moneySchema.nullable(),
  ownerId: idSchema.nullable(),
  ownerName: zod.z.string().nullable(),
  convertedToCustomerId: idSchema.nullable(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema
});
var opportunitySchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  customerId: idSchema.nullable(),
  leadId: idSchema.nullable(),
  title: zod.z.string(),
  stage: opportunityStageSchema,
  value: moneySchema,
  /** 0–100. Multiplicada pelo valor dá o pipeline ponderado do forecast (§40). */
  probability: zod.z.number().min(0).max(100),
  expectedCloseDate: isoDateSchema.nullable(),
  closedAt: isoDateTimeSchema.nullable(),
  lostReason: zod.z.string().nullable(),
  ownerId: idSchema.nullable(),
  ownerName: zod.z.string().nullable(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema
});
var ACTIVITY_SUBJECTS = ["LEAD", "CUSTOMER", "OPPORTUNITY"];
var activitySubjectSchema = zod.z.enum(ACTIVITY_SUBJECTS);
var activitySchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  subjectType: activitySubjectSchema,
  subjectId: idSchema,
  type: activityTypeSchema,
  content: zod.z.string(),
  dueAt: isoDateTimeSchema.nullable(),
  completedAt: isoDateTimeSchema.nullable(),
  userId: idSchema,
  userName: zod.z.string(),
  createdAt: isoDateTimeSchema
});
var pipelineSummarySchema = zod.z.object({
  stages: zod.z.array(
    zod.z.object({
      stage: opportunityStageSchema,
      count: zod.z.number().int().nonnegative(),
      totalValue: moneySchema,
      weightedValue: moneySchema
    })
  ),
  totalWeightedValue: moneySchema
});
var createLeadInputSchema = zod.z.object({
  name: zod.z.string().min(1).max(200),
  company: zod.z.string().max(200).nullable().optional(),
  email: zod.z.string().email().nullable().optional(),
  phone: zod.z.string().max(40).nullable().optional(),
  source: zod.z.string().max(80).nullable().optional(),
  estimatedValueCents: zod.z.number().int().nullable().optional(),
  ownerId: idSchema.nullable().optional()
});
var updateLeadInputSchema = createLeadInputSchema.partial().extend({
  status: leadStatusSchema.optional()
});
var createOpportunityInputSchema = zod.z.object({
  customerId: idSchema.nullable().optional(),
  leadId: idSchema.nullable().optional(),
  title: zod.z.string().min(1).max(200),
  stage: opportunityStageSchema.default("DISCOVERY"),
  valueCents: zod.z.number().int(),
  probability: zod.z.number().min(0).max(100).default(50),
  expectedCloseDate: isoDateSchema.nullable().optional(),
  ownerId: idSchema.nullable().optional()
}).refine((o) => Boolean(o.customerId) || Boolean(o.leadId), {
  message: "oportunidade tem de pertencer a um cliente ou a um lead",
  path: ["customerId"]
});
var leadFilterSchema = paginationQuerySchema.extend({
  status: leadStatusSchema.optional(),
  ownerId: idSchema.optional(),
  search: zod.z.string().max(200).optional()
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
var metricIdSchema = zod.z.enum(METRIC_IDS);
var METRIC_UNITS = ["MONEY", "PERCENT", "MONTHS", "RATIO", "COUNT"];
var metricUnitSchema = zod.z.enum(METRIC_UNITS);
var metricNodeSpecSchema = zod.z.object({
  id: metricIdSchema,
  unit: metricUnitSchema,
  dependsOn: zod.z.array(metricIdSchema),
  /** Verdadeiro quando o nó agrega transacções em vez de derivar de outros nós. */
  isLeaf: zod.z.boolean(),
  /** Fórmula legível, ex. `GROSS_PROFIT - OPEX`. Mostrada no painel de evidência. */
  formula: zod.z.string().nullable()
});
var metricValueSchema = zod.z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  unit: metricUnitSchema,
  /**
   * Cêntimos quando MONEY; número simples nas outras unidades.
   *
   * **`null` significa "não calculável", e não zero.** Uma margem sem receita, um
   * runway sem queima ou um crescimento sem período anterior não valem zero —
   * não têm base para existir.
   *
   * A distinção não é preciosismo: mostrar "0,0 meses" de autonomia a um CFO
   * cujo mês foi lucrativo é afirmar um facto falso sobre o negócio dele. A UI
   * mostra travessão.
   */
  value: zod.z.number().nullable(),
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
  datasetVersion: zod.z.number().int()
});
var varianceContributionSchema = zod.z.object({
  label: zod.z.string(),
  /** Presente quando o ramo é uma métrica; ausente quando é uma dimensão. */
  metricId: metricIdSchema.nullable(),
  /** Presente quando o ramo é um cliente, categoria ou fornecedor. */
  entityId: idSchema.nullable(),
  changeAbsolute: zod.z.number(),
  changePercent: zod.z.number().nullable(),
  contributionPercent: zod.z.number()
});
var varianceTreeSchema = zod.z.lazy(
  () => varianceContributionSchema.extend({
    children: zod.z.array(varianceTreeSchema)
  })
);
var metricQuerySchema = zod.z.object({
  period: periodSchema,
  /** Omitido usa o período anterior imediato. */
  comparePeriod: periodSchema.optional(),
  metrics: zod.z.array(metricIdSchema).optional()
});
var dashboardSummarySchema = zod.z.object({
  period: periodSchema,
  comparePeriod: periodSchema,
  currency: currencySchema,
  datasetVersion: zod.z.number().int(),
  metrics: zod.z.array(metricValueSchema)
});
var calculationSchema = zod.z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  formula: zod.z.string(),
  inputs: zod.z.array(
    zod.z.object({
      label: zod.z.string(),
      value: zod.z.number(),
      metricId: metricIdSchema.nullable()
    })
  ),
  result: zod.z.number()
});
var evidenceTransactionSchema = zod.z.object({
  id: idSchema,
  date: zod.z.string(),
  description: zod.z.string(),
  amount: moneySchema,
  counterpartyName: zod.z.string().nullable(),
  lineage: lineageRefSchema
});
var evidenceSchema = zod.z.object({
  id: idSchema,
  claim: zod.z.string(),
  calculations: zod.z.array(calculationSchema),
  transactionCount: zod.z.number().int().nonnegative(),
  sampleTransactions: zod.z.array(evidenceTransactionSchema),
  /** Ficheiros que contribuíram, para o utilizador reconhecer a origem. */
  sources: zod.z.array(
    zod.z.object({
      importId: idSchema,
      fileName: zod.z.string(),
      sheetName: zod.z.string().nullable(),
      rowRange: zod.z.string().nullable()
    })
  ),
  datasetVersion: zod.z.number().int()
});
var insightSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** Já traduzido no locale do pedido. */
  title: zod.z.string(),
  description: zod.z.string(),
  metricId: metricIdSchema.nullable(),
  /** Números que sustentam a afirmação, para a UI mostrar sem recalcular. */
  supportingData: zod.z.record(zod.z.string(), zod.z.number()),
  evidence: evidenceSchema.nullable(),
  /** Dispensado pelo utilizador: não volta a aparecer para o mesmo período. */
  dismissedAt: isoDateTimeSchema.nullable(),
  datasetVersion: zod.z.number().int(),
  createdAt: isoDateTimeSchema
});
var recommendationSchema = zod.z.object({
  id: idSchema,
  insightId: idSchema.nullable(),
  title: zod.z.string(),
  rationale: zod.z.string(),
  /** Sempre `RECOMMENDATION`, para a UI nunca a mostrar como facto. */
  kind: zod.z.literal("RECOMMENDATION"),
  createdAt: isoDateTimeSchema
});
var changeItemSchema = zod.z.object({
  label: zod.z.string(),
  metricId: metricIdSchema.nullable(),
  entityId: idSchema.nullable(),
  changeAbsolute: zod.z.number(),
  changePercent: zod.z.number().nullable(),
  changePoints: zod.z.number().nullable(),
  direction: zod.z.enum(["UP", "DOWN", "FLAT"]),
  /** Se subir é bom ou mau depende da métrica: despesa a subir não é vitória. */
  sentiment: zod.z.enum(["POSITIVE", "NEGATIVE", "NEUTRAL"])
});
var insightFilterSchema = zod.z.object({
  period: periodSchema.optional(),
  type: insightTypeSchema.optional(),
  severity: severitySchema.optional(),
  includeDismissed: zod.z.coerce.boolean().default(false)
});
var keyPointSchema = zod.z.object({
  type: aiResponseTypeSchema,
  text: zod.z.string(),
  /** Presente em FACT e CALCULATION. Ausente é sinal de afirmação não suportada. */
  evidenceId: idSchema.nullable()
});
var assumptionSchema = zod.z.object({
  label: zod.z.string(),
  value: zod.z.string(),
  /** Verdadeiro quando foi o modelo a assumir, não o utilizador a declarar. */
  inferred: zod.z.boolean()
});
var aiRecommendationSchema = zod.z.object({
  title: zod.z.string(),
  rationale: zod.z.string()
});
var aiAnswerSchema = zod.z.object({
  answer: zod.z.string(),
  keyPoints: zod.z.array(keyPointSchema),
  evidence: zod.z.array(evidenceSchema),
  calculations: zod.z.array(calculationSchema),
  assumptions: zod.z.array(assumptionSchema),
  recommendations: zod.z.array(aiRecommendationSchema),
  followUpQuestions: zod.z.array(zod.z.string()),
  /**
   * Verdadeiro quando os dados não chegavam para responder.
   *
   * O §21 obriga a dizê-lo em vez de preencher o vazio com algo plausível — e
   * admitir falta de dados é o comportamento que sustenta a confiança a longo
   * prazo.
   */
  insufficientData: zod.z.boolean()
});
var aiMessageSchema = zod.z.object({
  id: idSchema,
  conversationId: idSchema,
  role: zod.z.enum(["USER", "ASSISTANT"]),
  content: zod.z.string(),
  answer: aiAnswerSchema.nullable(),
  /** Guardado com a resposta para o relatório ser reproduzível (§46, §47). */
  provider: zod.z.string().nullable(),
  model: zod.z.string().nullable(),
  promptVersion: zod.z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var aiConversationSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  title: zod.z.string(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema
});
var askInputSchema = zod.z.object({
  question: zod.z.string().min(1).max(2e3),
  conversationId: idSchema.nullable().optional(),
  locale: localeSchema.optional()
});
var aiUsageSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  userId: idSchema.nullable(),
  provider: zod.z.string(),
  model: zod.z.string(),
  task: aiTaskSchema,
  inputTokens: zod.z.number().int().nonnegative(),
  outputTokens: zod.z.number().int().nonnegative(),
  cachedTokens: zod.z.number().int().nonnegative(),
  /** Cêntimos. Estimativa — o valor verdadeiro é o da factura do provider. */
  estimatedCostCents: zod.z.number().int().nonnegative(),
  latencyMs: zod.z.number().int().nonnegative(),
  createdAt: isoDateTimeSchema
});
var aiUsageSummarySchema = zod.z.object({
  period: zod.z.string(),
  totalCostCents: zod.z.number().int().nonnegative(),
  byProvider: zod.z.array(
    zod.z.object({
      provider: zod.z.string(),
      costCents: zod.z.number().int().nonnegative(),
      requestCount: zod.z.number().int().nonnegative()
    })
  )
});
var aiPrivacyStatusSchema = zod.z.object({
  providerKind: aiProviderKindSchema,
  model: zod.z.string(),
  /** Falso quando o endpoint sai da máquina ou da região configurada. */
  dataStaysLocal: zod.z.boolean(),
  retentionPolicy: aiRetentionPolicySchema,
  isBYOK: zod.z.boolean(),
  /** Onde o pedido é processado, tanto quanto se sabe do endpoint. */
  processingRegion: zod.z.string().nullable()
});
var scenarioInputSchema = zod.z.object({
  type: scenarioTypeSchema,
  name: zod.z.string().min(1).max(160),
  basePeriod: periodSchema,
  /** Meses a projectar a partir do período base. */
  horizonMonths: zod.z.number().int().min(1).max(36).default(12),
  /**
   * Parâmetros da alteração, conforme o tipo:
   *
   *   REVENUE_CHANGE   { percent: -10 }
   *   EXPENSE_CHANGE   { categoryId, percent: 20 }
   *   HIRING           { headcount: 3, monthlyCostCents: 350000 }
   *   CUSTOMER_LOSS    { customerId }
   *   PRICE_CHANGE     { percent: 5 }
   */
  parameters: zod.z.record(zod.z.string(), zod.z.union([zod.z.string(), zod.z.number(), zod.z.boolean()]))
});
var scenarioImpactSchema = zod.z.object({
  metricId: metricIdSchema,
  baseline: zod.z.number(),
  projected: zod.z.number(),
  changeAbsolute: zod.z.number(),
  changePercent: zod.z.number().nullable()
});
var scenarioResultSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  type: scenarioTypeSchema,
  basePeriod: periodSchema,
  currency: currencySchema,
  impacts: zod.z.array(scenarioImpactSchema),
  assumptions: zod.z.array(assumptionSchema),
  /** Redigida pela IA a partir dos impactos já calculados (M7). */
  explanation: zod.z.string().nullable(),
  datasetVersion: zod.z.number().int(),
  createdAt: isoDateTimeSchema
});
var forecastPointSchema = zod.z.object({
  period: periodSchema,
  scenario: forecastScenarioSchema,
  revenue: zod.z.number().int(),
  expenses: zod.z.number().int(),
  grossProfit: zod.z.number().int(),
  cash: zod.z.number().int().nullable()
});
var forecastSchema = zod.z.object({
  organizationId: idSchema,
  generatedFrom: periodSchema,
  horizonMonths: zod.z.number().int(),
  currency: currencySchema,
  points: zod.z.array(forecastPointSchema),
  assumptions: zod.z.array(assumptionSchema),
  datasetVersion: zod.z.number().int()
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
var reportSectionKindSchema = zod.z.enum(REPORT_SECTION_KINDS);
var reportSectionSchema = zod.z.object({
  kind: reportSectionKindSchema,
  title: zod.z.string(),
  /** Markdown. Por template no M6, redigido pela IA a partir do M7. */
  body: zod.z.string(),
  /** Verdadeiro quando o texto saiu de um modelo — o PDF marca-o. */
  aiGenerated: zod.z.boolean()
});
var reportMetadataSchema = zod.z.object({
  organizationId: idSchema,
  period: periodSchema,
  datasetVersion: zod.z.number().int(),
  metricsVersion: zod.z.string(),
  aiProvider: zod.z.string().nullable(),
  aiModel: zod.z.string().nullable(),
  promptVersion: zod.z.string().nullable(),
  locale: localeSchema,
  generatedAt: isoDateTimeSchema,
  generatedByUserId: idSchema
});
var reportSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  title: zod.z.string(),
  period: periodSchema,
  sections: zod.z.array(reportSectionSchema),
  metadata: reportMetadataSchema,
  createdAt: isoDateTimeSchema
});
var generateReportInputSchema = zod.z.object({
  period: periodSchema,
  locale: localeSchema.optional(),
  /** Sem IA gera as secções por template — o comportamento do M6. */
  useAI: zod.z.boolean().default(false)
});
var exportRequestSchema = zod.z.object({
  format: exportFormatSchema,
  locale: localeSchema.optional()
});
var exportResultSchema = zod.z.object({
  url: zod.z.string().url(),
  fileName: zod.z.string(),
  expiresAt: isoDateTimeSchema
});
var planLimitsSchema = zod.z.object({
  maxUsers: zod.z.number().int().positive().nullable(),
  maxTransactions: zod.z.number().int().positive().nullable(),
  maxOrganizations: zod.z.number().int().positive().nullable(),
  /** Cêntimos de consumo de IA incluídos por mês. */
  aiMonthlyAllowanceCents: zod.z.number().int().nonnegative().nullable(),
  /** Deixa continuar acima do limite e cobra o excedente. */
  allowAIOverage: zod.z.boolean(),
  // Funcionalidades de soberania — o que legitimamente escala por preço
  canUseBYOK: zod.z.boolean(),
  canUseLocalAI: zod.z.boolean(),
  canChooseDataRegion: zod.z.boolean(),
  canUseSSO: zod.z.boolean(),
  canExportAuditLog: zod.z.boolean(),
  canWhiteLabel: zod.z.boolean(),
  auditLogRetentionMonths: zod.z.number().int().positive().nullable()
});
var planSchema = zod.z.object({
  tier: planTierSchema,
  name: zod.z.string(),
  /** Cêntimos por mês. Configurável — o §80 exige preço não codificado. */
  monthlyPriceCents: zod.z.number().int().nonnegative(),
  yearlyPriceCents: zod.z.number().int().nonnegative(),
  currency: zod.z.string().length(3),
  limits: planLimitsSchema
});
var subscriptionSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  tier: planTierSchema,
  status: subscriptionStatusSchema,
  provider: paymentProviderSchema,
  currentPeriodEnd: isoDateTimeSchema.nullable(),
  cancelAtPeriodEnd: zod.z.boolean(),
  trialEndsAt: isoDateTimeSchema.nullable(),
  createdAt: isoDateTimeSchema
});
var createCheckoutInputSchema = zod.z.object({
  tier: planTierSchema,
  interval: zod.z.enum(["MONTHLY", "YEARLY"]),
  provider: paymentProviderSchema.optional(),
  successUrl: zod.z.string().url(),
  cancelUrl: zod.z.string().url()
});
var checkoutSessionSchema = zod.z.object({
  url: zod.z.string().url(),
  sessionId: zod.z.string()
});
var usageSummarySchema = zod.z.object({
  organizationId: idSchema,
  tier: planTierSchema,
  users: zod.z.object({ used: zod.z.number().int(), limit: zod.z.number().int().nullable() }),
  transactions: zod.z.object({ used: zod.z.number().int(), limit: zod.z.number().int().nullable() }),
  ai: zod.z.object({
    spent: moneySchema,
    allowance: moneySchema.nullable(),
    overageAllowed: zod.z.boolean()
  })
});

exports.ACTIVITY_SUBJECTS = ACTIVITY_SUBJECTS;
exports.ACTIVITY_TYPES = ACTIVITY_TYPES;
exports.AI_PROVIDER_KINDS = AI_PROVIDER_KINDS;
exports.AI_RESPONSE_TYPES = AI_RESPONSE_TYPES;
exports.AI_RETENTION_POLICIES = AI_RETENTION_POLICIES;
exports.AI_TASKS = AI_TASKS;
exports.AUDIT_ACTIONS = AUDIT_ACTIONS;
exports.CONNECTOR_CAPABILITIES = CONNECTOR_CAPABILITIES;
exports.CUSTOMER_STATUSES = CUSTOMER_STATUSES;
exports.DATA_CLASSES = DATA_CLASSES;
exports.DATA_QUALITY_ISSUE_TYPES = DATA_QUALITY_ISSUE_TYPES;
exports.DATA_SOURCE_KINDS = DATA_SOURCE_KINDS;
exports.DEFAULT_LOCALE = DEFAULT_LOCALE;
exports.EXPORT_FORMATS = EXPORT_FORMATS;
exports.FORECAST_SCENARIOS = FORECAST_SCENARIOS;
exports.IMPORT_STATES = IMPORT_STATES;
exports.IMPORT_TRIGGERS = IMPORT_TRIGGERS;
exports.INSIGHT_TYPES = INSIGHT_TYPES;
exports.LEAD_STATUSES = LEAD_STATUSES;
exports.LOCALES = LOCALES;
exports.METRIC_IDS = METRIC_IDS;
exports.METRIC_UNITS = METRIC_UNITS;
exports.OPPORTUNITY_STAGES = OPPORTUNITY_STAGES;
exports.PASSWORD_MIN_LENGTH = PASSWORD_MIN_LENGTH;
exports.PAYMENT_PROVIDERS = PAYMENT_PROVIDERS;
exports.PERIOD_GRANULARITIES = PERIOD_GRANULARITIES;
exports.PERMISSIONS = PERMISSIONS;
exports.PLAN_TIERS = PLAN_TIERS;
exports.REPORT_SECTION_KINDS = REPORT_SECTION_KINDS;
exports.ROLES = ROLES;
exports.ROLE_PERMISSIONS = ROLE_PERMISSIONS;
exports.SCENARIO_TYPES = SCENARIO_TYPES;
exports.SEVERITIES = SEVERITIES;
exports.SUBSCRIPTION_STATUSES = SUBSCRIPTION_STATUSES;
exports.TARGET_FIELDS = TARGET_FIELDS;
exports.TRANSACTION_TYPES = TRANSACTION_TYPES;
exports.activitySchema = activitySchema;
exports.activitySubjectSchema = activitySubjectSchema;
exports.activityTypeSchema = activityTypeSchema;
exports.aiAnswerSchema = aiAnswerSchema;
exports.aiConversationSchema = aiConversationSchema;
exports.aiMessageSchema = aiMessageSchema;
exports.aiPrivacyStatusSchema = aiPrivacyStatusSchema;
exports.aiProviderConfigSchema = aiProviderConfigSchema;
exports.aiProviderKindSchema = aiProviderKindSchema;
exports.aiRecommendationSchema = aiRecommendationSchema;
exports.aiResponseTypeSchema = aiResponseTypeSchema;
exports.aiRetentionPolicySchema = aiRetentionPolicySchema;
exports.aiTaskSchema = aiTaskSchema;
exports.aiUsageSchema = aiUsageSchema;
exports.aiUsageSummarySchema = aiUsageSummarySchema;
exports.apiErrorSchema = apiErrorSchema;
exports.askInputSchema = askInputSchema;
exports.assumptionSchema = assumptionSchema;
exports.auditActionSchema = auditActionSchema;
exports.authResponseSchema = authResponseSchema;
exports.brandingConfigSchema = brandingConfigSchema;
exports.breakdownItemSchema = breakdownItemSchema;
exports.budgetSchema = budgetSchema;
exports.calculationSchema = calculationSchema;
exports.categorySchema = categorySchema;
exports.changeItemSchema = changeItemSchema;
exports.checkoutSessionSchema = checkoutSessionSchema;
exports.columnMappingSchema = columnMappingSchema;
exports.confirmMappingInputSchema = confirmMappingInputSchema;
exports.connectionHealthSchema = connectionHealthSchema;
exports.connectorCapabilitySchema = connectorCapabilitySchema;
exports.createCheckoutInputSchema = createCheckoutInputSchema;
exports.createLeadInputSchema = createLeadInputSchema;
exports.createOpportunityInputSchema = createOpportunityInputSchema;
exports.currencySchema = currencySchema;
exports.customerSchema = customerSchema;
exports.customerStatusSchema = customerStatusSchema;
exports.dashboardSummarySchema = dashboardSummarySchema;
exports.dataClassSchema = dataClassSchema;
exports.dataQualityIssueSchema = dataQualityIssueSchema;
exports.dataQualityIssueTypeSchema = dataQualityIssueTypeSchema;
exports.dataQualitySummarySchema = dataQualitySummarySchema;
exports.dataSourceKindSchema = dataSourceKindSchema;
exports.dataSourceSchema = dataSourceSchema;
exports.datasetSchema = datasetSchema;
exports.deltaSchema = deltaSchema;
exports.discoveredEntitySchema = discoveredEntitySchema;
exports.discoveredFieldSchema = discoveredFieldSchema;
exports.discoveredSchemaSchema = discoveredSchemaSchema;
exports.emailSchema = emailSchema;
exports.evidenceSchema = evidenceSchema;
exports.evidenceTransactionSchema = evidenceTransactionSchema;
exports.exportFormatSchema = exportFormatSchema;
exports.exportRequestSchema = exportRequestSchema;
exports.exportResultSchema = exportResultSchema;
exports.forecastPointSchema = forecastPointSchema;
exports.forecastScenarioSchema = forecastScenarioSchema;
exports.forecastSchema = forecastSchema;
exports.generateReportInputSchema = generateReportInputSchema;
exports.idSchema = idSchema;
exports.importFilterSchema = importFilterSchema;
exports.importMappingSchema = importMappingSchema;
exports.importProgressSchema = importProgressSchema;
exports.importSchema = importSchema;
exports.importStateSchema = importStateSchema;
exports.importTriggerSchema = importTriggerSchema;
exports.insightFilterSchema = insightFilterSchema;
exports.insightSchema = insightSchema;
exports.insightTypeSchema = insightTypeSchema;
exports.inviteMemberInputSchema = inviteMemberInputSchema;
exports.isoDateSchema = isoDateSchema;
exports.isoDateTimeSchema = isoDateTimeSchema;
exports.keyPointSchema = keyPointSchema;
exports.leadFilterSchema = leadFilterSchema;
exports.leadSchema = leadSchema;
exports.leadStatusSchema = leadStatusSchema;
exports.lineageRefSchema = lineageRefSchema;
exports.localeSchema = localeSchema;
exports.loginInputSchema = loginInputSchema;
exports.memberSchema = memberSchema;
exports.membershipSchema = membershipSchema;
exports.metricIdSchema = metricIdSchema;
exports.metricNodeSpecSchema = metricNodeSpecSchema;
exports.metricQuerySchema = metricQuerySchema;
exports.metricUnitSchema = metricUnitSchema;
exports.metricValueSchema = metricValueSchema;
exports.moneySchema = moneySchema;
exports.opportunitySchema = opportunitySchema;
exports.opportunityStageSchema = opportunityStageSchema;
exports.organizationSchema = organizationSchema;
exports.organizationSettingsSchema = organizationSettingsSchema;
exports.paginatedSchema = paginatedSchema;
exports.paginationQuerySchema = paginationQuerySchema;
exports.partnerSchema = partnerSchema;
exports.passwordSchema = passwordSchema;
exports.paymentProviderSchema = paymentProviderSchema;
exports.percentageSchema = percentageSchema;
exports.periodGranularitySchema = periodGranularitySchema;
exports.periodRangeSchema = periodRangeSchema;
exports.periodSchema = periodSchema;
exports.permissionSchema = permissionSchema;
exports.pipelineSummarySchema = pipelineSummarySchema;
exports.planLimitsSchema = planLimitsSchema;
exports.planSchema = planSchema;
exports.planTierSchema = planTierSchema;
exports.recommendationSchema = recommendationSchema;
exports.refreshInputSchema = refreshInputSchema;
exports.reportMetadataSchema = reportMetadataSchema;
exports.reportSchema = reportSchema;
exports.reportSectionKindSchema = reportSectionKindSchema;
exports.reportSectionSchema = reportSectionSchema;
exports.requestPasswordResetInputSchema = requestPasswordResetInputSchema;
exports.resetPasswordInputSchema = resetPasswordInputSchema;
exports.roleSchema = roleSchema;
exports.scenarioImpactSchema = scenarioImpactSchema;
exports.scenarioInputSchema = scenarioInputSchema;
exports.scenarioResultSchema = scenarioResultSchema;
exports.scenarioTypeSchema = scenarioTypeSchema;
exports.sessionOrganizationSchema = sessionOrganizationSchema;
exports.sessionUserSchema = sessionUserSchema;
exports.severitySchema = severitySchema;
exports.signupInputSchema = signupInputSchema;
exports.subscriptionSchema = subscriptionSchema;
exports.subscriptionStatusSchema = subscriptionStatusSchema;
exports.supplierSchema = supplierSchema;
exports.syncCursorSchema = syncCursorSchema;
exports.targetFieldSchema = targetFieldSchema;
exports.timeSeriesPointSchema = timeSeriesPointSchema;
exports.tokenPairSchema = tokenPairSchema;
exports.transactionFilterSchema = transactionFilterSchema;
exports.transactionSchema = transactionSchema;
exports.transactionTypeSchema = transactionTypeSchema;
exports.updateLeadInputSchema = updateLeadInputSchema;
exports.updateOrganizationSettingsInputSchema = updateOrganizationSettingsInputSchema;
exports.upsertAIProviderConfigInputSchema = upsertAIProviderConfigInputSchema;
exports.usageSummarySchema = usageSummarySchema;
exports.varianceContributionSchema = varianceContributionSchema;
exports.varianceTreeSchema = varianceTreeSchema;
