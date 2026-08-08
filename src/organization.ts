import { z } from 'zod'
import { currencySchema, idSchema, isoDateTimeSchema } from './api.js'
import { localeSchema, roleSchema } from './enums.js'

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

export const organizationSchema = z.object({
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
  createdAt: isoDateTimeSchema,
})
export type Organization = z.infer<typeof organizationSchema>

export const membershipSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  userId: idSchema,
  role: roleSchema,
  createdAt: isoDateTimeSchema,
})
export type Membership = z.infer<typeof membershipSchema>

export const memberSchema = z.object({
  id: idSchema,
  userId: idSchema,
  name: z.string(),
  email: z.string(),
  role: roleSchema,
  createdAt: isoDateTimeSchema,
  lastActiveAt: isoDateTimeSchema.nullable(),
})
export type Member = z.infer<typeof memberSchema>

export const partnerSchema = z.object({
  id: idSchema,
  name: z.string(),
  slug: z.string(),
  createdAt: isoDateTimeSchema,
})
export type Partner = z.infer<typeof partnerSchema>

/**
 * Marca personalizável (§8, §101).
 *
 * É a mesma peça que suporta a mudança de nome do produto: o `brand.ts` do
 * frontend define o padrão e isto sobrepõe-o por organização. Construir para o
 * rename constrói o white-label.
 */
export const brandingConfigSchema = z.object({
  productName: z.string().max(60).nullable(),
  logoUrl: z.string().url().nullable(),
  faviconUrl: z.string().url().nullable(),
  primaryColor: z
    .string()
    .regex(/^#[0-9a-fA-F]{6}$/, 'cor tem de ser hexadecimal, ex. #1a1a1a')
    .nullable(),
  customDomain: z.string().nullable(),
})
export type BrandingConfig = z.infer<typeof brandingConfigSchema>

/**
 * Definições de organização.
 *
 * `dataRetentionMonths` e `aiDataProcessingConsent` não são preferências de
 * conforto: são o cumprimento do §76 e a base legal para enviar seja o que for a
 * um provider de IA externo. Sem consentimento explícito, a organização só pode
 * usar provider local.
 */
export const organizationSettingsSchema = z.object({
  baseCurrency: currencySchema,
  locale: localeSchema,
  timezone: z.string(),
  fiscalYearStartMonth: z.number().int().min(1).max(12),
  dataRetentionMonths: z.number().int().min(1).max(120).nullable(),
  aiDataProcessingConsent: z.boolean(),
  /** Pseudonimizar nomes ao detectar padrão de folha de salários na ingestão. */
  pseudonymizePayroll: z.boolean(),
  branding: brandingConfigSchema.nullable(),
})
export type OrganizationSettings = z.infer<typeof organizationSettingsSchema>

export const updateOrganizationSettingsInputSchema = organizationSettingsSchema.partial()
export type UpdateOrganizationSettingsInput = z.infer<
  typeof updateOrganizationSettingsInputSchema
>

export const inviteMemberInputSchema = z.object({
  email: z.string().email().toLowerCase().trim(),
  role: roleSchema,
})
export type InviteMemberInput = z.infer<typeof inviteMemberInputSchema>
