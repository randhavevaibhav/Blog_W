import { useAuth } from "@/hooks/auth/useAuth";
import { forwardRef, memo } from "react";
import "./Post.css";
import PostArticle from "@/components/common/PostArticle/PostArticle";
import { Checkbox } from "@/components/ui/checkbox";

export const Post = memo(
  forwardRef(({ postData, archivePost, onSelectPost, isSelected }, ref) => {
    const { auth } = useAuth();
    const userId = auth.userId;
    const {
      postId,
      titleImgURL,
      post_analytics: { likes },
      post_analytics: { comments },
      createdAt,
      title,
      archive,
    } = postData;

    return (
      <PostArticle
        userId={userId}
        postId={postId}
        titleImgURL={titleImgURL}
        ref={ref}
      >
        <PostArticle.Wrapper className={`px-4 py-2`}>
          <PostArticle.Body className={`md:pl-0 space-y-0`}>
            <div className="flex items-center justify-between">
              <div>
                <PostArticle.PostTitle postId={postId} title={title}>
                  <h4 className="lg:text-2xl text-xl  md:hover:text-action-color text-action-color font-semibold capitalize mt-2">
                    {title}
                  </h4>
                </PostArticle.PostTitle>
              </div>

              <label
                htmlFor={`select-post-${postId}`}
                className="text-sm font-medium leading-none cursor-pointer p-3"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  id={`select-post-${postId}`}
                  checked={isSelected}
                  onCheckedChange={() => {
                    onSelectPost(postId);
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </label>
            </div>
            <PostArticle.PostPublish createdAt={createdAt} />

            <div className="flex justify-between items-center">
              <PostArticle.PostReactions
                likes={likes}
                totalComments={comments}
              />
              <PostArticle.PostActions
                postId={postId}
                postTitle={title}
                className={`actions`}
                archive={archive}
                archivePost={archivePost}
              />
            </div>
          </PostArticle.Body>
        </PostArticle.Wrapper>
      </PostArticle>
    );
  }),
);
