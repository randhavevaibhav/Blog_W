import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearLocalPostData } from "../../utils/utils";
import { useAuth } from "../auth/useAuth";
export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.userId;

  const createPostService = async (formData) => {
    const res = await axiosPrivate.post("/createpost", formData);

    const resData = await res.data;
    return resData;
  };

  const { mutate: createPost, isPending } = useMutation({
    mutationKey: ["createPost"],
    mutationFn: createPostService,
    onSuccess: (res) => {
      toast.success(`Success !! created new post`);

      //navigate to dashboard

      navigate(`/dashboard`);

     
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
       //clear local post data
       clearLocalPostData();
      queryClient.invalidateQueries({
        queryKey: ["getAllOwnPosts", userId.toString()],
      });
    
    },
  });

  return {
    createPost,
    isPending,
  };
};
