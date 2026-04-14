import React, {useState} from 'react';
import '../css/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    interest: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      // REPLACE THIS URL with your Google Apps Script URL
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwpiSVmmhFdRTZS1EbXuQV_z8x4oxAaSrAnURuef5WAfZhWC7ywc3OrPRiwM0IdhODD/exec';
      
      await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(formData),
      });

      setStatus('Message Sent Successfully!');
      setFormData({ fullName: '', email: '', interest: '', message: '' }); // Reset form
    } catch (error) {
      setStatus('Error sending message. Please try again.');
    }
  };
  
  
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
          <form className="contact-form" onSubmit={handleSubmit}>
            
            <div className="form-row">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                placeholder="Your name" required 
              />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="your@email.com" required 
              />
              </div>
            </div>

            <div className="form-group">
              <label>I'm interested in...</label>
              <select 
              value={formData.interest}
              onChange={(e) => setFormData({...formData, interest: e.target.value})}
              required
            >
                <option value="" disabled selected>Select a purpose</option>
                <option value="join">Joining the Community</option>
                <option value="collaborate">Project Collaboration</option>
                <option value="partner">Partnership/Sponsorship</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea 
              rows="5" 
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              placeholder="Tell us about yourself..." required
            ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              {status ? status : "Send Message"} <i className="fa fa-paper-plane"></i>
            </button>
            
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;