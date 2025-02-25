import { Button } from "../../../components/Button/Button";

import { forwardRef } from "react";

import { getLocalStorageItem } from "../../../utils/browser";
import { useCreatePostContext } from "../../../hooks/posts/useCreatePostContext";
import { localPost } from "../../../utils/constants";

export const PostContent = forwardRef((props, ref) => {
  const { markDownTipsRef } = useCreatePostContext();

  let loacalPostContent = getLocalStorageItem(localPost);
  if (!loacalPostContent) {
    loacalPostContent = "";
  }

  return (
    <div className=" post_content  md:px-16 md:py-6 px-4 py-2 h-full">
      <div className="flex gap-2 helpers mb-4">
        <Button className={`font-bold`}>B</Button>
        <Button className={`font-bold italic`}>I</Button>
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
          markDownTipsRef.current.classList.add("md:block");
        }}
        onBlur={() => {
          // markDownTipsRef.current.classList.remove("md:block")
          markDownTipsRef.current.classList.remove("md:block");
        }}
        ref={ref}
        defaultValue={loacalPostContent}
      ></textarea>

      {/* {showTips&& <MarkDownTips />} */}
    </div>
  );
});
