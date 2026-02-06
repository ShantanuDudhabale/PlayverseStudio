"use client"

import { useEffect, useRef } from "react"
import { canvasRef } from "./canvasRef" // Assuming canvasRef is declared in another file

class Particle {
  constructor() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.size = Math.random() * 2 + 1
    this.speedX = (Math.random() - 0.5) * 2
    this.speedY = (Math.random() - 0.5) * 2
  }

  draw() {
    const ctx = canvasRef.current.getContext("2d")
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY
    if (this.size > 0.5) this.size -= 0.05
    if (this.x < 0 || this.x > window.innerWidth) this.speedX = -this.speedX
    if (this.y < 0 || this.y > window.innerHeight) this.speedY = -this.speedY
  }
}

function BackgroundAnimation() {
  const particles = []

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: false })
    if (!ctx) return

    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()

    // No particles - keep canvas clean

    // Fixed orbs
    const orbs = [
      {
        x: window.innerWidth * 0.15,
        y: window.innerHeight * 0.25,
        radius: 220,
        color: "rgba(138, 43, 226, 0.12)",
      },
      {
        x: window.innerWidth * 0.85,
        y: window.innerHeight * 0.75,
        radius: 280,
        color: "rgba(75, 0, 130, 0.09)",
      },
      {
        x: window.innerWidth * 0.5,
        y: window.innerHeight * 0.4,
        radius: 200,
        color: "rgba(138, 43, 226, 0.06)",
      },
      {
        x: window.innerWidth * 0.3,
        y: window.innerHeight * 0.7,
        radius: 150,
        color: "rgba(100, 50, 200, 0.08)",
      },
    ]

    // Fixed shapes
    const floatingShapes = [
      {
        x: window.innerWidth * 0.1,
        y: window.innerHeight * 0.5,
        size: 40,
        rotation: 0,
        type: "square",
      },
      {
        x: window.innerWidth * 0.9,
        y: window.innerHeight * 0.3,
        size: 50,
        rotation: 0,
        type: "hexagon",
      },
      {
        x: window.innerWidth * 0.7,
        y: window.innerHeight * 0.8,
        size: 35,
        rotation: 0,
        type: "triangle",
      },
    ]

    const drawHexagon = (x, y, size, rotation) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const px = Math.cos(angle) * size
        const py = Math.sin(angle) * size
        if (i === 0) ctx.moveTo(px, py)
        else ctx.lineTo(px, py)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }

    const drawTriangle = (x, y, size, rotation) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rotation)
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(size, size)
      ctx.lineTo(-size, size)
      ctx.closePath()
      ctx.stroke()
      ctx.restore()
    }

    const draw = () => {
      // Clear entire canvas
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      // Simple solid background instead of gradient
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw orbs with glow
      orbs.forEach((orb) => {
        for (let i = 3; i > 0; i--) {
          const glowGradient = ctx.createRadialGradient(
            orb.x,
            orb.y,
            0,
            orb.x,
            orb.y,
            orb.radius * i
          )
          glowGradient.addColorStop(0, orb.color)
          glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(orb.x, orb.y, orb.radius * i, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main orb
        const mainGradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius
        )
        mainGradient.addColorStop(0, orb.color)
        mainGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = mainGradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw shapes with rotation
      floatingShapes.forEach((shape) => {
        shape.rotation += 0.02

        if (shape.type === "hexagon") {
          ctx.strokeStyle = "rgba(138, 43, 226, 0.35)"
          ctx.lineWidth = 2.2
        } else if (shape.type === "triangle") {
          ctx.strokeStyle = "rgba(180, 120, 255, 0.25)"
          ctx.lineWidth = 1.8
        } else {
          ctx.strokeStyle = "rgba(180, 120, 255, 0.25)"
          ctx.lineWidth = 1.5
        }

        if (shape.type === "square") {
          ctx.save()
          ctx.translate(shape.x, shape.y)
          ctx.rotate(shape.rotation)
          ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size)
          ctx.restore()
        } else if (shape.type === "hexagon") {
          drawHexagon(shape.x, shape.y, shape.size / 2, shape.rotation)
        } else if (shape.type === "triangle") {
          drawTriangle(shape.x, shape.y, shape.size / 2, shape.rotation)
        }
      })
    }

    let animationFrameId

    const animate = () => {
      draw()
      particles.forEach((particle) => {
        particle.update()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      setCanvasSize()

      orbs[0].x = window.innerWidth * 0.15
      orbs[0].y = window.innerHeight * 0.25
      orbs[1].x = window.innerWidth * 0.85
      orbs[1].y = window.innerHeight * 0.75
      orbs[2].x = window.innerWidth * 0.5
      orbs[2].y = window.innerHeight * 0.4
      orbs[3].x = window.innerWidth * 0.3
      orbs[3].y = window.innerHeight * 0.7

      floatingShapes[0].x = window.innerWidth * 0.1
      floatingShapes[0].y = window.innerHeight * 0.5
      floatingShapes[1].x = window.innerWidth * 0.9
      floatingShapes[1].y = window.innerHeight * 0.3
      floatingShapes[2].x = window.innerWidth * 0.7
      floatingShapes[2].y = window.innerHeight * 0.8
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        style={{ display: "block", width: "100%", height: "100%" }}
      />
    </div>
  )
}

export default BackgroundAnimation
