import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import Modal from "@/components/common/Modal/Modal";
import { Button } from "@/components/ui/button";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import React from "react";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

const DeletePost = () => {
  const { post_title, post_id } = useParams();

  const { isPending, deletePost, isError, isSuccess,error } = useDeletePost();
  const handlePostDelete = () => {
    deletePost({
      postId:post_id
    });
  };

  const navigate = useNavigate();

  if (isPending) {
    return (
    <Loading>
      Deleting post ...
    </Loading>
    );
  }

  if (isError) {
    console.error(error)
    return (
     <Error>
      Error while deleting post !
     </Error>
    );
  }

  if (isSuccess) {
    return (
      <Loading>
        Redirecting ....
      </Loading>
    );
  }

  return (
    <MainLayout className={`mb-0`}>
      <Modal isOpen={true}>
        <Modal.Body isControlled={false}  className={`min-w-[200px] max-w-[600px] gap-4`}>
          <div className="flex items-center p-4">
            <Modal.Icon>
            <FaTrash className="text-red-500 text-4xl" />
          </Modal.Icon>
          </div>

          <Modal.Title>
            Are you sure want to delete post titled{" "}
            <span className="text-[#7e76dd]">{post_title}</span>
            &nbsp;?
          </Modal.Title>

          <div className="flex gap-2 justify-between  flex-col sm:flex-row min-w-[200px] mx-auto">
            <Button
              className="bg-red-500 text-white hover:bg-red-600 px-8"
              onClick={handlePostDelete}
            >
              Delete
            </Button>
            <Button onClick={() => navigate("/dashboard")}  className="px-8">
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </MainLayout>
  );
};

export default DeletePost;
