import axios from "axios";
import { useAuth } from "./useAuth";
import { LOCAL_API_BASE_URL, API_BASE_URL } from "../utils/constants";
export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  console.log("calling useRefreshToken ==>");

  const refresh = async () => {
    const response = await axios.get(`${LOCAL_API_BASE_URL}/refreshtoken`, {
      withCredentials: true,
    });
    setAuth((prev) => {
      console.log(
        `previous auth token ==> ${JSON.stringify(prev.accessToken)}`
      );
      console.log(
        `access token from refresh req ==> ${response.data.accessToken}`
      );

      return {
        ...prev,
        accessToken: response.data.accessToken,
      };
    });

    return response.data.accessToken;
  };

  return refresh;
};
