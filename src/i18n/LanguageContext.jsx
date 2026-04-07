import { createContext, useContext, useState, useEffect } from 'react'
import { translations, defaultLanguage, languages } from './translations'

const LanguageContext = createContext()

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return defaultLanguage

  const saved = localStorage.getItem('numera-language')
  if (saved && languages.includes(saved)) return saved

  const browserLang = navigator.language.split('-')[0]
  if (languages.includes(browserLang)) {
    return browserLang
  }

  return defaultLanguage
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  const setLang = (newLang) => {
    if (languages.includes(newLang)) {
      setLangState(newLang)
      localStorage.setItem('numera-language', newLang)
    }
  }

  const t = (key) => translations[lang]?.[key] || translations[defaultLanguage]?.[key] || key
  const value = { lang, setLang, t }
  
  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export default LanguageContext
