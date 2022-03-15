import axios from "axios";
import { USER_LOGIN, USER_LOGOUT } from "./types";
export const signin = async (dispatch, user) => {
  const { data } = await axios.post(`/api/auth/login`, user);

  dispatch({
    type: USER_LOGIN,
    payload: {
      ...data,
    },
  });
};
export const logout = (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
