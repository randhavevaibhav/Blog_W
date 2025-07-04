import { Button } from "@/components/ui/button";
import { PostHeading } from "./PostHeading/PostHeading";
import { PostContent } from "./PostContent/PostContent";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Preview } from "./Preview/Preview";
import { memo } from "react";
import { postMode } from "../../../utils/constants";
import { usePostContext } from "../../../hooks/posts/usePostContext";
import { getLocalStorageItem } from "../../../utils/browser";

import { clearLocalPostData } from "../../../utils/browser";
import toast from "react-hot-toast";
import { PostCoverImg } from "./PostCoverImg/PostCoverImg";
import { FormatButtons } from "../../common/FormatButtons/FormatButtons";

export const CreatePostForm = memo(({ mode, handleUploadImgPostFormData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { postDataRef } = usePostContext();

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
      toast.error("Post title length cannot exceed 70 charachters.");

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

  if (showPreview) {
    return <Preview hidePreview={() => setShowPreview(false)} />;
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
        <div className="h-postcontentheight overflow-y-auto">
          <PostContent mode={mode} />
        </div>
        {/* Navigation button */}
        <div className="flex gap-4">
          <Link
            className="border px-8 py-1 rounded-md disabled:cursor-not-allowed disabled:opacity-50 hover:shadow mt-4 text-fs_base"
            onClick={() => {
              if (mode === postMode.EDIT) {
                clearLocalPostData();
              }
              navigate(-1);
            }}
          >
            Go back
          </Link>
          {/* Create/Edit post button */}
          <Button className="border mt-4" type="submit" variant="action">
            {mode === postMode.CREATE ? "Create post" : "Modify"}
          </Button>
        </div>
      </form>
    </>
  );
});
