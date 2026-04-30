import React, { useState } from 'react';
import { useProgress } from '@react-three/drei';
import ParticleCloud from '../ParticleCloud'; // Adjust path if needed
import '../css/IntroSplash.css';

function IntroSplash({ onComplete }) {
  const { progress, active } = useProgress();
  // 1. Tracks when the cloud is done loading to trigger the text slide-up
  const [isCloudReady, setIsCloudReady] = useState(false);
  // 2. Tracks when to fade the entire screen to black
  const [isFadingOut, setIsFadingOut] = useState(false);

  // This replaces your inline onCloudReady function
  const handleCloudReady = () => {
    setIsCloudReady(true); // Triggers your text animation

    // Hold the screen for 1.5 seconds so the user can see the effect
    setTimeout(() => {
      setIsFadingOut(true); // Starts the CSS fade-out transition

      // Wait 1 second for the fade-out to finish, then unmount the component
      setTimeout(() => {
        onComplete();
      }, 3000);

    }, 3500);
  };

  return (
    <div className={`splash-overlay ${isFadingOut ? 'fade-out' : ''}`}>
      {/* YOUR EXACT CODE SNIPPET (Slightly adjusted to span full height) */}
      <section id="splash-home" className="welcome hero-section" style={{ position: 'relative', overflow: 'hidden', height: '100vh', width: '100vw' }}>

        <div className="hero-background" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <ParticleCloud onCloudReady={handleCloudReady} />
        </div>

        {/* Loading Bar Overlay */}
        {(!isCloudReady) && (
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            opacity: isCloudReady ? 0 : 1,
            transition: 'opacity 0.5s ease'
          }}>
            <div className="splash-brand">
              <h2>Dream<span>Coders</span></h2>
            </div>
            <div style={{ color: 'white', marginBottom: '10px', fontFamily: 'monospace', fontSize: '0.9rem', opacity: 0.8 }}>
              {active ? `Loading Assets: ${Math.round(progress)}%` : 'Initializing...'}
            </div>
            <div className="loading-bar"></div>
          </div>
        )}

        <div
          className="hero-content animated-reveal"
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            pointerEvents: 'none',
            opacity: isCloudReady ? 1 : 0,
            transform: isCloudReady ? 'translateY(0px)' : 'translateY(30px)',
            transition: 'opacity 1.5s ease-out, transform 1.5s ease-out'
          }}
        >
          <div className="welcome-text" style={{ pointerEvents: 'auto' }}>
            <div className="badge">v2.0 Next-Gen Platform</div>
            <h1>Dream<br /><span>Coders</span></h1>
            <p>Turning Dreams Into Impactful Code.</p>

          </div>
        </div>

      </section>
    </div>
  );
}

export default IntroSplash;