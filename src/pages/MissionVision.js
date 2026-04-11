import React from "react";
import "../css/MissionVision.css"; // Or add to your existing CSS file

function MissionVision() {
  const cards = [
    {
      id: 1,
      icon: "fa-rocket",
      title: "Our Mission",
      desc: "To empower developers at every level — from beginners to experts — to build meaningful projects, sharpen their skills, and connect with like-minded innovators worldwide."
    },
    {
      id: 2,
      icon: "fa-eye",
      title: "Our Vision",
      desc: "A world where every aspiring developer has access to mentorship, resources, and a supportive community — turning ambitious dreams into real-world impact."
    },
    {
      id: 3,
      icon: "fa-heart",
      title: "Our Values",
      desc: "Collaboration over competition. Learning over perfection. Inclusion over exclusivity. We grow together — or not at all."
    }
  ];

  const tags = [
    { label: "Open Source", icon: "fa-code" },
    { label: "Collaboration", icon: "fa-users" },
    { label: "Mentorship", icon: "fa-graduation-cap" },
    { label: "Innovation", icon: "fa-lightbulb-o" },
    { label: "Inclusivity", icon: "fa-globe" },
    { label: "Growth", icon: "fa-leaf" }
  ];

  return (
    <section id="purpose" className="purpose-section">
      {/* --- Header Area --- */}
      <div className="purpose-header">
        <span className="purpose-badge">OUR PURPOSE</span>
        <h2>Mission & <span>Vision</span></h2>
        <p>
          We believe the best code is written together. Dream Coders exists to foster a 
          collaborative, inclusive, and innovation-driven developer community.
        </p>
      </div>

      {/* --- 3-Up Card Grid --- */}
      <div className="purpose-grid">
        {cards.map((card) => (
          <article className="purpose-card" key={card.id}>
            <div className="card-glow-border"></div>
            <div className="icon-wrapper">
              <i className={`fa ${card.icon}`}></i>
            </div>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </article>
        ))}
      </div>

      {/* --- Footer Tags --- */}
      <div className="purpose-tags">
        {tags.map((tag, index) => (
          <div className="tag-pill" key={index}>
            <i className={`fa ${tag.icon}`}></i>
            <span>{tag.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MissionVision;   