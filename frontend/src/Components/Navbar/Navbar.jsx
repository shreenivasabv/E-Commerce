import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const  {getTotalCartAmount}=useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>SHOPPER</p>
      </div>

      <ul className="nav-menu">
        <li onClick={() => setMenu("shop")}>
          <Link to="/">Shop</Link>
          {menu === "shop" && <hr />}
        </li>

        <li onClick={() => setMenu("mens")}>
          <Link to="/mens">Mens</Link>
          {menu === "mens" && <hr />}
        </li>

        <li onClick={() => setMenu("womens")}>
          <Link to="/womens">Womens</Link>
          {menu === "womens" && <hr />}
        </li>

        <li onClick={() => setMenu("kids")}>
          <Link to="/kids">Kids</Link>
          {menu === "kids" && <hr />}
        </li>
      </ul>

      <div className="nav-login-cart">
        {/* LOGIN LINK */}
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>

        {/* CART LINK */}
        <Link to="/cart">
          <div className="nav-cart-wrapper">
            <img src={cart_icon} alt="cart_icon" />
            <div className="nav-cart-count">{getTotalCartAmount}</div>
          </div>
          
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
