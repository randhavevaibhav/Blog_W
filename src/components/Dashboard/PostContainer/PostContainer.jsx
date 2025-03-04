import { Post } from "./Post/Post";
import { Header } from "./Header/Header";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "../../common/Modal/Modal";
import { Button } from "../../common/Button/Button";
import { FaTrash } from "react-icons/fa";
import { useDeletePost } from "../../../hooks/posts/useDeletePost";
const formatPosts = (data) => {
  const formattedPosts = JSON.parse(data);

  return formattedPosts;
};

export const PostContainer = ({ data = null }) => {
  const formattedPostData = formatPosts(data);

  const [modalState, setModalState] = useState({
    isOpen: false,
    postTitle: null,
    postId: null,
  });

  const { isPending, deletePost } = useDeletePost();

  const [postData, setPostData] = useState(null);

  useEffect(() => {
    setPostData([...formattedPostData]);
  }, [data]);

  const handlePostDeleteAction = useCallback((postTitle, postId) => {
    setModalState({ ...modalState, isOpen: true, postTitle, postId });
  },[data]);

  const handleDeletePost = () => {
    deletePost(modalState.postId);
    setModalState({ ...modalState, isOpen: false });
    const newPosts = postData.filter((post) => {
      return post.id != modalState.postId;
    });

    setPostData([...newPosts]);
  };

  const sortByTitle = () => {
    const newData = postData.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });

    setPostData([...newData]);
  };

  const sortByDate = () => {
    const newData = postData.sort((a, b) => {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    });

    setPostData([...newData]);
  };

  const handleSortByChange = (e) => {
    const sortBy = e.target.value;

    if (sortBy === "title") {
      sortByTitle();
    }

    if (sortBy === "date") {
      sortByDate();
    }
  };

  // console.log("re-render")

  return (
    <div className="post_container overflow-auto overflow-x-hidden">
      <Header handleSortByChange={handleSortByChange} />
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
                <Modal.Title>Deleting post ....</Modal.Title>
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

      {postData ? (
        postData.map((post) => {
          return (
            <Post
              postData={post}
              key={post.id}
              handlePostDeleteAction={handlePostDeleteAction}
            />
          );
        })
      ) : (
        <p>No posts</p>
      )}
    </div>
  );
};
