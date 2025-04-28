import { Post } from "./Post/Post";
import { Header } from "./Header/Header";
import { useCallback, useEffect, useState } from "react";
import { useDeletePost } from "../../../hooks/posts/useDeletePost";
import { DeletePostModal } from "./Post/DeletePostModal/DeletePostModal";
import { sortPostBy } from "../../../utils/constants";
import { sortBy } from "lodash";
const sortByTitle = (postData) => {
  const newData = sortBy(postData, ["title"]);

  return newData;
};

const sortByDate = (postData) => {
  const newData = postData.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return newData;
};

export const PostsContainer = ({ data = null }) => {
  const {
    isPending: isDeletePostPending,
    isSuccess: isDeltePostSuccess,
    deletePost,
  } = useDeletePost();
  useEffect(() => {
    setPostData([...sortByDate(formattedPostData)]);
  }, [data]);

  const formattedPostData = JSON.parse(data);

  const [postData, setPostData] = useState(null);

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
      const modalTitle = `Are you sure want to delete post titled ${postTitle}`;
      setModalState({ ...modalState, isOpen: true, modalTitle, postId });
    },
    [data]
  );

  //responsible for delete post,closing modal and updating the post list
  const handleDeletePost = () => {
    deletePost(modalState.postId);

    handleCloseModal();

    const newPosts = postData.filter((post) => {
      return post.id != modalState.postId;
    });

    setPostData([...newPosts]);
  };

  const handleSortByChange = (e) => {
    const sortByVal = e.target.value;

    switch (sortByVal) {
      case sortPostBy.DATE:
        setPostData([...sortByDate(postData)]);
        break;
      case sortPostBy.TITLE:
        setPostData([...sortByTitle(postData)]);
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
          <DeletePostModal
            isControlled={false}
            isOpen={true}
            modalTitle={`Deleting post ...`}
            handleCloseModal={() => {}}
          />
        ) : (
          <DeletePostModal
            isControlled={true}
            isOpen={modalState.isOpen}
            modalTitle={modalState.modalTitle}
            handleCloseModal={handleCloseModal}
            handleDeletePost={handleDeletePost}
          />
        )}

        {postData ? (
          <div className="posts_container overflow-auto  max-h-[40rem] flex flex-col gap-4">
            {postData.map((post) => {
              return (
                <Post
                  postData={post}
                  key={post.id}
                  handlePostDeleteAction={handlePostDeleteAction}
                  totalComments={post.totalComments}
                  likes={post.likes}
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
