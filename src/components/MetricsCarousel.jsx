import { useRef, useState, useEffect } from 'react'
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

export default function MetricsCarousel() {
  const { t } = useLanguage()
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)
  
  // Responsive cards visible
  const [visibleCards, setVisibleCards] = useState(4)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleCards(1)
      else if (window.innerWidth < 1280) setVisibleCards(2)
      else setVisibleCards(4)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Mouse wheel to horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e) => {
      if (e.deltaY === 0) return;
      // Prevent vertical scroll over the carousel
      e.preventDefault();
      // Apply deltaY to horizontal scroll
      el.scrollLeft += e.deltaY;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, offsetWidth } = scrollRef.current;
      // Calculate active page based on scroll position
      const cardWidth = offsetWidth / visibleCards;
      const newPage = Math.round(scrollLeft / cardWidth);
      if (newPage !== page) setPage(newPage);
    }
  };

  const scrollToPage = (p) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.offsetWidth / visibleCards;
      scrollRef.current.scrollTo({
        left: p * cardWidth,
        behavior: 'smooth'
      });
      setPage(p);
    }
  };

  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

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

  const maxPage = Math.max(0, metrics.length - visibleCards)
  const showNavigation = metrics.length > visibleCards

  return (
    <section className="pt-12 pb-0 bg-black overflow-hidden relative" ref={sectionRef}>
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
        </div>

        {/* Carousel */}
        <div className="relative group/carousel">
          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="relative h-[420px] md:h-[480px] overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory flex gap-6 w-full max-w-full"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <style dangerouslySetInnerHTML={{ __html: `
              .scrollbar-hide::-webkit-scrollbar { display: none; }
            `}} />
            
            {metrics.map((metric, i) => (
                <div
                  key={i}
                  className="h-full shrink-0 border border-white/10 rounded-[2rem] overflow-hidden relative flex flex-col justify-end group shadow-2xl snap-start"
                  style={{ width: `calc((100% - (${GAP} * (${visibleCards} - 1))) / ${visibleCards})` }}
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

          {/* Navigation & Pagination */}
          <div className="flex flex-col items-center gap-8 mt-12">
            {/* Dots */}
            <div className="flex gap-2.5">
              {metrics.map((_, i) => {
                // Determine if this dot represents the currently visible range
                // For simplicity, let's just highlight dots up to the metrics length - visibleCards
                const isActive = (i === page)
                const isNavigable = i <= maxPage
                
                if (!isNavigable && metrics.length > visibleCards) return null;

                return (
                  <button
                    key={i}
                    onClick={() => scrollToPage(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ease-out ${
                      isActive 
                        ? 'w-8 bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
                        : 'w-1.5 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                )
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
