import { useRefreshToken } from "../auth/useRefreshToken";
import { useAuth } from "../auth/useAuth";
import { useEffect } from "react";
import { axiosPrivate } from "../../services/rootAPI/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth, setPersist, persist } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  //console.log("calling useAxiosPrivate ==> ");

  useEffect(() => {
    //console.log("useAxiosPrivate useEffect ==> ");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        //x-persist
        if (!config.headers["X-Persist"]) {
          // console.log("attaching persist header");
          // console.log("persist ==> ", persist);
          config.headers["X-Persist"] = persist ? `persist` : `not-persist`;
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
            localStorage.clear();
            setPersist(false);
            navigate("/signin");

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
