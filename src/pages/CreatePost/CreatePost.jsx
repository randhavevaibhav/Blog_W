import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { CreatePostForm } from "../../components/CreatePost/CreatePostForm/CreatePostForm";
import { postMode } from "../../utils/constants";
import { PostContextProvider } from "../../contexts/Post/PostContextProvider";
import { useUploadFile } from "@/hooks/posts/useUploadFile";
import { useCreatePost } from "@/hooks/posts/useCreatePost";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import { useAuth } from "@/hooks/auth/useAuth";
import { useGetAllHashtags } from "@/hooks/hashtags/useGetAllHashtags";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";

const CreatePost = ({ mode = "CREATE" }) => {
  const {
    isPending: isUploadFilePending,
    uploadFile,
    isError: isUploadFileError,
  } = useUploadFile();
  const {
    createPost,
    isPending: isCreatePostPending,
    isError: isCreatePostError,
  } = useCreatePost();
  const {
    updatePost,
    isPending: isUpdatePostPending,
    isError: isUpdatePostError,
    error,
  } = useUpdatePost();

  const {
    isPending: isGetHashtagsPending,
    data: hashtagsData,
    error: getHashtagsError,
    isGetHashtagsError,
  } = useGetAllHashtags();

  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth.userId;

  const isSubmitFormPending =
    isUploadFilePending || isCreatePostPending || isUpdatePostPending;
  const isError = isUploadFileError || isCreatePostError || isUpdatePostError;

  const refactorPostData = ({
    userId,
    title,
    content,
    titleImgURL,
    tagList,
  }) => {
    const createdAt = new Date();
    const updatedAt = createdAt;
    const postData = {
      userId,
      title,
      content,
      titleImgURL,
      createdAt,
      tagList,
      updatedAt,
    };

    return postData;
  };

  const handleImgUpload = async (imgFile) => {
    let resImgURL = "";
    const ImgFormData = new FormData();
    ImgFormData.append("post_title_img_file", imgFile);
    const resData = await uploadFile({
      formData: ImgFormData,
      url: `title-img`,
    });
    resImgURL = resData.fileURL;

    return resImgURL;
  };

  const handleUploadImgPostFormData = async ({
    title,
    content,
    imgURL,
    imgFile,
    tagList,
  }) => {
    if (!imgURL) {
      imgURL = "";
    }

    let resImgURL = null;

    if (!imgURL.includes("supabase")) {
      resImgURL = await handleImgUpload(imgFile);
    }
    if (imgURL.includes("supabase")) {
      resImgURL = imgURL;
    }

    const postData = refactorPostData({
      userId,
      title,
      content,
      titleImgURL: resImgURL,
      tagList,
    });
    if (mode === postMode.CREATE) {
      createPost(postData);
    }

    if (mode === postMode.EDIT) {
      const editPostData = {
        ...postData,
        updatedAt: postData.createdAt,
        postId,
      };
      updatePost(editPostData);
    }
  };

  if (isGetHashtagsPending) {
    return <Loading>{`Loading form please wait ...`}</Loading>;
  }

  if (isSubmitFormPending) {
    const action = mode === postMode.CREATE ? "Creating" : "Editing";
    return <Loading>{`${action} post please wait ...`}</Loading>;
  }

 //Errors from server are handled in useCreatePost hook.

  const hashtags = [...Object.values(hashtagsData.hashtags)];

  return (
    <MainLayout className={`md:mx-auto max-w-[1380px] mb-0`}>
      <div
        className="grid md:grid-cols-[4rem_10fr_3fr] grid-cols-1  grid-rows-[min-content_1fr_min-content] gap-2 pt-2 px-4 md:px-0"
        id="post_form_grid"
      >
        {/* dummy div */}
        <div className="dummy"></div>
        <div className={``}>
          <PostContextProvider>
            <CreatePostForm
              mode={mode}
              handleUploadImgPostFormData={handleUploadImgPostFormData}
              hashtags={hashtags}
            />
          </PostContextProvider>
        </div>
      </div>
      <ScrollToTop />
    </MainLayout>
  );
};

export default CreatePost;
