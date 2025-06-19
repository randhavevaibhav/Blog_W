import { memo, useCallback, useState } from "react";

import { CommentForm } from "./CommentForm/CommentForm";
import { Header } from "./Header/Header";

import _ from "lodash";

import { setLocalStorageItem } from "@/utils/browser";
import { CommentList } from "./CommentList/CommentList";

export const CommentSection = memo(({ totalComments }) => {
  const [sortCmtBy, setSortCmtBy] = useState("desc");

  // console.log("comment section re-render");
  const handleCmtSort = ({ type = "desc" }) => {
    if (totalComments <= 1) {
      return;
    }
    switch (type) {
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
  const memoisedHandleCmtSort = useCallback(handleCmtSort, []);

  return (
    <>
      <section
        id="comments"
        className=" bg-bg-shade md:p-6 p-2 scroll-mt-header"
      >
        <div className="max-w-[42rem]">
          <div className="flex items-center gap-2">
            <Header
              totalComments={totalComments}
              handleCmtSort={memoisedHandleCmtSort}
            />
          </div>

          <div className="comments_container flex flex-col gap-4">
            <CommentForm parentId={null} />
            {totalComments > 0 ? (
              <CommentList sortCmtBy={sortCmtBy} />
            ) : (
              <p className="text-fs_base">No comments yet.</p>
            )}
          </div>
        </div>
      </section>
    </>
  );
});
