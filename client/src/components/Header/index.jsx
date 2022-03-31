import React from "react";
import { Header, Text } from "./style";
import { Box, Typography, Button } from "@mui/material";

const index = () => {
  return (
    <Header>
      <Text>
        <Box textAlign="end" display="flex" flexDirection="column" gap={4}>
          <Typography color="primary" textTransform="capitalize" variant="h1">
            Welcome to our store
          </Typography>
          <Typography color="primary" variant="h4">
            Simplicity Literally & Elegant.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              width: "fit-content",
              marginLeft: "auto",
              padding: ".5rem 2rem",
            }}
          >
            SHOP NOW
          </Button>
        </Box>
      </Text>
    </Header>
  );
};

export default index;
