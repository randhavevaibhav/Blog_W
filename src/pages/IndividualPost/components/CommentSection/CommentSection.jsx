import { forwardRef } from "react";
import { CommentForm } from "./CommentForm/CommentForm";
import { Header } from "./Header/Header";
import { CommentList } from "./CommentList/CommentList";
import { CommentSort } from "./CommentSort/CommentSort";

export const CommentSection = forwardRef(({ totalComments }, ref) => {

  return (
    <>
      <section
        id="comments"
        className="md:p-6 p-4 scroll-mt-header bg-card-bg rounded-b-xl boder shadow"
        ref={ref}
      >
        <div className="max-w-[42rem]">
          <div className="flex items-center gap-2">
            <Header totalComments={totalComments} />
            {totalComments > 1 ? <CommentSort /> : null}
          </div>
          <div className="comments_container flex flex-col gap-4">
            <CommentForm parentId={null} />

            <CommentList totalComments={totalComments} />
          </div>
        </div>
      </section>
    </>
  );
});
