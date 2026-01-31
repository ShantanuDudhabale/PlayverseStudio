import React from 'react';
import '../styles/container5.css';

const CTASection = () => {
  const handleStartJourney = () => {
    window.open('https://calendly.com/playverse14/30min', '_blank');
  };

  return (
    <div className="testimonials-cta">
      <h3 className="cta-title">Ready to join our success stories?</h3>
      <button className="cta-button" onClick={handleStartJourney}>
        <span>Start Your Journey</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default CTASection;