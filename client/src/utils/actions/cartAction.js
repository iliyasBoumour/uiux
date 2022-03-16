import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_ALL_FROM_CART } from "./types";
export const add = async (dispatch, product) => {
  dispatch({
    type: ADD_TO_CART,
    payload: product,
  });
};
export const remove = async (dispatch, productId) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: productId,
  });
};
export const removeAll = async (dispatch) => {
  dispatch({
    type: REMOVE_ALL_FROM_CART,
  });
};
