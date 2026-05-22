# Spec: Aprovação Google AdSense — gruponumera.com
**Data:** 2026-05-21  
**Status:** Aprovado  

---

## Contexto e problema

O site gruponumera.com foi rejeitado pelo Google AdSense por "conteúdo de baixo valor". A análise identificou três causas raiz:

1. **Renderização 100% client-side** — Googlebot recebe `<div id="root"></div>` sem JavaScript executado; não indexa conteúdo algum.
2. **Conteúdo insuficiente** — ~400 palavras no total, textos curtos, nenhum artigo ou seção editorial.
3. **Sem estrutura de páginas real** — Footer linka `/sobre`, `/solucoes`, `/contato` que não existem; o site é uma única SPA sem sub-páginas crawláveis.

---

## Solução: Opção B — Páginas estáticas ricas + melhorias na home

Seguir o padrão já existente no projeto (`privacidade.html`, `cookies.html`) e criar páginas HTML standalone com conteúdo completo em `public/`. Essas páginas são servidas pelo Cloudflare Pages sem depender de JavaScript, tornando-as 100% crawláveis.

Visual mantido: dark luxury, #000 background, #00BFA5 accent, Inter, shimmer, glass effects inline.

---

## Arquivos a criar

### `public/sobre/index.html`
**Conteúdo (~800 palavras):**
- H1: "Sobre a Numera"
- Seções: Quem somos, Nossa missão, Como trabalhamos (3 pilares: mapear → construir → transferir), Nossos números (stats), Equipe
- CTA final → link para home/#contact
- Design: mesmo CSS inline de privacidade.html + cards de stats em grid

### `public/solucoes/index.html`
**Conteúdo (~1000 palavras):**
- H1: "Soluções Numera"
- Intro: quem se beneficia
- 3 serviços detalhados: Automação e Otimização / Treinamentos Corporativos / Consultoria e Planejamento Estratégico
- Processo de trabalho em 4 passos (Diagnóstico → Projeto → Entrega → Transferência)
- Tecnologias utilizadas
- CTA final

### `public/contato/index.html`
**Conteúdo (~500 palavras + form):**
- H1: "Fale com a Numera"
- Intro + 3 canais (WhatsApp, e-mail, telefone) em cards
- Formulário via `mailto:` (nome, empresa, assunto, mensagem)
- FAQ rápido (3 perguntas inline)
- Sem dependências externas

---

## Arquivos a modificar

### `index.html` (raiz)
- Corrigir meta `description`: "A Numera desenvolve sistemas sob medida, automações e treinamentos em dados para empresas que precisam de mais eficiência operacional."
- Adicionar `<script type="application/ld+json">` com schema `Organization`
- Adicionar `<noscript>` com parágrafo de texto-âncora (fallback crawl)

### `src/content.json`
- Expandir `hero_description` (~40 → ~80 palavras cada idioma)
- Expandir `metric_*_desc` de todas as métricas (~30 → ~60 palavras)
- Expandir `methodology_card*_desc` (~40 → ~80 palavras)
- Adicionar chave `"faq"` com array de 6 objetos `{ q, a }` em PT/EN/ES

### `src/components/FAQ.jsx` (novo)
- Accordion simples: lista de perguntas/respostas, uma abre por vez
- Animação via framer-motion (height transition)
- Visual: borda `white/10`, sem background preenchido, ícone `+` / `−`
- Suporta `useLanguage()` para i18n

### `src/App.jsx`
- Importar e renderizar `<FAQ />` entre `<Methodology />` e `<CTASection />`
- Controlado pela chave `sections.faq` em `content.json`

### `public/sitemap.xml`
```xml
<urlset>
  <url><loc>https://gruponumera.com/</loc><priority>1.0</priority></url>
  <url><loc>https://gruponumera.com/sobre/</loc><priority>0.8</priority></url>
  <url><loc>https://gruponumera.com/solucoes/</loc><priority>0.8</priority></url>
  <url><loc>https://gruponumera.com/contato/</loc><priority>0.7</priority></url>
</urlset>
```

---

## Conteúdo FAQ (home, PT)

| # | Pergunta | Resposta |
|---|---|---|
| 1 | O que exatamente a Numera faz? | Desenvolvemos sistemas personalizados, dashboards, automações e treinamentos em dados para empresas que precisam de mais eficiência. Não vendemos software pronto: cada entrega é construída para o contexto específico do cliente. |
| 2 | Para quais setores vocês atendem? | Atendemos empresas de construção civil, engenharia, varejo, logística e serviços. A metodologia é agnóstica de setor: onde há dado e processo, há ganho. |
| 3 | Qual é o prazo médio de um projeto? | Projetos de automação e dashboards têm prazo de 3 a 8 semanas. Treinamentos podem ser concluídos em 2 a 4 semanas dependendo da carga horária acordada. |
| 4 | Vocês trabalham de forma remota? | Sim. Toda a nossa operação é remota, com comunicação estruturada e entregas documentadas. Quando necessário, realizamos visitas presenciais em São Luís e região. |
| 5 | Preciso ter equipe de TI para contratar? | Não. Nossos projetos são pensados para operar sem dependência de TI interna. Treinamos a equipe do cliente para usar e manter tudo o que entregamos. |
| 6 | Como começa um projeto com a Numera? | Com uma conversa. Mapeamos o problema, validamos o escopo e apresentamos uma proposta em até 48 horas. Sem burocracia. |

---

## Schema.org (index.html)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Numera",
  "url": "https://gruponumera.com",
  "logo": "https://gruponumera.com/favicon.svg",
  "description": "Empresa de tecnologia que desenvolve sistemas sob medida, automações e treinamentos em dados para empresas brasileiras.",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+55-98-99217-2631",
    "contactType": "customer support",
    "availableLanguage": ["Portuguese"]
  },
  "areaServed": "BR",
  "foundingDate": "2024"
}
```

---

## Critérios de sucesso

- [ ] Googlebot consegue ler conteúdo de `/`, `/sobre/`, `/solucoes/`, `/contato/` sem executar JS
- [ ] Cada página tem ≥ 500 palavras de texto original
- [ ] Todas as 4 URLs estão no sitemap.xml
- [ ] Meta descriptions únicas em cada página
- [ ] Structured data válido (testável em schema.org/validator)
- [ ] Visual consistente com o design existente (dark, #00BFA5, Inter)
- [ ] Nenhuma rota quebrada no footer ou navbar das páginas estáticas
