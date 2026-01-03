import React from "react";
import "./Hero.css";

import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_image from "../Assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">

      {/* LEFT */}
      <div className="hero-left">
        <h2>New Arrivals Only</h2>

        <div className="hand-icon">
          <p>New</p>
          <img src={hand_icon} alt="hand waving" />
        </div>

        <p>Collections</p>
        <p>For Everyone</p>

        <div className="hero-latest-btn">
          <span>Latest Collection</span>
          <img src={arrow_icon} alt="arrow" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="hero-right">
        <img src={hero_image} alt="model" />
      </div>
    </div>
  );
};

export default Hero;
