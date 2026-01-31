import React, { useState, useEffect } from 'react';
// Import avatar images

const Testimonials = () => {
  const avatar_yash='/avatar_yash.jpg';  
  const avatar_sarah = '/avatar_sarah.jpg';
  const avatar_alex = '/avatar_alex.jpg';
  const avatar_michael = '/avatar_michael.jpg';
  const avatar_emma = '/avatar_emma.jpg';
  const avatar_david = '/avatar_david.jpg';
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState(null);
  const video_1="https://res.cloudinary.com/djaigfxun/video/upload/v1769870691/Testinomials_video_1_eqfkqm.mp4"
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const videos = document.querySelectorAll('.testimonial-video');

    videos.forEach(video => {
      video.muted = true;
      video.play().catch(() => { });
    });
  }, []);

  const testimonials = [
    {
      type: 'video',
      name: 'Yash Bedi',
      handle: '@yash.bedii',
      role: 'Trader',
      company: 'Digital Media',
      video: video_1,
      avatar: avatar_yash,
      views: '2.4M',
      rating: 5,
      link: 'https://www.instagram.com/yash.bedii'
    },
    {
      type: 'video',
      name: 'Sarah Johnson',
      handle: '@sarahjohnson',
      role: 'Brand Manager',
      company: 'TechCorp',
      video: '#',
      avatar: avatar_sarah,
      views: '1.8M',
      rating: 5,
      link: '#'
    },
    {
      type: 'text',
      name: 'Alex Chen',
      handle: '@alexchen',
      role: 'Marketing Director',
      company: 'Innovation Labs',
      title: 'Exceptional Quality',
      content: 'Playverse Studio delivers high-quality creative solutions with precision and consistency. Their attention to detail and execution truly stand out.',
      avatar: avatar_alex,
      rating: 5,
      link: 'https://instagram.com/alexchen'
    },
    {
      type: 'text',
      name: 'Michael Roberts',
      handle: '@michaelr',
      role: 'CEO',
      company: 'TechFlow',
      title: 'Game Changer',
      content: 'Working with Playverse Studio was a seamless experience from start to finish. They combine creativity with strategy to deliver meaningful results.',
      avatar: avatar_michael,
      rating: 5,
      link: 'https://instagram.com/michaelr'
    },
    {
      type: 'text',
      name: 'Emma Wilson',
      handle: '@emmawilson',
      role: 'Creative Lead',
      company: 'Design Studio',
      title: 'Highly Recommended',
      content: 'Playverse Studio delivers high-quality creative work with impressive attention to detail. Their team understands project goals clearly and executes them with precision.',
      avatar: avatar_emma,
      rating: 5,
      link: 'https://instagram.com/emmawilson'
    },
    {
      type: 'text',
      name: 'David Martinez',
      handle: '@davidmartinez',
      role: 'Founder',
      company: 'StartupHub',
      title: 'Outstanding Results',
      content: 'The outcome exceeded expectations and added real value to our brand. Working with them feels smooth, reliable, and genuinely impactful.',
      avatar: avatar_david,
      rating: 5,
      link: 'https://instagram.com/davidmartinez'
    }
  ];

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={i < rating ? "#8A2BE2" : "none"}
        stroke={i < rating ? "#8A2BE2" : "#666"}
        strokeWidth="2"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ));
  };

  return (
    <div className="testimonials-container-wrapper">
      {/* Background Effects */}
      <div className="background-effects">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div
          className="mouse-gradient"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`
          }}
        ></div>
      </div>

      {/* Particle Grid */}
      <div className="particle-grid">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="content-wrapper">
        {/* Header */}
        <div className="testimonials-header">
          <div className="showcase-badge">CLIENT SUCCESS STORIES</div>
          <h2 className="main-heading">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="header-subtitle">
            Real stories from real people who transformed their brands with us
          </p>

          {/* Stats Bar */}
          <div className="stats-showcase">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">98%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5.0</div>
              <div className="stat-label">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`testimonial-card ${testimonial.type === 'video' ? 'video-card' : 'text-card'} ${activeCard === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="card-glow-border"></div>

              {testimonial.type === 'video' ? (
                <div className="video-content">
                  <video
                    src={testimonial.video}
                    className="testimonial-video"
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    preload="auto"
                  />
                  <div className="video-info-bar">
                    <div className="author-info">
                      <div className="author-avatar">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="avatar-image"
                        />
                      </div>
                      <div className="author-details">
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-role">{testimonial.role}</div>
                      </div>
                    </div>
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ig-link"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="text-content">
                  <div className="quote-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
                    </svg>
                  </div>

                  <div className="rating-stars">
                    {renderStars(testimonial.rating)}
                  </div>

                  <h3 className="testimonial-title">{testimonial.title}</h3>
                  <p className="testimonial-text">{testimonial.content}</p>

                  <div className="testimonial-footer">
                    <div className="author-info">
                      <div className="author-avatar">
                        <img 
                          src={testimonial.avatar} 
                          alt={testimonial.name}
                          className="avatar-image"
                        />
                      </div>
                      <div className="author-details">
                        <div className="author-name">{testimonial.name}</div>
                        <div className="author-role">{testimonial.role} • {testimonial.company}</div>
                      </div>
                    </div>
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ig-link"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA Section */}
      </div>
    </div>
  );
};

export default Testimonials;