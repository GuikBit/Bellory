"use client"

import { useEffect, useRef, useCallback } from "react"
import { getTracker } from "@/service/API/tracking"

/**
 * Hook que rastreia scroll depth (25%, 50%, 75%, 90%, 100%).
 * Detecta a secao visivel atual baseada nos IDs das sections.
 */
export function useScrollTracker() {
  const tickingRef = useRef(false)

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return
    tickingRef.current = true

    requestAnimationFrame(() => {
      const tracker = getTracker()
      if (!tracker) {
        tickingRef.current = false
        return
      }

      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0

      // Detecta secao visivel
      const sections = document.querySelectorAll("section[id]")
      let visibleSection: string | undefined

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        if (rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2) {
          visibleSection = section.id
        }
      })

      tracker.trackScrollDepth(scrollPercent, visibleSection)
      tickingRef.current = false
    })
  }, [])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])
}
