# Numera Admin CMS — Design Spec

**Data:** 2026-05-18
**Status:** Aprovado

---

## Objetivo

Criar um painel admin em `/admin` que permita editar textos (PT/EN/ES), ativar/desativar projetos, cases, serviços e seções inteiras, sem precisar tocar no código ou gastar tokens no Claude.

As mudanças são commitadas no GitHub via API. O Cloudflare Pages detecta o push e rebuilda o site automaticamente (~1-2 min).

---

## Arquitetura

### Fonte de verdade: `src/content.json`

Substitui o `src/i18n/translations.js`. Contém todo o conteúdo configurável em um único arquivo JSON importado estaticamente pelo Vite — zero latência em runtime, performance idêntica à atual.

Estrutura do arquivo:

```json
{
  "sections": {
    "ticker": true,
    "ecosystem": true,
    "cases": true,
    "methodology": true,
    "cta": true
  },
  "projects": [
    {
      "id": "cronos",
      "visible": true,
      "wip": false,
      "type": "app",
      "url": "https://cronos.gruponumera.com/"
    }
  ],
  "cases": [
    { "id": "0", "visible": true },
    { "id": "1", "visible": true }
  ],
  "services": [
    { "id": "0", "visible": true },
    { "id": "1", "visible": true },
    { "id": "2", "visible": true }
  ],
  "translations": {
    "pt": { "hero_heading_1": "...", "project_cronos": "Cronos", ... },
    "en": { ... },
    "es": { ... }
  }
}
```

Os nomes e descrições de projetos, cases e serviços ficam dentro de `translations` (chaveados por id), para manter a estrutura i18n existente.

### Proxy seguro: `functions/api/publish.js`

Cloudflare Pages Function que:
1. Recebe `POST /api/publish` com `{ password, content }`
2. Verifica `password` contra o secret `ADMIN_PASSWORD` do Cloudflare
3. Busca o SHA atual do arquivo via GitHub API
4. Commita o novo `content.json` via GitHub API usando o secret `GITHUB_TOKEN`
5. Retorna `{ ok: true }` ou `{ error: "..." }`

Secrets necessários no painel do Cloudflare Pages:
- `ADMIN_PASSWORD` — senha do admin (definida pelo usuário)
- `GITHUB_TOKEN` — Personal Access Token com permissão `contents:write` no repositório
- `GITHUB_REPO` — ex: `gabrielararuna/numera`

O token **nunca** é exposto no bundle do cliente.

### Como o site consome o `content.json`

**Visibilidade de seções** — `App.jsx` controla com flags:
```jsx
import content from './content.json'

{content.sections.cases && <MetricsCarousel />}
{content.sections.ecosystem && <TradingInfrastructure />}
{content.sections.methodology && <Methodology />}
```

**Projetos** — `TradingInfrastructure.jsx` importa e filtra:
```js
import content from '../content.json'
const allProjects = content.projects.filter(p => p.visible)
```

**Cases** — `MetricsCarousel.jsx` filtra pelo array `content.cases`.

**Traduções** — `LanguageContext.jsx` importa de `content.translations` em vez de `translations.js`.

---

## Interface do Admin (`/admin`)

### Tela de Login
- Campo de senha + botão Entrar
- Em caso de erro: "Senha incorreta"
- Sessão guardada em `sessionStorage` (expira ao fechar o navegador)
- A rota `/admin` não é linkada em nenhum lugar público

### Painel Principal

**Header:** "Admin Numera" à esquerda + botão "Publicar" à direita.

**Estados do botão Publicar:**
- Desabilitado (cinza) — sem alterações pendentes
- Ativo (verde) — há alterações não publicadas
- Carregando — "Publicando..." com spinner
- Sucesso — "✓ Publicado — site atualiza em ~2 min" (some após 5s)
- Erro — mensagem do erro com botão para tentar novamente

**Abas do painel:**

| Aba | Conteúdo |
|---|---|
| Seções | Toggles on/off para: Ticker, Ecossistema, Cases, Metodologia, CTA |
| Projetos | Lista de cards: toggle visível, URL, tipo, WIP. Nome e descrição são editados na aba Textos (estão em `translations`). Botão para adicionar novo projeto (cria chaves nas 3 línguas). |
| Cases | Lista de cases: toggle visível (título e desc editados na aba Textos) |
| Serviços | 3 cards: toggle visível (textos editados na aba Textos) |
| Textos | Editor completo de todas as chaves de tradução, agrupadas por seção (Hero, Ticker, Navbar, Projetos, Cases, Serviços, CTA, Footer, Cookies), com sub-abas PT / EN / ES |

**Edição de textos em múltiplos idiomas:** sub-abas PT | EN | ES dentro de cada campo ou seção.

**Indicador de alterações pendentes:** badge vermelho no header enquanto há mudanças não publicadas, para evitar fechar por acidente.

---

## Arquivos a criar/modificar

| Arquivo | Ação |
|---|---|
| `src/content.json` | **Criar** — migrar todo o conteúdo de `translations.js` + dados hardcoded de projetos/cases/serviços |
| `src/i18n/LanguageContext.jsx` | **Modificar** — ler de `content.translations` em vez de `translations.js` |
| `src/i18n/translations.js` | **Remover** — substituído pelo `content.json` |
| `src/App.jsx` | **Modificar** — aplicar flags `content.sections.*` para renderização condicional |
| `src/components/TradingInfrastructure.jsx` | **Modificar** — usar `content.projects` filtrado por `visible` |
| `src/components/MetricsCarousel.jsx` | **Modificar** — usar `content.cases` filtrado por `visible` |
| `src/components/Methodology.jsx` | **Modificar** — usar `content.services` filtrado por `visible` |
| `src/pages/Admin.jsx` | **Criar** — painel admin completo |
| `package.json` | **Modificar** — adicionar dependência `react-router-dom` |
| `src/main.jsx` | **Modificar** — adicionar `react-router-dom` com rota `/` (site) e `/admin` (painel) |
| `functions/api/publish.js` | **Criar** — Cloudflare Pages Function (proxy GitHub API) |

---

## Fora do escopo

- Histórico de versões / rollback
- Preview ao vivo das edições antes de publicar
- Multi-usuário ou permissões granulares
- Upload de imagens via admin (imagens continuam gerenciadas via código/git)
