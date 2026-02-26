"use client"

import { motion, useInView } from "framer-motion"
import {
  Palette,
  ShoppingBag,
  Smartphone,
  Globe,
  Search,
  Zap,
  Heart,
  ArrowRight,
  Check,
  Moon,
  Sun
} from "lucide-react"
import { Card } from "primereact/card"
import { useRef, useState } from "react"
import { Button } from "primereact/button"
import { Theme, themes } from "@/utils/themes"

const features = [
  {
    icon: Globe,
    title: "Site Profissional Completo",
    description: "Landing page linda e responsiva com sua identidade visual. Páginas Home, Sobre, Serviços e Galeria prontas.",
    benefits: [
      "Design moderno e profissional",
      "100% responsivo (mobile-first)",
      "Carregamento ultra-rápido",
      "Fácil de personalizar"
    ],
    color: "#db6f57",
    gradient: "from-[#db6f57] to-[#c55a42]"
  },
  {
    icon: Palette,
    title: "Personalização Total da Marca",
    description: "Customize cores, fontes, logos e elementos visuais para refletir perfeitamente a identidade do seu negócio.",
    benefits: [
      "Escolha entre temas prontos",
      "Ou crie do zero",
      "Preview em tempo real",
      "Sem código necessário"
    ],
    color: "#8b3d35",
    gradient: "from-[#8b3d35] to-[#a8524a]"
  },
  {
    icon: ShoppingBag,
    title: "Mini E-commerce Integrado",
    description: "Venda produtos diretamente pelo seu site com pagamento seguro e gestão de estoque automática.",
    benefits: [
      "Catálogo de produtos ilimitado",
      "Pagamento integrado",
      "Controle de estoque automático",
      "Entrega ou retirada no local"
    ],
    color: "#4f6f64",
    gradient: "from-[#4f6f64] to-[#3d574f]"
  },
  {
    icon: Smartphone,
    title: "Agendamento Online 24/7",
    description: "Seus clientes agendam quando quiserem, escolhendo serviço, profissional e horário em poucos cliques.",
    benefits: [
      "Interface intuitiva",
      "Escolha de profissional",
      "Confirmação instantânea",
      "Integrado ao WhatsApp"
    ],
    color: "#db6f57",
    gradient: "from-[#db6f57] to-[#e88c76]"
  },
  {
    icon: Search,
    title: "SEO Otimizado",
    description: "Seu site aparece no Google quando clientes buscarem pelos seus serviços na região.",
    benefits: [
      "Otimização automática para Google",
      "Meta tags configuráveis",
      "URLs amigáveis",
      "Sitemap automático"
    ],
    color: "#8b3d35",
    gradient: "from-[#8b3d35] to-[#6b2f2a]"
  },
  {
    icon: Zap,
    title: "Performance e Velocidade",
    description: "Site super rápido com tecnologia moderna. Carrega em menos de 2 segundos em qualquer dispositivo.",
    benefits: [
      "Imagens otimizadas automaticamente",
      "CDN global incluído",
      "Cache inteligente",
      "100% uptime garantido"
    ],
    color: "#4f6f64",
    gradient: "from-[#4f6f64] to-[#6b8a7e]"
  }
]

// Elementos de demonstração de tema
// const themeExamples = [
//   {
//     name: "Elegância Bellory",
//     colors: ["#e6d9d4", "#db6f57", "#8b3d35"],
//     style: "Suave e sofisticado"
//   },
//   {
//     name: "Feminino Elegante",
//     colors: ["#FAF7FA", "#B08D9A", "#4B4453"],
//     style: "Calmo e orgânico"
//   },
//   {
//     name: "Dark Bellory",
//     colors: ["#0A0A0A", "#FE9A00", "#FFB900"],
//     style: "Calmo e orgânico"
//   },
//   {
//     name: "Masculino Clássico",
//     colors: ["#F5EFE6", "#6B4F4F", "#423838"],
//     style: "Forte e confiável"
//   },  
// ]

