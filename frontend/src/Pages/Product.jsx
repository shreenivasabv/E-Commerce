import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import Productdisplay from "../Components/ProductDisplay/Productdisplay";
import DescriptionBox from "../Components/Description/DescriptionBox";
import RelatedProducts from "../Components/RelatedProduct/RelatedProduct";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  const product = all_product.find(
    (e) => e.id === Number(productId)
  );

  if (!product) {
    return <h2 style={{ textAlign: "center" }}>Loading product...</h2>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <Productdisplay product={product} />
      <DescriptionBox/>
      <RelatedProducts/>  
    </div>
  );
};

export default Product;
