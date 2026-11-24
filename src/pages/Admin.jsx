import { useState } from 'react'
import { Link } from 'react-router-dom'
import initialContent from '../content.json'
import { NumeraLogo } from '../components/BrandMarks'

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
  faq: 'Perguntas Frequentes',
  cta: 'CTA (contato)',
}

const TEXT_GROUPS = {
  Navbar: ['nav_home', 'nav_solutions', 'nav_about', 'nav_contact', 'nav_ecosystem', 'theme_light', 'theme_dark'],
  Hero: [
    'hero_badge', 'hero_cta', 'hero_cta_secondary',
    'hero_heading_1', 'hero_heading_2', 'hero_description',
    'stat_projects', 'stat_companies', 'stat_trained',
  ],
  Ticker: ['ticker_heading'],
  Cases: [
    'solutions_heading', 'solutions_description',
    'metric_0_title', 'metric_0_desc',
    'metric_1_title', 'metric_1_desc',
    'metric_2_title', 'metric_2_desc',
    'metric_3_title', 'metric_3_desc',
    'metric_4_title', 'metric_4_desc',
    'metric_5_title', 'metric_5_desc',
    'metric_6_title', 'metric_6_desc',
  ],
  Projetos: [
    'ecosystem_heading', 'ecosystem_description',
    'ecosystem_flagship_label', 'ecosystem_tools_label', 'endorsement_app',
    'ecosystem_filter_all', 'ecosystem_filter_calculators', 'ecosystem_filter_apps', 'ecosystem_access',
    'project_cronos', 'cronos_short', 'cronos_status_label', 'cronos_desc',
    'project_monno', 'monno_short', 'monno_metric_label', 'monno_desc',
    'project_nyot', 'nyot_short', 'nyot_metric_label', 'nyot_desc',
    'project_esticaferias', 'esticaferias_desc',
    'project_remunera', 'remunera_desc',
    'project_habita', 'habita_desc',
    'project_mega', 'mega_desc',
    'project_mobi', 'mobi_desc',
    'project_sage', 'sage_desc',
    'project_bateesteira', 'bateesteira_desc',
    'project_integra', 'integra_desc',
    'badge_calculator', 'badge_app', 'badge_wip',
  ],
  Serviços: [
    'methodology_heading', 'methodology_description', 'services_more',
    'methodology_card0_label', 'methodology_card0_title', 'methodology_card0_desc',
    'methodology_card1_label', 'methodology_card1_title', 'methodology_card1_desc',
    'methodology_card2_label', 'methodology_card2_title', 'methodology_card2_desc',
  ],
  FAQ: [
    'faq_heading', 'faq_description',
    'faq_0_q', 'faq_0_a',
    'faq_1_q', 'faq_1_a',
    'faq_2_q', 'faq_2_a',
    'faq_3_q', 'faq_3_a',
    'faq_4_q', 'faq_4_a',
    'faq_5_q', 'faq_5_a',
  ],
  CTA: ['cta_heading', 'cta_description', 'cta_button1', 'cta_button2', 'cta_button3', 'cta_sla'],
  'Footer & Cookies': [
    'footer_copy', 'footer_privacy', 'footer_cookies',
    'cookie_text', 'cookie_and', 'cookie_accept', 'cookie_reject',
  ],
  Idiomas: ['lang_pt', 'lang_en', 'lang_es'],
}

function Toggle({ value, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={Boolean(value)}
      aria-label={label || 'Alternar opção'}
      onClick={() => onChange(!value)}
      className={`relative inline-flex items-center w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ease-numera cursor-pointer shrink-0 ${
        value ? 'bg-accent' : 'bg-fg/18'
      }`}
    >
      <span
        className={`w-5 h-5 rounded-full transition-[transform,background-color] duration-200 ease-numera ${
          value ? 'translate-x-5 bg-accent-on' : 'translate-x-0 bg-fg-2'
        }`}
      />
    </button>
  )
}

