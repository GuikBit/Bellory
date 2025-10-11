"use client"

import { motion } from "framer-motion"
import { Calendar, Users, Briefcase, Scissors, DollarSign, BarChart3 } from "lucide-react"
import { Card } from "primereact/card"


const features = [
  {
    icon: Calendar,
    title: "Agendamentos Inteligentes",
    description: "Sistema completo de agendamento online com confirmações automáticas e lembretes por WhatsApp.",
  },
  {
    icon: Users,
    title: "Gestão de Clientes",
    description: "Cadastro completo com histórico de atendimentos, preferências e programa de fidelidade.",
  },
  {
    icon: Briefcase,
    title: "Controle de Funcionários",
    description: "Gerencie horários, comissões, desempenho e produtividade da sua equipe.",
  },
  {
    icon: Scissors,
    title: "Catálogo de Serviços",
    description: "Organize todos os seus serviços com preços, duração e profissionais responsáveis.",
  },
  {
    icon: DollarSign,
    title: "Financeiro Completo",
    description: "Controle de caixa, contas a pagar e receber, relatórios financeiros detalhados.",
  },
  {
    icon: BarChart3,
    title: "Relatórios e Análises",
    description: "Dashboards intuitivos com métricas de desempenho e insights para seu negócio.",
  },
]

export function FeaturesInternal() {
  return (
    <section id="funcionalidades" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
          style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Funcionalidades que <span className="text-accent">transformam</span> seu negócio
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Tudo que você precisa para gerenciar seu salão com eficiência e profissionalismo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-card border-border/50 rounded-xl">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 shadow" >
                  <feature.icon className="w-7 h-7 text-accent" style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}/>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-balance">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-balance">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
