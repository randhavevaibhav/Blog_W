import { useQueryClient } from "@tanstack/react-query";
import { axiosPrivate } from "../../services/rootAPI/api";

import { useAuth } from "./useAuth";
export const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
   const queryClient = useQueryClient();
  const logout = async () => {
    try {
      setAuth({});
      setPersist(false);
      localStorage.clear();
      //very IMP for reset all Quries, so that other logged iun user does not see stale data.
      queryClient.resetQueries();
      const res = await axiosPrivate.get("/logout");
    } catch (error) {
      console.log("error ocuured in useLogout", error);
    }
  };

  return logout;
};
