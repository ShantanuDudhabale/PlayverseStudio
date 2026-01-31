"use client"

import { useState, useEffect } from "react"
import BackgroundAnimation from "./Antigravity"
import "../styles/container4.css"

const Container4 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [activeTab, setActiveTab] = useState("brandscaling")

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

  const podcastingTiers = [
    {
      badge: "CLIPPING",
      title: "Post-Production Excellence",
      subtitle: "For founders who already record podcasts",
      features: [
        { text: "Post-production from existing podcasts" },
        { text: "50-100 short-form clips per month" },
        { text: "Multi-platform distribution" },
        { text: "Algorithm-tested viral editing" },
        { text: "Platform-specific optimization" },
      ],
    },
    {
      badge: "SCALE",
      title: "Content Distribution Machine",
      subtitle: "For founders ready to scale content",
      features: [
        { text: "Content audit & planning" },
        { text: "Production at scale" },
        { text: "Advanced distribution system" },
        { text: "Dedicated team & strategist" },
        { text: "Analytics & media reports" },
      ],
    },
    {
      badge: "LAUNCH",
      title: "Complete Podcast Solution",
      subtitle: "From zero to industry-leading podcast",
      features: [
        { text: "Show concept & branding" },
        { text: "Full production pipeline" },
        { text: "Guest curation & management" },
        { text: "Studio & logistics handling" },
        { text: "Thought-leadership creation" },
      ],
    },
  ]

  const fanpageTiers = [
    {
      badge: "STARTER",
      title: "Fanpage Foundation",
      subtitle: "Launch your community presence",
      features: [
        { text: "Complete setup & optimization" },
        { text: "Strategic content calendar" },
        { text: "Professional design assets" },
        { text: "Community management basics" },
        { text: "Monthly analytics reporting" },
      ],
    },
    {
      badge: "GROWTH",
      title: "Exponential Expansion",
      subtitle: "Accelerate your fanbase growth",
      features: [
        { text: "Daily content creation" },
        { text: "Advanced engagement tactics" },
        { text: "Viral content strategy" },
        { text: "Influencer collaborations" },
        { text: "Paid campaign management" },
      ],
    },
    {
      badge: "EMPIRE",
      title: "Multi-Platform Dominance",
      subtitle: "Build your content empire",
      features: [
        { text: "Network-wide management" },
        { text: "Exclusive content & merch" },
        { text: "Membership programs" },
        { text: "Brand partnerships & deals" },
        { text: "Live event coordination" },
      ],
    },
  ]

  return (
    <div className="container-4">
      {/* Fixed Background Canvas Layer */}
      {/* Cosmic Background Effects */}
      <div className="cosmic-bg">
        <div className="nebula nebula-1"></div>
        <div className="nebula nebula-2"></div>
        <div className="nebula nebula-3"></div>

        <div
          className="cosmic-cursor"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
          }}
        ></div>

        <div className="rotating-ring ring-1"></div>
        <div className="rotating-ring ring-2"></div>
      </div>

      {/* Floating Orbs */}
      <div className="floating-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
      </div>

      {/* Content Wrapper */}
      <div className="container-4-wrapper">
        {/* Header Section */}
        <div className="header-section">
          <div className="showcase-badge">PROCESS</div>
          <h2 className="section-title">
             Build<span className="gradient-text"> with</span> us 
            {/* <span className="highlight-text">world-class organic content.</span> */}
          </h2>

          {/* <p className="section-subtitle">
            We help Entrepreneurs, influencers, venture capital funds, AI and tech companies scale their organic
            content.
          </p> */}

          {/* Tab Navigation */}
          <div className="tabs-container">
            <button
              className={`tab ${activeTab === "brandscaling" ? "active" : ""}`}
              onClick={() => setActiveTab("brandscaling")}
            >
              Brand Scaling
            </button>
            <button
              className={`tab ${activeTab === "podcasting" ? "active" : ""}`}
              onClick={() => setActiveTab("podcasting")}
            >
              Podcasting
            </button>
            <button
              className={`tab ${activeTab === "fanpage" ? "active" : ""}`}
              onClick={() => setActiveTab("fanpage")}
            >
              Fanpage
            </button>
          </div>
        </div>

        {/* Brand Scaling Tab */}
        {activeTab === "brandscaling" && (
          <div className="content-section">
            <div className="content-grid">
              {/* Features Section */}
              <div className="features-column">
                <h3 className="column-title">What You Get</h3>
                <div className="features-grid">
                  {[
                    {
                      title: "Comprehensive Brand Audit",
                      desc: "Deep-dive analysis of your current brand position and untapped opportunities",
                    },
                    {
                      title: "Multi-Channel Distribution",
                      desc: "Strategic content deployment across all major platforms for maximum reach",
                    },
                    {
                      title: "Advanced Analytics",
                      desc: "Real-time performance tracking with actionable insights and growth metrics",
                    },
                    {
                      title: "Dedicated Strategist",
                      desc: "Personal brand expert guiding your growth journey every step of the way",
                    },
                    {
                      title: "Monthly Growth Reports",
                      desc: "Detailed progress documentation with strategy adjustments and forecasting",
                    },
                    { title: "Priority Support", desc: "24/7 access to our team with same-day response guarantee" },
                  ].map((item, idx) => (
                    <div key={idx} className="feature-item">
                      <div className="feature-icon">✓</div>
                      <div className="feature-content">
                        <h4 className="feature-title">{item.title}</h4>
                        <p className="feature-desc">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome Card */}
              <div className="outcome-column">
                <div className="outcome-card">
                  <h3 className="outcome-title">Expected Outcome</h3>
                  <div className="stats-showcase">
                    <div className="stat-item">
                      <div className="stat-big">10x</div>
                      <div className="stat-small">Brand Growth</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-big">6mo</div>
                      <div className="stat-small">Timeline</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-big">∞</div>
                      <div className="stat-small">Potential</div>
                    </div>
                  </div>

                  <p className="outcome-desc">
                    Achieve exponential brand growth, dramatically increase market share, and establish undeniable
                    industry authority. Our proven methodology transforms businesses into category leaders.
                  </p>

                  <div className="benefits-list">
                    {[
                      "Industry recognition & thought leadership",
                      "Massive audience expansion & engagement",
                      "Premium brand positioning & authority",
                      "Sustainable competitive advantage",
                    ].map((benefit, idx) => (
                      <div key={idx} className="benefit-item">
                        {benefit}
                      </div>
                    ))}
                  </div>

                  <button className="cta-button" onClick={() => window.open('https://calendly.com/playverse14/30min', '_blank')}>Start Your Transformation →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Podcasting Tab */}
        {activeTab === "podcasting" && (
          <div className="content-section">
            <div className="content-grid">
              <div className="features-column">
                <h3 className="column-title">Service Tiers</h3>
                <div className="tiers-list">
                  {podcastingTiers.map((tier, index) => (
                    <div key={index} className="tier-card">
                      <div className="tier-badge">{tier.badge}</div>
                      <h4 className="tier-title">{tier.title}</h4>
                      <p className="tier-subtitle">{tier.subtitle}</p>
                      <div className="tier-features">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="tier-feature">
                            <span className="tier-icon">{feature.icon}</span>
                            <span className="tier-text">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="outcome-column">
                <div className="outcome-card">
                  <h3 className="outcome-title">Podcasting Outcomes</h3>

                  <div className="outcomes-list">
                    <div className="outcome-item">
                      <div className="outcome-header">
                        <span className="outcome-badge">CLIPPING</span>
                        <span className="outcome-timeline">1-2 months</span>
                      </div>
                      <p className="outcome-text">
                        Explosive top-of-funnel awareness with guaranteed viral content across all platforms
                      </p>
                    </div>

                    <div className="outcome-item">
                      <div className="outcome-header">
                        <span className="outcome-badge">SCALE</span>
                        <span className="outcome-timeline">3-4 months</span>
                      </div>
                      <p className="outcome-text">
                        Predictable growth, authority building, and consistent high-quality inbound leads
                      </p>
                    </div>

                    <div className="outcome-item">
                      <div className="outcome-header">
                        <span className="outcome-badge">LAUNCH</span>
                        <span className="outcome-timeline">6 months</span>
                      </div>
                      <p className="outcome-text">
                        Industry-leading podcast with complete distribution and thought leadership status
                      </p>
                    </div>
                  </div>

                  <div className="metrics-grid">
                    <div className="metric-box">
                      <div className="metric-value">10M+</div>
                      <div className="metric-label">Monthly Reach</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-value">100+</div>
                      <div className="metric-label">Clips/Month</div>
                    </div>
                  </div>

                  <button className="cta-button" onClick={() => window.open('https://calendly.com/playverse14/30min', '_blank')}>Launch Your Podcast →</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fanpage Tab */}
        {activeTab === "fanpage" && (
          <div className="content-section">
            <div className="content-grid">
              <div className="features-column">
                <h3 className="column-title">Fanpage Tiers</h3>
                <div className="tiers-list">
                  {fanpageTiers.map((tier, index) => (
                    <div key={index} className="tier-card">
                      <div className="tier-badge">{tier.badge}</div>
                      <h4 className="tier-title">{tier.title}</h4>
                      <p className="tier-subtitle">{tier.subtitle}</p>
                      <div className="tier-features">
                        {tier.features.map((feature, idx) => (
                          <div key={idx} className="tier-feature">
                            <span className="tier-icon">{feature.icon}</span>
                            <span className="tier-text">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="outcome-column">
                <div className="outcome-card">
                  <h3 className="outcome-title">Fanpage Outcomes</h3>

                  <div className="outcomes-list">
                    <div className="outcome-item">
                      <div className="outcome-header">
                        <span className="outcome-badge">STARTER</span>
                        <span className="outcome-timeline">30 days</span>
                      </div>
                      <p className="outcome-text">
                        Professional presence with engaged community foundation and sustainable growth path
                      </p>
                    </div>

                    <div className="outcome-item">
                      <div className="outcome-header">
                        <span className="outcome-badge">GROWTH</span>
                        <span className="outcome-timeline">3 months</span>
                      </div>
                      <p className="outcome-text">
                        10x follower growth with high engagement and monetization opportunities unlocked
                      </p>
                    </div>

                    <div className="outcome-item">
                      <div className="outcome-header">
                        <span className="outcome-badge">EMPIRE</span>
                        <span className="outcome-timeline">6-12 months</span>
                      </div>
                      <p className="outcome-text">
                        Multi-million follower empire with diverse revenue streams and celebrity status
                      </p>
                    </div>
                  </div>

                  <div className="metrics-grid">
                    <div className="metric-box">
                      <div className="metric-value">100k+</div>
                      <div className="metric-label">Followers</div>
                    </div>
                    <div className="metric-box">
                      <div className="metric-value">90%+</div>
                      <div className="metric-label">Engagement</div>
                    </div>
                  </div>

                  <button className="cta-button" onClick={() => window.open('https://calendly.com/playverse14/30min', '_blank')}>Build Your Empire →</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div id="testimonials"></div>
    </div>
  )
}

export default Container4
