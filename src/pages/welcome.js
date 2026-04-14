import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "../css/welcome.css";
import brandLogo from "../Resources/logo.png";
import MissionVision from "./MissionVision";
import Hero from "./Hero";
import Contact from "./Contact";
// IMPORT DATA FROM YOUR NEW FILE
import { events, upcomingEvents, members } from "../Resources/data"; 

function Welcome() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);  

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const centerPosition = container.scrollLeft + container.offsetWidth / 2;
    const cards = container.children;
    
    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(cards).forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(centerPosition - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== activeIndex) setActiveIndex(closestIndex);
  };

  useEffect(() => {
    handleScroll();
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy(); 
  }, []);

  return (
    <div className="app">
      <div className="ambient-mesh"></div>

      <header className="navbar-container">
        <nav className="navbar">
          <div className="brand">
            <img src={brandLogo} alt="Dream Coders Logo" className="brand-logo" />
            <h2>DREAM <span>CODERS</span></h2>
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#community">Members</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="hero-section" id="home">
          <Hero />
        </div>

        <div className="cosmic-zone" style={{ position: 'relative' }}>
          
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

          <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>
            
            <MissionVision />

            <section id="upcomingEvents" className="upcomingEvents">
              <div className="section-header">
                <h2>Upcoming Events</h2>
                <p>Discover our next wave of innovation and learning.</p>
              </div>
              <div className="events-preview">
                {upcomingEvents.map((upcomingEvent, index) => (
                  <article className="card event-card" key={index}>
                    <div className="img-wrapper">
                      <img src={upcomingEvent.img} alt={`Promotional image for ${upcomingEvent.name}`} loading="lazy"/>
                      <span className="event-date">{upcomingEvent.date}</span>
                    </div>
                    <div className="card-content">
                      <h3>{upcomingEvent.name}</h3>
                      <p>{upcomingEvent.desc}</p>
                      <br/> 
                      <button className="btn-upcoming">Register Now</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="events" className="events">
              <div className="section-header">
                <h2>Events</h2>
                <p>Immerse yourself in our cutting-edge sessions.</p>
              </div>
              <div className="card-container">
                {events.map((event, index) => (
                  <article className="card event-card" key={index}>
                    <div className="img-wrapper">
                      <img src={event.img} alt={`Promotional image for ${event.name}`} loading="lazy"/>
                      <span className="event-date">{event.date}</span>
                    </div>
                    <div className="card-content">
                      <h3>{event.name}</h3>
                      <p>{event.desc}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="community" className="community">
              <div className="section-header">
                <h2>Members</h2>
                <p>Meet the minds behind the architecture.</p>
              </div>
              <div className="card-container" ref={scrollRef} onScroll={handleScroll}>
                {members.map((member, index) => {
                  let coverflowClass = "";
                  if (index === activeIndex) coverflowClass = "active";
                  else if (index < activeIndex) coverflowClass = "prev";
                  else if (index > activeIndex) coverflowClass = "next";

                  return (
                    <article className={`card member-card ${coverflowClass}`} key={index}>
                      <img src={member.img} alt={member.name} className="member-img"/>
                      <div className="member-content">
                        <h3 className="member-name">{member.name}</h3>
                        <h4 className="member-role">{member.role}</h4>
                        <p className="member-desc">{member.desc}</p>
                        <div className="member-socials">
                          <a href={member.linkedin} aria-label="LinkedIn"><i className="fa fa-linkedin"></i></a>
                          <a href={member.github} aria-label="GitHub"><i className="fa fa-github"></i></a>
                          <a href={member.mail} aria-label="Email"><i className="fa fa-envelope"></i></a>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
            
            <Contact />

          </div>
        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer>
        <div className="footer-content">
          <h3>DREAM <span>CODERS</span></h3>
          <p>Elevating digital experiences.</p>
          <div className="footer-icons">
            <a href="https://www.linkedin.com/company/dream-coderscommunity/" aria-label="Dream Coders LinkedIn"><i className="fa fa-linkedin"></i></a>
            <a href="#" aria-label="Dream Coders GitHub"><i className="fa fa-github"></i></a>
            <a href="https://www.instagram.com/dreamcoderscommunity/" aria-label="Dream Coders Instagram"><i className="fa fa-instagram"></i></a>
          </div>
        </div>  
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Dream Coders. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Welcome;