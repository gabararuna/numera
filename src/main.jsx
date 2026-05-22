import { StrictMode, useEffect, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'
import App from './App.jsx'
import Admin from './pages/Admin.jsx'
import SobrePage from './pages/SobrePage.jsx'
import SolucoesPage from './pages/SolucoesPage.jsx'
import ContatoPage from './pages/ContatoPage.jsx'
import CookieBanner from './components/CookieBanner.jsx'

function CursorSpotlight() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const move = (e) => {
      el.style.left = `${e.clientX}px`
      el.style.top  = `${e.clientY}px`
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
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
        background: 'radial-gradient(circle, rgba(0,191,165,0.045) 0%, transparent 65%)',
        zIndex: 9998,
        left: '-999px',
        top: '-999px',
        borderRadius: '50%',
      }}
    />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <CursorSpotlight />
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
    </BrowserRouter>
  </StrictMode>,
)
