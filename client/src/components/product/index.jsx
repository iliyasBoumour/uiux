import React, { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { add } from "../../utils/actions/cartAction";
const index = (product) => {
  const { title, description, quantity, price } = product;
  const [qty, setQty] = useState(1);
  const { dispatch } = useContext(Store);
  const addToCart = () => {
    add(dispatch, { ...product, qty });
    alert("added to cart!");
  };
  return (
    <div
      style={{ padding: "4rem", border: "solid 1px black", minWidth: "200px" }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <p>quantity : {quantity}</p>
      <h4>${price}</h4>
      <input
        type="number"
        min={1}
        max={quantity}
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      />
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
};

export default index;
