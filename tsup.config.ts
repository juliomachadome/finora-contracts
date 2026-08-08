import { defineConfig } from 'tsup'

// ESM e CJS ao mesmo tempo porque os dois consumidores diferem: o Next.js do
// finora-web resolve ESM, e o NestJS do finora-back compila para CommonJS.
// Publicar só um formato obrigaria um dos lados a gambiarra de interop.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: true,
  // O zod fica de fora do bundle: se cada consumidor trouxesse a sua cópia
  // embutida, um schema criado aqui falharia o `instanceof` do zod de lá.
  external: ['zod'],
})
