import { useContext } from "react";
import { Store } from "./Store";
const useAuth = () => {
  const { state } = useContext(Store);
  const {
    auth: { token },
  } = state;
  if (!token) {
    return false;
  }
  return true;
};
export default useAuth;
