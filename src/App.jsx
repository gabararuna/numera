import { LanguageProvider } from './i18n/LanguageContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ExchangeTicker from './components/ExchangeTicker'
import TradingInfrastructure from './components/TradingInfrastructure'
import Methodology from './components/Methodology'
import MetricsCarousel from './components/MetricsCarousel'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

function App() {
  return (
    <LanguageProvider>
      <div className="max-w-[1800px] mx-auto w-full relative">
        <Navbar />
        <main className="bg-black">
          <HeroSection />
          <ExchangeTicker />
          <TradingInfrastructure />
          <Methodology />
          <MetricsCarousel />
          <CTASection />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
