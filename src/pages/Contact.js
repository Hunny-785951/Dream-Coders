import React from 'react';
import '../css/Contact.css';

function Contact() {
  return (
    <section id="contact" className="contact-section">
      {/* Section Header */}
      <div className="section-header">
        <span className="purpose-badge">GET INVOLVED</span>
        <h2>Contact & <span className="gradient-text">Collaborate</span></h2>
        <p>Ready to join, collaborate, or partner with us? We'd love to hear from you.</p>
      </div>

      <div className="contact-container">
        
        {/* LEFT COLUMN: Info & Links */}
        <div className="contact-info">
          <h3>Let's Build Together</h3>
          <p className="contact-desc">
            Whether you're a seasoned developer, a curious beginner, or an organization looking to partner — there's a place for you in Dream Coders.
          </p>

          <div className="contact-methods">
            <div className="method-item">
              <div className="method-icon">
                <i className="fa fa-envelope"></i>
              </div>
              <div className="method-text">
                <h4>Email Us</h4>
                <p>hello@dreamcoders.dev</p>
              </div>
            </div>

            <div className="method-item">
              <div className="method-icon">
                <i className="fa fa-comments"></i> {/* Using comments as a generic discord/chat fallback */}
              </div>
              <div className="method-text">
                <h4>Join Discord</h4>
                <p>discord.gg/dreamcoders</p>
              </div>
            </div>

            <div className="method-item">
              <div className="method-icon">
                <i className="fa fa-github"></i>
              </div>
              <div className="method-text">
                <h4>Contribute</h4>
                <p>github.com/dreamcoders</p>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: The Form */}
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
            </div>

            <div className="form-group">
              <label>I'm interested in...</label>
              <select required>
                <option value="" disabled selected>Select a purpose</option>
                <option value="join">Joining the Community</option>
                <option value="collaborate">Project Collaboration</option>
                <option value="partner">Partnership/Sponsorship</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="5" placeholder="Tell us about yourself or your proposal..." required></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Send Message <i className="fa fa-paper-plane"></i>
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;