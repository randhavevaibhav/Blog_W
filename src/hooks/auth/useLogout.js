import { axiosPrivate } from "../../services/rootAPI/api";
import { setLocalStorageItem } from "../../utils/browser";
import { localUserId } from "../../utils/constants";
import { useAuth } from "./useAuth";
export const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth({});
    setLocalStorageItem(localUserId, "");
    try {
      const res = await axiosPrivate.get("/logout");
    } catch (error) {
      //console.log("error ocuured in useLogout");
    }
  };

  return logout;
};
