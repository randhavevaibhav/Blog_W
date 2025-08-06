import { useState } from "react";
import { usePostContext } from "../../../../hooks/posts/usePostContext";

import { createPortal } from "react-dom";
import { MarkDownTips } from "./MarkDownTips/MarkDownTips";
import {
  getLocalStorageItem,
  saveLocalPostData,
} from "../../../../utils/browser";
import TextareaAutosize from "react-textarea-autosize";
export const PostContent = ({ mode }) => {
  const { postDataRef } = usePostContext();

  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  const isEditMode = mode === "EDIT";

  const contentRef = postDataRef.current.content;
  let content = "";

  const handlePostContentChange = (e) => {
    const contentVal = e.target.value;

    saveLocalPostData({
      content: contentVal,
    });
  };
  // If local data is present pick from local otherwise get it from Ref
  if (getLocalStorageItem("PostData")) {
    const localPostContent = getLocalStorageItem("PostData").content;
    content = localPostContent;
  } else if (contentRef && contentRef.value) {
    content = contentRef.value;
  }

  return (
    <div className=" post_content">
      <TextareaAutosize
        name="post_content"
        id="post_content"
        placeholder={
          isEditMode ? `Edit post content here...` : `New post content here...`
        }
        className="w-full rounded-lg bg-bg-shade border-card-border border-2 outline-none p-4  h-full overflow-hidden min-h-44"
        onClick={() => setShowMarkDownTips(true)}
        onBlur={() => setShowMarkDownTips(false)}
        defaultValue={content}
        onChange={handlePostContentChange}
        ref={(el) => (postDataRef.current.content = el)}
        data-test={`post-content-text-area`}
      ></TextareaAutosize>
      {showMarkDownTips
        ? createPortal(
            <MarkDownTips />,
            document.getElementById("post_form_grid")
          )
        : null}
    </div>
  );
};
