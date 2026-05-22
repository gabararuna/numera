import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import PageNavbar from '../components/PageNavbar'
import Footer from '../components/Footer'

function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const CHANNELS = [
  {
    emoji: '💬',
    label: 'WhatsApp',
    value: '+55 (98) 99217-2631',
    href: 'https://wa.me/5598992172631',
    desc: 'Resposta rápida para uma conversa inicial ou para marcar uma reunião sem burocracia.',
    external: true,
  },
  {
    emoji: '✉️',
    label: 'E-mail',
    value: 'contato@gruponumera.com',
    href: 'mailto:contato@gruponumera.com',
    desc: 'Para projetos mais complexos ou quando precisar enviar arquivos e contexto detalhado.',
    external: false,
  },
  {
    emoji: '📞',
    label: 'Telefone',
    value: '+55 (98) 99217-2631',
    href: 'tel:+5598992172631',
    desc: 'Para uma conversa direta e sem formalidade. Disponível em horário comercial.',
    external: false,
  },
]

const FAQ = [
  {
    q: 'Como funciona a primeira reunião?',
    a: 'É uma conversa de 30 a 45 minutos, sem compromisso e sem apresentação. Você explica o problema e a gente responde com clareza sobre o que é possível fazer, qual seria o escopo, quanto tempo levaria e qual seria o próximo passo concreto.',
  },
  {
    q: 'Vocês atendem empresas de qualquer porte?',
    a: 'Sim. Atendemos desde times pequenos de 3 a 5 pessoas que precisam de uma automação específica até empresas com centenas de funcionários. O escopo e o investimento se ajustam ao contexto.',
  },
  {
    q: 'É possível contratar apenas o treinamento, sem um projeto de sistema?',
    a: 'Sim, com prazer. Treinamentos são uma oferta independente. Muitas empresas começam pela capacitação da equipe e, depois de ver o resultado, avançam para automação ou sistema.',
  },
  {
    q: 'Qual é o prazo para receber uma proposta?',
    a: 'Até 48 horas úteis após a primeira conversa ou mensagem com contexto suficiente. Não trabalhamos com fila de espera.',
  },
]

function FAQItem({ q, a, open, onToggle, index }) {
  return (
    <FadeIn delay={0.05 * index}>
      <div className="border-b border-white/8 last:border-b-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-6 text-left group cursor-pointer"
        >
          <span className="text-sm md:text-base font-light text-white/85 group-hover:text-white transition-colors duration-300 leading-snug">
            {q}
          </span>
          <span className="shrink-0 w-5 h-5 rounded-full border border-white/20 flex items-center justify-center text-white/40 group-hover:border-[#00BFA5]/50 group-hover:text-[#00BFA5] transition-all duration-300">
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
          <p className="text-sm text-white/50 font-light leading-relaxed pb-6 max-w-3xl">{a}</p>
        </motion.div>
      </div>
    </FadeIn>
  )
}

