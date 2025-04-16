import { Button } from "../../common/Button/Button";

import { useUploadFile } from "../../../hooks/posts/useUploadFile";
import { Header } from "./Header/Header";
import { PostContent } from "./PostContent/PostContent";

import { useEffect, useState } from "react";
import { ErrorText } from "../../common/ErrorText/ErrorText";
import { useCreatePost } from "../../../hooks/posts/useCreatePost";

import { useAuth } from "../../../hooks/auth/useAuth";
import { Link, useParams } from "react-router-dom";

import { useUpdatePost } from "../../../hooks/posts/useUpdatePost";
import { LoadingTextWithGIF } from "../../common/LoadingTextWithGIF/LoadingTextWithGIF";
import { Preview } from "../Preview/Preview";
import { memo } from "react";
import { postMode } from "../../../utils/constants";
import { usePostContext } from "../../../hooks/posts/usePostContext";
import { getLocalStorageItem } from "../../../utils/browser";

import { clearLocalPostData } from "../../../utils/browser";
import toast from "react-hot-toast";
export const CreatePostForm = memo(({ mode }) => {
  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth.userId;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isPending: isUploadFilePending, uploadFile } = useUploadFile();
  const { createPost, isPending: isCreatePostPending } = useCreatePost();
  const { updatePost, isPending: isUpdatePostPending } = useUpdatePost();

  const { postDataRef } = usePostContext();

  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState({
    state: false,
    text: "",
  });

  const isSubmitFormPending =
    isUploadFilePending || isCreatePostPending || isUpdatePostPending;

  const handleImgUpload = async (imgFile) => {
    let resImgURL = "";
    const ImgFormData = new FormData();
    ImgFormData.append("post_title_img_file", imgFile);
    const resData = await uploadFile({formData:ImgFormData,url:`title-img`});
    resImgURL = resData.fileURL;

    return resImgURL;
  };

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

  const handleUploadImgPostFormData = async ({
    title,
    content,
    imgURL,
    imgFile,
  }) => {
    if (imgURL === null) {
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

  const getPostData = () => {
    const title = postDataRef.current.title.value;
    const content = postDataRef.current.content.value;
    const imgFile = postDataRef.current.imgFile;
    const imgURL = postDataRef.current.imgURL;

    return {
      title,
      content,
      imgFile,
      imgURL,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    const { title, content, imgFile, imgURL } = getPostData();
    if (!title || !content) {
      toast.error(
        `Please add title and content to ${
          mode === postMode.CREATE ? `create` : `edit`
        } post.`
      );

      return;
    }

    handleUploadImgPostFormData({ title, content, imgURL, imgFile });
  };

  const handlePreview = () => {
    const title = postDataRef.current.title.value;
    const content = postDataRef.current.content.value;

    if (title && content) {
      setShowPreview(true);
    } else {
      toast.error(`Please add title and content to preview`);
    }
  };

  const isEditPostData = getLocalStorageItem("PostData")
    ? getLocalStorageItem("PostData").isEditPostData
    : false;
  if (mode === postMode.CREATE && isEditPostData) {
    clearLocalPostData();
  }

  return (
    <>
      {isSubmitFormPending ? (
        <LoadingTextWithGIF>
          {mode === postMode.CREATE
            ? "Creating new post please wait..."
            : "Saving post please wait..."}
        </LoadingTextWithGIF>
      ) : (
        <>
          {showPreview ? (
            <Preview hidePreview={() => setShowPreview(false)} />
          ) : (
            <>
              <Button
                onClick={() => {
                  handlePreview();
                }}
                className={`boder border-[#e5e7eb] mb-4`}
              >
                Show preview
              </Button>

              <div>
                <form
                  className="flex flex-col h-screen md:h-[650px]"
                  onSubmit={handleSubmit}
                >
                  {/* header */}

                  <Header mode={mode} />

                  {/* Post content */}

                  <PostContent mode={mode} />
                  <div className="flex gap-4">
                    <Link
                      to="/dashboard"
                      className="border px-8 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50 hover:shadow mt-4"
                      disabled={isCreatePostPending || isUpdatePostPending}
                      onClick={clearLocalPostData}
                    >
                      Go back
                    </Link>

                    <Button
                      className="border mt-4"
                      disabled={isCreatePostPending || isUpdatePostPending}
                      type="submit"
                    >
                      {mode === postMode.CREATE ? "Create post" : "Modify"}
                    </Button>
                  </div>
                  {error.state ? (
                    <ErrorText className="text-lg">{error.text}</ErrorText>
                  ) : null}
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
});
