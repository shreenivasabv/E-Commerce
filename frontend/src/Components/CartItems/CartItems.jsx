import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  return (
    <div className="cartitems">

      <div className="cart-items-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Remove</p>
      </div>

      <hr />

      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div className="cartitems-format" key={e.id}>
              <img className="carticon-producticon" src={e.image} alt="" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <p>{cartItems[e.id]}</p>

              <img
                className="cartitems-remove-icon"
                src={remove_icon}
                onClick={() => removeFromCart(e.id)}
                alt=""
              />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-total">

        <h2>Cart Totals</h2>

        <div className="cartitems-total-box">

          <div className="cartitems-total-row">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>

          <div className="cartitems-total-row">
            <p>Shipping Fee</p>
            <p>Free</p>
          </div>

          <div className="cartitems-total-row total">
            <p>Total</p>
            <p>${getTotalCartAmount()}</p>
          </div>

        </div>

        <button className="checkout-btn">
          PROCEED TO CHECKOUT
        </button>

        <div className="promo-box">
          <p>If you have a promo code, enter it here</p>

          <div className="promo-input">
            <input type="text" placeholder="Promo code" />
            <button>Submit</button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default CartItems;
