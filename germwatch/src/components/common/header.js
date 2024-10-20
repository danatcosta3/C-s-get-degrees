import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <header>
      <nav class="navbar">
        <Link to="/" className="logo">
          GermWatch
          <img
            className="icon"
            src={"GermWatchLogo4.png"}
            alt="GermWatch Logo"
          />
        </Link>

        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
