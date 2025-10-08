"use client"

import { motion } from "framer-motion"
import { TrendingUp, Clock, Heart, Zap } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const benefits = [
  {
    icon: TrendingUp,
    title: "Aumente seu faturamento",
    description: "Reduza faltas com lembretes automáticos e aumente a retenção de clientes",
  },
  {
    icon: Clock,
    title: "Economize tempo",
    description: "Automatize tarefas repetitivas e foque no que realmente importa",
  },
  {
    icon: Heart,
    title: "Fidelize clientes",
    description: "Programa de pontos e histórico personalizado para cada cliente",
  },
  {
    icon: Zap,
    title: "Decisões inteligentes",
    description: "Relatórios detalhados para tomar decisões baseadas em dados",
  },
]

const testimonials = [
  {
    name: "Mariana Silva",
    role: "Proprietária - Espaço Beleza",
    image: "/professional-woman-salon-owner.jpg",
    content:
      "O Bellory transformou completamente a gestão do meu salão. Agora tenho controle total sobre agendamentos e financeiro.",
  },
  {
    name: "Carlos Mendes",
    role: "Dono - Barbearia Moderna",
    image: "/professional-man-barbershop-owner.jpg",
    content:
      "Desde que implementamos o Bellory, reduzimos as faltas em 40% e aumentamos nossa receita significativamente.",
  },
  {
    name: "Ana Paula Costa",
    role: "Gestora - Clínica Estética Zen",
    image: "/professional-woman-clinic-manager.jpg",
    content: "A personalização do site nos ajudou a atrair mais clientes. O sistema é intuitivo e completo.",
  },
]

export function Benefits() {
  return (
    <section id="beneficios" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Por que escolher o <span className="text-accent">Bellory</span>?
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Mais do que um sistema, uma solução completa para o crescimento do seu negócio
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full text-center hover:shadow-lg transition-shadow duration-300 bg-card border-border/50">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-balance">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-balance">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4">O que nossos clientes dizem</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full bg-card border-border/50">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={testimonial.image || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-balance">"{testimonial.content}"</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
