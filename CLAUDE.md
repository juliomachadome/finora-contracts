# finora-contracts

Schemas Zod e tipos partilhados entre `finora-back` e `finora-web`.

Antes de mexer aqui, leia o `CLAUDE.md` da raiz do workspace.

## O que este pacote é

Uma descrição de **formas de dados**. Nada mais.

- **Zero dependências além do zod.** É consumido por um Next.js e por um NestJS;
  qualquer coisa específica de um quebra o outro.
- **Sem lógica de negócio.** Não decide, não calcula, não valida regras de
  domínio — só formatos. É também o que permite este repositório ser público sem
  expor nada.
- **Sem `import` de nada do backend ou do frontend.** A dependência é sempre
  numa direcção.

## Regras de escrita

**Tipos derivados dos schemas**, sempre:

```ts
export const fooSchema = z.object({ ... })
export type Foo = z.infer<typeof fooSchema>   // ✓
```

Nunca uma `interface Foo` escrita à mão ao lado do schema — divergem na primeira
alteração distraída, e o tipo passa a mentir sobre o que a validação aceita.

**Dinheiro é sempre cêntimos inteiros.** Vírgula flutuante não representa 0,1
exactamente; numa soma de dez mil linhas o erro acumula e aparece como cêntimos a
faltar num relatório assinado por um CFO. Num produto cuja promessa é "podes
conferir tudo", isso é fatal. A formatação para humano acontece só na fronteira
de apresentação, com `Intl`.

**Nada que transporte segredo.** Nenhum schema devolvido ao frontend pode ter
hash de password, token, chave de API ou credencial. Chaves aparecem sempre
mascaradas (`apiKeyMask`), nunca em claro.

**Comentar o porquê, não o quê.** `// id da organização` não acrescenta nada;
explicar por que `changePercent` é anulável, sim.

## Comandos

```bash
pnpm verify     # typecheck + lint + testes — o gate
pnpm build      # tsup → ESM + CJS + .d.ts
pnpm test       # vitest em watch
```

## Alterar um contrato

1. Mudar o schema **e o teste**
2. `pnpm verify`
3. Commit e tag nova (`v0.2.0`)
4. **Actualizar a dependência nos dois repositórios no mesmo commit**

O passo 4 não é opcional. Subir a versão só de um lado envia uma
incompatibilidade de contrato para produção, e é precisamente o risco que
justifica este pacote existir.

## Notas de infraestrutura

- `prepare` corre o build. É o hook que uma dependência instalada por git executa
  — `prepublishOnly` não corre nesse caso, e o `dist/` chegaria vazio aos
  consumidores.
- `pnpm-workspace.yaml` autoriza o `esbuild` a correr o `postinstall`. O pnpm 11
  bloqueia scripts por omissão; sem esta autorização o tsup e o vitest não
  arrancam, local e no CI.
