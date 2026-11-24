import { useState } from 'react'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { EcosystemMark, StatusDot } from './BrandMarks'
import content from '../content.json'

const FLAGSHIP_IDS = new Set(['monno', 'cronos', 'nyot'])
const FLAGSHIP_ORDER = ['monno', 'cronos', 'nyot']

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

function FlagshipSignature({ id, t }) {
  if (id === 'monno') {
    const heights = [14, 22, 12, 26, 18, 10, 16]
    return (
      <div className="rounded-field bg-sunken/70 border border-fg/[0.08] px-3.5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-end gap-1.5 h-7" aria-hidden="true">
          {heights.map((h, idx) => (
            <span
              key={idx}
              className={`w-1.5 rounded-full ${idx === 3 ? 'bg-positive' : 'bg-fg/25'}`}
              style={{ height: `${h}px` }}
            />
          ))}
        </div>
        <div className="text-right">
          <div className="num text-xs font-medium text-positive-fg">+ R$ 640,00</div>
          <div className="text-[11px] text-fg-3">{t('monno_metric_label')}</div>
        </div>
      </div>
    )
  }

  if (id === 'cronos') {
    return (
      <div className="rounded-field bg-sunken/70 border border-fg/[0.08] px-3.5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-fg-2 num">
          <span className="px-2 py-0.5 rounded-tag bg-canvas/60 border border-fg/10 text-positive-fg">+12:10</span>
          <span className="text-fg-3">17:42</span>
        </div>
        <StatusDot tone="positive" label={t('cronos_status_label')} className="text-xs font-medium" />
      </div>
    )
  }

  if (id === 'nyot') {
    const days = [1, 1, 1, 0.4, 1, 1, 0]
    return (
      <div className="rounded-field bg-sunken/70 border border-fg/[0.08] px-3.5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          {days.map((d, idx) => (
            <span
              key={idx}
              className={`w-3.5 h-3.5 rounded-[5px] ${
                d === 1
                  ? 'bg-fg'
                  : d > 0
                    ? 'bg-fg/35'
                    : 'border border-fg/25 bg-transparent'
              }`}
            />
          ))}
        </div>
        <div className="num text-xs text-fg-2">{t('nyot_metric_label')}</div>
      </div>
    )
  }

  return null
}

function bestCols(count, maxCols) {
  for (let c = maxCols; c >= 2; c--) {
    if (count % c !== 1) return c
  }
  return 2
}

