import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const CONSENT_KEY = 'numera_consent'

export default function CookieBanner() {
  const { t } = useLanguage()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setVisible(true)
    } catch {
      // localStorage indisponível (modo restrito) — não exibe o banner
    }
  }, [])

  const save = (accepted) => {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({ accepted, date: new Date().toISOString() })
      )
    } catch {}
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 z-[9999]"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl border border-white/10 px-5 py-4 md:px-6 shadow-2xl flex flex-col md:flex-row md:items-center gap-4"
            style={{ background: 'rgba(8,8,8,0.96)', backdropFilter: 'blur(24px)' }}
          >
            <p className="flex-1 text-sm text-white/55 font-light leading-relaxed">
              {t('cookie_text')}{' '}
              <a
                href="/privacidade.html"
                className="text-[#00BFA5] underline underline-offset-2 hover:text-[#00E6C7] transition-colors"
              >
                {t('footer_privacy')}
              </a>
              {' '}{t('cookie_and')}{' '}
              <a
                href="/cookies.html"
                className="text-[#00BFA5] underline underline-offset-2 hover:text-[#00E6C7] transition-colors"
              >
                {t('footer_cookies')}
              </a>
              .
            </p>
            <div className="flex gap-3 shrink-0 self-end md:self-auto">
              <button
                onClick={() => save(false)}
                className="px-4 py-2 text-xs font-medium tracking-wider rounded-lg border border-white/10 text-white/40 hover:text-white/65 hover:border-white/20 transition-colors cursor-pointer"
              >
                {t('cookie_reject')}
              </button>
              <button
                onClick={() => save(true)}
                className="px-4 py-2 text-xs font-medium tracking-wider rounded-lg border border-[#00BFA5]/40 bg-[#00BFA5]/10 text-[#00BFA5] hover:bg-[#00BFA5]/20 hover:border-[#00BFA5]/60 transition-colors cursor-pointer"
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
