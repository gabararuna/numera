import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { ThemeProvider } from './theme/ThemeContext'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import SobrePage from './pages/SobrePage.jsx'
import SolucoesPage from './pages/SolucoesPage.jsx'
import ContatoPage from './pages/ContatoPage.jsx'
import CookieBanner from './components/CookieBanner.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <ThemeProvider>
          <LanguageProvider>
            <CookieBanner />
            <Routes>
              <Route path="/"           element={<App />} />
              <Route path="/sobre"      element={<SobrePage />} />
              <Route path="/sobre/"     element={<SobrePage />} />
              <Route path="/solucoes"   element={<SolucoesPage />} />
              <Route path="/solucoes/"  element={<SolucoesPage />} />
              <Route path="/contato"    element={<ContatoPage />} />
              <Route path="/contato/"   element={<ContatoPage />} />
              <Route path="/admin"      element={<Admin />} />
              <Route path="*"           element={<App />} />
            </Routes>
          </LanguageProvider>
        </ThemeProvider>
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
)
