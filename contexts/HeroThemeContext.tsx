"use client"

import { createContext, useContext, ReactNode } from "react"
import { themes } from "@/utils/themes"

// Tipos
export type ThemeMode = "light"

export interface ThemeContextType {
  mode: ThemeMode
  theme: typeof themes.belloryElegante
  toggleTheme: () => void
  setMode: (mode: ThemeMode) => void
  isDark: boolean
}

// Contexto
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

// Provider - apenas modo claro
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = themes.belloryElegante

  const value: ThemeContextType = {
    mode: "light",
    theme,
    toggleTheme: () => {},
    setMode: () => {},
    isDark: false,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Hook para usar o tema
export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}

// Mantém compatibilidade com código existente
export const HeroThemeProvider = ThemeProvider
export const useHeroTheme = useTheme
export type HeroThemeContextType = ThemeContextType

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
