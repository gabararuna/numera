import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function GradientCard({ children, bgPosition, className = '' }) {
  const cardRef = useRef(null)
  const [mousePos, setMousePos] = useState({ x: 180, y: 50 })

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      setMousePos({ x, y })
    }

    card.addEventListener('mousemove', handleMove)
    return () => card.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={cardRef}
      className={`group relative flex flex-col border border-white/10 rounded-xl overflow-hidden bg-black p-6 h-full min-h-[260px] ${className}`}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          backgroundImage: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(0, 191, 165, 0.15) 0%, transparent 80%)`,
          backgroundSize: '100% 400%',
          backgroundPosition: `${bgPosition}%`,
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="relative z-10 flex flex-col h-full">{children}</div>
    </div>
  )
}

export default function TradingInfrastructure() {
  const { t } = useLanguage()

  // Calculadoras primeiro, depois aplicativos
  const projects = [
    {
      name: t('project_esticaferias'),
      desc: t('esticaferias_desc'),
      badge: t('badge_calculator'),
      url: 'http://esticaferias.gruponumera.com/',
    },
    {
      name: t('project_remunera'),
      desc: t('remunera_desc'),
      badge: t('badge_calculator'),
      url: 'http://remunera.gruponumera.com/',
    },
    {
      name: t('project_habita'),
      desc: t('habita_desc'),
      badge: t('badge_calculator'),
      url: 'https://habita.gruponumera.com/',
    },
    {
      name: t('project_mega'),
      desc: t('mega_desc'),
      badge: t('badge_calculator'),
      url: 'https://mega.gruponumera.com/',
    },
    {
      name: t('project_mobi'),
      desc: t('mobi_desc'),
      badge: t('badge_calculator'),
      url: 'https://mobi.gruponumera.com/',
    },
    {
      name: t('project_cronos'),
      desc: t('cronos_desc'),
      badge: t('badge_app'),
      url: 'https://cronos.gruponumera.com/',
    },
    {
      name: t('project_monno'),
      desc: t('monno_desc'),
      badge: t('badge_app'),
      url: 'https://monno.gruponumera.com/',
    },
    {
      name: t('project_sage'),
      desc: t('sage_desc'),
      badge: t('badge_app'),
      url: 'https://sage.gruponumera.com/',
    },
    {
      name: t('project_bateesteira'),
      desc: t('bateesteira_desc'),
      badge: t('badge_app'),
      url: 'https://bateesteira.gruponumera.com/',
    },
  ]

  return (
    <section className="py-12 px-6 md:px-12 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-16">
          <FadeIn delay={0}>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-4 shimmer-text">
              {t('ecosystem_heading')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-xl">
              {t('ecosystem_description')}
            </p>
          </FadeIn>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
          {projects.map((project, i) => (
            <FadeIn key={project.name} delay={0.1 * (i + 1)}>
              <a href={project.url} target="_blank" rel="noopener noreferrer">
                <GradientCard bgPosition={(i / (projects.length - 1)) * 100}>
                  <div className="relative z-10 mb-6">
                    <h3 className="text-xl md:text-2xl font-medium text-white tracking-tight shimmer-text">
                      {project.name}
                    </h3>
                  </div>
                  <div className="relative z-10 space-y-4">
                    <span className="inline-block px-3 py-1 border border-[#00BFA5]/20 text-[#00BFA5] text-[10px] tracking-wider uppercase rounded-full font-medium">
                      {project.badge}
                    </span>
                    <p className="text-xs md:text-sm text-white/40 font-light leading-relaxed">
                      {project.desc}
                    </p>
                    <div className="glass-btn group mt-2 inline-block px-4 py-2">
                      Acessar
                    </div>
                  </div>
                </GradientCard>
              </a>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
