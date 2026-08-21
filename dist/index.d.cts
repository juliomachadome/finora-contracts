import { z } from 'zod';

/**
 * Enums shared between the API and the frontend.
 *
 * Each one exists as a `const` array (to iterate in the UI and feed Prisma) and
 * as a Zod schema (to validate at the boundary). The type comes out of Zod,
 * never written by hand — that way there is no chance of the type and the
 * validation diverging.
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
 * Permissions per role.
 *
 * Lives in the contracts, and not only in the backend, because the frontend
 * needs to hide what the user cannot do. The backend is still the one that
 * decides: this is UI convenience, never authorization (§71 — authorization is
 * always on the server).
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
 * Tasks with independent routing (§16).
 *
 * Each one resolves its own provider and model, so as to give fast analysis on a
 * cheap model and heavy reasoning on an expensive one without switching supplier
 * by hand. Silently switching to an unauthorized provider is forbidden by §16.
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
 * Type of statement in an AI answer (§20).
 *
 * Separating fact from inference is not cosmetic: it is what lets the user know
 * what can be taken to a meeting and what has to be confirmed first.
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
 * Retention policy of the configured AI endpoint.
 *
 * Exists because some providers train on API data depending on the tier, and a
 * badly chosen key puts a client's financial data into a training corpus — which
 * cannot be undone. The UI flags it before use, not after.
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
/**
 * The tiers, cheapest first (§81, T36, D9).
 *
 * `SOLO` exists because **the person who most needs this product is the one who
 * has no CFO**, and the plan structure was not designed with them in mind. It
 * is free, and it can be: the deterministic engine costs no tokens, so the
 * marginal cost of a small customer is storage and queries.
 *
 * What makes it viable is BYOK, which was built for large enterprises and is
 * really a **pricing mechanism**: bring your own key and the AI bill is yours,
 * so the tier below it does not need to carry one.
 */
