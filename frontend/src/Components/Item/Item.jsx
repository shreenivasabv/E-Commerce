import React from "react";
import { Link } from "react-router-dom";

const Item = (props) => {
  console.log("ITEM:", props);
  return (
    <div className="item">
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name} />
      </Link>

      <p>{props.name}</p>

      <div className="item-prices">
        <div className="item-price-new">${props.new_Price}</div>
        <div className="item-price-old">${props.old_Price}</div>
      </div>
    </div>
  );
};

export default Item;
