'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import '../styles/VideoShowcase.css';

const VideoShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoStates, setVideoStates] = useState({});
  const iframeRefs = useRef([]);
  const progressRefs = useRef([]);
  const vimeoPlayers = useRef({});
  const timeTrackers = useRef({});

  // ─── REPLACE VIMEO IDs BELOW WITH YOUR OWN ───────────────────────────────
  const videos = [
    { id: 'video-1', vimeoId: '1168573795' },  // ← replace with your Vimeo ID
    { id: 'video-2', vimeoId: '1168576817' },  // ← replace with your Vimeo ID
    { id: 'video-3', vimeoId: '1168577132' },  // ← replace with your Vimeo ID
  ];
  // ─────────────────────────────────────────────────────────────────────────

  // Load Vimeo Player API
  useEffect(() => {
    if (!document.querySelector('script[src="https://player.vimeo.com/api/player.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://player.vimeo.com/api/player.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Initialize video states
  useEffect(() => {
    const initialStates = {};
    videos.forEach(video => {
      initialStates[video.id] = {
        playing: true,
        muted: true,
        currentTime: 0,
        duration: 0,
        progress: 0,
        showControls: false,
      };
    });
    setVideoStates(initialStates);
  }, []);

  // Initialize a Vimeo player for a given iframe + index
  const initVimeoPlayer = (iframeEl, index) => {
    const videoId = videos[index]?.id;
    if (!iframeEl || !videoId || vimeoPlayers.current[videoId]) return;

    const tryInit = () => {
      if (typeof window !== 'undefined' && window.Vimeo) {
        const player = new window.Vimeo.Player(iframeEl);
        vimeoPlayers.current[videoId] = player;

        player.setVolume(0).catch(() => {});
        player.play().catch(() => {});

        // Get duration once ready
        player.getDuration().then(dur => {
          setVideoStates(prev => ({
            ...prev,
            [videoId]: { ...prev[videoId], duration: dur || 0 },
          }));
        }).catch(() => {});

        // Track time progress
        player.on('timeupdate', ({ seconds, duration }) => {
          const progress = duration ? (seconds / duration) * 100 : 0;
          setVideoStates(prev => ({
            ...prev,
            [videoId]: {
              ...prev[videoId],
              currentTime: seconds,
              duration: duration || prev[videoId]?.duration || 0,
              progress,
            },
          }));
        });

        // Sync play state
        player.on('play', () => {
          setVideoStates(prev => ({
            ...prev,
            [videoId]: { ...prev[videoId], playing: true },
          }));
        });

        player.on('pause', () => {
          setVideoStates(prev => ({
            ...prev,
            [videoId]: { ...prev[videoId], playing: false },
          }));
        });

      } else {
        setTimeout(tryInit, 200);
      }
    };

    tryInit();
  };

  // Toggle play/pause
  const togglePlay = (videoId) => {
    const player = vimeoPlayers.current[videoId];
    if (!player) return;
    player.getPaused().then(paused => {
      if (paused) {
        player.play().catch(() => {});
      } else {
        player.pause().catch(() => {});
      }
    }).catch(() => {});
  };

  // Toggle mute
  const toggleMute = (videoId) => {
    const player = vimeoPlayers.current[videoId];
    if (!player) return;
    const currentlyMuted = videoStates[videoId]?.muted;
    const newMuted = !currentlyMuted;
    player.setVolume(newMuted ? 0 : 1).catch(() => {});
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], muted: newMuted },
    }));
  };

  // Seek on progress bar click
  const handleProgressClick = (e, videoId, index) => {
    const player = vimeoPlayers.current[videoId];
    const progressBar = progressRefs.current[index];
    if (!player || !progressBar) return;
    const rect = progressBar.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const duration = videoStates[videoId]?.duration || 0;
    player.setCurrentTime(pos * duration).catch(() => {});
  };

  // Skip forward/backward
  const skipTime = (videoId, seconds) => {
    const player = vimeoPlayers.current[videoId];
    if (!player) return;
    player.getCurrentTime().then(current => {
      const duration = videoStates[videoId]?.duration || 0;
      const newTime = Math.max(0, Math.min(duration, current + seconds));
      player.setCurrentTime(newTime).catch(() => {});
    }).catch(() => {});
  };

  // Fullscreen — request on the iframe wrapper
  const toggleFullscreen = (index) => {
    const iframe = iframeRefs.current[index];
    if (!iframe) return;
    if (iframe.requestFullscreen) iframe.requestFullscreen();
    else if (iframe.webkitRequestFullscreen) iframe.webkitRequestFullscreen();
    else if (iframe.msRequestFullscreen) iframe.msRequestFullscreen();
  };

  // Format time helper
  const formatTime = (seconds) => {
    if (isNaN(seconds) || seconds == null) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseEnter = (videoId) => {
    setHoveredCard(videoId);
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], showControls: true },
    }));
  };

  const handleMouseLeave = (videoId) => {
    setHoveredCard(null);
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], showControls: false },
    }));
  };

  return (
    <section className="video-showcase-section">
      <div className="video-showcase-inner">

        {/* Header */}
        <div className="showcase-top">
          <div className="showcase-badge">CURATED VIDEOS</div>
          <h1 className="showcase-title">
            <p>Discover premium</p>
            <span className="title-gradient">landscape content</span>
          </h1>
          <p className="showcase-subtitle">
            Immersive cinematic experiences that captivate and inspire
          </p>
        </div>

        {/* Videos Stack */}
        <div className="videos-stack">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="stack-video-card"
              onMouseEnter={() => handleMouseEnter(video.id)}
              onMouseLeave={() => handleMouseLeave(video.id)}
              style={{
                animationDelay: `${index * 0.12}s`,
                '--stagger': index,
              }}
            >
              <div className="stack-card-inner">

                {/* Vimeo iframe */}
                <iframe
                  ref={(el) => {
                    iframeRefs.current[index] = el;
                    if (el) initVimeoPlayer(el, index);
                  }}
                  src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&muted=1&background=0&controls=0`}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="stack-card-image"
                  style={{ pointerEvents: 'none', border: 'none' }}
                  title={`video-${video.id}`}
                />

                {/* Gradient Overlay */}
                <div className="stack-card-gradient" />

                {/* Custom Video Controls */}
                <div className={`video-controls ${videoStates[video.id]?.showControls ? 'show' : ''}`}>

                  {/* Progress Bar */}
                  <div
                    className="video-progress-container"
                    ref={(el) => (progressRefs.current[index] = el)}
                    onClick={(e) => handleProgressClick(e, video.id, index)}
                  >
                    <div className="video-progress-bar">
                      <div
                        className="video-progress-filled"
                        style={{ width: `${videoStates[video.id]?.progress || 0}%` }}
                      />
                    </div>
                  </div>

                  {/* Controls Bar */}
                  <div className="video-controls-bar">

                    {/* Left Controls */}
                    <div className="controls-left">
                      <button
                        className="control-btn"
                        onClick={() => togglePlay(video.id)}
                        aria-label={videoStates[video.id]?.playing ? 'Pause' : 'Play'}
                      >
                        {videoStates[video.id]?.playing ? (
                          <Pause size={20} />
                        ) : (
                          <Play size={20} />
                        )}
                      </button>

                      <button
                        className="control-btn"
                        onClick={() => skipTime(video.id, -10)}
                        aria-label="Skip back 10 seconds"
                      >
                        <SkipBack size={18} />
                      </button>

                      <button
                        className="control-btn"
                        onClick={() => skipTime(video.id, 10)}
                        aria-label="Skip forward 10 seconds"
                      >
                        <SkipForward size={18} />
                      </button>

                      <button
                        className="control-btn"
                        onClick={() => toggleMute(video.id)}
                        aria-label={videoStates[video.id]?.muted ? 'Unmute' : 'Mute'}
                      >
                        {videoStates[video.id]?.muted ? (
                          <VolumeX size={20} />
                        ) : (
                          <Volume2 size={20} />
                        )}
                      </button>

                      <div className="video-time">
                        {formatTime(videoStates[video.id]?.currentTime || 0)} / {formatTime(videoStates[video.id]?.duration || 0)}
                      </div>
                    </div>

                    {/* Right Controls */}
                    <div className="controls-right">
                      <button
                        className="control-btn"
                        onClick={() => toggleFullscreen(index)}
                        aria-label="Fullscreen"
                      >
                        <Maximize size={20} />
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        <div id="process"></div>
      </div>
    </section>
  );
};

export default VideoShowcase;