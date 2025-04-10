import { useState } from "react";
import { usePostContext } from "../../../../hooks/posts/usePostContext";

import { createPortal } from "react-dom";
import { MarkDownTips } from "../../../CreatePost/MarkDownTips/MarkDownTips";
import { getLocalStorageItem, saveLocalPostData } from "../../../../utils/browser";
import { FormatButtons } from "./FormatButtons/FormatButtons";
export const PostContent = ({ mode }) => {
  const { postDataRef } = usePostContext();

  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  const handlePostContentChange = (e) => {
    //context
    const contentVal = e.target.value;
   saveLocalPostData({
    content:contentVal
   })
  };
  const isEditMode = mode === "EDIT";

  const contentRef = postDataRef.current.content;
  let content = "";
  if (getLocalStorageItem("PostData")) {
    const localPostContent = getLocalStorageItem("PostData").content;
    content = localPostContent;
  } else if (contentRef && contentRef.value) {
    content = contentRef.value;
  }


  return (
    <div className=" post_content h-full mb-10">
    <FormatButtons/>
      <textarea
        name="post_content"
        id="post_content"
        placeholder={
          isEditMode ? `Edit post content here...` : `New post content here...`
        }
        className="w-full min-h-[26rem]  bg-bg-primary  border-bg-shade border-2 outline-none p-4 rounded-md"
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
