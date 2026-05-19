import { createContext, useContext, useState } from 'react'
import content from '../content.json'

const LanguageContext = createContext()

const languages = ['pt', 'en', 'es']
const defaultLanguage = 'pt'

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return defaultLanguage
  const saved = localStorage.getItem('numera-language')
  if (saved && languages.includes(saved)) return saved
  const browserLang = navigator.language.split('-')[0]
  if (languages.includes(browserLang)) return browserLang
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

  const t = (key) =>
    content.translations[lang]?.[key] ||
    content.translations[defaultLanguage]?.[key] ||
    key

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export { languages, defaultLanguage }

export default LanguageContext
