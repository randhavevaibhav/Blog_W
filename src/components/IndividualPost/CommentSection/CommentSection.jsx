import { forwardRef, useCallback, useState } from "react";

import { CommentForm } from "./CommentForm/CommentForm";
import { Header } from "./Header/Header";

import { setLocalStorageItem } from "@/utils/browser";
import { CommentList } from "./CommentList/CommentList";

export const CommentSection = forwardRef(({ totalComments }, ref) => {
  const [sortCmtBy, setSortCmtBy] = useState("desc");

  // console.log("comment section re-render");

  const handleCmtSort = ({ option = "desc" }) => {
    switch (option) {
      case "asc": {
        setSortCmtBy("asc");
        setLocalStorageItem("sortCmt", "asc");
        return;
      }
      case "desc": {
        setSortCmtBy("desc");
        setLocalStorageItem("sortCmt", "desc");
        return;
      }
      case "likes": {
        setSortCmtBy("likes");
        setLocalStorageItem("sortCmt", "likes");
        return;
      }
      default:
        throw new Error("wrong value for the cmt sort type");
    }
  };
  const memoisedHandleCmtSort = useCallback(handleCmtSort, [totalComments]);

  return (
    <>
      <section
        id="comments"
        className="md:p-6 p-4 scroll-mt-header bg-card-bg rounded-b-xl boder shadow"
        ref={ref}
      >
        <div className="max-w-[42rem]">
          <div className="flex items-center gap-2">
            <Header
              totalComments={totalComments}
              handleCmtSort={memoisedHandleCmtSort}
              changeValue={sortCmtBy}
            />
          </div>

          <div className="comments_container flex flex-col gap-4">
            <CommentForm
              parentId={null}
              handleCmtSort={memoisedHandleCmtSort}
            />

            <CommentList sortCmtBy={sortCmtBy} totalComments={totalComments} />
          </div>
        </div>
      </section>
    </>
  );
});
