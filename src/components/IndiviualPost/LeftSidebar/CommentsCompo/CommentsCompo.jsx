import { memo } from "react";
import { AiOutlineMessage } from "react-icons/ai";

export const CommentsCompo =memo( ({commentsCount}) => {
  // console.log("CommentsCompo re-render !! ===>")
  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            document
              .getElementById("comments")
              .scrollIntoView({ behavior: "smooth" })
          }
        >
          <AiOutlineMessage  className={`cursor-pointer text-fs_3xl`} />
        </button>
        <span className="text-fs_base">{commentsCount ? commentsCount : 0}</span>
      </div>
    </>
  );
})