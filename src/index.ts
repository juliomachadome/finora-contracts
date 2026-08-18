/**
 * @praestat/contracts
 *
 * Zod schemas and types shared between `praestat-back` and `praestat-web`.
 *
 * Exists because the two live in separate repositories: without a single source,
 * the backend changes a field, the frontend carries on reading the old one, and
 * the error only shows up in production. Here the `typecheck` of both catches it
 * in CI.
 *
 * Rules of this package:
 *
 *   - **Zero dependencies beyond zod.** It is consumed by a Next.js and by a
 *     NestJS; anything specific to one of them breaks the other.
 *   - **No business logic.** Describes data shapes, decides nothing. It is also
 *     what allows this repository to be public without exposing anything.
 *   - **Types derived from the schemas**, never written by hand — that way there
 *     is no chance of the type and the validation diverging.
 *
 * Versioned by tag. When changing a contract, bump the tag and update the
 * dependency **in both repositories in the same commit**: bumping only one side
 * sends an incompatibility to production.
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
