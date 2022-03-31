import React, { useEffect, useState, useContext } from "react";
import { Store } from "../../utils/Store";
import axios from "axios";
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
  Container,
} from "@mui/material";
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
    <Container sx={{ padding: "2rem" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order id</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((item) => (
              <TableRow key={item._id}>
                <TableCell>
                  <Typography style={{ color: "black" }}>{item._id}</Typography>
                </TableCell>

                <TableCell align="right">
                  {item.valid ? "validated" : "pending"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Index;
