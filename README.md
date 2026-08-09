# praestat-contracts

Schemas [Zod](https://zod.dev) e tipos partilhados entre `praestat-back` (NestJS) e
`praestat-web` (Next.js).

## Porque existe

Os dois consumidores vivem em repositórios separados. Sem uma fonte única, o
backend muda um campo, o frontend continua a ler o antigo, e o erro só aparece em
produção. Com este pacote, o `typecheck` dos dois apanha-o no CI.

## Porque é público

Não por transparência, por necessidade técnica: o Vercel e o Railway clonam
apenas o repositório da aplicação, e o token da integração deles não alcança um
segundo repositório privado. Uma dependência git privada faria o
`pnpm install` falhar em todas as pipelines.

São descrições de formatos de dados — sem segredos, sem lógica de negócio, sem
algoritmo. As aplicações continuam privadas.

## Uso

```bash
pnpm add "@praestat/contracts@github:juliomachadome/praestat-contracts#v0.3.0"
```

```ts
import { moneySchema, type Transaction } from '@praestat/contracts'

const amount = moneySchema.parse({ amountCents: 124_000, currency: 'EUR' })
```

## Regras

- **Zero dependências além do zod.** É consumido por um Next.js e por um NestJS;
  qualquer coisa específica de um quebra o outro.
- **Sem lógica de negócio.** Descreve formas, não decide nada.
- **Tipos derivados dos schemas** com `z.infer`, nunca escritos à mão — assim não
  há hipótese de o tipo e a validação divergirem.
- **Dinheiro é sempre cêntimos inteiros.** Vírgula flutuante não representa 0,1
  exactamente, e a soma de dez mil linhas acumula erro que aparece como cêntimos
  a faltar num relatório assinado.

## Alterar um contrato

1. Mudar o schema **e o teste**
2. `pnpm verify`
3. `pnpm build` e commit do `dist/` — é versionado, ver abaixo
4. Tag nova (`v0.2.0`) e push
5. **Actualizar a dependência nos dois repositórios no mesmo commit** — subir só
   um lado envia uma incompatibilidade para produção

## Porque o `dist/` está no repositório

O pnpm 11 bloqueia scripts de instalação de dependências git, e a chave de
autorização inclui o SHA do commit, que muda a cada tag. Entregar o build já feito
evita isso e faz com que nenhum script corra na instalação dos consumidores.

O CI reconstrói e compara: se o `dist/` estiver desactualizado face ao `src/`, a
pipeline reprova.

## Comandos

```bash
pnpm build      # tsup → ESM + CJS + .d.ts
pnpm verify     # typecheck + lint + testes
pnpm test       # vitest em watch
```
