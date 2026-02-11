"use client"

import { useCallback } from "react"
import { getTracker } from "@/service/API/tracking"
import type { ConversionEventType, ConversionEvent } from "@/service/API/tracking"

/**
 * Hook para rastrear eventos de conversao.
 * Conversoes disparam flush imediato para nao perder dados.
 */
export function useConversionTracker() {
  const trackConversion = useCallback(
    (type: ConversionEventType, metadata?: ConversionEvent["metadata"]) => {
      const tracker = getTracker()
      tracker?.trackConversion(type, metadata)
    },
    []
  )

  const trackCadastroStarted = useCallback(
    (planId?: string, planName?: string, billingCycle?: "monthly" | "annual") => {
      trackConversion("cadastro_started", { planId, planName, billingCycle })
    },
    [trackConversion]
  )

  const trackCadastroStep = useCallback(
    (step: number, stepName: string) => {
      trackConversion("cadastro_step_completed", {
        registrationStep: step,
        registrationStepName: stepName,
      })
    },
    [trackConversion]
  )

  const trackCadastroCompleted = useCallback(
    (planId?: string, planName?: string, billingCycle?: "monthly" | "annual") => {
      trackConversion("cadastro_completed", { planId, planName, billingCycle })
    },
    [trackConversion]
  )

  const trackCadastroAbandoned = useCallback(
    (step: number, stepName: string) => {
      trackConversion("cadastro_abandoned", {
        registrationStep: step,
        registrationStepName: stepName,
      })
    },
    [trackConversion]
  )

  const trackPlanViewed = useCallback(
    (planId: string, planName: string, billingCycle: "monthly" | "annual") => {
      trackConversion("plan_viewed", { planId, planName, billingCycle })
    },
    [trackConversion]
  )

  const trackPlanSelected = useCallback(
    (planId: string, planName: string, billingCycle: "monthly" | "annual") => {
      trackConversion("plan_selected", { planId, planName, billingCycle })
    },
    [trackConversion]
  )

  const trackContactFormSubmitted = useCallback(() => {
    trackConversion("contact_form_submitted")
  }, [trackConversion])

  return {
    trackConversion,
    trackCadastroStarted,
    trackCadastroStep,
    trackCadastroCompleted,
    trackCadastroAbandoned,
    trackPlanViewed,
    trackPlanSelected,
    trackContactFormSubmitted,
  }
}
