import React from 'react';

const Hero = () => {
  return (
    <div className="hero-container">
      {/* Layered background for depth */}
      <div className="sky-layer">
        <div className="stars"></div>
      </div>
      
      <div className="mountain-range"></div>
      
      <div className="hero-content">
        <div className="nes-container is-dark with-title">
          <p className="title">STATUS: ONLINE</p>
          <h1 className="pixel-title">ANGAD GHATODE</h1>
          <p>Full-Stack Explorer & AI Architect</p>
        </div>
        <i className="nes-icon hex-item is-large"></i>
      </div>
    </div>
  );
};

export default Hero;