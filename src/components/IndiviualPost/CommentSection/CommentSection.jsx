import { useRef } from "react";
import { Button } from "../../common/Button/Button";
import { format } from "date-fns";
import { useCreateComment } from "../../../hooks/comments/useCreateComment";
import { LoadingWithText } from "../../common/LoadingWithText/LoadingWithText";
import { Toaster } from "react-hot-toast";
import { Comments } from "./Comments/Comments";

export const CommentSection = ({ data }) => {

 
  const commentContentRef = useRef(null);
  
  const { isPending: isCreateCommentPending, createComment } =
    useCreateComment();

  const handleSubmit = (e) => {
    e.preventDefault();
    const content = commentContentRef.current.value;
    const createdAt = format(new Date(), "yyyy-MM-dd");

    const formdata = {
      content,
      createdAt,
    };

    createComment(formdata);
    commentContentRef.current.value = "";
  };

  return (
    <>
      <section id="comments" className="max-w-[42rem]" >
        <header className="text-2xl font-bold flex gap-4 mb-2">
          <h2>Comments</h2>

          <span id="total_comments_count">
            {`( ${data?data.total_comments_count:0} )`}
          </span>
        </header>

        <div className="comments_container flex flex-col gap-4">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <textarea
                name="comments_text_area"
                placeholder="post a comment"
                id="comments_text_area"
                className="w-full text-text-primary bg-bg-primary border dark:border-gray-50  dark:border-opacity-50 outline-blue-500 p-3
              rounded-md"
                ref={commentContentRef}
                onKeyUp={(e) => {
                  if (e.code === "Enter") {
                    handleSubmit(e);
                  }
                }}
              ></textarea>
              <Button
                varient="primary"
                className="self-start"
                disabled={isCreateCommentPending}
              >
                Submit
              </Button>
              {isCreateCommentPending ? (
                <LoadingWithText>posting comment ...</LoadingWithText>
              ) : null}
            </div>
          </form>

          {data ? <Comments data={data.comments} /> : <p>No comments yet.</p>}
        </div>
      </section>
      <Toaster/>
    </>
  );
};
