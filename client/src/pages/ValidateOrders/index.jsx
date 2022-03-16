import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Store } from "../../utils/Store";

const index = () => {
  const [orders, setOrders] = useState([]);
  const { state } = useContext(Store);
  const {
    auth: { token },
  } = state;
  const config = {
    headers: {
      Authorization: token,
    },
  };
  useEffect(() => {
    const getOrders = async () => {
      try {
        const { data } = await axios.get("/api/orders/valid", config);
        setOrders(data);
      } catch (error) {
        alert(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        );
      }
    };
    getOrders();
  }, []);

  const validateOrder = async (orderId) => {
    try {
      await axios.put(`/api/orders/valid`, { orderId }, config);
      setOrders(orders.filter((o) => o._id !== orderId));
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order id</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.valid ? "validated" : "pending"}</td>
              <td>
                <button onClick={() => validateOrder(o._id)}>Validate</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default index;
