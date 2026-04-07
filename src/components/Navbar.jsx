import { useLanguage } from '../i18n/LanguageContext'
import { languages } from '../i18n/translations'

export default function Navbar() {
  const { lang, setLang } = useLanguage()

  return (
    <nav id="top" className="relative h-16 flex items-center justify-end px-6 md:px-12 z-[70]">
      <div className="flex items-center gap-1">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`text-xs tracking-wider px-2 py-1 rounded transition-colors ${
              lang === l
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  )
}
