import toast from "react-hot-toast";
import { format } from "date-fns";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { axiosPrivate } from "../services/rootAPI/api";
import { useMutation } from "@tanstack/react-query";

export const useSignup = ()=>{
    // const axiosPrivate = useAxiosPrivate();

  const submitFormData = async (data) => {
    const formData = {
      ...data,
      registered_at: format(new Date(), "yyyy-MM-dd"),
    };
    console.log("formData submitFormData -==> ", formData);
    const res = await axiosPrivate.post(`/signup`, formData);
    return res;
  };

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: submitFormData,
    onSuccess: (data) => {
      console.log("sinUpRes === >", data);
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
        console.log(err);
      }
    },
  });

  return{
    signUp,isPending
  }
}