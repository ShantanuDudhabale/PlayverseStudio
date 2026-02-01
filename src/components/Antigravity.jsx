"use client"

import { useEffect, useRef } from "react"

function BackgroundAnimation() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1

      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr

      canvas.style.width = "100vw"
      canvas.style.height = "100vh"

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    setCanvasSize()

    // Fixed particle positions - these never move
    const particles = []
    class Particle {
      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.size = Math.random() * 1.5 + 0.5
        this.opacity = Math.random() * 0.6 + 0.2
      }

      draw() {
        ctx.fillStyle = `rgba(138, 43, 226, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles with fixed positions
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle())
    }

    // Fixed orbs - no movement
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

    // Fixed shapes - with rotation animation
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
      ctx.restore()
    }

    const draw = () => {
      // Clear canvas with solid black to prevent pixel strips/banding
      ctx.fillStyle = "#000000"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      
      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = "source-over"

      // Draw orbs with enhanced glow - same as original but without pixel strips
      orbs.forEach((orb) => {
        for (let i = 3; i > 0; i--) {
          const glowGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius * i)
          const alpha = 0.04 / i
          glowGradient.addColorStop(0, orb.color.replace("0.1", `${alpha}`))
          glowGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

          ctx.fillStyle = glowGradient
          ctx.beginPath()
          ctx.arc(orb.x, orb.y, orb.radius * i, 0, Math.PI * 2)
          ctx.fill()
        }

        // Main orb
        const mainGradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius)
        mainGradient.addColorStop(0, orb.color)
        mainGradient.addColorStop(1, "rgba(0, 0, 0, 0)")

        ctx.fillStyle = mainGradient
        ctx.beginPath()
        ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw shapes at fixed positions with rotation animation
      floatingShapes.forEach((shape) => {
        // Rotate shapes continuously
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
          ctx.stroke()
        } else if (shape.type === "triangle") {
          drawTriangle(shape.x, shape.y, shape.size / 2, shape.rotation)
          ctx.stroke()
        }
      })

      // Particle connections disabled - clean particles only

      // Draw fixed particles
      particles.forEach((particle) => {
        particle.draw()
      })
    }

    let animationFrameId

    const animate = () => {
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    // Start animation for rotating shapes
    animate()

    // Handle resize - redraw on resize
    const handleResize = () => {
      setCanvasSize()
      
      // Recalculate positions based on new window size
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

      // Regenerate particles for new window size
      particles.length = 0
      for (let i = 0; i < 120; i++) {
        particles.push(new Particle())
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="antigravity-background">
      <canvas ref={canvasRef} />
    </div>
  )
}

export default BackgroundAnimation
