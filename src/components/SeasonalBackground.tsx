"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useSeason } from "./SeasonContext"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  rotation: number
  rotationSpeed: number
  type?: string
  seed: number
  opacity: number
}

export const SeasonalBackground: React.FC = () => {
  const { currentSeason } = useSeason()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  // Generate particles based on season
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to full window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Clear existing particles
    particlesRef.current = []

    // Generate new particles based on season
    // Reduced particle count for less intense animations
    const particleCount = currentSeason === "summer" || currentSeason === "fall" ? 40 : 80
    const newParticles: Particle[] = []

    for (let i = 0; i < particleCount; i++) {
      let color = ""
      let type = ""
      let size = 0
      let speedY = 0
      let opacity = 1

      switch (currentSeason) {
        case "spring":
          // More variety for spring
          if (Math.random() > 0.7) {
            color = "#f8bbd0" // Pink blossoms
            type = "petal"
            size = 5 + Math.random() * 10
          } else if (Math.random() > 0.5) {
            color = "#c5e1a5" // Light green
            type = "leaf"
            size = 8 + Math.random() * 12
          } else if (Math.random() > 0.3) {
            color = "#b3e5fc" // Light blue for rain
            type = "raindrop"
            size = 3 + Math.random() * 5
            speedY = 2 + Math.random() * 3 // Faster for raindrops
          } else {
            color = "#ffffff" // White butterflies
            type = "butterfly"
            size = 8 + Math.random() * 10
          }
          opacity = 0.7 + Math.random() * 0.3
          break

        case "summer":
          // Reduced sun rays and more subtle effects for summer
          if (Math.random() > 0.6) {
            color = "#4caf50" // Green
            type = "leaf"
            size = 8 + Math.random() * 15
          } else if (Math.random() > 0.3) {
            color = "#8bc34a" // Light green
            type = "leaf"
            size = 10 + Math.random() * 15
          } else {
            color = ["#f44336", "#e91e63", "#9c27b0"][Math.floor(Math.random() * 3)] // Colorful butterflies
            type = "butterfly"
            size = 10 + Math.random() * 15
          }
          // Removed sun_ray type completely
          break

        case "fall":
          color = ["#ff9800", "#f44336", "#ffeb3b", "#795548", "#e65100"][Math.floor(Math.random() * 5)] // Fall colors
          // Removed wind_swirl type completely
          type = "leaf"
          size = 10 + Math.random() * 20
          speedY = 1 + Math.random() * 2 // Falling leaves
          break

        case "winter":
          if (Math.random() > 0.3) {
            color = "#ffffff" // White snow
            type = "snow"
            size = 2 + Math.random() * 6
            speedY = 0.5 + Math.random() * 1.5
          } else if (Math.random() > 0.1) {
            color = "#e1f5fe" // Light blue for ice crystals
            type = "ice_crystal"
            size = 15 + Math.random() * 25
            opacity = 0.3 + Math.random() * 0.4
          } else {
            color = "#b3e5fc" // Light blue for frost
            type = "frost"
            size = 80 + Math.random() * 150
            opacity = 0.1 + Math.random() * 0.2
          }
          break
      }

      newParticles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speedX: (Math.random() - 0.5) * 2,
        speedY: speedY || 0.5 + Math.random() * 1,
        color,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        type,
        seed: Math.random() * 1000,
        opacity,
      })
    }

    particlesRef.current = newParticles

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [currentSeason])

  // Animation loop with time-based movement
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = (timestamp: number) => {
      if (!timeRef.current) timeRef.current = timestamp
      const deltaTime = (timestamp - timeRef.current) / 1000 // Convert to seconds
      timeRef.current = timestamp

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Add seasonal background effects - with reduced effects for summer and fall
      addSeasonalBackgroundEffects(ctx, canvas.width, canvas.height, currentSeason, timestamp)

      // Update and draw particles with smooth movement
      particlesRef.current.forEach((particle) => {
        // Update position with time-based movement
        particle.y += particle.speedY * 60 * deltaTime
        particle.x += particle.speedX * 60 * deltaTime
        particle.rotation += particle.rotationSpeed * 60 * deltaTime

        // Add some natural movement based on particle seed
        const wobbleX = Math.sin(timestamp * 0.001 + particle.seed) * 1
        const wobbleY = Math.cos(timestamp * 0.002 + particle.seed) * 1

        // Reset if out of bounds
        if (particle.y > canvas.height) {
          particle.y = -particle.size
          particle.x = Math.random() * canvas.width
        }

        if (particle.x < -particle.size) {
          particle.x = canvas.width + particle.size
        } else if (particle.x > canvas.width + particle.size) {
          particle.x = -particle.size
        }

        // Draw particle based on type with smooth movement
        ctx.save()
        ctx.translate(particle.x + wobbleX, particle.y + wobbleY)
        ctx.rotate((particle.rotation * Math.PI) / 180)
        ctx.globalAlpha = particle.opacity

        switch (particle.type) {
          case "snow":
            drawSnowflake(ctx, 0, 0, particle.size, particle.color)
            break
          case "raindrop":
            drawRaindrop(ctx, 0, 0, particle.size, particle.color)
            break
          case "butterfly":
            drawButterfly(ctx, 0, 0, particle.size, particle.color, timestamp * 0.001 + particle.seed)
            break
          case "petal":
            drawPetal(ctx, 0, 0, particle.size, particle.color)
            break
          case "ice_crystal":
            drawIceCrystal(ctx, 0, 0, particle.size, particle.color)
            break
          case "frost":
            drawFrost(ctx, 0, 0, particle.size, particle.color, timestamp * 0.0001 + particle.seed)
            break
          default:
            drawLeaf(ctx, 0, 0, particle.size, particle.color)
        }

        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [currentSeason])

  const addSeasonalBackgroundEffects = (
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    season: string,
    timestamp: number,
  ) => {
    switch (season) {
      case "spring":
        // Add rainbow effect
        const rainbowGradient = ctx.createLinearGradient(0, 0, width, height)
        rainbowGradient.addColorStop(0, "rgba(255, 0, 0, 0.03)")
        rainbowGradient.addColorStop(0.2, "rgba(255, 165, 0, 0.03)")
        rainbowGradient.addColorStop(0.4, "rgba(255, 255, 0, 0.03)")
        rainbowGradient.addColorStop(0.6, "rgba(0, 128, 0, 0.03)")
        rainbowGradient.addColorStop(0.8, "rgba(0, 0, 255, 0.03)")
        rainbowGradient.addColorStop(1, "rgba(75, 0, 130, 0.03)")

        ctx.fillStyle = rainbowGradient
        ctx.fillRect(0, 0, width, height)
        break

      case "summer":
        // Significantly reduced sun rays effect - just a subtle glow
        const sunX = width * 0.9
        const sunY = height * 0.1

        ctx.save()
        ctx.beginPath()
        ctx.arc(sunX, sunY, 50, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 235, 59, 0.1)"
        ctx.fill()
        ctx.restore()
        break

      case "fall":
        // Removed wind swirls completely, just add a subtle warm gradient
        const fallGradient = ctx.createLinearGradient(0, 0, 0, height)
        fallGradient.addColorStop(0, "rgba(255, 248, 225, 0.05)")
        fallGradient.addColorStop(1, "rgba(255, 224, 178, 0.05)")

        ctx.fillStyle = fallGradient
        ctx.fillRect(0, 0, width, height)
        break

      case "winter":
        // Add northern lights effect
        const auroraCount = 3

        for (let i = 0; i < auroraCount; i++) {
          const y = height * 0.3 + (i / auroraCount) * height * 0.3
          const amplitude = 50 + Math.sin(timestamp * 0.0003 + i) * 30
          const frequency = 0.003

          const gradient = ctx.createLinearGradient(0, y - amplitude, 0, y + amplitude)
          gradient.addColorStop(0, "rgba(0, 128, 128, 0)")
          gradient.addColorStop(0.5, "rgba(0, 255, 255, 0.1)")
          gradient.addColorStop(1, "rgba(0, 128, 128, 0)")

          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.moveTo(0, y)

          for (let x = 0; x < width; x += 10) {
            const waveY = y + Math.sin(x * frequency + timestamp * 0.0005 + i) * amplitude
            ctx.lineTo(x, waveY)
          }

          ctx.lineTo(width, height)
          ctx.lineTo(0, height)
          ctx.closePath()
          ctx.fill()
        }
        break
    }
  }

  const drawLeaf = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.beginPath()
    ctx.moveTo(x, y - size / 2)
    ctx.bezierCurveTo(x + size / 2, y - size / 2, x + size / 2, y + size / 2, x, y + size / 2)
    ctx.bezierCurveTo(x - size / 2, y + size / 2, x - size / 2, y - size / 2, x, y - size / 2)
    ctx.fillStyle = color
    ctx.fill()

    // Add leaf vein
    ctx.beginPath()
    ctx.moveTo(x, y - size / 2)
    ctx.lineTo(x, y + size / 2)
    ctx.strokeStyle = "#00000033"
    ctx.lineWidth = size / 10
    ctx.stroke()
  }

  const drawSnowflake = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    const spikes = 6

    ctx.beginPath()
    for (let i = 0; i < spikes; i++) {
      const angle = (Math.PI * 2 * i) / spikes
      const x1 = x + Math.cos(angle) * size
      const y1 = y + Math.sin(angle) * size

      ctx.moveTo(x, y)
      ctx.lineTo(x1, y1)

      // Add small branches to each spike
      const smallAngle1 = angle + Math.PI / 8
      const smallAngle2 = angle - Math.PI / 8
      const smallSize = size * 0.5

      const sx1 = x + Math.cos(angle) * size * 0.5
      const sy1 = y + Math.sin(angle) * size * 0.5

      ctx.moveTo(sx1, sy1)
      ctx.lineTo(sx1 + Math.cos(smallAngle1) * smallSize, sy1 + Math.sin(smallAngle1) * smallSize)

      ctx.moveTo(sx1, sy1)
      ctx.lineTo(sx1 + Math.cos(smallAngle2) * smallSize, sy1 + Math.sin(smallAngle2) * smallSize)
    }

    ctx.strokeStyle = color
    ctx.lineWidth = size / 10
    ctx.stroke()
  }

  const drawRaindrop = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.beginPath()
    ctx.moveTo(x, y - size / 2)
    ctx.bezierCurveTo(x + size / 4, y - size / 4, x + size / 4, y + size / 4, x, y + size / 2)
    ctx.bezierCurveTo(x - size / 4, y + size / 4, x - size / 4, y - size / 4, x, y - size / 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  const drawPetal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    ctx.beginPath()
    ctx.ellipse(x, y, size / 2, size, 0, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()
  }

  const drawButterfly = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    time: number,
  ) => {
    // Add wing flapping animation
    const flapAmount = Math.sin(time * 5) * 0.3 + 0.7

    // Draw wings
    ctx.beginPath()
    ctx.ellipse(x - size / 2, y, (size / 2) * flapAmount, size / 3, Math.PI / 4, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    ctx.beginPath()
    ctx.ellipse(x + size / 2, y, (size / 2) * flapAmount, size / 3, -Math.PI / 4, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Draw body
    ctx.beginPath()
    ctx.ellipse(x, y, size / 10, size / 3, 0, 0, Math.PI * 2)
    ctx.fillStyle = "#00000066"
    ctx.fill()
  }

  const drawIceCrystal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, color: string) => {
    // Draw ice crystal
    const spikes = 8

    for (let i = 0; i < spikes; i++) {
      const angle = (i / spikes) * Math.PI * 2
      const length = size

      ctx.beginPath()
      ctx.moveTo(x, y)
      ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Add branches
      const branchAngle1 = angle + Math.PI / 6
      const branchAngle2 = angle - Math.PI / 6
      const branchLength = length * 0.5
      const branchX = x + Math.cos(angle) * length * 0.6
      const branchY = y + Math.sin(angle) * length * 0.6

      ctx.beginPath()
      ctx.moveTo(branchX, branchY)
      ctx.lineTo(branchX + Math.cos(branchAngle1) * branchLength, branchY + Math.sin(branchAngle1) * branchLength)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(branchX, branchY)
      ctx.lineTo(branchX + Math.cos(branchAngle2) * branchLength, branchY + Math.sin(branchAngle2) * branchLength)
      ctx.stroke()
    }
  }

  const drawFrost = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    time: number,
  ) => {
    // Draw frost pattern
    ctx.beginPath()
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + time
      const x1 = x + Math.cos(angle) * size
      const y1 = y + Math.sin(angle) * size

      ctx.moveTo(x, y)
      ctx.quadraticCurveTo(x + Math.cos(angle + 0.5) * size * 0.5, y + Math.sin(angle + 0.5) * size * 0.5, x1, y1)
    }
    ctx.strokeStyle = color
    ctx.lineWidth = 2
    ctx.stroke()
  }

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default SeasonalBackground
