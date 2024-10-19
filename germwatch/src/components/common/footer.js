import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} HealthMap. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
