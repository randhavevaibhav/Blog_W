import { useMutation } from "@tanstack/react-query";

import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";


import toast from "react-hot-toast";
import { postsServices } from "@/services/posts/postsServices";

export const useUploadFile = () => {
 
  const {uploadFileService} = postsServices();

  

  const {
    isPending,
    isSuccess,
    data,
    isError,
    mutateAsync: uploadFile,
  } = useMutation({
    mutationFn: (data)=>{
      return uploadFileService({
        ...data
      })
    },
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
        toast.error(`Unknown error occurred !! `);
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
