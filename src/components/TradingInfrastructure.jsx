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
      logo: { src: '/ecosystem/esticaferias.svg', size: 'h-6.5 mt-0' },
      desc: t('esticaferias_desc'),
      badge: t('badge_calculator'),
      url: 'http://esticaferias.gabrielararuna.com/',
    },
    {
      name: t('project_remunera'),
      logo: { src: '/ecosystem/remunera.svg', size: 'h-5 mt-2' },
      desc: t('remunera_desc'),
      badge: t('badge_calculator'),
      url: 'http://remunera.gabrielararuna.com/',
    },
    {
      name: t('project_cronos'),
      logo: { src: '/ecosystem/cronos.svg', size: 'h-6 mt-2' },
      desc: t('cronos_desc'),
      badge: t('badge_app'),
      url: 'https://cronos.gabrielararuna.com/',
    },
    {
      name: t('project_monno'),
      logo: { src: '/ecosystem/monno.svg', size: 'h-7' },
      desc: t('monno_desc'),
      badge: t('badge_app'),
      url: 'https://monno.gabrielararuna.com/',
    },
    {
      name: t('project_sage'),
      logo: { src: '/ecosystem/sage.svg', size: 'h-7 mt-1' },
      desc: t('sage_desc'),
      badge: t('badge_app'),
      url: 'https://sage.gabrielararuna.com/',
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
                  <div className="relative z-10 mb-2">
                    {project.logo ? (
                      <img
                        src={project.logo.src}
                        alt={project.name}
                        className={`${project.logo.size} filter grayscale opacity-40`}
                      />
                    ) : (
                      <h3 className="text-lg md:text-xl font-light text-white tracking-tight">
                        {project.name}
                      </h3>
                    )}
                  </div>
                  <div className="relative z-10 mt-1  space-y-4">
                    <span className="inline-block px-3 py-1 border border-[#00BFA5]/20 text-[#00BFA5] text-[10px] tracking-wider uppercase rounded-full font-medium">
                      {project.badge}
                    </span>
                    <p className="text-xs md:text-sm text-white/40 font-light leading-relaxed">
                      {project.desc}
                    </p>
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="glass-btn group mt-2 inline-block px-4 py-2">
                      Acessar
                    </a>
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
