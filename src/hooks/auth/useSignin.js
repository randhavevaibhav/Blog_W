import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

import { axiosPrivate } from "../../services/rootAPI/api";

const signinService = async (data) => {
  const res = await axiosPrivate.post(`/signin`, data);
  const resData = await res.data;
  return resData;
};

export const useSignin = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const from = location.state?.from?.pathname || "/";

  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation({
    mutationKey: ["postSignIn"],
    mutationFn: signinService,
    onSuccess: (res) => {
      const accessToken = res.accessToken;
      const userId = res.userId;
      const userName = res.userName;
      const userMail = res.userMail;
      const userProfileImg = res.userProfileImg;

      // console.log("res.data.accessToken ==> ", res.accessToken);

      toast.success("Login successfull !");

      setAuth({
        userId,
        accessToken,
        userName,
        userMail,
        userProfileImg
      });

      navigate(from, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["postSignIn"] });
    },
    onError: (err) => {
      console.log("err ==> ", err);

      if (err.response) {
        const responseError = err.response.data?.message;
        console.log("responseError ==> ", responseError);
        toast.error(`${responseError}`);
      } else {
        toast.error(`Unkown error occured !! `);
        console.log(err);
      }
    },
  });

  return {
    signIn,
    isPending,
    isError,
  };
};
