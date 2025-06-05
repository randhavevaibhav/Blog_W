import { memo } from "react";

import { Comments } from "./Comments/Comments";
import { CommentForm } from "./CommentForm/CommentForm";
import { Header } from "./Header/Header";
export const CommentSection = memo(({ commentsData, totalComments }) => {
 
  
   commentsData.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

  return (
    <>
      <section id="comments" className="max-w-[42rem]">
        <Header totalComments={totalComments} />

        <div className="comments_container flex flex-col gap-4">
          <CommentForm parentId={null}/>
          {commentsData ? (
            <Comments comments={commentsData} />
          ) : (
            <p className="text-fs_base">No comments yet.</p>
          )}
        </div>
      </section>
    </>
  );
});
