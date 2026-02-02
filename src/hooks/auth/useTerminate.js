import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import {  useNavigate } from "react-router-dom";


import { authServices } from "@/services/auth/authServices";
import { getSignInPageLink } from "@/utils/getLinks";


export const useTerminate = () => {
  const navigate = useNavigate();

  const {terminateService} = authServices();

  const {
    mutate: terminate,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["postSignIn"],
    mutationFn: terminateService,
    onSuccess: (res) => {
      // console.log("res.data.accessToken ==> ", res.accessToken);
      toast.success(`Session terminated. Please sign in`);
      navigate(getSignInPageLink());
    },
    onError: (err) => {
      console.log("err ==> ", err);

      if (err.response) {
        const responseError = err.response.data?.message;
        console.log("responseError ==> ", responseError);
        toast.error(`${responseError}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        console.log(err);
      }
    },
  });

  return {
    terminate,
    isPending,
    isError,
    isSuccess,
  };
};
