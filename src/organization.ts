import { z } from 'zod'
import { currencySchema, idSchema, isoDateTimeSchema } from './api.js'
import { localeSchema, roleSchema } from './enums.js'

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

export const organizationSchema = z.object({
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
 * Customizable brand (§8, §101).
 *
 * It is the same piece that supports the product's name change: the frontend's
 * `brand.ts` defines the default and this overrides it per organization.
 * Building for the rename builds the white-label.
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
 * Organization settings.
 *
 * `dataRetentionMonths` and `aiDataProcessingConsent` are not comfort
 * preferences: they are compliance with §76 and the legal basis for sending
 * anything at all to an external AI provider. Without explicit consent, the
 * organization can only use a local provider.
 */
export const organizationSettingsSchema = z.object({
  baseCurrency: currencySchema,
  locale: localeSchema,
  timezone: z.string(),
  fiscalYearStartMonth: z.number().int().min(1).max(12),
  dataRetentionMonths: z.number().int().min(1).max(120).nullable(),
  aiDataProcessingConsent: z.boolean(),
  /** Pseudonymize names when a payroll sheet pattern is detected on ingestion. */
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
