import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";

import { axiosPrivate } from "../../services/rootAPI/api";


const signinService = async (data) => {
  const res = await axiosPrivate.post(`/signin`, data);
  return res;
};

export const useSignin = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const from = location.state?.from?.pathname || "/";

  const { mutate: signIn, isPending } = useMutation({
    mutationKey: ["postSignIn"],
    mutationFn: signinService,
    onSuccess: (res) => {
      const accessToken = res.data.accessToken;
      const userId = res.data.userId;

      console.log("res.data.accessToken ==> ", res.data.accessToken);

      toast.success("Login successfull !");
      setAuth({
        userId,
        accessToken,
      });
     
      navigate(from, { replace: true });
      queryClient.invalidateQueries({ queryKey: ["postSignIn"] });
    },
    onError: (err) => {
      //console.log("err ==> ", err);

      if (err.response) {
        const responseError = err.response.data?.message;
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
  };
};
