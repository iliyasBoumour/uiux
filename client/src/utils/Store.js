import React, { createContext, useReducer } from "react";
import reducer from "./reducer";

export const Store = createContext();

const initialState = {
  cart: { cartItems: JSON.parse(localStorage.getItem("cart")) || [] },
  auth: { token: localStorage.getItem("token") || null },
};

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
};
