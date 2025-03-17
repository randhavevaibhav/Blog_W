import { axiosPrivate } from "../../services/rootAPI/api";

import { useAuth } from "./useAuth";
export const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
  const logout = async () => {
    try {
      setAuth({});
      setPersist(false);
      localStorage.clear();
      const res = await axiosPrivate.get("/logout");
    } catch (error) {
      console.log("error ocuured in useLogout", error);
    }
  };

  return logout;
};