export function FeaturesExternal() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const themeArray = Object.values(themes) as Theme[];
  const [showDetails, setShowDetails] = useState(false);
  

  return (
    <section
      ref={sectionRef}
      id="personalizacao"
      className="py-32 relative overflow-hidden bg-[#2a2420]"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#3d2e28]/60 border border-[#db6f57]/30 mb-8">
            <Heart className="w-5 h-5 text-[#db6f57]" />
            <span className="font-bold text-[#db6f57] uppercase tracking-wide text-sm">
              Presença Digital Profissional
            </span>
          </div>

          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
            Seu negócio{" "}
            <span className="bg-gradient-to-r from-[#db6f57] to-[#e88c76] bg-clip-text text-transparent">
              com presença digital única
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-[#d8ccc4] leading-relaxed">
            Site personalizado + e-commerce + agendamento online.{" "}
            <span className="text-[#db6f57] font-semibold">
              Tudo integrado ao seu sistema de gestão
            </span>.
          </p>
        </motion.div>

        {/* Exemplos de temas */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className="text-center text-2xl font-bold text-white mb-8">
            Escolha o tema perfeito para sua marca
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {themeArray.map((themeSystem, index) => (
              <motion.div
                key={themeSystem.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-[#3d2e28] hover:bg-[#463530] rounded-2xl p-6 shadow-lg border border-[#3d2e28] hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                onMouseEnter={() => setShowDetails(true)}
                onMouseLeave={() => setShowDetails(false)}
              >
              
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-lg text-white">{themeSystem.name}</h4>
                  {themeSystem.isDark ? (
                    <Moon className="w-5 h-5 text-[#4f6f64]" />
                  ) : (
                    <Sun className="w-5 h-5 text-[#db6f57]" />
                  )}
                </div>
                <div className="flex gap-2 mb-4">
                  <div className="flex items-center justify-center gap-2">
                    {[
                      { color: themeSystem.colors.primary, label: 'Primária' },
                      { color: themeSystem.colors.secondary, label: 'Secundária' },
                      { color: themeSystem.colors.accent, label: 'Destaque' },
                      { color: themeSystem.colors.background, label: 'Fundo' }
                    ].map((item, idx) => (
                      <div key={idx} className="relative group">
                        <motion.div
                          whileHover={{ scale: 1.2 }}
                          className="w-8 h-8 rounded-full shadow-md  transition-all"
                          style={{ backgroundColor: item.color }}
                        />
                        {showDetails && (
                          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-white text-[#2a2420] text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            {item.label}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-[#5a4a42] overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#d8ccc4]">Fonte Título: <span className="font-bold">{themeSystem.fonts?.heading}</span></span>
                    <span className="font-semibold text-white" style={{ fontFamily: themeSystem.fonts?.heading }}>
                      Aa
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-2">
                    <span className="text-[#d8ccc4]">Fonte Corpo: <span className="font-bold">{themeSystem.fonts?.body}</span></span>
                    <span className="font-semibold text-white" style={{ fontFamily: themeSystem.fonts?.body }}>
                      Aa
                    </span>
                  </div>
                </motion.div>
                
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Grid de features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
            >
              <Card className="group relative p-8 h-full bg-[#3d2e28] hover:bg-[#463530] border border-[#3d2e28] hover:border-[#5a4a42] rounded-2xl transition-all duration-300 hover:shadow-xl hover:-translate-y-2 overflow-hidden">
                {/* Decoração de fundo */}
                <div 
                  className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-full blur-3xl"
                  style={{ backgroundColor: feature.color }}
                />
                
                {/* Ícone */}
                <div 
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-110"
                  style={{ 
                    background: `linear-gradient(135deg, ${feature.color}15, ${feature.color}30)`,
                    border: `2px solid ${feature.color}40`
                  }}
                >
                  <feature.icon 
                    className="w-8 h-8 transition-transform duration-300 group-hover:rotate-3" 
                    style={{ color: feature.color }} 
                  />
                </div>

                {/* Conteúdo */}
                <h3 className="text-2xl font-bold mb-6 text-white group-hover:text-[#db6f57] transition-colors">
                  {feature.title}
                </h3>
                <p className="leading-relaxed mb-6 text-[#d8ccc4]">
                  {feature.description}
                </p>

                {/* Lista de benefícios */}
                <ul className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#d8ccc4]">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: feature.color }} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Linha decorativa no hover */}
                <div 
                  className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                  style={{ backgroundColor: feature.color }}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA com preview de site */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#8b3d35] via-[#db6f57] to-[#8b3d35] rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            {/* Padrão decorativo */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            <div className="relative z-10 text-center">
              <Globe className="w-16 h-16 text-white mx-auto mb-6" />
              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Conquiste clientes online com um site profissional
              </h3>
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Tenha um site completo, personalizado e integrado ao seu sistema de gestão. Tudo pronto para você começar a vender online hoje.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  label="Ver exemplo de site"
                  icon={<ArrowRight className="mr-2" size={16} />}
                  iconPos="right"
                  className="bg-white text-[#8b3d35] border-0 hover:scale-105 transition-all duration-300 px-10 py-4 rounded-xl font-bold shadow-2xl"
                />
                <Button
                  label="Personalizar meu site"
                  className="bg-transparent text-white border-2 border-white hover:bg-white hover:text-[#8b3d35] transition-all duration-300 px-10 py-4 rounded-xl font-bold"
                  outlined
                />
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}