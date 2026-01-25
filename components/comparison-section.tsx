"use client"

import { motion, useInView } from "framer-motion"
import {
  Check,
  X,
  Zap,
  TrendingUp,
  Award,
  Target
} from "lucide-react"
import { useRef } from "react"
import { useTheme } from "@/contexts/HeroThemeContext"
import { themeConfig } from "@/utils/themes"

// Comparação de features
const comparisonTable = {
  categories: [
    {
      name: "Gestão de Agendamentos",
      features: [
        {
          name: "Agendamento online 24/7",
          bellory: true,
          competitors: "Parcial",
          traditional: false
        },
        {
          name: "Agente virtual no WhatsApp",
          bellory: true,
          competitors: false,
          traditional: false
        },
        {
          name: "Lembretes automáticos",
          bellory: true,
          competitors: true,
          traditional: false
        },
        {
          name: "Confirmação em 1 clique",
          bellory: true,
          competitors: "Parcial",
          traditional: false
        }
      ]
    },
    {
      name: "Presença Digital",
      features: [
        {
          name: "Site personalizado incluído",
          bellory: true,
          competitors: false,
          traditional: false
        },
        {
          name: "E-commerce integrado",
          bellory: true,
          competitors: false,
          traditional: false
        },
        {
          name: "SEO otimizado",
          bellory: true,
          competitors: "Parcial",
          traditional: false
        },
        {
          name: "Domínio personalizado",
          bellory: true,
          competitors: "Extra",
          traditional: false
        }
      ]
    },
    {
      name: "Gestão Financeira",
      features: [
        {
          name: "Controle de caixa em tempo real",
          bellory: true,
          competitors: true,
          traditional: false
        },
        {
          name: "Cálculo automático de comissões",
          bellory: true,
          competitors: "Parcial",
          traditional: false
        },
        {
          name: "Relatórios fiscais",
          bellory: true,
          competitors: true,
          traditional: false
        },
        {
          name: "Integração bancária",
          bellory: true,
          competitors: "Extra",
          traditional: false
        }
      ]
    },
    {
      name: "Suporte e Implementação",
      features: [
        {
          name: "Implementação em 1 dia",
          bellory: true,
          competitors: "3-5 dias",
          traditional: "N/A"
        },
        {
          name: "Treinamento incluído",
          bellory: true,
          competitors: "Extra",
          traditional: "N/A"
        },
        {
          name: "Suporte via WhatsApp",
          bellory: true,
          competitors: "Apenas email",
          traditional: "N/A"
        },
        {
          name: "Sem taxa de configuração",
          bellory: true,
          competitors: false,
          traditional: "N/A"
        }
      ]
    }
  ]
}

// Comparação de resultados
const results = [
  {
    metric: "Redução de faltas",
    bellory: "40%",
    competitors: "20-25%",
    traditional: "0%",
    color: "#db6f57"
  },
  {
    metric: "Tempo economizado/semana",
    bellory: "10h",
    competitors: "4-6h",
    traditional: "0h",
    color: "#4f6f64"
  },
  {
    metric: "Aumento de faturamento",
    bellory: "35%",
    competitors: "15-20%",
    traditional: "0%",
    color: "#8b3d35"
  },
  {
    metric: "Tempo de implementação",
    bellory: "1 dia",
    competitors: "3-5 dias",
    traditional: "N/A",
    color: "#db6f57"
  }
]

