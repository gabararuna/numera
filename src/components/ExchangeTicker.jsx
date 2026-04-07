import { useRef, useEffect } from 'react'
import { useLanguage } from '../i18n/LanguageContext'

export default function ExchangeTicker() {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const scrollRef = useRef(0)
  const rafRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const tick = () => {
      scrollRef.current -= 1
      const totalWidth = track.scrollWidth / 2
      if (scrollRef.current <= -totalWidth) {
        scrollRef.current = 0
      }
      track.style.transform = `translateX(${scrollRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const logos = [
    { src: 'vale.svg', width: 130 },
    { src: 'spot.svg', width: 120 },
    { src: 'alumar.svg', width: 120 },
    { src: 'projeta.svg', width: 140 },
    { src: 'equatorial.svg', width: 140 },   
  ]
  const allLogos = [...logos, ...logos, ...logos, ...logos]
  const gap = 80

  return (
    <section className="py-16 bg-black overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-24">
        {/* Left heading */}
        <div className="flex-shrink-0">
          <h3 className="text-xl md:text-2xl font-light tracking-tight shimmer-text">
            {t('ticker_heading')}
          </h3>
        </div>

        {/* Ticker */}
        <div className="relative flex-grow w-full overflow-hidden mask-fade-edges py-4">
          <div
            ref={trackRef}
            className="flex whitespace-nowrap items-center w-max"
          >
            {allLogos.map((logo, i) => (
              <img
                key={i}
                src={`/exchanges/${logo.src}`}
                alt="Partner logo"
                className="logo-ticker-item"
                style={{ width: `${logo.width}px`, marginRight: `${gap}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
