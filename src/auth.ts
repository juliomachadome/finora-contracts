import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'
import { localeSchema, roleSchema, permissionSchema } from './enums.js'

/**
 * Autenticação — JWT próprio, sem dependência de fornecedor.
 *
 * O §7.4 exige modo on-premise e o §113 proíbe o domínio conhecer Supabase.
 * Autenticação delegada a um SaaS quebraria os dois no ponto mais difícil de
 * mudar depois, que é a identidade.
 */

/**
 * Política de password.
 *
 * Comprimento mínimo a sério em vez do teatro de "uma maiúscula e um símbolo":
 * as regras de composição empurram para `Password1!` e o NIST desaconselha-as há
 * anos. O que protege é comprimento e não ser uma password conhecida — a
 * verificação contra listas de fugas acontece no servidor, onde há como consultar.
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
  /** Criada no mesmo passo: uma conta sem organização não faz nada. */
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
 * Par de tokens.
 *
 * O refresh é rotativo: cada uso emite um novo e invalida o anterior. Se um
 * token já usado reaparecer, é sinal de que foi roubado — nesse caso cai toda a
 * família de tokens daquela sessão, não só o repetido.
 */
export const tokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  /** Segundos até o access expirar. O cliente renova antes, não depois de falhar. */
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
 * Utilizador da sessão.
 *
 * Nunca transporta hash de password, tokens nem qualquer campo S3 — este objecto
 * vai para o frontend e para o estado do cliente.
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
