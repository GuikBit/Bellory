"use client"

import { useEffect, useState } from "react"
import { usePageTracker, useScrollTracker } from "@/hooks/tracking"

/**
 * Os hooks vão num filho que só monta depois do browser estar idle.
 * Isso tira o boot do tracking do caminho crítico do LCP/TBT.
 */
function TrackingHooks() {
  usePageTracker()
  useScrollTracker()
  return null
}

/**
 * Componente que ativa todos os trackers automaticos.
 * Deve ser renderizado uma unica vez dentro do TrackingProvider.
 */
export function TrackingSetup() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (handle: number) => void
    }

    let idleHandle: number | undefined
    let timeoutHandle: number | undefined

    if (typeof w.requestIdleCallback === "function") {
      idleHandle = w.requestIdleCallback(() => setReady(true), { timeout: 2500 })
    } else {
      timeoutHandle = window.setTimeout(() => setReady(true), 1500)
    }

    return () => {
      if (idleHandle !== undefined && typeof w.cancelIdleCallback === "function") {
        w.cancelIdleCallback(idleHandle)
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle)
      }
    }
  }, [])

  return ready ? <TrackingHooks /> : null
}
