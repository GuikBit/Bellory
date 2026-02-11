"use client"

import { usePageTracker, useScrollTracker } from "@/hooks/tracking"

/**
 * Componente que ativa todos os trackers automaticos.
 * Deve ser renderizado uma unica vez dentro do TrackingProvider.
 */
export function TrackingSetup() {
  usePageTracker()
  useScrollTracker()

  return null
}
