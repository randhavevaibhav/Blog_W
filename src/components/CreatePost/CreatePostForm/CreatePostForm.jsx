import { useState } from "react";

import { Button } from "../../Button/Button";

import { Toaster } from "react-hot-toast";

import { useUploadPostForm } from "../../../hooks/posts/useUploadPostForm";
import { Header } from "./Header/Header";
import { PostContent } from "./PostContent/PostContent";

export const CreatePostForm = ({ hideMarkdownTips, showMarkDownTips }) => {
  const [titleImg, setTitleImg] = useState(null);

  const { uploadForm, isPending } = useUploadPostForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", titleImg);
    uploadForm(formData);
  };

  const getImageFile = (file) => {
    setTitleImg(file);
  };

  return (
    <>
      <form
        className="flex flex-col h-screen md:h-[650px]"
        onSubmit={handleSubmit}
      >
        {/* header */}

        <Header getImageFile={getImageFile} />

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
      </form>

      <Toaster />
    </>
  );
};
