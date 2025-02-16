import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuthSignin } from "../api/signin";
import toast from "react-hot-toast";

import { useAuth } from "../../../hooks/useAuth";
import { useLocation, useNavigate, Link } from "react-router-dom";
export const useSignin = () => {
  const { setAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const queryClient = useQueryClient();
  const {
    mutate: singIn,

    isPending,
  } = useMutation({
    mutationFn: apiAuthSignin,
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
      console.log("err ==> ", err);

      if (err.response) {
        const responseError = err.response.data?.message;
        toast.error(`${responseError}`);
      } else {
        toast.error(err.message);
      }
    },
  });

  return {
    singIn,
    isPending,
  };
};
