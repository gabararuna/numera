import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/useLanguage'
import { NumeraLogo } from './BrandMarks'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-canvas border-t border-fg/10 py-12 px-5 md:px-10">
      <div className="max-w-[1440px] mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <Link to="/" className="inline-flex items-center w-fit">
              <NumeraLogo markSize={20} textSize="text-[16px]" />
            </Link>
            <span className="font-mono text-xs text-fg-3">gruponumera.com</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex flex-wrap gap-5">
              <Link className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera" to="/">
                {t('nav_home')}
              </Link>
              <Link className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera" to="/solucoes">
                {t('nav_solutions')}
              </Link>
              <Link className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera" to="/sobre">
                {t('nav_about')}
              </Link>
              <Link className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera" to="/contato">
                {t('nav_contact')}
              </Link>
            </div>

            <div className="hidden md:block h-4 w-px bg-fg/15" aria-hidden="true" />

            <div className="flex flex-wrap gap-5">
              <a
                className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera"
                href="https://monno.gruponumera.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Monno
              </a>
              <a
                className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera"
                href="https://cronos.gruponumera.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cronos
              </a>
              <a
                className="text-xs font-medium text-fg-3 hover:text-fg transition-colors duration-200 ease-numera"
                href="https://nyot.gruponumera.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NYOT
              </a>
            </div>

            <div className="hidden md:block h-4 w-px bg-fg/15" aria-hidden="true" />

            <div className="flex flex-wrap gap-5">
              <a className="text-xs text-fg-3 hover:text-fg transition-colors duration-200 ease-numera" href="/privacidade.html">
                {t('footer_privacy')}
              </a>
              <a className="text-xs text-fg-3 hover:text-fg transition-colors duration-200 ease-numera" href="/cookies.html">
                {t('footer_cookies')}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-fg/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-fg-3">
          <span>{t('footer_copy')}</span>
          <span>Numera Consultoria de Engenharia LTDA · CNPJ 51.387.729/0001-01</span>
        </div>
      </div>
    </footer>
  )
}
