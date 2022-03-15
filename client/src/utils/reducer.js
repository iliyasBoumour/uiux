import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  USER_LOGIN,
  USER_LOGOUT,
  REMOVE_ALL_FROM_CART,
} from "./actions/types";
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART:
      let newState;
      const isExists = state.cart.cartItems.find(
        (item) => item._id === payload._id
      );
      if (isExists) {
        newState = state.cart.cartItems.map((item) =>
          item._id === payload._id ? payload : item
        );
      } else {
        newState = [...state.cart.cartItems, payload];
      }
      localStorage.setItem("cart", JSON.stringify(newState));
      return {
        ...state,
        cart: { cartItems: newState },
      };
    case REMOVE_FROM_CART:
      const newSte = state.cart.cartItems.filter(
        (item) => item._id !== payload
      );
      localStorage.setItem("cart", JSON.stringify(newSte));
      return {
        ...state,
        cart: { cartItems: newSte },
      };
    case USER_LOGIN: {
      const { token } = payload;
      localStorage.setItem("token", JSON.stringify(token));
      return { ...state, auth: { token } };
    }
    case USER_LOGOUT: {
      localStorage.removeItem("token");
      return { ...state, auth: { token: null } };
    }
    case REMOVE_ALL_FROM_CART:
      localStorage.removeItem("cart");
      return { ...state, cart: { cartItems: [] } };
    default:
      return state;
  }
};
export default reducer;
