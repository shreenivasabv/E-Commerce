import React from "react";
import "./Navbar.css";
import navlogo from "../../assets/nav-logo.svg";
import navProfile from "../../assets/nav-profile.svg";

const Navbar = () => {
  return (
    <div className="navbar">

      <div className="navbar-left">
        <img src={navlogo} className="nav-logo" alt="" />

        <div className="nav-text">
          <h2>ADMIN PANEL</h2>
          <p>SHOPPER</p>
        </div>
      </div>

      <div className="navbar-right">
        <img src={navProfile} className="nav-profile" alt="" />
        <span className="dropdown">▼</span>
      </div>

    </div>
  );
};

export default Navbar;
