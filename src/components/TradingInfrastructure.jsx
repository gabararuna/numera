import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Loader2 } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GradientCard({ children, className = '' }) {
  const cardRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const overlay = overlayRef.current
    if (!card || !overlay) return

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      overlay.style.backgroundImage = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 191, 165, 0.18) 0%, transparent 72%)`
    }

    const handleLeave = () => {
      overlay.style.backgroundImage = 'none'
    }

    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)
    return () => {
      card.removeEventListener('mousemove', handleMove)
      card.removeEventListener('mouseleave', handleLeave)
    }
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col border border-white/10 rounded-xl overflow-hidden bg-black transition-all duration-300 hover:border-[#00BFA5]/25 w-full ${className}`}
    >
      <div ref={overlayRef} className="absolute inset-0 pointer-events-none transition-opacity duration-300" />
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  )
}

export default function TradingInfrastructure() {
  const { t } = useLanguage()
  const [filter, setFilter] = useState('all')

  const allProjects = [
    {
      name: t('project_esticaferias'),
      desc: t('esticaferias_desc'),
      badge: t('badge_calculator'),
      type: 'calculator',
      url: 'http://esticaferias.gruponumera.com/',
    },
    {
      name: t('project_remunera'),
      desc: t('remunera_desc'),
      badge: t('badge_calculator'),
      type: 'calculator',
      url: 'http://remunera.gruponumera.com/',
    },
    {
      name: t('project_habita'),
      desc: t('habita_desc'),
      badge: t('badge_calculator'),
      type: 'calculator',
      url: 'https://habita.gruponumera.com/',
    },
    {
      name: t('project_mega'),
      desc: t('mega_desc'),
      badge: t('badge_calculator'),
      type: 'calculator',
      url: 'https://mega.gruponumera.com/',
    },
    {
      name: t('project_mobi'),
      desc: t('mobi_desc'),
      badge: t('badge_calculator'),
      type: 'calculator',
      url: 'https://mobi.gruponumera.com/',
    },
    {
      name: t('project_cronos'),
      desc: t('cronos_desc'),
      badge: t('badge_app'),
      type: 'app',
      url: 'https://cronos.gruponumera.com/',
    },
    {
      name: t('project_monno'),
      desc: t('monno_desc'),
      badge: t('badge_app'),
      type: 'app',
      url: 'https://monno.gruponumera.com/',
    },
    {
      name: t('project_sage'),
      desc: t('sage_desc'),
      badge: t('badge_app'),
      type: 'app',
      url: 'https://sage.gruponumera.com/',
    },
    {
      name: t('project_bateesteira'),
      desc: t('bateesteira_desc'),
      badge: t('badge_app'),
      type: 'app',
      url: 'https://bateesteira.gruponumera.com/',
      wip: true,
    },
    {
      name: t('project_integra'),
      desc: t('integra_desc'),
      badge: t('badge_app'),
      type: 'app',
      url: null,
      wip: true,
    },
  ]

  const tabs = [
    { key: 'all', label: t('ecosystem_filter_all') },
    { key: 'calculator', label: t('ecosystem_filter_calculators') },
    { key: 'app', label: t('ecosystem_filter_apps') },
  ]

  const filtered = filter === 'all' ? allProjects : allProjects.filter((p) => p.type === filter)

  return (
    <section className="py-12 px-6 md:px-12 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-10">
          <FadeIn delay={0}>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-3 shimmer-text">
              {t('ecosystem_heading')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/55 text-sm font-light leading-relaxed max-w-xl">
              {t('ecosystem_description')}
            </p>
          </FadeIn>
        </div>

        {/* Filter tabs */}
        <FadeIn delay={0.15}>
          <div className="flex gap-2 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-4 py-1.5 rounded-full text-[11px] tracking-wider font-medium transition-all duration-300 border cursor-pointer ${
                  filter === tab.key
                    ? 'border-[#00BFA5]/60 text-[#00BFA5] bg-[#00BFA5]/8'
                    : 'border-white/10 text-white/50 hover:text-white/65 hover:border-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid — compact 4 colunas no desktop */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 auto-rows-[180px] md:auto-rows-[156px]">
          {filtered.map((project, i) => {
            const inner = (
              <GradientCard className="p-4 h-full">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-base md:text-lg font-medium text-white tracking-tight shimmer-text leading-tight">
                    {project.name}
                  </h3>
                  {project.url
                    ? <ArrowUpRight size={16} className="shrink-0 mt-0.5 text-white/25 group-hover:text-[#00BFA5] transition-colors duration-300" />
                    : <Loader2 size={16} className="shrink-0 mt-0.5 text-white/20 animate-spin" />
                  }
                </div>
                <div className="flex flex-col gap-2.5 flex-1 min-h-0">
                  <div className="flex flex-wrap gap-1.5">
                    <span className="inline-block w-fit px-2.5 py-0.5 border border-[#00BFA5]/20 text-[#00BFA5] text-[9px] tracking-wider uppercase rounded-full font-medium">
                      {project.badge}
                    </span>
                    {project.wip && (
                      <span className="inline-block w-fit px-2.5 py-0.5 border border-white/15 text-white/40 text-[9px] tracking-wider uppercase rounded-full font-medium">
                        {t('badge_wip')}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/55 font-light leading-relaxed line-clamp-3">
                    {project.desc}
                  </p>
                </div>
              </GradientCard>
            )

            return (
              <FadeIn key={project.name} delay={0.05 * (i + 1)} className="h-full">
                {project.url
                  ? <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">{inner}</a>
                  : <div className="cursor-default h-full">{inner}</div>
                }
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