declare const PLAN_TIERS: readonly ["SOLO", "STARTER", "GROWTH", "BUSINESS", "ENTERPRISE"];
declare const planTierSchema: z.ZodEnum<{
    SOLO: "SOLO";
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
 * Portuguese is two locales, not one.
 *
 * The financial vocabulary genuinely diverges between Portugal and Brazil —
 * `facturação`/`faturamento`, `IVA`/`ICMS`, `tesouraria`/`caixa` — and serving both
 * with a single translation sounds foreign on both sides.
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
 * Primitives shared across the whole API.
 */
declare const idSchema: z.ZodString;
type Id = z.infer<typeof idSchema>;
/** ISO-8601. Serialized as a string because JSON has no date type. */
declare const isoDateTimeSchema: z.ZodISODateTime;
type IsoDateTime = z.infer<typeof isoDateTimeSchema>;
/** Day without a time, `YYYY-MM-DD`. Transactions have a date, not an instant. */
declare const isoDateSchema: z.ZodISODate;
type IsoDate = z.infer<typeof isoDateSchema>;
/** Monthly period `YYYY-MM`. The natural unit of financial reporting. */
declare const periodSchema: z.ZodString;
type Period = z.infer<typeof periodSchema>;
/** ISO-4217. */
declare const currencySchema: z.ZodString;
type Currency = z.infer<typeof currencySchema>;
/**
 * Monetary value in **cents**, always an integer.
 *
 * Floating point does not represent 0.1 exactly, and a sum of ten thousand rows
 * accumulates an error that shows up as missing cents in a report signed by a
 * CFO. In a product whose promise is "you can check everything", that is fatal.
 *
 * Rule: cents as an integer throughout transport and storage; formatting for
 * humans happens only at the presentation boundary, with `Intl`.
 */
declare const moneySchema: z.ZodObject<{
    amountCents: z.ZodNumber;
    currency: z.ZodString;
}, z.core.$strip>;
type Money = z.infer<typeof moneySchema>;
/**
 * Percentage as a number, not as a fraction: 12.4 means 12.4%.
 *
 * The alternative (0.124) misleads on reading and produces the classic mistake
 * of multiplying by 100 twice.
 */
declare const percentageSchema: z.ZodNumber;
type Percentage = z.infer<typeof percentageSchema>;
/**
 * Variation between two periods.
 *
 * `changePercent` is null when the previous period is zero — division by zero is
 * not "infinite growth", it is the absence of a comparison base, and the UI has
 * to show that instead of an invented number.
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
 * API error, single format.
 *
 * `message` is for a human and comes already translated in the locale of the
 * request. `code` is for the machine and never changes. `details` carries field
 * errors in a form.
 *
 * Never includes a stack trace, a query, nor a sensitive field value — the error
 * body is the place where most secrets escape by carelessness.
 */
declare const apiErrorSchema: z.ZodObject<{
    code: z.ZodString;
    message: z.ZodString;
    details: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>>;
    requestId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
type ApiError = z.infer<typeof apiErrorSchema>;
/**
 * Cursor pagination, not offset.
 *
 * `OFFSET 20000` forces Postgres to read twenty thousand rows in order to throw
 * them away, and degrades as the client accumulates history — exactly the
 * opposite of what is wanted. The cursor always reads the same amount, and does
 * not skip rows when new records arrive mid-navigation.
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
 * The audit log (§77).
 *
 * Append-only on the server side: this contract describes only reading, and it
 * is on purpose that there is no write or update schema — a record that can be
 * edited is not proof, and it is as proof that it exists.
 *
 * `metadata` never carries sensitive values: it keeps enough to reconstruct
 * what, who and when. A record that has to be treated as confidential cannot be
 * handed to an auditor, which cancels its reason to exist.
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
 * Authentication — our own JWT, with no supplier dependency.
 *
 * §7.4 requires an on-premise mode and §113 forbids the domain from knowing
 * about Supabase. Authentication delegated to a SaaS would break both at the
 * point that is hardest to change later, which is identity.
 */
/**
 * Password policy.
 *
 * A serious minimum length instead of the "one capital and one symbol" theatre:
 * composition rules push towards `Password1!` and NIST has advised against them
 * for years. What protects is length and not being a known password — the check
 * against breach lists happens on the server, where there is a way to look it up.
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
 * Token pair.
 *
 * The refresh is rotating: each use issues a new one and invalidates the
 * previous. If an already used token reappears, it is a sign that it was stolen
 * — in that case the whole token family of that session falls, not just the
 * repeated one.
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
 * Session user.
 *
 * Never carries a password hash, tokens nor any S3 field — this object goes to
 * the frontend and into the client state.
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
 * Organizations, members and partner hierarchy.
 *
 * Structure (§69):
 *
 *   Platform
 *    ├── Partner (accounting firm)
 *    │    ├── Organization
 *    │    └── Organization
 *    └── Direct organization
 *
 * The partner level exists in the model since M0 even without a UI: it is the
 * most likely distribution channel, and grafting on a tenant level later forces
 * migrating every foreign key in the database.
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
 * Customizable brand (§8, §101).
 *
 * It is the same piece that supports the product's name change: the frontend's
 * `brand.ts` defines the default and this overrides it per organization.
 * Building for the rename builds the white-label.
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
 * Organization settings.
 *
 * `dataRetentionMonths` and `aiDataProcessingConsent` are not comfort
 * preferences: they are compliance with §76 and the legal basis for sending
 * anything at all to an external AI provider. Without explicit consent, the
 * organization can only use a local provider.
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
 * A competitor, as somebody in the organization described them (§34, T32).
 *
 * ## Why this is a declaration and carries who made it
 *
 * Nothing in an accounting file says who you compete with, and no amount of
 * arithmetic will produce it. The three ways to know are: ask the customer,
 * search the web with a cited source, or compare across the tenant base with
 * opt-in and k-anonymity. This is the first — the cheapest, the most exact, and
 * the only one with no risk of invention at all.
 *
 * What makes it usable rather than decorative is `evidenceId`. The
 * anti-hallucination guard erases any figure an answer states that is not among
 * the facts it was given; a competitor with an id of its own is such a fact, and
 * the trail behind it is a person and a date instead of a file and a row.
 *
 * ## Why the price is three fields and not one
 *
 * A number alone is not comparable. `priceCents` without `priceUnit` cannot be
 * set beside your own pricing — €49 per user per month and €49 per project are
 * not the same claim — and without `priceCurrency` it silently assumes the
 * organization's own, which is wrong the moment a competitor prices abroad.
 * All three are optional together: most people know who they compete with long
 * before they know what that competitor charges, and a form that insists gets a
 * made-up number.
 */
declare const competitorSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    positioning: z.ZodNullable<z.ZodString>;
    priceCents: z.ZodNullable<z.ZodNumber>;
    priceCurrency: z.ZodNullable<z.ZodString>;
    priceUnit: z.ZodNullable<z.ZodString>;
    notes: z.ZodNullable<z.ZodString>;
    evidenceId: z.ZodString;
    declaredBy: z.ZodNullable<z.ZodString>;
    declaredAt: z.ZodISODateTime;
}, z.core.$strip>;
type Competitor = z.infer<typeof competitorSchema>;
/**
 * Declaring or correcting one.
 *
 * The name is the key: writing is an upsert on it, so two people adding the
 * same competitor on the same morning leave one row and not two. Everything
 * else is optional, because a competitor whose price nobody knows yet is still
 * worth writing down.
 */
declare const declareCompetitorInputSchema: z.ZodObject<{
    name: z.ZodString;
    positioning: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    priceCents: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
    priceCurrency: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    priceUnit: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    notes: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
type DeclareCompetitorInput = z.infer<typeof declareCompetitorInputSchema>;

/**
 * Data sources (§98).
 *
 * The rule that decides whether plugging in a Xero six months from now is *an
 * adapter* or *a rewrite*: **no source talks directly to normalization**. They
 * all end in the same `RawBatch` and enter the identical pipeline.
 *
 *   FileUpload ─┐
 *   Xero ───────┼─→ RawBatch ─→ Mapping ─→ Normalization ─→ Validation ─→ Dedup
 *   OpenBanking ┘
 *
 * In M0 only the file connector exists. The others are in the enum without an
 * implementation (§107) — that is what guarantees they fit without a migration.
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
 * Incremental synchronization cursor.
 *
 * Exists in M0 without anyone using it because adding it later forces
 * reprocessing history to find out where things stopped.
 */
declare const syncCursorSchema: z.ZodObject<{
    value: z.ZodString;
    updatedAt: z.ZodISODateTime;
}, z.core.$strip>;
type SyncCursor = z.infer<typeof syncCursorSchema>;
/**
 * Structure discovered at the source.
 *
 * A file returns sheets and columns; an API returns entities and fields. The
 * same shape in both cases is what lets the mapping UI (§27) be a single one.
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
 * AI provider configuration per organization (§12 BYOK).
 *
 * The key is never returned — only the mask (`sk-…4f2a`), which is enough for
 * the user to recognize which one they configured.
 *
 * `retentionPolicy` exists because some providers train on API data depending on
 * the tier, and a badly chosen key puts a client's financial data into a
 * training corpus, which cannot be undone. The UI flags it before use.
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
 * Ingestion — from the file to the normalized transaction.
 *
 *   Upload → validation → storage → parsing → sheet and column detection
 *   → mapping → normalization → validation → deduplication → persistence
 *
 * The pipeline is the same whether the data comes from an Excel or from an API
 * (§98). All that changes is the connector that produces the batch.
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
/** Target fields a column can feed. */
declare const TARGET_FIELDS: readonly ["date", "description", "amount", "currency", "customer", "supplier", "category", "product", "quantity", "invoiceNumber", "reference", "externalId", "ignore"];
declare const targetFieldSchema: z.ZodEnum<{
    date: "date";
    currency: "currency";
    description: "description";
    amount: "amount";
    customer: "customer";
    supplier: "supplier";
    category: "category";
    product: "product";
    quantity: "quantity";
    invoiceNumber: "invoiceNumber";
    reference: "reference";
    externalId: "externalId";
    ignore: "ignore";
}>;
type TargetField = z.infer<typeof targetFieldSchema>;
/**
 * How the suggestion for a column was arrived at (§27, D10).
 *
 * ## Why this travels beside the confidence and does not replace it
 *
 * The confidence is a number the interface compares against a threshold. This
 * is the **reason**, and it is the part that lets a screen say something a
 * person can act on: "the name contains «data», but it is not exactly that" is
 * checkable against the file in front of them; "confidence 0.6" is not.
 *
 * Deriving it from the confidence in the frontend would put the detector's
 * thresholds in two places, which is how one of them ends up stale.
 *
 * `MANUAL` is what a human choice leaves behind. It is not a match at all, and
 * recording it as `EXACT` would make the mapping feedback of T13 report a
 * correction as a confirmed synonym.
 */
declare const COLUMN_MATCHES: readonly ["EXACT", "PARTIAL", "NONE", "MANUAL"];
declare const columnMatchSchema: z.ZodEnum<{
    EXACT: "EXACT";
    PARTIAL: "PARTIAL";
    NONE: "NONE";
    MANUAL: "MANUAL";
}>;
type ColumnMatch = z.infer<typeof columnMatchSchema>;
/**
 * Mapping of a column of the file to a domain field (§27).
 *
 * `confidence` feeds the UI: above a threshold it is shown preselected with a
 * tick; below it, confirmation is asked for. Mapping wrongly in silence is worse
 * than asking.
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
        product: "product";
        quantity: "quantity";
        invoiceNumber: "invoiceNumber";
        reference: "reference";
        externalId: "externalId";
        ignore: "ignore";
    }>;
    confidence: z.ZodNumber;
    match: z.ZodOptional<z.ZodEnum<{
        EXACT: "EXACT";
        PARTIAL: "PARTIAL";
        NONE: "NONE";
        MANUAL: "MANUAL";
    }>>;
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
            product: "product";
            quantity: "quantity";
            invoiceNumber: "invoiceNumber";
            reference: "reference";
            externalId: "externalId";
            ignore: "ignore";
        }>;
        confidence: z.ZodNumber;
        match: z.ZodOptional<z.ZodEnum<{
            EXACT: "EXACT";
            PARTIAL: "PARTIAL";
            NONE: "NONE";
            MANUAL: "MANUAL";
        }>>;
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
            product: "product";
            quantity: "quantity";
            invoiceNumber: "invoiceNumber";
            reference: "reference";
            externalId: "externalId";
            ignore: "ignore";
        }>;
        confidence: z.ZodNumber;
        match: z.ZodOptional<z.ZodEnum<{
            EXACT: "EXACT";
            PARTIAL: "PARTIAL";
            NONE: "NONE";
            MANUAL: "MANUAL";
        }>>;
        format: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    pseudonymizeNames: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
type ConfirmMappingInput = z.infer<typeof confirmMappingInputSchema>;
/**
 * One row of the preview, already interpreted (§29).
 *
 * This is the step that catches the expensive mistake: an American file read as
 * a European one imports twenty thousand rows off by an order of magnitude, in
 * silence, and it is only found weeks later when the report does not add up.
 * Showing five rows **as they would be saved** puts that error in front of the
 * one person able to recognise it in a second.
 */
declare const previewRowSchema: z.ZodObject<{
    rowNumber: z.ZodNumber;
    date: z.ZodString;
    description: z.ZodString;
    amountCents: z.ZodString;
    currency: z.ZodString;
    counterparty: z.ZodNullable<z.ZodString>;
    category: z.ZodNullable<z.ZodString>;
}, z.core.$strip>;
type PreviewRow = z.infer<typeof previewRowSchema>;
/**
 * What `POST /imports/:id/preview` answers.
 *
 * It exists in the contract, and not as a hand-written type on each side,
 * because it is the only response the frontend used to read through a cast — and
 * a cast checks nothing. The shape could drift on the backend and the screen
 * would carry on compiling while rendering `undefined`.
 */
declare const importPreviewSchema: z.ZodObject<{
    rows: z.ZodArray<z.ZodObject<{
        rowNumber: z.ZodNumber;
        date: z.ZodString;
        description: z.ZodString;
        amountCents: z.ZodString;
        currency: z.ZodString;
        counterparty: z.ZodNullable<z.ZodString>;
        category: z.ZodNullable<z.ZodString>;
    }, z.core.$strip>>;
    rowsReady: z.ZodNumber;
    rowsSkipped: z.ZodNumber;
    duplicates: z.ZodNumber;
    formats: z.ZodObject<{
        date: z.ZodString;
        amount: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
type ImportPreview = z.infer<typeof importPreviewSchema>;
/**
 * Problem found in the data (§30).
 *
 * Stored rather than merely counted: the user has to be able to open "12
 * duplicate transactions" and see which ones, otherwise the quality panel is
 * decoration.
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
 * Financial core.
 *
 * Modelling decision: **a single `Transaction` table as the one fact**, with a
 * `type` discriminator and optional `customerId`/`supplierId` — instead of
 * separate tables for revenue and expense.
 *
 * With separate tables, each metric would need two queries and two sets of
 * indexes, and the drill-down would have two different paths for the same user
 * gesture. `Revenue` and `Expense` still exist as domain concepts; they just are
 * not tables.
 */
/**
 * Where this row came from, exactly.
 *
 * It is what makes it possible to go from "the margin fell 3.2pp" to "these 47
 * rows, from the file despesas_julho.xlsx, sheet Marketing, rows 142–189".
 * Without this stored at ingestion time, there is no way to reconstruct it later.
 */
declare const lineageRefSchema: z.ZodObject<{
    importId: z.ZodString;
    fileName: z.ZodString;
    sheetName: z.ZodNullable<z.ZodString>;
    rowNumber: z.ZodNullable<z.ZodNumber>;
    externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
        externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
    isAcquisitionCost: z.ZodBoolean;
    createdAt: z.ZodISODateTime;
}, z.core.$strip>;
type Category = z.infer<typeof categorySchema>;
/**
 * An expense category, with what it costs and whether it counts as acquisition
 * (§34, T32).
 *
 * ## Why the amount travels with the flag
 *
 * The screen asks somebody to mark which of their expense lines are the cost of
 * winning customers. Without the amounts that is a list of names to guess at;
 * with them, the two or three lines that matter are the ones at the top and the
 * decision takes a glance instead of a spreadsheet. It is the whole reason the
 * screen can be a list of switches and not a form with instructions.
 */
declare const acquisitionCategorySchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    isAcquisitionCost: z.ZodBoolean;
    spent: z.ZodObject<{
        amountCents: z.ZodNumber;
        currency: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>;
type AcquisitionCategory = z.infer<typeof acquisitionCategorySchema>;
/**
 * The declaration itself.
 *
 * A boolean and nothing else: who declared it and when are the server's to
 * record, and a client that could send them could rewrite the provenance of a
 * number people argue about.
 */
declare const setAcquisitionCostSchema: z.ZodObject<{
    isAcquisitionCost: z.ZodBoolean;
}, z.core.$strip>;
type SetAcquisitionCost = z.infer<typeof setAcquisitionCostSchema>;
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
/** Aggregate by dimension — customers, categories, suppliers. */
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
/** Point of a time series, for the charts of §66. */
declare const timeSeriesPointSchema: z.ZodObject<{
    period: z.ZodString;
    revenue: z.ZodNumber;
    expenses: z.ZodNumber;
    grossProfit: z.ZodNumber;
    currency: z.ZodString;
}, z.core.$strip>;
type TimeSeriesPoint = z.infer<typeof timeSeriesPointSchema>;

/**
 * Commercial context — lightweight CRM.
 *
 * §1.1 of the PRD states that the product is not a CRM. This extends that scope
 * by an explicit decision, and for that reason it stays in its own context, with
 * its own milestone (M8), after the financial promise has been delivered.
 *
 * What stops it from being a mediocre CRM glued next to a good financial product
 * are the ties to the financial side:
 *
 *   - a won opportunity confronted with the client's real revenue;
 *   - weighted pipeline (`value × probability`) as a node of the forecast graph;
 *   - churn and renewal detectors feeding the insights;
 *   - commercial context in the AI answers — "the client dropped 18% and has a
 *     renewal in 30 days with no open opportunity".
 *
 * Privacy notice: leads and contacts are **personal data of third parties**
 * (class S2). The client is the controller and holds the legal basis; we are the
 * processor. See `docs/SEGURANCA_E_PRIVACIDADE.md`.
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
/** Target of an activity. Polymorphic so there are not three identical tables. */
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
/** Pipeline summary by stage, for the funnel and for the forecast. */
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
 * Metrics as a directed acyclic graph.
 *
 * One metric depends on others: `EBITDA` depends on `GROSS_PROFIT` and `OPEX`;
 * `GROSS_MARGIN` depends on `GROSS_PROFIT` and `REVENUE`. Modelling that as a
 * graph instead of loose functions solves four things at once:
 *
 *   1. the order of calculation stops being the responsibility of whoever writes
 *      the metric;
 *   2. only the leaves touch the database — everything else is a pure function,
 *      and is tested without Postgres, which is what makes the regression of §87
 *      practicable;
 *   3. variance attribution (§24) comes for free: to know why profit fell, you
 *      walk down the graph attributing the delta to each child;
 *   4. the cache invalidates by construction, because the key includes the
 *      dataset version.
 *
 * Not to be confused with the evidence graph (`evidence.ts`): this one links
 * metric to metric and lives in code; that one links metric to transactions and
 * to file rows, and is built by query. They touch at the leaves.
 */
declare const METRIC_IDS: readonly ["REVENUE", "EXPENSES", "COGS", "OPEX", "CASH", "ACCOUNTS_RECEIVABLE", "ACCOUNTS_PAYABLE", "BUDGETED_EXPENSES", "GROSS_PROFIT", "GROSS_MARGIN", "OPERATING_PROFIT", "EBITDA", "EBITDA_MARGIN", "REVENUE_GROWTH", "EXPENSE_GROWTH", "CUSTOMER_CONCENTRATION", "BURN", "RUNWAY", "BUDGET_VARIANCE", "PIPELINE_OPEN", "PIPELINE_WEIGHTED", "DEALS_WON", "DEALS_LOST", "WIN_RATE", "UNITS_SOLD", "QUANTIFIED_REVENUE", "MARGIN_PER_UNIT", "ACQUISITION_SPEND", "NEW_CUSTOMERS", "CAC"];
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
    PIPELINE_OPEN: "PIPELINE_OPEN";
    PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
    DEALS_WON: "DEALS_WON";
    DEALS_LOST: "DEALS_LOST";
    WIN_RATE: "WIN_RATE";
    UNITS_SOLD: "UNITS_SOLD";
    QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
    MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
    ACQUISITION_SPEND: "ACQUISITION_SPEND";
    NEW_CUSTOMERS: "NEW_CUSTOMERS";
    CAC: "CAC";
}>;
type MetricId = z.infer<typeof metricIdSchema>;
/**
 * Unit of the value.
 *
 * Exists so that formatting does not have to guess: 42 can be €42, 42% or 42
 * months, and an `Intl.NumberFormat` with the wrong unit produces a plausible
 * and false number — the worst kind in a financial report.
 */
declare const METRIC_UNITS: readonly ["MONEY", "PERCENT", "MONTHS", "RATIO", "COUNT", "QUANTITY", "DAYS"];
declare const metricUnitSchema: z.ZodEnum<{
    MONEY: "MONEY";
    PERCENT: "PERCENT";
    MONTHS: "MONTHS";
    RATIO: "RATIO";
    COUNT: "COUNT";
    QUANTITY: "QUANTITY";
    DAYS: "DAYS";
}>;
type MetricUnit = z.infer<typeof metricUnitSchema>;
/**
 * Declaration of a node, without the calculation function.
 *
 * The implementation lives in the backend; this is what the frontend needs to
 * know to draw the graph and explain where each number comes from.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>;
    unit: z.ZodEnum<{
        MONEY: "MONEY";
        PERCENT: "PERCENT";
        MONTHS: "MONTHS";
        RATIO: "RATIO";
        COUNT: "COUNT";
        QUANTITY: "QUANTITY";
        DAYS: "DAYS";
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>;
    period: z.ZodString;
    unit: z.ZodEnum<{
        MONEY: "MONEY";
        PERCENT: "PERCENT";
        MONTHS: "MONTHS";
        RATIO: "RATIO";
        COUNT: "COUNT";
        QUANTITY: "QUANTITY";
        DAYS: "DAYS";
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
 * One branch of the explanation of a variation.
 *
 * `contributionPercent` is this child's slice of the parent's delta — it is what
 * makes it possible to say "two customers explain 72% of the drop" instead of
 * listing twenty rows with no hierarchy.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>>;
    entityId: z.ZodNullable<z.ZodString>;
    changeAbsolute: z.ZodNumber;
    changePercent: z.ZodNullable<z.ZodNumber>;
    contributionPercent: z.ZodNumber;
}, z.core.$strip>;
type VarianceContribution = z.infer<typeof varianceContributionSchema>;
/**
 * Variance attribution tree (§24).
 *
 * Recursive, because the question "why?" repeats: profit fell because of
 * expenses, expenses because of marketing, marketing because of three invoices.
 * Each node is clickable all the way to the row of the file.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>>>;
}, z.core.$strip>;
type MetricQuery = z.infer<typeof metricQuerySchema>;
/**
 * The sections the Overview can have, and the shape the business gives it.
 *
 * The composition is derived from the data, not generated: with no budget
 * uploaded there is no variance to show, and a customer worth 40% of the revenue
 * moves up to first. `reasons` carries the why — it is what stops a panel that
 * changes shape from reading as instability.
 *
 * `TREASURY` rather than `CASH`, which would have been the literal translation:
 * `CASH` is already a `MetricId`, and the composer pushes onto both arrays a few
 * lines apart. One word meaning two things there is a typo the compiler accepts.
 */
declare const OVERVIEW_SECTIONS: readonly ["METRICS", "WHAT_CHANGED", "ALERTS", "TRENDS", "CUSTOMERS", "CATEGORIES", "BUDGET", "TREASURY"];
declare const overviewSectionSchema: z.ZodEnum<{
    METRICS: "METRICS";
    WHAT_CHANGED: "WHAT_CHANGED";
    ALERTS: "ALERTS";
    TRENDS: "TRENDS";
    CUSTOMERS: "CUSTOMERS";
    CATEGORIES: "CATEGORIES";
    BUDGET: "BUDGET";
    TREASURY: "TREASURY";
}>;
type OverviewSection = z.infer<typeof overviewSectionSchema>;
declare const overviewShapeSchema: z.ZodObject<{
    metrics: z.ZodArray<z.ZodEnum<{
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>>;
    sections: z.ZodArray<z.ZodEnum<{
        METRICS: "METRICS";
        WHAT_CHANGED: "WHAT_CHANGED";
        ALERTS: "ALERTS";
        TRENDS: "TRENDS";
        CUSTOMERS: "CUSTOMERS";
        CATEGORIES: "CATEGORIES";
        BUDGET: "BUDGET";
        TREASURY: "TREASURY";
    }>>;
    reasons: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
type OverviewShape = z.infer<typeof overviewShapeSchema>;
/** Overview response, in a single request so the dashboard does not make ten. */
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
        }>;
        period: z.ZodString;
        unit: z.ZodEnum<{
            MONEY: "MONEY";
            PERCENT: "PERCENT";
            MONTHS: "MONTHS";
            RATIO: "RATIO";
            COUNT: "COUNT";
            QUANTITY: "QUANTITY";
            DAYS: "DAYS";
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
        metrics: z.ZodArray<z.ZodEnum<{
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
        }>>;
        sections: z.ZodArray<z.ZodEnum<{
            METRICS: "METRICS";
            WHAT_CHANGED: "WHAT_CHANGED";
            ALERTS: "ALERTS";
            TRENDS: "TRENDS";
            CUSTOMERS: "CUSTOMERS";
            CATEGORIES: "CATEGORIES";
            BUDGET: "BUDGET";
            TREASURY: "TREASURY";
        }>>;
        reasons: z.ZodArray<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
type DashboardSummary = z.infer<typeof dashboardSummarySchema>;
/**
 * What kind of business this is, derived from the data (§34, T21).
 *
 * ## Why the signals travel with the archetype
 *
 * Because "recurring" on its own is an opinion with a label. The measurements
 * behind it — 68% of revenue from customers billed in three of the last four
 * months, at similar amounts — are what make it a derivation somebody can
 * check, and checking is the whole product.
 *
 * ## Why `UNDETERMINED` is in the enum
 *
 * Four months of history do not distinguish project work from seasonal retail
 * having a quiet spring. Declaring anyway would put a guess where every
 * threshold downstream reads a fact. The reason travels too, because "we cannot
 * tell yet" and "we cannot tell from this" send a person to different places.
 */
declare const archetypeSchema: z.ZodEnum<{
    RECURRING: "RECURRING";
    PROJECT: "PROJECT";
    RETAIL: "RETAIL";
    INDUSTRY: "INDUSTRY";
    UNDETERMINED: "UNDETERMINED";
}>;
type Archetype = z.infer<typeof archetypeSchema>;
declare const profileSignalIdSchema: z.ZodEnum<{
    recurrence: "recurrence";
    churn: "churn";
    concentration: "concentration";
    customerCount: "customerCount";
    ticketSpread: "ticketSpread";
    costStructure: "costStructure";
    dso: "dso";
    seasonality: "seasonality";
}>;
type ProfileSignalId = z.infer<typeof profileSignalIdSchema>;
declare const profileSignalSchema: z.ZodObject<{
    id: z.ZodEnum<{
        recurrence: "recurrence";
        churn: "churn";
        concentration: "concentration";
        customerCount: "customerCount";
        ticketSpread: "ticketSpread";
        costStructure: "costStructure";
        dso: "dso";
        seasonality: "seasonality";
    }>;
    value: z.ZodNullable<z.ZodNumber>;
    detail: z.ZodRecord<z.ZodString, z.ZodNumber>;
}, z.core.$strip>;
type ProfileSignal = z.infer<typeof profileSignalSchema>;
/**
 * Who this company sells to (§34, T35).
 *
 * Derived and not configured: a settings field is a field that is wrong for
 * everybody who skipped the onboarding, and the signals that answer it are
 * already measured.
 *
 * It changes which conclusions are meaningful. A concentration alert on a shop
 * with forty thousand buyers is not a false positive to be tuned away — it is a
 * question that does not apply, and the second time somebody sees one they stop
 * reading the alerts.
 */
declare const businessTypeSchema: z.ZodEnum<{
    UNDETERMINED: "UNDETERMINED";
    B2B: "B2B";
    B2C: "B2C";
    MIXED: "MIXED";
}>;
type BusinessType = z.infer<typeof businessTypeSchema>;
declare const businessProfileSchema: z.ZodObject<{
    archetype: z.ZodEnum<{
        RECURRING: "RECURRING";
        PROJECT: "PROJECT";
        RETAIL: "RETAIL";
        INDUSTRY: "INDUSTRY";
        UNDETERMINED: "UNDETERMINED";
    }>;
    businessType: z.ZodEnum<{
        UNDETERMINED: "UNDETERMINED";
        B2B: "B2B";
        B2C: "B2C";
        MIXED: "MIXED";
    }>;
    signals: z.ZodArray<z.ZodObject<{
        id: z.ZodEnum<{
            recurrence: "recurrence";
            churn: "churn";
            concentration: "concentration";
            customerCount: "customerCount";
            ticketSpread: "ticketSpread";
            costStructure: "costStructure";
            dso: "dso";
            seasonality: "seasonality";
        }>;
        value: z.ZodNullable<z.ZodNumber>;
        detail: z.ZodRecord<z.ZodString, z.ZodNumber>;
    }, z.core.$strip>>;
    because: z.ZodArray<z.ZodEnum<{
        recurrence: "recurrence";
        churn: "churn";
        concentration: "concentration";
        customerCount: "customerCount";
        ticketSpread: "ticketSpread";
        costStructure: "costStructure";
        dso: "dso";
        seasonality: "seasonality";
    }>>;
    undeterminedReason: z.ZodNullable<z.ZodEnum<{
        NOT_ENOUGH_HISTORY: "NOT_ENOUGH_HISTORY";
        NO_CUSTOMERS: "NO_CUSTOMERS";
        TOO_CLOSE_TO_CALL: "TOO_CLOSE_TO_CALL";
    }>>;
    period: z.ZodString;
    datasetVersion: z.ZodNumber;
}, z.core.$strip>;
type BusinessProfile = z.infer<typeof businessProfileSchema>;
/**
 * The Business Model Canvas, half derived and half declared (§34, T26).
 *
 * ## Why the halves are marked, and never mixed
 *
 * Four blocks come out of the transactions — partners from suppliers, segments
 * from customer concentration, cost structure from the COGS/OPEX split, revenue
 * streams from recurrence and mix. Five do not, and never will: value
 * proposition, key activities, key resources, customer relationships, channels.
 *
 * Filling those five with a model would be invention on the first screen a
 * customer sees, and it would contradict the one rule this product sells. They
 * arrive **empty**, and `kind` is what stops a screen from ever drawing the two
 * halves the same way — the reader has to be able to tell "we measured this"
 * from "somebody wrote this" without being told.
 *
 * ## Why empty is the feature
 *
 * An empty block is an invitation to declare what only this person knows, and
 * what they write there becomes the input to objectives by area. Onboarding
 * stops being "ingest a file" and starts producing strategic context.
 */
declare const CANVAS_BLOCKS: readonly ["partners", "segments", "costStructure", "revenueStreams", "valueProposition", "keyActivities", "keyResources", "customerRelationships", "channels"];
declare const canvasBlockIdSchema: z.ZodEnum<{
    costStructure: "costStructure";
    partners: "partners";
    segments: "segments";
    revenueStreams: "revenueStreams";
    valueProposition: "valueProposition";
    keyActivities: "keyActivities";
    keyResources: "keyResources";
    customerRelationships: "customerRelationships";
    channels: "channels";
}>;
type CanvasBlockId = z.infer<typeof canvasBlockIdSchema>;
/** One measured line inside a derived block: what it is, and what it is worth. */
declare const canvasEvidenceSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodNumber;
    share: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type CanvasEvidence = z.infer<typeof canvasEvidenceSchema>;
declare const canvasBlockSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"DERIVED">;
    id: z.ZodEnum<{
        costStructure: "costStructure";
        partners: "partners";
        segments: "segments";
        revenueStreams: "revenueStreams";
        valueProposition: "valueProposition";
        keyActivities: "keyActivities";
        keyResources: "keyResources";
        customerRelationships: "customerRelationships";
        channels: "channels";
    }>;
    evidence: z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        value: z.ZodNumber;
        share: z.ZodNullable<z.ZodNumber>;
    }, z.core.$strip>>;
    unit: z.ZodEnum<{
        MONEY: "MONEY";
        PERCENT: "PERCENT";
        COUNT: "COUNT";
    }>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"DECLARED">;
    id: z.ZodEnum<{
        costStructure: "costStructure";
        partners: "partners";
        segments: "segments";
        revenueStreams: "revenueStreams";
        valueProposition: "valueProposition";
        keyActivities: "keyActivities";
        keyResources: "keyResources";
        customerRelationships: "customerRelationships";
        channels: "channels";
    }>;
    content: z.ZodNullable<z.ZodString>;
    authorName: z.ZodNullable<z.ZodString>;
    updatedAt: z.ZodNullable<z.ZodISODateTime>;
}, z.core.$strip>], "kind">;
type CanvasBlock = z.infer<typeof canvasBlockSchema>;
declare const businessCanvasSchema: z.ZodObject<{
    blocks: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"DERIVED">;
        id: z.ZodEnum<{
            costStructure: "costStructure";
            partners: "partners";
            segments: "segments";
            revenueStreams: "revenueStreams";
            valueProposition: "valueProposition";
            keyActivities: "keyActivities";
            keyResources: "keyResources";
            customerRelationships: "customerRelationships";
            channels: "channels";
        }>;
        evidence: z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            value: z.ZodNumber;
            share: z.ZodNullable<z.ZodNumber>;
        }, z.core.$strip>>;
        unit: z.ZodEnum<{
            MONEY: "MONEY";
            PERCENT: "PERCENT";
            COUNT: "COUNT";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"DECLARED">;
        id: z.ZodEnum<{
            costStructure: "costStructure";
            partners: "partners";
            segments: "segments";
            revenueStreams: "revenueStreams";
            valueProposition: "valueProposition";
            keyActivities: "keyActivities";
            keyResources: "keyResources";
            customerRelationships: "customerRelationships";
            channels: "channels";
        }>;
        content: z.ZodNullable<z.ZodString>;
        authorName: z.ZodNullable<z.ZodString>;
        updatedAt: z.ZodNullable<z.ZodISODateTime>;
    }, z.core.$strip>], "kind">>;
    period: z.ZodString;
    currency: z.ZodString;
    datasetVersion: z.ZodNumber;
}, z.core.$strip>;
type BusinessCanvas = z.infer<typeof businessCanvasSchema>;
/** Writing one of the five declared blocks. */
declare const declareCanvasBlockSchema: z.ZodObject<{
    block: z.ZodEnum<{
        valueProposition: "valueProposition";
        keyActivities: "keyActivities";
        keyResources: "keyResources";
        customerRelationships: "customerRelationships";
        channels: "channels";
    }>;
    content: z.ZodString;
}, z.core.$strip>;
type DeclareCanvasBlock = z.infer<typeof declareCanvasBlockSchema>;

/**
 * Evidence — the piece that holds up the product's promise.
 *
 * Every financial AI tool gives an answer. This one lets you verify it. The path
 * always has to be walkable:
 *
 *   conclusion → calculation → metric → entity → transaction → file → row
 *
 * Without this, the product is indistinguishable from an LLM with an Excel — and
 * the user has no way to catch the error, which is exactly the value being sold.
 */
/**
 * How a number was obtained.
 *
 * `inputs` are the values that went in, `formula` is what was done with them.
 * Shown in the evidence panel for the user to redo the sum in their head if they
 * want — and that is what builds trust, not the promise that it is right.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
        }>>;
    }, z.core.$strip>>;
    result: z.ZodNumber;
}, z.core.$strip>;
type Calculation = z.infer<typeof calculationSchema>;
/** Transaction cited as proof, with the original row it came from. */
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
        externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
        externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
    }, z.core.$strip>;
}, z.core.$strip>;
type EvidenceTransaction = z.infer<typeof evidenceTransactionSchema>;
/**
 * Evidence bundle for a statement.
 *
 * `transactionCount` and `sampleTransactions` exist separately on purpose: a
 * statement can rest on thousands of rows, and returning them all would be
 * useless for the user and expensive for the database. The real count and a
 * sample are shown, with a path to see the rest in the explorer.
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
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
                PIPELINE_OPEN: "PIPELINE_OPEN";
                PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                DEALS_WON: "DEALS_WON";
                DEALS_LOST: "DEALS_LOST";
                WIN_RATE: "WIN_RATE";
                UNITS_SOLD: "UNITS_SOLD";
                QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                ACQUISITION_SPEND: "ACQUISITION_SPEND";
                NEW_CUSTOMERS: "NEW_CUSTOMERS";
                CAC: "CAC";
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
            externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
            externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
 * Insights — what the system says before being asked (§36, §115).
 *
 * The difference between a dashboard and this product is here: the dashboard
 * waits for the user to discover; this one opens straight away with "there are
 * three things you should know".
 *
 * Each insight is born of a deterministic detector over calculated metrics,
 * never of a model giving an opinion. The AI, when it arrives in M7, writes — it
 * does not decide what is anomalous.
 */
