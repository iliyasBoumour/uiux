import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Store } from "../../utils/Store";
import { add, remove, removeAll } from "../../utils/actions/cartAction";

const Index = () => {
  const [adress, setAdress] = useState("");
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
    auth: { token },
  } = state;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const addOrder = async () => {
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
  const updateAdress = async () => {
    try {
      await axios.put("/api/auth/updateUser", { adress }, config);
      alert("Adress updated");
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      alert(message);
    }
  };
  useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/profile", config);
        setAdress(data.adress);
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        console.log(message);
        alert(message);
      }
    };
    getUser();
  }, []);

  return (
    <>
      {cartItems.length === 0 ? (
        <p>
          cart is empty <Link to={"/"}>go shopping</Link>
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 5rem",
            gap: "3rem",
          }}
        >
          <table
            style={{
              width: "80%",
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            {cartItems.map((i) => (
              <tr key={i._id}>
                <td>{i.title}</td>
                <td>
                  <input
                    type="number"
                    min={1}
                    max={i.quantity}
                    value={i.qty}
                    onChange={(e) =>
                      add(dispatch, { ...i, qty: e.target.value })
                    }
                  />
                </td>
                <td>
                  <strong>${i.qty * i.price}</strong>
                </td>
                <td>
                  <button onClick={() => remove(dispatch, i._id)}>
                    remove
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <div
            style={{
              width: "20%",
              padding: ".5rem",
              border: "1px solid black",
            }}
          >
            <h2>Number items : {cartItems.reduce((a, c) => a + c.qty, 0)}</h2>
            <h3>
              total : $
              {cartItems.reduce((a, c) => a + c.qty * c.price, 0).toFixed(2)}
            </h3>
            <button onClick={addOrder}>Add order</button>
          </div>

          <div
            style={{
              width: "20%",
              padding: ".5rem",
              border: "1px solid black",
            }}
          >
            <h3>Adress</h3>
            <input value={adress} onChange={(e) => setAdress(e.target.value)} />
            <button onClick={updateAdress}>Update</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
