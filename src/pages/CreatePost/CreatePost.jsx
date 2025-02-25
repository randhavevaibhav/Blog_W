import { useState } from "react";
import { MainLayout } from "../../components/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";

import { Button } from "../../components/Button/Button";
import { Preview } from "../../components/CreatePost/Preview/Preview";
import { MarkDownTips } from "../../components/CreatePost/MarkDownTips/MarkDownTips";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";
import { useCreatePostContext } from "../../hooks/posts/useCreatePostContext";
import { localPost, localPostTitle } from "../../utils/constants";

export const CreatePost = () => {
  let localPostContent = getLocalStorageItem(localPost);
  const { postContentRef, postTitleRef, postTitleImgRef, markDownTipsRef } =
    useCreatePostContext();

  if (!localPostContent) {
    localPostContent = "";
  }

  const [showPreview, setShowPreview] = useState(false);

  const handleShowPreview = () => {
    setShowPreview((tg) => !tg);
    if (postContentRef.current && postTitleRef.current) {
      const postContent = postContentRef.current.value;
      const postTitle = postTitleRef.current.value;

      setLocalStorageItem(localPostTitle, postTitle);
      setLocalStorageItem("localPost", postContent);
    }
  };

  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_7fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content]">
        {/* dummy div */}
        <div className="dummy"></div>
        {/* post form */}
        <div>
          <Button
            onClick={() => {
              handleShowPreview();
            }}
          >
            {`${showPreview ? "Edit" : "Show Preview"}`}
          </Button>
          {showPreview ? <Preview /> : <CreatePostForm />}
        </div>
        <div className="p-1">{<MarkDownTips ref={markDownTipsRef} />}</div>
      </div>
    </MainLayout>
  );
};
