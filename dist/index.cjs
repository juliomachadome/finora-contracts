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
  // A single adapter serves everything that speaks the OpenAI protocol: OpenAI,
  // Ollama, vLLM, LM Studio, Groq, OpenRouter, DeepSeek, Mistral, xAI and the
  // client's own AI gateway (§13).
  "openai-compatible",
  // Native adapters, to take advantage of their own tool calling, structured
  // output and caching (M7).
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
var periodSchema = zod.z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "period must be YYYY-MM");
var currencySchema = zod.z.string().length(3).toUpperCase();
var moneySchema = zod.z.object({
  /** Integer in cents. 1234 = 12.34. Negative is allowed (refunds). */
  amountCents: zod.z.number().int(),
  currency: currencySchema
});
var percentageSchema = zod.z.number();
var deltaSchema = zod.z.object({
  current: zod.z.number(),
  previous: zod.z.number(),
  changeAbsolute: zod.z.number(),
  changePercent: zod.z.number().nullable(),
  /** For margins, in percentage points. 2.8 = +2.8pp. */
  changePoints: zod.z.number().nullable().optional()
});
var apiErrorSchema = zod.z.object({
  code: zod.z.string(),
  message: zod.z.string(),
  details: zod.z.record(zod.z.string(), zod.z.array(zod.z.string())).optional(),
  /** For the user to quote when asking for support, and to cross with the log. */
  requestId: zod.z.string().optional()
});
var paginationQuerySchema = zod.z.object({
  cursor: zod.z.string().optional(),
  limit: zod.z.coerce.number().int().min(1).max(200).default(50)
});
var paginatedSchema = (item) => zod.z.object({
  items: zod.z.array(item),
  nextCursor: zod.z.string().nullable(),
  /** Only when it is cheap to obtain. Absent does not mean zero. */
  totalCount: zod.z.number().int().optional()
});
var periodRangeSchema = zod.z.object({
  from: periodSchema,
  to: periodSchema
}).refine((r) => r.from <= r.to, {
  message: "from must be earlier than or equal to to",
  path: ["from"]
});
var auditEventSchema = zod.z.object({
  id: idSchema,
  /** Past-tense verb, dotted: `subscription.changed`, `auth.login`. */
  action: zod.z.string(),
  resourceType: zod.z.string().nullable(),
  resourceId: zod.z.string().nullable(),
  userId: idSchema.nullable(),
  metadata: zod.z.record(zod.z.string(), zod.z.unknown()),
  ipAddress: zod.z.string().nullable(),
  requestId: zod.z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var PASSWORD_MIN_LENGTH = 12;
var passwordSchema = zod.z.string().min(PASSWORD_MIN_LENGTH, `at least ${PASSWORD_MIN_LENGTH} characters`).max(200);
var emailSchema = zod.z.string().email().toLowerCase().trim();
var signupInputSchema = zod.z.object({
  email: emailSchema,
  password: passwordSchema,
  name: zod.z.string().min(1).max(120).trim(),
  /** Created in the same step: an account without an organization does nothing. */
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
  /** Seconds until the access expires. The client renews before, not after failing. */
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
  /** IANA, e.g. `Europe/Lisbon`. Decides which month a transaction belongs to. */
  timezone: zod.z.string(),
  /** Month the fiscal year starts in, 1–12. Not every company closes in December. */
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
  /** Pseudonymize names when a payroll sheet pattern is detected on ingestion. */
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
   * Non-secret configuration: endpoint, remote company id, filters.
   * Credentials never live here — they live encrypted and never leave the backend.
   */
  config: zod.z.record(zod.z.string(), zod.z.unknown()),
  /** Never `true` so the frontend knows the key; only whether it exists. */
  hasCredentials: zod.z.boolean(),
  lastSyncAt: isoDateTimeSchema.nullable(),
  lastSyncError: zod.z.string().nullable(),
  createdAt: isoDateTimeSchema
});
var syncCursorSchema = zod.z.object({
  /** Supplier watermark: timestamp, sequential id or opaque token. */
  value: zod.z.string(),
  updatedAt: isoDateTimeSchema
});
var discoveredFieldSchema = zod.z.object({
  name: zod.z.string(),
  /** Type inferred from the sample, not declared. Excel lies about types. */
  inferredType: zod.z.enum(["date", "number", "string", "boolean", "empty", "mixed"]),
  /** First rows, for the user to recognize the column when mapping. */
  sampleValues: zod.z.array(zod.z.string()),
  nullRatio: zod.z.number().min(0).max(1)
});
var discoveredEntitySchema = zod.z.object({
  /** Name of the sheet, table or remote entity. */
  name: zod.z.string(),
  rowCount: zod.z.number().int().nonnegative(),
  fields: zod.z.array(discoveredFieldSchema),
  /**
   * Flagged when the columns look like a payroll sheet.
   *
   * It is the file with a salary tied to an identified person — personal data of
   * third parties and the number one reason for a CFO not to upload anything.
   * Detecting it allows offering pseudonymization before persisting, instead of
   * finding out afterwards.
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
  /** False when the endpoint leaves the client's machine or region. */
  dataStaysLocal: zod.z.boolean(),
  isActive: zod.z.boolean(),
  createdAt: isoDateTimeSchema
});
var upsertAIProviderConfigInputSchema = zod.z.object({
  kind: zod.z.string(),
  model: zod.z.string().min(1),
  baseUrl: zod.z.string().url().nullable().optional(),
  /** Only on the write. Never comes back on a read. */
  apiKey: zod.z.string().min(1).nullable().optional(),
  embeddingModel: zod.z.string().nullable().optional(),
  retentionPolicy: aiRetentionPolicySchema.optional()
});
var datasetSchema = zod.z.object({
  id: idSchema,
  organizationId: idSchema,
  name: zod.z.string(),
  /**
   * Goes up on each completed import.
   *
   * It is the piece that makes reports reproducible (§46) and that invalidates
   * the metrics cache by construction: new key, old values stop being read, with
   * no manual invalidation — which is where wrong cached numbers are born.
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
   * SHA-256 of the content.
   *
   * With `unique(organizationId, fileHash)` in the database, uploading the same
   * file twice is rejected by the constraint (§92). The check is the constraint,
   * and not a `findFirst` before the `create` — between the read and the write
   * another request fits, and that is how duplicates are born in production.
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
  /*
   * The product or line of business (T20).
   *
   * A dimension of its own and not the category, because `category` is already
   * the cost taxonomy — cost of sales, salaries, marketing. Feeding product
   * lines into it would list "Bicicletas" beside "Salários" on every screen
   * that groups by category, as though they were both places money goes.
   */
  "product",
  "invoiceNumber",
  "reference",
  "externalId",
  "ignore"
];
var targetFieldSchema = zod.z.enum(TARGET_FIELDS);
var COLUMN_MATCHES = ["EXACT", "PARTIAL", "NONE", "MANUAL"];
var columnMatchSchema = zod.z.enum(COLUMN_MATCHES);
var columnMappingSchema = zod.z.object({
  sourceColumn: zod.z.string(),
  targetField: targetFieldSchema,
  confidence: zod.z.number().min(0).max(1),
  /**
   * Why the suggestion says what it says.
   *
   * Optional so a client built against an older contract still validates — the
   * screen falls back to the sentence it had before, which is the correct
   * degradation for a field that only makes a warning more specific.
   */
  match: columnMatchSchema.optional(),
  /** Detected format, e.g. `DD/MM/YYYY` or `1.234,56`. */
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
  /** Pseudonymize names when the sheet looks like payroll. */
  pseudonymizeNames: zod.z.boolean().default(false)
});
var previewRowSchema = zod.z.object({
  /** The line in the original file, so the person can go and look at it. */
  rowNumber: zod.z.number().int().positive(),
  /** `YYYY-MM-DD`. Already normalized: it is the interpretation being checked. */
  date: zod.z.string(),
  description: zod.z.string(),
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
  amountCents: zod.z.string().regex(/^-?\d+$/),
  currency: currencySchema,
  /** The customer or the supplier, whichever the document type makes it. */
  counterparty: zod.z.string().nullable(),
  category: zod.z.string().nullable()
});
var importPreviewSchema = zod.z.object({
  /** Only the first few. The count of what would go in is `rowsReady`. */
  rows: zod.z.array(previewRowSchema),
  rowsReady: zod.z.number().int().nonnegative(),
  rowsSkipped: zod.z.number().int().nonnegative(),
  /** Of the skipped ones, how many were skipped for being repeats. */
  duplicates: zod.z.number().int().nonnegative(),
  /** How the file was read, e.g. `DD/MM/YYYY` and `1.234,56`. */
  formats: zod.z.object({ date: zod.z.string(), amount: zod.z.string() })
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
  /** 0–100. An estimate; the UI shows a bar, not a promise of time. */
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
  /** Row number in the original file, just as the user sees it in Excel. */
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
  /** Commercial enrichment (M8). Null until someone fills it in. */
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
  /** Shallow hierarchy: a category can have a parent, the parent has no grandparent. */
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
  /** Search by description, customer, supplier or invoice number. */
  search: zod.z.string().max(200).optional(),
  minAmountCents: zod.z.coerce.number().int().optional(),
  maxAmountCents: zod.z.coerce.number().int().optional(),
  sortBy: zod.z.enum(["date", "amount", "description"]).default("date"),
  sortDir: zod.z.enum(["asc", "desc"]).default("desc"),
  /**
   * Jump to a numbered page. Coexists with the cursor, which remains the default
   * path: a cursor says where to continue, not where page 7 is — and the
   * explorer is where someone looks for a transaction from March. The ceiling of
   * 200 keeps the cost of the jump in milliseconds; beyond it, you filter.
   */
  page: zod.z.coerce.number().int().min(1).max(200).optional()
});
var breakdownItemSchema = zod.z.object({
  id: idSchema.nullable(),
  label: zod.z.string(),
  amount: moneySchema,
  /** Weight in the period total, 0–100. */
  sharePercent: zod.z.number(),
  /** Variation against the previous period; null when there was no base. */
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
  /**
   * The optimistic locking version, and it travels on the read on purpose.
   *
   * The write routes require the version that was read — without it in the
   * response, an honest client can only guess: it sends zero, works on the first
   * lead and fails on every one that has already been touched. A lock the
   * consumer cannot satisfy is not security, it is a broken feature.
   */
  version: zod.z.number().int().nonnegative(),
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
  /** 0–100. Multiplied by the value it gives the forecast's weighted pipeline (§40). */
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
  message: "an opportunity must belong to a customer or to a lead",
  path: ["customerId"]
});
var leadFilterSchema = paginationQuerySchema.extend({
  status: leadStatusSchema.optional(),
  ownerId: idSchema.optional(),
  search: zod.z.string().max(200).optional()
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
var metricIdSchema = zod.z.enum(METRIC_IDS);
var METRIC_UNITS = [
  "MONEY",
  "PERCENT",
  "MONTHS",
  "RATIO",
  "COUNT",
  /*
   * Physical units, added by the inventory module (§107, T38).
   *
   * `QUANTITY` is things — units sold, units in stock. It differs from `COUNT`
   * on purpose: a count is how many rows, a quantity is how many items, and a
   * file with one line for two hundred screws means one of each.
   *
   * `DAYS` is duration at the resolution stock is measured in. `MONTHS` is the
   * wrong grain for it — "48 days of inventory" is a decision and "1.6 months"
   * is a shrug.
   */
  "QUANTITY",
  "DAYS"
];
var metricUnitSchema = zod.z.enum(METRIC_UNITS);
var metricNodeSpecSchema = zod.z.object({
  id: metricIdSchema,
  unit: metricUnitSchema,
  dependsOn: zod.z.array(metricIdSchema),
  /** True when the node aggregates transactions instead of deriving from other nodes. */
  isLeaf: zod.z.boolean(),
  /** Readable formula, e.g. `GROSS_PROFIT - OPEX`. Shown in the evidence panel. */
  formula: zod.z.string().nullable()
});
var metricValueSchema = zod.z.object({
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
  value: zod.z.number().nullable(),
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
  datasetVersion: zod.z.number().int()
});
var varianceContributionSchema = zod.z.object({
  label: zod.z.string(),
  /** Present when the branch is a metric; absent when it is a dimension. */
  metricId: metricIdSchema.nullable(),
  /** Present when the branch is a customer, category or supplier. */
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
  /** Omitted uses the immediately previous period. */
  comparePeriod: periodSchema.optional(),
  metrics: zod.z.array(metricIdSchema).optional()
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
var overviewSectionSchema = zod.z.enum(OVERVIEW_SECTIONS);
var overviewShapeSchema = zod.z.object({
  metrics: zod.z.array(metricIdSchema),
  sections: zod.z.array(overviewSectionSchema),
  reasons: zod.z.array(zod.z.string())
});
var dashboardSummarySchema = zod.z.object({
  period: periodSchema,
  comparePeriod: periodSchema,
  currency: currencySchema,
  datasetVersion: zod.z.number().int(),
  metrics: zod.z.array(metricValueSchema),
  /** Optional so a response without a composed shape stays valid: the panel then uses the fixed order. */
  shape: overviewShapeSchema.optional()
});
var archetypeSchema = zod.z.enum([
  "RECURRING",
  "PROJECT",
  "RETAIL",
  "INDUSTRY",
  "UNDETERMINED"
]);
var profileSignalIdSchema = zod.z.enum([
  "recurrence",
  "churn",
  "concentration",
  "customerCount",
  "ticketSpread",
  "costStructure",
  "dso",
  "seasonality"
]);
var profileSignalSchema = zod.z.object({
  id: profileSignalIdSchema,
  /** `null` when the data cannot answer. Never zero standing in for unknown. */
  value: zod.z.number().nullable(),
  /** The numbers this was measured from, so the claim can be checked. */
  detail: zod.z.record(zod.z.string(), zod.z.number())
});
var businessProfileSchema = zod.z.object({
  archetype: archetypeSchema,
  /** Every signal, including the ones that came back `null`. */
  signals: zod.z.array(profileSignalSchema),
  /** The signals that carried the decision. Empty when nothing was declared. */
  because: zod.z.array(profileSignalIdSchema),
  undeterminedReason: zod.z.enum(["NOT_ENOUGH_HISTORY", "NO_CUSTOMERS", "TOO_CLOSE_TO_CALL"]).nullable(),
  period: periodSchema,
  datasetVersion: zod.z.number().int()
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
var canvasBlockIdSchema = zod.z.enum(CANVAS_BLOCKS);
var canvasEvidenceSchema = zod.z.object({
  label: zod.z.string(),
  /** Cents when the block is about money, a plain number otherwise. */
  value: zod.z.number(),
  /** Share of the block's total, 0–100. `null` when a share means nothing here. */
  share: zod.z.number().nullable()
});
var canvasBlockSchema = zod.z.discriminatedUnion("kind", [
  zod.z.object({
    kind: zod.z.literal("DERIVED"),
    id: canvasBlockIdSchema,
    /** The signal that supports it. Empty when the data has nothing to say yet. */
    evidence: zod.z.array(canvasEvidenceSchema),
    /** `MONEY` when the values are cents, `COUNT` when they are things. */
    unit: zod.z.enum(["MONEY", "COUNT", "PERCENT"])
  }),
  zod.z.object({
    kind: zod.z.literal("DECLARED"),
    id: canvasBlockIdSchema,
    /** `null` means nobody has written it. Never a placeholder sentence. */
    content: zod.z.string().nullable(),
    authorName: zod.z.string().nullable(),
    updatedAt: isoDateTimeSchema.nullable()
  })
]);
var businessCanvasSchema = zod.z.object({
  blocks: zod.z.array(canvasBlockSchema),
  period: periodSchema,
  currency: currencySchema,
  datasetVersion: zod.z.number().int()
});
var declareCanvasBlockSchema = zod.z.object({
  block: zod.z.enum(["valueProposition", "keyActivities", "keyResources", "customerRelationships", "channels"]),
  /**
   * Bounded, and deliberately short.
   *
   * A canvas block is a sentence, not a document. Six hundred characters is
   * about a paragraph — enough to say what the business does and too little to
   * turn the box into a place where strategy goes to be forgotten.
   */
  content: zod.z.string().trim().min(1).max(600)
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
  /** Files that contributed, for the user to recognize the origin. */
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
  type: insightTypeSchema,
  severity: severitySchema,
  period: periodSchema,
  /** E.g.: `insights.REVENUE_DECLINE.title`. Resolved against `messages/`. */
  titleKey: zod.z.string(),
  /**
   * The same statement has different wordings depending on what is known — with
   * or without the customers that explain the drop, with or without the
   * comparison against the portfolio. It is the detector that chooses, because
   * it is the one that knows what it found.
   */
  descriptionKey: zod.z.string(),
  /**
   * Values for ICU. A list of names travels as an **array**, never as an
   * already-joined string: the list separator changes with the language, and
   * joining it on the server would be writing Portuguese. What joins it is
   * `Intl.ListFormat`.
   */
  params: zod.z.record(zod.z.string(), zod.z.union([zod.z.string(), zod.z.number(), zod.z.array(zod.z.string())])),
  metricId: metricIdSchema.nullable(),
  /**
   * The entity the statement refers to — the customer that dropped, the line
   * item that blew up. Together with `metricId` and `period`, it is the address
   * of the proof **and** the destination of the click: the two have to be the
   * same thing, otherwise the panel shows different rows from the ones the click
   * opens.
   */
  entityId: idSchema.nullable(),
  dimension: zod.z.enum(["customer", "supplier", "category", "product"]).nullable(),
  /** Numbers that support the statement, for the UI to show without recalculating. */
  supportingData: zod.z.record(zod.z.string(), zod.z.number()),
  evidence: evidenceSchema.nullable(),
  /** Dismissed by the user: does not appear again for the same period. */
  dismissedAt: isoDateTimeSchema.nullable(),
  datasetVersion: zod.z.number().int(),
  createdAt: isoDateTimeSchema
});
var insightsResponseSchema = zod.z.object({
  period: periodSchema,
  currency: zod.z.string().length(3),
  datasetVersion: zod.z.number().int(),
  insights: zod.z.array(insightSchema)
});
var recommendationSchema = zod.z.object({
  id: idSchema,
  insightId: idSchema.nullable(),
  title: zod.z.string(),
  rationale: zod.z.string(),
  /** Always `RECOMMENDATION`, so the UI never shows it as a fact. */
  kind: zod.z.literal("RECOMMENDATION"),
  createdAt: isoDateTimeSchema
});
var changeItemSchema = zod.z.object({
  metricId: metricIdSchema,
  unit: zod.z.string(),
  /** The value in the period, so the UI does not request the summary again. */
  current: zod.z.number(),
  changeAbsolute: zod.z.number(),
  /**
   * `null` for margins, and for whatever has no comparison base.
   *
   * A margin varies in **percentage points**, not in percentage: from 40% to 42%
   * is +2pp, and saying "+5%" is true about the ratio and misleading about the
   * business. The two fields exist separately so the UI does not have to guess
   * which is the right one — whichever is filled in is what is shown.
   */
  changePercent: zod.z.number().nullable(),
  changePoints: zod.z.number().nullable(),
  direction: zod.z.enum(["up", "down"]),
  /** Whether going up is good or bad depends on the metric: expenses rising is no win. */
  sentiment: zod.z.enum(["positive", "negative"])
});
var whatChangedResponseSchema = zod.z.object({
  period: periodSchema,
  currency: zod.z.string().length(3),
  changes: zod.z.array(changeItemSchema)
});
var insightFilterSchema = zod.z.object({
  period: periodSchema.optional(),
  type: insightTypeSchema.optional(),
  severity: severitySchema.optional(),
  /**
   * `z.coerce.boolean()` is forbidden here, and it is not a preference: Zod's
   * coercion is `Boolean(value)`, and any non-empty string is true —
   * `?includeDismissed=false` would arrive as `true`. A trap already paid for
   * once in this project.
   */
  includeDismissed: zod.z.enum(["true", "false"]).default("false").transform((valor) => valor === "true")
});
var evidenceIdSchema = zod.z.union([
  idSchema,
  zod.z.string().regex(/^doc:[0-9a-fA-F-]{36}(:\d{1,7})?$/)
]);
var keyPointSchema = zod.z.object({
  type: aiResponseTypeSchema,
  text: zod.z.string(),
  /** Present in FACT and CALCULATION. Absent is a sign of an unsupported statement. */
  evidenceId: evidenceIdSchema.nullable()
});
var assumptionSchema = zod.z.object({
  label: zod.z.string(),
  value: zod.z.string(),
  /** True when it was the model assuming, not the user declaring. */
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
   * True when the data was not enough to answer.
   *
   * §21 requires saying so instead of filling the void with something plausible
   * — and admitting a lack of data is the behaviour that sustains trust in the
   * long run.
   */
  insufficientData: zod.z.boolean()
});
var aiMessageSchema = zod.z.object({
  id: idSchema,
  conversationId: idSchema,
  role: zod.z.enum(["USER", "ASSISTANT"]),
  content: zod.z.string(),
  answer: aiAnswerSchema.nullable(),
  /** Stored with the answer so the report is reproducible (§46, §47). */
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
  /** Cents. An estimate — the true value is the one on the provider's invoice. */
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
  /** False when the endpoint leaves the configured machine or region. */
  dataStaysLocal: zod.z.boolean(),
  retentionPolicy: aiRetentionPolicySchema,
  isBYOK: zod.z.boolean(),
  /** Where the request is processed, as far as is known from the endpoint. */
  processingRegion: zod.z.string().nullable()
});
var scenarioInputSchema = zod.z.object({
  type: scenarioTypeSchema,
  name: zod.z.string().min(1).max(160),
  basePeriod: periodSchema,
  /** Months to project from the base period. */
  horizonMonths: zod.z.number().int().min(1).max(36).default(12),
  /**
   * Parameters of the change, according to the type:
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
  /** Written by the AI from the already calculated impacts (M7). */
  explanation: zod.z.string().nullable(),
  datasetVersion: zod.z.number().int(),
  createdAt: isoDateTimeSchema
});
var actualPointSchema = zod.z.object({
  period: periodSchema,
  revenue: zod.z.number().int(),
  expenses: zod.z.number().int(),
  grossProfit: zod.z.number().int(),
  cash: zod.z.number().int().nullable()
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
  /** The months the trend was fitted to, oldest first. Never empty. */
  history: zod.z.array(actualPointSchema),
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
  /** Markdown. By template in M6, written by the AI from M7 onwards. */
  body: zod.z.string(),
  /** True when the text came out of a model — the PDF marks it. */
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
  /** Without AI it generates the sections by template — the M6 behaviour. */
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
  /** Cents of AI consumption included per month. */
  aiMonthlyAllowanceCents: zod.z.number().int().nonnegative().nullable(),
  /** Lets it carry on above the limit and charges the overage. */
  allowAIOverage: zod.z.boolean(),
  // Sovereignty features — what legitimately scales by price
  canUseBYOK: zod.z.boolean(),
  canUseLocalAI: zod.z.boolean(),
  canChooseDataRegion: zod.z.boolean(),
  canUseSSO: zod.z.boolean(),
  canExportAuditLog: zod.z.boolean(),
  canWhiteLabel: zod.z.boolean(),
  auditLogRetentionMonths: zod.z.number().int().positive().nullable(),
  /**
   * The modules this tier switches on, beyond the core engine (§107, T37, D9).
   *
   * ## The core engine is not in here, and that is the decision
   *
   * Import, metrics, alerts, the report, scenarios and the forecast are every
   * tier's, including the cheapest. They cost near nothing per customer — it is
   * arithmetic over rows already in the database — and charging for them prices
   * out the company this product exists for, which is the small one that has
   * nothing today.
   *
   * What is metered is the AI, because that is the only part with a real
   * invoice per use, and bringing your own key removes the meter.
   *
   * ## Why a list of names and not a plugin
   *
   * A module is a set of **target metrics**; the active graph of an
   * organization is `requiredFor` of those targets. Third-party code inside the
   * engine would end the claim that the AI interprets and never calculates.
   * This is a row in a table.
   */
  modules: zod.z.array(zod.z.enum(["COMMERCIAL"])).default([])
});
var planSchema = zod.z.object({
  tier: planTierSchema,
  name: zod.z.string(),
  /** Cents per month. Configurable — §80 requires the price not be hard-coded. */
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
exports.CANVAS_BLOCKS = CANVAS_BLOCKS;
exports.COLUMN_MATCHES = COLUMN_MATCHES;
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
exports.OVERVIEW_SECTIONS = OVERVIEW_SECTIONS;
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
exports.actualPointSchema = actualPointSchema;
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
exports.archetypeSchema = archetypeSchema;
exports.askInputSchema = askInputSchema;
exports.assumptionSchema = assumptionSchema;
exports.auditActionSchema = auditActionSchema;
exports.auditEventSchema = auditEventSchema;
exports.authResponseSchema = authResponseSchema;
exports.brandingConfigSchema = brandingConfigSchema;
exports.breakdownItemSchema = breakdownItemSchema;
exports.budgetSchema = budgetSchema;
exports.businessCanvasSchema = businessCanvasSchema;
exports.businessProfileSchema = businessProfileSchema;
exports.calculationSchema = calculationSchema;
exports.canvasBlockIdSchema = canvasBlockIdSchema;
exports.canvasBlockSchema = canvasBlockSchema;
exports.canvasEvidenceSchema = canvasEvidenceSchema;
exports.categorySchema = categorySchema;
exports.changeItemSchema = changeItemSchema;
exports.checkoutSessionSchema = checkoutSessionSchema;
exports.columnMappingSchema = columnMappingSchema;
exports.columnMatchSchema = columnMatchSchema;
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
exports.declareCanvasBlockSchema = declareCanvasBlockSchema;
exports.deltaSchema = deltaSchema;
exports.discoveredEntitySchema = discoveredEntitySchema;
exports.discoveredFieldSchema = discoveredFieldSchema;
exports.discoveredSchemaSchema = discoveredSchemaSchema;
exports.emailSchema = emailSchema;
exports.evidenceIdSchema = evidenceIdSchema;
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
exports.importPreviewSchema = importPreviewSchema;
exports.importProgressSchema = importProgressSchema;
exports.importSchema = importSchema;
exports.importStateSchema = importStateSchema;
exports.importTriggerSchema = importTriggerSchema;
exports.insightFilterSchema = insightFilterSchema;
exports.insightSchema = insightSchema;
exports.insightTypeSchema = insightTypeSchema;
exports.insightsResponseSchema = insightsResponseSchema;
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
exports.overviewSectionSchema = overviewSectionSchema;
exports.overviewShapeSchema = overviewShapeSchema;
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
exports.previewRowSchema = previewRowSchema;
exports.profileSignalIdSchema = profileSignalIdSchema;
exports.profileSignalSchema = profileSignalSchema;
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
exports.whatChangedResponseSchema = whatChangedResponseSchema;
