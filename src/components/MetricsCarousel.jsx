import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

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

const GAP = '1.5rem'
const CARDS_VISIBLE = 4

export default function MetricsCarousel() {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const [page, setPage] = useState(0)
  const inView = useInView(containerRef, { once: true, margin: '-80px' })

  // Build metrics array from translations - dynamically determine count
  // Check how many metrics exist in translations by looking for existing keys
  let metricsCount = 0;
  while (t(`metric_${metricsCount}_title`) !== `metric_${metricsCount}_title`) {
    metricsCount++;
  }

  const metrics = Array.from({ length: metricsCount }, (_, i) => ({
    title: t(`metric_${i}_title`),
    desc: t(`metric_${i}_desc`),
  }))

  // Background images for each card
  const cardImages = [
    '/cases/nexus.jpeg',
    '/cases/ruptura.jpeg',
    '/cases/treinamento.jpg',
    '/cases/gestaomateriais.jpeg',
    '/cases/devolucao.jpeg',
    '/cases/paineldetalhado.jpeg',
    '/cases/cartadiretriz.jpeg',
   ]

  const maxPage = metrics.length - CARDS_VISIBLE
  const showNavigation = metrics.length > CARDS_VISIBLE

  return (
    <section className="pt-12 pb-0 bg-black overflow-hidden relative" ref={containerRef}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-center md:justify-between">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-4 shimmer-text">
              {t('solutions_heading')}
            </h2>
            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-xl">
              {t('solutions_description')}
            </p>
          </FadeIn>
          {showNavigation && (
            <div className="flex justify-end gap-4 mt-6 md:mt-0">
              <button
                disabled={page <= 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  page <= 0
                    ? 'border-white/5 text-white/10 cursor-not-allowed'
                    : 'border-white/30 text-white cursor-pointer'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <button
                disabled={page >= maxPage}
                onClick={() => setPage((p) => Math.min(maxPage, p + 1))}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  page >= maxPage
                    ? 'border-white/5 text-white/10 cursor-not-allowed'
                    : 'border-white/30 text-white cursor-pointer'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="relative h-[300px] md:h-[400px] overflow-hidden">
            <div
              className="flex gap-6 h-full transition-transform duration-700 ease-[0.22,1,0.36,1]"
              style={{ transform: `translateX(calc(-${page} * (100% / ${CARDS_VISIBLE} + ${GAP} / ${CARDS_VISIBLE})))` }}
            >
              {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="h-full shrink-0 border border-white/10 rounded-2xl overflow-hidden relative flex flex-col justify-end group"
                  style={{ width: `calc((100% - (${GAP} * (${CARDS_VISIBLE} - 1))) / ${CARDS_VISIBLE})` }}
                >
                  {/* Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${cardImages[i]})` }}
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  {/* Glass card with content */}
                  <div className="relative z-10 glass-card m-4 md:m-5 p-5 md:p-6 rounded-xl">
                    <h3 className="text-lg md:text-xl font-light text-white tracking-tight mb-2">
                      {metric.title}
                    </h3>
                    <p className="text-xs md:text-sm text-white/70 font-light leading-relaxed">
                      {metric.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
