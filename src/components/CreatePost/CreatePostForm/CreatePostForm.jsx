import { Button } from "../../common/Button/Button";

import { Toaster } from "react-hot-toast";

import { useUploadFile } from "../../../hooks/posts/useUploadFile";
import { Header } from "./Header/Header";
import { PostContent } from "./PostContent/PostContent";
import { getFileObjectFromLocal } from "../../../utils/browser";

import { useState } from "react";
import { ErrorText } from "../../common/ErrorText/ErrorText";
import { useCreatePost } from "../../../hooks/posts/useCreatePost";
import { format } from "date-fns";
import { useAuth } from "../../../hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import { getLocalPostInfo } from "./utils";
import { useUpdatePost } from "../../../hooks/posts/useUpdatePost";
import { LoadingWithText } from "../../common/LoadingWithText/LoadingWithText";

export const CreatePostForm = ({
  hideMarkdownTips,
  showMarkDownTips,
  mode,
}) => {
  const { isPending: isUploadFilePending, uploadFile } = useUploadFile();
  const { createPost, isPending: isCreatePostPending } = useCreatePost();
  const { updatePost, isPending: isUpdatePostPending } = useUpdatePost();
  const { auth } = useAuth();
  const userId = auth.userId;
  const { postId } = useParams();

  const [error, setError] = useState({
    state: false,
    text: "",
  });

  const handleUploadImgPostFormData = async (
    title,
    content,
    fileObj,
    imgURL
  ) => {
    const formData = new FormData();
    //get the file stored in local storage convert it to file object and then send.
    formData.append("file", fileObj);

    // uploadForm(formData);
    if (imgURL === null) {
      imgURL = "";
    }

    if (!imgURL.includes("https")) {
      const resData = await uploadFile(formData);
      imgURL = resData.fileURL;
    }

    const createdAt = format(new Date(), "yyyy-MM-dd");
    const postData = {
      userId,
      title,
      content,
      titleImgURL: imgURL,
      createdAt,
    };

    if (mode === "CREATE") {
      createPost(postData);
    }

    if (mode === "EDIT") {
      const editPostData = {
        ...postData,
        updatedAt: createdAt,
        postId,
      };
      updatePost(editPostData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, content, imgFile, imgURL } = getLocalPostInfo(mode);

    const fileObj = getFileObjectFromLocal(imgFile);

    if (!title) {
      setError({
        ...error,
        text: "Please add title",
        state: true,
      });

      return;
    }
    if (!content) {
      setError({
        ...error,
        text: "Please add post content",
        state: true,
      });

      return;
    }

    handleUploadImgPostFormData(title, content, fileObj, imgURL);
  };

  return (
    <>
      {isUploadFilePending ? (
        // console.log("isUpdatePostPending ===> ", isUpdatePostPending)
        <LoadingWithText>
          {mode === "CREATE"
            ? "Creating new post please wait..."
            : "Saving post please wait..."}
        </LoadingWithText>
      ) : (
        <form
          className="flex flex-col h-screen md:h-[650px] gap-10"
          onSubmit={handleSubmit}
        >
          {/* header */}

          <Header mode={mode} />

          {/* Post content */}

          <PostContent
            showMarkDownTips={showMarkDownTips}
            hideMarkdownTips={hideMarkdownTips}
            mode={mode}
          />
          <div>
            <Button
              className="border mt-4"
              disabled={isCreatePostPending || isUpdatePostPending}
            >
              {mode === "CREATE" ? "Create post" : "Modify"}
            </Button>
          </div>
          {error.state ? (
            <ErrorText className="text-2xl">{error.text}</ErrorText>
          ) : null}
        </form>
      )}

      <Toaster />
    </>
  );
};
