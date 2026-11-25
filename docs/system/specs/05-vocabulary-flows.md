# 05 · Vocabulário Canônico, Fluxos Globais & B2B

---

## 1. Glossário Canônico PT-BR

Mesma palavra = mesma função em **todos** os produtos Numera:

| Conceito | Termo Canônico (Usar sempre) | Termos Legados (Banir) |
|---|---|---|
| Página inicial autenticada | **`Início`** | `Resumo`, `Dashboard`, `Home` |
| Configurações do usuário / app | **`Ajustes`** | Mixing `Configurações` no header e `Ajustes` no rodapé |
| Área administrativa / organização | **`Administração`** | `Admin` (aceitável só como micro-badge), `Painel` |
| Alternar tema no menu | **`Tema Claro`** / **`Tema Escuro`** | `Light Mode`, `Dark Mode`, `Alternar tema`, `Tema claro` |
| App ativo no switcher | **`Atual`** | `atual`, `current`, `Ativo` |
| Encerrar sessão | **`Sair`** (ou `Sair da conta` em título explícito) | `Logout`, `Desconectar` |
| Rótulo institucional nos apps | **`Um app Numera`** | `Powered by Numera`, `A Numera app` |
| Ação de gravação em formulário | **`Salvar`** / **`Salvar alterações`** | `Gravar`, `Submit`, `Atualizar dados` |
| Fechar / abortar formulário | **`Cancelar`** | `Descartar` (usar apenas para ação explícita com modal) |
| Remover item permanente | **`Excluir`** | `Apagar`, `Remover` (usar remover apenas para desvincular relação) |

**Grafia das Marcas, Capitalização & Datas:**
- `Numera`, `Monno`, `Cronos` sempre em Title Case. Apenas `NYOT` em caixa alta (nunca colocar `NYOT` e `Not Your Ordinary Tracker` juntos na mesma frase).
- **Capitalização de rótulos curtos e badges:** itens de menu, toggles e badges de status usam sempre **Title Case** (`Tema Claro`, `Tema Escuro`, `Atual`, `Ecossistema Numera`); sentenças e descrições auxiliares seguem frase normal em português.
- **Ordem do `Ecossistema Numera`:** sempre **`Numera`** primeiro, seguido por **`Monno`**, **`Cronos`** e **`NYOT`**, todos na mesma linha tipográfica (`Figtree` `text-caption`), ícone `14×14px` e seta `ArrowUpRight` `13px`.
- **Datas de cabeçalho:** sempre no formato natural sem `"-feira"` (`Terça, 24 de novembro` exibido em `.label-ui` caixa alta: `TERÇA, 24 DE NOVEMBRO`). Datas compactas em gráficos/badges usam forma curta (`24 de nov.` ou `24/11`).

---

## 2. Fluxos Públicos, Autenticação & Onboarding

### `PublicNav` & `PublicFooter`
- `PublicNav`: `.glass-bar sticky top-0 z-40` + grade `max-w-6xl`:
  - Esquerda: `<Logo variant="full" size="sm" />`
  - Centro (`hidden md:flex`): 3–4 links âncora (`Recursos`, `Como funciona`, `Preços` / `Dúvidas`)
  - Direita: botão de tema (`Sun/Moon` `44×44px`) + CTA `Entrar` (`secondary`) + CTA primário (`Começar agora` / `Abrir app`).
- `PublicFooter`: links legais (`/privacidade`, `/termos`), CNPJ `51.387.729/0001-01` — `Numera Consultoria de Engenharia LTDA`, selo **Ecossistema Numera** e domínios irmãos em `DM Mono`.

### `AuthFrame` (Login, Cadastro, Recuperação, Convite)
- Coluna única centralizada (`max-w-md`), fundo `bg-canvas`:
  - Topo: botão `← Voltar` (`44×44px`) para `/`.
  - Acima do card: Logo centrado (`size="md"`) + legenda discreta `Um app Numera`.
  - Card `.glass-2 rounded-sheet p-6 sm:p-8` com `H1` (`text-h2`), subtítulo, `GoogleAuthButton` monocromático (`variant="secondary" size="lg"` — acento continua $\le$ 5%), divisor `ou com e-mail`, campos sublinhados + toggle de senha (`44×44px`), CTA `primary size="lg"` e `AuthLegalNotice`.

### `OnboardingFrame` (Passo Inicial Enxuto)
- Usa `AppShell minimal={true}` (sem `TopBar` nav e sem `MobileDock`, apenas Logo + `Sair`).
- Progresso linear sutil no topo (`Passo X de Y`) + passos objetivos com `Button size="lg"` fixado confortavelmente.

---

## 3. Blueprint para Sistemas Personalizados B2B & Portais

A Numera entrega **sistemas sob medida, dashboards de BI (PowerBI / Python / SQL), automações e portais corporativos** para clientes (ex.: engenharia, logística, construção civil, varejo). Todo novo projeto B2B começa herdando exatamente este Design System:

1. **Identidade B2B:**
   - Se o sistema for da plataforma **Numera** para o cliente: usar Logo do portal + sub-linha `Engenharia Numera` ou `Um sistema Numera`.
   - Se for white-label para o cliente: preservar integralmente o shell (`TopBar`, `AccountMenu`, `glass-*`, `Figtree`, Ônix/Algodão Cru ou tema adaptado) trocando apenas o logotipo na Zona Esquerda.
2. **Arquitetura de Navegação B2B:**
   - **Até 5 módulos** -> direto na cápsula central do `TopBar`.
   - **6+ módulos** -> exibir os 4 principais na cápsula + botão `"Mais ▾"` com menu suspenso `glass-3`; configurações de cadastros auxiliares ficam dentro de `Ajustes` em modo `SecondaryTwoPane` (`SettingsSidebar` no desktop).
3. **Domínio Analítico (`analytical 1600px`):**
   - Cabeçalho com `PageHeader` + `FilterBar` à direita -> Faixa de KPIs (`.num`) -> Gráficos monocromáticos + Sálvia/Terracota -> Tabela densa rolável no desktop e `ListRow` no mobile.
   - Domínios técnicos, queries, endpoints, códigos de lote/OS e IDs de auditoria podem usar `DM Mono`.
