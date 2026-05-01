import React, { useState, useEffect, useRef } from "react";
import { members } from "../Resources/data";

function MembersSection() {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
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
  );
}

export default MembersSection;
