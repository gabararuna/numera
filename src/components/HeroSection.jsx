import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import ShadowOverlay from './ShadowOverlay'

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
        className="relative z-10 w-full h-full border border-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center overflow-hidden bg-black"
      >
        {/* ── Shadow Overlay background effect ── */}
        <div className="absolute inset-0 pointer-events-none">
          <ShadowOverlay
            color="rgba(0, 191, 165, 0.82)"
            animation={{ scale: 38, speed: 16 }}
            sizing="fill"
          />
        </div>

        {/* Dark vignette so text stays readable */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(0,0,0,0.55) 100%)',
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #000 0%, transparent 100%)' }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 z-20 pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            {/* Logo shimmer */}
            <motion.div
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 h-8 md:h-12 lg:h-14 w-32 md:w-48 lg:w-56 shimmer-logo"
            />

            {/* Heading */}
            <motion.h1
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-5xl lg:text-5xl tracking-tight leading-tight mb-6"
            >
              <span className="block font-medium shimmer-text">{t('hero_heading_1')}</span>
              <span className="block font-medium shimmer-text">{t('hero_heading_2')}</span>
            </motion.h1>

            <motion.p
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-sm md:text-base text-white/75 font-light tracking-wide leading-relaxed max-w-2xl mb-8"
            >
              {t('hero_description')}
            </motion.p>

            <motion.div
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <a className="glass-btn group" href="#contact">
                <span className="relative z-10 text-sm font-light tracking-wide">
                  {t('hero_cta')}
                </span>
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
