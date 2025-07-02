import { axiosPrivate } from "../rootAPI/api";

export const authServices = () => {
  const signinService = async (data) => {
    const res = await axiosPrivate.post(`/signin`, data);
    const resData = await res.data;
    return resData;
  };

  const signupService = async (data) => {
    const res = await axiosPrivate.post(`/signup`, data);
    const resData = await res.data;
    return resData;
  };

  const terminateService = async (data) => {
    const res = await axiosPrivate.post(`/terminate`, data);
    const resData = await res.data;
    return resData;
  };

  const logoutService = async () => {
    const res = await axiosPrivate.get("/logout");
    const resData = await res.data;
    return resData;
  };

  const refreshService = async () => {
    const res = await axiosPrivate.get(`/refresh`);
    const resData = await res.data;
    return resData;
  };

  return {
    signinService,
    signupService,
    terminateService,
    logoutService,
    refreshService,
  };
};
