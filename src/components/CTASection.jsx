import { Mail, MessageCircle, Phone } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import { NumeraMark } from './BrandMarks'

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export default function CTASection() {
  const { t } = useLanguage()

  return (
    <section id="contact" className="py-20 px-5 md:px-10 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <FadeIn>
          <div className="glass-2 rounded-sheet bg-raised/80 border border-fg/10 px-6 py-14 md:px-14 md:py-20 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-icon bg-sunken border border-fg/10 flex items-center justify-center text-fg mb-7">
              <NumeraMark size={26} />
            </div>

            <h2 className="text-3xl md:text-5xl font-medium tracking-[-0.03em] text-fg mb-5 leading-[1.1] max-w-2xl">
              {t('cta_heading')}
            </h2>

            <p className="text-fg-2 text-sm md:text-base font-light leading-relaxed max-w-lg mb-9">
              {t('cta_description')}
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3.5 justify-center w-full max-w-md sm:max-w-none">
              <a
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent text-accent-on hover:bg-accent-hover px-7 py-3.5 text-sm font-medium transition-[background-color,transform] duration-200 ease-numera active:scale-[0.98]"
                href="https://wa.me/5598992172631"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={15} />
                <span>{t('cta_button1')}</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-fg/14 bg-canvas/50 text-fg hover:bg-sunken hover:border-fg/28 px-7 py-3.5 text-sm font-medium transition-[background-color,border-color,transform] duration-200 ease-numera active:scale-[0.98]"
                href="mailto:contato@gruponumera.com"
              >
                <Mail size={15} />
                <span>{t('cta_button2')}</span>
              </a>
              <a
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-fg/14 bg-canvas/50 text-fg hover:bg-sunken hover:border-fg/28 px-7 py-3.5 text-sm font-medium transition-[background-color,border-color,transform] duration-200 ease-numera active:scale-[0.98]"
                href="tel:+5598992172631"
              >
                <Phone size={15} />
                <span>{t('cta_button3')}</span>
              </a>
            </div>

            <p className="mt-8 text-xs text-fg-3 font-normal">
              {t('cta_sla')}
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
