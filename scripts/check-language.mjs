#!/usr/bin/env node
/**
 * The code is written in English. Only product copy is not.
 *
 * ## Why this is a check and not a convention
 *
 * Because a convention is remembered and a check is obliged. This one was a
 * convention for eleven milestones, and by the twelfth there were forty-one
 * Portuguese comments, sixteen Portuguese error messages and a Prisma schema
 * documenting its own columns in two languages — none of it deliberate, all of
 * it the result of somebody writing the way they were thinking.
 *
 * ## Why it matters beyond tidiness
 *
 * A comment explains *why*, and it is read by whoever inherits the file — which
 * includes contributors who do not read Portuguese, and includes every language
 * model that will ever be asked about this codebase. A `DomainError` message is
 * read by developers: the frontend translates by **code**, and an unmapped code
 * shows a generic sentence, so the server's own wording never reaches a user.
 * Writing it in Portuguese buys nothing and costs a reader.
 *
 * ## What is deliberately allowed
 *
 * Product copy — the text of the monthly report, the glossary, the downloadable
 * template, the rules handed to the model. Those files are the backend's
 * `messages/`: they exist to be read by a Portuguese-speaking customer, and
 * translating them to English would be translating the product.
 *
 * Test **data** is allowed anywhere: `'Avença Dezembro'` is a fixture that
 * exercises the accent handling, not prose. What is not allowed is a test
 * **description** in Portuguese, which is why the check reads `it(` and
 * `describe(` lines specifically.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = new URL('..', import.meta.url).pathname

/**
 * Files whose whole purpose is text a customer reads.
 *
 * Kept short and justified one by one. A growing allowlist is this check
 * turning back into a convention.
 */
/**
 * Empty, and it should stay empty.
 *
 * This package is shapes. It has no product copy at all — nothing here is ever
 * read by a customer, and a validation message travels to the frontend as
 * `details` keyed by field, where it is either translated or shown to a
 * developer. Two of them were in Portuguese beside dozens in English, which is
 * how a convention looks from the inside.
 */
const COPY = []

const EXTENSIONS = ['.ts']
const IGNORED = ['node_modules', 'dist', 'coverage', '.git', 'scripts', 'migrations']

/** Accented characters that do not occur in English. `ü` and `ñ` are not here on purpose. */
const ACCENTS = /[ãõçáéíóúâêôàÃÕÇÁÉÍÓÚÂÊÔÀ]/

const files = []
const walk = (dir) => {
  for (const entry of readdirSync(dir)) {
    if (IGNORED.includes(entry)) continue
    const full = join(dir, entry)
    if (statSync(full).isDirectory()) walk(full)
    else if (EXTENSIONS.some((ext) => entry.endsWith(ext))) files.push(full)
  }
}
walk(join(ROOT, 'src'))

const problems = []

for (const file of files) {
  const path = relative(ROOT, file)
  if (COPY.includes(path)) continue

  readFileSync(file, 'utf8')
    .split('\n')
    .forEach((line, index) => {
      if (!ACCENTS.test(line)) return

      // A spec file's accents are fixtures — a customer called "Avença", a
      // salary line, a header with a cedilla. The subject of a test is data.
      const isSpec = path.endsWith('.spec.ts') || path.endsWith('.test.ts')

      const trimmed = line.trim()
      const kind = kindOf(trimmed)
      if (kind === 'error message' && isSpec) return
      if (!kind) return

      problems.push({ path, line: index + 1, kind, text: trimmed.slice(0, 90) })
    })
}

/**
 * What kind of Portuguese this is, or `null` when it is allowed.
 *
 * ## Quoting Portuguese is not writing in Portuguese
 *
 * An English comment that says `"linha" appears in "número de linha"` is doing
 * its job: the subject **is** a Portuguese header. The first version of this
 * check flagged nine of those and would have taught everybody to add an
 * exception rather than write English — which is how a check becomes noise.
 *
 * So quoted spans are removed from prose before it is judged, and only what is
 * left counts. An error message is the opposite case: the accent is inside the
 * quotes, because the quotes are the message.
 */
function kindOf(line) {
  const unquoted = line.replace(/(['"`])(?:\\.|(?!\1)[^\\])*\1/g, '')

  if (/^(\/\/|\*|\/\*|\/\/\/)/.test(line)) {
    return ACCENTS.test(unquoted) ? 'comment' : null
  }

  if (/^(it|describe|test)\(/.test(line)) {
    return ACCENTS.test(unquoted) ? 'test name' : null
  }

  /*
   * A `DomainError` message is developer-facing.
   *
   * The frontend translates by **code** and shows a generic sentence for a code
   * it does not know, so the server's own wording never reaches a user. Writing
   * it in Portuguese buys nothing and costs whoever reads the stack trace.
   *
   * Spec files are excluded: an error asserted in a test is fixture data.
   */
  /*
   * Any accented string literal, because this package has no copy.
   *
   * A Zod message, a regex description, an example in a JSDoc tag: all of them
   * are read by a developer or translated by the frontend, and none of them is
   * text a customer sees. The looser rules the backend needs do not apply where
   * there is nothing to exempt.
   */
  if (ACCENTS.test(line)) return 'string'

  return null
}

if (problems.length === 0) {
  console.log(`check:language ✓  ${files.length} files, code in English`)
  process.exit(0)
}

console.error(`check:language ✗  ${problems.length} line(s) of Portuguese outside product copy\n`)
for (const problem of problems) {
  console.error(`  ${problem.path}:${problem.line}  [${problem.kind}]  ${problem.text}`)
}
console.error(
  '\nComments, test names and error messages are written in English. Text a customer reads ' +
    'lives in the copy files listed at the top of this script.',
)
process.exit(1)
