import { z } from 'zod'

/**
 * Enums shared between the API and the frontend.
 *
 * Each one exists as a `const` array (to iterate in the UI and feed Prisma) and
 * as a Zod schema (to validate at the boundary). The type comes out of Zod,
 * never written by hand — that way there is no chance of the type and the
 * validation diverging.
 */

// ---------------------------------------------------------------------------
// Identity and access
// ---------------------------------------------------------------------------

export const ROLES = [
  'OWNER',
  'ADMIN',
  'CFO',
  'FINANCE_MANAGER',
  'ANALYST',
  'VIEWER',
  'AUDITOR',
] as const
export const roleSchema = z.enum(ROLES)
export type Role = z.infer<typeof roleSchema>

export const PERMISSIONS = [
  'upload_data',
  'delete_data',
  'view_financials',
  'ask_ai',
  'run_scenarios',
  'export_reports',
  'manage_billing',
  'manage_ai',
  'manage_users',
  'view_audit_logs',
  'view_crm',
  'manage_crm',
] as const
export const permissionSchema = z.enum(PERMISSIONS)
export type Permission = z.infer<typeof permissionSchema>

/**
 * Permissions per role.
 *
 * Lives in the contracts, and not only in the backend, because the frontend
 * needs to hide what the user cannot do. The backend is still the one that
 * decides: this is UI convenience, never authorization (§71 — authorization is
 * always on the server).
 */
export const ROLE_PERMISSIONS: Readonly<Record<Role, readonly Permission[]>> = {
  OWNER: [...PERMISSIONS],
  ADMIN: [
    'upload_data',
    'delete_data',
    'view_financials',
    'ask_ai',
    'run_scenarios',
    'export_reports',
    'manage_ai',
    'manage_users',
    'view_audit_logs',
    'view_crm',
    'manage_crm',
  ],
  CFO: [
    'upload_data',
    'view_financials',
    'ask_ai',
    'run_scenarios',
    'export_reports',
    'view_audit_logs',
    'view_crm',
    'manage_crm',
  ],
  FINANCE_MANAGER: [
    'upload_data',
    'view_financials',
    'ask_ai',
    'run_scenarios',
    'export_reports',
    'view_crm',
  ],
  ANALYST: ['view_financials', 'ask_ai', 'run_scenarios', 'export_reports', 'view_crm'],
  VIEWER: ['view_financials', 'view_crm'],
  // The auditor sees everything that is historical and changes nothing — does
  // not even ask the AI, because a generated answer is not auditable evidence.
  AUDITOR: ['view_financials', 'view_audit_logs', 'export_reports'],
} as const

// ---------------------------------------------------------------------------
// Ingestion
// ---------------------------------------------------------------------------

export const DATA_SOURCE_KINDS = [
  'FILE_UPLOAD',
  // Declared now, implemented when there is demand (§98, §107).
  // Being in the enum is what guarantees the architecture accommodates them
  // without a migration.
  'XERO',
  'QUICKBOOKS',
  'SAGE',
  'PRIMAVERA',
  'PHC',
  'OMIE',
  'CONTA_AZUL',
  'SAP',
  'ORACLE',
  'NETSUITE',
  'STRIPE',
  'SHOPIFY',
  'HUBSPOT',
  'SALESFORCE',
  'OPEN_BANKING',
] as const
export const dataSourceKindSchema = z.enum(DATA_SOURCE_KINDS)
export type DataSourceKind = z.infer<typeof dataSourceKindSchema>

export const CONNECTOR_CAPABILITIES = [
  'OAUTH',
  'INCREMENTAL_SYNC',
  'WEBHOOK',
  'BACKFILL',
] as const
export const connectorCapabilitySchema = z.enum(CONNECTOR_CAPABILITIES)
export type ConnectorCapability = z.infer<typeof connectorCapabilitySchema>

export const IMPORT_STATES = [
  'UPLOADED',
  'PROCESSING',
  'MAPPING_REQUIRED',
  'NORMALIZING',
  'VALIDATING',
  'COMPLETED',
  'FAILED',
] as const
export const importStateSchema = z.enum(IMPORT_STATES)
export type ImportState = z.infer<typeof importStateSchema>

export const IMPORT_TRIGGERS = ['MANUAL_UPLOAD', 'SCHEDULED_SYNC', 'WEBHOOK'] as const
export const importTriggerSchema = z.enum(IMPORT_TRIGGERS)
export type ImportTrigger = z.infer<typeof importTriggerSchema>

export const DATA_QUALITY_ISSUE_TYPES = [
  'MISSING_CATEGORY',
  'MISSING_CUSTOMER',
  'DUPLICATE_TRANSACTION',
  'INVALID_DATE',
  'INVALID_AMOUNT',
  'INCONSISTENT_CURRENCY',
  'UNMAPPED_COLUMN',
  'SUSPECTED_PAYROLL',
] as const
export const dataQualityIssueTypeSchema = z.enum(DATA_QUALITY_ISSUE_TYPES)
export type DataQualityIssueType = z.infer<typeof dataQualityIssueTypeSchema>

