import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  const [heroReady, setHeroReady] = useState(false)
  const bgRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const bg = bgRef.current
    let idleTimer = null
    let animFrame = null
    let idlePhase = 0
    let isIdle = false
    let lastNx = 0.5
    let lastNy = 0.85

    const applyGradient = (nx, ny, pulse = 1) => {
      if (!bg) return
      const px = 30 + nx * 40   // 30–70% horizontal
      const py = 60 + ny * 40   // 60–100% vertical
      const op1 = (0.24 * pulse).toFixed(3)
      const op2 = (0.07 * pulse).toFixed(3)
      bg.style.background = `radial-gradient(ellipse 60% 120% at ${px}% ${py}%, rgba(0,191,165,${op1}) 0%, rgba(0,191,165,${op2}) 40%, transparent 80%)`
    }

    const tickIdle = () => {
      if (!isIdle) return
      idlePhase += 0.007
      const pulse = 0.72 + Math.sin(idlePhase) * 0.28
      applyGradient(lastNx, lastNy, pulse)
      animFrame = requestAnimationFrame(tickIdle)
    }

    const startIdle = () => {
      isIdle = true
      idlePhase = 0
      tickIdle()
    }

    const stopIdle = () => {
      isIdle = false
      if (animFrame) {
        cancelAnimationFrame(animFrame)
        animFrame = null
      }
    }

    const handleMove = (e) => {
      lastNx = e.clientX / window.innerWidth
      lastNy = e.clientY / window.innerHeight

      stopIdle()
      clearTimeout(idleTimer)

      applyGradient(lastNx, lastNy, 1)

      idleTimer = setTimeout(startIdle, 1800)
    }

    // Inicia idle imediatamente se o mouse não se mover
    idleTimer = setTimeout(startIdle, 800)

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      clearTimeout(idleTimer)
      stopIdle()
    }
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
        {/* Fundo dinâmico que acompanha o mouse */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] bg-black">
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 120% at 50% 85%, rgba(0,191,165,0.2) 0%, rgba(0,191,165,0.06) 40%, transparent 80%)',
            }}
          />
        </div>

        {/* Conteúdo alinhado à esquerda */}
        <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16 z-20 pointer-events-none">
          <div className="max-w-4xl pointer-events-auto">
            {/* Logo shimmer */}
            <motion.div
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6 h-8 md:h-12 lg:h-14 w-32 md:w-48 lg:w-56 shimmer-logo"
            />

            {/* Heading — duas linhas equilibradas */}
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
              className="text-sm md:text-base text-white/60 font-light tracking-wide leading-relaxed max-w-2xl mb-8"
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
