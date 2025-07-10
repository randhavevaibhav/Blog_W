import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../api/useAxiosPrivate";
import toast from "react-hot-toast";

export const useMarkDownToHTML = () => {
  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const markDowntoHTMLService = async (contentData) => {
    const res = await axiosPrivate.post("/convert/markdowntohtml", contentData);

    const resData = await res.data;
    return resData;
  };

  const {

    isPending,
    isError,
    mutateAsync:convertMarkdownToHTML,
  } = useMutation({
    mutationKey: ["markDownToHTML"],
    mutationFn: markDowntoHTMLService,
    onSuccess: () => {},
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
    convertMarkdownToHTML,
    isPending,
    isError,
  };
};
