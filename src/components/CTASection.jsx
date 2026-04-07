import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
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

export default function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-24 px-6 md:px-12 bg-black overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto">
        <FadeIn>
          <div className="w-full h-[400px] md:h-[600px] border border-white/10 rounded-[2.5rem] bg-transparent relative overflow-hidden">
            {/* Blue edge gradients */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-y-0 left-0 w-12 md:w-64 opacity-20"
                style={{
                  background:
                    'linear-gradient(to right, rgba(0, 191, 165, 0.4) 0%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-y-0 right-0 w-12 md:w-64 opacity-20"
                style={{
                  background:
                    'linear-gradient(to left, rgba(0, 191, 165, 0.4) 0%, transparent 100%)',
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-16 md:h-64 opacity-25"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0, 191, 165, 0.4) 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col items-start md:items-center justify-center text-left md:text-center px-10 md:px-6">
              <FadeIn delay={0.2}>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-6 leading-tight shimmer-text">
                  {t('cta_heading')}
                </h2>
              </FadeIn>
              <FadeIn delay={0.3}>
                <p className="text-white/60 text-sm md:text-base font-light tracking-wide leading-relaxed max-w-xl mb-10">
                  {t('cta_description')}
                </p>
              </FadeIn>
              <FadeIn delay={0.4}>
                <a
                  className="glass-btn group"
                  href="/contato"
                >
                  <span className="relative z-10 text-sm font-light tracking-wide">
                    {t('cta_button1')}
                  </span>
                </a>
                <a
                  className="glass-btn group"
                  href="/contato"
                >
                  <span className="relative z-10 text-sm font-light tracking-wide">
                    {t('cta_button2')}
                  </span>
                </a>
                <a
                  className="glass-btn group"
                  href="/contato"
                >
                  <span className="relative z-10 text-sm font-light tracking-wide">
                    {t('cta_button3')}
                  </span>
                </a>
              </FadeIn>
              
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
