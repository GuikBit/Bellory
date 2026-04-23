"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { SectionTransition } from "@/components/section-transitions"
import { motion, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Award,
  Bot,
  Calendar,
  CheckCircle2,
  Globe,
  Heart,
  Scissors,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// ─── Data ───

const pilares = [
  {
    numeral: "I",
    icon: Calendar,
    tagline: "Gestão completa",
    titulo: "O dia a dia, sob controle",
    descricao:
      "Agenda, clientes, financeiro, comissões e estoque em uma única plataforma pensada para quem trabalha com beleza. Menos planilha, mais atendimento.",
    items: ["Agenda inteligente", "CRM de clientes", "Financeiro e comissões"],
  },
  {
    numeral: "II",
    icon: Globe,
    tagline: "Site personalizado",
    titulo: "Sua marca, online",
    descricao:
      "Um site próprio, com sua identidade, onde o cliente agenda direto. Configurável em minutos, pronto para vender 24 horas por dia.",
    items: ["Agendamento online", "Domínio próprio", "Identidade visual sua"],
  },
  {
    numeral: "III",
    icon: Bot,
    tagline: "Agente de IA no WhatsApp",
    titulo: "Atendimento que não dorme",
    descricao:
      "Um agente de IA que conversa no seu próprio WhatsApp, identifica o cliente, agenda, confirma e lembra — enquanto você atende na cadeira.",
    items: ["Resposta em menos de 5s", "Confirmações automáticas", "Menos no-shows"],
  },
]

const valores = [
  {
    icon: Heart,
    titulo: "Paixão pela beleza",
    descricao:
      "Acreditamos que cada profissional merece ferramentas à altura da arte que ele faz.",
  },
  {
    icon: Zap,
    titulo: "Inovação com propósito",
    descricao:
      "Tecnologia de ponta só faz sentido se simplificar a rotina de quem está na cadeira.",
  },
  {
    icon: Users,
    titulo: "Obsessão pelo cliente",
    descricao:
      "Seu sucesso é o nosso produto. Ouvimos, ajustamos e entregamos o que faz diferença.",
  },
  {
    icon: Shield,
    titulo: "Transparência radical",
    descricao:
      "Clareza em preços, em funcionalidades e no cuidado com seus dados — sempre.",
  },
]

const depoimentos = [
  {
    nome: "Mariana Costa",
    cargo: "Proprietária, Studio Mari Beauty",
    segmento: "Salão de beleza",
    icon: Sparkles,
    citacao:
      "Em dois meses, reduzi o retrabalho de agenda e ganhei uma noite por semana. O agente no WhatsApp virou minha recepcionista.",
    estrelas: 5,
  },
  {
    nome: "Rafael Almeida",
    cargo: "Sócio, Barbearia do Rafa",
    segmento: "Barbearia",
    icon: Scissors,
    citacao:
      "Meus clientes marcam sozinhos pelo WhatsApp, confirmam sozinhos e pagam antes. Eu só corto. É isso.",
    estrelas: 5,
  },
  {
    nome: "Dra. Camila Reis",
    cargo: "Diretora clínica, Reis Estética",
    segmento: "Clínica de estética",
    icon: Award,
    citacao:
      "A Bellory entende o negócio da beleza. Relatórios claros, agenda que funciona e uma equipe que escuta de verdade.",
    estrelas: 5,
  },
]

const diferenciais = [
  {
    icon: Sparkles,
    titulo: "Design pensado para a beleza",
    descricao:
      "Interface elegante, que reflete a sofisticação de quem vê o negócio como arte.",
  },
  {
    icon: TrendingUp,
    titulo: "Crescimento real",
    descricao:
      "Nossos clientes reportam até 40% mais agendamentos online nos primeiros 90 dias.",
  },
  {
    icon: Globe,
    titulo: "Em qualquer lugar",
    descricao:
      "Sistema 100% online: abra no celular, no tablet ou no computador da recepção.",
  },
  {
    icon: Award,
    titulo: "Suporte que entende você",
    descricao:
      "Uma equipe que já trabalhou em salão, barbearia e clínica — fala a sua língua.",
  },
]

const numeros = [
  { numero: "500+", label: "Estabelecimentos ativos" },
  { numero: "50k+", label: "Agendamentos por mês" },
  { numero: "+40%", label: "Mais reservas online" },
  { numero: "4.9/5", label: "Avaliação dos usuários" },
]

// ─── Reusable atoms ───

function SectionBadge({
  icon: Icon,
  children,
}: {
  icon: React.ElementType
  children: React.ReactNode
}) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#db6f57]/20 bg-[#db6f57]/[0.06] mb-6">
      <Icon className="w-3.5 h-3.5 text-[#db6f57]" />
      <span className="text-[11px] font-bold text-[#8b3d35] uppercase tracking-[0.14em]">
        {children}
      </span>
    </div>
  )
}

