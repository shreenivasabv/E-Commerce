import React, { createContext, useEffect, useState } from "react";
import localProducts from "../Components/Assets/all_product";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
  let cart = {};
  for (let i = 1; i <= 300; i++) cart[i] = 0;
  return cart;
};

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/allproduct");
        let backend = await res.json();

        // normalize backend price so it matches UI
        backend = backend.map(p => ({
          ...p,
          new_Price: p.new_price,
          old_Price: p.old_price
        }));

        setAllProduct([...localProducts, ...backend]);
      } catch (err) {
        console.log("Error loading products:", err);
        setAllProduct(localProducts);
      }
    };

    loadProducts();
  }, []);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let total = 0;

    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const product = all_product.find(
          (product) => product.id === Number(item)
        );

        if (product) total += product.new_Price * cartItems[item];
      }
    }

    return total;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
