# Template de Arranque · Sistemas B2B & Portais Numera

Playbook padrão para todo sistema sob medida desenvolvido pela **Numera** (dashboards operacionais, integrações Python/SQL, sistemas internos de engenharia/logística, portais de cliente e wrappers analíticos sobre Power BI).

---

## 1. Estrutura Base (Commit 1)

1. Copiar `docs/brand/v1/tokens/numera-tokens.css` e `docs/system/tokens/numera-system.css` para `src/styles/`.
2. Configurar `Figtree` (`300/400/500/600`) + `DM Mono` (`400`) e o preset Tailwind (`tailwind-preset.js`).
3. Copiar os arquivos de `docs/system/reference/`:
   - `NumeraEcosystemMarks.tsx`
   - `NumeraAccountMenu.tsx`
   - `NumeraAppShell.tsx`
   - `NumeraPrimitives.tsx`
4. Escolher o **Tier de Largura** conforme a densidade:
   - `operational` (`1440px`) — operações, formulários, aprovações, ordens de serviço;
   - `analytical` (`1600px`) — BI, tabelas longas, ETL, finanças corporativas.

---

## 2. Anatomia de Navegação por Complexidade

- **2 a 5 módulos principais:** renderizar todos direto na cápsula central do `TopBar`.
- **6 ou mais módulos principais:** colocar os **4 ou 5 mais acessados** na cápsula + botão `"Mais ▾"` abrindo popover `glass-3` com os demais módulos (evitando sidebar global e evitando quebra de linha no header).
- **Sub-cadastros & Parâmetros (Clientes, Usuários, Permissões, Webhooks, Logs):** concentrar em **`Ajustes`** ou **`Administração`** usando `SecondaryTwoPane` (`w-[272px]` à esquerda no desktop + lista drill-down no mobile).

---

## 3. Padrões para Automações, BI e IA Corporativa

- **Monitoramento de Jobs / Pipelines (Python / SQL):** exibir status via ponto semântico + texto curto (`Sálvia` concluído, `Areia` em fila/alerta, `Terracota` falha, `Ardósia` executando), com logs técnicos e horários em `.num` ou `DM Mono`.
- **Consultas & Exportações:** manter barra de filtros colapsada em popover `FilterBar` (`glass-3`) alinhada à direita do `PageHeader`, evitando poluir o topo com 10 dropdowns abertos.
- **Assistentes de IA internos:** apresentar respostas e citações dentro de cartões `.glass-2`, ações rápidas em `Button size="sm" variant="secondary"`, e nunca usar brilhos neon, gradientes arco-íris ou `.shimmer-text`.
