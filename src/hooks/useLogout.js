import { axiosPrivate } from "../services/rootAPI/api";
import { useAuth } from "./useAuth";
export const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    try {
      const res = await axiosPrivate.get("/logout");
    } catch (error) {
      console.log("error ocuured in useLogout");
    }
  };

  return logout;
};
