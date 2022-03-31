import React, { useContext } from "react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./utils/theme";
import Navbar from "./components/Navbar";
import IsConnected from "./components/NotConnectedRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import Login from "./pages/login";
import Register from "./pages/register";
import Cart from "./pages/cart";
import Home from "./pages/home";
import Orders from "./pages/Orders";
import ValidateOrders from "./pages/ValidateOrders";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <SnackbarProvider
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      dense
      maxSnack={1}
      preventDuplicate
    >
      <ThemeProvider theme={theme}>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <Router>
            <Navbar />
            <Box marginTop="64px" width="100%" overflow="hidden">
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
            </Box>
          </Router>
        </StyledEngineProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}

export default App;
