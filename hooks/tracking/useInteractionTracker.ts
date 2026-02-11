"use client"

import { useCallback } from "react"
import { getTracker } from "@/service/API/tracking"
import type { InteractionEventType } from "@/service/API/tracking"

/**
 * Hook que fornece funcoes para rastrear interacoes do usuario.
 * Uso:
 *   const { trackClick, trackFormStart, trackFormSubmit } = useInteractionTracker()
 *   <button onClick={() => trackClick('cta-hero', 'Comece gratis', 'hero')}>
 */
export function useInteractionTracker() {
  const trackClick = useCallback(
    (
      elementId: string,
      elementLabel?: string,
      section?: string,
      metadata?: Record<string, string | number | boolean>
    ) => {
      const tracker = getTracker()
      tracker?.trackInteraction("click_cta", elementId, {
        elementLabel,
        section,
        metadata,
      })
    },
    []
  )

  const trackButtonClick = useCallback(
    (elementId: string, elementLabel?: string, section?: string) => {
      const tracker = getTracker()
      tracker?.trackInteraction("click_button", elementId, {
        elementLabel,
        section,
      })
    },
    []
  )

  const trackPlanClick = useCallback(
    (planId: string, planName: string, billingCycle: "monthly" | "annual") => {
      const tracker = getTracker()
      tracker?.trackInteraction("click_plan", `plan-${planId}`, {
        elementLabel: planName,
        section: "pricing",
        metadata: { planId, planName, billingCycle },
      })
    },
    []
  )

  const trackFormStart = useCallback(
    (formId: string, section?: string) => {
      const tracker = getTracker()
      tracker?.trackInteraction("form_start", formId, { section })
    },
    []
  )

  const trackFormSubmit = useCallback(
    (formId: string, section?: string) => {
      const tracker = getTracker()
      tracker?.trackInteraction("form_submit", formId, { section })
    },
    []
  )

  const trackFormAbandon = useCallback(
    (formId: string, section?: string, metadata?: Record<string, string | number | boolean>) => {
      const tracker = getTracker()
      tracker?.trackInteraction("form_abandon", formId, { section, metadata })
    },
    []
  )

  const trackInteraction = useCallback(
    (
      type: InteractionEventType,
      elementId: string,
      options?: {
        elementLabel?: string
        section?: string
        metadata?: Record<string, string | number | boolean>
      }
    ) => {
      const tracker = getTracker()
      tracker?.trackInteraction(type, elementId, options)
    },
    []
  )

  return {
    trackClick,
    trackButtonClick,
    trackPlanClick,
    trackFormStart,
    trackFormSubmit,
    trackFormAbandon,
    trackInteraction,
  }
}
