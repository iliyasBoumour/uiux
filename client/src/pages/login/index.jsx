import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Store } from "../../utils/Store";
import { styled } from "@mui/system";
import { signin, signup } from "../../utils/actions/authAction";
import { Controller, useForm } from "react-hook-form";
import { useSnackbar } from "notistack";

const MyPaper = styled(Paper)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.primary.main,
}));
const comp = [
  {
    title: "Don't have an account ?",
    body: "Create a new account and be a client !",
    action: "Sign up",
  },
  {
    title: "Have an account ?",
    body: "login now and keep being elegant !",
    action: "Sign in",
  },
];
const Index = () => {
  const [signIn, setsignIn] = useState(true);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dispatch, state } = useContext(Store);
  const signInUp = async (data) => {
    closeSnackbar();
    if (signIn) {
      signin(dispatch, data);
    } else {
      signup(dispatch, data);
    }
  };
  useEffect(() => {
    if (state.auth.error) {
      enqueueSnackbar(state.auth.error, {
        variant: "error",
        onClick: () => {
          closeSnackbar();
        },
      });
    }
  }, [state.auth]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "calc( 100vh - 64px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid container position="relative">
        {comp.map((c, i) => (
          <Grid item xs={12} md={6} key={i}>
            <MyPaper
              square
              sx={{
                padding: "3rem",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <Typography variant="h3">{c.title}</Typography>
              <Typography variant="subtitle1">{c.body}</Typography>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                sx={{ width: "fit-content" }}
                onClick={() => setsignIn(!signIn)}
              >
                {c.action}
              </Button>
            </MyPaper>
          </Grid>
        ))}
        <Paper
          sx={{
            position: "absolute",
            padding: "3rem",
            width: "50%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
            top: "50%",
            transition: "all 0.3s ease-in-out",
            transform: signIn ? "translate(100%,-50%)" : "translate(0,-50%)",
          }}
        >
          <Typography variant="h3">{signIn ? "Sign In" : "Sign Up"}</Typography>
          <form
            onSubmit={handleSubmit(signInUp)}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              gap: ".7rem",
            }}
          >
            {!signIn && (
              <Controller
                name="fname"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="fname"
                    label="First name"
                    color="text"
                    inputProps={{ type: "text" }}
                    error={Boolean(errors.fname)}
                    helperText={errors.fname ? "First name is required" : ""}
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            )}
            {!signIn && (
              <Controller
                name="lname"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="lname"
                    label="Last name"
                    color="text"
                    inputProps={{ type: "lname" }}
                    error={Boolean(errors.lname)}
                    helperText={errors.lname ? "Last name is required" : ""}
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            )}
            {!signIn && (
              <Controller
                name="adress"
                control={control}
                defaultValue=""
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="adress"
                    label="Adress"
                    color="text"
                    inputProps={{ type: "adress" }}
                    error={Boolean(errors.adress)}
                    helperText={errors.adress ? "Adress is required" : ""}
                    {...field}
                  ></TextField>
                )}
              ></Controller>
            )}
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  color="text"
                  inputProps={{ type: "email" }}
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "pattern"
                        ? "Invalid email"
                        : "Email is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  color="text"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={errors.password ? "Password is required" : ""}
                  {...field}
                ></TextField>
              )}
            ></Controller>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ width: "fit-content" }}
              type="submit"
            >
              {signIn ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Container>
  );
};

export default Index;
