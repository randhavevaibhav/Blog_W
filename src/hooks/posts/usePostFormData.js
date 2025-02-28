import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { clearLocalPostData } from "../../utils/browser";
import { useAuth } from "../auth/useAuth";
export const usePostFormData = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { auth } = useAuth();
  const userId = auth.userId;

  const postFormService = async (formData) => {
    const res = await axiosPrivate.post("/createpost", formData);
    const resData = await res.data;
    return resData;
  };

  const { mutate: uploadFormData, isPending } = useMutation({
    mutationKey: ["uploadFormData"],
    mutationFn: postFormService,
    onSuccess: (res) => {
      // console.log("res data after creating post ==> ",res)
      toast.success(`Success !! created new post`);

      //navigate to newly created post
      setTimeout(() => {
        navigate(`/posts/${res.postId}/${userId}`);
      }, 1500);

      //clear local post data
      clearLocalPostData();

      queryClient.invalidateQueries({
        queryKey: ["uploadFormData"],
      });
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

  return {
    uploadFormData,
    isPending,
  };
};
