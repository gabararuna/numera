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

const SERVICES = [
  {
    num: '01',
    label: 'Processos',
    title: 'Automação e Otimização de Processos',
    intro:
      'Se sua equipe passa horas copiando dados entre planilhas, consolidando relatórios manualmente ou esperando alguém preparar um painel antes de tomar uma decisão, você está perdendo tempo que o seu negócio não pode desperdiçar.',
    body: [
      'A Numera mapeia o que trava a sua operação e constrói a solução mais eficiente para o seu contexto. Isso pode incluir dashboards conectados diretamente aos seus dados que atualizam automaticamente — eliminando o consolidado manual semanal ou mensal. Ou automações que executam tarefas repetitivas sem intervenção humana: envio de alertas, extração de relatórios, cruzamento de bases e atualização de sistemas.',
      'Construímos sistemas internos sob medida para controle de operações, estoque, contratos ou qualquer processo que hoje vive em planilhas desconexas e e-mails. Integramos ferramentas que a sua equipe já usa mas que não se comunicam, eliminando redigitação e erros de transcrição.',
      'Cada projeto começa com um diagnóstico do processo atual. Mapeamos onde o esforço manual se concentra, onde existe dado que não está sendo aproveitado e qual é o caminho mais curto entre o problema e a solução. Construímos exatamente o que é necessário — sem overengineering, sem funcionalidades que nunca vão ser usadas.',
    ],
    bullets: [
      'Dashboards conectados a dados reais, atualizados automaticamente',
      'Automações de alertas, relatórios e cruzamentos de bases',
      'Sistemas internos que substituem planilhas críticas',
      'Integrações entre ferramentas sem retrabalho de redigitação',
    ],
  },
  {
    num: '02',
    label: 'Treinamentos',
    title: 'Treinamentos Corporativos em Dados',
    intro:
      'Ter bons dados e bons sistemas não é suficiente se a equipe não sabe como usá-los — ou se toda a análise depende de uma única pessoa. Treinamentos corporativos são a ponte entre a tecnologia disponível e o uso efetivo no dia a dia.',
    body: [
      'A Numera oferece capacitação prática e totalmente personalizada para o contexto da empresa. Todos os treinamentos utilizam os dados reais da organização como estudo de caso. O participante aprende resolvendo o problema que enfrenta na prática — não exercícios genéricos de um dataset fictício.',
      'O resultado é aprendizado que cola: as pessoas saem do treinamento sabendo exatamente como aplicar o que aprenderam no trabalho de amanhã. Equipes que antes dependiam de terceiros para extrair uma simples consulta passam a resolver problemas de forma autônoma, entregando análises em horas em vez de dias.',
    ],
    bullets: [
      'SQL — de consultas básicas a relatórios analíticos com o seu banco de dados',
      'Python — automação e manipulação de dados para não-desenvolvedores',
      'Business Intelligence — Power BI e Looker Studio do básico ao avançado',
      'Google Sheets + Apps Script — automação sem infraestrutura complexa',
    ],
  },
  {
    num: '03',
    label: 'Consultoria',
    title: 'Consultoria e Planejamento Estratégico em Dados',
    intro:
      'Muitas empresas têm dados — mas estão espalhados em sistemas diferentes, são inconsistentes entre fontes ou nunca foram estruturados para suportar decisão estratégica. O resultado é gestão por intuição mesmo quando o dado certo existe em algum lugar.',
    body: [
      'A Numera realiza um diagnóstico completo do ambiente analítico da empresa: onde os dados são produzidos, como fluem entre sistemas, quais indicadores existem, o que está faltando e o que é contraditório. A partir daí, organizamos a arquitetura de indicadores e definimos os KPIs que fazem sentido para o negócio — não os que estão na moda, mas os que refletem o que realmente importa para a operação.',
      'Estruturamos relatórios e painéis que a gestão consegue ler, interpretar e usar para decidir — não apenas para apresentar em reuniões. Acompanhamos a implementação das mudanças para garantir que o diagnóstico se traduza em resultado concreto, não em um documento esquecido na gaveta.',
    ],
    bullets: [
      'Diagnóstico completo do ambiente analítico e das fontes de dados',
      'Arquitetura de KPIs que refletem o que importa para a operação',
      'Relatórios e painéis que a gestão realmente consegue usar',
      'Acompanhamento da implementação até o resultado concreto',
    ],
  },
]

