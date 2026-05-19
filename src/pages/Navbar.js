import React, { useState } from "react";
import brandLogo from "../Resources/logo.png";

function Navbar({ onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (e, page, hash) => {
    if (onNavigate && page) {
      e.preventDefault();
      onNavigate(page);
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="navbar-container">
      <nav className="navbar">
        <div className="brand">
          <img src={brandLogo} alt="Dream Coders Logo" className="brand-logo" />
          <h2>DREAM <span>CODERS</span></h2>
        </div>
        <ul className="nav-links">
          <li><a href="#home" onClick={(e) => handleNavClick(e, 'welcome', '#home')}>Home</a></li>
          <li><a href="#community" onClick={(e) => handleNavClick(e, 'welcome', '#community')}>Members</a></li>
          <li><a href="#events" onClick={(e) => handleNavClick(e, 'events', null)}>All Events</a></li>
          <li><a href="#contact" onClick={(e) => handleNavClick(e, 'welcome', '#contact')}>Contact</a></li>
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
            <a href="#home" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'welcome', '#home'); }} style={{ '--i': 1 }}>
              <span className="popout-label">Home</span>
              <i className="fa fa-home"></i>
            </a>
            <a href="#community" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'welcome', '#community'); }} style={{ '--i': 2 }}>
              <span className="popout-label">Members</span>
              <i className="fa fa-users"></i>
            </a>
            <a href="#events" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'events', null); }} style={{ '--i': 3 }}>
              <span className="popout-label">All Events</span>
              <i className="fa fa-calendar"></i>
            </a>
            <a href="#contact" onClick={(e) => { setIsMobileMenuOpen(false); handleNavClick(e, 'welcome', '#contact'); }} style={{ '--i': 4 }}>
              <span className="popout-label">Contact</span>
              <i className="fa fa-envelope"></i>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
