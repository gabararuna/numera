# Numera Admin CMS — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar um painel admin em `/admin` que permite editar textos (PT/EN/ES) e ativar/desativar projetos, cases, serviços e seções inteiras, publicando via commit no GitHub sem tocar no código.

**Architecture:** `src/content.json` substitui `translations.js` como fonte de verdade de todo o conteúdo configurável. Uma Cloudflare Pages Function (`functions/api/publish.js`) age como proxy seguro: verifica a senha e commita o novo `content.json` via GitHub API usando secrets do Cloudflare. O admin em `/admin` (rota React) edita um rascunho em memória e chama esse endpoint ao publicar.

**Tech Stack:** React 19, Vite, Tailwind CSS v4, react-router-dom, Cloudflare Pages Functions, GitHub Contents API

---

## Mapa de arquivos

| Arquivo | Ação |
|---|---|
| `src/content.json` | Criar — migra translations.js + dados hardcoded de projetos/cases |
| `src/i18n/LanguageContext.jsx` | Modificar — ler de `content.translations` |
| `src/i18n/translations.js` | Remover |
| `src/main.jsx` | Modificar — adicionar BrowserRouter + rota `/admin` |
| `src/App.jsx` | Modificar — aplicar flags `content.sections.*` |
| `src/components/TradingInfrastructure.jsx` | Modificar — usar `content.projects` filtrado |
| `src/components/MetricsCarousel.jsx` | Modificar — usar `content.cases` filtrado |
| `src/components/Methodology.jsx` | Modificar — usar `content.services` filtrado |
| `src/pages/Admin.jsx` | Criar — painel admin completo |
| `functions/api/publish.js` | Criar — Cloudflare Pages Function |
| `package.json` | Modificar — adicionar react-router-dom |

---

## Task 1: Criar `src/content.json`

**Files:**
- Create: `src/content.json`
- Remove: `src/i18n/translations.js` (apenas após Task 2 validada)

- [ ] **Step 1: Criar o arquivo `src/content.json`**