function Field({ label, value, onChange, multiline = false, monoLabel = false }) {
  const cls =
    'w-full bg-sunken border border-fg/12 rounded-field px-3.5 py-2.5 text-sm text-fg placeholder-fg-3 focus:outline-none focus:border-fg/40 transition-colors duration-200 ease-numera'
  return (
    <div className="flex flex-col gap-1.5">
      <label className={monoLabel ? 'font-mono text-xs text-fg-3' : 'label-ui text-fg-3'}>
        {label}
      </label>
      {multiline ? (
        <textarea rows={3} className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input type="text" className={cls} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  )
}

function SectionsTab({ draft, update }) {
  return (
    <div className="space-y-3">
      {Object.entries(SECTION_LABELS).map(([key, label]) => (
        <div key={key} className="flex items-center justify-between p-4 bg-raised border border-fg/10 rounded-card">
          <span className="text-sm font-medium text-fg">{label}</span>
          <Toggle
            label={label}
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
    const projects = draft.projects.map((p, i) => (i === idx ? { ...p, [field]: val } : p))
    update({ ...draft, projects })
  }

  return (
    <div className="space-y-4">
      {draft.projects.map((p, idx) => (
        <div key={p.id} className="bg-raised border border-fg/10 rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-fg">{p.id}</span>
            <Toggle
              label={`Visibilidade ${p.id}`}
              value={p.visible}
              onChange={(val) => setProject(idx, 'visible', val)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="URL" value={p.url ?? ''} onChange={(val) => setProject(idx, 'url', val || null)} />
            <div className="flex flex-col gap-1.5">
              <label className="label-ui text-fg-3">Tipo</label>
              <select
                className="w-full bg-sunken border border-fg/12 rounded-field px-3.5 py-2.5 text-sm text-fg focus:outline-none focus:border-fg/40"
                value={p.type}
                onChange={(e) => setProject(idx, 'type', e.target.value)}
              >
                <option value="app" className="bg-raised text-fg">Aplicativo</option>
                <option value="calculator" className="bg-raised text-fg">Calculadora</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Toggle
              label={`WIP ${p.id}`}
              value={p.wip}
              onChange={(val) => setProject(idx, 'wip', val)}
            />
            <span className="text-xs text-fg-2">Em desenvolvimento (WIP)</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function CasesTab({ draft, update }) {
  const setCase = (idx, val) => {
    const cases = draft.cases.map((c, i) => (i === idx ? { ...c, visible: val } : c))
    update({ ...draft, cases })
  }

  return (
    <div className="space-y-3">
      {draft.cases.map((c, idx) => (
        <div key={c.id} className="flex items-center justify-between p-4 bg-raised border border-fg/10 rounded-card">
          <div>
            <p className="text-sm font-medium text-fg num">Case {parseInt(c.id, 10) + 1}</p>
            <p className="font-mono text-xs text-fg-3 mt-0.5">{c.image}</p>
          </div>
          <Toggle
            label={`Visibilidade Case ${parseInt(c.id, 10) + 1}`}
            value={c.visible}
            onChange={(val) => setCase(idx, val)}
          />
        </div>
      ))}
    </div>
  )
}

function ServicesTab({ draft, update }) {
  const setService = (idx, val) => {
    const services = draft.services.map((s, i) => (i === idx ? { ...s, visible: val } : s))
    update({ ...draft, services })
  }

  const serviceNames = ['Automação e Otimização', 'Treinamentos Corporativos', 'Planejamento Estratégico']

  return (
    <div className="space-y-3">
      {draft.services.map((s, idx) => (
        <div key={s.id} className="flex items-center justify-between p-4 bg-raised border border-fg/10 rounded-card">
          <span className="text-sm font-medium text-fg">{serviceNames[idx]}</span>
          <Toggle
            label={serviceNames[idx]}
            value={s.visible}
            onChange={(val) => setService(idx, val)}
          />
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
      <div className="flex gap-2">
        {LANGS.map((l) => (
          <button
            key={l}
            type="button"
            onClick={() => setLangTab(l)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border cursor-pointer transition-[background-color,border-color,color] duration-200 ease-numera ${
              langTab === l
                ? 'bg-accent text-accent-on border-accent'
                : 'border-fg/12 bg-raised text-fg-3 hover:text-fg'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      {Object.entries(TEXT_GROUPS).map(([groupName, keys]) => (
        <div key={groupName} className="rounded-card bg-raised border border-fg/10 p-5 space-y-4">
          <h3 className="label-ui text-fg-3 border-b border-fg/10 pb-2.5">
            {groupName}
          </h3>
          <div className="space-y-3">
            {keys.map((key) => (
              <Field
                key={key}
                label={key}
                monoLabel
                value={draft.translations[langTab]?.[key] ?? ''}
                onChange={(val) => setTranslation(key, val)}
                multiline={
                  key.endsWith('_desc') ||
                  key.endsWith('_description') ||
                  key.endsWith('_a') ||
                  key === 'hero_description' ||
                  key === 'cta_description' ||
                  key === 'cookie_text'
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function LoginScreen({ password, setPassword, onSubmit, error, loading }) {
  return (
    <div className="min-h-screen bg-canvas text-fg flex items-center justify-center px-5">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-card bg-raised border border-fg/10 p-7 space-y-5">
        <div className="flex items-center justify-between">
          <NumeraLogo markSize={22} textSize="text-[17px]" />
          <span className="label-ui text-fg-3">Admin</span>
        </div>
        <div className="space-y-2">
          <label className="label-ui text-fg-3 block">Senha de acesso</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            className="w-full bg-sunken border border-fg/12 rounded-field px-4 py-3 text-sm text-fg placeholder-fg-3 focus:outline-none focus:border-fg/40 disabled:opacity-50"
            autoFocus
          />
        </div>
        {error && <p className="text-negative-fg text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-accent hover:bg-accent-hover text-accent-on text-sm font-medium py-3 rounded-full transition-[background-color,opacity] duration-200 ease-numera cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verificando...' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(() => !!sessionStorage.getItem('admin_ok'))
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  const [draft, setDraft] = useState(initialContent)
  const [tab, setTab] = useState('sections')
  const [langTab, setLangTab] = useState('pt')
  const [dirty, setDirty] = useState(false)
  const [publishState, setPublishState] = useState('idle')
  const [publishError, setPublishError] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!password.trim()) return
    setLoginLoading(true)
    setLoginError('')
    try {
      const res = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()
      if (!res.ok || data.error) throw new Error(data.error || 'Senha incorreta')
      sessionStorage.setItem('admin_ok', password)
      setAuthed(true)
    } catch (err) {
      setLoginError(err.message)
    } finally {
      setLoginLoading(false)
    }
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
      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error(`Erro ${res.status}: a Function /api/publish não respondeu com JSON. Verifique o Cloudflare.`)
      }
      if (!res.ok || data.error) throw new Error(data.error || 'Erro desconhecido')
      setPublishState('success')
      setDirty(false)
      setTimeout(() => setPublishState('idle'), 6000)
    } catch (err) {
      setPublishError(err.message)
      setPublishState('error')
      if (err.message === 'Senha incorreta') {
        sessionStorage.removeItem('admin_ok')
        setAuthed(false)
        setLoginError('Senha incorreta. Tente novamente.')
      }
    }
  }

  if (!authed) {
    return (
      <LoginScreen
        password={password}
        setPassword={setPassword}
        onSubmit={handleLogin}
        error={loginError}
        loading={loginLoading}
      />
    )
  }

  return (
    <div className="min-h-screen bg-canvas text-fg">
      <header className="sticky top-0 z-10 glass-bar px-5 md:px-8 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link to="/" className="inline-flex items-center">
            <NumeraLogo markSize={20} textSize="text-[16px]" />
          </Link>
          <span className="label-ui text-fg-3">Admin</span>
          {dirty && (
            <span className="w-2 h-2 rounded-full bg-warning" title="Alterações não publicadas" />
          )}
        </div>

        <div className="flex items-center gap-3">
          {publishState === 'success' && (
            <span className="text-xs text-positive-fg">Publicado — atualização em ~2 min</span>
          )}
          {publishState === 'error' && (
            <span className="text-xs text-negative-fg">{publishError}</span>
          )}
          <button
            type="button"
            onClick={handlePublish}
            disabled={!dirty || publishState === 'loading'}
            className={`px-5 py-2 rounded-full text-xs font-medium transition-[background-color,color,opacity] duration-200 ease-numera ${
              !dirty || publishState === 'loading'
                ? 'bg-sunken text-fg-3 cursor-not-allowed'
                : 'bg-accent hover:bg-accent-hover text-accent-on cursor-pointer'
            }`}
          >
            {publishState === 'loading' ? 'Publicando...' : 'Publicar'}
          </button>
        </div>
      </header>

      <nav className="px-5 md:px-8 border-b border-fg/10 flex gap-1 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-3 text-xs font-medium border-b-2 whitespace-nowrap cursor-pointer transition-[border-color,color] duration-200 ease-numera ${
              tab === t
                ? 'border-fg text-fg'
                : 'border-transparent text-fg-3 hover:text-fg-2'
            }`}
          >
            {TAB_LABELS[t]}
          </button>
        ))}
      </nav>

      <main className="max-w-3xl mx-auto px-5 md:px-8 py-8">
        {tab === 'sections' && <SectionsTab draft={draft} update={update} />}
        {tab === 'projects' && <ProjectsTab draft={draft} update={update} />}
        {tab === 'cases' && <CasesTab draft={draft} update={update} />}
        {tab === 'services' && <ServicesTab draft={draft} update={update} />}
        {tab === 'texts' && <TextsTab draft={draft} update={update} langTab={langTab} setLangTab={setLangTab} />}
      </main>
    </div>
  )
}
