import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, Moon, Sun, X } from 'lucide-react'
import { useLanguage, languages } from '../i18n/useLanguage'
import { useTheme } from '../theme/useTheme'
import { NumeraLogo } from './BrandMarks'

export default function Navbar() {
  const { lang, setLang, t } = useLanguage()
  const { theme, toggleTheme } = useTheme()
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  const links = [
    { to: '/', key: 'nav_home' },
    { to: '/solucoes', key: 'nav_solutions' },
    { to: '/sobre', key: 'nav_about' },
    { to: '/contato', key: 'nav_contact' },
  ]

  const isActive = (to) => (to === '/' ? pathname === '/' : pathname.startsWith(to))

  const themeLabel = theme === 'light' ? t('theme_dark') : t('theme_light')

  return (
    <header className="sticky top-0 z-50 glass-bar">
      <div className="max-w-[1440px] mx-auto h-16 px-5 md:px-10 flex items-center justify-between gap-4">
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="inline-flex items-center shrink-0 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-fg/40"
          aria-label="Numera"
        >
          <NumeraLogo markSize={24} textSize="text-[17px]" />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Navegação principal">
          {links.map(({ to, key }) => (
            <Link
              key={to}
              to={to}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-[background-color,color] duration-200 ease-numera ${
                isActive(to)
                  ? 'bg-sunken text-fg'
                  : 'text-fg-3 hover:text-fg hover:bg-sunken/60'
              }`}
            >
              {t(key)}
            </Link>
          ))}
          <a
            href="/#ecossistema"
            className="px-3.5 py-1.5 rounded-full text-xs font-medium text-fg-3 hover:text-fg hover:bg-sunken/60 transition-[background-color,color] duration-200 ease-numera"
          >
            {t('nav_ecosystem')}
          </a>
        </nav>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={themeLabel}
            title={themeLabel}
            className="h-10 px-3 rounded-full border border-fg/12 bg-raised text-fg-2 hover:text-fg hover:bg-sunken inline-flex items-center gap-2 text-xs font-medium cursor-pointer transition-[background-color,border-color,color,transform] duration-200 ease-numera active:scale-[0.97]"
          >
            {theme === 'light' ? <Moon size={14} /> : <Sun size={14} />}
            <span className="hidden sm:inline">{theme === 'light' ? 'Ônix' : 'Algodão'}</span>
          </button>

          <div
            className="hidden sm:inline-flex items-center h-10 p-1 rounded-full border border-fg/12 bg-raised"
            role="group"
            aria-label="Idioma"
          >
            {languages.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLang(l)}
                className={`h-8 px-2.5 rounded-full text-[11px] font-medium tracking-[0.08em] cursor-pointer transition-[background-color,color] duration-200 ease-numera ${
                  lang === l ? 'bg-accent text-accent-on' : 'text-fg-3 hover:text-fg'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            className="md:hidden w-10 h-10 rounded-full border border-fg/12 bg-raised text-fg inline-flex items-center justify-center cursor-pointer transition-[background-color,color] duration-200 ease-numera"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu drawer */}
      {mobileOpen && (
        <div className="md:hidden px-5 pb-4">
          <div className="glass-3 rounded-card p-4 space-y-3">
            <div className="flex flex-col gap-1">
              {links.map(({ to, key }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3.5 py-2.5 rounded-field text-sm font-medium transition-[background-color,color] duration-200 ease-numera ${
                    isActive(to) ? 'bg-sunken text-fg' : 'text-fg-2 hover:bg-sunken/70 hover:text-fg'
                  }`}
                >
                  {t(key)}
                </Link>
              ))}
              <a
                href="/#ecossistema"
                onClick={() => setMobileOpen(false)}
                className="px-3.5 py-2.5 rounded-field text-sm font-medium text-fg-2 hover:bg-sunken/70 hover:text-fg transition-[background-color,color] duration-200 ease-numera"
              >
                {t('nav_ecosystem')}
              </a>
            </div>

            <div className="pt-3 border-t border-fg/10 flex items-center justify-between">
              <span className="label-ui text-fg-3">Idioma</span>
              <div className="inline-flex items-center p-1 rounded-full border border-fg/12 bg-sunken">
                {languages.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    className={`h-7 px-3 rounded-full text-[11px] font-medium tracking-[0.08em] cursor-pointer transition-[background-color,color] duration-200 ease-numera ${
                      lang === l ? 'bg-accent text-accent-on' : 'text-fg-3 hover:text-fg'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
