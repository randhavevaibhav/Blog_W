import React from "react";
import { Comment } from "./Comment";
import { v4 as uuidv4 } from "uuid";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import { createPortal } from "react-dom";
import Modal from "@/components/common/Modal/Modal";
import { FaTrash } from "react-icons/fa";

export const Comments = ({ comments }) => {
  const { isPending: isDeleteCmtPending, deleteComment } = useDeleteComment();
  const handleDeleteCmt = ({ commentId }) => {
    deleteComment({
      commentId,
    });
  };
  return (
    <>
      {comments.map((comment) => {
        return (
          <Comment
            key={uuidv4()}
            commentId={comment.id}
            userName={comment.userName}
            date={comment.created_at}
            content={comment.content}
            userId={comment.userId}
            userProfileImg={comment.userProfileImg}
            handleDeleteCmt={handleDeleteCmt}
          />
        );
      })}

      {isDeleteCmtPending?createPortal(
        <Modal isOpen={true}>
          <Modal.Body isControlled={false}>
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>

            <Modal.Title>Deleting comment ...</Modal.Title>
          </Modal.Body>
        </Modal>,
        document.body
      ):null}
    </>
  );
};
