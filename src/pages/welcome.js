import React, { useEffect } from "react";
import Lenis from "lenis";
import "../css/welcome.css";
import MissionVision from "./MissionVision";
import Hero from "./Hero";
import Contact from "./Contact";
import Navbar from "./Navbar";
import CosmicBackground from "./CosmicBackground";
import UpcomingEventsSection from "./UpcomingEventsSection";
import EventsSection from "./EventsSection";
import MembersSection from "./MembersSection";
import Footer from "./Footer";
import AOS from 'aos';
import 'aos/dist/aos.css';

function Welcome({ onNavigate }) {
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

      <Navbar onNavigate={onNavigate} />

      <main>
        <div className="hero-section" id="home">
          <Hero />
        </div>

        <div className="cosmic-zone" style={{ position: 'relative' }}>

          <CosmicBackground />

          <div style={{ position: 'relative', zIndex: 1, marginTop: '-100vh' }}>

            <MissionVision />

            <UpcomingEventsSection />

            <EventsSection />

            <MembersSection />

            <Contact />

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Welcome;