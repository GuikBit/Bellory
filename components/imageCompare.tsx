"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { StaticImageData } from "next/image"

interface ImageCompareProps {
  leftImage: string | StaticImageData
  rightImage: string | StaticImageData
  leftAlt?: string
  rightAlt?: string
  className?: string
  initialPosition?: number
}

export function ImageCompare({
  leftImage,
  rightImage,
  leftAlt = "Left image",
  rightAlt = "Right image",
  className = "",
  initialPosition = 50,
}: ImageCompareProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    const percentage = (x / rect.width) * 100

    setSliderPosition(Math.min(Math.max(percentage, 0), 100))
  }

  const handleMouseDown = () => {
    setIsDragging(true)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleTouchMove)
      window.addEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isDragging])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden rounded-2xl shadow-lg select-none ${className}`}
      style={{ touchAction: "none" }}
    >
      {/* Right Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={rightImage || "/placeholder.svg"}
          alt={rightAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Left Image (Foreground with clip) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        <img
          src={leftImage || "/placeholder.svg"}
          alt={leftAlt}
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Handle Circle */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center cursor-ew-resize"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Left Arrow */}
          <svg
            className="w-4 h-4 text-neutral-800 absolute left-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>

          {/* Right Arrow */}
          <svg
            className="w-4 h-4 text-neutral-800 absolute right-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.div>

        {/* Top Label */}
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-neutral-800 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          Arraste para comparar
        </div>
      </div>
    </div>
  )
}
