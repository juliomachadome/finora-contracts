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
  // The auditor sees everything that is historical and changes nothing — does
  // not even ask the AI, because a generated answer is not auditable evidence.
  AUDITOR: ["view_financials", "view_audit_logs", "export_reports"]
};
var DATA_SOURCE_KINDS = [
  "FILE_UPLOAD",
  // Declared now, implemented when there is demand (§98, §107).
  // Being in the enum is what guarantees the architecture accommodates them
  // without a migration.
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
  // A single adapter serves everything that speaks the OpenAI protocol: OpenAI,
  // Ollama, vLLM, LM Studio, Groq, OpenRouter, DeepSeek, Mistral, xAI and the
  // client's own AI gateway (§13).
  "openai-compatible",
  // Native adapters, to take advantage of their own tool calling, structured
  // output and caching (M7).
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
  /** Integer in cents. 1234 = 12.34. Negative is allowed (refunds). */
  amountCents: z.number().int(),
  currency: currencySchema
});
var percentageSchema = z.number();
var deltaSchema = z.object({
  current: z.number(),
  previous: z.number(),
  changeAbsolute: z.number(),
  changePercent: z.number().nullable(),
  /** For margins, in percentage points. 2.8 = +2.8pp. */
  changePoints: z.number().nullable().optional()
});
var apiErrorSchema = z.object({
  code: z.string(),
  message: z.string(),
  details: z.record(z.string(), z.array(z.string())).optional(),
  /** For the user to quote when asking for support, and to cross with the log. */
  requestId: z.string().optional()
});
var paginationQuerySchema = z.object({
  cursor: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(200).default(50)
});
var paginatedSchema = (item) => z.object({
  items: z.array(item),
  nextCursor: z.string().nullable(),
  /** Only when it is cheap to obtain. Absent does not mean zero. */
  totalCount: z.number().int().optional()
});
var periodRangeSchema = z.object({
  from: periodSchema,
  to: periodSchema
}).refine((r) => r.from <= r.to, {
  message: "from must be earlier than or equal to to",
  path: ["from"]
});
var auditEventSchema = z.object({
  id: idSchema,
  /** Past-tense verb, dotted: `subscription.changed`, `auth.login`. */
  action: z.string(),
  resourceType: z.string().nullable(),
  resourceId: z.string().nullable(),
  userId: idSchema.nullable(),
  metadata: z.record(z.string(), z.unknown()),
  ipAddress: z.string().nullable(),
  requestId: z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var PASSWORD_MIN_LENGTH = 12;
var passwordSchema = z.string().min(PASSWORD_MIN_LENGTH, `m\xEDnimo de ${PASSWORD_MIN_LENGTH} caracteres`).max(200);
var emailSchema = z.string().email().toLowerCase().trim();
var signupInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1).max(120).trim(),
  /** Created in the same step: an account without an organization does nothing. */
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
  /** Seconds until the access expires. The client renews before, not after failing. */
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
  /** IANA, e.g. `Europe/Lisbon`. Decides which month a transaction belongs to. */
  timezone: z.string(),
  /** Month the fiscal year starts in, 1–12. Not every company closes in December. */
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
  /** Pseudonymize names when a payroll sheet pattern is detected on ingestion. */
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
   * Non-secret configuration: endpoint, remote company id, filters.
   * Credentials never live here — they live encrypted and never leave the backend.
   */
  config: z.record(z.string(), z.unknown()),
  /** Never `true` so the frontend knows the key; only whether it exists. */
  hasCredentials: z.boolean(),
  lastSyncAt: isoDateTimeSchema.nullable(),
  lastSyncError: z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var syncCursorSchema = z.object({
  /** Supplier watermark: timestamp, sequential id or opaque token. */
  value: z.string(),
  updatedAt: isoDateTimeSchema
});
var discoveredFieldSchema = z.object({
  name: z.string(),
  /** Type inferred from the sample, not declared. Excel lies about types. */
  inferredType: z.enum(["date", "number", "string", "boolean", "empty", "mixed"]),
  /** First rows, for the user to recognize the column when mapping. */
  sampleValues: z.array(z.string()),
  nullRatio: z.number().min(0).max(1)
});
var discoveredEntitySchema = z.object({
  /** Name of the sheet, table or remote entity. */
  name: z.string(),
  rowCount: z.number().int().nonnegative(),
  fields: z.array(discoveredFieldSchema),
  /**
   * Flagged when the columns look like a payroll sheet.
   *
   * It is the file with a salary tied to an identified person — personal data of
   * third parties and the number one reason for a CFO not to upload anything.
   * Detecting it allows offering pseudonymization before persisting, instead of
   * finding out afterwards.
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
  /** False when the endpoint leaves the client's machine or region. */
  dataStaysLocal: z.boolean(),
  isActive: z.boolean(),
  createdAt: isoDateTimeSchema
});
var upsertAIProviderConfigInputSchema = z.object({
  kind: z.string(),
  model: z.string().min(1),
  baseUrl: z.string().url().nullable().optional(),
  /** Only on the write. Never comes back on a read. */
  apiKey: z.string().min(1).nullable().optional(),
  embeddingModel: z.string().nullable().optional(),
  retentionPolicy: aiRetentionPolicySchema.optional()
});
var datasetSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  name: z.string(),
  /**
   * Goes up on each completed import.
   *
   * It is the piece that makes reports reproducible (§46) and that invalidates
   * the metrics cache by construction: new key, old values stop being read, with
   * no manual invalidation — which is where wrong cached numbers are born.
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
   * SHA-256 of the content.
   *
   * With `unique(organizationId, fileHash)` in the database, uploading the same
   * file twice is rejected by the constraint (§92). The check is the constraint,
   * and not a `findFirst` before the `create` — between the read and the write
   * another request fits, and that is how duplicates are born in production.
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
  /** Detected format, e.g. `DD/MM/YYYY` or `1.234,56`. */
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
  /** Pseudonymize names when the sheet looks like payroll. */
  pseudonymizeNames: z.boolean().default(false)
});
var previewRowSchema = z.object({
  /** The line in the original file, so the person can go and look at it. */
  rowNumber: z.number().int().positive(),
  /** `YYYY-MM-DD`. Already normalized: it is the interpretation being checked. */
  date: z.string(),
  description: z.string(),
  /**
   * Integer cents, **as a string**.
   *
   * A `BigInt` does not survive `JSON.stringify`, and turning it into a `number`
   * on the way out would put back exactly the floating point the engine spends
   * its whole design avoiding. The string crosses the wire intact and the UI
   * converts it once, at the formatting boundary.
   *
   * The pattern is not decoration: it is what makes a stray `"12.34"` fail here,
   * at the parse, instead of arriving as a silent `12` after `Number()`.
   */
  amountCents: z.string().regex(/^-?\d+$/),
  currency: currencySchema,
  /** The customer or the supplier, whichever the document type makes it. */
  counterparty: z.string().nullable(),
  category: z.string().nullable()
});
var importPreviewSchema = z.object({
  /** Only the first few. The count of what would go in is `rowsReady`. */
  rows: z.array(previewRowSchema),
  rowsReady: z.number().int().nonnegative(),
  rowsSkipped: z.number().int().nonnegative(),
  /** Of the skipped ones, how many were skipped for being repeats. */
  duplicates: z.number().int().nonnegative(),
  /** How the file was read, e.g. `DD/MM/YYYY` and `1.234,56`. */
  formats: z.object({ date: z.string(), amount: z.string() })
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
  /** 0–100. An estimate; the UI shows a bar, not a promise of time. */
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
  /** Row number in the original file, just as the user sees it in Excel. */
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
  /** Commercial enrichment (M8). Null until someone fills it in. */
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
  /** Shallow hierarchy: a category can have a parent, the parent has no grandparent. */
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
  /** Search by description, customer, supplier or invoice number. */
  search: z.string().max(200).optional(),
  minAmountCents: z.coerce.number().int().optional(),
  maxAmountCents: z.coerce.number().int().optional(),
  sortBy: z.enum(["date", "amount", "description"]).default("date"),
  sortDir: z.enum(["asc", "desc"]).default("desc"),
  /**
   * Jump to a numbered page. Coexists with the cursor, which remains the default
   * path: a cursor says where to continue, not where page 7 is — and the
   * explorer is where someone looks for a transaction from March. The ceiling of
   * 200 keeps the cost of the jump in milliseconds; beyond it, you filter.
   */
  page: z.coerce.number().int().min(1).max(200).optional()
});
var breakdownItemSchema = z.object({
  id: idSchema.nullable(),
  label: z.string(),
  amount: moneySchema,
  /** Weight in the period total, 0–100. */
  sharePercent: z.number(),
  /** Variation against the previous period; null when there was no base. */
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
  /**
   * The optimistic locking version, and it travels on the read on purpose.
   *
   * The write routes require the version that was read — without it in the
   * response, an honest client can only guess: it sends zero, works on the first
   * lead and fails on every one that has already been touched. A lock the
   * consumer cannot satisfy is not security, it is a broken feature.
   */
  version: z.number().int().nonnegative(),
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
  /** 0–100. Multiplied by the value it gives the forecast's weighted pipeline (§40). */
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
  message: "an opportunity must belong to a customer or to a lead",
  path: ["customerId"]
});
var leadFilterSchema = paginationQuerySchema.extend({
  status: leadStatusSchema.optional(),
  ownerId: idSchema.optional(),
  search: z.string().max(200).optional()
});
var METRIC_IDS = [
  // Leaves — the only ones that query the database directly
  "REVENUE",
  "EXPENSES",
  "COGS",
  "OPEX",
  "CASH",
  "ACCOUNTS_RECEIVABLE",
  "ACCOUNTS_PAYABLE",
  "BUDGETED_EXPENSES",
  // Derived — pure functions of their dependencies
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
  "BUDGET_VARIANCE",
  /*
   * Commercial (§M8, T24).
   *
   * The pipeline was built as its own module with a good seam to the financial
   * side at conversion, and **none of it was a node of this graph**. The
   * consequence was not cosmetic: an area is not a separate graph, it is a set
   * of target metrics whose graph is `requiredFor(targets)` — so with nothing
   * commercial in here, sales and marketing objectives had nothing to attach
   * to.
   *
   * Two graphs would have been the worse answer: two definitions of revenue
   * that one day disagree. Cuts share the edges, and it is that sharing the
   * arbiter walks to return a trade-off.
   */
  "PIPELINE_OPEN",
  "PIPELINE_WEIGHTED",
  "DEALS_WON",
  "DEALS_LOST",
  "WIN_RATE"
];
var metricIdSchema = z.enum(METRIC_IDS);
var METRIC_UNITS = ["MONEY", "PERCENT", "MONTHS", "RATIO", "COUNT"];
var metricUnitSchema = z.enum(METRIC_UNITS);
var metricNodeSpecSchema = z.object({
  id: metricIdSchema,
  unit: metricUnitSchema,
  dependsOn: z.array(metricIdSchema),
  /** True when the node aggregates transactions instead of deriving from other nodes. */
  isLeaf: z.boolean(),
  /** Readable formula, e.g. `GROSS_PROFIT - OPEX`. Shown in the evidence panel. */
  formula: z.string().nullable()
});
var metricValueSchema = z.object({
  metricId: metricIdSchema,
  period: periodSchema,
  unit: metricUnitSchema,
  /**
   * Cents when MONEY; a plain number in the other units.
   *
   * **`null` means "not calculable", and not zero.** A margin without revenue, a
   * runway without burn or a growth without a previous period are not worth zero
   * — they have no basis to exist.
   *
   * The distinction is not fussiness: showing "0.0 months" of runway to a CFO
   * whose month was profitable is asserting a false fact about their business.
   * The UI shows a dash.
   */
  value: z.number().nullable(),
  currency: currencySchema.nullable(),
  /** Null when there is no previous period to compare with. */
  delta: deltaSchema.nullable(),
  /**
   * Version of the dataset that produced this value.
   *
   * It goes everywhere because a report has to be reproducible (§46): without
   * it, reprinting the July report after correcting a file gives another number
   * and nobody knows which one was right.
   */
  datasetVersion: z.number().int()
});
var varianceContributionSchema = z.object({
  label: z.string(),
  /** Present when the branch is a metric; absent when it is a dimension. */
  metricId: metricIdSchema.nullable(),
  /** Present when the branch is a customer, category or supplier. */
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
  /** Omitted uses the immediately previous period. */
  comparePeriod: periodSchema.optional(),
  metrics: z.array(metricIdSchema).optional()
});
var OVERVIEW_SECTIONS = [
  "METRICS",
  "WHAT_CHANGED",
  "ALERTS",
  "TRENDS",
  "CUSTOMERS",
  "CATEGORIES",
  "BUDGET",
  "TREASURY"
];
var overviewSectionSchema = z.enum(OVERVIEW_SECTIONS);
var overviewShapeSchema = z.object({
  metrics: z.array(metricIdSchema),
  sections: z.array(overviewSectionSchema),
  reasons: z.array(z.string())
});
var dashboardSummarySchema = z.object({
  period: periodSchema,
  comparePeriod: periodSchema,
  currency: currencySchema,
  datasetVersion: z.number().int(),
  metrics: z.array(metricValueSchema),
  /** Optional so a response without a composed shape stays valid: the panel then uses the fixed order. */
  shape: overviewShapeSchema.optional()
});
var archetypeSchema = z.enum([
  "RECURRING",
  "PROJECT",
  "RETAIL",
  "INDUSTRY",
  "UNDETERMINED"
]);
var profileSignalIdSchema = z.enum([
  "recurrence",
  "churn",
  "concentration",
  "customerCount",
  "ticketSpread",
  "costStructure",
  "dso",
  "seasonality"
]);
var profileSignalSchema = z.object({
  id: profileSignalIdSchema,
  /** `null` when the data cannot answer. Never zero standing in for unknown. */
  value: z.number().nullable(),
  /** The numbers this was measured from, so the claim can be checked. */
  detail: z.record(z.string(), z.number())
});
var businessProfileSchema = z.object({
  archetype: archetypeSchema,
  /** Every signal, including the ones that came back `null`. */
  signals: z.array(profileSignalSchema),
  /** The signals that carried the decision. Empty when nothing was declared. */
  because: z.array(profileSignalIdSchema),
  undeterminedReason: z.enum(["NOT_ENOUGH_HISTORY", "NO_CUSTOMERS", "TOO_CLOSE_TO_CALL"]).nullable(),
  period: periodSchema,
  datasetVersion: z.number().int()
});
var CANVAS_BLOCKS = [
  // Derived — computed on read, never stored, so they cannot drift from the
  // numbers they came from.
  "partners",
  "segments",
  "costStructure",
  "revenueStreams",
  // Declared — not in the data, and not for a model to guess.
  "valueProposition",
  "keyActivities",
  "keyResources",
  "customerRelationships",
  "channels"
];
var canvasBlockIdSchema = z.enum(CANVAS_BLOCKS);
var canvasEvidenceSchema = z.object({
  label: z.string(),
  /** Cents when the block is about money, a plain number otherwise. */
  value: z.number(),
  /** Share of the block's total, 0–100. `null` when a share means nothing here. */
  share: z.number().nullable()
});
var canvasBlockSchema = z.discriminatedUnion("kind", [
  z.object({
    kind: z.literal("DERIVED"),
    id: canvasBlockIdSchema,
    /** The signal that supports it. Empty when the data has nothing to say yet. */
    evidence: z.array(canvasEvidenceSchema),
    /** `MONEY` when the values are cents, `COUNT` when they are things. */
    unit: z.enum(["MONEY", "COUNT", "PERCENT"])
  }),
  z.object({
    kind: z.literal("DECLARED"),
    id: canvasBlockIdSchema,
    /** `null` means nobody has written it. Never a placeholder sentence. */
    content: z.string().nullable(),
    authorName: z.string().nullable(),
    updatedAt: isoDateTimeSchema.nullable()
  })
]);
var businessCanvasSchema = z.object({
  blocks: z.array(canvasBlockSchema),
  period: periodSchema,
  currency: currencySchema,
  datasetVersion: z.number().int()
});
var declareCanvasBlockSchema = z.object({
  block: z.enum(["valueProposition", "keyActivities", "keyResources", "customerRelationships", "channels"]),
  /**
   * Bounded, and deliberately short.
   *
   * A canvas block is a sentence, not a document. Six hundred characters is
   * about a paragraph — enough to say what the business does and too little to
   * turn the box into a place where strategy goes to be forgotten.
   */
  content: z.string().trim().min(1).max(600)
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
  /** Files that contributed, for the user to recognize the origin. */
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
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** E.g.: `insights.REVENUE_DECLINE.title`. Resolved against `messages/`. */
  titleKey: z.string(),
  /**
   * The same statement has different wordings depending on what is known — with
   * or without the customers that explain the drop, with or without the
   * comparison against the portfolio. It is the detector that chooses, because
   * it is the one that knows what it found.
   */
  descriptionKey: z.string(),
  /**
   * Values for ICU. A list of names travels as an **array**, never as an
   * already-joined string: the list separator changes with the language, and
   * joining it on the server would be writing Portuguese. What joins it is
   * `Intl.ListFormat`.
   */
  params: z.record(z.string(), z.union([z.string(), z.number(), z.array(z.string())])),
  metricId: metricIdSchema.nullable(),
  /**
   * The entity the statement refers to — the customer that dropped, the line
   * item that blew up. Together with `metricId` and `period`, it is the address
   * of the proof **and** the destination of the click: the two have to be the
   * same thing, otherwise the panel shows different rows from the ones the click
   * opens.
   */
  entityId: idSchema.nullable(),
  dimension: z.enum(["customer", "supplier", "category"]).nullable(),
  /** Numbers that support the statement, for the UI to show without recalculating. */
  supportingData: z.record(z.string(), z.number()),
  evidence: evidenceSchema.nullable(),
  /** Dismissed by the user: does not appear again for the same period. */
  dismissedAt: isoDateTimeSchema.nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema
});
var insightsResponseSchema = z.object({
  period: periodSchema,
  currency: z.string().length(3),
  datasetVersion: z.number().int(),
  insights: z.array(insightSchema)
});
var recommendationSchema = z.object({
  id: idSchema,
  insightId: idSchema.nullable(),
  title: z.string(),
  rationale: z.string(),
  /** Always `RECOMMENDATION`, so the UI never shows it as a fact. */
  kind: z.literal("RECOMMENDATION"),
  createdAt: isoDateTimeSchema
});
var changeItemSchema = z.object({
  metricId: metricIdSchema,
  unit: z.string(),
  /** The value in the period, so the UI does not request the summary again. */
  current: z.number(),
  changeAbsolute: z.number(),
  /**
   * `null` for margins, and for whatever has no comparison base.
   *
   * A margin varies in **percentage points**, not in percentage: from 40% to 42%
   * is +2pp, and saying "+5%" is true about the ratio and misleading about the
   * business. The two fields exist separately so the UI does not have to guess
   * which is the right one — whichever is filled in is what is shown.
   */
  changePercent: z.number().nullable(),
  changePoints: z.number().nullable(),
  direction: z.enum(["up", "down"]),
  /** Whether going up is good or bad depends on the metric: expenses rising is no win. */
  sentiment: z.enum(["positive", "negative"])
});
var whatChangedResponseSchema = z.object({
  period: periodSchema,
  currency: z.string().length(3),
  changes: z.array(changeItemSchema)
});
var insightFilterSchema = z.object({
  period: periodSchema.optional(),
  type: insightTypeSchema.optional(),
  severity: severitySchema.optional(),
  /**
   * `z.coerce.boolean()` is forbidden here, and it is not a preference: Zod's
   * coercion is `Boolean(value)`, and any non-empty string is true —
   * `?includeDismissed=false` would arrive as `true`. A trap already paid for
   * once in this project.
   */
  includeDismissed: z.enum(["true", "false"]).default("false").transform((valor) => valor === "true")
});
var evidenceIdSchema = z.union([
  idSchema,
  z.string().regex(/^doc:[0-9a-fA-F-]{36}(:\d{1,7})?$/)
]);
var keyPointSchema = z.object({
  type: aiResponseTypeSchema,
  text: z.string(),
  /** Present in FACT and CALCULATION. Absent is a sign of an unsupported statement. */
  evidenceId: evidenceIdSchema.nullable()
});
var assumptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  /** True when it was the model assuming, not the user declaring. */
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
   * True when the data was not enough to answer.
   *
   * §21 requires saying so instead of filling the void with something plausible
   * — and admitting a lack of data is the behaviour that sustains trust in the
   * long run.
   */
  insufficientData: z.boolean()
});
var aiMessageSchema = z.object({
  id: idSchema,
  conversationId: idSchema,
  role: z.enum(["USER", "ASSISTANT"]),
  content: z.string(),
  answer: aiAnswerSchema.nullable(),
  /** Stored with the answer so the report is reproducible (§46, §47). */
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
  /** Cents. An estimate — the true value is the one on the provider's invoice. */
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
  /** False when the endpoint leaves the configured machine or region. */
  dataStaysLocal: z.boolean(),
  retentionPolicy: aiRetentionPolicySchema,
  isBYOK: z.boolean(),
  /** Where the request is processed, as far as is known from the endpoint. */
  processingRegion: z.string().nullable()
});
var scenarioInputSchema = z.object({
  type: scenarioTypeSchema,
  name: z.string().min(1).max(160),
  basePeriod: periodSchema,
  /** Months to project from the base period. */
  horizonMonths: z.number().int().min(1).max(36).default(12),
  /**
   * Parameters of the change, according to the type:
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
  /** Written by the AI from the already calculated impacts (M7). */
  explanation: z.string().nullable(),
  datasetVersion: z.number().int(),
  createdAt: isoDateTimeSchema
});
var actualPointSchema = z.object({
  period: periodSchema,
  revenue: z.number().int(),
  expenses: z.number().int(),
  grossProfit: z.number().int(),
  cash: z.number().int().nullable()
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
  /** The months the trend was fitted to, oldest first. Never empty. */
  history: z.array(actualPointSchema),
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
  /** Markdown. By template in M6, written by the AI from M7 onwards. */
  body: z.string(),
  /** True when the text came out of a model — the PDF marks it. */
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
  /** Without AI it generates the sections by template — the M6 behaviour. */
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
  /** Cents of AI consumption included per month. */
  aiMonthlyAllowanceCents: z.number().int().nonnegative().nullable(),
  /** Lets it carry on above the limit and charges the overage. */
  allowAIOverage: z.boolean(),
  // Sovereignty features — what legitimately scales by price
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
  /** Cents per month. Configurable — §80 requires the price not be hard-coded. */
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

export { ACTIVITY_SUBJECTS, ACTIVITY_TYPES, AI_PROVIDER_KINDS, AI_RESPONSE_TYPES, AI_RETENTION_POLICIES, AI_TASKS, AUDIT_ACTIONS, CANVAS_BLOCKS, CONNECTOR_CAPABILITIES, CUSTOMER_STATUSES, DATA_CLASSES, DATA_QUALITY_ISSUE_TYPES, DATA_SOURCE_KINDS, DEFAULT_LOCALE, EXPORT_FORMATS, FORECAST_SCENARIOS, IMPORT_STATES, IMPORT_TRIGGERS, INSIGHT_TYPES, LEAD_STATUSES, LOCALES, METRIC_IDS, METRIC_UNITS, OPPORTUNITY_STAGES, OVERVIEW_SECTIONS, PASSWORD_MIN_LENGTH, PAYMENT_PROVIDERS, PERIOD_GRANULARITIES, PERMISSIONS, PLAN_TIERS, REPORT_SECTION_KINDS, ROLES, ROLE_PERMISSIONS, SCENARIO_TYPES, SEVERITIES, SUBSCRIPTION_STATUSES, TARGET_FIELDS, TRANSACTION_TYPES, activitySchema, activitySubjectSchema, activityTypeSchema, actualPointSchema, aiAnswerSchema, aiConversationSchema, aiMessageSchema, aiPrivacyStatusSchema, aiProviderConfigSchema, aiProviderKindSchema, aiRecommendationSchema, aiResponseTypeSchema, aiRetentionPolicySchema, aiTaskSchema, aiUsageSchema, aiUsageSummarySchema, apiErrorSchema, archetypeSchema, askInputSchema, assumptionSchema, auditActionSchema, auditEventSchema, authResponseSchema, brandingConfigSchema, breakdownItemSchema, budgetSchema, businessCanvasSchema, businessProfileSchema, calculationSchema, canvasBlockIdSchema, canvasBlockSchema, canvasEvidenceSchema, categorySchema, changeItemSchema, checkoutSessionSchema, columnMappingSchema, confirmMappingInputSchema, connectionHealthSchema, connectorCapabilitySchema, createCheckoutInputSchema, createLeadInputSchema, createOpportunityInputSchema, currencySchema, customerSchema, customerStatusSchema, dashboardSummarySchema, dataClassSchema, dataQualityIssueSchema, dataQualityIssueTypeSchema, dataQualitySummarySchema, dataSourceKindSchema, dataSourceSchema, datasetSchema, declareCanvasBlockSchema, deltaSchema, discoveredEntitySchema, discoveredFieldSchema, discoveredSchemaSchema, emailSchema, evidenceIdSchema, evidenceSchema, evidenceTransactionSchema, exportFormatSchema, exportRequestSchema, exportResultSchema, forecastPointSchema, forecastScenarioSchema, forecastSchema, generateReportInputSchema, idSchema, importFilterSchema, importMappingSchema, importPreviewSchema, importProgressSchema, importSchema, importStateSchema, importTriggerSchema, insightFilterSchema, insightSchema, insightTypeSchema, insightsResponseSchema, inviteMemberInputSchema, isoDateSchema, isoDateTimeSchema, keyPointSchema, leadFilterSchema, leadSchema, leadStatusSchema, lineageRefSchema, localeSchema, loginInputSchema, memberSchema, membershipSchema, metricIdSchema, metricNodeSpecSchema, metricQuerySchema, metricUnitSchema, metricValueSchema, moneySchema, opportunitySchema, opportunityStageSchema, organizationSchema, organizationSettingsSchema, overviewSectionSchema, overviewShapeSchema, paginatedSchema, paginationQuerySchema, partnerSchema, passwordSchema, paymentProviderSchema, percentageSchema, periodGranularitySchema, periodRangeSchema, periodSchema, permissionSchema, pipelineSummarySchema, planLimitsSchema, planSchema, planTierSchema, previewRowSchema, profileSignalIdSchema, profileSignalSchema, recommendationSchema, refreshInputSchema, reportMetadataSchema, reportSchema, reportSectionKindSchema, reportSectionSchema, requestPasswordResetInputSchema, resetPasswordInputSchema, roleSchema, scenarioImpactSchema, scenarioInputSchema, scenarioResultSchema, scenarioTypeSchema, sessionOrganizationSchema, sessionUserSchema, severitySchema, signupInputSchema, subscriptionSchema, subscriptionStatusSchema, supplierSchema, syncCursorSchema, targetFieldSchema, timeSeriesPointSchema, tokenPairSchema, transactionFilterSchema, transactionSchema, transactionTypeSchema, updateLeadInputSchema, updateOrganizationSettingsInputSchema, upsertAIProviderConfigInputSchema, usageSummarySchema, varianceContributionSchema, varianceTreeSchema, whatChangedResponseSchema };
