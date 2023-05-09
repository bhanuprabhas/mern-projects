import React from 'react';
import "./footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faYoutube, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  return (
    <footer>
<div class="footer">
<div class="footer-row">
    <a href="#"><i><FontAwesomeIcon icon={faFacebookF} className="icon" /></i></a>
    <a href="#"><i><FontAwesomeIcon icon={faInstagram} className="icon" /></i></a>
    <a href="#"><i><FontAwesomeIcon icon={faYoutube} className="icon" /></i></a>
    <a href="#"><i><FontAwesomeIcon icon={faTwitter} className="icon" /></i></a>
</div>

<div class="footer-row">
<ul>
<li><a href="#">Contact us</a></li>
<li><a href="#">Our Services</a></li>
<li><a href="#">Privacy Policy</a></li>
<li><a href="#">Terms & Conditions</a></li>
<li><a href="#">Career</a></li>
</ul>
</div>

<div class="footer-row">
Dashboard Copyright © 2023 K-HUB - All rights reserved || Designed By: Frontend dev 
</div>
</div>
</footer>
  );
}

export default Footer;
