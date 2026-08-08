import { z } from 'zod'
import { idSchema, isoDateTimeSchema, periodSchema } from './api.js'
import { exportFormatSchema, localeSchema } from './enums.js'

/**
 * Relatórios (§44, §45, §46).
 *
 * O Monthly Financial Review é o artefacto que cumpre a promessa vendável:
 * carrega os ficheiros, recebe a revisão mensal de gestão em cinco minutos. É o
 * que substitui as quatro horas que um Finance Manager gasta todos os meses.
 *
 * Entregue no M6 com secções geradas por template — sem IA. A IA chega no M7
 * para redigir a narrativa do que já existe, o que é acréscimo e não requisito.
 */

export const REPORT_SECTION_KINDS = [
  'EXECUTIVE_SUMMARY',
  'REVENUE',
  'EXPENSES',
  'PROFIT',
  'MARGIN',
  'CASH',
  'MAJOR_CHANGES',
  'RISKS',
  'OPPORTUNITIES',
  'RECOMMENDATIONS',
  'EVIDENCE',
  'APPENDIX',
] as const
export const reportSectionKindSchema = z.enum(REPORT_SECTION_KINDS)
export type ReportSectionKind = z.infer<typeof reportSectionKindSchema>

export const reportSectionSchema = z.object({
  kind: reportSectionKindSchema,
  title: z.string(),
  /** Markdown. Por template no M6, redigido pela IA a partir do M7. */
  body: z.string(),
  /** Verdadeiro quando o texto saiu de um modelo — o PDF marca-o. */
  aiGenerated: z.boolean(),
})
export type ReportSection = z.infer<typeof reportSectionSchema>

/**
 * Metadados de reprodutibilidade (§46).
 *
 * Sem isto, reimprimir o relatório de Julho depois de alguém corrigir um
 * ficheiro dá outro número, e ninguém consegue dizer qual estava certo. Num
 * documento que vai para um banco ou um conselho, é a diferença entre relatório
 * e rascunho.
 */
export const reportMetadataSchema = z.object({
  organizationId: idSchema,
  period: periodSchema,
  datasetVersion: z.number().int(),
  metricsVersion: z.string(),
  aiProvider: z.string().nullable(),
  aiModel: z.string().nullable(),
  promptVersion: z.string().nullable(),
  locale: localeSchema,
  generatedAt: isoDateTimeSchema,
  generatedByUserId: idSchema,
})
export type ReportMetadata = z.infer<typeof reportMetadataSchema>

export const reportSchema = z.object({
  id: idSchema,
  organizationId: idSchema,
  title: z.string(),
  period: periodSchema,
  sections: z.array(reportSectionSchema),
  metadata: reportMetadataSchema,
  createdAt: isoDateTimeSchema,
})
export type Report = z.infer<typeof reportSchema>

export const generateReportInputSchema = z.object({
  period: periodSchema,
  locale: localeSchema.optional(),
  /** Sem IA gera as secções por template — o comportamento do M6. */
  useAI: z.boolean().default(false),
})
export type GenerateReportInput = z.infer<typeof generateReportInputSchema>

export const exportRequestSchema = z.object({
  format: exportFormatSchema,
  locale: localeSchema.optional(),
})
export type ExportRequest = z.infer<typeof exportRequestSchema>

/**
 * Ficheiro exportado.
 *
 * URL assinado e de vida curta, servido de fora do domínio da aplicação — um
 * relatório financeiro acessível por link permanente seria fuga com aparência de
 * funcionalidade.
 */
export const exportResultSchema = z.object({
  url: z.string().url(),
  fileName: z.string(),
  expiresAt: isoDateTimeSchema,
})
export type ExportResult = z.infer<typeof exportResultSchema>
