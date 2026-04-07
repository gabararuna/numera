import { createContext, useContext, useState } from 'react'
import { translations, defaultLanguage } from './translations'

const LanguageContext = createContext()

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(defaultLanguage)
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
