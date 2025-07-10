import { forwardRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import PostContainer from "@/components/common/PostContainer/PostContainer";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    authorId,
    authorName,
    postId,
    titleImgURL,
    title,
    createdAt,
    profileImgURL,
  } = postData;
  const { preFetchIndividualPost } = usePrefetch();
  const navigate = useNavigate();
  return (
    <>
      <article
        className="cursor-pointer"
        ref={ref}
        onMouseOver={() => {
          preFetchIndividualPost({ userId, postId, imgURL: titleImgURL });
        }}
        onClick={() => {
          navigate(`/post/${userId}/${postId}`);
        }}
      >
        <PostContainer className={`bg-card-bg hover:bg-card-bg-hover`}>
          <div className="flex items-start">
            <Link
              to={`/userprofile/${authorId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>

            <div className="flex flex-col gap-1 w-full">
              <PostContainer.PostAuthorName userName={authorName} />
              <PostContainer.PostTitle userId={authorId} postId={postId}>
                <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize">
                  {title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostPublish createdAt={createdAt} />
            </div>
          </div>
        </PostContainer>
      </article>
    </>
  );
});
