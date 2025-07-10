import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authServices } from "@/services/auth/authServices";

export const useSignup = ()=>{
  const queryClient = useQueryClient();
  const {signupService} = authServices();

  const { mutate: signUp, isPending,isSuccess,isError } = useMutation({
    mutationKey:["postSignUp"],
    mutationFn: signupService,
    onSuccess: (data) => {
      //console.log("sinUpRes === >", data);
      toast.success(
        "Account successfully created. !!\n Please verify the new account from the user's email address."
      );
      queryClient.invalidateQueries({ queryKey: ["postSignUp"] });
    },
    onError: (err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    },
  });

  return{
    signUp,isPending,isSuccess,isError
  }
}