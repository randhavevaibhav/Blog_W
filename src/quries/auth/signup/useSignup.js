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
    onSuccess: (data) => {
      console.log("sinUpRes === >",data)
      toast.success(
        "Account successfully created. !!\n Please verify the new account from the user's email address."
      );
      queryClient.invalidateQueries({ queryKey: ["postSignUp"] });
    },
    onError: (err) =>{
      const responseError = err.response.data?.message;
        if(responseError)
        {
            toast.error(`Error !!\n${err.response.data?.message}`);

        }else{
            toast.error(`Unkown error occured !! `);
            console.log(err)

        }
    
    },
  });

  return {
    singUp,
    isPending,
  };
};
