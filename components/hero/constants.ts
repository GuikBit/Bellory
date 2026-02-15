import {
  Calendar,
  Users,
  Bot,
  DollarSign,
  Globe,
  UserCheck,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface Feature {
  id: string
  icon: LucideIcon
  title: string
  subtitle: string
  color: string
  colorDark: string
  angle: number // degrees
}

export const FEATURES: Feature[] = [
  // ── Right side (top to bottom) ──
  {
    id: "agenda",
    icon: Calendar,
    title: "Agenda Inteligente",
    subtitle: "Automação de horários",
    color: "#db6f57",
    colorDark: "#E07A62",
    angle: -25, // right-top
  },
  {
    id: "ia",
    icon: Bot,
    title: "Agente IA",
    subtitle: "WhatsApp automatizado",
    color: "#4f6f64",
    colorDark: "#6B8F82",
    angle: 0, // right-center
  },
  {
    id: "presenca",
    icon: Globe,
    title: "Presença Digital",
    subtitle: "Site personalizado",
    color: "#8b3d35",
    colorDark: "#D4AF37",
    angle: 25, // right-bottom
  },
  // ── Left side (top to bottom) ──
  {
    id: "equipe",
    icon: Users,
    title: "Gestão Equipe",
    subtitle: "Colaboração eficiente",
    color: "#8b3d35",
    colorDark: "#D4AF37",
    angle: 155, // left-top
  },
  {
    id: "financeiro",
    icon: DollarSign,
    title: "Financeiro",
    subtitle: "Controle total",
    color: "#db6f57",
    colorDark: "#E07A62",
    angle: 180, // left-center
  },
  {
    id: "clientes",
    icon: UserCheck,
    title: "Gestão Clientes",
    subtitle: "CRM completo",
    color: "#4f6f64",
    colorDark: "#6B8F82",
    angle: 205, // left-bottom
  },
]

export const ANIMATION_PHASES = {
  loading: 0,
  nucleus: 100,
  scattered: 300,
  drawing: 800,
  settling: 1500,
  floating: 2500,
} as const

export type AnimationPhase = keyof typeof ANIMATION_PHASES

export const ORBIT_RADII = {
  lg: 450,
  xl: 520,
  "2xl": 580,
} as const

export const FLOATING_CONFIG = {
  y: { values: [0, -18, 0], duration: 4 },
  rotate: { values: [-2.5, 2.5, -2.5], duration: 5 },
} as const

export const CARD_SIZE = { width: 185, height: 85 } as const
