import { AuthContext } from "../../contexts/Auth/AuthProvider";
import { useContext } from "react";
export const useAuth = () => {
  //console.log("calling useAuth");
  return useContext(AuthContext);
};