export default function ContatoPage() {
  const [openFaq, setOpenFaq] = useState(null)
  const toggle = (i) => setOpenFaq(openFaq === i ? null : i)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const nome = form.nome.value
    const empresa = form.empresa.value
    const assunto = form.assunto.value
    const mensagem = form.mensagem.value
    const body = `Nome: ${nome}\nEmpresa: ${empresa}\nAssunto: ${assunto}\n\n${mensagem}`
    window.location.href = `mailto:contato@gruponumera.com?subject=${encodeURIComponent(assunto || 'Contato via site')}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="max-w-[1800px] mx-auto w-full relative">
      <PageNavbar />
      <main className="bg-black">

        {/* ── Hero ── */}
        <section className="relative px-6 md:px-12 pt-20 pb-24 overflow-hidden bg-black">
          <div
            className="absolute inset-x-0 top-0 h-72 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,191,165,0.06) 0%, transparent 100%)' }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
              <span className="inline-block text-[10px] tracking-[0.18em] text-[#00BFA5] border border-[#00BFA5]/25 rounded-full px-3 py-1.5 mb-8 font-medium uppercase">
                Contato
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-6 shimmer-text max-w-3xl">
                Pronto para conversar?
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl">
                A Numera funciona de forma direta: você nos conta o problema, a gente entende o contexto e responde com uma proposta clara em até 48 horas úteis. Sem funil de vendas, sem e-mails automáticos.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Canais ── */}
        <section className="py-20 md:py-24 px-6 md:px-12 border-t border-white/5 bg-black">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
            <FadeIn>
              <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase font-medium block pt-1">
                Canais de contato
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-8 shimmer-text leading-snug">
                  Escolha o canal mais prático para você.
                </h2>
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
                {CHANNELS.map((ch, i) => (
                  <FadeIn key={i} delay={0.1 * (i + 1)}>
                    <a
                      href={ch.href}
                      target={ch.external ? '_blank' : undefined}
                      rel={ch.external ? 'noopener noreferrer' : undefined}
                      className="group bg-black p-8 md:p-10 flex flex-col gap-3 h-full hover:bg-[#00BFA5]/3 transition-colors duration-300"
                    >
                      <span className="text-xl mb-1">{ch.emoji}</span>
                      <span className="text-[10px] tracking-[0.18em] text-[#00BFA5] uppercase font-medium">
                        {ch.label}
                      </span>
                      <span className="text-[0.9375rem] font-light text-white tracking-tight">
                        {ch.value}
                      </span>
                      <p className="text-sm text-white/40 font-light leading-relaxed mt-1">
                        {ch.desc}
                      </p>
                    </a>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Formulário ── */}
        <section className="py-20 md:py-24 px-6 md:px-12 border-t border-white/5 bg-black">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
            <FadeIn>
              <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase font-medium block pt-1">
                Formulário
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-3 shimmer-text leading-snug">
                  Prefere escrever? Preencha abaixo.
                </h2>
                <p className="text-white/45 font-light text-sm leading-relaxed mb-8">
                  Descreva o problema ou o projeto com o máximo de contexto que puder.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    {/* Nome */}
                    <div className="space-y-2">
                      <label className="block text-[10px] tracking-[0.15em] text-white/35 uppercase font-medium">
                        Nome completo
                      </label>
                      <input
                        name="nome"
                        type="text"
                        required
                        placeholder="Seu nome"
                        className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3.5 text-[0.9375rem] font-light text-white placeholder-white/20 outline-none focus:border-[#00BFA5]/40 focus:bg-[#00BFA5]/3 transition-colors"
                      />
                    </div>
                    {/* Empresa */}
                    <div className="space-y-2">
                      <label className="block text-[10px] tracking-[0.15em] text-white/35 uppercase font-medium">
                        Empresa
                      </label>
                      <input
                        name="empresa"
                        type="text"
                        placeholder="Nome da empresa"
                        className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3.5 text-[0.9375rem] font-light text-white placeholder-white/20 outline-none focus:border-[#00BFA5]/40 focus:bg-[#00BFA5]/3 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Assunto */}
                  <div className="space-y-2">
                    <label className="block text-[10px] tracking-[0.15em] text-white/35 uppercase font-medium">
                      Qual é o seu interesse?
                    </label>
                    <select
                      name="assunto"
                      className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3.5 text-[0.9375rem] font-light text-white/70 outline-none focus:border-[#00BFA5]/40 transition-colors appearance-none cursor-pointer"
                      style={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                    >
                      <option value="" disabled className="bg-black text-white/50">Selecione uma opção</option>
                      <option value="Automação e Dashboard" className="bg-black text-white">Automação e Dashboard</option>
                      <option value="Treinamento Corporativo" className="bg-black text-white">Treinamento Corporativo em Dados</option>
                      <option value="Consultoria Estratégica" className="bg-black text-white">Consultoria e Planejamento Estratégico</option>
                      <option value="Ecossistema de Produtos" className="bg-black text-white">Ecossistema de Produtos Numera</option>
                      <option value="Outro" className="bg-black text-white">Outro assunto</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <label className="block text-[10px] tracking-[0.15em] text-white/35 uppercase font-medium">
                      Mensagem
                    </label>
                    <textarea
                      name="mensagem"
                      rows={5}
                      placeholder="Descreva o problema ou o que você precisa. Sem formalidade — pode ser direto."
                      className="w-full bg-white/3 border border-white/10 rounded-xl px-4 py-3.5 text-[0.9375rem] font-light text-white placeholder-white/20 outline-none focus:border-[#00BFA5]/40 focus:bg-[#00BFA5]/3 transition-colors resize-y leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="glass-btn group"
                  >
                    <span className="relative z-10 text-sm font-light tracking-wide">
                      Enviar mensagem
                    </span>
                  </button>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="py-20 md:py-24 px-6 md:px-12 border-t border-white/5 bg-black">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
            <FadeIn>
              <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase font-medium block pt-1">
                Perguntas rápidas
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.1}>
                <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-8 shimmer-text leading-snug">
                  O que acontece depois que eu entro em contato?
                </h2>
              </FadeIn>
              <div className="border-t border-white/8">
                {FAQ.map((item, i) => (
                  <FAQItem
                    key={i}
                    index={i}
                    q={item.q}
                    a={item.a}
                    open={openFaq === i}
                    onToggle={() => toggle(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
