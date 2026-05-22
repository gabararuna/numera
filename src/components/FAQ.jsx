import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'
import content from '../content.json'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  )
}

function FAQItem({ question, answer, open, onToggle, index }) {
  return (
    <FadeIn delay={0.05 * index}>
      <div
        className="border-b border-white/8 last:border-b-0"
      >
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
          aria-expanded={open}
        >
          <span className="text-sm md:text-base font-light text-white/85 group-hover:text-white transition-colors duration-300 leading-snug">
            {question}
          </span>
          <span
            className="shrink-0 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:border-[#00BFA5]/50 group-hover:text-[#00BFA5] transition-all duration-300"
            aria-hidden="true"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 1V9M1 5H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
                  transformOrigin: '5px 5px',
                  transition: 'transform 0.3s ease',
                }}
              />
            </svg>
          </span>
        </button>

        <motion.div
          initial={false}
          animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          style={{ overflow: 'hidden' }}
        >
          <p className="text-sm text-white/55 font-light leading-relaxed pb-6 max-w-3xl">
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
    <section className="py-12 px-6 md:px-12 bg-black">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-16 text-left">
          <FadeIn>
            <h2 className="text-xl md:text-3xl font-light tracking-tight text-white mb-4 shimmer-text">
              {t('faq_heading')}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-white/70 text-sm md:text-base font-light leading-relaxed">
              {t('faq_description')}
            </p>
          </FadeIn>
        </div>

        <div className="border-t border-white/8">
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
