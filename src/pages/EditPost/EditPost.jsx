import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";

import { postMode } from "../../utils/constants";
import { PostContextProvider } from "../../contexts/Post/PostContextProvider";

const EditPost = () => {
  return (
    <MainLayout className="mb-0">
      <div className="grid md:grid-cols-[64px_4fr_3fr] grid-cols-1 grid-rows-[min-content_1fr_min-content] md:px-4 px-2 pt-2"  id="post_form_grid">
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
          <PostContextProvider>
            <CreatePostForm mode={postMode.EDIT} />
          </PostContextProvider>
        </div>
      </div>
    </MainLayout>
  );
};

export default EditPost;
