import { useRef, useMemo } from 'react'
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

export default function Methodology() {
  const { t } = useLanguage()

  const cards = useMemo(() => [
    { label: t('methodology_card0_label'), title: t('methodology_card0_title'), desc: t('methodology_card0_desc') },
    { label: t('methodology_card1_label'), title: t('methodology_card1_title'), desc: t('methodology_card1_desc') },
    { label: t('methodology_card2_label'), title: t('methodology_card2_title'), desc: t('methodology_card2_desc') },
  ], [t])

  return (
    <section className="py-12 px-6 md:px-12 bg-black">
      <div className="max-w-[1800px] mx-auto">
        {/* Header - centered */}
        <div className="mb-24 text-left">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-4 shimmer-text">
              {t('methodology_heading')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed mx-auto">
              {t('methodology_description')}
            </p>
          </FadeIn>
        </div>

        {/* Cards */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            {cards.map((card, i) => (
              <FadeIn key={i} delay={0.15 * (i + 1)}>
                <div className="relative border border-white/10 rounded-xl bg-transparent p-8 md:p-12 flex flex-col" style={{ minHeight: '100%' }}>
                  <div className="relative z-10 space-y-3">
                    <h4 className="text-[10px] tracking-widest text-white/30 font-medium uppercase">
                      {card.label}
                    </h4>
                    <h3 className="text-lg md:text-xl font-light text-white tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-sm text-white/40 font-light leading-relaxed max-w-sm">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
