import { Button } from "../../Button/Button";

import { Toaster } from "react-hot-toast";

import { useUploadPostForm } from "../../../hooks/posts/useUploadPostForm";
import { Header } from "./Header/Header";
import { PostContent } from "./PostContent/PostContent";
import {
  getFileObjectFromLocal,
  getLocalStorageItem,
} from "../../../utils/browser";
import {
  localPost,
  localPostTitle,
  localPostTitleImgFile,
} from "../../../utils/constants";
import { useState } from "react";
import { ErrorText } from "../../ErrorText/ErrorText";

export const CreatePostForm = ({ hideMarkdownTips, showMarkDownTips }) => {
  const { uploadForm, isPending } = useUploadPostForm();
  const [error, setError] = useState({
    state: false,
    text: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let postTitle = getLocalStorageItem(localPostTitle);
    let content = getLocalStorageItem(localPost)

    if (!postTitle) {
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
    const formData = new FormData();
    //get the file stored in local storage convert it to file object and then send.
    const localImgFile = getLocalStorageItem(localPostTitleImgFile);
    const fileObj = getFileObjectFromLocal(localImgFile);
    formData.append("file", fileObj);
    uploadForm(formData);
  };

  return (
    <>
      <form
        className="flex flex-col h-screen md:h-[650px] gap-10"
        onSubmit={handleSubmit}
      >
        {/* header */}

        <Header />

        {/* Post content */}

        <PostContent
          showMarkDownTips={showMarkDownTips}
          hideMarkdownTips={hideMarkdownTips}
        />
        <div>
          <Button className="border mt-4" disabled={isPending}>
            Create post
          </Button>
        </div>
        {error.state ? <ErrorText className="text-2xl">{error.text}</ErrorText> : null}
      </form>

      <Toaster />
    </>
  );
};
