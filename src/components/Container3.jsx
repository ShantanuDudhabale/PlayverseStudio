'use client';
import { useState, useEffect, useRef } from "react"
import "../styles/container3.css"

const Container3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [transitionDirection, setTransitionDirection] = useState(null)
  const [activeCategory, setActiveCategory] = useState('trending')
  const [soundEnabled, setSoundEnabled] = useState({}) // Track sound state per video
  const [isPlaying, setIsPlaying] = useState({}) // Track play/pause state per video
  const videoRefs = useRef([])
  const vimeoPlayers = useRef({})

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Load Vimeo Player API
  useEffect(() => {
    if (document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://player.vimeo.com/api/player.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    const visibleIndexes = getVisibleVideos();

    // Handle regular videos
    videoRefs.current.forEach((video, idx) => {
      if (!video) return;
      if (visibleIndexes.includes(idx)) {
        video.muted = !soundEnabled[idx];
        if (isPlaying[idx] !== false) {
          video.play().catch(() => {});
        }
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });

    // Handle Vimeo players
    Object.keys(vimeoPlayers.current).forEach((idx) => {
      const player = vimeoPlayers.current[idx]
      if (!player) return
      const numIdx = parseInt(idx)
      if (visibleIndexes.includes(numIdx)) {
        player.setVolume(soundEnabled[numIdx] ? 1 : 0).catch(() => {})
        if (isPlaying[numIdx] !== false) {
          player.play().catch(() => {})
        }
      } else {
        player.pause().catch(() => {})
      }
    })
  }, [currentIndex, isMobile, activeCategory, soundEnabled, isPlaying]);

  // Replace these with your actual Google Drive file IDs
  const trendingVideos = [
    { 
      id: 1, 
      type: 'vimeo',
      vimeoId: '1168133089',
      video: null
    },
    { 
      id: 2, 
      type: 'vimeo',
      vimeoId: '1168133089',
      video: null
    },
    { 
      id: 3, 
      type: 'vimeo',
      vimeoId: '1168133089',
      video: null
    },
    { 
      id: 4, 
      type: 'vimeo',
      vimeoId: '1168566161',
      video: null
    }
    
  ]

  const latestVideos = [
    { 
      id: 5, 
      type: 'vimeo',
      vimeoId: '1168194999',
      video: null
    },
    { 
      id: 6, 
      type: 'vimeo',
      vimeoId: '1168133089',
      video: null
    },
    { 
      id: 7, 
      type: 'vimeo',
      vimeoId: '1168571722',
      video: null
    },
    { 
      id: 8, 
      type: 'vimeo',
      vimeoId: '1168133089',
      video: null
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
    setSoundEnabled({})
    setIsPlaying({})
    vimeoPlayers.current = {}
  }

  const toggleSound = (index) => {
    setSoundEnabled(prev => ({
      ...prev,
      [index]: !prev[index]
    }))
  }

  const togglePlayPause = (index, e) => {
    e.stopPropagation();
    const video = featuredVideos[index]

    if (video?.type === 'vimeo') {
      const player = vimeoPlayers.current[index]
      if (!player) return
      player.getPaused().then((paused) => {
        if (paused) {
          player.play().catch(() => {})
          setIsPlaying(prev => ({ ...prev, [index]: true }))
        } else {
          player.pause().catch(() => {})
          setIsPlaying(prev => ({ ...prev, [index]: false }))
        }
      }).catch(() => {})
      return
    }

    const videoEl = videoRefs.current[index];
    if (!videoEl) return;

    if (videoEl.paused) {
      videoEl.play().catch(() => {});
      setIsPlaying(prev => ({ ...prev, [index]: true }));
    } else {
      videoEl.pause();
      setIsPlaying(prev => ({ ...prev, [index]: false }));
    }
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

  // Initialize Vimeo player when iframe is rendered
  const initVimeoPlayer = (iframeEl, index) => {
    if (!iframeEl || vimeoPlayers.current[index]) return
    if (typeof window === 'undefined' || !window.Vimeo) {
      // Wait for Vimeo script to load
      const interval = setInterval(() => {
        if (window.Vimeo) {
          clearInterval(interval)
          const player = new window.Vimeo.Player(iframeEl)
          vimeoPlayers.current[index] = player
          player.setVolume(0).catch(() => {})
          player.play().catch(() => {})
        }
      }, 200)
      return
    }
    const player = new window.Vimeo.Player(iframeEl)
    vimeoPlayers.current[index] = player
    player.setVolume(0).catch(() => {})
    player.play().catch(() => {})
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
              const visibleIndexes = getVisibleVideos()
              const isVisible = visibleIndexes.includes(index)
              const isSoundOn = soundEnabled[index]
              const videoIsPlaying = isPlaying[index] !== false
              
              return (
                <div
                  key={video.id}
                  className={`carousel-card ${position} ${
                    transitionDirection === 'left' && position === 'center' ? 'transition-left' : ''
                  } ${
                    transitionDirection === 'right' && position === 'center' ? 'transition-right' : ''
                  }`}
                  onAnimationEnd={() => setTransitionDirection(null)}
                >
                  <div 
                    className="card-media"
                    onClick={(e) => togglePlayPause(index, e)}
                  >
                    {video.type === 'vimeo' ? (
                      <>
                        <div style={{ padding: '177.78% 0 0 0', position: 'relative', width: '100%', height: '100%', borderRadius: '24px', overflow: 'hidden', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                          <iframe
                            ref={(el) => {
                              if (el && isVisible) initVimeoPlayer(el, index)
                            }}
                            src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=1`}
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              borderRadius: '24px',
                              pointerEvents: 'none'
                            }}
                            title={`video-${video.id}`}
                          />
                        </div>

                        {isVisible && !videoIsPlaying && (
                          <div className="play-pause-overlay" style={{ zIndex: 6 }}>
                            <div className="play-icon">
                              <svg 
                                width="60" 
                                height="60" 
                                viewBox="0 0 24 24" 
                                fill="white"
                              >
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                          </div>
                        )}

                        {isVisible && (
                          <div 
                            className="sound-icon"
                            style={{ zIndex: 10 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSound(index);
                              const player = vimeoPlayers.current[index]
                              if (player) {
                                player.setVolume(isSoundOn ? 0 : 1).catch(() => {})
                              }
                            }}
                          >
                            {isSoundOn ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                <line x1="23" y1="9" x2="17" y2="15"></line>
                                <line x1="17" y1="9" x2="23" y2="15"></line>
                              </svg>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <video
                          ref={(el) => videoRefs.current[index] = el}
                          src={video.video}
                          loop
                          muted={!isSoundOn}
                          autoPlay
                          playsInline
                          webkit-playsinline="true"
                          className="video-element"
                        />
                        
                        {isVisible && !videoIsPlaying && (
                          <div className="play-pause-overlay">
                            <div className="play-icon">
                              <svg 
                                width="60" 
                                height="60" 
                                viewBox="0 0 24 24" 
                                fill="white"
                              >
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                              </svg>
                            </div>
                          </div>
                        )}
                        
                        {isVisible && !isSoundOn && (
                          <div 
                            className="sound-icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSound(index);
                            }}
                          >
                            <svg 
                              width="18" 
                              height="18" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="2"
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <line x1="23" y1="9" x2="17" y2="15"></line>
                              <line x1="17" y1="9" x2="23" y2="15"></line>
                            </svg>
                          </div>
                        )}
                      </>
                    )}
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