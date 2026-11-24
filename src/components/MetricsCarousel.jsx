import { useRef, useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import content from '../content.json'

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export default function MetricsCarousel() {
  const { t } = useLanguage()
  const scrollRef = useRef(null)

  const isDragging = useRef(false)
  const wasDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  const [visibleCards, setVisibleCards] = useState(3)
  const [activeDot, setActiveDot] = useState(0)

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1)
      else if (window.innerWidth < 1280) setVisibleCards(2)
      else setVisibleCards(3)
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
  const looped = [...metrics, ...metrics, ...metrics]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const timer = setTimeout(() => {
      el.scrollLeft = el.scrollWidth / 3
    }, 50)
    return () => clearTimeout(timer)
  }, [visibleCards])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el || N === 0) return
    const oneSet = el.scrollWidth / 3

    if (el.scrollLeft < oneSet * 0.5) {
      el.scrollLeft += oneSet
      return
    }
    if (el.scrollLeft > oneSet * 2.5) {
      el.scrollLeft -= oneSet
      return
    }

    const rel = el.scrollLeft - oneSet
    const step = oneSet / N
    setActiveDot(Math.max(0, Math.min(Math.round(rel / step), N - 1)))
  }

  const scrollCard = (direction) => {
    const el = scrollRef.current
    if (!el) return
    const cardStep = el.scrollWidth / looped.length
    el.scrollBy({ left: direction * cardStep, behavior: 'smooth' })
  }

  const scrollToDot = (index) => {
    const el = scrollRef.current
    if (!el || N === 0) return
    const oneSet = el.scrollWidth / 3
    const step = oneSet / N
    el.scrollTo({ left: oneSet + index * step, behavior: 'smooth' })
  }

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

  const onClickCapture = (e) => {
    if (wasDragging.current) {
      e.preventDefault()
      e.stopPropagation()
      wasDragging.current = false
    }
  }

  return (
    <section className="py-16 bg-canvas overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10">
        {/* Header */}
        <div className="mb-12">
          <FadeIn>
            <div className="label-ui text-fg-3 mb-3">{t('nav_solutions')}</div>
            <h2 className="text-2xl md:text-4xl font-medium tracking-[-0.025em] text-fg mb-3">
              {t('solutions_heading')}
            </h2>
            <p className="text-fg-2 text-sm md:text-base font-light leading-relaxed max-w-xl">
              {t('solutions_description')}
            </p>
          </FadeIn>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            type="button"
            onClick={() => scrollCard(-1)}
            className="hidden sm:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-fg/15 bg-raised/90 backdrop-blur-md items-center justify-center text-fg-2 hover:text-fg hover:border-fg/35 hover:bg-sunken cursor-pointer transition-[background-color,border-color,color,transform] duration-200 ease-numera active:scale-[0.96]"
            aria-label="Anterior"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            onClickCapture={onClickCapture}
            className="h-[420px] md:h-[460px] overflow-x-auto no-scrollbar flex gap-5 w-full select-none"
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
                className="h-full shrink-0 border border-fg/10 rounded-sheet overflow-hidden relative flex flex-col justify-end group bg-raised"
                style={{ width: `calc((100% - (20px * (${visibleCards} - 1))) / ${visibleCards})` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-numera group-hover:scale-105 pointer-events-none"
                  style={{ backgroundImage: `url(${metric.image})` }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(10, 10, 9, 0.88) 0%, rgba(10, 10, 9, 0.36) 55%, rgba(10, 10, 9, 0.10) 100%)',
                  }}
                />
                <div
                  className="relative z-10 m-4 p-5 rounded-card pointer-events-none border border-[rgba(244,243,239,0.14)] text-[#F4F3EF]"
                  style={{
                    background: 'rgba(10, 10, 9, 0.82)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: 'inset 0 1px 0 rgba(244, 243, 239, 0.08), 0 18px 40px -16px rgba(0, 0, 0, 0.65)',
                  }}
                >
                  <h3 className="text-base md:text-lg font-medium text-[#F4F3EF] tracking-[-0.015em] mb-1.5 leading-snug">
                    {metric.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#BDBBB4] font-light leading-relaxed">
                    {metric.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollCard(1)}
            className="hidden sm:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full border border-fg/15 bg-raised/90 backdrop-blur-md items-center justify-center text-fg-2 hover:text-fg hover:border-fg/35 hover:bg-sunken cursor-pointer transition-[background-color,border-color,color,transform] duration-200 ease-numera active:scale-[0.96]"
            aria-label="Próximo"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {metrics.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollToDot(i)}
              className={`h-1.5 rounded-full cursor-pointer transition-[width,background-color] duration-300 ease-numera ${
                activeDot === i ? 'w-7 bg-accent' : 'w-1.5 bg-fg/20 hover:bg-fg/40'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
