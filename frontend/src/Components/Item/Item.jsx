import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  // Normalize prices so both styles work
  const newPrice = props.new_Price ?? props.new_price ?? "-";
  const oldPrice = props.old_Price ?? props.old_price ?? "-";

  console.log("ITEM:", {
    id: props.id,
    name: props.name,
    newPrice,
    oldPrice,
    raw: props
  });

  return (
    <div className="item">
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name} />
      </Link>

      <p>{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">${newPrice}</div>
        <div className="item-price-old">${oldPrice}</div>
      </div>
    </div>
  );
};

export default Item;
