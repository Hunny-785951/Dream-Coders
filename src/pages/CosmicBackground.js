import React from "react";

function CosmicBackground() {
  return (
    <div style={{ position: 'sticky', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, overflow: 'hidden' }}>
      <div className="hero-bg-layer">
        <svg className="bg-waves" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="baseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0f142b" />
              <stop offset="50%" stopColor="#1e112a" />
              <stop offset="100%" stopColor="#30143d" />
            </linearGradient>
            <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(80, 30, 130, 0.4)" />
              <stop offset="100%" stopColor="rgba(40, 15, 60, 0.1)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="constellation-overlay"></div>
      </div>
    </div>
  );
}

export default CosmicBackground;
