import React, { memo, useEffect, useRef } from "react";
import { useCreateComment } from "../../../../hooks/comments/useCreateComment";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/auth/useAuth";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { RequireLoginModal } from "@/components/common/RequireLoginModal/RequireLoginModal";
import { getLocalStorageItem } from "@/utils/browser";
import { Textarea } from "@/components/common/Textarea/Textarea";
import { useRequireLogin } from "@/hooks/auth/useRequireLogin";

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
    const { checkLogin, showRequireLoginModal, hideLoginModal } =
      useRequireLogin({ accessToken });

    const handleSubmit = (e) => {
      e.preventDefault();
      const content = commentContentRef.current.value;
      if (content.trim() === "") {
        toast.error(
          `Please add some content to ${isReplyForm ? `reply` : `comment`}.`
        );
        return;
      }
      const createdAt = new Date();

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
        handleCmtSort({ option: "desc" });
      }
    };

    const handleCommentTxtAreaChange = () => {
      if (!accessToken) {
        commentContentRef.current.value = "";
        checkLogin();
      }
      if (isCreateCommentPending) {
        commentContentRef.current.value = "";
      }
    };

   const cmtFormIdentifier = isReplyForm?`reply-comment`:`create-comment`;

    return (
      <>
        {showRequireLoginModal ? (
          <RequireLoginModal onClose={() => hideLoginModal()} />
        ) : null}
        <form onSubmit={handleSubmit} className={isReplyForm ? `my-4` : ``}>
          <div className="flex flex-col md:gap-4 gap-3">
            <Textarea
              autoFocus={isReplyForm ? true : false}
              name={`${cmtFormIdentifier}-text-area`}
              id={`${cmtFormIdentifier}-text-area`}
              ref={commentContentRef}
              onKeyUp={(e) => {
                if (accessToken) {
                  if (e.code === "Enter") {
                    handleSubmit(e);
                  }
                }
              }}
              onChange={handleCommentTxtAreaChange}
              onClick={() => checkLogin()}
              data-test={`${cmtFormIdentifier}-text-area`}
            />

            {accessToken ? (
              <div className="flex gap-4">
                <Button
                  type="submit"
                  variant="action"
                  className={`self-start  tracking-wide ${
                    isCreateCommentPending ? `cursor-not-allowed` : ``
                  }`}
                  disabled={isCreateCommentPending}
                  data-test={`${cmtFormIdentifier}-submit-btn`}
                >
                  Submit
                </Button>

                {isReplyForm ? (
                  <Button
                    type="button"
                    className="self-start"
                    disabled={isCreateCommentPending}
                    onClick={handleFormDismiss}
                    data-test={`${cmtFormIdentifier}-dismiss-btn`}
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
