import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";

import { postMode } from "../../utils/constants";
import { PostContextProvider } from "../../contexts/Post/PostContextProvider";

const EditPost = () => {
  return (
    <MainLayout>
      <div className="grid md:grid-cols-[64px_4fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content] md:p-0 px-4"  id="post_form_grid">
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
