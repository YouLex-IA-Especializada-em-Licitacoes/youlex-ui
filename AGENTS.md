# AGENTS.md — youlex-ui

`youlex-ui` é o fork YouLex do [beautiful-ui](https://github.com/slev12397/beautiful-ui)
(MIT, © Shane Levine — ver `LICENSE`). Nasceu na YLX-191 como repositório vazio de conteúdo
próprio: os componentes ainda são os do upstream, sem tokens/ícones da YouLex. Portar isso é
trabalho de outras issues (YLX-192/193/194/195/196), não deste arquivo.

## Estrutura

- `components/primitives/` — os blocos que aparecem na galeria (`/`) com card próprio: um
  cenário completo (ex.: `ChatComposer.tsx`, `DiffTable.tsx`, `RecordsTable.tsx`). Cada primitive
  é **um arquivo self-contained**: markup + estado + estilos específicos, sem depender de um
  componente irmão fora da lista de `deps` declarada no registry.
- `components/atoms/` — peças menores, reaproveitadas por mais de um primitive e **sem card
  próprio na galeria** (ex.: `Button.tsx`, `EntityChip.tsx`, `Shimmer.tsx`, `GlideMenu.tsx`).
  Se você está extraindo um pedaço de um primitive porque dois componentes vão precisar dele,
  o destino é `atoms/`, não um novo primitive.
- `components/site/` — chrome do próprio site (harness, tema, nav) — não entra no registry.
- `app/harness/` — os primitives compostos numa tela de agente funcional. Ao adicionar um
  primitive novo, considere se ele deveria aparecer aqui também.
- `app/license/page.tsx` — **lê `LICENSE` em build time**. Não mova nem renomeie o arquivo
  sem atualizar esse import.

## Como um componente entra no registry

O registry (`public/r/*.json`, consumido via `npx shadcn add`) é **gerado**, nunca escrito à
mão — `scripts/build-registry.mjs` monta cada entrada a partir de:

1. **`INTERNAL`** — atoms/blocos sem card próprio, listados por id (`button`, `glide-menu`, …).
2. **`PRIMITIVES`** — um array de tuplas `[id, título, arquivo, deps internas, deps npm, css extra?]`
   para cada primitive com card na galeria.
3. **`lib/meta.ts`** — a legenda (`caption`) de cada primitive, usada na galeria e no registry.
4. **`app/globals.css`** — dividido em três fatias pelo script: a fundação genérica (tokens,
   `@theme`, keyframes compartilhados) e dois blocos grandes específicos de um componente
   (sidebar e records-table) que só entram na entrada daquele primitive.

**Para adicionar um primitive**: crie o arquivo em `components/primitives/`, adicione a legenda
em `lib/meta.ts`, adicione a tupla em `PRIMITIVES` no `build-registry.mjs` (deps internas apontam
para chaves de `INTERNAL` ou outros ids de `PRIMITIVES`), e rode `bun run registry`
(`node scripts/build-registry.mjs`) para regerar `public/r/*.json`. `bun run build` roda o
mesmo passo antes do `next build`.

**Para adicionar um atom**: crie o arquivo em `components/atoms/`, e só entre em `INTERNAL` se
outro primitive for referenciá-lo como dependência do registry.

CSS que pertence a um único componente (não à fundação) vai num bloco marcado
`COMPONENT-SPECIFIC` em `app/globals.css`, na faixa de linhas que o script já fatia — hoje só
sidebar e records-table têm bloco próprio; um novo componente com CSS pesado o bastante para
merecer isolamento segue o mesmo padrão (adicionar uma nova fatia com `slice(a, b)` e referenciá-la
na tupla de `PRIMITIVES`).

## Tema / tokens

Tudo vem de `app/globals.css`: tokens `oklch()` em `:root` (light) e sob `.dark` (dark), consumidos
via `@theme` do Tailwind 4 — não há arquivo `tokens.ts` separado. Componentes leem cor por classe
utilitária (`bg-[var(--surface)]`, etc.) ou pelas classes semânticas que o `@theme` expõe. Trocar a
paleta para a identidade da YouLex (YLX-192+) é editar os valores em `:root`/`.dark`, não o
markup dos componentes.

## Ícones

Todo ícone do repositório vem de `lucide-react` (YLX-195; substituiu `iconoir-react` e
`@central-icons-react/*`, removidos do `package.json`). Convenção de `strokeWidth`:

- `SidebarNav.tsx` usa o `strokeWidth` padrão do lucide (`2`) — igual ao peso do
  `@central-icons-react/round-outlined-radius-2-stroke-2` que ele substituiu.
- `SelectionActions.tsx` fixa `strokeWidth={1.8}` nos ícones regulares e `strokeWidth={2.4}`
  no ícone de enviar (`send`), preservando o traço mais fino do `iconoir-react` original —
  com o `2` padrão do lucide os ícones dessa barra ficavam visualmente mais pesados que o
  resto do harness.

Um componente novo com ícones deve conferir o peso visual ao lado dos primitives vizinhos no
harness antes de aceitar o `strokeWidth` padrão do lucide.

## Lint e build

- `bun run lint` — `eslint .` (flat config em `eslint.config.mjs`, eslint 9 + typescript-eslint +
  eslint-plugin-react + eslint-plugin-react-hooks + `@next/eslint-plugin-next`). Algumas regras
  novas do `eslint-plugin-react-hooks@7` (`set-state-in-effect`, `refs`) e duas de
  `@typescript-eslint` (`no-unused-expressions`, `triple-slash-reference`) estão como `warn`
  porque pegam padrões pré-existentes do upstream — não é para silenciá-las globalmente ao
  portar um componente novo, só para não travar o CI num repo recém-nascido.
- `bun run build` — regenera o registry e roda `next build`.
- `bun run registry` — só a regeneração do registry, sem build do Next.

## CI

`.github/workflows/ci.yml` roda lint + build em toda PR/push para `develop`/`main`. **A conta da
org está com o GitHub Actions bloqueado por faturamento** (YLX-181) — o workflow vai reprovar em
1–3s sem executar nada até isso ser resolvido. Prove localmente (`bun run lint && bun run build`)
e cole a saída no PR/relatório enquanto isso não muda.
