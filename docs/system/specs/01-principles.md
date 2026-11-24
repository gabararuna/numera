# 01 · Princípios de Produto da Numera

> Como Apple (Human Interface Guidelines) e Google (Material Design) mantêm produtos diferentes instantaneamente reconhecíveis como família: **as superfícies mudam de contexto, mas a anatomia de navegação, a gramática de controles e a disciplina visual não mudam nunca.**

---

## Os 6 Princípios Inegociáveis

### 1. Clareza antes de ornamento
- Nunca exibir rótulos duplicados ou ações competidoras na mesma tela.
- Toda tela responde em menos de **2 segundos** a três perguntas: *onde estou* (aba ativa), *o que importa agora* (métrica ou ação principal), *o que posso ajustar* (`AccountMenu` no canto superior direito).
- Sem gradiente decorativo em cards, sem sombras dramáticas em repouso e sem cor gratuita: destaque vem de escala, peso (`Figtree 300/400/500/600`), espaço e borda hairline.

### 2. Zero onboarding obrigatório
- Um app Numera precisa fazer sentido no **primeiro uso sem ler um manual**.
- Tutoriais em overlay ("clique aqui para continuar") são proibidos. Quando houver fluxo de configuração inicial (`Onboarding`), ele coleta apenas os dados operacionais mínimos (ex.: jornada no Cronos, conta inicial no Monno, módulos ativos no NYOT) e entra direto na interface real.
- Empty states sempre explicam *o que falta* em 1 frase direta e oferecem **no máximo 1 CTA**.

### 3. Cromo silencioso ($\le$ 5% de acento)
- O shell (header, abas, botões secundários, bordas) vive inteiramente em `Ônix` (`#0A0A09`) / `Algodão Cru` (`#F4F3EF`) e vidros fumê (`glass-1`, `glass-2`, `glass-3`).
- Cores semânticas (`Sálvia`, `Terracota`, `Areia`, `Ardósia`) entram apenas para comunicar **estado de dado ou status real** (saldo positivo, atraso de ponto, alerta, check-in pendente) — nunca para decorar navegação ou avatar.

### 4. Memória muscular única
Qualquer pessoa que já usou **Monno**, **Cronos**, **NYOT** ou um **sistema B2B feito sob medida pela Numera** já sabe operar os outros sem reaprender:

| Zona | O que sempre mora lá |
|---|---|
| **Canto superior esquerdo** | Símbolo `64x64` + Wordmark em Title Case (clicável para `Início`) |
| **Centro do topo (desktop)** | Cápsula com as `2–5` seções principais + pílula deslizante `--ease-numera` |
| **Canto inferior central (mobile)** | Dock flutuante `glass-3` apenas com as `2–5` seções principais |
| **Canto superior direito (sempre por último)** | Avatar circular monocromático abre o `AccountMenu` com identidade, `Ajustes`, `Tema`, `Administração` (se admin), switcher **Ecossistema Numera** e `Sair` |

### 5. Movimento calmo (`--ease-numera`)
- Curva única: `cubic-bezier(0.22, 1, 0.36, 1)` (`duration: 0.24s–0.32s`). Zero bounce elástico exagerado.
- Apenas `transform` e `opacity` na cápsula de navegação e nas transições de tela; nunca `transition: all`.
- Todo componente animado respeita `prefers-reduced-motion: reduce` (`useReducedMotion()`).

### 6. Inclusivo por padrão (`44×44px` + WCAG AA)
- **Área de toque mínima de `44×44px`** para qualquer botão, link, switch ou trigger de menu (usando hit-area invisível quando o controle visual tem `32px–40px`).
- Todo estado booleano, erro ou ativo possui **dupla codificação** (não depender só de cor): `Toggle` usa posição + ícone (`Check`/`Minus`), pílula ativa usa preenchimento + borda `3:1` (`--line-strong`), erro de campo usa ícone + `role="alert"`.
- Campos de entrada usam fonte base de **`16px`** para impedir zoom automático no iOS Safari.

---

## Como o Sistema se Adapta sem Quebrar a Coesão

O Design System não engessa produtos diferentes em telas idênticas; ele separa **invariantes globais** de **parâmetros adaptáveis**:

| Produto / Contexto | Tier de Largura | Ações Contextuais no Topo | Navegação Secundária |
|---|---|---|---|
| **Monno** (Finanças analíticas) | `analytical` (`1600px`) | Sync Spinner + Sino de Avisos + Olho de Privacidade | `SettingsSidebar` 2 colunas (`>= 1024px`) em Ajustes |
| **Cronos** (Ponto CLT & ciclos) | `operational` (`1440px`) | Nenhuma ação extra (barra limpa) | Seleção `Gestor/Funcionário` automática via `OrgContext` |
| **NYOT** (Hábitos, peso, protocolo) | `focused` (`1024px`) | Check-in diário (`Atualização Diária`) + Share | Blocos modulares condicionais na Home |
| **Sistemas B2B Numera** (ERP, IA, BI, automações) | `operational` (`1440px`) ou `analytical` (`1600px`) | Máximo 2 triggers globais (ex.: Busca `⌘K`, Alertas) | `TopBar` com até 5 abas + item `"Mais"` ou `TwoPane` por módulo |
