import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";
import { useCallback, useState } from "react";
import { MarkDownTips } from "../../components/CreatePost/MarkDownTips/MarkDownTips";


export const CreatePost = () => {

  const [showMarkDownTips, setShowMarkDownTips] = useState(false);


  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_7fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content]">
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
         

          <CreatePostForm
            hideMarkdownTips={useCallback(() => setShowMarkDownTips(false),[])}
            showMarkDownTips={useCallback(() => setShowMarkDownTips(true),[])}
            mode="CREATE"
          />
        </div>
        {showMarkDownTips ? <MarkDownTips /> : null}
      </div>
    </MainLayout>
  );
};
