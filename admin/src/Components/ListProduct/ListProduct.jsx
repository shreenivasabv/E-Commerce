import React, { useEffect, useState } from "react";
import "./ListProduct.css";

const ListProduct = () => {
  const [allProducts, setAllProducts] = useState([]);

  async function fetchProducts() {
    let res = await fetch("http://localhost:4000/allproduct");
    res = await res.json();
    setAllProducts(res);
  }

  async function removeProduct(id) {
    await fetch("http://localhost:4000/removeproduct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    // refresh after delete
    fetchProducts();
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="list-product">
      <h2>All Products List</h2>

      <div className="list-header">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <hr />

      {allProducts.map((item, index) => (
        <div className="list-item" key={index}>
          <img src={item.image} alt="" className="list-product-img" />

          <p>{item.name}</p>
          <p>${item.old_price}</p>
          <p>${item.new_price}</p>
          <p>{item.category}</p>

          <button
            className="remove-btn"
            onClick={() => removeProduct(item.id)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListProduct;
