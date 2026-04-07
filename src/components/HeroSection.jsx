import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  const [heroReady, setHeroReady] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full h-[calc(100dvh-4rem)] bg-black overflow-hidden flex items-center justify-center px-6 md:px-12 pt-0 pb-4 md:pt-0 md:pb-8"
    >
      <motion.div
        animate={heroReady ? { opacity: 1, scale: 1 } : {}}
        initial={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full h-full border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden"
      >
        {/* Blue radial gradient background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] bg-black">
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[350%] md:w-[240%] h-[40%] md:h-[100%]"
            style={{
              background:
                'radial-gradient(ellipse 50% 100% at 50% 100%, rgba(0, 191, 165, 0.2) 0%, rgba(0, 191, 165, 0.05) 35%, transparent 80%)',
            }}
          />
        </div>

        {/* Vertically centered, left-aligned content block */}
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 z-20 pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            {/* Logo with shimmer effect */}
            <motion.div
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 h-8 md:h-12 lg:h-14 w-32 md:w-48 lg:w-56 shimmer-logo"
            />

            {/* Shimmer heading */}
            <motion.h1
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-5xl font-medium tracking-tight leading-tight mb-6 shimmer-text"
            >
              {t('hero_heading')}
            </motion.h1>

            <motion.p
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-base text-white/60 font-light tracking-wide leading-relaxed max-w-2xl mb-8"
            >
              {t('hero_description')}
            </motion.p>

            <motion.div
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a
                className="glass-btn group"
                href="#contact"
              >
                <span className="relative z-10 text-sm font-light tracking-wide">
                  {t('hero_cta')}
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* Orb visualization (bottom-right) */}
        <div className="absolute inset-0 flex items-end justify-center md:items-center md:justify-end pb-28 md:p-24 overflow-hidden pointer-events-none md:pointer-events-auto">
          <motion.div
            animate={heroReady ? { opacity: 0.9, scale: 1 } : {}}
            initial={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="w-[220px] h-[220px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] relative mix-blend-screen"
          >
            <div className="orb-container" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
