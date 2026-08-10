/**
 * @praestat/contracts
 *
 * Schemas Zod e tipos partilhados entre `praestat-back` e `praestat-web`.
 *
 * Existe porque os dois vivem em repositórios separados: sem uma fonte única, o
 * backend muda um campo, o frontend continua a ler o antigo, e o erro só aparece
 * em produção. Aqui o `typecheck` de ambos apanha-o no CI.
 *
 * Regras deste pacote:
 *
 *   - **Zero dependências além do zod.** É consumido por um Next.js e por um
 *     NestJS; qualquer coisa específica de um deles quebra o outro.
 *   - **Sem lógica de negócio.** Descreve formas de dados, não decide nada. É
 *     também o que permite este repositório ser público sem expor nada.
 *   - **Tipos derivados dos schemas**, nunca escritos à mão — assim não há
 *     hipótese de o tipo e a validação divergirem.
 *
 * Versionado por tag. Ao mudar um contrato, subir a tag e actualizar a
 * dependência **nos dois repositórios no mesmo commit**: subir só um lado envia
 * uma incompatibilidade para produção.
 */

export * from './enums.js'
export * from './api.js'
export * from './audit.js'
export * from './auth.js'
export * from './organization.js'
export * from './datasource.js'
export * from './ingestion.js'
export * from './financial.js'
export * from './commercial.js'
export * from './metrics.js'
export * from './evidence.js'
export * from './insight.js'
export * from './ai.js'
export * from './scenario.js'
export * from './report.js'
export * from './billing.js'
