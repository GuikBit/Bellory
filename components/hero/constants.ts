export interface MockupConfig {
  position: "left" | "center" | "right"
  src: string
  alt: string
  rotate: number
}

export const MOCKUPS: MockupConfig[] = [
  {
    position: "left",
    src: "/mockup-white.png",
    alt: "Bellory app - agenda inteligente",
    rotate: -5,
  },
  {
    position: "center",
    src: "/mockup_white1.png",
    alt: "Bellory app - gestão completa",
    rotate: 0,
  },
  {
    position: "right",
    src: "/mockup-white.png",
    alt: "Bellory app - site personalizado",
    rotate: 5,
  },
]

export const HERO_COLORS = {
  background: "#faf8f6",
  titleGradient: "from-[#db6f57] via-[#8b3d35] to-[#db6f57]",
  ctaPrimary: "from-[#db6f57] to-[#c55a42]",
  ctaSecondary: {
    base: "bg-white text-[#8b3d35] border-2 border-[#8b3d35] hover:bg-[#8b3d35] hover:text-white",
  },
  blob1: "bg-gradient-to-br from-[#db6f57]/20 to-[#8b3d35]/20",
  blob2: "bg-gradient-to-tr from-[#4f6f64]/20 to-[#db6f57]/20",
} as const
