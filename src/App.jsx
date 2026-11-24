import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ExchangeTicker from './components/ExchangeTicker'
import TradingInfrastructure from './components/TradingInfrastructure'
import Methodology from './components/Methodology'
import MetricsCarousel from './components/MetricsCarousel'
import FAQ from './components/FAQ'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import content from './content.json'

export default function App() {
  const { sections } = content
  return (
    <div className="min-h-screen flex flex-col bg-canvas text-fg relative">
      <Navbar />
      <main className="flex-1 bg-canvas">
        <HeroSection />
        {sections.ticker      && <ExchangeTicker />}
        {sections.ecosystem   && <TradingInfrastructure />}
        {sections.cases       && <MetricsCarousel />}
        {sections.methodology && <Methodology />}
        {sections.faq         && <FAQ />}
        {sections.cta         && <CTASection />}
      </main>
      <Footer />
    </div>
  )
}