Crie `src/content.json` com o conteúdo abaixo. Este arquivo centraliza todo o conteúdo configurável do site.

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
    { "id": "esticaferias", "visible": true, "type": "calculator", "wip": false, "url": "http://esticaferias.gruponumera.com/" },
    { "id": "remunera",     "visible": true, "type": "calculator", "wip": false, "url": "http://remunera.gruponumera.com/" },
    { "id": "habita",       "visible": true, "type": "calculator", "wip": false, "url": "https://habita.gruponumera.com/" },
    { "id": "mega",         "visible": true, "type": "calculator", "wip": false, "url": "https://mega.gruponumera.com/" },
    { "id": "mobi",         "visible": true, "type": "calculator", "wip": false, "url": "https://mobi.gruponumera.com/" },
    { "id": "cronos",       "visible": true, "type": "app",        "wip": false, "url": "https://cronos.gruponumera.com/" },
    { "id": "monno",        "visible": true, "type": "app",        "wip": false, "url": "https://monno.gruponumera.com/" },
    { "id": "sage",         "visible": true, "type": "app",        "wip": false, "url": "https://sage.gruponumera.com/" },
    { "id": "bateesteira",  "visible": true, "type": "app",        "wip": true,  "url": "https://bateesteira.gruponumera.com/" },
    { "id": "integra",      "visible": true, "type": "app",        "wip": true,  "url": null },
    { "id": "nyot",         "visible": true, "type": "app",        "wip": false, "url": "https://nyot.gruponumera.com/" }
  ],
  "cases": [
    { "id": "0", "visible": true, "image": "/cases/nexus.jpeg" },
    { "id": "1", "visible": true, "image": "/cases/ruptura.jpeg" },
    { "id": "2", "visible": true, "image": "/cases/treinamento.jpg" },
    { "id": "3", "visible": true, "image": "/cases/gestaomateriais.jpeg" },
    { "id": "4", "visible": true, "image": "/cases/devolucao.jpeg" },
    { "id": "5", "visible": true, "image": "/cases/paineldetalhado.jpeg" },
    { "id": "6", "visible": true, "image": "/cases/cartadiretriz.jpeg" }
  ],
  "services": [
    { "id": "0", "visible": true },
    { "id": "1", "visible": true },
    { "id": "2", "visible": true }
  ],
  "translations": {
    "pt": {
      "nav_home": "Início",
      "nav_solutions": "Soluções",
      "nav_about": "Sobre",
      "nav_contact": "Contato",
      "hero_cta": "Fale Conosco",
      "hero_heading_1": "Faça a sua operação atingir o ápice.",
      "hero_heading_2": "Nós sabemos como chegar lá.",
      "hero_description": "Processos manuais, retrabalho e decisões sem dados custam tempo que o seu negócio não pode desperdiçar. A Numera desenvolve soluções de tecnologia personalizadas para o seu contexto, com foco em resultado prático.",
      "ticker_heading": "Empresas que escolheram a Numera para crescer com tecnologia.",
      "solutions_heading": "Cases de Sucesso",
      "solutions_description": "Veja como ajudamos empresas reais a trabalhar melhor e entregar mais.",
      "metric_0_title": "Controle de Entregas",
      "metric_0_desc": "Desenvolvemos um sistema para acompanhar a execução dos contratos desde a abertura até a entrega final. A equipe ganhou visibilidade total do processo e zerou o retrabalho por falta de informação.",
      "metric_1_title": "Alertas de Ruptura",
      "metric_1_desc": "Mapeamos os dados do banco de insumos e criamos alertas automáticos para materiais com risco de faltar em campo. A equipe passou a agir antes do problema acontecer.",
      "metric_2_title": "Capacitação em Dados",
      "metric_2_desc": "Levamos a equipe de planilhas compartilhadas para um sistema com banco de dados, SQL e BI. Analistas que dependiam de terceiros passaram a resolver problemas sozinhos.",
      "metric_3_title": "Gestão de Insumos",
      "metric_3_desc": "Criamos um sistema para controlar os indicadores de insumos das obras em tempo real. A gestão passou a identificar variações de qualidade que antes passavam despercebidas.",
      "metric_4_title": "Gestão de Estoque",
      "metric_4_desc": "Desenvolvemos um relatório de rastreamento de materiais devolvidos ao estoque. Os índices de retrabalho caíram e o inventário voltou a refletir a realidade da operação.",
      "metric_5_title": "Painel de Análise",
      "metric_5_desc": "Construímos um painel com o ciclo de vida completo dos insumos. A equipe passou a identificar pontos de falha antes que virassem problema na operação.",
      "metric_6_title": "Unificação de KPIs",
      "metric_6_desc": "Unimos as métricas de vários projetos em um único relatório de KPIs de obras. A gestão parou de buscar informação em vários lugares e ganhou tempo para decidir.",
      "methodology_heading": "Nossos Serviços",
      "methodology_description": "Mais produtividade, menos retrabalho e decisões melhores para o seu negócio.",
      "methodology_card0_label": "Processos",
      "methodology_card0_title": "Automação e Otimização",
      "methodology_card0_desc": "Mapeamos o que trava a sua operação e criamos a solução mais eficiente para o seu negócio. Dashboards, aplicações e automações feitas para o jeito que você trabalha, não para o mercado genérico.",
      "methodology_card1_label": "Treinamentos",
      "methodology_card1_title": "Treinamentos Corporativos",
      "methodology_card1_desc": "Sua equipe aprende fazendo, com treinamentos práticos em SQL, Python, BI e automação. O resultado é um time mais autônomo, com menos dependência de terceiros e impacto direto na produtividade.",
      "methodology_card2_label": "Consultoria",
      "methodology_card2_title": "Planejamento Estratégico",
      "methodology_card2_desc": "Decisões certas começam com dados confiáveis. Organizamos seus indicadores, identificamos o que está travando o crescimento e entregamos clareza sobre onde focar esforço para ter resultado.",
      "ecosystem_heading": "Ecossistema Numera",
      "ecosystem_description": "Sistemas reais, criados do zero para resolver problemas reais.",
      "ecosystem_filter_all": "Todos",
      "ecosystem_filter_calculators": "Calculadoras",
      "ecosystem_filter_apps": "Aplicativos",
      "ecosystem_access": "Acessar",
      "project_cronos": "Cronos",
      "cronos_desc": "Controla banco de horas com banco de dados próprio, login e ciclos configuráveis.",
      "project_monno": "Monno",
      "monno_desc": "Gestão financeira pessoal com categorização, planejamento e análise preditiva.",
      "project_esticaferias": "Estica Férias",
      "esticaferias_desc": "Descubra os melhores períodos para férias com base em feriados e fins de semana.",
      "project_remunera": "Remunera",
      "remunera_desc": "Compare a remuneração real de CLT, PJ e servidores com os lançamentos do ano.",
      "project_habita": "Habita",
      "habita_desc": "Financiar ou alugar? Descubra a opção mais vantajosa com base nos seus números.",
      "project_mega": "Mega",
      "mega_desc": "Saiba como investir um grande prêmio para preservar e multiplicar o patrimônio.",
      "project_mobi": "Mobi",
      "mobi_desc": "Compare financiamento, aquisição e apps e descubra o melhor cenário de mobilidade.",
      "project_sage": "Sage",
      "sage_desc": "Trilhas práticas em Ciência de Dados, Python, SQL e UI/UX numa plataforma escalável.",
      "project_bateesteira": "Bate Esteira",
      "bateesteira_desc": "Eventos de vaquejada com venda de senhas, sistema financeiro e split payment.",
      "project_integra": "Integra",
      "integra_desc": "Ciclo completo de contratos de engenharia, da abertura às medições, com permissões.",
      "project_nyot": "NYOT",
      "nyot_desc": "Rastreie hábitos, métricas corporais e treinos com visual minimalista e luxuoso.",
      "badge_calculator": "Calculadora Web",
      "badge_app": "Aplicação Web",
      "badge_wip": "Em Desenvolvimento",
      "cta_heading": "Pronto para ver a sua operação funcionar melhor?",
      "cta_description": "Fale com a Numera e descubra como podemos ajudar a sua equipe a trabalhar com mais eficiência e menos esforço desperdiçado.",
      "cta_button1": "WhatsApp",
      "cta_button2": "E-mail",
      "cta_button3": "Telefone",
      "cookie_text": "Utilizamos cookies essenciais para o funcionamento do site e, com seu consentimento, cookies analíticos para melhorar sua experiência. Saiba mais na nossa",
      "cookie_and": "e na",
      "cookie_accept": "Aceitar todos",
      "cookie_reject": "Apenas essenciais",
      "footer_copy": "© 2026 Numera. Todos os direitos reservados.",
      "footer_privacy": "Privacidade",
      "footer_cookies": "Cookies",
      "lang_pt": "PT",
      "lang_en": "EN",
      "lang_es": "ES"
    },
    "en": {
      "nav_home": "Home",
      "nav_solutions": "Solutions",
      "nav_about": "About",
      "nav_contact": "Contact",
      "hero_cta": "Contact Us",
      "hero_heading_1": "Your operation deserves to work better.",
      "hero_heading_2": "We know how to get there.",
      "hero_description": "Manual processes, rework and decisions without data cost time your business cannot afford to waste. Numera develops custom technology solutions for your context, focused on practical results.",
      "ticker_heading": "Companies that chose Numera to grow through technology.",
      "solutions_heading": "Success Stories",
      "solutions_description": "See how we helped real companies work better and deliver more.",
      "metric_0_title": "Delivery Control",
      "metric_0_desc": "We built a system to track contract execution from opening to final delivery. The team gained full visibility of the process and eliminated rework caused by missing information.",
      "metric_1_title": "Disruption Alerts",
      "metric_1_desc": "We mapped the input database and created automatic alerts for materials at risk of running out in the field. The team started acting before the problem happened.",
      "metric_2_title": "Data Skills Training",
      "metric_2_desc": "We moved the team from shared spreadsheets to a system with databases, SQL and BI. Analysts who relied on others started solving problems on their own.",
      "metric_3_title": "Inputs Management",
      "metric_3_desc": "We built a system to control construction site input indicators in real time. Management started spotting quality variations that used to go unnoticed.",
      "metric_4_title": "Stock Management",
      "metric_4_desc": "We developed a tracking report for materials returned to stock. Rework rates dropped and inventory started reflecting the actual state of operations.",
      "metric_5_title": "Analytics Panel",
      "metric_5_desc": "We built a dashboard covering the full input lifecycle. The team started identifying failure points before they turned into problems on the floor.",
      "metric_6_title": "KPIs Unification",
      "metric_6_desc": "We merged metrics from several projects into one construction KPI report. Management stopped searching across multiple sources and gained time to decide.",
      "methodology_heading": "Our Services",
      "methodology_description": "More productivity, less rework and better decisions for your business.",
      "methodology_card0_label": "Processes",
      "methodology_card0_title": "Automation and Optimization",
      "methodology_card0_desc": "We map what is slowing your operation down and build the most efficient solution for your business. Dashboards, applications and automations made for the way you work, not for the generic market.",
      "methodology_card1_label": "Training",
      "methodology_card1_title": "Corporate Training",
      "methodology_card1_desc": "Your team learns by doing, with hands-on training in SQL, Python, BI and automation. The result is a more autonomous team, less reliance on third parties and a direct impact on productivity.",
      "methodology_card2_label": "Consulting",
      "methodology_card2_title": "Strategic Planning",
      "methodology_card2_desc": "Right decisions start with reliable data. We organize your indicators, identify what is blocking growth and deliver clarity on where to focus effort to get results.",
      "ecosystem_heading": "Numera Ecosystem",
      "ecosystem_description": "Real systems, built from scratch to solve real problems.",
      "ecosystem_filter_all": "All",
      "ecosystem_filter_calculators": "Calculators",
      "ecosystem_filter_apps": "Apps",
      "ecosystem_access": "Access",
      "project_cronos": "Cronos",
      "cronos_desc": "Controls hour banks with a proprietary database, login and configurable cycles.",
      "project_monno": "Monno",
      "monno_desc": "Personal financial management with categorization, planning and predictive analysis.",
      "project_esticaferias": "Estica Férias",
      "esticaferias_desc": "Find the best vacation periods by crossing holidays, weekends and your location.",
      "project_remunera": "Remunera",
      "remunera_desc": "Compare real compensation for CLT, PJ and public servants across the full year.",
      "project_habita": "Habita",
      "habita_desc": "Buy or rent? Compare scenarios and find the most advantageous choice for your money.",
      "project_mega": "Mega",
      "mega_desc": "Plan how to invest a large prize to preserve and grow your personal wealth over time.",
      "project_mobi": "Mobi",
      "mobi_desc": "Compare financing, purchase and ride apps to find your best mobility scenario.",
      "project_sage": "Sage",
      "sage_desc": "Learning tracks in Data Science, Python, SQL and UI/UX built on a scalable platform.",
      "project_bateesteira": "Bate Esteira",
      "bateesteira_desc": "Vaquejada event management with ticket sales, financial system and split payment.",
      "project_integra": "Integra",
      "integra_desc": "Engineering contract lifecycle from opening to measurements, with user permissions.",
      "project_nyot": "NYOT",
      "nyot_desc": "Track habits, body metrics and workouts with a minimalist, polished interface.",
      "badge_calculator": "Web Calculator",
      "badge_app": "Web App",
      "badge_wip": "In Development",
      "cta_heading": "Ready to see your operation working better?",
      "cta_description": "Talk to Numera and find out how we can help your team work with more efficiency and less wasted effort.",
      "cta_button1": "WhatsApp",
      "cta_button2": "E-mail",
      "cta_button3": "Call Us",
      "cookie_text": "We use essential cookies for site functionality and, with your consent, analytics cookies to improve your experience. Learn more in our",
      "cookie_and": "and our",
      "cookie_accept": "Accept all",
      "cookie_reject": "Essential only",
      "footer_copy": "© 2026 Numera. All rights reserved.",
      "footer_privacy": "Privacy",
      "footer_cookies": "Cookies",
      "lang_pt": "PT",
      "lang_en": "EN",
      "lang_es": "ES"
    },
    "es": {
      "nav_home": "Inicio",
      "nav_solutions": "Soluciones",
      "nav_about": "Sobre",
      "nav_contact": "Contacto",
      "hero_cta": "Contáctenos",
      "hero_heading_1": "Su operación merece funcionar mejor.",
      "hero_heading_2": "Sabemos cómo llegar hasta ahí.",
      "hero_description": "Los procesos manuales, el retrabajo y las decisiones sin datos cuestan tiempo que su negocio no puede desperdiciar. Numera desarrolla soluciones tecnológicas personalizadas para su contexto, con foco en resultados prácticos.",
      "ticker_heading": "Empresas que eligieron Numera para crecer con tecnología.",
      "solutions_heading": "Casos de Éxito",
      "solutions_description": "Vea cómo ayudamos a empresas reales a trabajar mejor y entregar más.",
      "metric_0_title": "Control de Entregas",
      "metric_0_desc": "Desarrollamos un sistema para acompañar la ejecución de los contratos desde su apertura hasta la entrega final. El equipo ganó visibilidad total del proceso y eliminó el retrabajo por falta de información.",
      "metric_1_title": "Alertas de Ruptura",
      "metric_1_desc": "Mapeamos los datos del banco de insumos y creamos alertas automáticas para materiales con riesgo de falta en campo. El equipo empezó a actuar antes de que el problema ocurriera.",
      "metric_2_title": "Formación en Datos",
      "metric_2_desc": "Llevamos al equipo de hojas compartidas a un sistema con base de datos, SQL y BI. Analistas que dependían de terceros empezaron a resolver problemas por su cuenta.",
      "metric_3_title": "Gestión de Insumos",
      "metric_3_desc": "Creamos un sistema para controlar los indicadores de insumos de las obras en tiempo real. La gestión empezó a detectar variaciones de calidad que antes pasaban desapercibidas.",
      "metric_4_title": "Gestión de Stocks",
      "metric_4_desc": "Desarrollamos un informe de seguimiento de materiales devueltos al stock. Los índices de retrabajo bajaron y el inventario volvió a reflejar la realidad de la operación.",
      "metric_5_title": "Panel de Análisis",
      "metric_5_desc": "Construimos un panel con el ciclo de vida completo de los insumos. El equipo empezó a identificar puntos de falla antes de que se convirtieran en problemas en la operación.",
      "metric_6_title": "Unificación de KPIs",
      "metric_6_desc": "Unimos las métricas de varios proyectos en un único informe de KPIs de obras. La gestión dejó de buscar información en varios lugares y ganó tiempo para decidir.",
      "methodology_heading": "Servicios Clave",
      "methodology_description": "Más productividad, menos retrabajo y mejores decisiones para su negocio.",
      "methodology_card0_label": "Procesos",
      "methodology_card0_title": "Automatización y Optimización",
      "methodology_card0_desc": "Mapeamos lo que frena su operación y creamos la solución más eficiente para su negocio. Dashboards, aplicaciones y automatizaciones hechas para la forma en que usted trabaja, no para el mercado genérico.",
      "methodology_card1_label": "Formación",
      "methodology_card1_title": "Formaciones Corporativas",
      "methodology_card1_desc": "Su equipo aprende haciendo, con capacitaciones prácticas en SQL, Python, BI y automatización. El resultado es un equipo más autónomo, con menos dependencia de terceros e impacto directo en la productividad.",
      "methodology_card2_label": "Consultoría",
      "methodology_card2_title": "Planeamiento Estratégico",
      "methodology_card2_desc": "Las decisiones correctas comienzan con datos confiables. Organizamos sus indicadores, identificamos qué está bloqueando el crecimiento y entregamos claridad sobre dónde enfocar el esfuerzo para obtener resultados.",
      "ecosystem_heading": "Ecosistema Numera",
      "ecosystem_description": "Sistemas reales, creados desde cero para resolver problemas reales.",
      "ecosystem_filter_all": "Todos",
      "ecosystem_filter_calculators": "Calculadoras",
      "ecosystem_filter_apps": "Aplicaciones",
      "ecosystem_access": "Acceder",
      "project_cronos": "Cronos",
      "cronos_desc": "Controla el banco de horas con base de datos propia, login y ciclos configurables.",
      "project_monno": "Monno",
      "monno_desc": "Gestión financiera personal con categorización, planificación y análisis predictivo.",
      "project_esticaferias": "Estica Férias",
      "esticaferias_desc": "Los mejores períodos de vacaciones, cruzando festivos, fines de semana y ubicación.",
      "project_remunera": "Remunera",
      "remunera_desc": "Compara la remuneración real de CLT, PJ y servidores públicos a lo largo del año.",
      "project_habita": "Habita",
      "habita_desc": "¿Financiar o alquilar? Compara ambos escenarios y encuentra la opción más ventajosa.",
      "project_mega": "Mega",
      "mega_desc": "Planifica cómo invertir un gran premio para preservar y multiplicar tu patrimonio.",
      "project_mobi": "Mobi",
      "mobi_desc": "Compara opciones de financiación, adquisición y apps para tu mejor escenario.",
      "project_sage": "Sage",
      "sage_desc": "Rutas en Ciencia de Datos, Python, SQL e UI/UX en una plataforma de cursos escalable.",
      "project_bateesteira": "Bate Esteira",
      "bateesteira_desc": "Eventos de vaquejada con venta de entradas, sistema financiero y split payment.",
      "project_integra": "Integra",
      "integra_desc": "Ciclo completo de contratos de ingeniería, de la apertura a mediciones, con permisos.",
      "project_nyot": "NYOT",
      "nyot_desc": "Registra hábitos, métricas corporales y entrenamientos con diseño minimalista.",
      "badge_calculator": "Calculadora Web",
      "badge_app": "Aplicación Web",
      "badge_wip": "En Desarrollo",
      "cta_heading": "¿Listo para ver su operación funcionando mejor?",
      "cta_description": "Hable con Numera y descubra cómo podemos ayudar a su equipo a trabajar con más eficiencia y menos esfuerzo desperdiciado.",
      "cta_button1": "WhatsApp",
      "cta_button2": "E-mail",
      "cta_button3": "Teléfono",
      "cookie_text": "Usamos cookies esenciales para el funcionamiento del sitio y, con su consentimiento, cookies analíticas para mejorar su experiencia. Más información en nuestra",
      "cookie_and": "y en nuestra",
      "cookie_accept": "Aceptar todos",
      "cookie_reject": "Solo esenciales",
      "footer_copy": "© 2026 Numera. Todos los derechos reservados.",
      "footer_privacy": "Privacidad",
      "footer_cookies": "Cookies",
      "lang_pt": "PT",
      "lang_en": "EN",
      "lang_es": "ES"
    }
  }
}
```

- [ ] **Step 2: Verificar JSON válido**

```bash
cd /Users/gabrielararuna/Códigos/numera
node -e "require('./src/content.json'); console.log('JSON válido')"
```

Esperado: `JSON válido`

- [ ] **Step 3: Commit**

```bash
git add src/content.json
git commit -m "feat: add content.json as CMS source of truth"
```

---

## Task 2: Migrar LanguageContext para `content.json`

**Files:**
- Modify: `src/i18n/LanguageContext.jsx`
- Remove: `src/i18n/translations.js`

- [ ] **Step 1: Atualizar `src/i18n/LanguageContext.jsx`**

Substitua o conteúdo completo do arquivo:

```jsx
import { createContext, useContext, useState } from 'react'
import content from '../content.json'

