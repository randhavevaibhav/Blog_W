import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuthSignin } from "../../../api/auth/apiAuthSignin";
import toast from "react-hot-toast";
export const useSignin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: singIn,

    isPending,
  } = useMutation({
    mutationFn: apiAuthSignin,
    onSuccess: () => {
      toast.success(
        "Login successfull !"
      );
      queryClient.invalidateQueries({ queryKey: ["postSignIn"] });
    },
    onError: (err) =>{
      toast.error(`Error while Sign in !!\n${err.response.data?.message}`);
    
    },
  });

  return {
    singIn,
    isPending,
  };
};
