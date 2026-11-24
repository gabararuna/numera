import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'
import content from '../content.json'

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

export default function Methodology() {
  const { t } = useLanguage()

  const cards = useMemo(
    () =>
      content.services
        .filter((s) => s.visible)
        .map((s, idx) => ({
          num: String(idx + 1).padStart(2, '0'),
          label: t(`methodology_card${s.id}_label`),
          title: t(`methodology_card${s.id}_title`),
          desc: t(`methodology_card${s.id}_desc`),
        })),
    [t]
  )

  return (
    <section className="py-24 px-5 md:px-10 bg-canvas">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <FadeIn>
              <div className="label-ui text-fg-3 mb-3">{t('nav_about')} · B2B</div>
              <h2 className="text-2xl md:text-4xl font-medium tracking-[-0.025em] text-fg mb-3">
                {t('methodology_heading')}
              </h2>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="text-fg-2 text-sm md:text-base font-light leading-relaxed max-w-xl">
                {t('methodology_description')}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.12}>
            <Link
              to="/solucoes"
              className="inline-flex items-center gap-2 rounded-full border border-fg/12 bg-raised px-5 py-2.5 text-xs font-medium text-fg-2 hover:text-fg hover:bg-sunken hover:border-fg/24 transition-[background-color,border-color,color] duration-200 ease-numera"
            >
              <span>{t('services_more')}</span>
              <ArrowUpRight size={14} />
            </Link>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {cards.map((card, i) => (
            <FadeIn key={card.num} delay={0.08 * (i + 1)}>
              <article className="rounded-card border border-fg/10 bg-raised p-7 md:p-9 h-full flex flex-col justify-between gap-8 hover:border-fg/20 transition-[border-color,background-color] duration-200 ease-numera">
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="label-ui text-fg-3">{card.label}</span>
                    <span className="num text-xs font-medium text-fg-3">{card.num}</span>
                  </div>
                  <h3 className="text-xl font-medium text-fg tracking-[-0.015em] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-sm text-fg-2 font-light leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-fg/[0.08] flex items-center justify-between text-xs text-fg-3">
                  <span>{t('cta_sla')}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-positive" aria-hidden="true" />
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
