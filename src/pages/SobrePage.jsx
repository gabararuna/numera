import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import PageNavbar from '../components/PageNavbar'
import Footer from '../components/Footer'
import CTASection from '../components/CTASection'

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

const STATS = [
  { number: '30+',  label: 'Projetos entregues' },
  { number: '15+',  label: 'Empresas atendidas' },
  { number: '200+', label: 'Profissionais treinados' },
  { number: '5',    label: 'Anos em dados e tech' },
]

const PILLARS = [
  {
    num: '01',
    title: 'Mapear antes de construir',
    desc: 'Antes de escrever uma linha de código, entendemos o processo, os dados disponíveis e o resultado esperado. Isso evita construir a solução certa para o problema errado — o erro mais caro em tecnologia.',
  },
  {
    num: '02',
    title: 'Construir para ser usado',
    desc: 'Sistemas complicados não são usados. Priorizamos interfaces claras, fluxos simples e documentação para que a equipe do cliente opere tudo de forma autônoma — sem precisar chamar ninguém para o dia a dia.',
  },
  {
    num: '03',
    title: 'Transferir o conhecimento',
    desc: 'Não entregamos caixas-pretas. Ao final de cada projeto, a equipe entende o que foi construído, como mantê-lo e como evoluí-lo. A Numera gera capacidade, não dependência.',
  },
]

function SectionRow({ label, children }) {
  return (
    <section className="py-20 md:py-24 px-6 md:px-12 border-t border-white/5 bg-black">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12 md:gap-20 items-start">
        <FadeIn>
          <span className="text-[10px] tracking-[0.18em] text-white/30 uppercase font-medium block pt-1">
            {label}
          </span>
        </FadeIn>
        <div>{children}</div>
      </div>
    </section>
  )
}

export default function SobrePage() {
  return (
    <div className="max-w-[1800px] mx-auto w-full relative">
      <PageNavbar />
      <main className="bg-black">

        {/* ── Hero ── */}
        <section className="relative px-6 md:px-12 pt-20 pb-24 overflow-hidden bg-black">
          {/* Top glow */}
          <div
            className="absolute inset-x-0 top-0 h-72 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(0,191,165,0.06) 0%, transparent 100%)' }}
          />
          <div className="max-w-6xl mx-auto relative z-10">
            <FadeIn>
              <span className="inline-block text-[10px] tracking-[0.18em] text-[#00BFA5] border border-[#00BFA5]/25 rounded-full px-3 py-1.5 mb-8 font-medium uppercase">
                Sobre nós
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-6 shimmer-text max-w-4xl">
                Tecnologia que resolve problemas reais.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl">
                Conheça a empresa por trás das soluções, a metodologia que guia cada projeto e os valores que definem como trabalhamos.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Quem somos ── */}
        <SectionRow label="Quem somos">
          <FadeIn delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-6 shimmer-text leading-snug">
              Uma empresa de tecnologia construída para a operação real.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/55 font-light leading-relaxed text-[0.9375rem] mb-4">
              A Numera é uma empresa de tecnologia fundada por profissionais de engenharia e ciência de dados com experiência nos setores industrial, logístico e de serviços. Nascemos da percepção de que a maioria das empresas brasileiras ainda opera com processos manuais, planilhas desconexas e decisões baseadas em intuição — quando a tecnologia para mudar isso já existe, está disponível e ao alcance de qualquer negócio disposto a usá-la com método.
            </p>
            <p className="text-white/55 font-light leading-relaxed text-[0.9375rem] mb-4">
              Nosso trabalho começa antes do código. Começa entendendo o problema real da operação: onde está o gargalo, quem sofre com ele todos os dias, qual dado já existe mas não está sendo aproveitado. A partir daí, construímos a solução mais eficiente para aquele contexto específico — seja um dashboard conectado aos dados reais, uma automação que elimina horas de consolidado manual, um sistema interno que substitui uma planilha crítica ou um programa de capacitação que torna a equipe autônoma em dados.
            </p>
            <p className="text-white/55 font-light leading-relaxed text-[0.9375rem]">
              Atendemos empresas em todo o Brasil, com foco em construção civil, engenharia, logística, varejo e serviços — setores onde dados e processos têm impacto direto no resultado operacional.
            </p>
          </FadeIn>
        </SectionRow>

        {/* ── Missão ── */}
        <SectionRow label="Nossa missão">
          <FadeIn delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-6 shimmer-text leading-snug">
              Ajudar empresas a tomar decisões melhores com tecnologia aplicada.
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-white/55 font-light leading-relaxed text-[0.9375rem] mb-4">
              Não acreditamos em soluções genéricas. Cada projeto é construído do zero para o problema real do cliente, com foco em entrega prática, transferência de conhecimento e resultado mensurável. Uma solução que a equipe não usa não é uma solução — por isso investimos tanto no processo de adoção e capacitação quanto na construção técnica.
            </p>
            <p className="text-white/55 font-light leading-relaxed text-[0.9375rem]">
              Valorizamos clareza sobre o escopo antes de iniciar qualquer trabalho, honestidade técnica sobre o que é e o que não é possível, e impacto real como única métrica de sucesso. Não vendemos projeto — entregamos resultado.
            </p>
          </FadeIn>
        </SectionRow>

        {/* ── Pilares ── */}
        <SectionRow label="Como trabalhamos">
          <FadeIn delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-10 shimmer-text leading-snug">
              Três pilares que guiam cada projeto, do diagnóstico à entrega.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-px bg-white/8 rounded-2xl overflow-hidden">
            {PILLARS.map((p, i) => (
              <FadeIn key={i} delay={0.1 * (i + 1)}>
                <div className="bg-black p-8 md:p-10 h-full">
                  <span className="text-[10px] tracking-[0.18em] text-white/20 uppercase font-medium block mb-5">
                    {p.num}
                  </span>
                  <h3 className="text-[0.9375rem] font-medium text-white mb-3 tracking-tight leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-white/45 font-light leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </SectionRow>

        {/* ── Stats ── */}
        <SectionRow label="Nossos números">
          <FadeIn delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-10 shimmer-text leading-snug">
              Resultado em escala, entrega por entrega.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
            {STATS.map((s, i) => (
              <FadeIn key={i} delay={0.08 * (i + 1)}>
                <div className="bg-black px-6 py-10 text-center">
                  <span className="text-4xl md:text-5xl font-light tracking-tight shimmer-text block mb-2">
                    {s.number}
                  </span>
                  <span className="text-[10px] tracking-[0.1em] text-white/35 uppercase">
                    {s.label}
                  </span>
                </div>
              </FadeIn>
            ))}
          </div>
        </SectionRow>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
