import { Post } from "./Post/Post";
import { Header } from "./Header/Header";
import { useCallback, useEffect, useState } from "react";
import { useDeletePost } from "../../../hooks/posts/useDeletePost";
import { DeletePostModal } from "./DeletePostModal/DeletePostModal";
import { sortPostBy } from "../../../utils/constants";
import { sortBy} from "lodash"
const sortByTitle = (postData) => {
  
  const newData = sortBy(postData,["title"])

  return newData;
};

const sortByDate = (postData) => {
  const newData = postData.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return newData;
};

export const PostContainer = ({ data = null }) => {
  const { isPending: isDeletePostPending, deletePost } = useDeletePost();
  useEffect(() => {
    setPostData([...sortByDate(formattedPostData)]);
  }, [data]);

  const formattedPostData = JSON.parse(data);

  const [postData, setPostData] = useState(null);

  const [modalState, setModalState] = useState({
    isOpen: false,
    postTitle: null,
    postId: null,
  });

  const handleCloseModal = () => {
    setModalState({
      ...modalState,
      isOpen: false,
    });
  };

  //resposible for populating post name in delete modal
  const handlePostDeleteAction = useCallback(
    (postTitle, postId) => {
      setModalState({ ...modalState, isOpen: true, postTitle, postId });
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
        <DeletePostModal
          modalState={modalState}
          handleCloseModal={handleCloseModal}
          handleDeletePost={handleDeletePost}
          isDeletePostPending={isDeletePostPending}
        />
        {postData ? (
          <div className="post_container overflow-auto  max-h-[40rem]">
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
          <p>No posts</p>
        )}
      </div>
    
    </>
  );
};
