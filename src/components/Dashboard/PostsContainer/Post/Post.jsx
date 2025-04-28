import { useAuth } from "../../../../hooks/auth/useAuth";
import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../hooks/api/useAxiosPrivate";
import PostContainer from "@/components/common/PostContainer/PostContainer";
import "./Post.css";
export const Post = memo(
  ({ postData, handlePostDeleteAction, totalComments, likes }) => {
    const { auth } = useAuth();
    const userId = auth.userId;
    const postId = postData.id;

    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const fetchIndiviualPost = async (userId, postId) => {
      //passing same userId for current user because they are same
      const res = await axiosPrivate.get(`/post/${userId}/${userId}/${postId}`);
      const resData = await res.data;

      return resData;
    };

    const handlePrePostFetching = async () => {
      // console.log("mouse hover")

      // console.log("postId ======>",postId)

      // console.log("userId =====> ",userId)

      //pass userId twice as  queryKey because for IndiviualPost reuires two userId's
      // current user and user which created that post
      await queryClient.prefetchQuery({
        queryKey: [
          "getIndiviualPost",
          userId.toString(),
          userId.toString(),
          postId.toString(),
        ],
        queryFn: () => fetchIndiviualPost(userId, postId),
      });
    };

    return (
      <PostContainer
        handleMouseOver={handlePrePostFetching}
        handleTouchStart={handlePrePostFetching}
        className={`ind_post`}
      >
        <div className="post_title">
          <PostContainer.PostTitle userId={userId} postId={postData.id}>
            <h4 className="text-fs_xl text-[#0056b3] font-extrabold capitalize">
              {postData.title}
            </h4>
          </PostContainer.PostTitle>
          <PostContainer.PostPublish createdAt={postData.created_at} />
        </div>

        <PostContainer.PostReactions
          likeCount={likes}
          totalComments={totalComments}
          className={`reactions`}
        />
        <PostContainer.PostActions
          userId={userId}
          postId={postData.id}
          postTitle={postData.title}
          handlePostDeleteAction={handlePostDeleteAction}
          postContent={postData.content}
          postImgURL={postData.imgURL}
          className={`actions`}
        />
      </PostContainer>
    );
  }
);
