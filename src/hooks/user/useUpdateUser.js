import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";

import { useAuth } from "../auth/useAuth";
import { useLogout } from "../auth/useLogout";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { auth } = useAuth();
  const userId = auth.userId;
  const logout = useLogout();

  const updateUserService = async (formData) => {
    const res = await axiosPrivate.patch(`/user/${userId}`, formData);

    const resData = await res.data;
    return resData;
  };

  const { mutate: updateUser, isPending ,isError,isSuccess} = useMutation({
    mutationFn: updateUserService,
    onSuccess: (res) => {
      logout();
      setTimeout(() => {
        toast.success(
          `user info edited successfully !!\nPlease sign-in with new user info`
        );
      }, 800);
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
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["getUser", userId.toString()],
      });
    },
  });

  return {
    updateUser,
    isPending,
    isError,
    isSuccess
  
  };
};
