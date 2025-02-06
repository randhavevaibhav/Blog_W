import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuthSignup } from "../../../api/auth/apiAuthSignup";
import toast from "react-hot-toast";
export const useSignup = () => {
  const queryClient = useQueryClient();
  const {
    mutate: singUp,

    isPending,
  } = useMutation({
    mutationFn: apiAuthSignup,
    onSuccess: () => {
      toast.success(
        "Account successfully created. !!\n Please verify the new account from the user's email address."
      );
      queryClient.invalidateQueries({ queryKey: ["postSignUp"] });
    },
    onError: (err) =>{
      toast.error(`Error while creating new user !!\n${err.response.data?.message}`);
    
    },
  });

  return {
    singUp,
    isPending,
  };
};
