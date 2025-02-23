import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../hooks/api/useAxiosPrivate";
import { setLocalStorageItem } from "../../utils/browser";
export const useUploadCloud = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const uploadFileService = async (formData) => {
    // console.log("file in uploadFileService ==> ", formData);
    const res = await axiosPrivate.post("/upload", formData);

    return res;
  };

  const { mutate: uploadFile, isPending } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: uploadFileService,
    onSuccess: (res) => {
      // console.log("File uploaded successfully !!", res);
      const fileURL = res.data.fileURL;
      setLocalStorageItem("localPostTitleImg", fileURL);
      queryClient.invalidateQueries({
        queryKey: ["uploadFile"],
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
    uploadFile,
    isPending,
  };
};
