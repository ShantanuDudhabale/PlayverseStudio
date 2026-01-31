"use client"

import { useState, useEffect, useRef } from "react"
import BackgroundAnimation from "./Antigravity"
import { Sparkles, Eye, Trophy, Zap, Target, Rocket } from "lucide-react"
import "../styles/container2.css"

const Container2 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [hoveredCard, setHoveredCard] = useState(null)
  const scrollContainerRef = useRef(null)
 
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const cardData = [
    {
      id: 1,
      icon: Sparkles,
      title: "Creative Content",
      description: "World-class organic content creation that captivates and converts your audience.",
      color: "#8A2BE2",
    },
    {
      id: 2,
      icon: Eye,
      title: "Maximum Reach",
      description: "Strategic optimization to maximize visibility across every platform that matters.",
      color: "#C77DFF",
    },
    {
      id: 3,
      icon: Target,
      title: "Precision Targeting",
      description: "Data-driven strategies to reach exactly the right audience at the right time.",
      color: "#9D4EDD",
    },
    {
      id: 4,
      icon: Zap,
      title: "Rapid Growth",
      description: "Accelerate your growth with our proven frameworks and methodologies.",
      color: "#8A2BE2",
    },
    {
      id: 5,
      icon: Trophy,
      title: "Industry Leadership",
      description: "Establish authority and become a recognized leader in your space.",
      color: "#C77DFF",
    },
    {
      id: 6,
      icon: Rocket,
      title: "Scalable Solutions",
      description: "Systems designed to grow with your business without losing quality.",
      color: "#9D4EDD",
    },
  ]

  return (
    <div className="container-2" id="Benefits">
      <div className="content-section">
        <div className="section-header">
          <span className="badge">WHAT WE DO</span>

          <h2>
            Build <span className="highlight">authority</span>, trust, and impact on 
            <span className="highlight"> every platform that matters</span>
          </h2>

          <p className="section-subtitle">
            Build better products leave the marketing to us
          </p>
        </div>

        {/* Scroll Container - This is what scrolls on mobile */}
        <div className="cards-scroll-container" ref={scrollContainerRef}>
          <div className="cards-grid">
            {cardData.map((card, index) => {
              const IconComponent = card.icon
              return (
                <div
                  key={card.id}
                  className="animated-card"
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    "--card-color": card.color,
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {/* Card shine effect */}
                  <div className="card-shine-effect"></div>

                  {/* Animated border glow */}
                  <div className="card-border-glow"></div>

                  {/* Icon container */}
                  <div className="card-icon-wrapper">
                    <div className="icon-background">
                      <IconComponent size={32} strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="card-content">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  {/* Bottom accent */}
                  <div className="card-accent"></div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container2