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
export const competitorSchema = z.object({
  id: idSchema,
  name: z.string(),
  /** Cheaper, larger, a niche, an incumbent — free text, in their words. */
  positioning: z.string().nullable(),
  priceCents: z.number().int().nonnegative().nullable(),
  priceCurrency: currencySchema.nullable(),
  /** What the price buys: "por utilizador/mês", "por projecto". */
  priceUnit: z.string().nullable(),
  notes: z.string().nullable(),
  /**
   * What an answer cites when it quotes this row: `declared:competitor:<id>`.
   *
   * Built by the server and sent, rather than assembled by whoever reads it.
   * A format two sides both know how to build is a format that eventually only
   * one of them changes.
   */
  evidenceId: z.string(),
  declaredBy: z.string().nullable(),
  declaredAt: isoDateTimeSchema,
})
export type Competitor = z.infer<typeof competitorSchema>

/**
 * Declaring or correcting one.
 *
 * The name is the key: writing is an upsert on it, so two people adding the
 * same competitor on the same morning leave one row and not two. Everything
 * else is optional, because a competitor whose price nobody knows yet is still
 * worth writing down.
 */
export const declareCompetitorInputSchema = z.object({
  name: z.string().trim().min(1).max(120),
  positioning: z.string().trim().max(280).nullable().optional(),
  priceCents: z.number().int().nonnegative().nullable().optional(),
  priceCurrency: currencySchema.nullable().optional(),
  priceUnit: z.string().trim().max(60).nullable().optional(),
  notes: z.string().trim().max(2_000).nullable().optional(),
})
export type DeclareCompetitorInput = z.infer<typeof declareCompetitorInputSchema>