/**
 * **Translation key and parameters, never ready-made text.**
 *
 * v0.3.0 described `title` and `description` as text "already translated in the
 * locale of the request", and was wrong about what the product does. Translating
 * on the server forced it to have its own catalogue in four languages, with its
 * own parity gate — a second copy of the i18n infrastructure, and the guarantee
 * that the two would diverge. Worse: the wording would come to live in two
 * places.
 *
 * Underneath this there is a separation that is worth it on its own: **deciding
 * what is anomalous and deciding how it is said are different jobs**. The first
 * is deterministic and is tested with numbers; the second is editorial and is
 * reviewed by reading. Separated, the detector is tested without a single word
 * of Portuguese in the middle.
 *
 * The deviation from §37 is recorded in `docs/ARCHITECTURE.md`.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>>;
    entityId: z.ZodNullable<z.ZodString>;
    dimension: z.ZodNullable<z.ZodEnum<{
        customer: "customer";
        supplier: "supplier";
        category: "category";
        product: "product";
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
                PIPELINE_OPEN: "PIPELINE_OPEN";
                PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                DEALS_WON: "DEALS_WON";
                DEALS_LOST: "DEALS_LOST";
                WIN_RATE: "WIN_RATE";
                UNITS_SOLD: "UNITS_SOLD";
                QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                ACQUISITION_SPEND: "ACQUISITION_SPEND";
                NEW_CUSTOMERS: "NEW_CUSTOMERS";
                CAC: "CAC";
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
                    PIPELINE_OPEN: "PIPELINE_OPEN";
                    PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                    DEALS_WON: "DEALS_WON";
                    DEALS_LOST: "DEALS_LOST";
                    WIN_RATE: "WIN_RATE";
                    UNITS_SOLD: "UNITS_SOLD";
                    QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                    MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                    ACQUISITION_SPEND: "ACQUISITION_SPEND";
                    NEW_CUSTOMERS: "NEW_CUSTOMERS";
                    CAC: "CAC";
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
                externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
 * The endpoint's response, and not just the list.
 *
 * The currency comes here so the page does not have to request the dashboard
 * summary just to be able to format half a dozen values — that would be three
 * queries and a whole evaluation of the metrics graph. The dataset version comes
 * because it is what makes the list reproducible (§46): the same insights over
 * the same data.
 *
 * Note what is **not** here: `organizationId`. The tenant is implicit in the
 * session, and returning it in every object would be repeating on every row
 * something the client already knows and cannot choose.
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
        }>>;
        entityId: z.ZodNullable<z.ZodString>;
        dimension: z.ZodNullable<z.ZodEnum<{
            customer: "customer";
            supplier: "supplier";
            category: "category";
            product: "product";
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
                    PIPELINE_OPEN: "PIPELINE_OPEN";
                    PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                    DEALS_WON: "DEALS_WON";
                    DEALS_LOST: "DEALS_LOST";
                    WIN_RATE: "WIN_RATE";
                    UNITS_SOLD: "UNITS_SOLD";
                    QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                    MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                    ACQUISITION_SPEND: "ACQUISITION_SPEND";
                    NEW_CUSTOMERS: "NEW_CUSTOMERS";
                    CAC: "CAC";
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
                        PIPELINE_OPEN: "PIPELINE_OPEN";
                        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                        DEALS_WON: "DEALS_WON";
                        DEALS_LOST: "DEALS_LOST";
                        WIN_RATE: "WIN_RATE";
                        UNITS_SOLD: "UNITS_SOLD";
                        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                        ACQUISITION_SPEND: "ACQUISITION_SPEND";
                        NEW_CUSTOMERS: "NEW_CUSTOMERS";
                        CAC: "CAC";
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
                    externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                    externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
 * Recommendation (§38).
 *
 * Separate from the insight on purpose. The insight is what happened, and it is
 * verifiable; the recommendation is what to do next, and it is opinion. Mixing
 * the two would make a debatable suggestion inherit the authority of a fact —
 * which is exactly the confusion §20 requires avoiding.
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
 * "What changed?" item (§35). Each row is clickable through to the evidence.
 *
 * `direction` and `sentiment` are lowercase, unlike every other enum in this
 * package. It is not carelessness: the others are **persisted** values — roles,
 * states, types —, and these are presentation vocabulary that never reaches the
 * database. Uniformizing them would force converting on both sides to gain
 * nothing.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
    }>;
    unit: z.ZodString;
    current: z.ZodNumber;
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
        }>;
        unit: z.ZodString;
        current: z.ZodNumber;
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
 * AI layer.
 *
 * The rule that structures everything (§9): the AI **interprets**, it does not
 * calculate. It receives metrics already calculated deterministically and
 * explains them. A number that comes out of a model is never financial truth.
 *
 *   data → normalization → domain → calculation → metrics → evidence → AI → explanation
 *
 * The path `Excel → LLM → financial truth` is forbidden, and it is the
 * difference between this product and a chat with a spreadsheet.
 */
