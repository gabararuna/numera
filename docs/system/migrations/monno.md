# Guia de Migração · Monno (`monno.gruponumera.com`)

## Diagnóstico Antes vs Depois

| Superfície | Antes (Legado) | Depois (Numera Design System v1) |
|---|---|---|
| **Logo no TopBar** | Símbolo isolado (`variant="symbol"`) não clicável | **Logo completo clicável** (`Monno` + 3 pílulas) navegando para `/app` |
| **Navegação Desktop** | Apenas Floating Dock flutuante inferior só com ícones (exigia hover para ler nomes) | **Top Bar centrada com rótulos visíveis** (`Início · Projeção · Transações · Recorrências · Análises`) em cápsula `--ease-numera`; `--dock-space` reduzido para `16px` no desktop |
| **Vocabulário** | Primeira aba chamada `"Resumo"` | Unificado como **`"Início"`** (`/app`) em todo o ecossistema |
| **Dock Mobile** | Exibido em todas as larguras (desktop + mobile) | Restrito a **`md:hidden`**, mantendo o padrão de bolso apenas em telas pequenas |
| **AccountMenu** | Sem acesso ao tema claro/escuro nem ao ecossistema | Inclui **`Tema claro / Tema escuro`** sincronizado com `useThemeStore` + faixa **`Ecossistema Numera`** |
| **Higiene Legada** | Gradiente teal legado no avatar do `SettingsSidebar.tsx` | Avatar monocromático oficial `border-ov/[0.14] bg-ov/[0.06] text-fg` |

## Escopo Aplicado Agora (Shell & Tokens)
- `src/index.css`: ajuste `--dock-space: 16px` em `@media (min-width: 768px)` liberando espaço vertical em tabelas (`Planejado`, `Realizado`, `Faturas`).
- `src/pages/app/AppShell.tsx`: `AppHeader` em 3 zonas (`max-w-[1600px] analytical`), nav centrada desktop (`Início`, `Projeção`, `Transações`, `Recorrências`, `Análises`), `UserDropdown` com tema + Ecossistema Numera, `FloatingDock` em `md:hidden`, skip link `#main-content`.
- `src/pages/app/settings/SettingsSidebar.tsx`: remoção do último gradiente teal residual no avatar de perfil (mantendo a sidebar secundária de 2 colunas em `lg:+` conforme a especificação).

## Backlog Recomendado (Fase 2 — Primitivos Internos)
1. **Rótulo Integrado no `Input`:** adicionar props opcionais `label` e `hint` diretamente no `Input` (`src/components/ui/input.tsx`) espelhando o padrão do NYOT.
2. **A11y do `SegmentedControl`:** evoluir `PillSegment` em `src/components/ui/segmented-control.tsx` para `role="radiogroup"` com roving `tabIndex` e navegação por setas.
