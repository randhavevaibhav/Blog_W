import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePostFormData } from "./usePostFormData";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";
import { format } from "date-fns";
import {
  localPost,
  localPostTitle,
  localPostTitleImgURL,
} from "../../utils/constants";
import toast from "react-hot-toast";
import { useAuth } from "../auth/useAuth";

export const useUploadPostForm = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();
  const { uploadFormData } = usePostFormData();
  const { auth } = useAuth();
  const userId = auth.userId;

  console.log("auth state in useUploadPostForm ===> ", auth);

  const uploadFileService = async (file) => {
    // console.log("file in uploadFileService ==> ", formData);
    const res = await axiosPrivate.post("/upload", file);

    return res;
  };
  const uploadFormDataService = (fileURL) => {
    const title = getLocalStorageItem(localPostTitle);
    const content = getLocalStorageItem(localPost);

    const createdAt = format(new Date(), "yyyy-MM-dd");
    const formData = {
      userId,
      title,
      content,
      titleImgURL: fileURL,
      createdAt,
    };
    console.log("form data ==> ", formData);
    uploadFormData(formData);
  };

  const {
    mutate: uploadForm,
    isPending,
    isSuccess,
    data,
  } = useMutation({
    mutationKey: ["uploadForm"],
    mutationFn: uploadFileService,
    onSuccess: (res) => {
      console.log("File uploaded successfully !!", res);
      const fileURL = res.data.fileURL;
      console.log("onSuccess of useUploadPostForm ");
      console.log("fileURL ====> ", fileURL);
      uploadFormDataService(fileURL);
      setLocalStorageItem(localPostTitleImgURL, fileURL);

      queryClient.invalidateQueries({
        queryKey: ["uploadForm"],
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
    uploadForm,
    isPending,
    isSuccess,
    data,
  };
};
