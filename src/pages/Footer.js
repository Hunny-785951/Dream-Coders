import React from "react";

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h3>DREAM <span>CODERS</span></h3>
        <p>Elevating digital experiences.</p>
        <div className="footer-icons">
          <a href="https://www.linkedin.com/company/dream-coderscommunity/" aria-label="Dream Coders LinkedIn"><i className="fa fa-linkedin"></i></a>
          <a href="https://github.com/dreamcoderscommunity" aria-label="Dream Coders GitHub"><i className="fa fa-github"></i></a>
          <a href="https://www.instagram.com/dreamcoderscommunity/" aria-label="Dream Coders Instagram"><i className="fa fa-instagram"></i></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Dream Coders. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