/**
 * A statement inside an answer (§20).
 *
 * `type` forces separating fact from inference. It is not cosmetic: it is what
 * lets the user know what can be taken to a meeting and what has to be confirmed
 * first. Without this separation, a plausible assumption gains the weight of an
 * audited datum.
 */
/**
 * What a statement may cite as its proof.
 *
 * Two shapes, because there are two kinds of proof and they are reached
 * differently:
 *
 * - **A uuid** — evidence the engine built for this answer: the calculation, the
 *   transaction count, the sample rows. It travels inside the answer's
 *   `evidence` array, so it is resolved by looking there.
 * - **`doc:<uuid>` or `doc:<uuid>:<line>`** — a value taken from a document the
 *   user attached (§48), anchored to the line that contains it. It is resolved
 *   by asking the server, because the document is not carried in the answer.
 * - **`declared:competitor:<uuid>`** — something a person in the organization
 *   wrote down (§34, T32). The trail leads to a name and a date rather than to
 *   a file and a row, and the interface says so: it is a weaker claim than a
 *   transaction and a far stronger one than a model's memory.
 *
 * ## Why a declaration is a citable fact at all
 *
 * Because the alternative is worse. A competitor's price is not in anybody's
 * accounting file and never will be, so either the product refuses to reason
 * about it or it lets a model remember one. Letting the customer state it, and
 * carrying who stated it, is the only version where the number on screen has a
 * provenance somebody can argue with.
 *
 * ## Why the second shape had to be described here
 *
 * It already existed on the server, and this schema refused it. The guard was
 * taught to accept a figure quoted from a contract, and then every answer that
 * quoted one failed to parse before the guard ever saw it — the citation was
 * legitimate, the extraction was real, and the contract said "uuid". A schema
 * that does not describe what the system produces does not protect anything; it
 * just fails somewhere less obvious.
 */
