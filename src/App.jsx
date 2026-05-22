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
    <div className="max-w-[1800px] mx-auto w-full relative">
      <Navbar />
      <main className="bg-black">
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