const PROCESS = [
  {
    num: '01',
    title: 'Diagnóstico',
    desc: 'Reunião de mapeamento, levantamento dos dados disponíveis, entendimento do processo atual e identificação clara do problema real. Sem diagnóstico, não há projeto.',
  },
  {
    num: '02',
    title: 'Projeto',
    desc: 'Definição do escopo exato, entregáveis, prazo e métricas de sucesso — documentado e aprovado antes de qualquer linha de código. O que vai ser entregue fica claro desde o início.',
  },
  {
    num: '03',
    title: 'Entrega',
    desc: 'Construção iterativa com validações periódicas com a equipe. Ajustes de rota acontecem durante — não depois — da entrega. O resultado final não é surpresa.',
  },
  {
    num: '04',
    title: 'Transferência',
    desc: 'Treinamento da equipe, documentação completa e entrega formal. O cliente sai sabendo usar, manter e evoluir tudo que foi construído — sem depender da Numera no dia a dia.',
  },
]

const TECHS = [
  'Python', 'SQL', 'PostgreSQL', 'Supabase', 'Firebase',
  'React', 'Google Sheets', 'Apps Script', 'Power BI', 'Looker Studio',
  'Cloudflare', 'REST APIs',
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

export default function SolucoesPage() {
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
                Soluções
              </span>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-[1.05] mb-6 shimmer-text max-w-4xl">
                O que a Numera constrói para você.
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-white/50 font-light leading-relaxed max-w-2xl">
                Três frentes de trabalho, um único objetivo: operação mais eficiente.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Serviços ── */}
        {SERVICES.map((svc, si) => (
          <SectionRow key={si} label={`Frente ${svc.num} — ${svc.label}`}>
            <FadeIn delay={0.1}>
              <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-6 shimmer-text leading-snug">
                {svc.title}
              </h2>
              <p className="text-white/55 font-light leading-relaxed text-[0.9375rem] mb-5 italic">
                {svc.intro}
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              {svc.body.map((para, pi) => (
                <p key={pi} className="text-white/55 font-light leading-relaxed text-[0.9375rem] mb-4">
                  {para}
                </p>
              ))}
              <ul className="mt-6 space-y-2">
                {svc.bullets.map((b, bi) => (
                  <li
                    key={bi}
                    className="flex items-start gap-3 text-sm text-white/50 font-light leading-relaxed"
                  >
                    <span className="text-[#00BFA5] mt-0.5 shrink-0 font-normal">—</span>
                    {b}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </SectionRow>
        ))}

        {/* ── Processo ── */}
        <SectionRow label="Como funciona na prática">
          <FadeIn delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-10 shimmer-text leading-snug">
              O processo em quatro etapas.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden">
            {PROCESS.map((step, i) => (
              <FadeIn key={i} delay={0.1 * (i + 1)}>
                <div className="bg-black p-8 h-full">
                  <span className="text-[10px] tracking-[0.18em] text-white/20 uppercase font-medium block mb-4">
                    Etapa {step.num}
                  </span>
                  <h3 className="text-[0.9375rem] font-medium text-white mb-3 tracking-tight">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/45 font-light leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </SectionRow>

        {/* ── Tecnologias ── */}
        <SectionRow label="Tecnologias">
          <FadeIn delay={0.1}>
            <h2 className="text-2xl md:text-3xl font-light text-white tracking-tight mb-4 shimmer-text leading-snug">
              Ferramentas certas para cada problema.
            </h2>
            <p className="text-white/50 font-light leading-relaxed text-[0.9375rem] mb-8">
              Trabalhamos com as ferramentas certas para cada problema — não com as mais sofisticadas disponíveis no mercado. Simplicidade e manutenibilidade são critérios tão importantes quanto performance.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-wrap gap-2">
              {TECHS.map((tech) => (
                <span
                  key={tech}
                  className="border border-white/10 rounded-full px-4 py-1.5 text-xs text-white/45 tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </FadeIn>
        </SectionRow>

        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
