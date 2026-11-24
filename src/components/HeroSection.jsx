import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { NUMERA_EASE } from '../constants/motion'
import { EcosystemMark, NumeraMark, StatusDot } from './BrandMarks'
import content from '../content.json'

const FLAGSHIP_ORDER = ['monno', 'cronos', 'nyot']

export default function HeroSection() {
  const { t } = useLanguage()

  const flagships = FLAGSHIP_ORDER.map((id) => {
    const project = content.projects.find((p) => p.id === id)
    return project && project.visible ? project : null
  }).filter(Boolean)

  return (
    <section id="hero" className="bg-canvas px-5 md:px-10 pt-4 pb-12 md:pt-6 md:pb-16">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.52, ease: NUMERA_EASE }}
          className="relative rounded-sheet border border-fg/10 bg-raised/70 overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16"
          style={{
            boxShadow: 'inset 0 1px 0 rgb(var(--c-ov) / 0.06), var(--glass-2-shadow)',
          }}
        >
          {/* Architectural subtle grid overlay */}
          <div
            className="absolute inset-0 hero-grid-bg pointer-events-none opacity-80"
            style={{
              maskImage: 'radial-gradient(ellipse 90% 85% at 65% 40%, black 25%, transparent 90%)',
              WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 65% 40%, black 25%, transparent 90%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.22fr_0.78fr] gap-10 lg:gap-14 items-center">
            {/* Editorial left column */}
            <div>
              <div className="inline-flex items-center gap-2.5 rounded-full glass-1 px-3.5 py-1.5 mb-7">
                <StatusDot tone="positive" label={t('hero_badge')} className="label-ui" />
              </div>

              <h1 className="text-[2rem] sm:text-5xl lg:text-[3.35rem] tracking-[-0.03em] leading-[1.08] mb-6 max-w-3xl">
                <span className="block font-medium text-fg">{t('hero_heading_1')}</span>
                <span className="block font-light text-fg-2 mt-1.5">{t('hero_heading_2')}</span>
              </h1>

              <p className="text-sm sm:text-base text-fg-2 font-light leading-relaxed max-w-xl mb-9">
                {t('hero_description')}
              </p>

              <div className="flex flex-wrap items-center gap-3.5">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent text-accent-on hover:bg-accent-hover px-6 py-3 text-sm font-medium transition-[background-color,transform] duration-200 ease-numera active:scale-[0.98]"
                >
                  <span>{t('hero_cta')}</span>
                  <ArrowUpRight size={15} />
                </a>

                <a
                  href="#ecossistema"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-fg/14 bg-canvas/40 text-fg hover:bg-sunken hover:border-fg/25 px-6 py-3 text-sm font-medium transition-[background-color,border-color,transform] duration-200 ease-numera active:scale-[0.98]"
                >
                  <span>{t('hero_cta_secondary')}</span>
                </a>
              </div>
            </div>

            {/* Brand & Ecosystem architectural anchor */}
            <div className="glass-2 rounded-card p-6 sm:p-7 flex flex-col gap-5">
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-fg/10">
                <div className="flex items-center gap-3.5">
                  <NumeraMark size={42} animated className="text-fg shrink-0" />
                  <div>
                    <div className="wordmark text-[26px] text-fg">Numera</div>
                    <div className="font-mono text-xs text-fg-3 mt-1">gruponumera.com</div>
                  </div>
                </div>
                <span className="label-ui text-fg-3 hidden sm:inline">v1</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="label-ui text-fg-3">{t('ecosystem_flagship_label')}</span>
                  <span className="text-xs font-medium text-fg-3">{t('endorsement_app')}</span>
                </div>

                <div className="space-y-2">
                  {flagships.map((app) => (
                    <a
                      key={app.id}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-3 rounded-field border border-fg/10 bg-canvas/45 hover:bg-sunken/80 hover:border-fg/20 px-4 py-3 transition-[background-color,border-color] duration-200 ease-numera"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="w-9 h-9 rounded-icon bg-sunken border border-fg/10 flex items-center justify-center text-fg shrink-0">
                          <EcosystemMark id={app.id} size={22} />
                        </span>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="wordmark text-[15px] text-fg">{t(`project_${app.id}`)}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-positive shrink-0" aria-hidden="true" />
                          </div>
                          <div className="text-xs text-fg-3 truncate">{t(`${app.id}_short`)}</div>
                        </div>
                      </div>
                      <ArrowUpRight
                        size={14}
                        className="text-fg-3 group-hover:text-fg shrink-0 transition-[color,transform] duration-200 ease-numera group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-fg/10">
                <div className="rounded-field bg-sunken/70 px-3 py-2.5">
                  <div className="num text-lg sm:text-xl font-light text-fg tracking-[-0.02em]">30+</div>
                  <div className="text-[11px] text-fg-3 leading-tight mt-0.5">{t('stat_projects')}</div>
                </div>
                <div className="rounded-field bg-sunken/70 px-3 py-2.5">
                  <div className="num text-lg sm:text-xl font-light text-fg tracking-[-0.02em]">15+</div>
                  <div className="text-[11px] text-fg-3 leading-tight mt-0.5">{t('stat_companies')}</div>
                </div>
                <div className="rounded-field bg-sunken/70 px-3 py-2.5">
                  <div className="num text-lg sm:text-xl font-light text-fg tracking-[-0.02em]">200+</div>
                  <div className="text-[11px] text-fg-3 leading-tight mt-0.5">{t('stat_trained')}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
