import { useRef, useEffect, useState } from 'react'
import { useLanguage } from '../i18n/useLanguage'

const LOGOS = [
  { src: 'vale.svg', name: 'Vale', width: 120 },
  { src: 'spot.svg', name: 'Spot', width: 112 },
  { src: 'alumar.svg', name: 'Alumar', width: 132 },
  { src: 'projeta.svg', name: 'Projeta', width: 132 },
  { src: 'equatorial.svg', name: 'Equatorial', width: 132 },
  { src: 'amorim.svg', name: 'Amorim', width: 132 },
  { src: 'arcadis.svg', name: 'Arcadis', width: 150 },
  { src: 'TJMA.svg', name: 'TJMA', width: 132 },
]

export default function ExchangeTicker() {
  const { t } = useLanguage()
  const trackRef = useRef(null)
  const scrollRef = useRef(0)
  const rafRef = useRef(null)
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = (e) => setReducedMotion(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) return
    const track = trackRef.current
    if (!track) return

    const tick = () => {
      scrollRef.current -= 0.85
      const totalWidth = track.scrollWidth / 2
      if (totalWidth > 0 && scrollRef.current <= -totalWidth) {
        scrollRef.current = 0
      }
      track.style.transform = `translateX(${scrollRef.current}px)`
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [reducedMotion])

  const allLogos = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS]

  return (
    <section className="py-14 bg-canvas border-y border-fg/[0.08] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 md:px-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-16">
        <div className="shrink-0 max-w-sm">
          <h3 className="text-lg md:text-xl font-normal tracking-[-0.015em] text-fg-2">
            {t('ticker_heading')}
          </h3>
        </div>

        {reducedMotion ? (
          <div className="flex flex-wrap items-center gap-8 py-2">
            {LOGOS.map((logo) => (
              <img
                key={logo.src}
                src={`/exchanges/${logo.src}`}
                alt={logo.name}
                className="logo-ticker-item"
                style={{ width: `${logo.width}px` }}
              />
            ))}
          </div>
        ) : (
          <div className="relative flex-grow w-full overflow-hidden mask-fade-edges py-3">
            <div ref={trackRef} className="flex whitespace-nowrap items-center w-max">
              {allLogos.map((logo, i) => (
                <img
                  key={`${logo.src}-${i}`}
                  src={`/exchanges/${logo.src}`}
                  alt={logo.name}
                  className="logo-ticker-item mr-16 md:mr-20"
                  style={{ width: `${logo.width}px` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
