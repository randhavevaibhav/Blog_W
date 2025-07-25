import { Button } from "@/components/ui/button";
import { PostHeading } from "./PostHeading/PostHeading";
import { PostContent } from "./PostContent/PostContent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Preview } from "./Preview/Preview";
import { memo } from "react";
import { postMode } from "../../../utils/constants";
import { usePostContext } from "../../../hooks/posts/usePostContext";
import { getLocalStorageItem } from "../../../utils/browser";
import { clearLocalPostData } from "../../../utils/browser";
import toast from "react-hot-toast";
import { PostCoverImg } from "./PostCoverImg/PostCoverImg";
import { FormatButtons } from "../../common/FormatButtons/FormatButtons";
import { HashtagList } from "./HashtagList/HashtagList";

export const CreatePostForm = memo(
  ({ mode, handleUploadImgPostFormData, hashtags }) => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

    const { postDataRef, clearRefData } = usePostContext();

    const [showPreview, setShowPreview] = useState(false);

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

      if (titleCharLength > 70) {
        toast.error("Post title length cannot exceed 70 characters.");

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
        toast.error(`Please add title and content to preview`);
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

          <div className={`overflow-y-auto h-postcontentheight`}>
            {/* Post cover Img */}
            <div className="flex gap-2 items-center mb-2">
              <Button
                onClick={() => {
                  handlePreview();
                }}
                className={``}
                variant={`action`}
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
              className=" px-4 py-1 rounded-md mt-4 "
              onClick={() => {
                if (mode === postMode.EDIT) {
                  clearLocalPostData();
                }
                navigate(-1);
              }}
              type={`button`}
            >
              Go back
            </Button>
            {/* Create/Edit post button */}
            <Button className="border mt-4" type="submit" variant="action">
              {mode === postMode.CREATE ? "Create post" : "Modify"}
            </Button>
          </div>
        </form>
      </>
    );
  }
);
// overflow-y-auto h-scminushd
