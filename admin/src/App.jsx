import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";

import AddProduct from "./Components/AddProduct/AddProduct.jsx";
import ListProduct from "./Components/ListProduct/ListProduct.jsx";

const App = () => {
  return (
    <>
      <Navbar />

      <div style={{ display: "flex" }}>
        <Sidebar />

        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/listproduct" element={<ListProduct />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
