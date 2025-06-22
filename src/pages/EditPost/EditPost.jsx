import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";

import { postMode } from "../../utils/constants";
import { PostContextProvider } from "../../contexts/Post/PostContextProvider";
import { useGetIndiviualPost } from "@/hooks/posts/useGetIndiviualPost";
import PageNotFound from "../PageNotFound/PageNotFound";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { setLocalStorageItem } from "@/utils/browser";

const EditPost = () => {
  const {
    isPending: isFetchIndviPostPending,
    data,
    isError,
    error,
  } = useGetIndiviualPost();

  if (isError) {
    if (error.status === 404) {
      return <PageNotFound>No post found !</PageNotFound>;
    } else {
      return (
        <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
          <ErrorText>Error while loading post !</ErrorText>
        </MainLayout>
      );
    }
  }

  if (isFetchIndviPostPending) {
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Loading post...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  const postData = data.postData;

  setLocalStorageItem("PostData", {
    title: postData.title,
    content: postData.content,
    imgURL: postData.titleImgURL,
    isEditPostData: true,
  });
  return (
    <MainLayout className="mb-0">
      <div
        className="grid md:grid-cols-[64px_4fr_3fr] grid-cols-1 grid-rows-[min-content_1fr_min-content] md:px-4 px-2 pt-2"
        id="post_form_grid"
      >
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
