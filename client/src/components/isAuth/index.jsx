import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../utils/useAuth";

const Index = ({ needAuth, path }) => {
  const isAuth = useAuth();

  return isAuth === needAuth ? (
    <Outlet />
  ) : path === "/login" || path === "/register" ? (
    <Navigate to="/" />
  ) : (
    <Navigate to={path} />
  );
};

export default Index;
