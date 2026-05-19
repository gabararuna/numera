import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'
import content from '../content.json'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function MetricsCarousel() {
  const { t } = useLanguage()
  const scrollRef = useRef(null)

  // Drag state — refs to avoid re-renders
  const isDragging = useRef(false)
  const wasDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  const [visibleCards, setVisibleCards] = useState(4)
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1)
      else if (window.innerWidth < 1280) setVisibleCards(2)
      else setVisibleCards(4)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const visibleCases = content.cases.filter((c) => c.visible)
  const metrics = visibleCases.map((c) => ({
    title: t(`metric_${c.id}_title`),
    desc: t(`metric_${c.id}_desc`),
    image: c.image,
  }))
  const N = metrics.length

  // Triple the array for infinite loop: [copy A | copy B (real) | copy C]
  const looped = [...metrics, ...metrics, ...metrics]

  // On mount / resize: start positioned at the middle copy (B)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const timer = setTimeout(() => {
      el.scrollLeft = el.scrollWidth / 3
    }, 50)
    return () => clearTimeout(timer)
  }, [visibleCards])

  // Infinite loop: silently teleport when drifting into outer copies
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const oneSet = el.scrollWidth / 3

    if (el.scrollLeft < oneSet * 0.5) {
      el.scrollLeft += oneSet
      return
    }
    if (el.scrollLeft > oneSet * 2.5) {
      el.scrollLeft -= oneSet
      return
    }

    // Update active dot relative to middle copy
    const rel = el.scrollLeft - oneSet
    const step = oneSet / N
    setActiveDot(Math.max(0, Math.min(Math.round(rel / step), N - 1)))
  }

  // Arrow buttons — scroll exactly one card width
  const scrollCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const cardStep = el.scrollWidth / looped.length
    el.scrollBy({ left: direction * cardStep, behavior: 'smooth' })
  }

  // Dot click — jump to that card within the middle copy
  const scrollToDot = (index) => {
    const el = scrollRef.current
    if (!el) return
    const oneSet = el.scrollWidth / 3
    const step = oneSet / N
    el.scrollTo({ left: oneSet + index * step, behavior: 'smooth' })
  }

  // ── Click-and-drag ──────────────────────────────────────────────
  const onMouseDown = (e) => {
    isDragging.current = true
    wasDragging.current = false
    dragStartX.current = e.clientX
    dragScrollLeft.current = scrollRef.current?.scrollLeft ?? 0
    if (scrollRef.current) scrollRef.current.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    if (!isDragging.current) return
    const dx = e.clientX - dragStartX.current
    if (Math.abs(dx) > 4) wasDragging.current = true
    if (scrollRef.current) scrollRef.current.scrollLeft = dragScrollLeft.current - dx
  }

  const onMouseUp = () => {
    isDragging.current = false
    if (scrollRef.current) scrollRef.current.style.cursor = 'grab'
  }

  // Block click-through after drag (links inside cards)
  const onClickCapture = (e) => {
    if (wasDragging.current) {
      e.preventDefault()
      e.stopPropagation()
      wasDragging.current = false
    }
  }

  return (
    <section className="pt-12 pb-0 bg-black overflow-hidden relative">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="mb-20">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-4 shimmer-text">
              {t('solutions_heading')}
            </h2>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed max-w-xl">
              {t('solutions_description')}
            </p>
          </FadeIn>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">

          {/* ◀ Left button */}
          <button
            onClick={() => scrollCard(-1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-white/10 bg-black/70 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-[#00BFA5]/40 hover:bg-[#00BFA5]/10 transition-all duration-300"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Scroll track — overflow-x: auto (trackpad / touch nativo, sem bloquear scroll vertical) */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClickCapture={onClickCapture}
            className="h-[420px] md:h-[480px] overflow-x-auto no-scrollbar flex gap-6 w-full select-none"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab',
            }}
          >
            {looped.map((metric, i) => (
              <div
                key={i}
                className="h-full shrink-0 border border-white/10 rounded-[2rem] overflow-hidden relative flex flex-col justify-end group shadow-2xl"
                style={{ width: `calc((100% - (24px * (${visibleCards} - 1))) / ${visibleCards})` }}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110 pointer-events-none"
                  style={{ backgroundImage: `url(${metric.image})` }}
                />
                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
                {/* Glass content */}
                <div className="relative z-10 glass-card m-4 md:m-5 p-5 md:p-6 rounded-xl pointer-events-none">
                  <h3 className="text-lg md:text-xl font-light text-white tracking-tight mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-white/75 font-light leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ▶ Right button */}
          <button
            onClick={() => scrollCard(1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-white/10 bg-black/70 backdrop-blur-sm flex items-center justify-center text-white/40 hover:text-white hover:border-[#00BFA5]/40 hover:bg-[#00BFA5]/10 transition-all duration-300"
            aria-label="Próximo"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2.5 mt-10 mb-4">
          {metrics.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToDot(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                activeDot === i
                  ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                  : 'w-1.5 bg-white/20 hover:bg-white/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
