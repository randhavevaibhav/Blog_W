import { Post } from "./Post/Post";
import { Header } from "./Header/Header";
import { useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../common/Modal/Modal";
import { Button } from "../../common/Button/Button";
import { FaTrash } from "react-icons/fa";
import { useDeletePost } from "../../../hooks/posts/useDeletePost";
import { LoadingWithText } from "../../common/LoadingWithText/LoadingWithText";

export const PostContainer = ({ data = null }) => {
  const formatPosts = (posts) => {
    const formattedPosts = JSON.parse(posts);
    return formattedPosts;
  };
  const [modalState, setModalState] = useState({
    isOpen: false,
    postTitle: null,
    postId: null,
  });

  const { isPending, deletePost } = useDeletePost();

  const handlePostDeleteAction = (postTitle, postId) => {
    setModalState({ ...modalState, isOpen: true, postTitle, postId });
  };

  const handleDeletePost = () => {
    deletePost(modalState.postId);
    setModalState({ ...modalState, isOpen: false });
  };

  return (
    <div className="post_container overflow-auto overflow-x-hidden">
      <Header />
      {createPortal(
        <Modal
          isOpen={modalState.isOpen}
          onClose={() =>
            setModalState({
              ...modalState,
              isOpen: false,
            })
          }
        >
          <>
            <Modal.Body
              onClose={() =>
                setModalState({
                  ...modalState,
                  isOpen: false,
                })
              }
            >
              <Modal.Icon>
                <FaTrash className="text-red-500 text-4xl" />
              </Modal.Icon>

              {isPending ? (
                 <Modal.Title>
                 Deleting post ....
                 </Modal.Title>
              ) : (
                <>
                  <Modal.Title>{`Are you sure want to delete post titled ${modalState.postTitle}?`}</Modal.Title>

                  <div className="flex gap-2 justify-center flex-col sm:flex-row  ">
                    <Button
                      onClick={() =>
                        setModalState({
                          ...modalState,
                          isOpen: false,
                        })
                      }
                      varient="primary"
                    >
                      Cancel
                    </Button>
                    <Button varient="danger" onClick={handleDeletePost}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Modal.Body>
          </>
        </Modal>,
        document.body
      )}

      {data ? (
        formatPosts(data).map((post) => {
          return (
            <Post
              postData={post}
              key={post.id}
              handlePostDeleteAction={handlePostDeleteAction}
            />
          );
        })
      ) : (
        <p>No posts.</p>
      )}
    </div>
  );
};