// ---------------------------------------------------------------------------
// Financial
// ---------------------------------------------------------------------------

export const TRANSACTION_TYPES = ['REVENUE', 'EXPENSE', 'BANK'] as const
export const transactionTypeSchema = z.enum(TRANSACTION_TYPES)
export type TransactionType = z.infer<typeof transactionTypeSchema>

export const PERIOD_GRANULARITIES = ['MONTH', 'QUARTER', 'YEAR'] as const
export const periodGranularitySchema = z.enum(PERIOD_GRANULARITIES)
export type PeriodGranularity = z.infer<typeof periodGranularitySchema>

// ---------------------------------------------------------------------------
// Insights
// ---------------------------------------------------------------------------

export const INSIGHT_TYPES = [
  'REVENUE_DECLINE',
  'EXPENSE_SPIKE',
  'MARGIN_DETERIORATION',
  'CUSTOMER_DECLINE',
  'CUSTOMER_CONCENTRATION',
  'BUDGET_OVERRUN',
  'CASH_RISK',
] as const
export const insightTypeSchema = z.enum(INSIGHT_TYPES)
export type InsightType = z.infer<typeof insightTypeSchema>

export const SEVERITIES = ['INFO', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL'] as const
export const severitySchema = z.enum(SEVERITIES)
export type Severity = z.infer<typeof severitySchema>

// ---------------------------------------------------------------------------
// AI
// ---------------------------------------------------------------------------

export const AI_PROVIDER_KINDS = [
  'mock',
  // A single adapter serves everything that speaks the OpenAI protocol: OpenAI,
  // Ollama, vLLM, LM Studio, Groq, OpenRouter, DeepSeek, Mistral, xAI and the
  // client's own AI gateway (§13).
  'openai-compatible',
  // Native adapters, to take advantage of their own tool calling, structured
  // output and caching (M7).
  'gemini',
  'anthropic',
] as const
export const aiProviderKindSchema = z.enum(AI_PROVIDER_KINDS)
export type AIProviderKind = z.infer<typeof aiProviderKindSchema>

/**
 * Tasks with independent routing (§16).
 *
 * Each one resolves its own provider and model, so as to give fast analysis on a
 * cheap model and heavy reasoning on an expensive one without switching supplier
 * by hand. Silently switching to an unauthorized provider is forbidden by §16.
 */
export const AI_TASKS = [
  'FAST_ANALYSIS',
  'COMPLEX_REASONING',
  'DOCUMENT_EXTRACTION',
  'EMBEDDINGS',
  'EXECUTIVE_SUMMARY',
] as const
export const aiTaskSchema = z.enum(AI_TASKS)
export type AITask = z.infer<typeof aiTaskSchema>

/**
 * Type of statement in an AI answer (§20).
 *
 * Separating fact from inference is not cosmetic: it is what lets the user know
 * what can be taken to a meeting and what has to be confirmed first.
 */
export const AI_RESPONSE_TYPES = ['FACT', 'CALCULATION', 'INFERENCE', 'RECOMMENDATION'] as const
export const aiResponseTypeSchema = z.enum(AI_RESPONSE_TYPES)
export type AIResponseType = z.infer<typeof aiResponseTypeSchema>

/**
 * Retention policy of the configured AI endpoint.
 *
 * Exists because some providers train on API data depending on the tier, and a
 * badly chosen key puts a client's financial data into a training corpus — which
 * cannot be undone. The UI flags it before use, not after.
 */
export const AI_RETENTION_POLICIES = [
  'ZERO_RETENTION',
  'RETAINED_NO_TRAINING',
  'TRAINS_ON_DATA',
  'UNKNOWN',
] as const
export const aiRetentionPolicySchema = z.enum(AI_RETENTION_POLICIES)
export type AIRetentionPolicy = z.infer<typeof aiRetentionPolicySchema>

// ---------------------------------------------------------------------------
// Commercial (CRM)
// ---------------------------------------------------------------------------

export const CUSTOMER_STATUSES = ['PROSPECT', 'ACTIVE', 'AT_RISK', 'CHURNED'] as const
export const customerStatusSchema = z.enum(CUSTOMER_STATUSES)
export type CustomerStatus = z.infer<typeof customerStatusSchema>

export const LEAD_STATUSES = [
  'NEW',
  'CONTACTED',
  'QUALIFIED',
  'DISQUALIFIED',
  'CONVERTED',
] as const
export const leadStatusSchema = z.enum(LEAD_STATUSES)
export type LeadStatus = z.infer<typeof leadStatusSchema>

export const OPPORTUNITY_STAGES = [
  'DISCOVERY',
  'PROPOSAL',
  'NEGOTIATION',
  'WON',
  'LOST',
] as const
export const opportunityStageSchema = z.enum(OPPORTUNITY_STAGES)
export type OpportunityStage = z.infer<typeof opportunityStageSchema>

export const ACTIVITY_TYPES = ['NOTE', 'CALL', 'EMAIL', 'MEETING', 'TASK'] as const
export const activityTypeSchema = z.enum(ACTIVITY_TYPES)
export type ActivityType = z.infer<typeof activityTypeSchema>

// ---------------------------------------------------------------------------
// Scenarios and reports
// ---------------------------------------------------------------------------

export const SCENARIO_TYPES = [
  'REVENUE_CHANGE',
  'EXPENSE_CHANGE',
  'HIRING',
  'CUSTOMER_LOSS',
  'PRICE_CHANGE',
] as const
export const scenarioTypeSchema = z.enum(SCENARIO_TYPES)
export type ScenarioType = z.infer<typeof scenarioTypeSchema>

export const FORECAST_SCENARIOS = ['BASE', 'UPSIDE', 'DOWNSIDE'] as const
export const forecastScenarioSchema = z.enum(FORECAST_SCENARIOS)
export type ForecastScenario = z.infer<typeof forecastScenarioSchema>

export const EXPORT_FORMATS = ['CSV', 'XLSX', 'PDF'] as const
export const exportFormatSchema = z.enum(EXPORT_FORMATS)
export type ExportFormat = z.infer<typeof exportFormatSchema>

// ---------------------------------------------------------------------------
// Billing
// ---------------------------------------------------------------------------

export const PLAN_TIERS = ['STARTER', 'GROWTH', 'BUSINESS', 'ENTERPRISE'] as const
export const planTierSchema = z.enum(PLAN_TIERS)
export type PlanTier = z.infer<typeof planTierSchema>

export const SUBSCRIPTION_STATUSES = [
  'TRIALING',
  'ACTIVE',
  'PAST_DUE',
  'CANCELED',
  'INCOMPLETE',
] as const
export const subscriptionStatusSchema = z.enum(SUBSCRIPTION_STATUSES)
export type SubscriptionStatus = z.infer<typeof subscriptionStatusSchema>

export const PAYMENT_PROVIDERS = ['mock', 'stripe', 'openpix'] as const
export const paymentProviderSchema = z.enum(PAYMENT_PROVIDERS)
export type PaymentProviderKind = z.infer<typeof paymentProviderSchema>

// ---------------------------------------------------------------------------
// Localization
// ---------------------------------------------------------------------------

/**
 * Portuguese is two locales, not one.
 *
 * The financial vocabulary genuinely diverges between Portugal and Brazil —
 * `facturação`/`faturamento`, `IVA`/`ICMS`, `tesouraria`/`caixa` — and serving both
 * with a single translation sounds foreign on both sides.
 */
export const LOCALES = ['pt-PT', 'pt-BR', 'es', 'en'] as const
export const localeSchema = z.enum(LOCALES)
export type Locale = z.infer<typeof localeSchema>

export const DEFAULT_LOCALE: Locale = 'en'

// ---------------------------------------------------------------------------
// Data classification
// ---------------------------------------------------------------------------

/**
 * Sensitivity of the data, enforced in code and not only in a document
 * (`docs/SEGURANCA_E_PRIVACIDADE.md`).
 *
 * Feeds the logger's redaction list, the decision to encrypt at rest and what
 * may reach an AI provider.
 *
 *   S3  keys and credentials       never in a log, never to the frontend, never to the AI
 *   S2  files, rows, payroll       encrypted, redacted, to the AI only via a tool
 *   S1  metrics and names          tenant-scoped, values kept out of the log
 *   S0  counts and latencies       may feed telemetry
 */
export const DATA_CLASSES = ['S0', 'S1', 'S2', 'S3'] as const
export const dataClassSchema = z.enum(DATA_CLASSES)
export type DataClass = z.infer<typeof dataClassSchema>

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

export const AUDIT_ACTIONS = [
  'USER_LOGIN',
  'USER_LOGOUT',
  'USER_INVITED',
  'USER_ROLE_CHANGED',
  'DATA_UPLOADED',
  'DATA_DELETED',
  'MAPPING_CHANGED',
  'DATA_CORRECTED',
  'AI_REQUESTED',
  'REPORT_GENERATED',
  'DATA_EXPORTED',
  'SCENARIO_RUN',
  'BILLING_CHANGED',
  'AI_PROVIDER_CONFIGURED',
  'ORGANIZATION_SETTINGS_CHANGED',
] as const
export const auditActionSchema = z.enum(AUDIT_ACTIONS)
export type AuditAction = z.infer<typeof auditActionSchema>
