import React, { useState, useContext, useEffect } from "react";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Toolbar,
  Typography,
  Box,
  AppBar,
  Badge,
  Button,
  MenuItem,
  Menu as MuiMenu,
} from "@mui/material";
import jwt_decode from "jwt-decode";
import { logout } from "../../utils/actions/authAction";
import { Burger, Menu, MyLink } from "./style";
import { Store } from "../../utils/Store";
import { SimpleLink } from "../SimpleLink";
import LanguageIcon from "@mui/icons-material/Language";
const items = [
  { to: "/", name: "Home" },
  { to: "/cart", name: "Cart" },
  { to: "/orders", name: "Orders" },
];
const Index = () => {
  const [isopen, setIsopen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentUser, setcurrentUser] = useState(null);
  const [nav, setNav] = useState(items);
  const open = Boolean(anchorEl);
  const { state, dispatch } = useContext(Store);
  const {
    auth: { token },
    cart: { cartItems },
  } = state;
  useEffect(() => {
    const user = token ? jwt_decode(token.replace("Bearer ", "")) : null;
    setcurrentUser(user);
    if (user && user.role === "ROLE_ADMIN") {
      setNav([...nav, { to: "/validateOrders", name: "Validate Orders" }]);
    } else {
      setNav(items);
    }
  }, [token]);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const signOut = () => {
    logout(dispatch);
    setAnchorEl(null);
  };
  return (
    <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ position: "initial", gap: "2rem" }}>
          <Typography
            variant="h5"
            component="h1"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            Marque
          </Typography>
          <Menu open={isopen}>
            {nav.map((item, i) => (
              <MyLink key={i} to={item.to}>
                <Typography variant="h6" conponent="p">
                  {item.name}
                </Typography>
              </MyLink>
            ))}
          </Menu>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "end",
              gap: "3vw",
              alignItems: "center",
            }}
          >
            <div>
              <Button
                id="basic-button"
                color="text"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <LanguageIcon />
              </Button>
              <MuiMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem>FR</MenuItem>
                <MenuItem>EN</MenuItem>
              </MuiMenu>
            </div>
            {currentUser ? (
              <div>
                <Button
                  id="basic-button"
                  color="text"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                >
                  {currentUser.lname}
                </Button>
                <MuiMenu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </MuiMenu>
              </div>
            ) : (
              <SimpleLink to="/login">
                <PersonOutlineIcon sx={{ cursor: "pointer" }} />
              </SimpleLink>
            )}
            <SimpleLink to="/cart">
              <Badge badgeContent={cartItems.length} color="secondary">
                <WorkOutlineIcon sx={{ cursor: "pointer" }} />
              </Badge>
            </SimpleLink>
            <Burger open={isopen} onClick={() => setIsopen(!isopen)}>
              <div></div>
            </Burger>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Index;
