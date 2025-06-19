import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";

import { postMode } from "../../utils/constants";
import { PostContextProvider } from "../../contexts/Post/PostContextProvider";


const CreatePost = () => {

  
  return (
    <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
      <div
        className="grid md:grid-cols-[4rem_9fr_3fr] grid-cols-1  grid-rows-[min-content_1fr_min-content] gap-2 pt-2 px-4 md:px-0"
        id="post_form_grid"
      >
        {/* dummy div */}
        <div className="dummy"></div>
        <div>
          <PostContextProvider>
            <CreatePostForm mode={postMode.CREATE} />
          </PostContextProvider>
        </div>
      </div>
    
    </MainLayout>
  );
};

export default CreatePost;
