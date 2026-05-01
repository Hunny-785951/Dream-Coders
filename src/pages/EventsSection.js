import React from "react";
import { events } from "../Resources/data";

function EventsSection() {
  return (
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
  );
}

export default EventsSection;
