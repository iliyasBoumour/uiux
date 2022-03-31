import React, { useEffect, useState } from "react";
import axios from "axios";
import { Typography, Container, Grid, Box } from "@mui/material";
import Product from "../../components/product";
import Header from "../../components/Header";
import { useSnackbar } from "notistack";

const Index = () => {
  const [products, setProducts] = useState([]);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/products");
        setProducts(data);
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
    getProducts();
  }, []);

  return (
    <header>
      <Header />
      <Container maxWidth="xl" sx={{ padding: "4rem", textAlign: "center" }}>
        <Typography variant="h1" marginBottom={"2rem"}>
          New Arrivals
        </Typography>
        <Grid container>
          {products.map((p) => (
            <Grid item xs={6} md={4} lg={3} key={p._id}>
              <Product {...p} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </header>
  );
};

export default Index;
