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
  } = useUpdatePost();

  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth.userId;

  const isSubmitFormPending =
    isUploadFilePending || isCreatePostPending || isUpdatePostPending;
  const isError = isUploadFileError || isCreatePostError || isUpdatePostError;

  const refactorePostData = ({ userId, title, content, titleImgURL }) => {
    const createdAt = new Date();
    const postData = {
      userId,
      title,
      content,
      titleImgURL,
      createdAt,
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

    const postData = refactorePostData({
      userId,
      title,
      content,
      titleImgURL: resImgURL,
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

  if (isSubmitFormPending) {
    const action = mode === postMode.CREATE ? "Creating" : "Editing";
    return <Loading>{`${action} post please wait ...`}</Loading>;
  }

  if (isError) {
    const action = mode === postMode.CREATE ? "creating" : "editing";
    return <Error>{`Error while ${action} post !`}</Error>;
  }

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
            <CreatePostForm
              mode={mode}
              handleUploadImgPostFormData={handleUploadImgPostFormData}
            />
          </PostContextProvider>
        </div>
      </div>
    </MainLayout>
  );
};

export default CreatePost;
