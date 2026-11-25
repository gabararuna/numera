# Numera Design System · Kit de Referência React + TypeScript

Implementação de referência pronta para copiar para novos projetos **Numera B2B** (dashboards, portais de clientes, automações e ERPs sob medida) ou usar como contrato nos apps **Monno**, **Cronos** e **NYOT**.

## Pré-requisitos

1. CSS de marca + CSS do sistema importados nessa ordem no `src/index.css`:
   - [`docs/brand/v1/tokens/numera-tokens.css`](../../brand/v1/tokens/numera-tokens.css)
   - [`docs/system/tokens/numera-system.css`](../tokens/numera-system.css)
2. `tailwind.config.js` estendendo as cores e fontes com [`tailwind-preset.js`](../../brand/v1/tokens/tailwind-preset.js) (ou `@theme inline` no Tailwind v4).
3. Dependências de runtime:
   - `react` (`18+` ou `19+`)
   - `framer-motion` (`11+` ou `12+`)
   - `lucide-react`

## Arquivos Incluídos

- **`NumeraEcosystemMarks.tsx`**: vetores oficiais `64x64` (`NumeraMark`, `MonnoMark`, `CronosMark`, `NyotMark`) + registro `ECOSYSTEM_APPS`.
- **`NumeraAccountMenu.tsx`**: gatilho unificado de conta + dropdown `glass-3` com `Ajustes`, `Tema Claro / Tema Escuro`, `Administração` condicional, switcher `Ecossistema Numera` (`Numera`, `Monno`, `Cronos`, `NYOT`) e `Sair`.
- **`NumeraAppShell.tsx`**: `NumeraAppShell`, `NumeraTopBar` (grade de 3 zonas + pílula deslizante `--ease-numera`), `NumeraMobileDock` (`md:hidden`) e `SecondaryTwoPane`.
- **`NumeraPrimitives.tsx`**: componentes base (`Button`, `Toggle`, `SegmentedControl`, `Input`, `EmptyState`, `Notice`).
