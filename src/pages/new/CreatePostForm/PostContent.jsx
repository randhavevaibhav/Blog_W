import { Button } from "../../../comonents/Button/Button";

import { forwardRef, useContext, useState } from "react";

import { CreatePostContext } from "../CreatePost";
import { getLocalStorageItem } from "../../../utils/browser";

export const PostContent = forwardRef((props, ref) => {
  const {markDownTipsRef } = useContext(CreatePostContext);

  let loacalPostContent = getLocalStorageItem("localPost");
  if (!loacalPostContent) {
    loacalPostContent = "";
  }

  return (
    <div className=" post_content  md:px-16 md:py-6 px-4 py-2 h-full">
      <div className="flex gap-2 helpers mb-4">
        <Button>A</Button>
        <Button>A</Button>
        <Button>A</Button>
        <Button>A</Button>
      </div>
      <textarea
        name="post_content"
        id="post_content"
        placeholder="New post content here..."
        className="w-full min-h-[10rem]  bg-bg-primary outline-none"
        onClick={() => {
          // markDownTipsRef.current.classList.remove("hidden")
          //markDownTipsRef.current.classList.add("md:block")
          markDownTipsRef.current.classList.add("md:block")
        }}
        onBlur={() => {
          // markDownTipsRef.current.classList.remove("md:block")
          markDownTipsRef.current.classList.remove("md:block")
        }}
        ref={ref}
      >
        {loacalPostContent}
      </textarea>

      <div>
        <Button className="border mt-4">Create post</Button>
      </div>
      {/* {showTips&& <MarkDownTips />} */}
    </div>
  );
});
