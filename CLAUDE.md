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

## `dist/` é versionado — e tem de continuar a ser

Parece errado e não é. O pnpm 11 bloqueia scripts de instalação de dependências
vindas de git, e a chave de autorização que exige inclui **o SHA do commit**:

```
allowBuilds:
  "@finora/contracts@https://codeload.github.com/.../tar.gz/e7f9c9b...": true
```

Esse SHA muda a cada tag. Cada bump de contratos obrigaria os dois consumidores a
actualizar um allowlist opaco, e antes disso o build falharia no Vercel, no
Railway e no CI — que é exactamente o cenário que este pacote existe para evitar.

Entregar o build já feito remove o problema por inteiro, e de caminho melhora a
postura de supply-chain: nenhum script corre na instalação dos consumidores.

**Consequência prática: ao mudar um schema, corra `pnpm build` e faça commit do
`dist/`.** Se esquecer, o CI reconstrói, compara e reprova — o risco de os
consumidores receberem o contrato antigo com o número de versão novo é silencioso
de mais para depender de disciplina.

Os sourcemaps estão desligados de propósito: um mapa que embuta os caminhos da
máquina que o gerou faria esse gate falhar sempre, por diferença que não é de
conteúdo.

## Outras notas de infraestrutura

- `pnpm-workspace.yaml` autoriza o `esbuild` a correr o `postinstall` **neste**
  repositório (precisa do binário nativo para o tsup e o vitest). Isso não afecta
  quem consome o pacote.
