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

          {/* The gradient — extended beyond bounds so feDisplacementMap has source pixels at all edges */}
          <div
            ref={bgRef}
            className="absolute -inset-20"
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

            {/* Heading */}
            <motion.h1
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-3xl md:text-5xl lg:text-[3.25rem] tracking-tight leading-[1.25] mb-6"
            >
              <span className="block font-semibold shimmer-text pb-1">{t('hero_heading_1')}</span>
              <span className="block font-light text-white/60">{t('hero_heading_2')}</span>
            </motion.h1>

            <motion.p
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.36 }}
              className="text-sm md:text-base text-white/55 font-light tracking-wide leading-relaxed max-w-xl mb-9"
            >
              {t('hero_description')}
            </motion.p>

            <motion.div
              animate={heroReady ? { opacity: 1, y: 0 } : {}}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.52 }}
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-gradient-to-br from-white/[0.07] to-white/[0.02] pl-6 pr-2 py-2 text-white transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-[#00BFA5]/30 hover:from-[#00BFA5]/[0.10] hover:to-[#00BFA5]/[0.04] hover:shadow-[0_4px_28px_rgba(0,191,165,0.15)] active:scale-[0.98]"
              >
                <span className="text-sm font-light tracking-wide">
                  {t('hero_cta')}
                </span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-[#00BFA5]/25 group-hover:bg-[#00BFA5]/12 group-hover:translate-x-px group-hover:-translate-y-px">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true" className="text-white/50 transition-colors duration-300 group-hover:text-[#00BFA5]">
                    <path d="M2 9L9 2M9 2H4M9 2V7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </a>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
