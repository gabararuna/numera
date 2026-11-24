# 02 · Shell & Navegação Canônica

Especificação exata do **Numera AppShell** — idêntico em estrutura, espaçamento e comportamento em **Monno**, **Cronos**, **NYOT** e **Sistemas B2B Numera**.

---

## 1. Visão Geral (Desktop vs Mobile)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ TOP BAR (glass-bar · sticky/fixed · 64px desktop / 56px mobile + safe)  │
│  [Logo Full clicável]       ( [Aba 1]  Aba 2  Aba 3 )     [ctx] [Avatar] │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│                     <main id="main-content">                            │
│              Largura conforme tier: 1024 / 1440 / 1600 px               │
│          (Sidebars existem SOMENTE dentro de páginas complexas)         │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘

MOBILE (< 768px):
  · Top Bar mantém Logo (esq.) + Ações contextuais & Avatar (dir.)
  · Nav central do topo oculta (hidden md:flex)
  · Floating Dock (glass-3, bottom pill, md:hidden) centraliza 2–5 destinos primários
```

---

## 2. Grade de 3 Zonas do `TopBar`

Container interno:
```tsx
<header role="banner" className="glass-bar sticky top-0 z-40 shrink-0 pt-[env(safe-area-inset-top)]">
  <div className="mx-auto grid h-[var(--header-h)] w-full max-w-[...] grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 md:px-6">
    {/* 1fr: Esquerda */}
    {/* auto: Centro (hidden md:flex) */}
    {/* 1fr: Direita */}
  </div>
