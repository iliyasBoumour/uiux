import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../../utils/useAuth";

const Index = () => {
  const isAuth = useAuth();
  console.log(isAuth);
  return isAuth === null ? <Outlet /> : <Navigate to="/" />;
};

export default Index;
