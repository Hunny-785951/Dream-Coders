import React, { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import ParticleCloud from "../ParticleCloud";
import "../css/welcome.css";

import memberImage1 from "../Resources/image1.jpeg";
import memberImage2 from "../Resources/image2.jpeg";
import memberImage3 from "../Resources/image3.jpeg";
import humanicon from "../Resources/human-icon.avif";

function Welcome() {
  // 1. State to track when the 3D cloud animation finishes
  const [isCloudReady, setIsCloudReady] = useState(false);

  // 2. Coverflow State & Logic
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    
    // Find the exact center of the visible scroll area
    const centerPosition = container.scrollLeft + container.offsetWidth / 2;

    const cards = container.children;
    let closestIndex = 0;
    let minDistance = Infinity;

    // Loop through cards to find which one is closest to the center
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

  // Trigger once on mount to set initial active card
  useEffect(() => {
    handleScroll();
  }, []);

  // 3. Initialize Professional Smooth Scrolling on mount
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth, premium easing
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

    // Cleanup to prevent memory leaks if component unmounts
    return () => lenis.destroy(); 
  }, []);

  const events = [
    {
      name: "Hackathon Night",
      img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
      desc: "24-hour coding competition for next-gen developers.",
      date: "OCT 24, 2026"
    },
    {
      name: "Web Dev Workshop",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
      desc: "Master modern, fluid interfaces and frameworks.",
      date: "NOV 12, 2026"
    },
    {
      name: "AI Bootcamp",
      img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
      desc: "Deep dive into neural networks and machine learning.",
      date: "DEC 05, 2026"
    }
  ];

  const members = [
    {
      name: "Piyush Patel",
      role: "Founder & Leader",
      desc: "Crafting fluid, pixel-perfect experiences.",
      img: memberImage2,
      linkedin: "https://www.linkedin.com/in/piyush-patel1319/",
      mail:"mailto:"
    },
    {
      name: "Raj Soni",
      role: "Team Lead",
      desc: "Connecting top-tier talent globally.",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/raj-soni3300",
      mail:"mailto:"
    },
    {
      name: "Himesh Solanki",
      role: "Developer",
      desc: "Architecting the future of scalable code.",
      img: memberImage1,
      linkedin: "https://www.linkedin.com/in/himesh-s5847",
      github:"https://github.com/Hunny-785951",
      mail:"mailto:himeshs159587@gmail.com"
    },
    
    {
      name: "Neel Patel",
      role: "Role",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/patel-neel-76767a250",
      mail:"mailto:"
    },
    {
      name: "Harsh Devre",
      role: "Technical Lead",
      desc: "Crafting fluid, pixel-perfect experiences.",
      img: memberImage3,
      linkedin:"https://www.linkedin.com/in/er-harsh-d-b416a227b",
      mail:"mailto:"
    },
    {
      name: "Mann Dosi",
      role: "Core Team Member",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/mann-dosi-178767343",
      mail:"mailto:",
    },
    {
      name: "Rutva Pandya",
      role: "Technical & Event Management",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/rutva-pandya-214492341",
      mail:"mailto:"
    },
    {
      name: "Jaimit Mokani",
      role: "Role",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/jaimit-mokani-8872b43a3",
      mail:"mailto:"
    },
    {
      name: "Tanvi Parmar",
      role: "Designer",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/tanvi-parmar-3433883a8",
      mail:"mailto:"
    },
    {
      name: "Mahi Patel",
      role: "Designer",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/mahiii-patel-8659a4374/",
      mail:"mailto:"
    },
    {
      name: "Prince Patel",
      role: "Social Media Manager",
      desc: "Tag Quote",
      img: humanicon,
      linkedin: "https://www.linkedin.com/in/patelprince1/",
      mail:"mailto:"
    },
  ];

  return (
    <div className="app">
      <div className="ambient-mesh"></div>

      <header className="navbar-container">
        <nav className="navbar">
          <div className="brand">
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
        {/* --- HERO SECTION --- */}
        <section id="home" className="welcome hero-section" style={{ position: 'relative', overflow: 'hidden' }}>
          
          <div className="hero-background" style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <ParticleCloud onCloudReady={() => setIsCloudReady(true)} />
          </div>

          <div 
            className="hero-content animated-reveal" 
            style={{ 
              position: 'relative', 
              zIndex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
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
                <div className="hero-actions">
                  <button className="btn-primary">Explore Ecosystem</button>
                  <button className="btn-secondary">Join Community</button>
                </div>
             </div>
          </div>
        </section>

        {/* --- EVENTS SECTION --- */}
        <section id="events" className="events">
          <div className="section-header">
            <h2>Upcoming Events</h2>
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

        {/* --- COMMUNITY SECTION --- */}
        <section id="community" className="community">
          <div className="section-header">
            <h2>Members</h2>
            <p>Meet the minds behind the architecture.</p>
          </div>
          
          <div className="card-container" ref={scrollRef} onScroll={handleScroll}>
            {members.map((member, index) => {
              
              // Calculate 3D positioning classes
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
      </main>

      {/* --- FOOTER --- */}
      <footer>
        <div className="footer-content" id="contact">
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