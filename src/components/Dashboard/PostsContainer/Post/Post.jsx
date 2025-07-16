import { useAuth } from "../../../../hooks/auth/useAuth";
import { forwardRef, memo } from "react";
import "./Post.css";
import PostArticle from "@/components/common/PostContainer/PostContainer";

export const Post = memo(
  forwardRef(({ postData, handlePostDeleteAction }, ref) => {
    const { auth } = useAuth();
    const userId = auth.userId;
    const { postId, titleImgURL, likes, comments, createdAt, title } = postData;

    return (
      <PostArticle
        userId={userId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
      >
        <PostArticle.Wrapper className={`px-4 py-2`}>
          <PostArticle.Body className={`md:pl-0`}>
            <PostArticle.PostTitle userId={userId} postId={postId}>
              <h4 className="text-fs_2xl text-text-primary hover:text-action-color font-extrabold capitalize mt-2">
                {title}
              </h4>
            </PostArticle.PostTitle>
            <PostArticle.PostPublish createdAt={createdAt} />

            <div className="flex justify-between items-end">
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
