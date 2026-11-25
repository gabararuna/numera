# Guia de Migração · Cronos (`cronos.gruponumera.com`)

## Diagnóstico Antes vs Depois

| Superfície | Antes (Legado) | Depois (Numera Design System v1) |
|---|---|---|
| **Logo no TopBar** | Símbolo isolado `20px` + cursor-pointer sem largura de toque | **Logo completo clicável** (`Cronos` + símbolo C1) em alvo `>= 44px` dentro da grade de 3 zonas `.glass-bar` |
| **Navegação Desktop** | Botões soltos `.nav-tab` sem trilho nem cápsula animada | Cápsula centrada `rounded-full` (`hidden md:flex`) com indicador deslizante `--ease-numera` |
| **Header Direito** | Botão `32px` solto de tema + círculo sólido `--accent` de `32px` com iniciais | **`NumeraAccountMenu`** unificado (`44px` hit, monograma + primeiro nome no desktop, `Ajustes`, `Tema Claro / Tema Escuro`, `Administração`, **Ecossistema Numera**, `Sair`) |
| **Dock Mobile** | Fundo sólido agressivo `--accent` nos ícones ativos | Dock `glass-3` (`md:hidden`) com mesma cápsula sutil do desktop + ícones `lucide-react` consistentes |

## Escopo Aplicado Agora (Shell & Tokens)
- `src/index.css`: adição de `--header-h`, `--dock-h`, `--dock-gap` e `--dock-space` responsivo (`16px` no desktop).
- `src/components/AppShell.tsx`: barra `.glass-bar sticky top-0` em largura total + `max-w-[1440px]` (`operational`) + skip link acessível.
- `src/components/shared/NumeraAccountMenu.tsx`: menu canônico unificado (identidade, `Ajustes`, toggle tema, `Administração`, `Ecossistema Numera`, `Sair`).
- `src/AppLayout.tsx`: grade de 3 zonas + pílula deslizante Framer Motion + `MobileBottomDock` alinhado ao padrão.

## Backlog Recomendado (Fase 2 — Primitivos Internos)
1. **Roteamento por URL no App:** migrar `activeTab` (`useState`) para rotas `/app`, `/app/detalhamento`, `/app/planejamento`, `/app/ajustes` preservando compatibilidade com `?ajustes=conexoes`.
2. **Toggle `44×44px` + Ícone:** evoluir `src/components/shared/Toggle.tsx` (`38×22px`) para a especificação WCAG (`48×28px` visual dentro de hit box `44×44px` com `Check`/`Minus` e `bg-accent-on`).
3. **Diálogos Unificados:** convergir `ConfirmDialog` e modais (`ExportModal`, `ImportModal`) para o padrão `ModalSheet` (bottom sheet mobile, centralizado `max-w-md` no desktop).
