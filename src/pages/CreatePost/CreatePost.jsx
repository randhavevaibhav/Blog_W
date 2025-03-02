import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";
import { useState } from "react";
import { MarkDownTips } from "../../components/CreatePost/MarkDownTips/MarkDownTips";
import { Preview } from "../../components/CreatePost/Preview/Preview";

import { Button } from "../../components/common/Button/Button";
import { getLocalStorageItem } from "../../utils/browser";
import { localPost, localPostTitle } from "../../utils/constants";

export const CreatePost = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  const handlePreview = () => {
    let title = getLocalStorageItem(localPostTitle);
    let content = getLocalStorageItem(localPost);
    // console.log("title ===> ", title);
    // console.log("content ===> ", content);
    if (title && content) {
      setShowPreview((prev) => !prev);
    } else {
      alert("please add post title, content to preview.");
    }
  };

  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_7fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content]">
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
          <Button
            onClick={() => {
              handlePreview();
            }}
          >
            {`${showPreview ? "Edit" : "Show Preview"}`}
          </Button>

          {showPreview ? (
            <Preview />
          ) : (
            <CreatePostForm
              hideMarkdownTips={() => setShowMarkDownTips(false)}
              showMarkDownTips={() => setShowMarkDownTips(true)}
            />
          )}
        </div>
        {showMarkDownTips ? <MarkDownTips /> : null}
      </div>
    </MainLayout>
  );
};