declare const evidenceIdSchema: z.ZodUnion<readonly [z.ZodString, z.ZodString, z.ZodString]>;
type EvidenceId = z.infer<typeof evidenceIdSchema>;
declare const keyPointSchema: z.ZodObject<{
    type: z.ZodEnum<{
        FACT: "FACT";
        CALCULATION: "CALCULATION";
        INFERENCE: "INFERENCE";
        RECOMMENDATION: "RECOMMENDATION";
    }>;
    text: z.ZodString;
    evidenceId: z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodString, z.ZodString]>>;
}, z.core.$strip>;
type KeyPoint = z.infer<typeof keyPointSchema>;
/**
 * Assumption taken by the answer (§40).
 *
 * Every projection rests on assumptions, and hiding them is how an opinion gets
 * presented as a forecast. They stay explicit and editable.
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
 * Answer contract (§19).
 *
 * Structured instead of free text because the UI needs to render each part
 * differently — and because a validatable contract is what allows testing that
 * the model did not stray from the format (§87, AI contract tests).
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
        evidenceId: z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodString, z.ZodString]>>;
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
                PIPELINE_OPEN: "PIPELINE_OPEN";
                PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                DEALS_WON: "DEALS_WON";
                DEALS_LOST: "DEALS_LOST";
                WIN_RATE: "WIN_RATE";
                UNITS_SOLD: "UNITS_SOLD";
                QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                ACQUISITION_SPEND: "ACQUISITION_SPEND";
                NEW_CUSTOMERS: "NEW_CUSTOMERS";
                CAC: "CAC";
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
                    PIPELINE_OPEN: "PIPELINE_OPEN";
                    PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                    DEALS_WON: "DEALS_WON";
                    DEALS_LOST: "DEALS_LOST";
                    WIN_RATE: "WIN_RATE";
                    UNITS_SOLD: "UNITS_SOLD";
                    QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                    MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                    ACQUISITION_SPEND: "ACQUISITION_SPEND";
                    NEW_CUSTOMERS: "NEW_CUSTOMERS";
                    CAC: "CAC";
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
                externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
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
                PIPELINE_OPEN: "PIPELINE_OPEN";
                PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                DEALS_WON: "DEALS_WON";
                DEALS_LOST: "DEALS_LOST";
                WIN_RATE: "WIN_RATE";
                UNITS_SOLD: "UNITS_SOLD";
                QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                ACQUISITION_SPEND: "ACQUISITION_SPEND";
                NEW_CUSTOMERS: "NEW_CUSTOMERS";
                CAC: "CAC";
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
            evidenceId: z.ZodNullable<z.ZodUnion<readonly [z.ZodString, z.ZodString, z.ZodString]>>;
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
                    PIPELINE_OPEN: "PIPELINE_OPEN";
                    PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                    DEALS_WON: "DEALS_WON";
                    DEALS_LOST: "DEALS_LOST";
                    WIN_RATE: "WIN_RATE";
                    UNITS_SOLD: "UNITS_SOLD";
                    QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                    MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                    ACQUISITION_SPEND: "ACQUISITION_SPEND";
                    NEW_CUSTOMERS: "NEW_CUSTOMERS";
                    CAC: "CAC";
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
                        PIPELINE_OPEN: "PIPELINE_OPEN";
                        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                        DEALS_WON: "DEALS_WON";
                        DEALS_LOST: "DEALS_LOST";
                        WIN_RATE: "WIN_RATE";
                        UNITS_SOLD: "UNITS_SOLD";
                        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                        ACQUISITION_SPEND: "ACQUISITION_SPEND";
                        NEW_CUSTOMERS: "NEW_CUSTOMERS";
                        CAC: "CAC";
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
                    externalId: z.ZodDefault<z.ZodNullable<z.ZodString>>;
                    externalUrl: z.ZodDefault<z.ZodNullable<z.ZodString>>;
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
                PIPELINE_OPEN: "PIPELINE_OPEN";
                PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                DEALS_WON: "DEALS_WON";
                DEALS_LOST: "DEALS_LOST";
                WIN_RATE: "WIN_RATE";
                UNITS_SOLD: "UNITS_SOLD";
                QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                ACQUISITION_SPEND: "ACQUISITION_SPEND";
                NEW_CUSTOMERS: "NEW_CUSTOMERS";
                CAC: "CAC";
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
                    PIPELINE_OPEN: "PIPELINE_OPEN";
                    PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
                    DEALS_WON: "DEALS_WON";
                    DEALS_LOST: "DEALS_LOST";
                    WIN_RATE: "WIN_RATE";
                    UNITS_SOLD: "UNITS_SOLD";
                    QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
                    MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
                    ACQUISITION_SPEND: "ACQUISITION_SPEND";
                    NEW_CUSTOMERS: "NEW_CUSTOMERS";
                    CAC: "CAC";
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
 * AI consumption (§15).
 *
 * Recorded per request and never hidden from the client (§81). Charging per
 * message would be penalizing the use of the central feature; the model is a
 * per-plan limit with consumption in sight.
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
 * What the privacy screen shows (§74).
 *
 * Without euphemism: which provider, which model, and **whether the data
 * leaves**. A provider labelled "local" that sends data outside is exactly what
 * destroys the trust this product sells.
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
 * Scenarios and forecast (§39, §40).
 *
 * The calculation is deterministic and runs over the same metrics graph:
 * changing an assumption changes a node, and the change propagates through the
 * dependencies. The AI explains the result; it does not produce it.
 *
 * That is what allows the same question to always give the same answer — an
 * obvious requirement for whoever is going to take the number to a board, and
 * one a generative model on its own does not guarantee.
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
        PIPELINE_OPEN: "PIPELINE_OPEN";
        PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
        DEALS_WON: "DEALS_WON";
        DEALS_LOST: "DEALS_LOST";
        WIN_RATE: "WIN_RATE";
        UNITS_SOLD: "UNITS_SOLD";
        QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
        MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
        ACQUISITION_SPEND: "ACQUISITION_SPEND";
        NEW_CUSTOMERS: "NEW_CUSTOMERS";
        CAC: "CAC";
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
            PIPELINE_OPEN: "PIPELINE_OPEN";
            PIPELINE_WEIGHTED: "PIPELINE_WEIGHTED";
            DEALS_WON: "DEALS_WON";
            DEALS_LOST: "DEALS_LOST";
            WIN_RATE: "WIN_RATE";
            UNITS_SOLD: "UNITS_SOLD";
            QUANTIFIED_REVENUE: "QUANTIFIED_REVENUE";
            MARGIN_PER_UNIT: "MARGIN_PER_UNIT";
            ACQUISITION_SPEND: "ACQUISITION_SPEND";
            NEW_CUSTOMERS: "NEW_CUSTOMERS";
            CAC: "CAC";
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
/**
 * A month that actually happened.
 *
 * ## Why the forecast carries its own history
 *
 * Because without it the projection cannot be read. A chart that begins at the
 * first projected month is a line with nothing to compare itself against, and
 * every such line looks equally reasonable.
 *
 * The trend is a least-squares fit over the whole window, which weighs every
 * month the same — so a fall in the last two months arrives at the projection
 * diluted, and the line can quite legitimately start *above* the month that just
 * happened. That is a declared property of the method and not a defect, but a
 * reader who cannot see the join has no way to know it is there. Stating it in
 * the assumptions was not enough: it is a sentence, and this is a shape.
 *
 * Sent with the forecast rather than fetched separately because the two have to
 * agree. Two requests can return two different `datasetVersion`s, and a history
 * one import older than the projection drawn against it is a kink nobody put
 * there.
 */
