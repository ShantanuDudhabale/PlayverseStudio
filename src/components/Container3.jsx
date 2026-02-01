'use client';
import { useState, useEffect, useRef } from "react"
import "../styles/container3.css"

const Container3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState(null)
  const [activeCategory, setActiveCategory] = useState('trending')
  const videoRefs = useRef([])

  useEffect(() => {
    const visibleIndexes = getVisibleVideos();
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (visibleIndexes.includes(idx)) {
        video.muted = true;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isMobile, activeCategory]);

  // Replace these with your actual Google Drive file IDs
  const trendingVideos = [
    { 
      id: 1, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769893311/short_video_1_1_x4qkzy.mp4"
    },
    { 
      id: 2, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769852082/USA_china_ven_1_hzfgaz.mp4"
    },
    { 
      id: 3, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769866338/Short_video_8_s9hz1w.mp4"
    },
    { 
      id: 4, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769866341/short_video_4_dfhxgx.mp4"
    }
    
  ]

  const latestVideos = [
    { 
      id: 5, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769850524/WhatsApp_Video_2026-01-29_at_10.43.35_qkicp7.mp4"
    },
    { 
      id: 6, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769850352/WhatsApp_Video_2026-01-29_at_10.48.29_1_gu2o7u.mp4"
    },
    { 
      id: 7, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769868555/WhatsApp_Video_2026-01-31_at_18.12.29_hfdxzs.mp4"
    },
    { 
      id: 8, 
      video: "https://res.cloudinary.com/djaigfxun/video/upload/v1769850575/short_video_5_rejfwt.mp4"
    }
  ]

  const featuredVideos = activeCategory === 'trending' ? trendingVideos : latestVideos

  const handlePrevious = () => {
    setTransitionDirection('right')
    setCurrentIndex((prev) => (prev === 0 ? featuredVideos.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setTransitionDirection('left')
    setCurrentIndex((prev) => (prev === featuredVideos.length - 1 ? 0 : prev + 1))
  }

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentIndex(0)
    setTransitionDirection(null)
  }

  const getVisibleVideos = () => {
    if (isMobile) {
      return [currentIndex]
    }
    const prev = currentIndex === 0 ? featuredVideos.length - 1 : currentIndex - 1
    const next = currentIndex === featuredVideos.length - 1 ? 0 : currentIndex + 1
    return [prev, currentIndex, next]
  }

  const getCardPosition = (index) => {
    const visibleIndices = getVisibleVideos()
    if (isMobile) {
      return index === currentIndex ? 'center' : 'hidden'
    }
    if (index === visibleIndices[0]) return 'left'
    if (index === visibleIndices[1]) return 'center'
    if (index === visibleIndices[2]) return 'right'
    return 'hidden'
  }

  return (
    <div className="container-3" id="services">
      <div className="container-3-content">
        <div className="header-section-compact">
          <div className="showcase-badge">SHORT VIDEOS</div>
          <div className="stats-compact">
            <div className="stat-item-compact">
              <div className="stat-number-compact">500K+</div>
              <div className="stat-label-compact">Monthly Views</div>
            </div>
            <div className="stat-separator"></div>
            <div className="stat-item-compact">
              <div className="stat-number-compact">98%</div>
              <div className="stat-label-compact">Engagement Rate</div>
            </div>
          </div>

          <div className="title-wrapper">
            <h1 className="main-title">
              Transforming <span className="highlights">long-form content</span><br />
              into viral <span className="highlights">short-form masterpieces</span>
            </h1>
          </div>

          <p className="main-subtitle">
            Every second counts. We craft scroll-stopping content that captures attention and drives action across all platforms.
          </p>

          <div className="category-toggle">
            <button
              className={`toggle-btn ${activeCategory === 'trending' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('trending')}
            >
              Trending
            </button>
            <button
              className={`toggle-btn ${activeCategory === 'latest' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('latest')}
            >
              Latest
            </button>
          </div>
        </div>

        <div className="video-carousel-section">
          <div className="carousel-container">
            {featuredVideos.map((video, index) => {
              const position = getCardPosition(index)
              return (
                <div
                  key={video.id}
                  className={`carousel-card ${position} ${transitionDirection === 'left' && position === 'center' ? 'transition-left' : ''
                    } ${transitionDirection === 'right' && position === 'center' ? 'transition-right' : ''
                    }`}
                  onAnimationEnd={() => setTransitionDirection(null)}
                >
                  <div className="card-media">
                    <video
                      ref={(el) => videoRefs.current[index] = el}
                      src={video.video}
                      loop
                      muted
                      autoPlay
                      playsInline
                      webkit-playsinline="true"
                      className="video-element"
                    />
                  </div>
                </div>
              )
            })}
          </div>

          <div className="nav-arrow left-arrow" onClick={handlePrevious}>
            ‹
          </div>
          <div className="nav-arrow right-arrow" onClick={handleNext}>
            ›
          </div>
        </div>
      </div>
    </div>
  )
}

export default Container3