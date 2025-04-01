import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";
import { useState } from "react";
import { MarkDownTips } from "../../components/CreatePost/MarkDownTips/MarkDownTips";
import { postMode } from "../../utils/constants";

export const EditPost = () => {
  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_4fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content] md:p-0 px-4">
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
          <CreatePostForm
            hideMarkdownTips={() => setShowMarkDownTips(false)}
            showMarkDownTips={() => setShowMarkDownTips(true)}
            mode={postMode.EDIT}
          />
        </div>
        {showMarkDownTips ? <MarkDownTips /> : null}
      </div>
    </MainLayout>
  );
};
