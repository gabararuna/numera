import { useLanguage, languages } from '../i18n/LanguageContext'

export default function Navbar() {
  const { lang, setLang } = useLanguage()

  return (
    <nav id="top" className="relative h-16 flex items-center justify-between px-6 md:px-12 z-[70]">
      {/* Logo */}
      <div
        className="shimmer-logo"
        style={{ width: '88px', height: '22px', flexShrink: 0 }}
        aria-label="Numera"
      />

      {/* Language selector */}
      <div className="flex items-center gap-0.5">
        {languages.map((l, i) => (
          <span key={l} className="flex items-center">
            <button
              onClick={() => setLang(l)}
              className={`text-[11px] tracking-[0.12em] px-2 py-1 rounded transition-all duration-300 ${
                lang === l
                  ? 'text-white font-medium'
                  : 'text-white/35 hover:text-white/60 font-light'
              }`}
            >
              {l.toUpperCase()}
            </button>
            {i < languages.length - 1 && (
              <span className="w-px h-3 bg-white/15" />
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
