import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import "../css/welcome.css";
import brandLogo from "../Resources/logo.png";
import MissionVision from "./MissionVision";
import Hero from "./Hero";
import Contact from "./Contact";
// IMPORT DATA FROM YOUR NEW FILE
import { events, upcomingEvents, members } from "../Resources/data";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Welcome() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const rafRef = useRef(null);

  const handleScroll = React.useCallback(() => {
    if (!scrollRef.current) return;
    
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    
    rafRef.current = requestAnimationFrame(() => {
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

      setActiveIndex((prev) => (prev !== closestIndex ? closestIndex : prev));
    });
  }, []);

  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: true,
      easing: 'ease-out-cubic',
    });
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

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
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

          {/* MOBILE MENU BUTTON & POPOUT */}
          <div className="mobile-menu-container">
            <button 
              className="w-12 h-12 bg-transparent flex items-center justify-center cursor-pointer relative z-[102] transition-transform duration-300 hover:scale-110 active:scale-95 border-none outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Menu"
            >
              <div className="relative w-8 h-8 flex items-center justify-center">
                {/* Ellipsis dots */}
                <div className={`absolute flex gap-1.5 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'}`}>
                  <span className="w-[6px] h-[6px] rounded-full bg-[#FF2A6D]"></span>
                  <span className="w-[6px] h-[6px] rounded-full bg-[#FF2A6D]"></span>
                  <span className="w-[6px] h-[6px] rounded-full bg-[#FF2A6D]"></span>
                </div>
                
                {/* X icon */}
                <div className={`absolute flex items-center justify-center transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'}`}>
                  <span className="absolute w-6 h-[3px] bg-[#FF2A6D] rounded-full rotate-45"></span>
                  <span className="absolute w-6 h-[3px] bg-[#FF2A6D] rounded-full -rotate-45"></span>
                </div>
              </div>
            </button>

            <div className={`popout-menu ${isMobileMenuOpen ? 'open' : ''}`}>
              <a href="#home" onClick={() => setIsMobileMenuOpen(false)} style={{ '--i': 1 }}>
                <span className="popout-label">Home</span>
                <i className="fa fa-home"></i>
              </a>
              <a href="#community" onClick={() => setIsMobileMenuOpen(false)} style={{ '--i': 2 }}>
                <span className="popout-label">Members</span>
                <i className="fa fa-users"></i>
              </a>
              <a href="#events" onClick={() => setIsMobileMenuOpen(false)} style={{ '--i': 3 }}>
                <span className="popout-label">Events</span>
                <i className="fa fa-calendar"></i>
              </a>
              <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} style={{ '--i': 4 }}>
                <span className="popout-label">Contact</span>
                <i className="fa fa-envelope"></i>
              </a>
            </div>
          </div>
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
              <div className="section-header" data-aos="fade-up">
                <h2>Upcoming Events</h2>
                <p>Discover our next wave of innovation and learning.</p>
              </div>
              <div className="events-preview">
                {upcomingEvents.map((upcomingEvent, index) => (
                  <article className="card event-card" key={index} data-aos="zoom-in" data-aos-delay={index * 100}>
                    <div className="img-wrapper">
                      <img src={upcomingEvent.img} alt={`Promotion for ${upcomingEvent.name}`} loading="lazy" />
                      <span className="event-date">{upcomingEvent.date}</span>
                    </div>
                    <div className="card-content">
                      <h3>{upcomingEvent.name}</h3>
                      <p>{upcomingEvent.desc}</p>
                      <br />
                      <button className="btn-upcoming">Register Now</button>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="events" className="events">
              <div className="section-header" data-aos="fade-up">
                <h2>Events</h2>
                <p>Immerse yourself in our cutting-edge sessions.</p>
              </div>
              <div className="card-container">
                {events.map((event, index) => (
                  <article className="card event-card" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                    <div className="img-wrapper">
                      <img src={event.img} alt={`Promotion for ${event.name}`} loading="lazy" />
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
              <div className="section-header" data-aos="fade-right">
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
                      <img src={member.img} alt={member.name} className="member-img" />
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
            <a href="https://github.com/dreamcoderscommunity" aria-label="Dream Coders GitHub"><i className="fa fa-github"></i></a>
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