# 03 · Padrões de Página, Dados e Feedback

Regras estruturais para tudo que vive dentro de `<main id="main-content">`.

---

## 1. Cabeçalho Padrão de Página (`PageHeader`) & Padrão de Data

Toda página interna começa com cabeçalho enxuto e data padronizada:
- **Esquerda (`min-w-0`):**
  - `<h1>` em `text-h1` (`32px / 40px · Figtree 300 · tracking -0.025em`) ou `text-h2` (`24px`) em sub-telas densas de tabela.
  - **Saudação vs Operacional:** duas variações oficiais de `Início`:
    - **Saudação pessoal** (**Monno**, **NYOT**): `<h1>Olá, {primeiroNome}</h1>` com eyebrow da data logo abaixo (`mt-1.5`).
    - **Operacional direto** (**Cronos**, consoles **B2B**): eyebrow da data diretamente no topo do painel operacional ao vivo (sem `Olá`).
  - **Formato canônico de data no cabeçalho:** `WeekdaySemFeira, D de mês` — dia da semana natural sem `"-feira"` (`Domingo`, `Segunda`, `Terça`, `Quarta`, `Quinta`, `Sexta`, `Sábado`), dia sem zero à esquerda (`1`–`31`) e mês completo em minúsculas (`janeiro`..`dezembro`), ex.: **`Terça, 24 de novembro`**.
  - **Estilo visual da data:** sempre em eyebrow tipográfico (`.label-ui` / `.label-mono` / `.t-eyebrow` com `.num`: `Figtree 11px 500 uppercase tracking-[0.12em] text-fg-3`), exibindo **`TERÇA, 24 DE NOVEMBRO`**.
  - Datas compactas dentro de tabelas, gráficos e badges continuam abreviadas (`24 nov` ou `24/11`).
- **Direita (`flex items-center gap-2 shrink-0`):**
  - Filtros (`FilterBar`), alternadores de visão (`SegmentedControl`) e **no máximo 1 ação primária (`Button variant="primary"`)**.
  - No mobile, botões primários de criação recorrente podem ir para um FAB (`h-14 w-14 rounded-full bottom-[calc(var(--dock-h)+var(--dock-gap)+16px)] right-4 md:hidden`), mantendo o topo livre.

---

## 2. Faixas de KPI e Cartões (`SummaryCard` & `GlassCard`)

- Sempre usar `.glass-card` (`.glass-2` + `rounded-card` `18px`), padding `p-4 sm:p-5`.
- Todo número monetário, de horas, percentual ou contagem usa obrigatoriamente `.num` (`font-variant-numeric: tabular-nums`) para evitar trepidação visual entre estados.
- **Ordem dentro do card de KPI:**
  1. Eyebrow `.label-ui` (`11px Figtree 500 uppercase tracking-[0.12em] text-fg-3`) + `InfoTooltip` opcional.
  2. Métrica principal (`28px–48px Figtree 300`, cor neutra `text-fg` — cores semânticas ficam reservadas a **deltas/variações**, nunca para decorar um saldo neutro).
  3. Linha de apoio / variação (`13px caption text-fg-2`).

---

## 3. Tabelas Densas & Listas Mobile

Regra obrigatória de responsividade para qualquer módulo transacional ou analítico (Monno `Planejado`/`Realizado`, Cronos `Detalhamento`, sistemas ERP/BI B2B):
- **Desktop (`>= 768px`):** tabela rolável com cabeçalho fixo (`sticky top-0`), seleção em lote com `SelectionBar` contextual e totalizadores em `.num`.
- **Mobile (`< 768px`):** nunca forçar scroll horizontal de 8 colunas como experiência padrão — alternar para lista de `ListRow` agrupada por data ou categoria, com `min-h-14` (`56px`) e ações via toque abrindo `Sheet` / `FormSheet`.

---

## 4. Banners de Estado & Acesso

Avisos no topo do `<main>` (ex.: modo leitura, vencimento de trial, convite de organização, sincronização pendente):
- Caixa única horizontal (`glass-1 rounded-field px-4 py-3`), borda sutil semântica (ex.: `border-warning/35 bg-warning/[0.08]` ou `border-[color:var(--line-strong)]`).
- Ponto de status (`8px`) + mensagem clara de 1–2 linhas à esquerda + **no máximo 1 botão `Button size="sm"`** à direita.
- Nunca usar modais bloqueantes de aviso quando um banner não-bloqueante resolve.

---

## 5. `EmptyState`, Carregamento & Erros

| Estado | Padrão Canônico |
|---|---|
| **Vazio (`EmptyState`)** | `.label-ui` curto + 1 frase objetiva (`max-w-xs text-fg-2`) + no máximo 1 CTA (`Button`). Proibido ilustrações gigantes ou textos longos. |
| **Carregamento inicial (`Skeleton`)** | Formas geométricas com `.skeleton` (`bg-ov/[0.06] animate-pulse rounded-card`) espelhando a grade real (cards de resumo + área de tabela), evitando layout shift. |
| **Sincronização em segundo plano** | Indicador discreto (`Spinner size="sm"`) em slot reservado no `TopBar` direito (`w-8`), nunca bloqueando a tela com overlay. |
| **Erro de carregamento (`ErrorBoundary`)** | Card de erro contido dentro da área do `<main>`, nunca derrubando o `TopBar`, com botão `Tentar novamente`. |
