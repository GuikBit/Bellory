"use client"

import React, { useCallback } from "react"
import { useInteractionTracker } from "@/hooks/tracking"
import type { InteractionEventType } from "@/service/API/tracking"

interface TrackClickProps {
  children: React.ReactElement<{ onClick?: (...args: any[]) => void }>
  /** Tipo do evento */
  eventType?: InteractionEventType
  /** ID unico do elemento (ex: "cta-hero-comece-gratis") */
  elementId: string
  /** Label legivel (ex: "Comece gratis") */
  label?: string
  /** Secao onde o elemento esta */
  section?: string
  /** Dados extras */
  metadata?: Record<string, string | number | boolean>
}

/**
 * Wrapper que adiciona tracking de clique a qualquer elemento filho.
 * Nao altera o comportamento original do onClick.
 *
 * Uso:
 *   <TrackClick elementId="cta-hero" label="Comece gratis" section="hero">
 *     <Button>Comece gratis</Button>
 *   </TrackClick>
 */
export function TrackClick({
  children,
  eventType = "click_cta",
  elementId,
  label,
  section,
  metadata,
}: TrackClickProps) {
  const { trackInteraction } = useInteractionTracker()

  const handleClick = useCallback(
    (...args: any[]) => {
      trackInteraction(eventType, elementId, {
        elementLabel: label,
        section,
        metadata,
      })

      // Chama o onClick original se existir
      if (children.props.onClick) {
        children.props.onClick(...args)
      }
    },
    [eventType, elementId, label, section, metadata, trackInteraction, children.props]
  )

  return React.cloneElement(children, { onClick: handleClick })
}
