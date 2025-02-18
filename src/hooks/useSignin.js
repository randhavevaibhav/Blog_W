import toast from "react-hot-toast";
import { axiosPrivate } from "../services/rootAPI/api";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

export const useSignin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const submitFormData = async (data) => {
    const res = await axiosPrivate.post(`/signin`, data);
    return res;
  };

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: submitFormData,
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
