import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { authServices } from "@/services/auth/authServices";
import { useNavigate } from "react-router-dom";
export const useLogout = ({ navigateTo = "/" }) => {
  const { setAuth, setPersist } = useAuth();
  const { logoutService } = authServices();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const logout = async () => {
    try {
      setAuth({});
      setPersist(false);
      localStorage.clear();
      //very IMP for clear all Queries, so that other logged-in user does not see stale data.
      queryClient.clear();
      const res = await logoutService();
      navigate(navigateTo);
    } catch (error) {
      console.log("error occurred in useLogout", error);
    }
  };

  return logout;
};
