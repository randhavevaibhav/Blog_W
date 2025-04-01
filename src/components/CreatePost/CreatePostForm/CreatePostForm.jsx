import { Button } from "../../common/Button/Button";



import { useUploadFile } from "../../../hooks/posts/useUploadFile";
import { Header } from "./Header/Header";
import { PostContent } from "./PostContent/PostContent";
import { getFileObjectFromLocal } from "../../../utils/browser";

import { useEffect, useState } from "react";
import { ErrorText } from "../../common/ErrorText/ErrorText";
import { useCreatePost } from "../../../hooks/posts/useCreatePost";

import { useAuth } from "../../../hooks/auth/useAuth";
import { Link, useParams } from "react-router-dom";
import { getLocalPostInfo } from "./utils";
import { useUpdatePost } from "../../../hooks/posts/useUpdatePost";
import { LoadingTextWithGIF } from "../../common/LoadingTextWithGIF/LoadingTextWithGIF";
import { Preview } from "../Preview/Preview";
import { memo } from "react";
import { postMode } from "../../../utils/constants";

export const CreatePostForm = memo(
  ({ hideMarkdownTips, showMarkDownTips, mode }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    const { postId } = useParams();
    const { auth } = useAuth();
    const userId = auth.userId;

    const { isPending: isUploadFilePending, uploadFile } = useUploadFile();
    const { createPost, isPending: isCreatePostPending } = useCreatePost();
    const { updatePost, isPending: isUpdatePostPending } = useUpdatePost();

    const [showPreview, setShowPreview] = useState(false);
    const [error, setError] = useState({
      state: false,
      text: "",
    });

    const isSubmitFormPending =isUploadFilePending || isCreatePostPending || isUpdatePostPending;

   
    const handleUploadImgPostFormData = async (
      title,
      content,
      fileObj,
      imgURL
    ) => {
      const ImgFormData = new FormData();
      //get the file stored in local storage convert it to file object and then send.
      ImgFormData.append("file", fileObj);

      if (imgURL === null) {
        imgURL = "";
      }

      if (!imgURL.includes("https")) {
        // console.log("calling uploadFile ===> ");
        const resData = await uploadFile(ImgFormData);
        imgURL = resData.fileURL;
      }

     
      const createdAt = new Date();
      const postData = {
        userId,
        title,
        content,
        titleImgURL: imgURL,
        createdAt,
      };

      if (mode === postMode.CREATE) {
        createPost(postData);
      }

      if (mode === postMode.EDIT) {
        const editPostData = {
          ...postData,
          updatedAt: createdAt,
          postId,
        };
        updatePost(editPostData);
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
      const { title, content, imgFile, imgURL } = getLocalPostInfo(mode);

      const fileObj = getFileObjectFromLocal(imgFile);

      if (!title) {
        setError({
          ...error,
          text: "Please add title",
          state: true,
        });

        return;
      }
      if (!content) {
        setError({
          ...error,
          text: "Please add post content",
          state: true,
        });

        return;
      }

      handleUploadImgPostFormData(title, content, fileObj, imgURL);
    };

    const handlePreview = () => {
      const { title, content } = getLocalPostInfo(mode);

      if (title && content) {
        setShowPreview((prev) => !prev);
      } else {
        alert("please add post title, content to preview.");
      }
    };

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
            <Button
              onClick={() => {
                handlePreview();
              }}
              className={`boder border-[#e5e7eb] mb-4`}
            >
              {`${showPreview ? "Edit" : "Show Preview"}`}
            </Button>

            {showPreview ? (
              <Preview mode={mode} />
            ) : (
              <div>
                <form
                  className="flex flex-col h-screen md:h-[650px]"
                  onSubmit={handleSubmit}
                >
                  {/* header */}

                  <Header mode={mode} />

                  {/* Post content */}

                  <PostContent
                    showMarkDownTips={showMarkDownTips}
                    hideMarkdownTips={hideMarkdownTips}
                    mode={mode}
                  />
                  <div className="flex gap-4">
                    <Button
                      className="border mt-4"
                      disabled={isCreatePostPending || isUpdatePostPending}
                    >
                      <Link to="/dashboard">Go back</Link>
                    </Button>
                    <Button
                      className="border mt-4"
                      disabled={isCreatePostPending || isUpdatePostPending}
                    >
                      {mode === postMode.CREATE ? "Create post" : "Modify"}
                    </Button>
                  </div>
                  {error.state ? (
                    <ErrorText className="text-2xl">{error.text}</ErrorText>
                  ) : null}
                </form>
              </div>
            )}
          </>
        )}

       
      </>
    );
  }
);