function GradientHeading({
  before,
  gradient,
  after,
  className = "",
}: {
  before?: string
  gradient: string
  after?: string
  className?: string
}) {
  return (
    <h2
      className={`font-serif font-bold tracking-tight text-[#2a2420] leading-[1.1] text-3xl sm:text-4xl lg:text-5xl ${className}`}
    >
      {before && <>{before} </>}
      <span className="bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-sobre">
        {gradient}
      </span>
      {after && <> {after}</>}
    </h2>
  )
}

// ─── Page ───

export default function Sobre() {
  const prefersReduced = useReducedMotion()

  return (
    <div className="min-h-screen bg-[#faf8f6] overflow-x-hidden">
      <Header isMenu={true} isCadastro={true}/>

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden pt-28 md:pt-40 lg:pt-44 pb-20 md:pb-28">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b3d35' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Blobs */}
        <motion.div
          className="absolute top-20 -right-24 w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-br from-[#db6f57]/20 to-[#8b3d35]/20"
          animate={prefersReduced ? {} : { scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* <motion.div
          className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full blur-3xl bg-gradient-to-tr from-[#4f6f64]/20 to-[#db6f57]/20"
          animate={prefersReduced ? {} : { scale: [1, 1.25, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        /> */}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="max-w-4xl mx-auto text-center"
          >
            <SectionBadge icon={Sparkles}>Sobre a Bellory</SectionBadge>

            <h1 className="font-serif font-bold tracking-tight leading-[1.05] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#2a2420]">
              A plataforma por trás
              <br />
              <span className="bg-gradient-to-r from-[#db6f57] via-[#8b3d35] to-[#db6f57] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-sobre">
                do seu império digital
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-8 text-lg sm:text-xl text-[#5a7d71] font-light leading-relaxed max-w-2xl mx-auto"
            >
              Nascemos para transformar a gestão de salões, barbearias e clínicas através
              de tecnologia{" "}
              <span className="text-[#8b3d35] font-medium">intuitiva, elegante e poderosa</span>
              {" "}— feita por quem entende do seu mercado.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
            >
              <Link href="/cadastro">
                <button
                  className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#db6f57] to-[#c55a42] shadow-lg hover:shadow-[0_0_30px_rgba(219,111,87,0.4)] hover:scale-[1.03] transition-all duration-300"
                >
                  Comece grátis por 14 dias
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </Link>
              <Link href="#pilares">
                <button className="inline-flex items-center justify-center px-7 py-3.5 rounded-xl font-semibold text-sm bg-white text-[#8b3d35] border-2 border-[#8b3d35] hover:bg-[#8b3d35] hover:text-white transition-all duration-300">
                  Conheça nossa história
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

     

      {/* ═══════════ COMO NASCEU ═══════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <SectionBadge icon={Heart}>Nossa história</SectionBadge>

              <GradientHeading before="Começamos" gradient="com uma inquietação" />

              <div className="mt-8 space-y-5 text-[#5a4a42] text-base sm:text-lg leading-relaxed">
                <p>
                  Olhando de perto o mercado da beleza, percebemos o mesmo padrão em todo
                  lugar: profissionais incríveis, presos a sistemas{" "}
                  <span className="text-[#8b3d35] font-medium">
                    engessados, caros e desenhados para outro tipo de negócio
                  </span>
                  .
                </p>
                <p>
                  Planilhas empilhadas, agendas rabiscadas, mensagens perdidas no WhatsApp.
                  E, no meio disso, gente talentosa tentando apenas cuidar bem do cliente
                  que acabou de sentar na cadeira.
                </p>
                <p>
                  A Bellory nasceu dessa inquietação: construir a ferramenta que nós
                  mesmos gostaríamos de usar — simples na rotina, elegante na experiência
                  e poderosa no que entrega de resultado.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-2">
                {["Feito no Brasil", "Para a beleza", "Com tecnologia de ponta"].map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[#db6f57]/[0.08] text-[#8b3d35] border border-[#db6f57]/15"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gradient-to-br from-[#db6f57]/15 via-[#8b3d35]/10 to-[#4f6f64]/15 rounded-[3rem] blur-3xl" />

              <motion.div
                animate={prefersReduced ? {} : { y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
                style={{ transform: "rotate(-4deg)" }}
              >
                <div className="relative rounded-[2.5rem] overflow-hidden">
                  <Image
                    src="/mockup_white1.webp"
                    alt="Bellory — plataforma de gestão"
                    width={560}
                    height={700}
                    className="w-full h-auto"
                    priority
                  />
                </div>

                {/* Floating chip 1 */}
                <motion.div
                  animate={prefersReduced ? {} : { y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  className="absolute -top-4 -left-4 md:-left-8 bg-white rounded-2xl shadow-lg border border-[#e6d9d4] px-4 py-3 flex items-center gap-3"
                  style={{ transform: "rotate(4deg)" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#db6f57]/70 to-[#c55a42] flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#5a4a42]/60 font-medium">Agendamentos</div>
                    <div className="text-sm font-bold text-[#2a2420]">+128 este mês</div>
                  </div>
                </motion.div>

                {/* Floating chip 2 */}
                <motion.div
                  animate={prefersReduced ? {} : { y: [0, 10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                  className="absolute -bottom-4 -right-2 md:-right-6 bg-white rounded-2xl shadow-lg border border-[#e6d9d4] px-4 py-3 flex items-center gap-3"
                  style={{ transform: "rotate(4deg)" }}
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4f6f64]/80 to-[#4f6f64] flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-[11px] text-[#5a4a42]/60 font-medium">Agente IA</div>
                    <div className="text-sm font-bold text-[#2a2420]">24/7 ativo</div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ 3 PILARES ═══════════ */}
      <section id="pilares" className="relative py-20 md:py-28 overflow-hidden">
        {/* subtle band */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f0e8e3]/40 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <SectionBadge icon={Sparkles}>Os três pilares</SectionBadge>
            <GradientHeading before="Tudo que seu negócio precisa," gradient="em um só lugar" />
            <p className="mt-6 text-lg text-[#5a7d71] font-light leading-relaxed">
              A Bellory é construída sobre três pilares que, juntos, transformam a gestão
              do dia a dia em algo elegante e previsível.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {pilares.map((pilar, i) => {
              const Icon = pilar.icon
              return (
                <motion.div
                  key={pilar.numeral}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="group relative bg-white rounded-3xl p-8 border border-[#e6d9d4] shadow-[0_10px_30px_-10px_rgba(42,36,32,0.08)] hover:shadow-[0_30px_60px_-20px_rgba(219,111,87,0.25)] transition-all duration-500 overflow-hidden"
                >
                  {/* Numeral watermark */}
                  <span
                    className="absolute -top-6 -right-2 font-serif text-[140px] leading-none font-bold bg-gradient-to-b from-[#db6f57]/10 to-transparent bg-clip-text text-transparent select-none pointer-events-none"
                    aria-hidden
                  >
                    {pilar.numeral}
                  </span>

                  {/* Icon tile */}
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-[#db6f57] to-[#8b3d35] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="relative">
                    <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#db6f57]">
                      {pilar.tagline}
                    </span>
                    <h3 className="mt-2 font-serif text-2xl font-bold text-[#2a2420] leading-tight">
                      {pilar.titulo}
                    </h3>
                    <p className="mt-4 text-[#5a4a42] leading-relaxed text-[15px]">
                      {pilar.descricao}
                    </p>

                    <ul className="mt-6 space-y-2.5 pt-6 border-t border-[#e6d9d4]">
                      {pilar.items.map((it) => (
                        <li key={it} className="flex items-center gap-2.5 text-sm text-[#4f6f64]">
                          <span className="w-4 h-4 rounded-full bg-[#db6f57]/12 flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-3 h-3 text-[#db6f57]" />
                          </span>
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* bottom sweep */}
                  <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#db6f57] to-[#8b3d35] transition-all duration-700" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ VALORES ═══════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl bg-gradient-to-bl from-[#db6f57]/10 to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <SectionBadge icon={Heart}>Nossos valores</SectionBadge>
            <GradientHeading before="Os princípios que" gradient="guiam cada decisão" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {valores.map((v, i) => {
              const Icon = v.icon
              return (
                <motion.div
                  key={v.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group bg-white rounded-2xl p-7 border border-[#e6d9d4] shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(219,111,87,0.25)] transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#db6f57]/10 border border-[#db6f57]/15 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#db6f57] group-hover:to-[#8b3d35] group-hover:border-transparent transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#db6f57] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#2a2420] mb-2.5 leading-snug">
                    {v.titulo}
                  </h3>
                  <p className="text-[#5a4a42] text-sm leading-relaxed">{v.descricao}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ DEPOIMENTOS ═══════════ */}
      <section className="relative py-20 md:py-28 bg-gradient-to-b from-[#faf8f6] to-[#f0e8e3] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <SectionBadge icon={Star}>Quem já usa</SectionBadge>
            <GradientHeading before="Histórias reais de" gradient="quem transformou a rotina" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {depoimentos.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.nome}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white rounded-3xl p-8 border border-[#e6d9d4] shadow-[0_10px_30px_-10px_rgba(42,36,32,0.08)] hover:shadow-[0_25px_50px_-15px_rgba(42,36,32,0.15)] transition-all duration-500 flex flex-col"
                >
                  {/* Quote mark */}
                  <span
                    className="absolute -top-3 left-6 font-serif text-7xl leading-none text-[#db6f57] select-none"
                    aria-hidden
                  >
                    &ldquo;
                  </span>

                  {/* Stars */}
                  <div className="flex gap-1 mb-5 mt-3">
                    {Array.from({ length: d.estrelas }).map((_, k) => (
                      <Star key={k} className="w-4 h-4 fill-[#db6f57] text-[#db6f57]" />
                    ))}
                  </div>

                  <p className="text-[#2a2420] text-base leading-relaxed font-serif italic flex-1">
                    {d.citacao}
                  </p>

                  <div className="mt-6 pt-6 border-t border-[#e6d9d4] flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#db6f57] to-[#8b3d35] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-[#2a2420] text-sm">{d.nome}</div>
                      <div className="text-xs text-[#5a4a42]/70">{d.cargo}</div>
                    </div>
                    <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-[#db6f57] bg-[#db6f57]/10 px-2.5 py-1 rounded-full whitespace-nowrap">
                      {d.segmento}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════ DIFERENCIAIS (DARK) ═══════════ */}
      <SectionTransition variant="waves" colorFrom="#f0e8e3" colorTo="#2a2420" accentColor="#db6f57" />
      
      <section className="relative py-20 md:py-28 text-white overflow-hidden bg-gradient-to-b from-[#2a2420] to-[#1a1510]">
        {/* Dot pattern */}
        {/* <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        /> */}

        {/* Accent blobs */}
        <motion.div
          className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full blur-3xl bg-gradient-to-br from-[#db6f57]/15 to-transparent"
          animate={prefersReduced ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 mb-6">
              <Award className="w-3.5 h-3.5 text-[#db6f57]" />
              <span className="text-[11px] font-bold text-[#e6d9d4] uppercase tracking-[0.14em]">
                O que nos diferencia
              </span>
            </div>
            <h2 className="font-serif font-bold tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
              Não somos mais um software.{" "}
              <span className="bg-gradient-to-r from-[#db6f57] via-[#e88c76] to-[#db6f57] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-sobre">
                Somos parceiros
              </span>
            </h2>
            <p className="mt-6 text-lg text-white/70 font-light leading-relaxed">
              Cada detalhe foi pensado para quem vive o dia a dia da cadeira, da recepção
              e do WhatsApp ao mesmo tempo.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {diferenciais.map((d, i) => {
              const Icon = d.icon
              return (
                <motion.div
                  key={d.titulo}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group relative rounded-2xl p-7 border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:bg-white/[0.06] hover:border-[#db6f57]/30 transition-all duration-500"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-5 group-hover:bg-gradient-to-br group-hover:from-[#db6f57] group-hover:to-[#8b3d35] transition-all duration-500">
                    <Icon className="w-6 h-6 text-[#db6f57] group-hover:text-white transition-colors duration-500" />
                  </div>
                  <h3 className="font-serif text-lg font-bold mb-2.5 leading-snug">
                    {d.titulo}
                  </h3>
                  <p className="text-white/65 text-sm leading-relaxed">{d.descricao}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <SectionTransition variant="waves" colorFrom="#1a1510" colorTo="#fff" accentColor="#db6f57" />

      {/* ═══════════ NÚMEROS ═══════════ */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <SectionBadge icon={TrendingUp}>A Bellory em números</SectionBadge>
            <GradientHeading before="Resultados que" gradient="falam por si" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {numeros.map((n, i) => (
              <motion.div
                key={n.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative text-center p-6 rounded-2xl border border-[#e6d9d4] bg-white shadow-[0_4px_18px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(219,111,87,0.2)] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="font-serif text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#db6f57] to-[#8b3d35] bg-clip-text text-transparent mb-2">
                  {n.numero}
                </div>
                <div className="text-sm text-[#5a4a42] font-medium">{n.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-5xl mx-auto rounded-[2rem] md:rounded-[2.5rem] overflow-hidden p-10 md:p-16 text-white"
            style={{
              background:
                "linear-gradient(135deg, #db6f57 0%, #c55a42 45%, #8b3d35 100%)",
            }}
          >
            {/* SVG dot overlay */}
            <div
              className="absolute inset-0 opacity-[0.12] pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            {/* decorative rings */}
            <div className="absolute -top-24 -left-24 w-80 h-80 border-2 border-white/15 rounded-full" />
            <div className="absolute -bottom-32 -right-24 w-[420px] h-[420px] border-2 border-white/10 rounded-full" />

            <div className="relative text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/20 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span className="text-[11px] font-bold uppercase tracking-[0.14em]">
                  14 dias grátis
                </span>
              </div>

              <h2 className="font-serif font-bold tracking-tight leading-[1.1] text-3xl sm:text-4xl lg:text-5xl">
                Pronto para transformar
                <br />
                <span className="italic">seu negócio em um império?</span>
              </h2>

              <p className="mt-6 text-base sm:text-lg text-white/85 leading-relaxed max-w-2xl mx-auto">
                Junte-se a centenas de profissionais da beleza que já escolheram a Bellory
                para cuidar da gestão enquanto cuidam dos seus clientes.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/cadastro">
                  <button className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-white text-[#8b3d35] shadow-2xl hover:scale-[1.03] transition-all duration-300">
                    Comece agora — é grátis
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </Link>
                <Link href="/#planos">
                  <button className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm bg-transparent text-white border-2 border-white/70 hover:bg-white hover:text-[#8b3d35] transition-all duration-300">
                    Ver planos e preços
                  </button>
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {["14 dias grátis", "Sem cartão de crédito", "Cancelamento fácil"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-sm text-white/90">
                    <CheckCircle2 className="w-4 h-4" />
                    <span className="font-medium">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionTransition variant="peaks" colorFrom="#fff" colorTo="#f0e8e3" accentColor="#db6f57" />

      <Footer />

      {/* Animation keyframes — scoped */}
      <style jsx global>{`
        @keyframes gradient-sobre {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-sobre {
          animation: gradient-sobre 8s ease infinite;
        }
      `}</style>
    </div>
  )
}
