import { memo, useEffect, useState } from "react";

import { Comments } from "./Comments/Comments";
import { CommentForm } from "./CommentForm/CommentForm";
import { Header } from "./Header/Header";
import { CommentSort } from "./CommentSort/CommentSort";
import { getLocalStorageItem } from "@/utils/browser";
export const CommentSection = memo(({ commentsData, totalComments }) => {
  const [sortedCmtData, setSortedCmtData] = useState(commentsData);

  useEffect(() => {
    const sortType = getLocalStorageItem("cmtSort");

    setSortedCmtData(() => [...commentsData]);
    handleCmtSort(sortType ? { type: sortType } : { type: "latest" });
  }, [commentsData]);

  // console.log("comment section re-render")
  const handleCmtSort = ({ type }) => {
    switch (type) {
      case "top": {
        const newCmtData = commentsData.sort((a, b) => {
          return parseInt(b.likes) - parseInt(a.likes);
        });

        setSortedCmtData([...newCmtData]);
        return;
      }

      case "latest": {
        const newCmtData = commentsData.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
        setSortedCmtData([...newCmtData]);
        return;
      }

      case "old": {
        const newCmtData = commentsData.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });

        setSortedCmtData([...newCmtData]);
        return;
      }

      default:
        throw new Error("wrong value for the cmt sort type");
    }
  };
  return (
    <>
      <section id="comments" className="max-w-[42rem]">
        <div className="flex items-center gap-2">
          <Header totalComments={totalComments} />
          <CommentSort handleCmtSort={handleCmtSort} />
        </div>

        <div className="comments_container flex flex-col gap-4">
          <CommentForm parentId={null} />
          {sortedCmtData ? (
            <Comments comments={sortedCmtData} />
          ) : (
            <p className="text-fs_base">No comments yet.</p>
          )}
        </div>
      </section>
    </>
  );
});
