import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiAuthSignin } from "../../../api/auth/apiAuthSignin";
import toast from "react-hot-toast";
import { setLocalStorageItem } from "../../../utils/browser";
export const useSignin = () => {
  const queryClient = useQueryClient();
  const {
    mutate: singIn,

    isPending,
  } = useMutation({
    mutationFn: apiAuthSignin,
    onSuccess: (res) => {
      console.log("res.data.token ==> ",res.data.token)
      setLocalStorageItem("authToken",res.data.token)
      toast.success(
        "Login successfull !"
      );
      queryClient.invalidateQueries({ queryKey: ["postSignIn"] });
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
    singIn,
    isPending,
  };
};
