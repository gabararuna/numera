import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, Phone } from 'lucide-react'
import PageNavbar from '../components/PageNavbar'
import Footer from '../components/Footer'
import { StatusDot } from '../components/BrandMarks'
import { NUMERA_EASE } from '../constants/motion'

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

const CHANNELS = [
  {
    Icon: MessageCircle,
    label: 'WhatsApp',
    value: '+55 (98) 99217-2631',
    href: 'https://wa.me/5598992172631',
    desc: 'Resposta rápida para uma conversa inicial ou para marcar uma reunião sem burocracia.',
    external: true,
  },
  {
    Icon: Mail,
    label: 'E-mail',
    value: 'contato@gruponumera.com',
    href: 'mailto:contato@gruponumera.com',
    desc: 'Para projetos mais complexos ou quando precisar enviar arquivos e contexto detalhado.',
    external: false,
  },
  {
    Icon: Phone,
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
    <FadeIn delay={0.04 * index}>
      <div className="border-b border-fg/10 last:border-b-0">
        <button
          type="button"
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-6 py-5 md:py-6 text-left group cursor-pointer"
          aria-expanded={open}
        >
          <span className="text-sm md:text-base font-normal text-fg-2 group-hover:text-fg transition-colors duration-200 ease-numera leading-snug">
            {q}
          </span>
          <span className="shrink-0 w-7 h-7 rounded-full border border-fg/15 flex items-center justify-center text-fg-3 group-hover:border-fg/35 group-hover:text-fg transition-[border-color,color] duration-200 ease-numera">
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
          <p className="text-sm text-fg-2 font-light leading-relaxed pb-6 max-w-3xl">{a}</p>
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
    <div className="min-h-screen flex flex-col bg-canvas text-fg relative">
      <PageNavbar />
      <main className="flex-1 bg-canvas">
        {/* Hero */}
        <section className="relative px-5 md:px-10 pt-16 pb-20 bg-canvas">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center rounded-full glass-1 px-3.5 py-1.5 mb-7">
                <StatusDot tone="positive" label="Contato" className="label-ui" />
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.06] mb-6 text-fg max-w-3xl">
                Pronto para conversar?
              </h1>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="text-base md:text-lg text-fg-2 font-light leading-relaxed max-w-2xl">
                A Numera funciona de forma direta: você nos conta o problema, a gente entende o contexto e responde com uma proposta clara em até 48 horas úteis. Sem funil de vendas, sem e-mails automáticos.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Canais */}
        <section className="py-16 md:py-24 px-5 md:px-10 border-t border-fg/10 bg-canvas">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
            <FadeIn>
              <span className="label-ui text-fg-3 block pt-1">
                Canais de contato
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.08}>
                <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-8 leading-snug">
                  Escolha o canal mais prático para você.
                </h2>
              </FadeIn>
              <div className="grid md:grid-cols-3 gap-4">
                {CHANNELS.map((ch, i) => {
                  const ChannelIcon = ch.Icon
                  return (
                    <FadeIn key={ch.label} delay={0.06 * (i + 1)}>
                      <a
                        href={ch.href}
                        target={ch.external ? '_blank' : undefined}
                        rel={ch.external ? 'noopener noreferrer' : undefined}
                        className="group rounded-card border border-fg/10 bg-raised p-7 flex flex-col gap-3 h-full hover:border-fg/24 hover:bg-sunken/70 transition-[background-color,border-color] duration-200 ease-numera"
                      >
                        <span className="w-10 h-10 rounded-icon bg-sunken border border-fg/10 flex items-center justify-center text-fg mb-1">
                          <ChannelIcon size={17} />
                        </span>
                        <span className="label-ui text-fg-3">
                          {ch.label}
                        </span>
                        <span className="text-base font-medium text-fg tracking-[-0.01em] break-all">
                          {ch.value}
                        </span>
                        <p className="text-sm text-fg-2 font-light leading-relaxed mt-1">
                          {ch.desc}
                        </p>
                      </a>
                    </FadeIn>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Formulário */}
        <section className="py-16 md:py-24 px-5 md:px-10 border-t border-fg/10 bg-canvas">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
            <FadeIn>
              <span className="label-ui text-fg-3 block pt-1">
                Formulário
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.08}>
                <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-3 leading-snug">
                  Prefere escrever? Preencha abaixo.
                </h2>
                <p className="text-fg-2 font-light text-sm leading-relaxed mb-8">
                  Descreva o problema ou o projeto com o máximo de contexto que puder.
                </p>
              </FadeIn>
              <FadeIn delay={0.14}>
                <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="block label-ui text-fg-3">
                        Nome completo
                      </label>
                      <input
                        name="nome"
                        type="text"
                        required
                        placeholder="Seu nome"
                        className="w-full bg-sunken border border-fg/12 rounded-field px-4 py-3.5 text-sm font-normal text-fg placeholder-fg-3 outline-none focus:border-fg/40 transition-colors duration-200 ease-numera"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block label-ui text-fg-3">
                        Empresa
                      </label>
                      <input
                        name="empresa"
                        type="text"
                        placeholder="Nome da empresa"
                        className="w-full bg-sunken border border-fg/12 rounded-field px-4 py-3.5 text-sm font-normal text-fg placeholder-fg-3 outline-none focus:border-fg/40 transition-colors duration-200 ease-numera"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block label-ui text-fg-3">
                      Qual é o seu interesse?
                    </label>
                    <select
                      name="assunto"
                      defaultValue=""
                      className="w-full bg-sunken border border-fg/12 rounded-field px-4 py-3.5 text-sm font-normal text-fg outline-none focus:border-fg/40 transition-colors duration-200 ease-numera cursor-pointer"
                    >
                      <option value="" disabled className="bg-raised text-fg-3">Selecione uma opção</option>
                      <option value="Automação e Dashboard" className="bg-raised text-fg">Automação e Dashboard</option>
                      <option value="Treinamento Corporativo" className="bg-raised text-fg">Treinamento Corporativo em Dados</option>
                      <option value="Consultoria Estratégica" className="bg-raised text-fg">Consultoria e Planejamento Estratégico</option>
                      <option value="Ecossistema de Produtos" className="bg-raised text-fg">Ecossistema de Produtos Numera</option>
                      <option value="Outro" className="bg-raised text-fg">Outro assunto</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block label-ui text-fg-3">
                      Mensagem
                    </label>
                    <textarea
                      name="mensagem"
                      rows={5}
                      placeholder="Descreva o problema ou o que você precisa. Sem formalidade — pode ser direto."
                      className="w-full bg-sunken border border-fg/12 rounded-field px-4 py-3.5 text-sm font-normal text-fg placeholder-fg-3 outline-none focus:border-fg/40 transition-colors duration-200 ease-numera resize-y leading-relaxed"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-full bg-accent text-accent-on hover:bg-accent-hover px-7 py-3.5 text-sm font-medium transition-[background-color,transform] duration-200 ease-numera active:scale-[0.98] cursor-pointer"
                  >
                    Enviar mensagem
                  </button>
                </form>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 px-5 md:px-10 border-t border-fg/10 bg-canvas">
          <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
            <FadeIn>
              <span className="label-ui text-fg-3 block pt-1">
                Perguntas rápidas
              </span>
            </FadeIn>
            <div>
              <FadeIn delay={0.08}>
                <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-8 leading-snug">
                  O que acontece depois que eu entro em contato?
                </h2>
              </FadeIn>
              <div className="rounded-card border border-fg/10 bg-raised px-6 md:px-8">
                {FAQ.map((item, i) => (
                  <FAQItem
                    key={item.q}
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
