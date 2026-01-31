import React, { useState, useEffect } from 'react';
import { Twitter, Linkedin, Youtube, Instagram, Mail } from 'lucide-react';
import '../styles/PlayverseFooter.css';

const PlayverseFooter = () => {
  const playverseLogo = '../assets/playverse_logo.png';
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 20 + 15,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2
    }));
    setParticles(newParticles);
  }, []);

  const navLinks = [
    'For Creators',
    'For Businesses',
    'Our Work',
    'Blog'
  ];

  const socialLinks = [
    { Icon: Twitter, url: '#', label: 'Twitter' },
    { Icon: Linkedin, url: 'https://www.linkedin.com/in/ritik-jha-a4a6b437a/', label: 'LinkedIn' },
    { Icon: Youtube, url: 'https://www.youtube.com/@Playversestudio-x', label: 'YouTube' },
    { Icon: Instagram, url: 'https://www.instagram.com/playverse_studio', label: 'Instagram' }
  ];

  return (
    <div className="footer-container">
      {/* Separation Line */}
      <div className="footer-separator"></div>

      <div className="footer-content">
        <div className="footer-top">
          {/* Main Row: Logo, Navigation, Social Icons */}
          <div className="footer-main-row">
            {/* Logo */}
            <div className="footer-logo">
              <div className="logo-image">
                <img src={playverseLogo} alt="Playverse Logo" />
              </div>
              <div className="logo-text-container">
                <span className="logo-text">Playverse Studio</span>
                <span className="logo-subtitle">By Ritik Jha</span>
              </div>
            </div>

            {/* Navigation links */}
            <nav className="footer-nav">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="nav-link"
                  style={{ animation: `slideInUp ${0.6 + index * 0.1}s ease-out` }}
                >
                  {link}
                </a>
              ))}
            </nav>

            {/* Social icons */}
            <div className="social-icons">
              {socialLinks.map(({ Icon, url, label }, index) => (
                <a
                  key={index}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  aria-label={label}
                  style={{ animation: `slideInUp ${0.8 + index * 0.1}s ease-out` }}
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Email */}
          <div className="footer-contact">
            <Mail size={16} className="contact-icon" />
            <a href="mailto:playverse14@gmail.com" className="contact-email">
              playverse14@gmail.com
            </a>
          </div>

          {/* Designer credit */}
          <div className="web-designer">
            Made with <span className="heart">❤️</span> by
            <span className="designer-name"> Shantanu Dudhabale</span>
            <p className="designer-name">dudhabaleshantanu21@gmail.com</p>
          </div>

          {/* Copyright and links */}
          <div className="footer-bottom">
            <span className="copyright">© Playverse Studio 2023</span>
            <div className="footer-links">
              <a href="#" className="footer-link">Privacy Policy</a>
              <span className="divider">•</span>
              <a href="#" className="footer-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayverseFooter;