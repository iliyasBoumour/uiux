import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home"
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
      <Router>
        <nav style={{ display: "flex", gap: "2rem", paddingBottom: "2rem" }}>
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
          <Link to={"/"}>Home</Link>
        </nav>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" exact element={<Register />} />
        </Routes>
      </Router>
  );
}

export default App;