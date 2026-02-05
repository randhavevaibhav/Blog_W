import { Button } from "@/components/ui/button";
import { PostHeading } from "./PostHeading/PostHeading";
import { PostContent } from "./PostContent/PostContent";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Preview } from "./Preview/Preview";
import { memo } from "react";
import { Post_Title_Max_Char_Limit, postMode } from "../../../utils/constants";
import { usePostContext } from "../../../hooks/posts/usePostContext";
import { getLocalStorageItem } from "../../../utils/browser";
import { clearLocalPostData } from "../../../utils/browser";
import toast from "react-hot-toast";
import { PostCoverImg } from "./PostCoverImg/PostCoverImg";
import { FormatButtons } from "../../common/FormatButtons/FormatButtons";
import { HashtagList } from "./HashtagList/HashtagList";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";

export const CreatePostForm = memo(
  ({ mode, handleUploadImgPostFormData, hashtags }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const { postDataRef, clearRefData } = usePostContext();

    const [showPreview, setShowPreview] = useState(false);
    const postFormContentRef = useRef(null);

    const navigate = useNavigate();

    const isEditPostData = getLocalStorageItem("PostData")
      ? getLocalStorageItem("PostData").isEditPostData
      : false;

    const getPostData = () => {
      const title = postDataRef.current.title.value;
      const content = postDataRef.current.content.value;
      const imgFile = postDataRef.current.imgFile;
      const imgURL = postDataRef.current.imgURL;
      const tagList = postDataRef.current.tagList;

      return {
        title,
        content,
        imgFile,
        imgURL,
        tagList,
      };
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);

      const { title, content, imgFile, imgURL, tagList } = getPostData();
      const titleCharLength = title.length;
      if (!title || !content) {
        toast.error(
          `Please add title and content to ${
            mode === postMode.CREATE ? `create` : `edit`
          } post.`
        );

        return;
      }

      if (titleCharLength > Post_Title_Max_Char_Limit) {
        toast.error(`Post title length cannot exceed ${Post_Title_Max_Char_Limit} characters.`);
        return;
      }

      handleUploadImgPostFormData({ title, content, imgURL, imgFile, tagList });
    };

    const handlePreview = () => {
      const title = postDataRef.current.title.value;
      const content = postDataRef.current.content.value;

      if (title && content) {
        setShowPreview(true);
      } else {
        toast.error(`Please add title and content to preview.`);
      }
    };

    // If mode is create post the clear all local data and also clear all ref data
    if (mode === postMode.CREATE && isEditPostData) {
      clearLocalPostData();
      clearRefData();
    }

    if (showPreview) {
      return <Preview hidePreview={() => setShowPreview(false)} />;
    }

    return (
      <>
        {/* Post cover Img */}

        {/* Create post form */}
        <form className="flex flex-col gap-2 " onSubmit={handleSubmit}>
          {/* header h-scminushdminusfoot overflow-y-auto*/}

          <div
            className={`overflow-y-auto h-postcontentheight md:px-4 px-0`}
            ref={postFormContentRef}
          >
            {/* Post cover Img */}
            <div className="flex gap-2 items-center mb-2">
              <Button
                onClick={() => {
                  handlePreview();
                }}
                className={`font-semibold`}
                variant={`action`}
                data-test={`show-preview-btn`}
                type="button"
                size={`lg`}
              >
                Show preview
              </Button>
              <PostCoverImg />
            </div>
            {/* Post Heading */}
            <PostHeading mode={mode} />
            <HashtagList hashtags={hashtags} />
            {/* format button group */}
            <FormatButtons className={`my-4`} />
            {/* Post content */}
            <PostContent mode={mode} />
          </div>
          {/* Navigation button */}
          <div className="flex gap-4">
            <Button
              className=" px-4 py-1 rounded-md mt-4 font-semibold"
              onClick={() => {
                if (mode === postMode.EDIT) {
                  clearLocalPostData();
                }
                navigate(-1);
              }}
                size={`lg`}
              type={`button`}
              data-test={`back-btn`}
            >
              Go back
            </Button>
            {/* Create/Edit post button */}
            <Button
              className="border mt-4 font-semibold"
              type="submit"
              variant="action"
                size={`lg`}
              data-test={
                mode === postMode.CREATE
                  ? "create-post-submit-btn"
                  : "edit-post-submit-btn"
              }
            >
              {mode === postMode.CREATE ? "Create post" : "Modify"}
            </Button>
          </div>
        </form>
        <ScrollToTop ref={postFormContentRef} />
      </>
    );
  }
);
