import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { axiosPrivate } from "../../services/rootAPI/api";

  
const signupService = async (data) => {
    const formData = {
      ...data,
      registered_at: format(new Date(), "yyyy-MM-dd"),
    };
    //console.log("formData submitFormData -==> ", formData);
    const res = await axiosPrivate.post(`/signup`, formData);
    return res;
  };


export const useSignup = ()=>{
  const queryClient = useQueryClient();

  const { mutate: signUp, isPending } = useMutation({
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
        toast.error(`Unkown error occured !! `);
        //console.log(err);
      }
    },
  });

  return{
    signUp,isPending
  }
}