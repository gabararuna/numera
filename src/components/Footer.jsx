import { useLanguage } from '../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="w-full bg-black py-12 px-6 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/40 font-light">
              {t('footer_copy')}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
            <div className="flex flex-wrap gap-4 md:gap-8">
              <a className="text-sm text-white/40 hover:text-white/80 transition-colors" href="/">
                {t('nav_home')}
              </a>
              <a className="text-sm text-white/40 hover:text-white/80 transition-colors" href="/solucoes">
                {t('nav_solutions')}
              </a>
              <a className="text-sm text-white/40 hover:text-white/80 transition-colors" href="/sobre">
                {t('nav_about')}
              </a>
              <a className="text-sm text-white/40 hover:text-white/80 transition-colors" href="/contato">
                {t('nav_contact')}
              </a>
            </div>

            <div className="hidden md:block h-4 w-px bg-white/20" />

            <div className="flex flex-wrap gap-4 md:gap-8">
              <a
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
                href="https://www.iubenda.com/privacy-policy/54914294"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer_privacy')}
              </a>
              <a
                className="text-sm text-white/40 hover:text-white/80 transition-colors"
                href="https://www.iubenda.com/privacy-policy/54914294/cookie-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('footer_cookies')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
