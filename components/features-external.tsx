"use client"

import { motion } from "framer-motion"
import { Palette, Layout, ShoppingBag, Smartphone } from "lucide-react"
import { Card } from "@/components/ui/card"

const externalFeatures = [
  {
    icon: Palette,
    title: "Personalização Total",
    description: "Customize cores, textos, imagens e elementos estéticos para refletir a identidade da sua marca.",
  },
  {
    icon: Layout,
    title: "Site Profissional",
    description: "Páginas prontas: Home, Sobre, Serviços e Galeria. Tudo responsivo e otimizado para SEO.",
  },
  {
    icon: ShoppingBag,
    title: "Mini E-commerce",
    description: "Venda produtos diretamente pelo seu site com integração de pagamento.",
  },
  {
    icon: Smartphone,
    title: "Agendamento Online",
    description: "Seus clientes podem agendar serviços 24/7 pelo site ou aplicativo.",
  },
]

export function FeaturesExternal() {
  return (
    <section id="personalizacao" className="py-24 sm:py-32 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-balance mb-6">
            Presença digital <span className="text-accent">personalizada</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Crie uma experiência única para seus clientes com um site totalmente personalizado
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {externalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300 bg-card border-border/50">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-balance">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-balance">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <Card className="p-8 bg-card border-border/50">
            <h3 className="font-serif text-2xl font-bold mb-4">Tema Masculino</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Design robusto e moderno, perfeito para barbearias e salões masculinos
            </p>
            <div className="rounded-lg overflow-hidden border border-border">
              <img src="/modern-masculine-barbershop-website-dark-theme.jpg" alt="Tema Masculino" className="w-full h-auto" />
            </div>
          </Card>

          <Card className="p-8 bg-card border-border/50">
            <h3 className="font-serif text-2xl font-bold mb-4">Tema Feminino</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Design elegante e sofisticado, ideal para salões de beleza e clínicas de estética
            </p>
            <div className="rounded-lg overflow-hidden border border-border">
              <img src="/elegant-feminine-beauty-salon-website-light-theme.jpg" alt="Tema Feminino" className="w-full h-auto" />
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
