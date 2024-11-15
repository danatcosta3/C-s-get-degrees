import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about">
      <h2 className="about-title">Stay Informed About Health Trends in Your Area</h2>
      <p className="about-description">
        GermWatch is your go-to tool for staying updated on potential health risks such as diseases, illnesses, and other health concerns in your area.
      </p>

      <h3 className="about-textHeader">Our Mission</h3>
      <p className="about-text">
        We are a team of four passionate computer science students, driven by our commitment to promoting health and safety. Upon noticing how rapidly illnesses can spread across campuses and communities, we set out to build GermWatch as a way to raise awareness and help people stay informed.
      </p>

      <h3 className="about-textHeader">How It Works</h3>
      <p className="about-text">
        Simply enter your location, and GermWatch will provide a comprehensive index of local health concerns. You can select different health concerns and diseases to change what you see on the map.
      </p>
    </div>
  );
};

export default AboutPage;
