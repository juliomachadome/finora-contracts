import { z } from 'zod'
import { idSchema, isoDateTimeSchema } from './api.js'

/**
 * O registo de auditoria (§77).
 *
 * Append-only do lado do servidor: este contrato só descreve leitura, e é de
 * propósito que não existe schema de escrita nem de alteração — um registo que
 * se pode editar não é prova, e é como prova que ele existe.
 *
 * O `metadata` nunca transporta valores sensíveis: guarda o suficiente para
 * reconstruir o quê, quem e quando. Um registo que precise de ser tratado como
 * confidencial não se pode entregar a um auditor, o que anula a razão de existir.
 */
export const auditEventSchema = z.object({
  id: idSchema,
  /** Verbo no passado, com pontos: `subscription.changed`, `auth.login`. */
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
