import { useState } from 'react';
import '../styles/main.css';
import './Container2.jsx';
import './Container3.jsx';
import './Container4.jsx';
import './Testimonials.jsx';
const Container1 = () => {
  const playverseLogo = "/Playverse_logo.png";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="container-1">
      {/* Navbar */}
      <div className="navbar">
        <div className="logo">
          <div className="logo-image">
            <img src={playverseLogo} alt="Playverse Studio Logo" />
          </div>
          <div className="logo-text">Playverse Studio</div>
        </div>

        <div className="links">
          <a href="#Benefits" onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('Benefits')
              .scrollIntoView({ behavior: 'smooth' });
          }}>Benefits</a>
          <a href="#services" onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('services')
              .scrollIntoView({ behavior: 'smooth' });
          }}>Services</a>
          <a href="#process" onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('process')
              .scrollIntoView({ behavior: 'smooth' });
          }}>Process</a>
          <a href="#testimonials" onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('testimonials')
              .scrollIntoView({ behavior: 'smooth' });
          }}>Testimonials</a>
        </div>

        <button
          className="hamburger"
          onClick={toggleMobileMenu}
          aria-label="Open menu"
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Mobile Menu Header */}
        <div className="mobile-menu-header">
          <div className="mobile-menu-logo">
            <div className="mobile-menu-logo-image">
              <img src={playverseLogo} alt="Playverse Studio Logo" />
            </div>
            <div className="mobile-menu-logo-text">Playverse Studio</div>
          </div>
          <button
            className="mobile-close-btn"
            onClick={toggleMobileMenu}
            aria-label="Close menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="mobile-menu-content">
          <div className="mobile-menu-links">
            <a href="#Benefits" onClick={toggleMobileMenu}>Benefits</a>
            <a href="#services" onClick={toggleMobileMenu}>Services</a>
            <a href="#process" onClick={toggleMobileMenu}>Process</a>
            <a href="#testimonials" onClick={toggleMobileMenu}>Testimonials</a>
          </div>
          <button className="mobile-contact-btn" onClick={() => window.open('https://calendly.com/playverse14/30min', '_blank')}>
            Contact
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="introduction">
        <div className="scale-organically">GROW AUTHENTICALLY</div>

        <h1 className="hero-text">
          Transforming deep expertise into <br />
          <span className="highlight">undeniable influence</span>, powered by <br />
          <span className="line3">world-class organic content.</span>
        </h1>

        <div className="intro-small">
          <p>We help Entrepreneurs, influencers, venture capital funds, AI and tech companies scale</p>
          <p>their organic content.</p>
        </div>

        <button className="book-call-button" onClick={() => window.open('https://calendly.com/playverse14/30min', '_blank')}>Book a Discovery Call</button>
      </div>
    </div>
  );
};

export default Container1;