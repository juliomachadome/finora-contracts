import { z } from 'zod'

/**
 * Enums partilhados entre a API e o frontend.
 *
 * Cada um existe como array `const` (para iterar na UI e alimentar o Prisma) e
 * como schema Zod (para validar na fronteira). O tipo sai do Zod, nunca escrito
 * à mão — assim não há hipótese de o tipo e a validação divergirem.
 */

// ---------------------------------------------------------------------------
// Identidade e acesso
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
 * Permissões por papel.
 *
 * Vive nos contratos, e não só no backend, porque o frontend precisa de esconder
 * o que o utilizador não pode fazer. O backend continua a ser quem decide: isto
 * é conveniência de UI, nunca autorização (§71 — autorização é sempre no
 * servidor).
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
  // O auditor vê tudo o que é histórico e não altera nada — nem sequer pergunta
  // à IA, porque uma resposta gerada não é evidência auditável.
  AUDITOR: ['view_financials', 'view_audit_logs', 'export_reports'],
} as const

// ---------------------------------------------------------------------------
// Ingestão
// ---------------------------------------------------------------------------

export const DATA_SOURCE_KINDS = [
  'FILE_UPLOAD',
  // Declarados agora, implementados quando houver procura (§98, §107).
  // Estar no enum é o que garante que a arquitectura os acomoda sem migração.
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
// Financeiro
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
// IA
// ---------------------------------------------------------------------------

export const AI_PROVIDER_KINDS = [
  'mock',
  // Um único adapter serve tudo o que fala o protocolo OpenAI: OpenAI, Ollama,
  // vLLM, LM Studio, Groq, OpenRouter, DeepSeek, Mistral, xAI e o gateway de IA
  // do cliente (§13).
  'openai-compatible',
  // Adapters nativos, para aproveitar tool calling, structured output e caching
  // próprios (M7).
  'gemini',
  'anthropic',
] as const
export const aiProviderKindSchema = z.enum(AI_PROVIDER_KINDS)
export type AIProviderKind = z.infer<typeof aiProviderKindSchema>

/**
 * Tarefas com routing independente (§16).
 *
 * Cada uma resolve o seu provider e modelo, para dar análise rápida num modelo
 * barato e raciocínio pesado num caro sem trocar de fornecedor à mão. Trocar
 * silenciosamente para um provider não autorizado é proibido pelo §16.
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
 * Tipo de afirmação numa resposta de IA (§20).
 *
 * Separar facto de inferência não é cosmético: é o que permite ao utilizador
 * saber o que pode levar a uma reunião e o que tem de confirmar primeiro.
 */
export const AI_RESPONSE_TYPES = ['FACT', 'CALCULATION', 'INFERENCE', 'RECOMMENDATION'] as const
export const aiResponseTypeSchema = z.enum(AI_RESPONSE_TYPES)
export type AIResponseType = z.infer<typeof aiResponseTypeSchema>

/**
 * Política de retenção do endpoint de IA configurado.
 *
 * Existe porque alguns providers treinam com dados da API consoante o tier, e
 * uma chave mal escolhida põe dados financeiros de cliente num corpus de treino
 * — o que não se desfaz. A UI sinaliza antes do uso, não depois.
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
// Comercial (CRM)
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
// Cenários e relatórios
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
// Faturação
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
// Localização
// ---------------------------------------------------------------------------

/**
 * Português são dois locales, não um.
 *
 * O vocabulário financeiro diverge a sério entre Portugal e Brasil —
 * facturação/faturamento, IVA/ICMS, tesouraria/caixa — e servir os dois
 * mercados com uma tradução só soa a estrangeiro nos dois lados.
 */
export const LOCALES = ['pt-PT', 'pt-BR', 'es', 'en'] as const
export const localeSchema = z.enum(LOCALES)
export type Locale = z.infer<typeof localeSchema>

export const DEFAULT_LOCALE: Locale = 'en'

// ---------------------------------------------------------------------------
// Classificação de dados
// ---------------------------------------------------------------------------

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
export const DATA_CLASSES = ['S0', 'S1', 'S2', 'S3'] as const
export const dataClassSchema = z.enum(DATA_CLASSES)
export type DataClass = z.infer<typeof dataClassSchema>

// ---------------------------------------------------------------------------
// Auditoria
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
