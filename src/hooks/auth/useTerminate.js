import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { axiosPrivate } from "../../services/rootAPI/api";

const signinService = async (data) => {
  const res = await axiosPrivate.post(`/terminate`, data);
  const resData = await res.data;
  return resData;
};

export const useTerminate = () => {
  const navigate = useNavigate();

  const {
    mutate: terminate,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationKey: ["postSignIn"],
    mutationFn: signinService,
    onSuccess: (res) => {
      // console.log("res.data.accessToken ==> ", res.accessToken);
      toast.success(`Session terminated. Please sign in`);
      navigate("/signin");
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
    terminate,
    isPending,
    isError,
    isSuccess,
  };
};
