import { useContext } from "react";
import { Store } from "./Store";
import jwt_decode from "jwt-decode";
const useAuth = () => {
  const { state } = useContext(Store);
  const {
    auth: { token },
  } = state;
  if (!token) {
    return null;
  }
  const { role, exp } = jwt_decode(token.replace("Bearer ", ""));
  if (exp * 1000 > new Date().getTime()) {
    return role;
  }
  return null;
};
export default useAuth;
