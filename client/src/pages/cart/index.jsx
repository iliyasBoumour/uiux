import React, { useContext } from "react";
import axios from "axios";
import { Store } from "../../utils/Store";
import { add, remove, removeAll } from "../../utils/actions/cartAction";

const Index = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    auth: { token },
  } = state;
  const addOrder = async () => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const items = cartItems.map((i) => {
      return { _id: i._id, qty: i.qty };
    });
    try {
      await axios.post("/api/orders", items, config);
      removeAll(dispatch);
      alert("added !");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      alert(message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 5rem",
        gap: "3rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "3rem",
          width: "50%",
        }}
      >
        {cartItems.map((i) => (
          <div
            key={i._id}
            style={{
              width: "100%",
              display: "flex",
              gap: "3rem",
              borderBottom: "1px solid gray",
              paddingBottom: "10px",
            }}
          >
            <p>{i.title}</p>
            <input
              type="number"
              min={1}
              max={i.quantity}
              value={i.qty}
              onChange={(e) => add(dispatch, { ...i, qty: e.target.value })}
            />
            <h3>price : {i.qty * i.price}</h3>
            <button onClick={() => remove(dispatch, i._id)}>remove</button>
          </div>
        ))}
      </div>
      <div>
        <p>
          total {cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)}
        </p>
        <button onClick={addOrder}>Add order</button>
      </div>
    </div>
  );
};

export default Index;
