import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { setLocalStorageItem } from "../../utils/browser";

import { localPostTitleImgURL } from "../../utils/constants";
import toast from "react-hot-toast";

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // console.log("auth state in useUploadPostForm ===> ", auth);

  const uploadFileService = async (file) => {
    // console.log("file in uploadFileService ==> ", formData);
    const res = await axiosPrivate.post("/upload", file);
    const resData = await res.data;

    return resData;
  };

  const {
    isPending,
    isSuccess,
    data,
    mutateAsync: uploadFile,
  } = useMutation({
    mutationFn: uploadFileService,
    onSuccess: (data) => {
      // console.log("File uploaded successfully !!", data);
      const fileURL = data.fileURL;
     
      setLocalStorageItem(localPostTitleImgURL, fileURL);
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
    isPending,
    isSuccess,
    data,
    uploadFile,
  };
};
