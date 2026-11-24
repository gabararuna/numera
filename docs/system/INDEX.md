# Numera Design System v1

Arquitetura de produto, shell de interface, gramática de componentes e padrões de interação compartilhados por todo o ecossistema **Numera** (`Monno`, `Cronos`, `NYOT` e sistemas personalizados **B2B** de consultoria, automação, dados e IA).

> **Separação de camadas:**  
> [`docs/brand/v1/`](../brand/v1/INDEX.md) governa a **identidade de marca** (símbolos `64x64`, Ônix `#0A0A09`, Algodão Cru `#F4F3EF`, `Figtree` + `DM Mono`, semântica mineral/botânica e `--ease-numera`).  
> **`docs/system/`** governa a **arquitetura de produto e interação** — garantindo que todos os apps funcionem com a mesma topologia, hierarquia de navegação, menus e ergonomia.

---

## 1. Portal Interativo (Visual + Simuladores)

- **[Numera Design System.html](./Numera%20Design%20System.html)** — Hub interativo completo com:
  - Simulador vivo de Shell (`Desktop 1280px` ↔ `Mobile 390px`) alternando entre **Monno**, **Cronos**, **NYOT** e **Sistema B2B Numera**, com `AccountMenu`, switcher de ecossistema e toggle Ônix / Algodão Cru em tempo real;
  - Playground interativo de componentes (botões, `Toggle` acessível, `SegmentedControl` por teclado, `Input` sublinhado, `SummaryCard`, `ListRow`, `Notice`, `EmptyState`, `ModalSheet` e `FormSheet`);
  - Matriz de convergência visual do ecossistema.

## 2. Especificações Arquiteturais (`specs/`)

| Documento | Escopo |
|---|---|
| [01-principles.md](./specs/01-principles.md) | Os 6 princípios de produto da Numera (clareza, zero onboarding obrigatório, cromo silencioso, memória muscular única, movimento calmo, acessibilidade AA) |
| [02-shell-navigation.md](./specs/02-shell-navigation.md) | Anatomia do `AppShell`, `TopBar` em grade de 3 zonas, `MobileDock` exclusivo mobile, `AccountMenu` + Ecossistema Switcher, navegação secundária e tiers de largura |
| [03-page-patterns.md](./specs/03-page-patterns.md) | Cabeçalhos de página (`H1` + ações), faixas de KPI, tabelas densas com adaptação mobile, `FilterBar`, banners de estado e carregamentos |
| [04-overlays-forms.md](./specs/04-overlays-forms.md) | Matriz `ModalSheet` vs `FormSheet` vs `ConfirmDialog`, inputs sublinhados (`16px`), `AmountField`, `Toggle`, `SegmentedControl`, `Button` e confirmações destrutivas |
| [05-vocabulary-flows.md](./specs/05-vocabulary-flows.md) | Glossário canônico PT-BR, fluxo `PublicNav` / `AuthFrame` / `OnboardingFrame` e arquitetura padrão de portais/ERPs B2B |
| [06-ai-guidelines.md](./specs/06-ai-guidelines.md) | Contrato curto e checklist objetivo (**Do / Don't**) para engenheiros e agentes de IA que forem criar ou alterar telas no ecossistema |

## 3. Tokens e Kit de Referência Copiável (`tokens/` & `reference/`)

- **[tokens/numera-system.css](./tokens/numera-system.css)** — Tokens estruturais de shell (`--header-h`, `--dock-h`, `--dock-gap`, `--dock-space`, `--z-*`) e utilitários `.numera-top-nav`, `.numera-dock`, `.numera-account-menu`, `.numera-input` para importar logo após [`numera-tokens.css`](../brand/v1/tokens/numera-tokens.css).
- **[reference/README.md](./reference/README.md)** — Visão geral e dependências do kit de referência React + TypeScript.
- **[reference/NumeraEcosystemMarks.tsx](./reference/NumeraEcosystemMarks.tsx)** — Símbolos vetoriais `64x64` (`NumeraMark`, `MonnoMark`, `CronosMark`, `NyotMark`) e metadados `ECOSYSTEM_APPS`.
- **[reference/NumeraAppShell.tsx](./reference/NumeraAppShell.tsx)** — Implementação de referência de `NumeraAppShell`, `TopBar`, `MobileDock` e `SecondaryTwoPane`.
- **[reference/NumeraAccountMenu.tsx](./reference/NumeraAccountMenu.tsx)** — Implementação de referência do gatilho unificado de conta, toggle de tema e switcher do ecossistema.
- **[reference/NumeraPrimitives.tsx](./reference/NumeraPrimitives.tsx)** — Primitivos canônicos (`Button`, `Toggle`, `SegmentedControl`, `Input`, `EmptyState`, `Notice`).

## 4. Guias de Migração por Produto (`migrations/`)

| Produto | Domínio | Largura Tier | Guia |
|---|---|---|---|
| **Cronos** | `cronos.gruponumera.com` | `operational` (`1440px`) | [migrations/cronos.md](./migrations/cronos.md) |
| **Monno** | `monno.gruponumera.com` | `analytical` (`1600px`) | [migrations/monno.md](./migrations/monno.md) |
| **NYOT** | `nyot.gruponumera.com` | `focused` (`1024px`) | [migrations/nyot.md](./migrations/nyot.md) |
| **Sistemas B2B** | Portais, BI & Sistemas sob medida | `operational` / `analytical` | [migrations/b2b-template.md](./migrations/b2b-template.md) |
