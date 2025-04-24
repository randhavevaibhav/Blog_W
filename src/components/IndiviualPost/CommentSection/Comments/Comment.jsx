import React, { useState } from "react";
import { CommentMenu } from "./CommentMenu.jsx";
import { useDeleteComment } from "../../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { format } from "date-fns";
import { DeleteCmtModal } from "./DeleteCmtModal.jsx";
import { createPortal } from "react-dom";
import { BsFillPersonFill } from "react-icons/bs";

export const Comment = ({
  commentId,
  userName,
  date,
  content,
  userId,
  userProfileImg,
}) => {
  const { isPending: isDeleteCmtPending, deleteComment } = useDeleteComment();

  const { auth } = useAuth();
  const [isDeleteCmtModalOpen, setIsDeleteCmtModalOpen] = useState(false);
  const currentUserId = auth.userId;
  const isCmtBelongsToUser = currentUserId === userId;

  const handleDeleteCmt = () => {
    deleteComment({
      commentId,
    });
  };

  const openDeleteCmtModal = () => {
    setIsDeleteCmtModalOpen(true);
  };
  return (
    <>
      <div className="flex flex-col gap-4 indiviual_comment w-full border dark:border-gray-50 dark:border-opacity-50 rounded-md pt-2 pb-4 px-2">
        <header className="flex justify-between items-center relative">
          <div className="content flex items-center">
            {!userProfileImg ? (
              <BsFillPersonFill size={"40px"} className="mr-2" />
            ) : (
              <div className="w-[40px] mr-2">
                <img
                  src={userProfileImg}
                  alt={`user profile image`}
                  className="object-cover aspect-square w-full rounded-full"
                />
              </div>
            )}
          <div>
          <a href="" className="mr-4 font-bold text-lg">
              {userName}
            </a>
            <span className="text-fs_small">
              {" "}
              Published: {format(new Date(date), "yyyy-MM-dd")}
            </span>
          </div>
          </div>
          {isCmtBelongsToUser ? (
            <CommentMenu openDeleteCmtModal={openDeleteCmtModal} />
          ) : null}
        </header>
        <div className="comment_body"><p className="text-fs_base">
        {content}
          </p></div>
      </div>

      {createPortal(
        <DeleteCmtModal
          isDeleteCmtModalOpen={isDeleteCmtModalOpen}
          handleDeleteCmt={handleDeleteCmt}
          closeDeleteCmtModal={() => setIsDeleteCmtModalOpen(false)}
          isDeleteCmtPending={isDeleteCmtPending}
        />,
        document.body
      )}
    </>
  );
};
