import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/useLanguage'
import { NUMERA_EASE } from '../constants/motion'

const CONSENT_KEY = 'numera_consent'

function hasStoredConsent() {
  if (typeof window === 'undefined') return true
  try {
    return Boolean(localStorage.getItem(CONSENT_KEY))
  } catch {
    return true
  }
}

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(() => !hasStoredConsent())

  const save = (accepted) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ accepted, date: new Date().toISOString() })
      )
    } catch {
      // localStorage indisponível (modo restrito)
    }
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.32, ease: NUMERA_EASE }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-50"
        >
          <div className="max-w-4xl mx-auto glass-3 rounded-card px-5 py-4 md:px-6 flex flex-col md:flex-row md:items-center gap-4">
            <p className="flex-1 text-xs sm:text-sm text-fg-2 font-light leading-relaxed">
              {t('cookie_text')}{' '}
              <a
                href="/privacidade.html"
                className="text-fg underline underline-offset-2 hover:text-fg-2 transition-colors duration-200 ease-numera"
              >
                {t('footer_privacy')}
              </a>
              {' '}{t('cookie_and')}{' '}
              <a
                href="/cookies.html"
                className="text-fg underline underline-offset-2 hover:text-fg-2 transition-colors duration-200 ease-numera"
              >
                {t('footer_cookies')}
              </a>
              .
            </p>
            <div className="flex gap-2.5 shrink-0 self-end md:self-auto">
              <button
                type="button"
                onClick={() => save(false)}
                className="px-4 py-2 text-xs font-medium rounded-full border border-fg/14 text-fg-2 hover:text-fg hover:border-fg/28 transition-[border-color,color] duration-200 ease-numera cursor-pointer"
              >
                {t('cookie_reject')}
              </button>
              <button
                type="button"
                onClick={() => save(true)}
                className="px-4 py-2 text-xs font-medium rounded-full bg-accent text-accent-on hover:bg-accent-hover transition-[background-color,transform] duration-200 ease-numera active:scale-[0.98] cursor-pointer"
              >
                {t('cookie_accept')}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
