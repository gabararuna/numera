# 06 · Diretrizes Rápidas para Engenheiros e Agentes de IA

Contrato curto de verificação antes de abrir qualquer PR ou gerar qualquer nova tela em **Numera**, **Monno**, **Cronos**, **NYOT** ou **Sistemas B2B**.

---

## Checklist Obrigatório (Do / Don't)

### Shell, Camadas & Cabeçalho
- **DO:** Usar `TopBar` (`glass-bar sticky/relative z-40`) em grade de 3 zonas (`grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr]`) com logo completo à esquerda, navegação central em cápsula `rounded-full` (`hidden md:flex`) e ações contextuais + `AccountMenu` à direita.
- **DO:** Montar `AccountMenu`, popovers e modais via `createPortal(..., document.body)` em `z-[60]`/`z-[70]` ancorados ao trigger (`getBoundingClientRect()`), evitando que `.glass-2` / `backdrop-filter` no conteúdo cubram o menu.
- **DO:** Formatar datas de cabeçalho com `formatHeaderDatePt` (`Terça, 24 de novembro`) estilizadas em `.label-ui` (`TERÇA, 24 DE NOVEMBRO`).
- **DO:** Usar `FloatingDock` (`md:hidden`) apenas no mobile com os `2–5` destinos primários.
- **DO:** Colocar `Ajustes`, `Tema Claro / Tema Escuro`, `Administração`, switcher `Ecossistema Numera` (na ordem `Numera · Monno · Cronos · NYOT`, com `Atual`) e `Sair` sempre dentro do `AccountMenu`.
- **DON'T:** Nunca renderizar menus flutuantes `fixed` dentro de `<header className="glass-bar">` ou pais com `backdrop-filter`/`overflow-hidden` sem `createPortal`.
- **DON'T:** Nunca criar sidebar fixa global para navegação primária de topo; reservar sidebars apenas para **navegação secundária interna** (`>= 1024px`) dentro de páginas complexas (como Configurações).
- **DON'T:** Nunca colocar botão solto de tema ou engrenagem de ajustes fora do `AccountMenu` quando o shell estiver autenticado.

### Tokens, Cor & Tipografia
- **DO:** Importar `numera-tokens.css` seguido de `numera-system.css`; usar apenas tokens semânticos (`bg-canvas`, `text-fg`, `text-fg-2`, `bg-ov/[0.08]`, `--line-strong`).
- **DO:** Usar `Figtree` (`300/400/500/600`) para toda UI e aplicar `.num` (`tabular-nums`) em qualquer número que muda ou alinha em coluna.
- **DO:** Restringir `DM Mono` estritamente a domínios `gruponumera.com`, hex/tokens técnicos, specs e palavras literais de confirmação (`EXCLUIR`).
- **DON'T:** Nunca usar `#000000`, `bg-black`, teal legado (`#00E6C7`, `#00BFA5`), fontes serifadas ou pesos `700/800/900`.

### Movimento, Forma & Acessibilidade
- **DO:** Usar curva `--ease-numera` (`cubic-bezier(0.22, 1, 0.36, 1)`) com propriedades explícitas (`transition-[color,background-color,transform] duration-150`) e `useReducedMotion()`.
- **DO:** Garantir `min-h-[44px] min-w-[44px]` em todos os alvos clicáveis e fonte `16px` (`text-base`) em inputs de texto.
- **DO:** Seguir a escada de raios concêntricos (`6px tag`, `10px icon`, `14px field`, `18px card`, `26px sheet`, `9999px pill`).
- **DON'T:** Nunca usar `transition-all` / `transition: all`, nunca usar `hover` como único jeito de revelar ação crítica em mobile, e nunca depender só de cor para indicar estado ativo/erro/toggle.
