import { useEffect, useRef } from 'react'
import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ExchangeTicker from './components/ExchangeTicker'
import TradingInfrastructure from './components/TradingInfrastructure'
import Methodology from './components/Methodology'
import MetricsCarousel from './components/MetricsCarousel'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import content from './content.json'

function CursorSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const handleMove = (e) => {
      el.style.left = `${e.clientX}px`
      el.style.top = `${e.clientY}px`
    }
    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        width: '700px',
        height: '700px',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
        background: 'radial-gradient(circle, rgba(0, 191, 165, 0.045) 0%, transparent 65%)',
        zIndex: 9998,
        left: '-999px',
        top: '-999px',
        borderRadius: '50%',
      }}
    />
  )
}

function App() {
  const { sections } = content
  return (
    <LanguageProvider>
      <CursorSpotlight />
      <CookieBanner />
      <div className="max-w-[1800px] mx-auto w-full relative">
        <Navbar />
        <main className="bg-black">
          <HeroSection />
          {sections.ticker      && <ExchangeTicker />}
          {sections.ecosystem   && <TradingInfrastructure />}
          {sections.cases       && <MetricsCarousel />}
          {sections.methodology && <Methodology />}
          {sections.cta         && <CTASection />}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
