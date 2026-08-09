import { defineConfig } from 'tsup'

// ESM e CJS ao mesmo tempo porque os dois consumidores diferem: o Next.js do
// praestat-web resolve ESM, e o NestJS do praestat-back compila para CommonJS.
// Publicar só um formato obrigaria um dos lados a gambiarra de interop.
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  // Sem sourcemap de propósito: o `dist/` é versionado, e um mapa que embuta
  // caminhos da máquina que o gerou faria o gate de sincronia do CI falhar
  // sempre, por diferença que não é de conteúdo.
  sourcemap: false,
  clean: true,
  treeshake: true,
  // O zod fica de fora do bundle: se cada consumidor trouxesse a sua cópia
  // embutida, um schema criado aqui falharia o `instanceof` do zod de lá.
  external: ['zod'],
})
