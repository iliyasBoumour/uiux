import axios from "axios";
import { USER_LOGIN, USER_LOGOUT, USER_LOGIN_FAIL } from "./types";
export const signin = async (dispatch, user) => {
  try {
    const { data } = await axios.post(`/api/auth/login`, user);
    dispatch({
      type: USER_LOGIN,
      payload: {
        ...data,
      },
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = (dispatch) => {
  dispatch({
    type: USER_LOGOUT,
  });
};
