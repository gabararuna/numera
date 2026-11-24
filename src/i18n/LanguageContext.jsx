import { useState } from 'react'
import content from '../content.json'
import { LanguageContext, languages, defaultLanguage } from './languageStore'

const getInitialLanguage = () => {
  if (typeof window === 'undefined') return defaultLanguage
  try {
    const saved = localStorage.getItem('numera-language')
    if (saved && languages.includes(saved)) return saved
  } catch {
    return defaultLanguage
  }
  const browserLang = navigator.language.split('-')[0]
  if (languages.includes(browserLang)) return browserLang
  return defaultLanguage
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage)

  const setLang = (newLang) => {
    if (languages.includes(newLang)) {
      setLangState(newLang)
      try {
        localStorage.setItem('numera-language', newLang)
      } catch {
        // Storage blocked in restricted mode
      }
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
