import React, { useEffect, useState, useRef } from "react";
import "../css/welcome.css";
import "../css/Hero.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { events } from "../Resources/data";

function EventPage({ onNavigate }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollPos = scrollRef.current.scrollLeft;
      const cardWidth = 324; // 300px card + 24px gap
      const newIndex = Math.round(scrollPos / cardWidth);
      if (newIndex !== activeImage) setActiveImage(newIndex);
    }
  };

  const scrollToImage = (index) => {
    if (scrollRef.current) {
      const cardWidth = 324;
      scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden';
      setActiveImage(0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedEvent]);

  const allEvents = events;

  return (
    <div className="app" style={{ backgroundColor: '#050505', minHeight: '100vh' }}>
      <Navbar onNavigate={onNavigate} />

      <main>
        <div style={{ position: 'relative', minHeight: '100vh', paddingTop: '150px', paddingBottom: '100px' }}>

          <div className="events-template-section" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '0 2rem' }}>

            <div className="section-header" data-aos="fade-down">
              <span className="badge">COMMUNITY</span>
              <h2>Our <span className="gradient-text">Events</span></h2>
              <p>Discover past and upcoming sessions happening at Dream Coders.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              {allEvents.map((event, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} data-aos={isEven ? "fade-right" : "fade-left"} style={{
                    display: 'flex',
                    gap: '3rem',
                    alignItems: 'stretch',
                    flexWrap: 'wrap',
                    flexDirection: isEven ? 'row' : 'row-reverse'
                  }}>

                    {/* Image Side - Styled as a card for glassmorphism and hover effects */}
                    <div className="card" style={{
                      flex: '0 0 320px',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      padding: 0,
                      minHeight: '400px',
                      display: 'flex',
                      position: 'relative'
                    }}>
                      <div className="img-wrapper" style={{ height: '100%', width: '100%' }}>
                        {event.img ? (
                          <img src={event.img} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ color: 'var(--text-primary)', padding: '2rem' }}>Event Image</span>
                        )}
                        <span className="event-date">{event.date}</span>
                      </div>
                    </div>

                    {/* Text Side */}
                    <div style={{
                      flex: '1',
                      display: 'flex',
                      flexDirection: 'column',
                      minWidth: '300px',
                      alignItems: isEven ? 'flex-start' : 'flex-end',
                      textAlign: isEven ? 'left' : 'right'
                    }}>

                      {/* Title above box */}
                      <h2 className="gradient-text" style={{
                        fontSize: '2rem',
                        marginBottom: '0.8rem',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '600'
                      }}>
                        {event.name}
                      </h2>

                      {/* Dark glassmorphism container using the site's .card class */}
                      <div className="card" style={{
                        padding: '3rem',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        flexGrow: 1,
                        width: '100%'
                      }}>
                        <p style={{
                          color: 'var(--text-secondary)',
                          fontSize: '1.05rem',
                          lineHeight: '1.6',
                          fontFamily: 'var(--font-body)'
                        }}>
                          {event.desc}
                        </p>

                        <button className="btn-upcoming" onClick={() => setSelectedEvent(event)} style={{
                          alignSelf: isEven ? 'flex-start' : 'flex-end',
                          marginTop: '2.5rem',
                          width: 'auto'
                        }}>
                          Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </main>

      {/* Modal Styles */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalPop {
          from { transform: scale(0.95) translateY(10px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        .modal-overlay {
          animation: modalFadeIn 0.3s ease-out forwards;
        }
        .modal-box {
          animation: modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .modal-close-btn {
          color: var(--text-secondary);
        }
        .modal-close-btn:hover {
          color: var(--accent-primary);
          transform: rotate(90deg);
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* Modal Popup */}
      {selectedEvent && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(10, 10, 15, 0.8)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={() => setSelectedEvent(null)}>

          <div className="card modal-box" style={{
            width: '95%',
            maxWidth: '1400px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '3rem',
            position: 'relative',
            cursor: 'default',
            backgroundColor: 'rgba(20, 20, 28, 0.85)',
            border: '1px solid var(--glass-border)',
            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.7), inset 0 0 40px rgba(139, 92, 246, 0.05)',
            borderRadius: '24px'
          }} onClick={e => e.stopPropagation()}>

            {/* Close Button */}
            <button className="modal-close-btn" onClick={() => setSelectedEvent(null)} style={{
              position: 'absolute',
              top: '1.5rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              fontSize: '2.5rem',
              cursor: 'pointer',
              zIndex: 10,
              lineHeight: 1,
              transition: 'all 0.3s ease'
            }}>
              &times;
            </button>

            {/* Top Box: Event Description */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '2.5rem',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <h3 style={{ marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
                <span className="gradient-text">Event Description</span>
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontFamily: 'var(--font-body)', fontSize: '1.05rem' }}>
                {selectedEvent.desc}
              </p>
            </div>

            {/* Bottom Box: Event Images */}
            <div>
              <h3 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>
                <span className="gradient-text">Event Images</span>
              </h3>

              {/* Scrollable Container */}
              <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="hide-scrollbar"
                style={{
                  display: 'flex',
                  gap: '1.5rem',
                  overflowX: 'auto',
                  scrollSnapType: 'x mandatory',
                  paddingBottom: '1rem',
                  scrollbarWidth: 'none', // Firefox
                  msOverflowStyle: 'none' // IE and Edge
                }}>
                {[1, 2, 3, 4, 5].map((num, i) => (
                  <div key={num} className="img-wrapper" style={{
                    flex: '0 0 300px',
                    scrollSnapAlign: 'start',
                    borderRadius: '16px',
                    height: '250px',
                    border: '1px solid rgba(255,255,255,0.05)',
                    overflow: 'hidden'
                  }}>
                    {selectedEvent.img ? (
                      <img src={selectedEvent.img} alt={`Event shot ${num}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.02)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-body)' }}>Event Image</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Dotted Navigation */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '1.5rem'
              }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      onClick={() => scrollToImage(i)}
                      style={{
                        width: activeImage === i ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '4px',
                        backgroundColor: activeImage === i ? 'var(--accent-primary)' : 'rgba(255,255,255,0.2)',
                        transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                        cursor: 'pointer',
                        boxShadow: activeImage === i ? '0 0 10px rgba(139, 92, 246, 0.5)' : 'none'
                      }} />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default EventPage;
