import React, { useState } from 'react';
import ParticleCloud from '../ParticleCloud'; // Adjust path if needed
import '../css/IntroSplash.css';

function IntroSplash({ onComplete }) {
  // 1. Tracks when the cloud is done loading to trigger the text slide-up
  const [isCloudReady, setIsCloudReady] = useState(false);
  // 2. Tracks when to fade the entire screen to black
  const [isFadingOut, setIsFadingOut] = useState(false);

  // This replaces your inline onCloudReady function
  const handleCloudReady = () => {
    setIsCloudReady(true); // Triggers your text animation
    
    // Hold the screen for 2.5 seconds so the user can see the effect
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
            <h1>Dream<br/><span>Coders</span></h1>
            <p>Turning Dreams Into Impactful Code.</p>
            
          </div>
        </div>

      </section>
    </div>
  );
}

export default IntroSplash;