declare const actualPointSchema: z.ZodObject<{
    period: z.ZodString;
    revenue: z.ZodNumber;
    expenses: z.ZodNumber;
    grossProfit: z.ZodNumber;
    cash: z.ZodNullable<z.ZodNumber>;
}, z.core.$strip>;
type ActualPoint = z.infer<typeof actualPointSchema>;
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
 * Forecast with the three scenarios of §40.
 *
 * `assumptions` is never optional: a forecast without assumptions in sight is a
 * number with the air of certainty, and §40 requires showing them.
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
    history: z.ZodArray<z.ZodObject<{
        period: z.ZodString;
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
 * Reports (§44, §45, §46).
 *
 * The Monthly Financial Review is the artefact that fulfils the sellable
 * promise: upload the files, receive the monthly management review in five
 * minutes. It is what replaces the four hours a Finance Manager spends every
 * month.
 *
 * Delivered in M6 with sections generated by template — without AI. The AI
 * arrives in M7 to write the narrative of what already exists, which is an
 * addition and not a requirement.
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
 * Reproducibility metadata (§46).
 *
 * Without this, reprinting the July report after someone corrects a file gives
 * another number, and nobody can say which one was right. In a document that
 * goes to a bank or a board, it is the difference between a report and a draft.
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
 * Exported file.
 *
 * A signed, short-lived URL, served from outside the application's domain — a
 * financial report accessible by a permanent link would be a leak with the
 * appearance of a feature.
 */
declare const exportResultSchema: z.ZodObject<{
    url: z.ZodString;
    fileName: z.ZodString;
    expiresAt: z.ZodISODateTime;
}, z.core.$strip>;
type ExportResult = z.infer<typeof exportResultSchema>;

/**
 * Billing (§78–§81).
 *
 * Two principles that shape the model:
 *
 * 1. **Never charge for AI per message.** Charging per question teaches the
 *    client to avoid the central feature. The model is a per-plan limit with
 *    consumption always in sight (§81).
 *
 * 2. **Security is not a paid plan.** Encryption, isolation, audit log and the
 *    right to export and delete are the same on every plan — GDPR Art. 32 and
 *    LGPD Art. 46 require adequate measures for all processing, and a plan
 *    "without protection" would be documented proof of non-compliance. What
 *    scales by price is **sovereignty and control**: data residency,
 *    on-premise, BYOK, private AI, SSO, custom retention. See
 *    `docs/SEGURANCA_E_PRIVACIDADE.md`.
 */
/**
 * Per-plan limits.
 *
 * `null` means no limit. Exceeding it blocks the new action, never deletes nor
 * hides data already there — losing access to the history because of billing
 * would be holding the client's data hostage.
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
    modules: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        COMMERCIAL: "COMMERCIAL";
        INVENTORY: "INVENTORY";
        MARKETING: "MARKETING";
    }>>>;
}, z.core.$strip>;
type PlanLimits = z.infer<typeof planLimitsSchema>;
declare const planSchema: z.ZodObject<{
    tier: z.ZodEnum<{
        SOLO: "SOLO";
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
        modules: z.ZodDefault<z.ZodArray<z.ZodEnum<{
            COMMERCIAL: "COMMERCIAL";
            INVENTORY: "INVENTORY";
            MARKETING: "MARKETING";
        }>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
type Plan = z.infer<typeof planSchema>;
declare const subscriptionSchema: z.ZodObject<{
    id: z.ZodString;
    organizationId: z.ZodString;
    tier: z.ZodEnum<{
        SOLO: "SOLO";
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
        SOLO: "SOLO";
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
/** Consumption against the limits, so the panel never hides the spend (§81). */
declare const usageSummarySchema: z.ZodObject<{
    organizationId: z.ZodString;
    tier: z.ZodEnum<{
        SOLO: "SOLO";
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

export { ACTIVITY_SUBJECTS, ACTIVITY_TYPES, type AIAnswer, type AIConversation, type AIMessage, type AIPrivacyStatus, type AIProviderConfig, type AIProviderKind, type AIRecommendation, type AIResponseType, type AIRetentionPolicy, type AITask, type AIUsage, type AIUsageSummary, AI_PROVIDER_KINDS, AI_RESPONSE_TYPES, AI_RETENTION_POLICIES, AI_TASKS, AUDIT_ACTIONS, type AcquisitionCategory, type Activity, type ActivitySubject, type ActivityType, type ActualPoint, type ApiError, type Archetype, type AskInput, type Assumption, type AuditAction, type AuditEvent, type AuthResponse, type BrandingConfig, type BreakdownItem, type Budget, type BusinessCanvas, type BusinessProfile, type BusinessType, CANVAS_BLOCKS, COLUMN_MATCHES, CONNECTOR_CAPABILITIES, CUSTOMER_STATUSES, type Calculation, type CanvasBlock, type CanvasBlockId, type CanvasEvidence, type Category, type ChangeItem, type CheckoutSession, type ColumnMapping, type ColumnMatch, type Competitor, type ConfirmMappingInput, type ConnectionHealth, type ConnectorCapability, type CreateCheckoutInput, type CreateLeadInput, type CreateOpportunityInput, type Currency, type Customer, type CustomerStatus, DATA_CLASSES, DATA_QUALITY_ISSUE_TYPES, DATA_SOURCE_KINDS, DEFAULT_LOCALE, type DashboardSummary, type DataClass, type DataQualityIssue, type DataQualityIssueType, type DataQualitySummary, type DataSource, type DataSourceKind, type Dataset, type DeclareCanvasBlock, type DeclareCompetitorInput, type Delta, type DiscoveredEntity, type DiscoveredField, type DiscoveredSchema, EXPORT_FORMATS, type Evidence, type EvidenceId, type EvidenceTransaction, type ExportFormat, type ExportRequest, type ExportResult, FORECAST_SCENARIOS, type Forecast, type ForecastPoint, type ForecastScenario, type GenerateReportInput, IMPORT_STATES, IMPORT_TRIGGERS, INSIGHT_TYPES, type Id, type Import, type ImportFilter, type ImportMapping, type ImportPreview, type ImportProgress, type ImportState, type ImportTrigger, type Insight, type InsightFilter, type InsightType, type InsightsResponse, type InviteMemberInput, type IsoDate, type IsoDateTime, type KeyPoint, LEAD_STATUSES, LOCALES, type Lead, type LeadFilter, type LeadStatus, type LineageRef, type Locale, type LoginInput, METRIC_IDS, METRIC_UNITS, type Member, type Membership, type MetricId, type MetricNodeSpec, type MetricQuery, type MetricUnit, type MetricValue, type Money, OPPORTUNITY_STAGES, OVERVIEW_SECTIONS, type Opportunity, type OpportunityStage, type Organization, type OrganizationSettings, type OverviewSection, type OverviewShape, PASSWORD_MIN_LENGTH, PAYMENT_PROVIDERS, PERIOD_GRANULARITIES, PERMISSIONS, PLAN_TIERS, type Paginated, type PaginationQuery, type Partner, type PaymentProviderKind, type Percentage, type Period, type PeriodGranularity, type PeriodRange, type Permission, type PipelineSummary, type Plan, type PlanLimits, type PlanTier, type PreviewRow, type ProfileSignal, type ProfileSignalId, REPORT_SECTION_KINDS, ROLES, ROLE_PERMISSIONS, type Recommendation, type RefreshInput, type Report, type ReportMetadata, type ReportSection, type ReportSectionKind, type RequestPasswordResetInput, type ResetPasswordInput, type Role, SCENARIO_TYPES, SEVERITIES, SUBSCRIPTION_STATUSES, type ScenarioImpact, type ScenarioInput, type ScenarioResult, type ScenarioType, type SessionOrganization, type SessionUser, type SetAcquisitionCost, type Severity, type SignupInput, type Subscription, type SubscriptionStatus, type Supplier, type SyncCursor, TARGET_FIELDS, TRANSACTION_TYPES, type TargetField, type TimeSeriesPoint, type TokenPair, type Transaction, type TransactionFilter, type TransactionType, type UpdateLeadInput, type UpdateOrganizationSettingsInput, type UpsertAIProviderConfigInput, type UsageSummary, type VarianceContribution, type VarianceTree, type WhatChangedResponse, acquisitionCategorySchema, activitySchema, activitySubjectSchema, activityTypeSchema, actualPointSchema, aiAnswerSchema, aiConversationSchema, aiMessageSchema, aiPrivacyStatusSchema, aiProviderConfigSchema, aiProviderKindSchema, aiRecommendationSchema, aiResponseTypeSchema, aiRetentionPolicySchema, aiTaskSchema, aiUsageSchema, aiUsageSummarySchema, apiErrorSchema, archetypeSchema, askInputSchema, assumptionSchema, auditActionSchema, auditEventSchema, authResponseSchema, brandingConfigSchema, breakdownItemSchema, budgetSchema, businessCanvasSchema, businessProfileSchema, businessTypeSchema, calculationSchema, canvasBlockIdSchema, canvasBlockSchema, canvasEvidenceSchema, categorySchema, changeItemSchema, checkoutSessionSchema, columnMappingSchema, columnMatchSchema, competitorSchema, confirmMappingInputSchema, connectionHealthSchema, connectorCapabilitySchema, createCheckoutInputSchema, createLeadInputSchema, createOpportunityInputSchema, currencySchema, customerSchema, customerStatusSchema, dashboardSummarySchema, dataClassSchema, dataQualityIssueSchema, dataQualityIssueTypeSchema, dataQualitySummarySchema, dataSourceKindSchema, dataSourceSchema, datasetSchema, declareCanvasBlockSchema, declareCompetitorInputSchema, deltaSchema, discoveredEntitySchema, discoveredFieldSchema, discoveredSchemaSchema, emailSchema, evidenceIdSchema, evidenceSchema, evidenceTransactionSchema, exportFormatSchema, exportRequestSchema, exportResultSchema, forecastPointSchema, forecastScenarioSchema, forecastSchema, generateReportInputSchema, idSchema, importFilterSchema, importMappingSchema, importPreviewSchema, importProgressSchema, importSchema, importStateSchema, importTriggerSchema, insightFilterSchema, insightSchema, insightTypeSchema, insightsResponseSchema, inviteMemberInputSchema, isoDateSchema, isoDateTimeSchema, keyPointSchema, leadFilterSchema, leadSchema, leadStatusSchema, lineageRefSchema, localeSchema, loginInputSchema, memberSchema, membershipSchema, metricIdSchema, metricNodeSpecSchema, metricQuerySchema, metricUnitSchema, metricValueSchema, moneySchema, opportunitySchema, opportunityStageSchema, organizationSchema, organizationSettingsSchema, overviewSectionSchema, overviewShapeSchema, paginatedSchema, paginationQuerySchema, partnerSchema, passwordSchema, paymentProviderSchema, percentageSchema, periodGranularitySchema, periodRangeSchema, periodSchema, permissionSchema, pipelineSummarySchema, planLimitsSchema, planSchema, planTierSchema, previewRowSchema, profileSignalIdSchema, profileSignalSchema, recommendationSchema, refreshInputSchema, reportMetadataSchema, reportSchema, reportSectionKindSchema, reportSectionSchema, requestPasswordResetInputSchema, resetPasswordInputSchema, roleSchema, scenarioImpactSchema, scenarioInputSchema, scenarioResultSchema, scenarioTypeSchema, sessionOrganizationSchema, sessionUserSchema, setAcquisitionCostSchema, severitySchema, signupInputSchema, subscriptionSchema, subscriptionStatusSchema, supplierSchema, syncCursorSchema, targetFieldSchema, timeSeriesPointSchema, tokenPairSchema, transactionFilterSchema, transactionSchema, transactionTypeSchema, updateLeadInputSchema, updateOrganizationSettingsInputSchema, upsertAIProviderConfigInputSchema, usageSummarySchema, varianceContributionSchema, varianceTreeSchema, whatChangedResponseSchema };
