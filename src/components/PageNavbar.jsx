import { Link, useLocation } from 'react-router-dom'
import { useLanguage, languages } from '../i18n/LanguageContext'

export default function PageNavbar() {
  const { lang, setLang, t } = useLanguage()
  const { pathname } = useLocation()

  const links = [
    { to: '/',         key: 'nav_home' },
    { to: '/solucoes', key: 'nav_solutions' },
    { to: '/sobre',    key: 'nav_about' },
    { to: '/contato',  key: 'nav_contact' },
  ]

  const isActive = (to) =>
    to === '/' ? pathname === '/' : pathname.startsWith(to)

  return (
    <nav className="relative h-16 flex items-center justify-between px-6 md:px-12 z-[70] border-b border-white/5">
      {/* Brand */}
      <Link
        to="/"
        className="text-sm font-medium text-white/80 hover:text-white transition-colors tracking-wide"
      >
        Numera
      </Link>

      {/* Links — hidden on mobile */}
      <div className="hidden md:flex items-center gap-8">
        {links.map(({ to, key }) => (
          <Link
            key={to}
            to={to}
            className={`text-xs tracking-wider transition-colors ${
              isActive(to)
                ? 'text-white'
                : 'text-white/40 hover:text-white/70'
            }`}
          >
            {t(key)}
          </Link>
        ))}
      </div>

      {/* Language switcher */}
      <div className="flex items-center gap-1">
        {languages.map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`text-xs tracking-wider px-2 py-1 rounded transition-colors ${
              lang === l ? 'text-white' : 'text-white/40 hover:text-white/70'
            }`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>
    </nav>
  )
}