export function ComparisonSection() {
  const { isDark } = useTheme()
  const theme = isDark ? themeConfig.dark : themeConfig.light
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  const renderCell = (value: any) => {
    if (value === true) {
      return <Check className="w-6 h-6 text-[#5a7a6e] mx-auto" />
    }
    if (value === false) {
      return <X className="w-6 h-6 text-gray-300 mx-auto" />
    }
    if (value === "Parcial") {
      return <span className="text-sm text-[#e8a055]">Parcial</span>
    }
    if (value === "Extra") {
      return <span className="text-sm text-[#d15847]">Pago à parte</span>
    }
    return <span className="text-sm text-[#4f6f64]">{value}</span>
  }

  return (
    <section
      ref={sectionRef}
      className={`py-32 relative overflow-hidden ${theme.sectionBgAlt}`}
    >
      {/* Background decorativo */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='${encodeURIComponent(theme.patternColor)}' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          opacity: parseFloat(theme.patternOpacity),
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
          <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${theme.badge} border mb-8`}>
            <Target className={`w-5 h-5 ${theme.badgeIcon}`} />
            <span className={`font-bold ${theme.badgeText} uppercase tracking-wide text-sm`}>
              Por Que Escolher o Bellory
            </span>
          </div>

          <h2 className={`font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 ${theme.headlineColor} leading-[1.1]`}>
            Compare e{" "}
            <span className={`${theme.gradientText} bg-clip-text text-transparent`}>
              veja a diferença
            </span>
          </h2>

          <p className={`text-xl sm:text-2xl ${theme.subheadlineColor} leading-relaxed`}>
            Veja como o Bellory se compara com métodos tradicionais e outros sistemas do mercado
          </p>
        </motion.div>

        {/* Comparação de Resultados */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <h3 className={`text-center text-3xl font-bold ${theme.headlineColor} mb-12`}>
            Resultados reais dos nossos clientes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {results.map((result, index) => (
              <motion.div
                key={result.metric}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className={`${theme.cardBg} ${theme.cardBgHover} rounded-3xl p-8 shadow-xl border-2`}
                style={{ borderColor: result.color + '30' }}
              >
                <div className="text-center">
                  <div 
                    className="text-5xl font-bold mb-3"
                    style={{ color: result.color }}
                  >
                    {result.bellory}
                  </div>
                  <div className={`${theme.textPrimary} font-semibold mb-4`}>
                    {result.metric}
                  </div>
                  <div className={`text-sm ${theme.textSecondary} space-y-1`}>
                    <div className="flex justify-between">
                      <span>Concorrentes:</span>
                      <span className="font-medium">{result.competitors}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tradicional:</span>
                      <span className="font-medium">{result.traditional}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Tabela de Comparação */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-6xl mx-auto overflow-x-auto"
        >
          <div className={`${theme.cardBg} rounded-3xl shadow-2xl overflow-hidden border ${theme.cardBorder}`}>
            {/* Header da tabela */}
            <div className="grid grid-cols-4 bg-gradient-to-r from-[#4f6f64] to-[#3d574f] text-white p-6">
              <div className="font-bold text-lg">Funcionalidade</div>
              <div className="font-bold text-lg text-center">
                <div className="flex items-center justify-center gap-2">
                  <Award className="w-6 h-6" />
                  Bellory
                </div>
              </div>
              <div className="font-bold text-lg text-center">Concorrentes</div>
              <div className="font-bold text-lg text-center">Tradicional</div>
            </div>

            {/* Categorias e features */}
            {comparisonTable.categories.map((category, catIndex) => (
              <div key={category.name}>
                {/* Nome da categoria */}
                <div className={`${theme.sectionBg} px-6 py-4 font-bold ${theme.textPrimary} text-lg border-t ${theme.border}`}>
                  {category.name}
                </div>
                
                {/* Features da categoria */}
                {category.features.map((feature, featIndex) => (
                  <motion.div
                    key={feature.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + catIndex * 0.2 + featIndex * 0.1 }}
                    className={`grid grid-cols-4 p-6 border-t ${theme.border} ${theme.cardBgHover} transition-colors`}
                  >
                    <div className={theme.textSecondary}>{feature.name}</div>
                    <div className="text-center font-semibold">
                      {renderCell(feature.bellory)}
                    </div>
                    <div className="text-center">
                      {renderCell(feature.competitors)}
                    </div>
                    <div className="text-center">
                      {renderCell(feature.traditional)}
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Conclusão */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-br from-[#4f6f64] to-[#3d574f] rounded-3xl p-12 text-white shadow-2xl">
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">
              A escolha é clara
            </h3>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              O Bellory oferece mais funcionalidades, melhores resultados e o melhor custo-benefício do mercado. 
              Tudo integrado em uma única plataforma.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Mais completo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Mais resultados</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Melhor preço</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5" />
                <span>Mais fácil de usar</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}