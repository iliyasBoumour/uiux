import React, { useContext, useState } from "react";
import { Store } from "../../utils/Store";
import { add } from "../../utils/actions/cartAction";
import { Img } from "../../components/Img";
import { Box, Typography } from "@mui/material";
import { AddToCart, ProdCont } from "./style";
import { useSnackbar } from "notistack";

const sizes = ["M", "L", "XL"];
const index = (product) => {
  const { title, description, quantity, price } = product;
  const [qty, setQty] = useState(1);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch } = useContext(Store);
  const addToCart = () => {
    if (qty > quantity) {
      enqueueSnackbar("out of stock", {
        variant: "error",
        onClick: () => {
          closeSnackbar();
        },
      });
      return;
    }
    add(dispatch, { ...product, qty });
    enqueueSnackbar("Added to cart", {
      variant: "success",
      onClick: () => {
        closeSnackbar();
      },
    });
  };
  return (
    <ProdCont
      sx={{ cursor: "pointer" }}
      display="flex"
      height="550px"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap=".5rem"
    >
      <Box flex="3" overflow="hidden" bgcolor={"green"} position="relative">
        <Img src="/images/p1.jpg" alt="hh" />
        {quantity <= 0 ? (
          <Box
            position="absolute"
            zIndex={2}
            bottom={0}
            right={0}
            left={0}
            bgcolor="#D14343"
            color="#fff"
          >
            Expired !
          </Box>
        ) : (
          <AddToCart onClick={addToCart}>Add To Cart</AddToCart>
        )}
      </Box>
      <Box flex="1" overflow="hidden">
        <Typography variant="h5" textTransform="capitalize">
          {title}
        </Typography>
        <Typography
          variant="h6"
          textTransform="capitalize"
          marginBottom=".4rem"
        >
          $ {price}
        </Typography>
        <Box display="flex" gap=".7rem">
          {sizes.map((s) => (
            <Box border="solid 1px #000" width="30px" height="25px">
              {s}
            </Box>
          ))}
        </Box>
      </Box>
    </ProdCont>
  );
};

export default index;
