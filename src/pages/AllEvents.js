import React, { useEffect } from "react";
import Lenis from "lenis";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "../css/welcome.css";

import Navbar from "./Navbar";
import Footer from "./Footer";
import CosmicBackground from "./CosmicBackground";
import { events, upcomingEvents } from "../Resources/data";

function AllEvents() {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000, once: false, mirror: true, easing: 'ease-out-cubic' });
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
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf); }
    rafId = requestAnimationFrame(raf);
    return () => { lenis.destroy(); cancelAnimationFrame(rafId); };
  }, []);

  const allEventsList = [...upcomingEvents, ...events];

  return (
    <div className="app">
      <div className="ambient-mesh"></div>
      
      <Navbar />

      <main>
        <div className="cosmic-zone" style={{ position: 'relative', minHeight: '100vh' }}>
          <CosmicBackground />
          <div style={{ position: 'relative', zIndex: 1, paddingTop: '120px', paddingBottom: '100px' }}>
            <section className="events" style={{ minHeight: '100vh' }}>
              <div className="section-header" data-aos="fade-up">
                <h2>All Events</h2>
                <p>Discover every detail of our past and upcoming events.</p>
              </div>
              <div className="card-container">
                {allEventsList.map((event, index) => (
                  <article className="card event-card" key={index} data-aos="fade-up" data-aos-delay={(index % 3) * 100}>
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default AllEvents;
