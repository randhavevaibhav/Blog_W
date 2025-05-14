import { useEffect, useRef, useState } from "react";
import { usePostContext } from "../../../../hooks/posts/usePostContext";

import { createPortal } from "react-dom";
import { MarkDownTips } from "../../../CreatePost/MarkDownTips/MarkDownTips";
import {
  getLocalStorageItem,
  saveLocalPostData,
} from "../../../../utils/browser";
import { FormatButtons } from "./FormatButtons/FormatButtons";
export const PostContent = ({ mode }) => {
  const { postDataRef } = usePostContext();

  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  const isEditMode = mode === "EDIT";

  const contentRef = postDataRef.current.content;
  let content = "";

  useEffect(() => {
    if (contentRef && contentRef.style) {
       contentRef.style.height = `auto`;
      contentRef.style.height = `${contentRef.scrollHeight}px`;
      
    }
  }, [contentRef]);

  const handlePostContentChange = (e) => {
    //context
    const contentVal = e.target.value;
    const contentStyle = e.target.style;
    const contentHeight = e.target.scrollHeight;
    saveLocalPostData({
      content: contentVal,
    });

    if (!contentVal) {
      contentStyle.height = `0px`;
      return;
    }

    if (contentStyle) {
      console.log("contentRef.scrollHeight ===> ", contentHeight);
      contentStyle.height = 'auto';
      contentStyle.height = `${contentHeight}px`;
    }
  };

  if (getLocalStorageItem("PostData")) {
    const localPostContent = getLocalStorageItem("PostData").content;
    content = localPostContent;
  } else if (contentRef && contentRef.value) {
    content = contentRef.value;
  }

  return (
    <div className=" post_content mb-10">
      <FormatButtons />
      <textarea
        name="post_content"
        id="post_content"
        placeholder={
          isEditMode ? `Edit post content here...` : `New post content here...`
        }
        className="w-full  bg-bg-primary border-bg-shade border-2 outline-none p-4 rounded-md h-full overflow-hidden min-h-44"
        onClick={() => setShowMarkDownTips(true)}
        onBlur={() => setShowMarkDownTips(false)}
        defaultValue={content}
        onChange={handlePostContentChange}
        ref={(el) => (postDataRef.current.content = el)}
      ></textarea>
      {showMarkDownTips
        ? createPortal(
            <MarkDownTips />,
            document.getElementById("post_form_grid")
          )
        : null}
    </div>
  );
};
