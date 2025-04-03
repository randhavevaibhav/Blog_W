import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";
import { useCallback, useState } from "react";
import { MarkDownTips } from "../../components/CreatePost/MarkDownTips/MarkDownTips";
import { postMode } from "../../utils/constants";
import { PostContextProvider } from "../../contexts/Post/PostContextProvider";

const CreatePost = () => {
  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_4fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content] md:p-0 px-4">
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
          <PostContextProvider>
            <CreatePostForm
              hideMarkdownTips={useCallback(
                () => setShowMarkDownTips(false),
                []
              )}
              showMarkDownTips={useCallback(
                () => setShowMarkDownTips(true),
                []
              )}
              mode={postMode.CREATE}
            />
           
          </PostContextProvider>
        </div>
        {showMarkDownTips ? <MarkDownTips /> : null}
      </div>
    </MainLayout>
  );
};

export default CreatePost;
