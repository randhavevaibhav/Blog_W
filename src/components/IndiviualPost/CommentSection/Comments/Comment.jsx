import React, { useState } from "react";
import { CommentMenu } from "./CommentMenu.jsx";
import { useDeleteComment } from "../../../../hooks/comments/useDeleteComment";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { format } from "date-fns";
import { createPortal } from "react-dom";
import { BsFillPersonFill } from "react-icons/bs";
import Modal from "@/components/common/Modal/Modal.jsx";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button.jsx";

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
        <div className="comment_body">
          <p className="text-fs_base">{content}</p>
        </div>
      </div>

      {createPortal(
        <Modal
          isOpen={isDeleteCmtModalOpen}
          onClose={() => setIsDeleteCmtModalOpen(false)}
        >
          <Modal.Body
            isControlled={true}
            onClose={() => setIsDeleteCmtModalOpen(false)}
          >
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>

            <Modal.Title>
              Are you sure want to delete this comment ?
            </Modal.Title>
            <div className="flex gap-2 justify-center flex-col sm:flex-row  ">
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={handleDeleteCmt}
              >
                Delete
              </Button>
              <Button
                onClick={() => setIsDeleteCmtModalOpen(false)}
                varient="primary"
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>,
        document.body
      )}
     
    </>
  );
};
