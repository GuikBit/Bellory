"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { themes } from "@/utils/themes"

// Tipos
export type ThemeMode = "light" | "dark"

export interface HeroThemeContextType {
  mode: ThemeMode
  theme: typeof themes.belloryDarkElegante | typeof themes.belloryElegante
  toggleTheme: () => void
  setMode: (mode: ThemeMode) => void
  isDark: boolean
}

// Contexto
const HeroThemeContext = createContext<HeroThemeContextType | undefined>(undefined)

// Provider
export function HeroThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>("light")

  const theme = mode === "dark" ? themes.belloryDarkElegante : themes.belloryElegante

  const toggleTheme = useCallback(() => {
    setModeState((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
  }, [])

  const value: HeroThemeContextType = {
    mode,
    theme,
    toggleTheme,
    setMode,
    isDark: mode === "dark",
  }

  return (
    <HeroThemeContext.Provider value={value}>
      {children}
    </HeroThemeContext.Provider>
  )
}

// Hook para usar o tema
export function useHeroTheme() {
  const context = useContext(HeroThemeContext)
  if (context === undefined) {
    throw new Error("useHeroTheme must be used within a HeroThemeProvider")
  }
  return context
}

// Cores do tema claro (para referência no código)
export const lightThemeColors = {
  // Backgrounds
  background: "#faf8f6",
  backgroundSecondary: "#e6d9d4",

  // Primary coral
  primary: "#db6f57",
  primaryDark: "#c55a42",

  // Secondary brown
  secondary: "#8b3d35",

  // Accent sage green
  accent: "#4f6f64",

  // Text
  text: "#2a2420",
  textSecondary: "#4f6f64",

  // Cards/borders
  cardBackground: "#ffffff",
  border: "#d8ccc4",

  // Pattern color
  patternColor: "#8b3d35",
}

// Cores do tema escuro (para referência no código)
export const darkThemeColors = {
  // Backgrounds
  background: "#0D0B0A",
  backgroundSecondary: "#141210",
  backgroundTertiary: "#1A1715",
  backgroundElevated: "#201D1A",

  // Primary coral (mais vibrante)
  primary: "#E07A62",
  primaryHover: "#E8937E",
  primaryDark: "#DB6F57",

  // Secondary
  secondary: "#A8524A",

  // Accent sage (mais claro)
  accent: "#6B8F82",

  // Luxo
  gold: "#D4AF37",
  goldLight: "#E6C65A",
  bronze: "#CD7F32",
  champagne: "#F7E7CE",

  // Text
  text: "#F5F0EB",
  textSecondary: "#B8AEA4",
  textMuted: "#7A716A",

  // Cards/borders
  cardBackground: "#1A1715",
  cardBackgroundHover: "#242120",
  cardBorder: "#2D2925",
  cardBorderHover: "#3D3630",

  // Borders
  border: "#2D2925",
  borderLight: "#3D3630",

  // Pattern color
  patternColor: "#E07A6220",

  // Gradients
  gradientBlob1From: "rgba(224, 122, 98, 0.15)",
  gradientBlob1To: "rgba(168, 82, 74, 0.15)",
  gradientBlob2From: "rgba(107, 143, 130, 0.15)",
  gradientBlob2To: "rgba(224, 122, 98, 0.1)",
}
