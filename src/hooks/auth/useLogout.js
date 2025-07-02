import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { authServices } from "@/services/auth/authServices";
export const useLogout = () => {
  const { setAuth, setPersist } = useAuth();
  const {logoutService} = authServices();
  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      setAuth({});
      setPersist(false);
      localStorage.clear();
      //very IMP for clear all Quries, so that other logged iun user does not see stale data.
      queryClient.clear();
      const res = await logoutService();
    } catch (error) {
      console.log("error ocuured in useLogout", error);
    }
  };

  return logout;
};
