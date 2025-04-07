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
          <AiOutlineMessage size={"1.9rem"} className={`cursor-pointer`} />
        </button>
        <span>{commentsCount ? commentsCount : 0}</span>
      </div>
    </>
  );
})