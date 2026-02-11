"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { getTracker } from "@/service/API/tracking"

/**
 * Hook que rastreia automaticamente page views ao navegar entre paginas.
 * Deve ser usado uma unica vez no TrackingProvider ou layout raiz.
 */
export function usePageTracker() {
  const pathname = usePathname()
  const prevPathname = useRef<string | null>(null)

  useEffect(() => {
    const tracker = getTracker()
    if (!tracker) return

    // Evita duplicar o evento na mesma pagina
    if (prevPathname.current === pathname) return
    prevPathname.current = pathname

    const title = document.title
    tracker.trackPageView(pathname, title)
  }, [pathname])
}
