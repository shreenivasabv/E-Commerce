import React from "react";
import "./Productdisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";

const Productdisplay = (props) => {
  const { product } = props;

  return (
    <div className="product-display">

      <div className="display-left">
        <div className="productdisplay-img-list">
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
          <img src={product.image} alt="" />
        </div>

        <div className="productdisplay-img">
          <img
            className="product-display-main-image"
            src={product.image}
            alt=""
          />
        </div>
      </div>

      <div className="display-right">
        <h1>{product.name}</h1>

        <div className="productdisplay-right-star">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>

        <p className="productdisplay-right-price">
          ${product.new_price} <span>${product.old_price}</span>
        </p>

        <p className="productdisplay-right-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <div className="productdisplay-right-size">
            <h1>Select Size</h1>

  <div className="productdisplay-right-sizes">
            <div>S</div>
             <div>M</div>
             <div>L</div>
             <div>XL</div>
             <div>XXL</div>
  </div>
        </div>

        <button>ADD TO CART</button>

<p className="productdisplay-right-category">
  <span>Category :</span> {product.category}
</p>
      </div>

    </div>
  );
};

export default Productdisplay;
