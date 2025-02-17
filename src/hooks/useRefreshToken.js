import { axiosPrivate } from "../services/rootAPI/api";
import { useAuth } from "./useAuth";

export const useRefreshToken = () => {
  const { setAuth } = useAuth();
  console.log("calling useRefreshToken ==>");

  const refresh = async () => {
    const response = await axiosPrivate.get(`/refreshtoken`);
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
