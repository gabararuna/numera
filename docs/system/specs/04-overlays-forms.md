# 04 · Overlays & Gramática de Formulários

---

## 1. Matriz de Decisão para Overlays

Nunca escolher aleatoriamente entre modal, gaveta ou popover:

| Tipo | Mobile (`< 640px/768px`) | Desktop (`>= 640px/768px`) | Quando usar |
|---|---|---|---|
| **`ModalSheet` (`Dialog`)** | Bottom sheet (`rounded-t-sheet`, handle topo, safe-area) | Diálogo centralizado `max-w-lg glass-3` (`rounded-sheet`) | Leituras pontuais, formulários curtos (1–4 campos), detalhes, check-in diário |
| **`FormSheet`** | Bottom sheet (`rounded-t-sheet max-h-[92dvh]`) | Painel lateral direito `max-w-sm h-[100dvh] rounded-l-sheet` | Formulários de criação/edição **ao lado de uma tabela** (ex.: lançar gasto no Monno sem tampar a lista) |
| **`ConfirmDialog`** | Bottom sheet compacto | AlertDialog centralizado `max-w-md` (`role="alertdialog"`) | Confirmações irreversíveis (`Excluir conta`, `Revogar acesso`); exige botão neutro à esquerda + ação destrutiva à direita |
| **`Popover`** | Floating `glass-3` contido à viewport (`max-h` + scroll interno) | Floating `glass-3` ancorado no trigger | Filtros (`FilterBar`), menus de contexto (`AccountMenu`) |

**Regras obrigatórias de acessibilidade e camada em overlays (`backdrop-filter`):**
1. **Regra do Portal:** qualquer menu flutuante, dropdown, popover ou modal (`AccountMenu`, `Dialog`, `FormSheet`) deve renderizar via `createPortal(..., document.body)` em `z-[60]` (`--z-dropdown`) ou `z-[70]` (`--z-modal`). Nunca renderizar menus flutuantes presos dentro de `<header className="glass-bar">` ou cards `.glass-2` (pois `backdrop-filter` cria *stacking context* próprio e faz cards posteriores cobrirem o menu).
2. Prender o foco (`Tab` / `Shift+Tab`) dentro de modais/sheets abertos e fechar com `Escape`.
3. Devolver o foco ao botão de origem ao fechar.
4. Bloquear scroll do fundo (`overflow-hidden`) enquanto um modal/sheet estiver aberto.
5. Botão fechar `X` sempre com hit box mínimo de **`44×44px`**, no canto superior direito (`z-10`).
6. **Auto-foco inteligente em `FormSheet`:** focar o primeiro campo útil (ex.: valor ou título), nunca o botão `X`.

---

## 2. Gramática de Formulários & Controles

### `Input` & `AmountField` (Campo Sublinhado Numera)
- **Zero caixas fechadas em formulários:** padrão único sublinhado (`border-b`), sem fundo sólido nem cantos quadrados.
- **Altura mínima `44px`** (`min-h-[44px]`) e **fonte `16px` (`text-base`)** no input para evitar zoom automático no iOS Safari.
- Rótulo acima em `.label-ui` ligado via `<label htmlFor={id}>`.
- Erros exibidos abaixo com ícone `AlertCircle` (`text-negative-fg`), atributo `role="alert"`, ligados via `aria-invalid="true"` e `aria-describedby`.
- **`AmountField`:** prefixo discreto (`R$` em `text-fg-3`) + valor grande em `text-h1 tabular-nums`.

### `Toggle` (Switch Acessível `role="switch"`)
- **Hit wrapper:** `min-h-[44px] min-w-[44px]` obrigatório.
- **Trilho visual:** `h-7 w-12 rounded-full border p-0.5`:
  - Ativo (`checked=true`): `border-accent bg-accent`, thumb desliza `translate-x-5` em **`bg-accent-on text-accent`** (NUNCA branco fixo!).
  - Inativo (`checked=false`): `border-[color:var(--line-strong)] bg-sunken`, thumb `bg-fg-2 text-sunken`.
- **Dupla codificação WCAG 1.4.1:** thumb exibe ícone `<Check size={12} />` quando ligado e `<Minus size={11} />` quando desligado.

### `SegmentedControl`
- Usado para alternar visões mutuamente exclusivas (`2–4` opções curtas: `Escuro / Claro`, `Planejado / Realizado`, `Semana / Mês / Ano`, `Gastos / Ganhos`).
- **Acessibilidade obrigatória:** `role="radiogroup"` com itens `role="radio"`, `aria-checked`, **roving `tabIndex` (`0` / `-1`)** e navegação por setas (`ArrowLeft/Right/Up/Down`, `Home`, `End`).
- **Estilo:** trilho `rounded-full border border-ov/[0.10] bg-ov/[0.02] p-1`; item ativo ganha `bg-ov/[0.09] border-[color:var(--line-strong)] font-medium text-fg`. Altura `min-h-[44px]` no toque (`sm:` compacto com `HIT_44` se necessário).

### `Button` (Botões em Pílula)
Sem sombras, sem gradientes, cantos `rounded-full`, texto `Figtree 500`, micro-compressão `active:scale-[0.97]`.

| Variante | Visual | Uso |
|---|---|---|
| `primary` | `bg-primary text-primary-on hover:bg-primary-hover` | CTA principal da tela ou do modal (**máximo 1 por vista**) |
| `secondary` | `border border-ov/[0.16] text-fg hover:border-ov/[0.32] hover:bg-ov/[0.06]` | Ações de apoio, exportação, filtros |
| `ghost` | `text-fg-2 hover:text-fg hover:bg-ov/[0.06]` | Cancelar, voltar, ações terciárias |
| `destructive` | `border border-negative/40 text-negative-fg hover:border-negative/70 hover:bg-negative/[0.10]` | Ações destrutivas — **nunca** usar fundo sólido vermelho chapado na barra de formulário |

### Confirmações Destrutivas Críticas (LGPD / Exclusão de Conta)
- Exigir digitação literal de confirmação (`EXCLUIR`, `RESETAR`) estilizada em **`DM Mono`** — um dos poucos casos legítimos de `DM Mono` em UI ao lado de domínios `gruponumera.com`.
