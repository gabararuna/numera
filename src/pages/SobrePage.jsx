import PageNavbar from '../components/PageNavbar'
import Footer from '../components/Footer'
import CTASection from '../components/CTASection'
import { StatusDot } from '../components/BrandMarks'

function FadeIn({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

const STATS = [
  { number: '30+', label: 'Projetos entregues' },
  { number: '15+', label: 'Empresas atendidas' },
  { number: '200+', label: 'Profissionais treinados' },
  { number: '5', label: 'Anos em dados e tech' },
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
    <section className="py-16 md:py-24 px-5 md:px-10 border-t border-fg/10 bg-canvas">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
        <FadeIn>
          <span className="label-ui text-fg-3 block pt-1">
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
    <div className="min-h-screen flex flex-col bg-canvas text-fg relative">
      <PageNavbar />
      <main className="flex-1 bg-canvas">
        {/* Hero */}
        <section className="relative px-5 md:px-10 pt-16 pb-20 bg-canvas">
          <div className="max-w-6xl mx-auto">
            <FadeIn>
              <div className="inline-flex items-center rounded-full glass-1 px-3.5 py-1.5 mb-7">
                <StatusDot tone="positive" label="Sobre nós" className="label-ui" />
              </div>
            </FadeIn>
            <FadeIn delay={0.08}>
              <h1 className="text-4xl md:text-6xl font-medium tracking-[-0.03em] leading-[1.06] mb-6 text-fg max-w-4xl">
                Tecnologia que resolve problemas reais.
              </h1>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="text-base md:text-lg text-fg-2 font-light leading-relaxed max-w-2xl">
                Conheça a empresa por trás das soluções, a metodologia que guia cada projeto e os valores que definem como trabalhamos.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Quem somos */}
        <SectionRow label="Quem somos">
          <FadeIn delay={0.08}>
            <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-6 leading-snug">
              Uma empresa de tecnologia construída para a operação real.
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-fg-2 font-light leading-relaxed text-[0.95rem] mb-4 max-w-3xl">
              A Numera é uma empresa de tecnologia fundada por profissionais de engenharia e ciência de dados com experiência nos setores industrial, logístico e de serviços. Nascemos da percepção de que a maioria das empresas brasileiras ainda opera com processos manuais, planilhas desconexas e decisões baseadas em intuição — quando a tecnologia para mudar isso já existe, está disponível e ao alcance de qualquer negócio disposto a usá-la com método.
            </p>
            <p className="text-fg-2 font-light leading-relaxed text-[0.95rem] mb-4 max-w-3xl">
              Nosso trabalho começa antes do código. Começa entendendo o problema real da operação: onde está o gargalo, quem sofre com ele todos os dias, qual dado já existe mas não está sendo aproveitado. A partir daí, construímos a solução mais eficiente para aquele contexto específico — seja um dashboard conectado aos dados reais, uma automação que elimina horas de consolidado manual, um sistema interno que substitui uma planilha crítica ou um programa de capacitação que torna a equipe autônoma em dados.
            </p>
            <p className="text-fg-2 font-light leading-relaxed text-[0.95rem] max-w-3xl">
              Atendemos empresas em todo o Brasil, com foco em construção civil, engenharia, logística, varejo e serviços — setores onde dados e processos têm impacto direto no resultado operacional.
            </p>
          </FadeIn>
        </SectionRow>

        {/* Missão */}
        <SectionRow label="Nossa missão">
          <FadeIn delay={0.08}>
            <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-6 leading-snug">
              Ajudar empresas a tomar decisões melhores com tecnologia aplicada.
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="text-fg-2 font-light leading-relaxed text-[0.95rem] mb-4 max-w-3xl">
              Não acreditamos em soluções genéricas. Cada projeto é construído do zero para o problema real do cliente, com foco em entrega prática, transferência de conhecimento e resultado mensurável. Uma solução que a equipe não usa não é uma solução — por isso investimos tanto no processo de adoção e capacitação quanto na construção técnica.
            </p>
            <p className="text-fg-2 font-light leading-relaxed text-[0.95rem] max-w-3xl">
              Valorizamos clareza sobre o escopo antes de iniciar qualquer trabalho, honestidade técnica sobre o que é e o que não é possível, e impacto real como única métrica de sucesso. Não vendemos projeto — entregamos resultado.
            </p>
          </FadeIn>
        </SectionRow>

        {/* Pilares */}
        <SectionRow label="Como trabalhamos">
          <FadeIn delay={0.08}>
            <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-10 leading-snug">
              Três pilares que guiam cada projeto, do diagnóstico à entrega.
            </h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-4">
            {PILLARS.map((p, i) => (
              <FadeIn key={p.num} delay={0.08 * (i + 1)}>
                <div className="rounded-card border border-fg/10 bg-raised p-7 md:p-8 h-full">
                  <span className="num text-xs font-medium text-fg-3 block mb-4">
                    {p.num}
                  </span>
                  <h3 className="text-base font-medium text-fg mb-3 tracking-[-0.01em] leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-sm text-fg-2 font-light leading-relaxed">{p.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </SectionRow>

        {/* Stats */}
        <SectionRow label="Nossos números">
          <FadeIn delay={0.08}>
            <h2 className="text-2xl md:text-3xl font-medium text-fg tracking-[-0.02em] mb-10 leading-snug">
              Resultado em escala, entrega por entrega.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <FadeIn key={s.label} delay={0.06 * (i + 1)}>
                <div className="rounded-card border border-fg/10 bg-raised px-5 py-8 text-center">
                  <span className="num text-4xl md:text-5xl font-light tracking-[-0.03em] text-fg block mb-2">
                    {s.number}
                  </span>
                  <span className="label-ui text-fg-3 block">
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
