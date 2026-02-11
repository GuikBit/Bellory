"use client"

import React, { useEffect, useRef } from "react"
import { useInteractionTracker } from "@/hooks/tracking"

interface TrackSectionProps {
  children: React.ReactNode
  /** ID da secao para tracking */
  sectionId: string
  /** Label legivel */
  sectionLabel?: string
}

/**
 * Wrapper que rastreia quando uma secao se torna visivel no viewport.
 * Util para saber quais secoes o usuario realmente ve.
 */
export function TrackSection({ children, sectionId, sectionLabel }: TrackSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const tracked = useRef(false)
  const { trackInteraction } = useInteractionTracker()

  useEffect(() => {
    if (!ref.current || tracked.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !tracked.current) {
          tracked.current = true
          trackInteraction("click_button", `section-view-${sectionId}`, {
            elementLabel: sectionLabel || sectionId,
            section: sectionId,
            metadata: { action: "section_visible" },
          })
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(ref.current)

    return () => observer.disconnect()
  }, [sectionId, sectionLabel, trackInteraction])

  return <div ref={ref}>{children}</div>
}
