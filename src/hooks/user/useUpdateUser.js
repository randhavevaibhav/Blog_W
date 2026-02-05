import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";
import { useLogout } from "../auth/useLogout";
import { userServices } from "@/services/user/userServices";
import { catchQueryError } from "../utils/catchQueryError";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { updateUserService } = userServices();
  const { auth } = useAuth();
  const userId = auth.userId;
  const logout = useLogout({
    navigateTo: `/signin`,
  });

  const {
    mutate: updateUser,
    isPending,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: (data) => {
      return updateUserService({
        ...data,
        userId,
      });
    },
    onSuccess: catchQueryError((res) => {
      logout();
      setTimeout(() => {
        toast.success(
          `user info edited successfully !!\nPlease sign-in with new user info`
        );
      }, 800);
    }),
    onError: catchQueryError((err) => {
      const responseError = err.response.data?.message;
      if (responseError) {
        toast.error(`Error !!\n${err.response.data?.message}`);
      } else {
        toast.error(`Unknown error occurred !! `);
        //console.log(err);
      }
    }),
    onSettled: catchQueryError(() => {
      queryClient.invalidateQueries({
        queryKey: ["getUser", userId.toString()],
      });
    }),
  });

  return {
    updateUser,
    isPending,
    isError,
    isSuccess,
  };
};
