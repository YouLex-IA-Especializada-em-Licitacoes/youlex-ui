# Política de sincronização com o upstream

`youlex-ui` é fork de [`slev12397/beautiful-ui`](https://github.com/slev12397/beautiful-ui)
(branch `main`, MIT). O remote `upstream` aponta para lá:

```
git remote add upstream https://github.com/slev12397/beautiful-ui.git
```

## Cadência

**Sob demanda, não agendada.** Este não é um pacote que a YouLex consome como dependência
externa — é o ponto de partida de um design system que vai divergir rapidamente (tokens, ícones,
convenções próprias, YLX-192 em diante). Puxar upstream automaticamente arrisca reintroduzir
componentes já portados/alterados por cima do trabalho da casa.

Puxe do upstream quando:
- Um primitive/atom que a YouLex **ainda não portou** ganhar uma correção de bug relevante lá.
- Aparecer um primitive novo no upstream que valha a pena avaliar para o backlog do épico
  YLX-183.

**Não puxe** para um componente que já foi portado para os tokens/convenções da YouLex — nesse
ponto o componente é nosso, e merge de upstream por cima é regressão, não atualização.

## Quem decide

Quem abrir o card de portar/atualizar um componente específico decide se vale puxar upstream
para aquele componente, e registra a decisão no PR (`git log` do upstream naquele arquivo, o que
mudou, por que vale ou não trazer). Não há sync automático nem responsável fixo — decisão é por
componente, no momento em que alguém está mexendo nele.

## Como puxar (quando decidido)

```
git fetch upstream
git log upstream/main -- <arquivo>          # ver o que mudou lá
git diff main upstream/main -- <arquivo>    # comparar com o que temos
# trazer manualmente (cherry-pick ou edição direta) o que fizer sentido,
# nunca merge/rebase cego de upstream/main inteiro
```

`LICENSE` e a atribuição ao autor original (Shane Levine) não são negociáveis: preservar sempre,
independentemente de quanto o código divergir.
