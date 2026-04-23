"use client"

import { motion, useReducedMotion } from "framer-motion"
import Image from "next/image"
import { MOCKUPS } from "./constants"

export function PhoneMockups({
  onHover,
  onLeave,
  centerPhoneRef,
}: {
  onHover?: () => void
  onLeave?: () => void
  centerPhoneRef?: (el: HTMLDivElement | null) => void
}) {
  const prefersReduced = useReducedMotion()

  const center = MOCKUPS.find((m) => m.position === "center")!
  const left = MOCKUPS.find((m) => m.position === "left")!
  const right = MOCKUPS.find((m) => m.position === "right")!

  return (
    <div
      className="relative w-full flex items-end justify-center gap-4 md:gap-6 lg:gap-8 -mb-20 mt-20 md:-mb-40 pointer-events-none"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Left phone — hidden on mobile */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0, rotate: left.rotate }}
        transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        className="relative z-10 flex-shrink-0 hidden md:block pointer-events-auto"
      >
        <div className="relative w-[140px] lg:w-[200px] xl:w-[240px] aspect-[9/19] rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl shadow-black/40 bg-transparent">
          <Image
            src={left.src}
            alt={left.alt}
            width={240}
            height={507}
            className="w-full h-full object-cover"
            sizes="(max-width: 1024px) 140px, (max-width: 1280px) 200px, 240px"
          />
        </div>
      </motion.div>

      {/* Center phone — always visible, largest and straight */}
      <motion.div
        ref={centerPhoneRef}
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
        className="relative z-30 flex-shrink-0 pointer-events-auto"
      >
        <div className="relative w-[200px] md:w-[220px] lg:w-[280px] xl:w-[320px] aspect-[9/19] rounded-[32px] lg:rounded-[44px] overflow-hidden shadow-2xl shadow-black/50 bg-transparent">
          <Image
            src={center.src}
            alt={center.alt}
            width={320}
            height={676}
            className="w-full h-full object-cover"
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 200px, (max-width: 1024px) 220px, (max-width: 1280px) 280px, 320px"
          />
        </div>
      </motion.div>

      {/* Right phone — hidden on mobile */}
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0, rotate: right.rotate }}
        transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        className="relative z-10 flex-shrink-0 hidden md:block pointer-events-auto"
      >
        <div className="relative w-[140px] lg:w-[200px] xl:w-[240px] aspect-[9/19] rounded-[28px] lg:rounded-[36px] overflow-hidden shadow-2xl shadow-black/40 bg-transparent">
          <Image
            src={right.src}
            alt={right.alt}
            width={240}
            height={507}
            className="w-full h-full object-cover"
            sizes="(max-width: 1024px) 140px, (max-width: 1280px) 200px, 240px"
          />
        </div>
      </motion.div>

      {/* Bottom gradient shadow for smooth transition to the next section */}
      <div
        aria-hidden
        className="absolute bottom-0 md:bottom-20 left-0 right-0 h-24 bg-gradient-to-t from-[#faf8f6] to-transparent z-40 pointer-events-none"
      />
    </div>
  )
}