const LanguageContext = createContext()

const languages = ['pt', 'en', 'es']
const defaultLanguage = 'pt'

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return defaultLanguage
  const saved = localStorage.getItem('numera-language')
  if (saved && languages.includes(saved)) return saved
  const browserLang = navigator.language.split('-')[0]
  if (languages.includes(browserLang)) return browserLang
  return defaultLanguage
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  const setLang = (newLang) => {
    if (languages.includes(newLang)) {
      setLangState(newLang)
      localStorage.setItem('numera-language', newLang)
    }
  }

  const t = (key) =>
    content.translations[lang]?.[key] ||
    content.translations[defaultLanguage]?.[key] ||
    key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export default LanguageContext
```

- [ ] **Step 2: Remover `src/i18n/translations.js`**

```bash
rm /Users/gabrielararuna/Códigos/numera/src/i18n/translations.js
```

- [ ] **Step 3: Verificar build sem erros**

```bash
cd /Users/gabrielararuna/Códigos/numera
npm run build 2>&1 | tail -20
```

Esperado: sem erros (pode ter warnings sobre chunks, isso é OK).

- [ ] **Step 4: Testar visualmente no dev server**

```bash
npm run dev
```

Abra `http://localhost:5173`. O site deve aparecer idêntico ao anterior. Troque o idioma e verifique que os textos mudam.

