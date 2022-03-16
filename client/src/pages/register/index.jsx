import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Index = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  let navigate = useNavigate();
  const signup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/auth/register`, {
        fname,
        lname,
        email,
        password,
        adress,
      });
      alert("User created please login !");
      return navigate("/login");
    } catch (error) {
      alert(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      );
    }
  };

  return (
    <div style={{ width: "300px" }}>
      <form
        onSubmit={signup}
        style={{ display: "flex", flexDirection: "column", gap: ".5rem" }}
      >
        <label>First Name </label>
        <input
          type="text"
          required
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <label>Last Name </label>
        <input
          type="text"
          required
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <label>Email </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Adress </label>
        <input
          type="text"
          required
          value={adress}
          onChange={(e) => setAdress(e.target.value)}
        />
        <label>Password </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Index;
