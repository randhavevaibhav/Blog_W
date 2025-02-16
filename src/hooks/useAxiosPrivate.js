import { useRefreshToken } from "./useRefreshToken";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import { axiosPrivate } from "../services/rootAPI/api";
export const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  console.log("calling useAxiosPrivate ==> ");

  useEffect(() => {
    console.log("useAxiosPrivate useEffect ==> ");
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.log("Error in request interceptor");
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        console.log("Error in response interceptor");
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  // useEffect(() => {
  //   console.log("simple useEffect !!!");
  // }, []);

  // const request = async ({ ...options }) => {
  //   const newAccessToken = await refresh();
  //   axiosPrivate.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
  //   const onSuccess = (response) => response;
  //   const onError = (error) => Promise.reject(error);

  //   return axiosPrivate(options).then(onSuccess).catch(onError);
  // };

  return axiosPrivate;

  // return request;
};
