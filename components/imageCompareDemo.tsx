"use client"

import { ImageCompare } from "./imageCompare"
import { motion } from "framer-motion"
import { Palette } from "lucide-react"

export function ImageCompareDemo() {
  return (
    <section className="overflow-visible my-10">      
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className=""
      >
        <div className="relative">
          {/* Image Compare Container */}
          <div className="w-full aspect-[16/9] mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <ImageCompare
              leftImage="/Dashboard_dark.png"
              rightImage="/dashboard_light.png"
              leftAlt="Tema Masculino Moderno"
              rightAlt="Tema Feminino Elegante"
              initialPosition={50}
            />
          </div>
          <div className="hidden md:block">
          {/* Theme Cards */}
            <div className="absolute -bottom-18 w-full flex justify-evenly items-center flex-wrap ">
              {/* Left Card - Masculino Moderno */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Palette className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tema</p>
                      <p className="text-lg font-semibold text-foreground">Masculino Moderno</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    <div className="w-6 h-6 rounded-full bg-neutral-900 border-2 border-background shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-orange-500 border-2 border-background shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-neutral-700 border-2 border-background shadow-sm" />
                  </div>
                </div>
              </motion.div>

              {/* Right Card - Feminino Elegante */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="group"
              >
                <div className="bg-card border border-border rounded-3xl px-8 py-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-2 ">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <Palette className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Tema</p>
                      <p className="text-lg font-semibold text-foreground">Feminino Elegante</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-2 mt-3">
                    <div className="w-6 h-6 rounded-full bg-white border-2 border-neutral-200 shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-purple-400 border-2 border-background shadow-sm" />
                    <div className="w-6 h-6 rounded-full bg-neutral-100 border-2 border-neutral-200 shadow-sm" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center md:mt-28 mt-8"
        >
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Personalize completamente a identidade visual do seu sistema. Escolha entre temas pré-definidos ou crie o
            seu próprio, adaptando cores, tipografia no estilo do seu negócio.
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