- [ ] **Step 5: Commit**

```bash
git add src/i18n/LanguageContext.jsx
git rm src/i18n/translations.js
git commit -m "feat: migrate LanguageContext to content.json"
```

---

## Task 3: Atualizar `App.jsx` — roteamento e visibilidade de seções

**Files:**
- Modify: `src/main.jsx`
- Modify: `src/App.jsx`
- Modify: `package.json`

- [ ] **Step 1: Instalar react-router-dom**

```bash
cd /Users/gabrielararuna/Códigos/numera
npm install react-router-dom
```

- [ ] **Step 2: Atualizar `src/main.jsx`**

Substitua o conteúdo:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
```

- [ ] **Step 3: Criar `src/pages/Admin.jsx` vazio temporário (para o build não quebrar)**

Crie o arquivo `src/pages/Admin.jsx` com:

```jsx
export default function Admin() {
  return <div className="min-h-screen bg-black text-white flex items-center justify-center">Admin — em construção</div>
}
```

- [ ] **Step 4: Atualizar `src/App.jsx` com visibilidade de seções**

Substitua o conteúdo:

```jsx
import { useEffect, useRef } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ExchangeTicker from './components/ExchangeTicker'
import TradingInfrastructure from './components/TradingInfrastructure'
import Methodology from './components/Methodology'
import MetricsCarousel from './components/MetricsCarousel'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import content from './content.json'

function CursorSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMove = (e) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: '700px',
        height: '700px',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0, 191, 165, 0.045) 0%, transparent 65%)',
        zIndex: 9998,
        left: '-999px',
        top: '-999px',
        borderRadius: '50%',
      }}
    />
  )
}

function App() {
  const { sections } = content
  return (
    <LanguageProvider>
      <CursorSpotlight />
      <CookieBanner />
      <div className="max-w-[1800px] mx-auto w-full relative">
        <Navbar />
        <main className="bg-black">
          <HeroSection />
          {sections.ticker     && <ExchangeTicker />}
          {sections.ecosystem  && <TradingInfrastructure />}
          {sections.cases      && <MetricsCarousel />}
          {sections.methodology && <Methodology />}
          {sections.cta        && <CTASection />}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
```

- [ ] **Step 5: Verificar build**

```bash
npm run build 2>&1 | tail -20
```

Esperado: sem erros.

- [ ] **Step 6: Testar no dev**

```bash
npm run dev
```

Acesse `http://localhost:5173` — site normal. Acesse `http://localhost:5173/admin` — deve exibir "Admin — em construção".

- [ ] **Step 7: Commit**

```bash
git add src/main.jsx src/App.jsx src/pages/Admin.jsx package.json package-lock.json
git commit -m "feat: add routing and section visibility from content.json"
```

---

## Task 4: Atualizar `TradingInfrastructure.jsx`

**Files:**
- Modify: `src/components/TradingInfrastructure.jsx`

- [ ] **Step 1: Substituir a lista hardcoded de projetos por `content.projects`**

No arquivo `src/components/TradingInfrastructure.jsx`, substitua o trecho que começa com `const allProjects = [` (linha ~78) e vai até o fechamento do array (linha ~158) pelo seguinte:

```jsx
import content from '../content.json'
```

Adicione o import acima de `import { useLanguage }` no topo do arquivo, depois substitua a construção de `allProjects`:

```jsx
  const allProjects = content.projects
    .filter((p) => p.visible)
    .map((p) => ({
      name: t(`project_${p.id}`),
      desc: t(`${p.id}_desc`),
      badge: p.wip ? t('badge_wip') : p.type === 'calculator' ? t('badge_calculator') : t('badge_app'),
      type: p.type,
      url: p.url,
      wip: p.wip,
    }))
```

O trecho `const tabs = [...]` e todo o restante do componente permanecem iguais.

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -20
```

Esperado: sem erros.

- [ ] **Step 3: Testar visualmente**

```bash
npm run dev
```

Acesse `http://localhost:5173`. A seção Ecossistema deve mostrar os mesmos 11 projetos.

- [ ] **Step 4: Commit**

```bash
git add src/components/TradingInfrastructure.jsx
git commit -m "feat: TradingInfrastructure reads projects from content.json"
```

---

## Task 5: Atualizar `MetricsCarousel.jsx`

**Files:**
- Modify: `src/components/MetricsCarousel.jsx`

- [ ] **Step 1: Substituir `cardImages` e a contagem dinâmica por `content.cases`**

No topo do arquivo, adicione o import:

```jsx
import content from '../content.json'
```

Remova as linhas do array `cardImages`:

```js
// REMOVER este bloco:
const cardImages = [
  '/cases/nexus.jpeg',
  '/cases/ruptura.jpeg',
  '/cases/treinamento.jpg',
  '/cases/gestaomateriais.jpeg',
  '/cases/devolucao.jpeg',
  '/cases/paineldetalhado.jpeg',
  '/cases/cartadiretriz.jpeg',
]
```

Dentro de `MetricsCarousel()`, substitua o bloco de construção de `metrics` (as linhas `let metricsCount...` até `const N = metrics.length`):

```jsx
  const visibleCases = content.cases.filter((c) => c.visible)
  const metrics = visibleCases.map((c) => ({
    title: t(`metric_${c.id}_title`),
    desc: t(`metric_${c.id}_desc`),
    image: c.image,
  }))
  const N = metrics.length
```

Na linha do JSX que usa `cardImages[i % N]`, substitua por `looped[i % (looped.length / 3)].image`:

```jsx
// ANTES:
style={{ backgroundImage: `url(${cardImages[i % N]})` }}

// DEPOIS:
style={{ backgroundImage: `url(${metric.image})` }}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -20
```

Esperado: sem erros.

- [ ] **Step 3: Testar visualmente**

```bash
npm run dev
```

O carrossel de cases deve aparecer igual ao anterior, com as mesmas imagens e textos.

- [ ] **Step 4: Commit**

```bash
git add src/components/MetricsCarousel.jsx
git commit -m "feat: MetricsCarousel reads cases from content.json"
```

---

## Task 6: Atualizar `Methodology.jsx`

**Files:**
- Modify: `src/components/Methodology.jsx`

- [ ] **Step 1: Filtrar cards por `content.services`**

Adicione o import no topo:

```jsx
import content from '../content.json'
```

Dentro de `Methodology()`, substitua a construção do `cards` array:

```jsx
  const cards = useMemo(() => 
    content.services
      .filter((s) => s.visible)
      .map((s) => ({
        label: t(`methodology_card${s.id}_label`),
        title: t(`methodology_card${s.id}_title`),
        desc:  t(`methodology_card${s.id}_desc`),
      }))
  , [t])
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -20
```

Esperado: sem erros.

- [ ] **Step 3: Testar visualmente**

```bash
npm run dev
```

A seção Serviços deve mostrar os 3 cards normalmente.

- [ ] **Step 4: Commit**

```bash
git add src/components/Methodology.jsx
git commit -m "feat: Methodology reads services from content.json"
```

---

## Task 7: Criar Cloudflare Pages Function

**Files:**
- Create: `functions/api/publish.js`

- [ ] **Step 1: Criar `functions/api/publish.js`**

```js
export async function onRequestPost(context) {
  const { request, env } = context

  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Body inválido' }, { status: 400 })
  }

  const { password, content } = body

  if (!password || password !== env.ADMIN_PASSWORD) {
    return Response.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  if (!content || typeof content !== 'object') {
    return Response.json({ error: 'Conteúdo inválido' }, { status: 400 })
  }

  const repo = env.GITHUB_REPO
  const token = env.GITHUB_TOKEN
  const filePath = 'src/content.json'

  try {
    // 1. Obter o SHA atual do arquivo no GitHub
    const metaRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'numera-admin',
          Accept: 'application/vnd.github+json',
        },
      }
    )

    if (!metaRes.ok) {
      const err = await metaRes.json()
      return Response.json({ error: `GitHub API: ${err.message}` }, { status: 502 })
    }

    const meta = await metaRes.json()
    const sha = meta.sha

    // 2. Codificar o novo conteúdo em base64 (suporte a unicode)
    const jsonStr = JSON.stringify(content, null, 2)
    const bytes = new TextEncoder().encode(jsonStr)
    let binary = ''
    for (const byte of bytes) binary += String.fromCharCode(byte)
    const encoded = btoa(binary)

    // 3. Commitar o arquivo atualizado
    const putRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${filePath}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'User-Agent': 'numera-admin',
          'Content-Type': 'application/json',
          Accept: 'application/vnd.github+json',
        },
        body: JSON.stringify({
          message: 'chore: update content via admin',
          content: encoded,
          sha,
        }),
      }
    )

    if (!putRes.ok) {
      const err = await putRes.json()
      return Response.json({ error: `GitHub commit: ${err.message}` }, { status: 502 })
    }

    return Response.json({ ok: true })
  } catch (err) {
    return Response.json({ error: err.message || 'Erro interno' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add functions/api/publish.js
git commit -m "feat: add Cloudflare Pages Function for admin publish"
```

- [ ] **Step 3: Configurar secrets no Cloudflare Pages Dashboard**

No painel do Cloudflare Pages → seu projeto → Settings → Environment variables → Production:

| Nome | Valor |
|---|---|
| `ADMIN_PASSWORD` | Sua senha escolhida (ex: uma frase segura) |
| `GITHUB_TOKEN` | Personal Access Token do GitHub com permissão `contents:write` no repositório |
| `GITHUB_REPO` | `seu-usuario/numera` (ex: `gabrielararuna/numera`) |

Para criar o GitHub PAT: github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens → New token → selecione apenas o repositório `numera` → permissão `Contents: Read and Write`.

---

## Task 8: Criar o painel Admin completo

**Files:**
- Modify: `src/pages/Admin.jsx` (substituir o placeholder)

- [ ] **Step 1: Substituir `src/pages/Admin.jsx` pelo componente completo**

```jsx
import { useState } from 'react'
import initialContent from '../content.json'

// ─── Constantes ──────────────────────────────────────────────────────────────

const TABS = ['sections', 'projects', 'cases', 'services', 'texts']
const TAB_LABELS = {
  sections: 'Seções',
  projects: 'Projetos',
  cases: 'Cases',
  services: 'Serviços',
  texts: 'Textos',
}
const LANGS = ['pt', 'en', 'es']

const SECTION_LABELS = {
  ticker: 'Ticker (empresas)',
  ecosystem: 'Ecossistema',
  cases: 'Cases de Sucesso',
  methodology: 'Nossos Serviços',
  cta: 'CTA (contato)',
}

const TEXT_GROUPS = {
  Navbar:    ['nav_home', 'nav_solutions', 'nav_about', 'nav_contact'],
  Hero:      ['hero_cta', 'hero_heading_1', 'hero_heading_2', 'hero_description'],
  Ticker:    ['ticker_heading'],
  Cases:     [
    'solutions_heading', 'solutions_description',
    'metric_0_title', 'metric_0_desc',
    'metric_1_title', 'metric_1_desc',
    'metric_2_title', 'metric_2_desc',
    'metric_3_title', 'metric_3_desc',
    'metric_4_title', 'metric_4_desc',
    'metric_5_title', 'metric_5_desc',
    'metric_6_title', 'metric_6_desc',
  ],
  Projetos:  [
    'ecosystem_heading', 'ecosystem_description',
    'ecosystem_filter_all', 'ecosystem_filter_calculators', 'ecosystem_filter_apps', 'ecosystem_access',
    'project_cronos', 'cronos_desc',
    'project_monno', 'monno_desc',
    'project_esticaferias', 'esticaferias_desc',
    'project_remunera', 'remunera_desc',
    'project_habita', 'habita_desc',
    'project_mega', 'mega_desc',
    'project_mobi', 'mobi_desc',
    'project_sage', 'sage_desc',
    'project_bateesteira', 'bateesteira_desc',
    'project_integra', 'integra_desc',
    'project_nyot', 'nyot_desc',
    'badge_calculator', 'badge_app', 'badge_wip',
  ],
  Serviços: [
    'methodology_heading', 'methodology_description',
    'methodology_card0_label', 'methodology_card0_title', 'methodology_card0_desc',
    'methodology_card1_label', 'methodology_card1_title', 'methodology_card1_desc',
    'methodology_card2_label', 'methodology_card2_title', 'methodology_card2_desc',
  ],
  CTA:       ['cta_heading', 'cta_description', 'cta_button1', 'cta_button2', 'cta_button3'],
  'Footer & Cookies': [
    'footer_copy', 'footer_privacy', 'footer_cookies',
    'cookie_text', 'cookie_and', 'cookie_accept', 'cookie_reject',
  ],
  Idiomas:   ['lang_pt', 'lang_en', 'lang_es'],
}

// ─── Componentes de UI ────────────────────────────────────────────────────────

function Toggle({ value, onChange }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${value ? 'bg-[#00BFA5]' : 'bg-white/20'}`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${value ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  )
}

function Field({ label, value, onChange, multiline = false }) {
  const cls = 'w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00BFA5]/50 transition-colors'
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] tracking-widest text-white/40 uppercase">{label}</label>
      {multiline
        ? <textarea rows={3} className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
        : <input type="text" className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      }
    </div>
  )
}

