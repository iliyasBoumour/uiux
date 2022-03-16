import React, { useContext } from "react";
import IsConnected from "./components/NotConnectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/Login";
import Register from "./pages/register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Orders from "./pages/Orders";
import ValidateOrders from "./pages/ValidateOrders";
import { logout } from "./utils/actions/authAction";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Store } from "./utils/Store";
import jwt_decode from "jwt-decode";
function App() {
  const { state, dispatch } = useContext(Store);
  const {
    auth: { token },
    cart: { cartItems },
  } = state;
  const role = token ? jwt_decode(token.replace("Bearer ", "")).role : null;
  return (
    <Router>
      <nav style={{ display: "flex", gap: "2rem", paddingBottom: "2rem" }}>
        {!token && <Link to={"/login"}>Login</Link>}
        {!token && <Link to={"/register"}>Register</Link>}
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>Cart ({cartItems.length})</Link>
        <Link to={"/orders"}>Orders</Link>
        {role === "ROLE_ADMIN" && (
          <Link to={"/validateOrders"}>Validate orders</Link>
        )}
        {token && <button onClick={() => logout(dispatch)}>logout</button>}
      </nav>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
        <Route exact element={<IsConnected />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Route>

        <Route exact element={<ProtectedRoute />}>
          <Route path="/orders" element={<Orders />} />
        </Route>
        <Route exact element={<AdminRoute />}>
          <Route path="/validateOrders" element={<ValidateOrders />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
