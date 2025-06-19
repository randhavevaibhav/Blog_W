import { useAuth } from "../../../../hooks/auth/useAuth";
import { forwardRef, memo } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import "./Post.css";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";

export const Post = memo(
  forwardRef(
    (
      { postData, handlePostDeleteAction, totalComments, likes, imgURL },
      ref
    ) => {
      const { auth } = useAuth();
      const { PreFetchPost } = usePrefetch();
      const userId = auth.userId;
      const postId = postData.postId;

      const prefetchPostData = () => {
        PreFetchPost({ postId, imgURL });
      };

      return (
        <PostContainer
          handleMouseOver={prefetchPostData}
          handleTouchStart={prefetchPostData}
          className={`ind_post`}
          ref={ref}
        >
          <div className="post_title">
            <PostContainer.PostTitle userId={userId} postId={postData.postId}>
              <h4 className="text-fs_xl text-action-color font-extrabold capitalize">
                {postData.title}
              </h4>
            </PostContainer.PostTitle>
            <PostContainer.PostPublish createdAt={postData.createdAt} />
          </div>

          <PostContainer.PostReactions
            likeCount={likes}
            totalComments={totalComments}
            className={`reactions`}
          />
          <PostContainer.PostActions
            userId={userId}
            postId={postData.postId}
            postTitle={postData.title}
            handlePostDeleteAction={handlePostDeleteAction}
            className={`actions`}
          />
        </PostContainer>
      );
    }
  )
);
