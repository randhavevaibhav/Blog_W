import { useRefreshToken } from "../auth/useRefreshToken";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";
import { axiosPrivate } from "../../services/rootAPI/api";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setPersist } = useAuth();

  const navigate = useNavigate();

  //console.log("calling useAxiosPrivate ==> ");

  useEffect(() => {
    //console.log("useAxiosPrivate useEffect ==> ");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }

        return config;
      },
      (error) => {
        //console.log("Error in request interceptor");
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const terminate = error?.response?.data?.variables?.terminate;
          if (terminate) {
            toast.error(`Session is terminated please sign in !`);
            navigate("/signin");
            auth.accessToken = null;
            localStorage.clear()

            return;
          }

          // console.log("calling referesh");
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        //console.log("Error in response interceptor");
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return axiosPrivate;
};
