"use client"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart, Users, Target, Sparkles, Award, TrendingUp, Globe, Zap, Shield, Smile, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "primereact/button"
import { useRef } from "react"

export default function Sobre() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  const valores = [
    {
      icon: Heart,
      titulo: "Paixão pela Beleza",
      descricao: "Acreditamos que cada profissional da beleza merece ferramentas que reflitam a arte do seu trabalho."
    },
    {
      icon: Zap,
      titulo: "Inovação Constante",
      descricao: "Investimos em tecnologia de ponta e IA para simplificar o dia a dia dos salões e clínicas."
    },
    {
      icon: Users,
      titulo: "Foco no Cliente",
      descricao: "Nossa missão é fazer você e seus clientes felizes, criando experiências memoráveis."
    },
    {
      icon: Shield,
      titulo: "Transparência",
      descricao: "Clareza total em preços, funcionalidades e compromisso com seus dados e privacidade."
    }
  ]

  const timeline = [
    {
      ano: "2022",
      titulo: "O Início",
      descricao: "Nascemos da frustração de profissionais da beleza com sistemas complicados e caros."
    },
    {
      ano: "2023",
      titulo: "Primeiro Marco",
      descricao: "500+ estabelecimentos usando a Bellory, transformando agendamentos em experiências."
    },
    {
      ano: "2024",
      titulo: "Expansão",
      descricao: "Lançamento do Agente de IA e integração completa com WhatsApp e redes sociais."
    },
    {
      ano: "2025",
      titulo: "O Futuro",
      descricao: "Expandindo para toda América Latina, com novos recursos e parcerias estratégicas."
    }
  ]

  const diferenciais = [
    {
      icon: Sparkles,
      titulo: "Design Pensado para Beleza",
      descricao: "Interface elegante que reflete a sofisticação do seu negócio."
    },
    {
      icon: TrendingUp,
      titulo: "Crescimento Real",
      descricao: "Nossos clientes reportam 40% de aumento em agendamentos online."
    },
    {
      icon: Globe,
      titulo: "Acessível de Qualquer Lugar",
      descricao: "Sistema 100% online, acesse de qualquer dispositivo, a qualquer hora."
    },
    {
      icon: Award,
      titulo: "Suporte Excepcional",
      descricao: "Equipe dedicada que entende do seu segmento e está pronta para ajudar."
    }
  ]

  const equipe = [
    {
      nome: "Nossa Visão",
      cargo: "Para o Mercado da Beleza",
      descricao: "Queremos ser a plataforma #1 em gestão para profissionais da beleza na América Latina, democratizando tecnologia de ponta para negócios de todos os tamanhos."
    },
    {
      nome: "Nossa Missão",
      cargo: "Dia a Dia",
      descricao: "Simplificar a rotina de salões, clínicas e profissionais autônomos, permitindo que foquem no que fazem de melhor: transformar pessoas através da beleza."
    },
    {
      nome: "Nosso Propósito",
      cargo: "Por Que Existimos",
      descricao: "Acreditamos que tecnologia deve ser uma aliada, não um obstáculo. Criamos a Bellory para que você tenha mais tempo com seus clientes e menos tempo com planilhas."
    }
  ]

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-b from-[#faf8f6] to-white">
      <Header />
      {/* Hero Section com Parallax */}
      <motion.section 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background decorativo */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#db6f57]/20 to-[#e6d9d4]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#4f6f64]/20 to-[#db6f57]/20 rounded-full blur-3xl" />
          
          {/* Padrão de pontos decorativos */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: 'radial-gradient(circle, #6b2f2a 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white shadow-lg mb-8 border border-[#e6d9d4]"
            >
              <Sparkles className="w-5 h-5 text-[#db6f57]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#db6f57] to-[#6b2f2a] bg-clip-text text-transparent">
                A plataforma que revoluciona a gestão da beleza
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-[#6b2f2a] via-[#db6f57] to-[#6b2f2a] bg-clip-text text-transparent">
                Somos a Bellory
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-[#4f6f64] mb-8 leading-relaxed max-w-3xl mx-auto font-light">
              Nascemos para transformar a gestão de salões, clínicas e profissionais da beleza 
              através de tecnologia intuitiva, elegante e poderosa.
            </p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/cadastro">
                <Button
                  label="Começar gratuitamente"
                  icon={<ArrowRight className="ml-2" size={18} />}
                  iconPos="right"
                  className="bg-gradient-to-r from-[#db6f57] to-[#c55a42] text-white border-0 px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                />
              </Link>
              <Link href="#valores">
                <Button
                  label="Conheça nossos valores"
                  className="bg-white text-[#6b2f2a] border-2 border-[#e6d9d4] px-8 py-4 rounded-xl font-semibold hover:border-[#db6f57] hover:text-[#db6f57] transition-all duration-300"
                  outlined
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-[#db6f57] flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#db6f57] rounded-full"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Nossa História */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#6b2f2a] to-[#db6f57] bg-clip-text text-transparent">
              Nossa História
            </h2>
            <p className="text-lg text-[#4f6f64] leading-relaxed">
              Tudo começou quando percebemos que os melhores profissionais da beleza 
              estavam presos a sistemas complexos, caros e que não entendiam as necessidades 
              reais do dia a dia. Decidimos mudar isso.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-5xl mx-auto">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex items-center gap-8 mb-16 last:mb-0"
              >
                {/* Linha conectora */}
                {index < timeline.length - 1 && (
                  <div className="absolute left-[60px] top-24 w-0.5 h-full bg-gradient-to-b from-[#db6f57] to-transparent" />
                )}

                {/* Ano */}
                <div className="flex-shrink-0 w-32">
                  <div className="text-right pr-8">
                    <span className="text-4xl font-bold bg-gradient-to-r from-[#db6f57] to-[#6b2f2a] bg-clip-text text-transparent">
                      {item.ano}
                    </span>
                  </div>
                </div>

                {/* Círculo */}
                <div className="flex-shrink-0 w-4 h-4 rounded-full bg-gradient-to-br from-[#db6f57] to-[#6b2f2a] shadow-lg relative z-10" />

                {/* Conteúdo */}
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg border border-[#e6d9d4] hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-2xl font-bold text-[#2a2420] mb-3">{item.titulo}</h3>
                  <p className="text-[#4f6f64] leading-relaxed">{item.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section id="valores" className="py-24 bg-gradient-to-br from-[#faf8f6] to-[#e6d9d4]/30 relative overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#db6f57]/10 to-transparent rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#6b2f2a] to-[#db6f57] bg-clip-text text-transparent">
              Nossos Valores
            </h2>
            <p className="text-lg text-[#4f6f64] max-w-2xl mx-auto">
              Princípios que guiam cada decisão e cada linha de código que escrevemos
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => {
              const Icon = valor.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-8 shadow-lg border border-[#e6d9d4] hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#db6f57] to-[#6b2f2a] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2a2420] mb-3">{valor.titulo}</h3>
                  <p className="text-[#4f6f64] leading-relaxed">{valor.descricao}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Visão, Missão e Propósito */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#6b2f2a] to-[#db6f57] bg-clip-text text-transparent">
              Nosso DNA
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {equipe.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#db6f57] to-[#6b2f2a] rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
                <div className="relative bg-white rounded-3xl p-10 shadow-xl border border-[#e6d9d4] h-full hover:shadow-2xl transition-all duration-300">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-[#2a2420] mb-2">{item.nome}</h3>
                    <p className="text-sm font-semibold text-[#db6f57] uppercase tracking-wider">{item.cargo}</p>
                  </div>
                  <p className="text-[#4f6f64] leading-relaxed text-lg">{item.descricao}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 bg-gradient-to-br from-[#2a2420] to-[#6b2f2a] text-white relative overflow-hidden">
        {/* Padrão decorativo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Por Que a Bellory é Diferente?
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Não somos apenas mais um software. Somos parceiros no crescimento do seu negócio.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="text-center group"
                >
                  <div className="w-20 h-20 mx-auto rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                    <Icon className="w-10 h-10 text-[#db6f57]" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.titulo}</h3>
                  <p className="text-white/70 leading-relaxed">{item.descricao}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Números */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-[#6b2f2a] to-[#db6f57] bg-clip-text text-transparent">
              A Bellory em Números
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { numero: "500+", label: "Estabelecimentos Ativos" },
              { numero: "50k+", label: "Agendamentos por Mês" },
              { numero: "40%", label: "Aumento em Reservas" },
              { numero: "4.9/5", label: "Avaliação dos Usuários" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-[#db6f57] to-[#6b2f2a] bg-clip-text text-transparent mb-3">
                  {stat.numero}
                </div>
                <div className="text-lg text-[#4f6f64] font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-r from-[#db6f57] via-[#c55a42] to-[#db6f57] relative overflow-hidden">
        {/* Elementos decorativos */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 border-2 border-white rounded-full" />
          <div className="absolute bottom-10 right-10 w-96 h-96 border-2 border-white rounded-full" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <Smile className="w-16 h-16 mx-auto mb-8 text-white" />
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Pronto para Transformar Seu Negócio?
            </h2>
            <p className="text-xl text-white/90 mb-10 leading-relaxed">
              Junte-se a centenas de profissionais que já escolheram a Bellory 
              e estão revolucionando a gestão de seus estabelecimentos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/cadastro">
                <Button
                  label="Começar agora - É grátis"
                  icon={<ArrowRight className="ml-2" size={18} />}
                  iconPos="right"
                  className="bg-white text-[#db6f57] border-0 px-8 py-4 rounded-xl font-bold shadow-2xl hover:scale-105 transition-all duration-300 text-lg"
                />
              </Link>
              <Link href="/#planos">
                <Button
                  label="Ver planos e preços"
                  className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#db6f57] transition-all duration-300"
                  outlined
                />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
              {[
                "14 dias grátis",
                "Sem cartão de crédito",
                "Cancelamento fácil"
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-white/90">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Voltar ao início */}
      {/* <section className="py-12 bg-white border-t border-[#e6d9d4]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-[#4f6f64] hover:text-[#db6f57] font-medium transition-colors duration-300 group">
            <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Voltar para a página inicial
          </Link>
        </div>
      </section> */}

      <Footer/>
    </div>
  )
}