"use client"

import { motion } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "primereact/button"
import { ImageCompareDemo } from "./imageCompareDemo"
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-40">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 via-background to-background" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="max-w-7xl mx-auto text-center" >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8"
            style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-foreground">Transforme a gestão do seu negócio</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-balance mb-8"
            style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
          >
            Gestão completa para seu <span className="text-accent">salão de beleza</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl lg:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto mb-12 leading-relaxed"
            style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
          >
            O Bellory é a plataforma completa para barbearias, salões de beleza e clínicas de estética. Gerencie
            agendamentos, clientes, funcionários e financeiro em um só lugar.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              label="Teste Gratuitamente"
              icon={<ArrowRight className="ml-2 w-5 h-5" />}
              iconPos="right"
              className="bg-accent text-accent-foreground border-0 hover:bg-accent/90 text-base px-8 h-14 rounded-lg"
              style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
              onClick={()=> <Link href="/cadastro"/>}
            />
            <Link href="/cadastro">Cadastro </Link>
            <Button
              label="Conheça o Bellory"
              className="bg-white text-foreground border border-border hover:bg-neutral-100 text-base px-8 h-14 rounded-lg"
              outlined
              style={{filter: 'drop-shadow(2px 2px 2px #11111140)'}}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 h-auto"
          >
            <ImageCompareDemo />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
