import React, { useContext } from "react";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Home from "./pages/home";
import IsAuth from "./components/isAuth";
import { Link } from "react-router-dom";
import { logout } from "./utils/actions/authAction";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Store } from "./utils/Store";
function App() {
  const { state, dispatch } = useContext(Store);
  const {
    auth: { token },
  } = state;
  return (
    <Router>
      <nav style={{ display: "flex", gap: "2rem", paddingBottom: "2rem" }}>
        {!token && <Link to={"/login"}>Login</Link>}
        {!token && <Link to={"/register"}>Register</Link>}
        <Link to={"/"}>Home</Link>
        <Link to={"/cart"}>Cart</Link>
        {token && <button onClick={() => logout(dispatch)}>logout</button>}
      </nav>
      <Routes>
        <Route exact element={<IsAuth needAuth={false} path="/login" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" exact element={<Register />} />
        </Route>
        <Route exact path="/" element={<Home />} />
        <Route path="/cart" exact element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
