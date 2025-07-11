import { useAuth } from "../../../../hooks/auth/useAuth";
import { forwardRef, memo } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import "./Post.css";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { useNavigate } from "react-router-dom";

export const Post = memo(
  forwardRef(
    (
      { postData, handlePostDeleteAction, totalComments, likes, imgURL },
      ref
    ) => {
      const { auth } = useAuth();
      const { preFetchIndividualPost,preFetchPostComments } = usePrefetch();
      const navigate = useNavigate();
      const userId = auth.userId;
      const postId = postData.postId;

      const prefetchPostData = () => {
        preFetchIndividualPost({ userId, postId, imgURL });
        preFetchPostComments({
          postId
        })
      };

      return (
        <PostContainer
          onMouseOver={prefetchPostData}
          onTouchStart={prefetchPostData}
          className={`ind_post hover:bg-card-bg-hover cursor-pointer`}
          ref={ref}
          onClick={() => {
            navigate(`/post/${userId}/${postId}`);
          }}
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
            likes={likes}
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
