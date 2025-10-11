"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "primereact/button"

const screenshots = [
  {
    title: "Dashboard Principal",
    description: "Visão geral completa do seu negócio em tempo real",
    image: "/salon-management-dashboard-with-charts-and-metrics.jpg",
  },
  {
    title: "Agenda de Atendimentos",
    description: "Gerencie todos os agendamentos de forma visual e intuitiva",
    image: "/appointment-calendar-interface-for-salon.jpg",
  },
  {
    title: "Cadastro de Clientes",
    description: "Histórico completo e preferências de cada cliente",
    image: "/customer-profile-management-interface.jpg",
  },
  {
    title: "Relatórios Financeiros",
    description: "Análises detalhadas de receitas, despesas e lucros",
    image: "/financial-reports-dashboard-with-graphs.jpg",
  },
]

export function DemoSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % screenshots.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length)
  }

  return (
    <section id="demonstracao" className="py-24 sm:py-32">
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
            Veja o Bellory <span className="text-accent">em ação</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground text-balance leading-relaxed">
            Interface intuitiva e moderna, desenvolvida para facilitar o seu dia a dia
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card">
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              src={screenshots[currentIndex].image}
              alt={screenshots[currentIndex].title}
              className="w-full h-auto"
            />
          </div>

          <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
            <Button onClick={prev}  className="pointer-events-auto shadow-lg">
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button onClick={next} className="pointer-events-auto shadow-lg">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="mt-8 text-center">
            <h3 className="text-2xl font-semibold mb-2">{screenshots[currentIndex].title}</h3>
            <p className="text-muted-foreground">{screenshots[currentIndex].description}</p>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {screenshots.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-accent w-8" : "bg-border"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