const MD_COLS = { 2: 'md:grid-cols-2', 3: 'md:grid-cols-3' }
const LG_COLS = { 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4' }

function cleanDomain(url) {
  if (!url) return ''
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

export default function TradingInfrastructure() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const visibleProjects = content.projects
    .filter((p) => p.visible)
    .map((p) => ({
      id: p.id,
      name: t(`project_${p.id}`),
      desc: t(`${p.id}_desc`),
      badge: p.wip ? t('badge_wip') : p.type === 'calculator' ? t('badge_calculator') : t('badge_app'),
      type: p.type,
      url: p.url,
      wip: p.wip,
    }))

  const flagships = FLAGSHIP_ORDER
    .map((id) => visibleProjects.find((p) => p.id === id))
    .filter((p) => p && (filter === 'all' || filter === 'app'))

  const others = visibleProjects
    .filter((p) => !FLAGSHIP_IDS.has(p.id))
    .filter((p) => filter === 'all' || p.type === filter)
    .sort((a, b) => (a.wip ? 1 : 0) - (b.wip ? 1 : 0))

  const tabs = [
    { key: 'all', label: t('ecosystem_filter_all') },
    { key: 'app', label: t('ecosystem_filter_apps') },
    { key: 'calculator', label: t('ecosystem_filter_calculators') },
  ]

  const count = others.length
  const colsMd = bestCols(count, 3)
  const colsLg = bestCols(count, 4)

  return (
    <section id="ecossistema" className="scroll-mt-20 py-24 px-5 md:px-10 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        {/* Header + Filter bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <FadeIn delay={0}>
              <div className="label-ui text-fg-3 mb-3">{t('nav_ecosystem')}</div>
              <h2 className="text-2xl md:text-4xl font-medium tracking-[-0.025em] text-fg mb-3">
                {t('ecosystem_heading')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="text-fg-2 text-sm md:text-base font-light leading-relaxed max-w-xl">
                {t('ecosystem_description')}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.12}>
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilter(tab.key)}
                  className={`px-4 py-2 rounded-full text-xs font-medium border cursor-pointer transition-[background-color,border-color,color] duration-200 ease-numera ${
                    filter === tab.key
                      ? 'bg-accent text-accent-on border-accent'
                      : 'border-fg/12 bg-raised text-fg-3 hover:text-fg hover:border-fg/24'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Layer 1: Flagship Endorsed Apps */}
        {flagships.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <span className="label-ui text-fg-3">{t('ecosystem_flagship_label')}</span>
              <span className="text-xs font-medium text-fg-3">{t('endorsement_app')}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {flagships.map((app, i) => (
                <FadeIn key={app.id} delay={0.06 * i}>
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass-2 rounded-card p-6 md:p-7 h-full flex flex-col justify-between gap-5 hover:border-fg/24 hover:-translate-y-0.5 transition-[border-color,transform,background-color] duration-300 ease-numera"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <span className="w-12 h-12 rounded-icon bg-sunken border border-fg/10 flex items-center justify-center text-fg shrink-0">
                            <EcosystemMark id={app.id} size={28} />
                          </span>
                          <div>
                            <h3 className="wordmark text-2xl text-fg">{app.name}</h3>
                            <div className="text-xs font-medium text-fg-3 mt-1">{t('endorsement_app')}</div>
                          </div>
                        </div>
                        <ArrowUpRight
                          size={16}
                          className="text-fg-3 group-hover:text-fg shrink-0 transition-[color,transform] duration-200 ease-numera group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </div>

                      <p className="text-sm text-fg-2 font-light leading-relaxed">
                        {app.desc}
                      </p>
                    </div>

                    <div className="space-y-3.5">
                      <FlagshipSignature id={app.id} t={t} />

                      <div className="pt-3 border-t border-fg/10 flex items-center justify-between gap-2">
                        <span className="font-mono text-xs text-fg-3 truncate">
                          {cleanDomain(app.url)}
                        </span>
                        <span className="text-xs font-medium text-fg group-hover:underline underline-offset-4 shrink-0">
                          {t('ecosystem_access')}
                        </span>
                      </div>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        )}

        {/* Layer 2: Calculators & Incubating Systems */}
        {others.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="label-ui text-fg-3">{t('ecosystem_tools_label')}</span>
            </div>

            <div className={`grid grid-cols-1 ${MD_COLS[colsMd]} ${LG_COLS[colsLg]} gap-4`}>
              {others.map((project, i) => {
                const inner = (
                  <div className="group rounded-card bg-raised border border-fg/10 p-5 h-full flex flex-col justify-between gap-4 hover:border-fg/24 hover:-translate-y-0.5 transition-[border-color,transform,background-color] duration-200 ease-numera">
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2.5">
                        <h3 className="text-base font-medium text-fg tracking-[-0.015em] leading-snug">
                          {project.name}
                        </h3>
                        {project.url ? (
                          <ArrowUpRight
                            size={14}
                            className="shrink-0 mt-1 text-fg-3 group-hover:text-fg transition-colors duration-200 ease-numera"
                          />
                        ) : (
                          <Loader2 size={14} className="shrink-0 mt-1 text-fg-3 animate-spin" />
                        )}
                      </div>

                      <div className="mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-fg/10 bg-sunken px-2.5 py-0.5 text-[11px] font-medium">
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${project.wip ? 'bg-warning' : 'bg-positive'}`}
                            aria-hidden="true"
                          />
                          <span className={project.wip ? 'text-warning-fg' : 'text-fg-2'}>
                            {project.badge}
                          </span>
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-fg-2 font-light leading-relaxed">
                        {project.desc}
                      </p>
                    </div>

                    {project.url && (
                      <div className="pt-3 border-t border-fg/[0.08] flex items-center justify-between gap-2">
                        <span className="font-mono text-[11px] text-fg-3 truncate">
                          {cleanDomain(project.url)}
                        </span>
                        <span className="text-xs font-medium text-fg-2 group-hover:text-fg transition-colors duration-200 ease-numera shrink-0">
                          {t('ecosystem_access')}
                        </span>
                      </div>
                    )}
                  </div>
                )

                return (
                  <FadeIn key={project.id} delay={0.04 * (i + 1)} className="h-full">
                    {project.url ? (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                        {inner}
                      </a>
                    ) : (
                      <div className="cursor-default h-full">{inner}</div>
                    )}
                  </FadeIn>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
