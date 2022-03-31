import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Store } from "../../utils/Store";
import Dialog from "../../components/Dialog";
import { add, remove, removeAll } from "../../utils/actions/cartAction";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  Card,
  List,
  ListItem,
  Button,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";
import { useSnackbar } from "notistack";

const Index = () => {
  const [adress, setAdress] = useState("");
  const { state, dispatch } = useContext(Store);
  const [showDialog, setshowDialog] = useState(false);
  const [loading, setloading] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
    setloading(true);
    setshowDialog(false);
    const items = cartItems.map((i) => {
      return { _id: i._id, qty: i.qty };
    });
    try {
      await axios.post("/api/orders", items, config);
      removeAll(dispatch);
      enqueueSnackbar("Order added successfully", {
        variant: "success",
        onClick: () => {
          closeSnackbar();
        },
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      enqueueSnackbar(message, {
        variant: "error",
        onClick: () => {
          closeSnackbar();
        },
      });
    } finally {
      setloading(false);
    }
  };
  const updateAdress = async () => {
    try {
      await axios.put("/api/auth/updateUser", { adress }, config);
      enqueueSnackbar("Adress updated successfully", {
        variant: "success",
        onClick: () => {
          closeSnackbar();
        },
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      enqueueSnackbar(message, {
        variant: "error",
        onClick: () => {
          closeSnackbar();
        },
      });
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
        enqueueSnackbar(message, {
          variant: "error",
          onClick: () => {
            closeSnackbar();
          },
        });
      }
    };
    if (token) {
      getUser();
    }
  }, []);

  return (
    <>
      {cartItems.length === 0 ? (
        <p>
          cart is empty <Link to={"/"}>go shopping</Link>
        </p>
      ) : (
        <Grid container padding="2rem" spacing={2}>
          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <Typography style={{ color: "black" }}>
                          {item.title}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.qty}
                          onChange={(e) =>
                            add(dispatch, { ...item, qty: e.target.value })
                          }
                        >
                          {[...Array(item.quantity).keys()].map((x) => (
                            <MenuItem key={x + 1} value={x + 1}>
                              {x + 1}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => remove(dispatch, item._id)}
                          endIcon={<DeleteIcon />}
                        >
                          Remove
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ marginBottom: "1rem" }}>
              <List>
                <ListItem>
                  <Typography variant="h6">
                    Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)
                    : $
                    {cartItems
                      .reduce((a, c) => a + c.qty * c.price, 0)
                      .toFixed(2)}
                  </Typography>
                </ListItem>
                <ListItem>
                  <LoadingButton
                    onClick={() => setshowDialog(true)}
                    variant="contained"
                    loading={loading}
                    color="secondary"
                  >
                    Add Order
                  </LoadingButton>
                </ListItem>
              </List>
            </Card>
            {false && (
              <Card>
                <List>
                  <ListItem>
                    <Typography variant="h6">Delivery Adress</Typography>
                  </ListItem>
                  <ListItem>
                    <Typography variant="h6">{adress}</Typography>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={addOrder}
                      variant="contained"
                      color="secondary"
                    >
                      Update Adress
                    </Button>
                  </ListItem>
                </List>
              </Card>
            )}
          </Grid>
        </Grid>
      )}
      {showDialog && (
        <Dialog
          text={"Do you really want to confirm this order ?"}
          handler={addOrder}
          handleClose={() => setshowDialog(false)}
        />
      )}
    </>
  );
};

export default Index;
