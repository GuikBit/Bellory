"use client"

import { AnimatePresence, motion } from "framer-motion"
import GradientText from "./GradientText"

interface AnimatedPriceProps {
  value: number
  prefix?: string
  gradient?: boolean
  className?: string
}

export function AnimatedPrice({ value, prefix = "R$", gradient = false, className = "" }: AnimatedPriceProps) {
  const styleClasses = gradient
    ? "text-4xl font-bold"
    : "line-through text-muted-foreground"

  return (
    <span className={`relative inline-flex overflow-hidden ${styleClasses} ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className={`inline-block`}
        >
          <GradientText
            colors={["#db6f57","#db6f57","#8b3d35"]}
            animationSpeed={8}
            showBorder={false}
            className={` !text-4xl !font-bold !rounded-none`}
          >
            {prefix} {value}
          </GradientText>          
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
