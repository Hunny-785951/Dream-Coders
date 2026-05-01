import React from "react";
import { upcomingEvents } from "../Resources/data";

function UpcomingEventsSection() {
  return (
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
  );
}

export default UpcomingEventsSection;
