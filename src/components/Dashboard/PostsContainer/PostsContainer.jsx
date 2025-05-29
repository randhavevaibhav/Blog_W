import { Post } from "./Post/Post";
import { Header } from "./Header/Header";
import { useCallback, useState } from "react";
import { useDeletePost } from "../../../hooks/posts/useDeletePost";
import { sortPostBy } from "../../../utils/constants";
import Modal from "@/components/common/Modal/Modal";
import { Button } from "@/components/ui/button";
import { FaTrash } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/auth/useAuth";
import _ from "lodash";

const sortByTitle = (postData) => {
  return postData.sort((a, b) => {
    return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : -1;
  });
};

const sortByDate = (postData) => {
  return postData.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
};

export const PostsContainer = ({ data = null }) => {
  const {
    isPending: isDeletePostPending,
    isSuccess: isDeltePostSuccess,
    deletePost,
  } = useDeletePost();

  const { auth } = useAuth();
  const userId = auth.userId;
  const queryClient = useQueryClient();

  const getAllOwnPostsQuerKey = ["getAllOwnPosts", userId.toString()];

  const formattedPostData = JSON.parse(data);

  

  const [modalState, setModalState] = useState({
    isOpen: false,
    modalTitle: null,
    postId: null,
  });

  const handleCloseModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };

  //responsible for populating post name in delete modal
  const handlePostDeleteAction = useCallback(
    (postTitle, postId) => {
      const modalTitle = `${postTitle}`;
      setModalState({ ...modalState, isOpen: true, modalTitle, postId });
    },
    [data]
  );

  //responsible for delete post,closing modal and updating the post list
  const handleDeletePost = () => {
    deletePost(modalState.postId);

    handleCloseModal();
  };

  const updateCachePostData = ({ newPostData }) => {
    const cachedPostsData = queryClient.getQueryData(getAllOwnPostsQuerKey);
    // console.log("cachedPostsData ==> ", cachedPostsData);
    const clonedCachedPostsData = _.cloneDeep(cachedPostsData);
    clonedCachedPostsData.posts = null;
    clonedCachedPostsData.posts = JSON.stringify(newPostData);
    queryClient.setQueryData(getAllOwnPostsQuerKey, clonedCachedPostsData);
  };

  const handleSortByChange = (e) => {
    const sortByVal = e.target.value;
    let newPostData = null;
    switch (sortByVal) {
      case sortPostBy.DATE:
        newPostData = sortByDate(formattedPostData);
        updateCachePostData({ newPostData });
        break;
      case sortPostBy.TITLE:
        newPostData = sortByTitle(formattedPostData);
        updateCachePostData({ newPostData });
        break;
      default:
        throw new Error(`Invalid value for sort by`);
    }
  };

  return (
    <>
      <div>
        <Header handleSortByChange={handleSortByChange} />

        {isDeletePostPending ? (
          <Modal isOpen={true}>
            <>
              <Modal.Body isControlled={false}>
                <Modal.Icon>
                  <FaTrash className="text-red-500 text-4xl" />
                </Modal.Icon>

                <>
                  <Modal.Title>{`Deleting post ...`}</Modal.Title>
                </>
              </Modal.Body>
            </>
          </Modal>
        ) : (
          <Modal isOpen={modalState.isOpen} onClose={handleCloseModal}>
            <Modal.Body isControlled={true} onClose={handleCloseModal}>
              <Modal.Icon>
                <FaTrash className="text-red-500 text-4xl" />
              </Modal.Icon>

              <Modal.Title>
                Are you sure want to delete post titled{" "}
                <span className="text-[#7e76dd]">{modalState.modalTitle}</span>
                &nbsp;?
              </Modal.Title>

              <div className="flex gap-2  flex-col sm:flex-row min-w-[200px] mx-auto">
                <Button
                  className="bg-red-500 text-white hover:bg-red-600 "
                  onClick={handleDeletePost}
                >
                  Delete
                </Button>
                <Button onClick={handleCloseModal} varient="primary">
                  Cancel
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        )}

        {formattedPostData ? (
          <div className="posts_container overflow-auto  max-h-[40rem] flex flex-col gap-4">
            {formattedPostData.map((post) => {
              return (
                <Post
                  postData={post}
                  key={post.id}
                  handlePostDeleteAction={handlePostDeleteAction}
                  totalComments={post.totalComments}
                  likes={post.likes}
                  imgURL={post.imgURL}
                />
              );
            })}
          </div>
        ) : (
          <p className="text-fs_lg font-medium">No posts</p>
        )}
      </div>
    </>
  );
};
