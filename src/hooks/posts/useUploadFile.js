import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";


import toast from "react-hot-toast";

export const useUploadFile = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  // console.log("auth state in useUploadPostForm ===> ", auth);

  const uploadFileService = async ({formData,url}) => {
    // console.log("file in uploadFileService ==> ", formData);
    const res = await axiosPrivate.post(`/upload/${url}`, formData,{
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    const resData = await res.data;

    return resData;
  };

  const {
    isPending,
    isSuccess,
    data,
    isError,
    mutateAsync: uploadFile,
  } = useMutation({
    mutationFn: uploadFileService,
    onSuccess: (data) => {
      // console.log("File uploaded successfully !!", data);
      const fileURL = data.fileURL;
     
     const localPostData = getLocalStorageItem("PostData");

     setLocalStorageItem("PostData",{
      ...localPostData,
      imgURL:fileURL
     })
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
    isError
  };
};
