import { useAuth } from "../../../../hooks/auth/useAuth";
import { forwardRef, memo } from "react";

import "./Post.css";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { useNavigate } from "react-router-dom";
import PostArticle from "@/components/common/PostContainer/PostContainer";

export const Post = memo(
  forwardRef(({ postData, handlePostDeleteAction }, ref) => {
    const { auth } = useAuth();
    const { preFetchIndividualPost, preFetchPostComments } = usePrefetch();
    const navigate = useNavigate();
    const userId = auth.userId;
    const { postId, titleImgURL, likes, comments, createdAt, title } = postData;

    // const prefetchPostData = () => {
    //   preFetchIndividualPost({ userId, postId, imgURL });
    //   preFetchPostComments({
    //     postId,

    //   });
    // };

    return (
      // <PostContainer
      //   onMouseOver={prefetchPostData}
      //   onTouchStart={prefetchPostData}
      //   className={`ind_post hover:bg-card-bg-hover cursor-pointer`}
      //   ref={ref}
      //   onClick={() => {
      //     navigate(`/post/${userId}/${postId}`);
      //   }}
      // >
      //   <div className="post_title">
      //     <PostContainer.PostTitle userId={userId} postId={postData.postId}>
      //       <h4 className="text-fs_xl text-action-color font-extrabold capitalize">
      //         {postData.title}
      //       </h4>
      //     </PostContainer.PostTitle>
      //     <PostContainer.PostPublish createdAt={postData.createdAt} />
      //   </div>

      //   <PostContainer.PostReactions
      //     likes={likes}
      //     totalComments={totalComments}
      //     className={`reactions`}
      //   />
      //   <PostContainer.PostActions
      //     userId={userId}
      //     postId={postData.postId}
      //     postTitle={postData.title}
      //     handlePostDeleteAction={handlePostDeleteAction}
      //     className={`actions`}
      //   />
      // </PostContainer>
      <PostArticle
        userId={userId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
      >
        <PostArticle.Wrapper>
          <PostArticle.Body className={`md:pl-0`}>
            <PostArticle.PostTitle userId={userId} postId={postId}>
              <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize mt-2">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostPublish createdAt={createdAt} />

            <div className="flex justify-between">
              <PostArticle.PostReactions
                likes={likes}
                totalComments={comments}
              />
              <PostArticle.PostActions
           userId={userId}
           postId={postId}
          postTitle={title}
           handlePostDeleteAction={handlePostDeleteAction}
           className={`actions`}
        />
            </div>
          </PostArticle.Body>
        </PostArticle.Wrapper>
      </PostArticle>
    );
  })
);
