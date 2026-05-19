import { useRef, useMemo, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import content from '../content.json'

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

function TiltCard({ children }) {
  const cardRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const overlay = overlayRef.current
    if (!card || !overlay) return

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)

      card.style.transform = `perspective(1000px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg) scale(1.02)`
      card.style.transition = 'transform 0.08s ease'

      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      overlay.style.opacity = '1'
      overlay.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0, 191, 165, 0.1) 0%, transparent 70%)`
    }

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
      card.style.transition = 'transform 0.5s ease'
      overlay.style.opacity = '0'
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
      className="relative border border-white/10 rounded-xl bg-transparent p-8 md:p-12 flex flex-col overflow-hidden"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default function Methodology() {
  const { t } = useLanguage()

  const cards = useMemo(() =>
    content.services
      .filter((s) => s.visible)
      .map((s) => ({
        label: t(`methodology_card${s.id}_label`),
        title: t(`methodology_card${s.id}_title`),
        desc:  t(`methodology_card${s.id}_desc`),
      }))
  , [t])

  return (
    <section className="py-12 px-6 md:px-12 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-24 text-left">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-4 shimmer-text">
              {t('methodology_heading')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed mx-auto">
              {t('methodology_description')}
            </p>
          </FadeIn>
        </div>

        {/* Cards with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
          {cards.map((card, i) => (
            <FadeIn key={i} delay={0.15 * (i + 1)}>
              <TiltCard>
                <div className="space-y-3">
                  <h4 className="text-[10px] tracking-widest text-white/60 font-medium uppercase">
                    {card.label}
                  </h4>
                  <h3 className="text-lg md:text-xl font-light text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm">
                    {card.desc}
                  </p>
                </div>
              </TiltCard>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
