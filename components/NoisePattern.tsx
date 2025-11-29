"use client"

import { useEffect, useRef } from "react"

interface NoisePatternProps {
  isDarkMode: boolean
}

export default function NoisePattern({ isDarkMode }: NoisePatternProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const forceResize = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.style.width = "100%"
        canvas.style.height = "100%"
        canvas.width = parent.clientWidth * window.devicePixelRatio
        canvas.height = parent.clientHeight * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }

    // Set canvas size
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.clientWidth * window.devicePixelRatio
        canvas.height = parent.clientHeight * window.devicePixelRatio
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }
    }

    setTimeout(forceResize, 0)
    setTimeout(forceResize, 100)

    window.addEventListener("resize", resizeCanvas)

    // 4x4 Bayer matrix for ordered dithering
    const bayerMatrix = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ]

    // Normalize matrix values to 0-1 range
    const normalizedBayer = bayerMatrix.map((row) => row.map((val) => val / 16))

    let time = 0

    const animate = () => {
      const width = canvas.offsetWidth
      const height = canvas.offsetHeight

      // Clear canvas
      ctx.fillStyle = isDarkMode ? "#000000" : "#ffffff"
      ctx.fillRect(0, 0, width, height)

      const pixelSize = 4

      for (let x = 0; x < width; x += pixelSize) {
        for (let y = 0; y < height; y += pixelSize) {
          // Create animated gradient value
          const gradientValue =
            (Math.sin((x + time * 0.02) * 0.01) *
              Math.cos((y + time * 0.03) * 0.01) *
              Math.sin((x + y + time * 0.01) * 0.005) +
              1) *
            0.5

          // Get Bayer matrix threshold
          const matrixX = Math.floor(x / pixelSize) % 4
          const matrixY = Math.floor(y / pixelSize) % 4
          const threshold = normalizedBayer[matrixY][matrixX]

          // Apply dithering
          const shouldFill = gradientValue > threshold

          if (shouldFill) {
            ctx.fillStyle = isDarkMode
              ? `rgba(255, 255, 255, ${0.3 + gradientValue * 0.4})`
              : `rgba(0, 0, 0, ${0.3 + gradientValue * 0.4})`
            ctx.fillRect(x, y, pixelSize, pixelSize)
          }
        }
      }

      ctx.strokeStyle = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
      ctx.lineWidth = 1

      // Draw animated diagonal lines
      for (let i = 0; i < 8; i++) {
        const offset = (time * 0.1 + i * 50) % (width + height)
        ctx.beginPath()
        ctx.moveTo(offset - height, 0)
        ctx.lineTo(offset, height)
        ctx.stroke()
      }

      time += 16
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isDarkMode])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block"
      style={{
        background: isDarkMode ? "#000000" : "#ffffff",
        filter: "contrast(1.5) brightness(0.8)",
        minHeight: "100vh",
      }}
    />
  )
}
