import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import Modal from "@/components/common/Modal/Modal";
import { Button } from "@/components/ui/button";
import { useDeleteComment } from "@/hooks/comments/useDeleteComment";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const DeleteComment = () => {
  const { parentId=null,hasReplies,post_id,commentId } = useParams();

  const { isPending, deleteComment,isError,isSuccess} = useDeleteComment();
  const handleDeleteComment = () => {
    deleteComment({post_id,hasReplies,commentId});
  };

  const navigate = useNavigate();

  if (isPending) {
    return (
      <MainLayout className="mb-0">
        <Modal isOpen={true}>
          <Modal.Body isControlled={false}>
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>

            <Modal.Title>Deleting comment ...</Modal.Title>
          </Modal.Body>
        </Modal>
      </MainLayout>
    );
  }

  if (isError) {
    return (
      <MainLayout className="mb-0">
        <ErrorText>Error while deleting comment</ErrorText>
      </MainLayout>
    );
  }

  if (isSuccess) {
    return (
      <MainLayout className="mb-0">
        <LoadingTextWithSpinner>Redirecting ....</LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  return (
    <MainLayout className={`mb-0`}>
      <Modal isOpen={true}>
        <Modal.Body isControlled={false}>
          <Modal.Icon>
            <FaTrash className="text-red-500 text-4xl" />
          </Modal.Icon>

          <Modal.Title>
            Are you sure want to delete comment&nbsp;?
          </Modal.Title>

          <div className="flex gap-2 justify-between flex-col sm:flex-row min-w-[200px] mx-auto">
            <Button
              className="bg-red-500 text-white hover:bg-red-600 px-8"
              onClick={handleDeleteComment}
            >
              Delete
            </Button>
            <Button onClick={() => navigate(-1)} varient="primary" className="px-8">
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </MainLayout>
  );
};

export default DeleteComment;
