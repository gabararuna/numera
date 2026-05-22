import { motion } from 'framer-motion'
import { useEffect, useRef, useState, useId } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function HeroSection() {
  const { t } = useLanguage()
  const [heroReady, setHeroReady] = useState(false)
  const bgRef  = useRef(null)
  const hueRef = useRef(null)

  // Unique filter id — avoids collisions if ever rendered twice
  const rawId    = useId()
  const filterId = `hf-${rawId.replace(/:/g, '')}`

  // ── Entrance animation ────────────────────────────────────────────
  useEffect(() => {
    const t = setTimeout(() => setHeroReady(true), 100)
    return () => clearTimeout(t)
  }, [])

  // ── Original mouse-tracking gradient ─────────────────────────────
  useEffect(() => {
    const bg = bgRef.current
    let idleTimer = null
    let animFrame = null
    let idlePhase = 0
    let isIdle    = false
    let lastNx    = 0.5
    let lastNy    = 0.85

    const applyGradient = (nx, ny, pulse = 1) => {
      if (!bg) return
      const px  = 30 + nx * 40
      const py  = 60 + ny * 40
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

    const startIdle = () => { isIdle = true; idlePhase = 0; tickIdle() }
    const stopIdle  = () => {
      isIdle = false
      if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null }
    }

    const handleMove = (e) => {
      lastNx = e.clientX / window.innerWidth
      lastNy = e.clientY / window.innerHeight
      stopIdle()
      clearTimeout(idleTimer)
      applyGradient(lastNx, lastNy, 1)
      idleTimer = setTimeout(startIdle, 1800)
    }

    idleTimer = setTimeout(startIdle, 800)
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', handleMove)
      clearTimeout(idleTimer)
      stopIdle()
    }
  }, [])

  // ── SVG turbulence hue-rotation (animates the gradient shape) ────
  useEffect(() => {
    let frame
    let deg = 0
    const tick = () => {
      deg = (deg + 0.25) % 360
      if (hueRef.current) {
        hueRef.current.setAttribute('values', String(Math.round(deg)))
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
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
        {/* ── Animated background ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[inherit] bg-black">

          {/* SVG filter definition — hidden, zero-size */}
          <svg
            aria-hidden="true"
            style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
          >
            <defs>
              <filter
                id={filterId}
                x="-20%" y="-20%"
                width="140%" height="140%"
                colorInterpolationFilters="sRGB"
              >
                {/* Organic turbulence noise */}
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.0035 0.007"
                  numOctaves="2"
                  seed="9"
                  result="noise"
                />
                {/* Animated hue rotation drives the displacement over time */}
                <feColorMatrix
                  ref={hueRef}
                  in="noise"
                  type="hueRotate"
                  values="0"
                  result="rotated"
                />
                {/* Displace the gradient — creates the morphing glow edge */}
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="rotated"
                  scale="55"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* The gradient — same as original, but displaced by SVG filter */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 120% at 50% 85%, rgba(0,191,165,0.22) 0%, rgba(0,191,165,0.06) 40%, transparent 80%)',
              filter: `url(#${filterId})`,
            }}
          />
        </div>

        {/* ── Text content ── */}
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
