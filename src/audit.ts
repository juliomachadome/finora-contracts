import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'

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
export const auditEventSchema = z.object({
  id: idSchema,
  /** Past-tense verb, dotted: `subscription.changed`, `auth.login`. */
  action: z.string(),
  resourceType: z.string().nullable(),
  resourceId: z.string().nullable(),
  userId: idSchema.nullable(),
  metadata: z.record(z.string(), z.unknown()),
  ipAddress: z.string().nullable(),
  requestId: z.string().nullable(),
  createdAt: isoDateTimeSchema,
})
export type AuditEvent = z.infer<typeof auditEventSchema>
