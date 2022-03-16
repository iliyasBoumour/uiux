import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../utils/Store";
import axios from "axios";

const Index = () => {
  const [orders, setOrders] = useState([]);
  const { state } = useContext(Store);
  const {
    auth: { token },
  } = state;
  useEffect(() => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const getOrders = async () => {
      const { data } = await axios.get("/api/orders", config);
      setOrders(data);
    };
    getOrders();
  }, []);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Order id</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td>{o._id}</td>
              <td>{o.valid ? "validated" : "pending"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
