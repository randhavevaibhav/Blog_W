import { forwardRef } from "react";
import PostContainer from "../../common/PostContainer/PostContainer";
import { Link, useNavigate } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    firstName,
    postId,
    titleImgURL,
    title,
    createdAt,
    likes,
    totalComments,
    profileImgURL,
    tagList,
  } = postData;

  const { preFetchIndividualPost, preFetchPostComments } = usePrefetch();
  const navigate = useNavigate();
  return (
    <>
      <article
        className="cursor-pointer"
        ref={ref}
        onMouseOver={() => {
          preFetchIndividualPost({ userId, postId, imgURL: titleImgURL });
          preFetchPostComments({
            postId,
          });
        }}
        onClick={() => {
          navigate(`/post/${userId}/${postId}`);
        }}
      >
        <PostContainer className={``}>
          <div className="flex items-start">
            <Link
              to={`/userprofile/${userId}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>

            <div className="flex flex-col gap-1">
              <PostContainer.PostAuthorName userName={firstName} />
              <PostContainer.PostTitle userId={userId} postId={postId}>
                <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize">
                  {title}
                </h4>
              </PostContainer.PostTitle>

              <PostContainer.PostReactions
                likes={likes}
                totalComments={totalComments}
              />
              <PostContainer.PostTags tagList={tagList} />
              <PostContainer.PostPublish createdAt={createdAt} />
            </div>
          </div>
        </PostContainer>
      </article>
    </>
  );
});
