import { Button } from "@/components/ui/button";
import { useUploadFile } from "../../../hooks/posts/useUploadFile";
import { PostHeading } from "./PostHeading/PostHeading";
import { PostContent } from "./PostContent/PostContent";

import { useEffect, useState } from "react";
import { useCreatePost } from "../../../hooks/posts/useCreatePost";

import { useAuth } from "../../../hooks/auth/useAuth";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useUpdatePost } from "../../../hooks/posts/useUpdatePost";
import { LoadingTextWithGIF } from "../../common/LoadingTextWithGIF/LoadingTextWithGIF";
import { Preview } from "./Preview/Preview";
import { memo } from "react";
import { postMode } from "../../../utils/constants";
import { usePostContext } from "../../../hooks/posts/usePostContext";
import { getLocalStorageItem } from "../../../utils/browser";

import { clearLocalPostData } from "../../../utils/browser";
import toast from "react-hot-toast";
import { PostCoverImg } from "./PostCoverImg/PostCoverImg";
import { FormatButtons } from "../../common/FormatButtons/FormatButtons";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";

export const CreatePostForm = memo(({ mode }) => {
  const { postId } = useParams();
  const { auth } = useAuth();
  const userId = auth.userId;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { isPending: isUploadFilePending, uploadFile,isError:isUploadFileError} = useUploadFile();
  const { createPost, isPending: isCreatePostPending ,isError:isCreatePostError} = useCreatePost();
  const { updatePost, isPending: isUpdatePostPending,isError:isUpdatePostError } = useUpdatePost();

  const { postDataRef } = usePostContext();

  const [showPreview, setShowPreview] = useState(false);

  const navigate = useNavigate();

  const isSubmitFormPending =
    isUploadFilePending || isCreatePostPending || isUpdatePostPending;

  const isError = isUploadFileError || isCreatePostError || isUpdatePostError;

  const isEditPostData = getLocalStorageItem("PostData")
    ? getLocalStorageItem("PostData").isEditPostData
    : false;

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

  if (mode === postMode.CREATE && isEditPostData) {
    clearLocalPostData();
  }

  if (isSubmitFormPending) {
    return (
      <LoadingTextWithGIF>
        {mode === postMode.CREATE
          ? "Creating new post please wait..."
          : "Saving post please wait..."}
      </LoadingTextWithGIF>
    );
  }

  if (showPreview) {
    return <Preview hidePreview={() => setShowPreview(false)} />;
  }

  if(isError)
  {
    const action = mode === postMode.CREATE?"creating":"editing"
    return <ErrorText>{`Error while ${action} post`}</ErrorText>
  }

  return (
    <>
      {/* Post cover Img */}
      <div className="flex gap-2 items-center mb-4">
        <Button
          onClick={() => {
            handlePreview();
          }}
          className={``}
        >
          Show preview
        </Button>
        <PostCoverImg />
      </div>
      {/* Create post form */}
      <form className="flex flex-col" onSubmit={handleSubmit}>
        {/* header h-scminushdminusfoot overflow-y-auto*/}
        {/* Post Heading */}
        <PostHeading mode={mode} />
        {/* Post content format button group */}
        <FormatButtons />
        {/* Post content */}
        <div className="h-postcontentheight overflow-y-auto px-4">
          <PostContent mode={mode} />
        </div>
        {/* Navigation button */}
        <div className="flex gap-4">
          <Link
            className="border px-8 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50 hover:shadow mt-4 text-fs_base"
            disabled={isCreatePostPending || isUpdatePostPending}
            onClick={() => {
              clearLocalPostData();
              navigate(-1);
            }}
          >
            Go back
          </Link>
          {/* Create/Edit post button */}
          <Button
            className="border mt-4"
            disabled={isCreatePostPending || isUpdatePostPending}
            type="submit"
          >
            {mode === postMode.CREATE ? "Create post" : "Modify"}
          </Button>
        </div>
      </form>
    </>
  );
});
