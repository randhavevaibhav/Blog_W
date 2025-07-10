import React, { memo, useRef, useState } from "react";
import { useCreateComment } from "../../../../hooks/comments/useCreateComment";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { getLocalStorageItem } from "@/utils/browser";
import { Textarea } from "@/components/common/Textarea/Textarea";

export const CommentForm = memo(
  ({
    parentId = null,
    isReplyForm = false,
    handleFormDismiss,
    handleCmtSort,
    page = 0,
  }) => {
    const sortBy = getLocalStorageItem("sortCmt")
      ? getLocalStorageItem("sortCmt")
      : "desc";

    const { isPending: isCreateCommentPending, createComment } =
      useCreateComment({ sortBy });
    const { auth } = useAuth();
    const { accessToken } = auth;

    const currentUserId = auth.userId;
    const { postId } = useParams();

    const commentContentRef = useRef(null);

    const [showRequireLoginModal, setShowRequireLoginModal] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      const content = commentContentRef.current.value;
      if (!content) {
        toast.error(
          `Please add some content to ${isReplyForm ? `reply` : `comment`}.`
        );
        return;
      }
      const createdAt = new Date();

      // const createdAt = format(currentDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
      // console.log("createdAt ==> ", createdAt);
      const formdata = {
        content,
        userId: currentUserId,
        postId,
        createdAt,
        parentId,
      };

      // console.log("crate cmt data ==> ",formdata)

      createComment({
        ...formdata,
        page,
      });
      commentContentRef.current.value = "";
      if (!isReplyForm) {
        handleCmtSort({ type: "desc" });
      }
    };
    const checkLogin = (cb = () => {}) => {
      if (accessToken) {
        setShowRequireLoginModal(false);
        cb();
      } else {
        setShowRequireLoginModal(true);
        return;
      }
    };

    return (
      <>
        {showRequireLoginModal ? (
          <RequireLoginModal onClose={() => setShowRequireLoginModal(false)} />
        ) : null}
        <form onSubmit={handleSubmit} className={isReplyForm ? `my-4` : ``}>
          <div className="flex flex-col md:gap-4 gap-3">
           
            <Textarea
              autoFocus={isReplyForm ? true : false}
              name="create_comments_text_area"
              id="create_comments_text_area"
              ref={commentContentRef}
              onKeyUp={(e) => {
                if (accessToken) {
                  if (e.code === "Enter") {
                    handleSubmit(e);
                  }
                }
              }}
              onChange={() => {
                if (!accessToken) {
                  commentContentRef.current.value = "";
                  checkLogin();
                }
              }}
              onClick={() => checkLogin()}
            />

            {accessToken ? (
              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="action"
                  className="self-start  tracking-wide"
                  disabled={isCreateCommentPending}
                >
                  Submit
                </Button>

                {isReplyForm ? (
                  <Button
                    type="button"
                    className="self-start"
                    disabled={isCreateCommentPending}
                    onClick={handleFormDismiss}
                  >
                    Dismiss
                  </Button>
                ) : null}
              </div>
            ) : null}
          </div>
        </form>
      </>
    );
  }
);
