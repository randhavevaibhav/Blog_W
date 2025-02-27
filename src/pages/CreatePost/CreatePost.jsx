import { MainLayout } from "../../components/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";
import { useState } from "react";
import { MarkDownTips } from "../../components/CreatePost/MarkDownTips/MarkDownTips";
import { Preview } from "../../components/CreatePost/Preview/Preview";

import { Button } from "../../components/Button/Button";

export const CreatePost = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [showMarkDownTips, setShowMarkDownTips] = useState(false);
  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_7fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content]">
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
          <Button onClick={() => setShowPreview((prev) => !prev)}>
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
      {showMarkDownTips ? (
        <MarkDownTips  />
      ) : null}

      </div>
      
    </MainLayout>
  );
};