// ─── Abas ─────────────────────────────────────────────────────────────────────

function SectionsTab({ draft, update }) {
  return (
    <div className="space-y-3">
      {Object.entries(SECTION_LABELS).map(([key, label]) => (
        <div key={key} className="flex items-center justify-between p-4 border border-white/10 rounded-xl">
          <span className="text-sm text-white/80">{label}</span>
          <Toggle
            value={draft.sections[key]}
            onChange={(val) => update({ ...draft, sections: { ...draft.sections, [key]: val } })}
          />
        </div>
      ))}
    </div>
  )
}

function ProjectsTab({ draft, update }) {
  const setProject = (idx, field, val) => {
    const projects = draft.projects.map((p, i) => i === idx ? { ...p, [field]: val } : p)
    update({ ...draft, projects })
  }

  return (
    <div className="space-y-4">
      {draft.projects.map((p, idx) => (
        <div key={p.id} className="border border-white/10 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-white">{p.id}</span>
            <Toggle value={p.visible} onChange={(val) => setProject(idx, 'visible', val)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="URL" value={p.url ?? ''} onChange={(val) => setProject(idx, 'url', val || null)} />
            <div className="flex flex-col gap-1">
              <label className="text-[10px] tracking-widest text-white/40 uppercase">Tipo</label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#00BFA5]/50"
                value={p.type}
                onChange={(e) => setProject(idx, 'type', e.target.value)}
              >
                <option value="app">Aplicativo</option>
                <option value="calculator">Calculadora</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Toggle value={p.wip} onChange={(val) => setProject(idx, 'wip', val)} />
            <span className="text-xs text-white/50">Em desenvolvimento (WIP)</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CasesTab({ draft, update }) {
  const setCase = (idx, val) => {
    const cases = draft.cases.map((c, i) => i === idx ? { ...c, visible: val } : c)
    update({ ...draft, cases })
  }

  return (
    <div className="space-y-3">
      {draft.cases.map((c, idx) => (
        <div key={c.id} className="flex items-center justify-between p-4 border border-white/10 rounded-xl">
          <div>
            <p className="text-sm text-white/80">Case {parseInt(c.id) + 1}</p>
            <p className="text-xs text-white/40">{c.image}</p>
          </div>
          <Toggle value={c.visible} onChange={(val) => setCase(idx, val)} />
        </div>
      ))}
    </div>
  )
}

function ServicesTab({ draft, update }) {
  const setService = (idx, val) => {
    const services = draft.services.map((s, i) => i === idx ? { ...s, visible: val } : s)
    update({ ...draft, services })
  }

  const serviceNames = ['Automação e Otimização', 'Treinamentos Corporativos', 'Planejamento Estratégico']

  return (
    <div className="space-y-3">
      {draft.services.map((s, idx) => (
        <div key={s.id} className="flex items-center justify-between p-4 border border-white/10 rounded-xl">
          <span className="text-sm text-white/80">{serviceNames[idx]}</span>
          <Toggle value={s.visible} onChange={(val) => setService(idx, val)} />
        </div>
      ))}
    </div>
  )
}

function TextsTab({ draft, update, langTab, setLangTab }) {
  const setTranslation = (key, val) => {
    update({
      ...draft,
      translations: {
        ...draft.translations,
        [langTab]: { ...draft.translations[langTab], [key]: val },
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Abas de idioma */}
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l}
            onClick={() => setLangTab(l)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
              langTab === l
                ? 'border-[#00BFA5]/60 text-[#00BFA5] bg-[#00BFA5]/8'
                : 'border-white/10 text-white/40 hover:text-white/60'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grupos de texto */}
      {Object.entries(TEXT_GROUPS).map(([groupName, keys]) => (
        <div key={groupName} className="space-y-3">
          <h3 className="text-[10px] tracking-widest text-white/40 uppercase border-b border-white/10 pb-2">
            {groupName}
          </h3>
          <div className="space-y-3">
            {keys.map((key) => (
              <Field
                key={key}
                label={key}
                value={draft.translations[langTab]?.[key] ?? ''}
                onChange={(val) => setTranslation(key, val)}
                multiline={key.endsWith('_desc') || key.endsWith('_description') || key === 'hero_description' || key === 'cta_description' || key === 'cookie_text'}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

// ─── Login ────────────────────────────────────────────────────────────────────

function LoginScreen({ password, setPassword, onSubmit, error }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 px-6">
        <h1 className="text-xl font-light text-white tracking-tight">Admin Numera</h1>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00BFA5]/50"
          autoFocus
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit"
          className="w-full bg-[#00BFA5] hover:bg-[#00a896] text-black text-sm font-medium py-3 rounded-lg transition-colors cursor-pointer"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}

// ─── Componente principal ─────────────────────────────────────────────────────

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('admin_ok'))
  const [loginError, setLoginError] = useState('')
  const [draft, setDraft] = useState(initialContent)
  const [tab, setTab] = useState('sections')
  const [langTab, setLangTab] = useState('pt')
  const [dirty, setDirty] = useState(false)
  const [publishState, setPublishState] = useState('idle')
  const [publishError, setPublishError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!password.trim()) return
    sessionStorage.setItem('admin_ok', password)
    setAuthed(true)
    setLoginError('')
  }

  const update = (newDraft) => {
    setDraft(newDraft)
    setDirty(true)
  }

  const handlePublish = async () => {
    setPublishState('loading')
    setPublishError('')
    try {
      const res = await fetch('/api/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: sessionStorage.getItem('admin_ok'), content: draft }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Erro desconhecido')
      setPublishState('success')
      setDirty(false)
      setTimeout(() => setPublishState('idle'), 6000)
    } catch (err) {
      setPublishError(err.message)
      setPublishState('error')
      // Limpa sessão se senha incorreta
      if (err.message === 'Senha incorreta') {
        sessionStorage.removeItem('admin_ok')
        setAuthed(false)
        setLoginError('Senha incorreta. Tente novamente.')
      }
    }
  }

  if (!authed) {
    return <LoginScreen password={password} setPassword={setPassword} onSubmit={handleLogin} error={loginError} />
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-sm font-medium text-white">Admin Numera</h1>
          {dirty && (
            <span className="w-2 h-2 rounded-full bg-amber-400" title="Alterações não publicadas" />
          )}
        </div>
        <div className="flex items-center gap-3">
          {publishState === 'success' && (
            <span className="text-xs text-[#00BFA5]">✓ Publicado — site atualiza em ~2 min</span>
          )}
          {publishState === 'error' && (
            <span className="text-xs text-red-400">{publishError}</span>
          )}
          <button
            onClick={handlePublish}
            disabled={!dirty || publishState === 'loading'}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${
              !dirty || publishState === 'loading'
                ? 'bg-white/10 text-white/30 cursor-not-allowed'
                : 'bg-[#00BFA5] hover:bg-[#00a896] text-black'
            }`}
          >
            {publishState === 'loading' ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </header>

      {/* Tabs */}
      <nav className="px-6 border-b border-white/10 flex gap-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-xs tracking-wider font-medium border-b-2 transition-all cursor-pointer ${
              tab === t
                ? 'border-[#00BFA5] text-[#00BFA5]'
                : 'border-transparent text-white/40 hover:text-white/60'
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </nav>

      {/* Conteúdo */}
      <main className="max-w-3xl mx-auto px-6 py-8">
        {tab === 'sections'  && <SectionsTab  draft={draft} update={update} />}
        {tab === 'projects'  && <ProjectsTab  draft={draft} update={update} />}
        {tab === 'cases'     && <CasesTab     draft={draft} update={update} />}
        {tab === 'services'  && <ServicesTab  draft={draft} update={update} />}
        {tab === 'texts'     && <TextsTab     draft={draft} update={update} langTab={langTab} setLangTab={setLangTab} />}
      </main>
    </div>
  )
}
```

- [ ] **Step 2: Verificar build**

```bash
npm run build 2>&1 | tail -20
```

Esperado: sem erros.

- [ ] **Step 3: Testar o admin localmente**

```bash
npm run dev
```

Acesse `http://localhost:5173/admin`:
- Tela de login aparece
- Digite qualquer senha → painel abre
- Navegue pelas abas: Seções, Projetos, Cases, Serviços, Textos
- Toggle de seção muda o estado (bolinha laranja no header indica alteração)
- Botão "Publicar" fica ativo ao editar algo
- Botão "Publicar" fica desabilitado sem alterações

> Note: o Publicar vai retornar erro localmente (não há Cloudflare Function no dev). Isso é esperado.

- [ ] **Step 4: Commit**

```bash
git add src/pages/Admin.jsx
git commit -m "feat: complete admin panel with sections/projects/cases/services/texts tabs"
```

---

## Task 9: Push e verificação em produção

- [ ] **Step 1: Confirmar que todos os secrets estão configurados no Cloudflare**

No Cloudflare Pages dashboard, verifique se `ADMIN_PASSWORD`, `GITHUB_TOKEN` e `GITHUB_REPO` estão presentes em Production environment variables.

- [ ] **Step 2: Push para o GitHub**

```bash
git push origin main
```

Aguarde o build do Cloudflare (~2-3 min).

- [ ] **Step 3: Testar o site em produção**

Acesse o site em produção e verifique que está igual ao anterior.

- [ ] **Step 4: Testar o admin em produção**

Acesse `<seu-dominio>/admin`:
- Faça login com a senha definida em `ADMIN_PASSWORD`
- Desative uma seção (ex: Ticker)
- Clique "Publicar"
- Aguarde a mensagem "✓ Publicado"
- Após ~2 min, atualize o site — a seção deve ter desaparecido

- [ ] **Step 5: Reverter o teste**

Volte ao admin, reative a seção desativada e publique novamente para confirmar que o fluxo de ida e volta funciona.

---

## Notas de configuração pós-deploy

**GitHub PAT (token):**
- Crie em: github.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens
- Repository access: apenas o repositório `numera`
- Permissions → Contents: Read and Write

**GITHUB_REPO:**
- Formato: `usuario/repo` ex: `gabrielararuna/numera`

**Adicionar novo projeto pelo admin:**
- Aba Projetos não tem "adicionar" ainda (fora do escopo do MVP). Para novos projetos: edite `content.json` manualmente e adicione as chaves de tradução via aba Textos.
