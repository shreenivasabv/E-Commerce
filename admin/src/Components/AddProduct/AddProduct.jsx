import React, { useState } from "react";
import "./AddProduct.css";

const AddProduct = () => {

  const [productDetails, setProductDetails] = useState({
    name: "",
    new_price: "",
    old_price: "",
    category: "Kid",
  });

  const [image, setImage] = useState(false);

  function imageHandler(e) {
    setImage(e.target.files[0]);
  }

  function changeHandler(e) {
    setProductDetails({ 
      ...productDetails, 
      [e.target.name]: e.target.value 
    });
  }

 async function addProduct() {
  // 1️⃣ Validate image
  if (!image) {
    alert("Please upload an image first");
    return;
  }

  // 2️⃣ Validate fields
  if (!productDetails.name || !productDetails.new_price) {
    alert("Product name & price are required");
    return;
  }

  console.log("Submitting...", productDetails);

  let formData = new FormData();
  formData.append("product", image);
  formData.append("name", productDetails.name);
  formData.append("new_price", productDetails.new_price);
  formData.append("old_price", productDetails.old_price);
  formData.append("category", productDetails.category);

  try {
    const response = await fetch("http://localhost:4000/addproduct", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      alert("Product Added Successfully!");
      setImage(false);
      setProductDetails({
        name: "",
        new_price: "",
        old_price: "",
        category: "Kid",
      });
    } else {
      alert("Upload failed");
    }

  } catch (err) {
    console.log(err);
    alert("Server error — check backend");
  }
}


  return (
    <div className="addproduct">
      <h3>Product title</h3>
      <input 
        type="text" 
        name="name"
        onChange={changeHandler}
        placeholder="Type here" 
      />

      <div className="addproduct-price">
  <div>
    <h3>Price</h3>
    <input type="text" name="new_price" onChange={changeHandler} placeholder="Type here" />
  </div>

  <div>
    <h3>Offer Price</h3>
    <input type="text" name="old_price" onChange={changeHandler} placeholder="Type here" />
  </div>
</div>


      <h3>Product Category</h3>

      <select 
        name="category"
        onChange={changeHandler}
      >
        <option value="Kid">Kid</option>
        <option value="Women">Women</option>
        <option value="Men">Men</option>
      </select>

      <div className="addproduct-upload">
        <label htmlFor="file-input">
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="upload-preview"
            />
          ) : (
            <div className="upload-box">
              <span>Upload</span>
            </div>
          )}
        </label>

        <input 
          id="file-input" 
          type="file" 
          hidden 
          onChange={imageHandler}
        />
      </div>

      <button 
        className="add-btn"
        onClick={addProduct}
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
