import axios from "axios";
import { ADD_ORDER } from "./types";

export const add = async (dispatch, order) => {
  await axios.post("/api/");
  dispatch({
    type: ADD_ORDER,
    payload: order,
  });
};
