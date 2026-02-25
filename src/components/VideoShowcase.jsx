'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from 'lucide-react';
import '../styles/VideoShowcase.css';

const VideoShowcase = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [videoStates, setVideoStates] = useState({});
  const videoRefs = useRef([]);
  const progressRefs = useRef([]);

  // Replace these URLs with your Cloudinary video URLs
  const videos = [
    {
      id: 'video-1',
      src: 'https://dbrjncaosdypvmxfqqng.supabase.co/storage/v1/object/public/Playverse%20Studio/long_video_1%20(1).mp4',
    },
    {
      id: 'video-2',
      src: 'https://dbrjncaosdypvmxfqqng.supabase.co/storage/v1/object/public/Playverse%20Studio/long_video_2%20(1).mp4', 
    },
    {
      id: 'video-3',
      src: 'https://dbrjncaosdypvmxfqqng.supabase.co/storage/v1/object/public/Playverse%20Studio/long_video_3%20(1).mp4', 
    },
  ];

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

  // Force autoplay on mount
  useEffect(() => {
    videoRefs.current.forEach(video => {
      if (video) {
        video.play().catch(() => {});
      }
    });
  }, []);

  // Update progress
  const handleTimeUpdate = (videoId, index) => {
    const video = videoRefs.current[index];
    if (video) {
      const progress = (video.currentTime / video.duration) * 100;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: {
          ...prev[videoId],
          currentTime: video.currentTime,
          duration: video.duration,
          progress: progress || 0,
        }
      }));
    }
  };

  // Toggle play/pause
  const togglePlay = (videoId, index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.paused) {
        video.play();
        setVideoStates(prev => ({
          ...prev,
          [videoId]: { ...prev[videoId], playing: true }
        }));
      } else {
        video.pause();
        setVideoStates(prev => ({
          ...prev,
          [videoId]: { ...prev[videoId], playing: false }
        }));
      }
    }
  };

  // Toggle mute
  const toggleMute = (videoId, index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.muted = !video.muted;
      setVideoStates(prev => ({
        ...prev,
        [videoId]: { ...prev[videoId], muted: video.muted }
      }));
    }
  };

  // Seek video
  const handleProgressClick = (e, videoId, index) => {
    const video = videoRefs.current[index];
    const progressBar = progressRefs.current[index];
    if (video && progressBar) {
      const rect = progressBar.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      video.currentTime = pos * video.duration;
    }
  };

  // Skip forward/backward
  const skipTime = (videoId, index, seconds) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
    }
  };

  // Fullscreen
  const toggleFullscreen = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) {
        video.msRequestFullscreen();
      }
    }
  };

  // Format time
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Show controls on hover
  const handleMouseEnter = (videoId) => {
    setHoveredCard(videoId);
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], showControls: true }
    }));
  };

  const handleMouseLeave = (videoId) => {
    setHoveredCard(null);
    setVideoStates(prev => ({
      ...prev,
      [videoId]: { ...prev[videoId], showControls: false }
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

                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.src}
                  className="stack-card-image"
                  muted
                  loop
                  autoPlay
                  playsInline
                  preload="metadata"
                  onTimeUpdate={() => handleTimeUpdate(video.id, index)}
                  onLoadedMetadata={() => handleTimeUpdate(video.id, index)}
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
                        onClick={() => togglePlay(video.id, index)}
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
                        onClick={() => skipTime(video.id, index, -10)}
                        aria-label="Skip back 10 seconds"
                      >
                        <SkipBack size={18} />
                      </button>

                      <button
                        className="control-btn"
                        onClick={() => skipTime(video.id, index, 10)}
                        aria-label="Skip forward 10 seconds"
                      >
                        <SkipForward size={18} />
                      </button>

                      <button
                        className="control-btn"
                        onClick={() => toggleMute(video.id, index)}
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


