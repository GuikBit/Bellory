"use client"

import React, { createContext, useContext, useEffect, useRef } from "react"
import {
  BelloryTracker,
  createTracker,
  DEFAULT_TRACKING_CONFIG,
} from "@/service/API/tracking"
import type { TrackingConfig } from "@/service/API/tracking"

interface TrackingContextValue {
  tracker: BelloryTracker | null
}

const TrackingContext = createContext<TrackingContextValue>({ tracker: null })

interface TrackingProviderProps {
  children: React.ReactNode
  config?: Partial<TrackingConfig>
}

export function TrackingProvider({ children, config }: TrackingProviderProps) {
  const trackerRef = useRef<BelloryTracker | null>(null)

  useEffect(() => {
    const mergedConfig: TrackingConfig = {
      ...DEFAULT_TRACKING_CONFIG,
      ...config,
    }

    const tracker = createTracker(mergedConfig)
    tracker.init()
    trackerRef.current = tracker

    return () => {
      tracker.destroy()
      trackerRef.current = null
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TrackingContext.Provider value={{ tracker: trackerRef.current }}>
      {children}
    </TrackingContext.Provider>
  )
}

export function useTrackingContext(): TrackingContextValue {
  return useContext(TrackingContext)
}
