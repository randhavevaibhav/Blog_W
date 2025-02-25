import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { setLocalStorageItem } from "../../utils/browser";
export const usePostFormData = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const postFormService = async (formData) => {
    const res = await axiosPrivate.post("/createpost", formData);

    return res;
  };

  const { mutate: uploadFormData, isPending } = useMutation({
    mutationKey: ["uploadFormData"],
    mutationFn: postFormService,
    onSuccess: (res) => {
      toast.success(`Success !! created new post`);
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
