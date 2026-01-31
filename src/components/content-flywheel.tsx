import React from "react"
import "../styles/content-flywheel.css"
import "../styles/main.css"
const PLATFORMS = [
  {
    name: "LinkedIn",
    subLabel: "Posts",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    color: "#0077b5",
    angle: 270,
  },
  {
    name: "Instagram",
    subLabel: "reels",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "#ee2a7b",
    angle: 320,
  },
  {
    name: "Youtube",
    subLabel: "Shorts",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
    color: "#ff0000",
    angle: 0,
  },
  {
    name: "Instagram",
    subLabel: "Carousels",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.689-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
    color: "#ee2a7b",
    angle: 40,
  },
  {
    name: "TikTok",
    subLabel: "Videos",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
      </svg>
    ),
    color: "#000000",
    angle: 140,
  },
  {
    name: "LinkedIn",
    subLabel: "Carousels",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
    color: "#0077b5",
    angle: 180,
  },
  {
    name: "Youtube",
    subLabel: "Long form",
    icon: (
      <svg viewBox="0 0 24 24" fill="white">
        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
      </svg>
    ),
    color: "#ff0000",
    angle: 220,
  },
]

export default function ContentFlywheel() {
  const radius = 280

  return (
    <div className="container-content-flywheel">
      <div className="content-flywheel-text">
        <div className="flywheel-heading">Upgrade your brand presence to capture larger opportunities.</div>
        <div className="flywheel-subheading">Leverage our Content Flywheel to consistently produce and distribute high-quality content across multiple platforms.</div>
        <button className="book-call-button" onClick={() => window.open('https://calendly.com/playverse14/30min', '_blank')}>Book a Discovery Call</button>
      </div>
      <div className="flywheel-container">
        {/* Background Particles */}
        <div className="particles">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                opacity: Math.random() * 0.5,
              }}
            />
          ))}
        </div>

        {/* Central Flywheel Core */}
        <div className="flywheel-core">
          {/* Glowing Rings */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="glow-ring"
              style={{
                width: `${280 + i * 20}px`,
                height: `${280 + i * 20}px`,
                animationDelay: `${i * 0.5}s`,
                opacity: 0.4 - i * 0.05,
              }}
            />
          ))}

          {/* Light Trails (SVG Strands) */}
          <svg className="light-trails" viewBox="0 0 600 600">
            <defs>
              <linearGradient id="strand-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0" />
                <stop offset="50%" stopColor="#c084fc" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[...Array(6)].map((_, i) => (
              <ellipse
                key={i}
                cx="300"
                cy="300"
                rx="160"
                ry="100"
                className="trail-strand"
                style={{
                  animationDuration: `${15 + i * 2}s`,
                  animationDelay: `-${i}s`,
                }}
              />
            ))}
          </svg>

          {/* Center Text */}
          <div className="core-content">
            <h2 className="core-title">
              Content
              <br />
              Flywheel
            </h2>
            <p className="core-subtitle">Automated Engine</p>
            <div className="core-line" />
          </div>
        </div>

        {/* Orbiting Platforms */}
        <div className="platforms-layer">
          {PLATFORMS.map((platform, i) => {
            const angleRad = (platform.angle * Math.PI) / 180
            const x = Math.cos(angleRad) * radius
            const y = Math.sin(angleRad) * radius

            return (
              <div
                key={`${platform.name}-${platform.subLabel}`}
                className="platform-node"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                  animationDelay: `${i * 0.2}s`,
                }}
              >
                <div
                  className="platform-icon-wrap"
                  style={{
                    backgroundColor: platform.color,
                    boxShadow: `0 0 20px ${platform.color}44`,
                  }}
                >
                  {platform.icon}
                </div>
                <div className="platform-text">
                  <div className="platform-name">{platform.name}</div>
                  <div className="platform-sub">{platform.subLabel}</div>
                </div>
                <div className="platform-glow" style={{ background: platform.color }} />
              </div>
            )
          })}
        </div>

        {/* Vignette Overlay */}
        <div className="vignette" />
      </div>
    </div>
  )
}
