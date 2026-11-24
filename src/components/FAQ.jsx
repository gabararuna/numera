import { useState } from 'react'
import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/useLanguage'
import { NUMERA_EASE } from '../constants/motion'

function FadeIn({ children }) {
  return <div>{children}</div>
}

function FAQItem({ question, answer, open, onToggle, index }) {
  return (
    <FadeIn delay={0.04 * index}>
      <div className="border-b border-fg/10 last:border-b-0">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left group cursor-pointer"
          aria-expanded={open}
        >
          <span className="text-sm md:text-base font-normal text-fg-2 group-hover:text-fg transition-colors duration-200 ease-numera leading-snug">
            {question}
          </span>
          <span
            className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-[border-color,color,background-color] duration-200 ease-numera ${
              open
                ? 'border-fg/35 bg-sunken text-fg'
                : 'border-fg/15 text-fg-3 group-hover:border-fg/35 group-hover:text-fg'
            }`}
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1V9M1 5H9"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                style={{
                  transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                  transformOrigin: '5px 5px',
                  transition: 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              />
            </svg>
          </span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.32, ease: NUMERA_EASE }}
          style={{ overflow: 'hidden' }}
        >
          <p className="text-sm text-fg-2 font-light leading-relaxed pb-6 max-w-2xl">
            {answer}
          </p>
        </motion.div>
      </div>
    </FadeIn>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState(null)

  const items = [0, 1, 2, 3, 4, 5].map((i) => ({
    q: t(`faq_${i}_q`),
    a: t(`faq_${i}_a`),
  }))

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section className="py-16 px-5 md:px-10 bg-canvas">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[0.38fr_0.62fr] gap-10 lg:gap-16 items-start">
        <div>
          <FadeIn>
            <div className="label-ui text-fg-3 mb-3">FAQ</div>
            <h2 className="text-2xl md:text-3xl font-medium tracking-[-0.025em] text-fg mb-3">
              {t('faq_heading')}
            </h2>
            <p className="text-fg-2 text-sm md:text-base font-light leading-relaxed max-w-sm">
              {t('faq_description')}
            </p>
          </FadeIn>
        </div>

        <div className="rounded-card border border-fg/10 bg-raised px-6 md:px-8">
          {items.map((item, i) => (
            <FAQItem
              key={i}
              index={i}
              question={item.q}
              answer={item.a}
              open={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
