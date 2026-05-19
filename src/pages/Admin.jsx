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

function LoginScreen({ password, setPassword, onSubmit, error, loading }) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4 px-6">
        <h1 className="text-xl font-light text-white tracking-tight">Admin Numera</h1>
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#00BFA5]/50 disabled:opacity-50"
          autoFocus
        />
        {error && <p className="text-red-400 text-xs">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#00BFA5] hover:bg-[#00a896] text-black text-sm font-medium py-3 rounded-lg transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Verificando...' : 'Entrar'}
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
    return <LoginScreen password={password} setPassword={setPassword} onSubmit={handleLogin} error={loginError} loading={loginLoading} />
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
