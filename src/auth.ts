import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'
import { localeSchema, roleSchema, permissionSchema } from './enums.js'

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
export const PASSWORD_MIN_LENGTH = 12
export const passwordSchema = z
  .string()
  .min(PASSWORD_MIN_LENGTH, `mínimo de ${PASSWORD_MIN_LENGTH} caracteres`)
  .max(200)

export const emailSchema = z.string().email().toLowerCase().trim()

export const signupInputSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z.string().min(1).max(120).trim(),
  /** Created in the same step: an account without an organization does nothing. */
  organizationName: z.string().min(1).max(160).trim(),
  locale: localeSchema.optional(),
  acceptedTermsAt: isoDateTimeSchema,
})
export type SignupInput = z.infer<typeof signupInputSchema>

export const loginInputSchema = z.object({
  email: emailSchema,
  password: z.string().min(1),
})
export type LoginInput = z.infer<typeof loginInputSchema>

export const refreshInputSchema = z.object({
  refreshToken: z.string().min(1),
})
export type RefreshInput = z.infer<typeof refreshInputSchema>

export const requestPasswordResetInputSchema = z.object({
  email: emailSchema,
})
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetInputSchema>

export const resetPasswordInputSchema = z.object({
  token: z.string().min(1),
  password: passwordSchema,
})
export type ResetPasswordInput = z.infer<typeof resetPasswordInputSchema>

/**
 * Token pair.
 *
 * The refresh is rotating: each use issues a new one and invalidates the
 * previous. If an already used token reappears, it is a sign that it was stolen
 * — in that case the whole token family of that session falls, not just the
 * repeated one.
 */
export const tokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  /** Seconds until the access expires. The client renews before, not after failing. */
  expiresIn: z.number().int().positive(),
})
export type TokenPair = z.infer<typeof tokenPairSchema>

export const sessionOrganizationSchema = z.object({
  id: idSchema,
  name: z.string(),
  slug: z.string(),
  role: roleSchema,
  permissions: z.array(permissionSchema),
  baseCurrency: z.string().length(3),
})
export type SessionOrganization = z.infer<typeof sessionOrganizationSchema>

/**
 * Session user.
 *
 * Never carries a password hash, tokens nor any S3 field — this object goes to
 * the frontend and into the client state.
 */
export const sessionUserSchema = z.object({
  id: idSchema,
  email: emailSchema,
  name: z.string(),
  locale: localeSchema,
  organizations: z.array(sessionOrganizationSchema),
  currentOrganizationId: idSchema.nullable(),
})
export type SessionUser = z.infer<typeof sessionUserSchema>

export const authResponseSchema = z.object({
  user: sessionUserSchema,
  tokens: tokenPairSchema,
})
export type AuthResponse = z.infer<typeof authResponseSchema>
