import { defineConfig } from 'tsup'

// ESM and CJS at the same time because the two consumers differ: praestat-web's
// Next.js resolves ESM, and praestat-back's NestJS compiles to CommonJS.
// Publishing a single format would force an interop hack on one of the sides.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  // No sourcemap, deliberately: `dist/` is versioned, and a map embedding the
  // paths of the machine that generated it would make the CI sync gate fail
  // every time, over a difference that is not one of content.
  sourcemap: false,
  clean: true,
  treeshake: true,
  // zod stays out of the bundle: if each consumer brought its own embedded
  // copy, a schema created here would fail the `instanceof` of the zod there.
  external: ['zod'],
})
