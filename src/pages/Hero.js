import React from 'react';
import Typewriter from 'typewriter-effect';
import '../css/Hero.css';

function Hero() {
  return (
    <section className="dev-hero-section">
      
      {/* EXACT BACKGROUND LAYER */}
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

      <div className="dev-hero-container">
        
        {/* LEFT COLUMN: Content & CTA */}
        <div className="dev-hero-content" data-aos="fade-right" data-aos-duration="1200">
          <div className="hero-pill-badge">
            <span className="status-dot"></span>
            Where Code Meets Community
          </div>
          
          <h1 className="hero-title">
            Build, <span className="gradient-text">Dream.</span><br />
            Code <span className="gradient-text">Together</span>
          </h1>
          
          <p className="hero-subtitle">
            Dream Coders is a thriving community of passionate developers, designers, and innovators — pushing the boundaries of technology, one commit at a time.
          </p>
          
          <div className="hero-stats-row">
            <div className="stat-block">
              <h3>500<span>+</span></h3>
              <p>MEMBERS</p>
            </div>
            <div className="stat-block">
              <h3>120<span>+</span></h3>
              <p>PROJECTS BUILT</p>
            </div>
            <div className="stat-block">
              <h3>50<span>+</span></h3>
              <p>EVENTS HOSTED</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Code Window Visual */}
        <div className="dev-hero-visual" data-aos="fade-left" data-aos-duration="1200" data-aos-delay="200">
          
          <div className="floating-badge badge-top-right">
            <i className="fa fa-star" style={{color: '#a855f7'}}></i> Top Community 2025
          </div>
          
          <div className="ide-window">
            <div className="ide-header">
              <div className="mac-controls">
                <span className="mac-dot close"></span>
                <span className="mac-dot minimize"></span>
                <span className="mac-dot expand"></span>
              </div>
              <div className="ide-title">dream_coders.py</div>
            </div>
            
            <div className="ide-body">
              <pre>
                <code>
                  <Typewriter
                    options={{
                      delay: 40,
                      cursor: "█",
                    }}
                    onInit={(typewriter) => {
                      typewriter.typeString(`<span class="syntax-keyword">class</span> <span class="syntax-class">DreamCoder</span>:
    <span class="syntax-keyword">def</span> <span class="syntax-method">__init__</span>(<span class="syntax-arg">self</span>):
        self.passion   = <span class="syntax-string">"infinite"</span>
        self.community = <span class="syntax-string">"Dream Coders"</span>
        self.skills    = [
            <span class="syntax-string">"code"</span>, <span class="syntax-string">"design"</span>,
            <span class="syntax-string">"collaborate"</span>, <span class="syntax-string">"innovate"</span>
        ]

    <span class="syntax-keyword">def</span> <span class="syntax-method">build_future</span>(<span class="syntax-arg">self</span>):
        <span class="syntax-keyword">while</span> self.passion:
            self.learn_daily()
            self.create_something()
            self.inspire_others()

<span style="color:#8b949e"># The future is coded together</span>
dreamCoder = DreamCoder()
dreamCoder.build_future()`).start();
                    }}
                  />
                </code>
              </pre>
            </div>
          </div>
          
          <div className="floating-badge badge-bottom-left">
            <i className="fa fa-users" style={{color: '#a855f7'}}></i> 500+ Members
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;