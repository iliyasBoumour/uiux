import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../../components/product";
const Index = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    };
    getProducts();
  });

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1rem",
      }}
    >
      {products.map((p) => (
        <Product {...p} key={p._id} />
      ))}
    </div>
  );
};

export default Index;
