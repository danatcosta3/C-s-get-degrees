import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  return (
    <div>
      <h2 class="title">Contact Us Here </h2>
      <div class="image-container">
        <img class="icon"src="email_icon.png" alt="email icon" />
      </div>
      <p class="main">Jackson Bialecki</p> 
      <p class="emailAdjust"><a href="mailto:bialecjr@mail.uc.edu">bialecjr@mail.uc.edu</a></p>
      <p class="main">Dana Costa III </p>
      <p class="emailAdjust"><a href="mailto:costa.182@buckeyemail.osu.edu">costa182@buckeyemail.osu.edu</a></p>
      <p class="main">Alex Guller</p>
      <p class="emailAdjust"><a href="mailto:guller.4@buckeyemail.osu.edu">guller.4@buckeyemail.osu.edu</a></p>
      <p class="main">Shrey Kumar</p>
      <p class="emailAdjust"><a href="kumar.1166@buckeyemail.osu.edu">kumar.1166@buckeyemail.osu.edu</a></p>
    </div>
  );
};

export default ContactPage;