</header>
```

> **Por que `grid-cols-[1fr_auto_1fr]` no desktop?**  
> Garante que a cápsula de navegação central fique **geometricamente centrada na tela**, independentemente de o bloco direito ter 0 ações (Cronos) ou 3 elementos (Monno).

### Zona Esquerda (`justify-self-start`)
- **Sempre logo completo** (`variant="full"`): símbolo oficial `64x64` (`20px–22px`) + wordmark em `Figtree 600` Title Case (ex.: `Monno`, `Cronos`, `NYOT` em maiúsculas). **Nunca** usar símbolo isolado no cabeçalho autenticado.
- Clicável (`<Link to="/app">` ou botão de retorno para `Início`), com `min-h-[44px]` e `focus-visible:ring-2 focus-visible:ring-accent`.

### Zona Central (`hidden md:flex justify-self-center`)
- Trilho `.numera-top-nav`: `inline-flex items-center gap-0.5 rounded-full border border-ov/[0.08] bg-ov/[0.02] p-1`.
- Contém **somente destinos primários** (`2` a `5` itens):
  - **Monno:** `Início` · `Projeção` · `Transações` · `Recorrências` · `Análises`
  - **Cronos (Colaborador):** `Início` · `Detalhamento` · `Planejamento`
  - **Cronos (Gestor/Admin Org):** `Equipe` · `Aprovações` *(se gestor)* · `Administração`
  - **NYOT:** `Início` · `Hábitos` *(se ativo)* · `Peso` *(se ativo)*
  - **Sistemas B2B (6+ módulos):** exibe os **4 ou 5 fluxos principais** + botão `"Mais ▾"` com popover `glass-3` para módulos menos frequentes. Se houver **apenas 1 destino ativo** (ex.: usuário no NYOT sem módulo de Hábitos ou Peso extra), a cápsula central é ocultada para não exibir uma pílula sozinha.
- Cada item usa `h-9 px-3.5 rounded-full text-[13px] font-medium whitespace-nowrap` (com área acessível e foco claro).
- O item ativo recebe `<motion.span layoutId="numera-top-nav-active" />` com `border border-[color:var(--line-strong)] bg-ov/[0.08]` e transição `{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }` (`{ duration: 0 }` quando `useReducedMotion()` é `true`).

### Zona Direita (`justify-self-end flex items-center gap-1`)
Ordem fixa da esquerda para a direita:
1. **Indicador passivo opcional** (ex.: spinner reservado de `w-8` no Monno para sincronização de histórico sem fazer a barra pular).
2. **Ações contextuais do produto** (máximo `2` botões redondos `44×44px`):
   - **Monno:** Sino de `Avisos` (`NotificationBell`) + Olho de `Privacidade` (`Ocultar/Mostrar valores`).
   - **NYOT:** `Atualização Diária` *(preservando o hint animado `data-hint-open` na primeira visita)* + `Compartilhar evolução` *(apenas quando há dados)*.
   - **Cronos:** nenhuma ação extra (topo silencioso).
   - **Proibido no topo:** botão solto de tema (`Sol/Lua`) ou engrenagem solta de `Ajustes` fora do `AccountMenu`. Tudo isso mora unificado no menu da conta.
3. **Gatilho Unificado da Conta (`AccountMenu`)** — sempre o último item à direita.

---

## 3. Gatilho Unificado da Conta & `AccountMenu`

### Trigger
- Hit area mínima `h-11` (`44px`), `aria-label="Menu da conta"`, `aria-haspopup="menu"`, `aria-expanded={open}`.
- **Mobile (`< 768px`):** `w-11 justify-center rounded-full` contendo o monograma circular de `32×32px` (`border border-ov/[0.14] bg-ov/[0.06] text-xs font-medium text-fg`).
- **Desktop (`>= 768px`):** pílula `pl-1.5 pr-3 gap-2 rounded-full` contendo monograma `32×32px` + `firstName` (`max-w-[120px] truncate text-[13px] font-medium text-fg`) + seta `ChevronDown` (`size={14} text-fg-3`, rotaciona `180deg` ao abrir).
- **Regra anti-legado:** Avatar é **sempre monocromático** (`border-ov/[0.14] bg-ov/[0.06]`). Proibido gradiente teal ou cor sólida chamativa no botão de perfil.

### Conteúdo do Menu (`glass-3 rounded-card w-[272px] z-[60]`)
Ordem padrão de blocos em todos os apps:
1. **Cabeçalho de identidade:** Nome completo (ou prefixo do e-mail) em `15px font-medium text-fg` + e-mail em `caption text-fg-3`, separados por `border-b border-ov/[0.08]`.
2. **Links secundários opcionais do app** (se houver, máximo 1–2): ex. no Monno, `Faturas` (`/app/faturas`).
3. **Bloco padrão de Sistema (mesma ordem em todos os apps):**
   - `Ajustes` *(ícone `Settings`)*
   - `Tema claro` / `Tema escuro` *(ícone `Sun` ou `Moon`, alterna o tema e fecha em 1 clique — sincroniza com perfil no backend quando suportado)*
   - `Administração` *(ícone `ShieldCheck`, exibido apenas quando `isAdmin === true`)*
4. **Faixa `Ecossistema Numera`:**
   - Rótulo `.label-ui`: `Ecossistema Numera`
   - Lista compacta com os símbolos `64x64` (`14px`) de **Monno**, **Cronos** e **NYOT**:
     - O app corrente é exibido destacado sutilmente (`bg-ov/[0.06]`) com badge `atual`.
     - Os apps irmãos abrem em nova aba (`target="_blank" rel="noopener noreferrer"`) apontando para `monno.gruponumera.com`, `cronos.gruponumera.com`, `nyot.gruponumera.com`.
     - Rodapé discreto para o portal institucional `gruponumera.com` em `DM Mono`.
5. **Divisor + `Sair`** (`LogOut`, `text-negative-fg`, altura `min-h-11`).

**Comportamento de teclado e foco:**
- Clicar fora fecha o menu.
- `Escape` fecha o menu e devolve o foco para o botão trigger.

---

## 4. `MobileDock` (Exclusivo Mobile `< 768px`)

- Sempre `md:hidden` — **proibido exibir dock inferior em telas `>= 768px`**.
- Renderizado em `bottom-[var(--dock-gap)]` centralizado horizontalmente com `.glass-3 rounded-full`.
- **Contém apenas destinos primários** (`2–5` itens). Itens como `Ajustes` e `Administração` ficam no `AccountMenu` superior também no mobile — liberando espaço limpo para os dedos no dock.
- Se o usuário tiver `<= 1` aba primária ativa ou estiver em tela de onboarding, o dock não renderiza.
- **Estilo do item ativo:** mesma cápsula deslizante do `TopBar` (`border border-[color:var(--line-strong)] bg-ov/[0.08]`, `layoutId="numera-dock-active"`), ícone de `20px`, ativo em `text-fg` (`strokeWidth={1.75}`), inativo em `text-fg-3` (`strokeWidth={1.5}`).
- **Bug conhecido do Safari iOS:** quando o shell usa `h-[100dvh] overflow-hidden`, o dock usa `position: absolute` dentro do shell; quando a página usa scroll no documento (`Cronos`), usa `position: fixed` respeitando `env(safe-area-inset-bottom)`.

---

## 5. Navegação Secundária (`SecondaryTwoPane`) & Onboarding Mínimo

### Navegação Secundária (Telas Complexas)
Quando uma única seção tem muitas sub-áreas (como `Configurações` do Monno com 9 telas, ou um ERP B2B com sub-cadastros):
- **Desktop (`>= 1024px` / `lg:`):** divisão em 2 colunas dentro do `<main>` (`Sidebar Secundária 264–288px à esquerda` + painel de conteúdo flexível à direita).
- **Tablet/Mobile (`< 1024px`):** lista vertical de categorias (sem sidebar) que navega para a sub-tela em pilha com botão explícito `← Voltar`.

### Shell Mínimo (Onboarding & Fluxos Focados)
Durante onboarding obrigatório (`/app/comecar`, `/app/onboarding`, wizard inicial):
- Ocultar nav central do `TopBar` e ocultar `MobileDock`.
- Exibir header limpo (`max-w-xl`) com logo completo à esquerda e apenas botão discreto `Sair` à direita.

---

## 6. Tiers de Largura e Tokens de Altura

| Tier | Token / Classe | Uso recomendado |
|---|---|---|
| **Focused** | `max-w-5xl` (`1024px`) | Apps pessoais, leitura calma, hábitos/saúde (**NYOT**), wizards B2B |
| **Operational** | `max-w-[1440px]` | Painéis operacionais, ponto e escala (**Cronos**), fluxos B2B |
| **Analytical** | `max-w-[1600px]` | Tabelas densas, multi-colunas financeiras e BI (**Monno**, portais de dados) |

| Token | `< 768px` (Mobile) | `>= 768px` (Desktop) | Efeito |
|---|---|---|---|
| `--header-h` | `56px` | `64px` | Altura útil da `glass-bar` (fora safe-area) |
| `--dock-h` | `56px` | `56px` *(oculto)* | Altura do dock mobile |
| `--dock-gap` | `calc(12px + env(safe-area-inset-bottom))` | `24px` | Folga da borda inferior |
| `--dock-space` | `calc(var(--dock-h) + var(--dock-gap) + 24px)` | `16px` | Zero desperdício no rodapé de tabelas desktop |
