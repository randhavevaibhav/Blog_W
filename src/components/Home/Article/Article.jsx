import { forwardRef } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import { Link } from "react-router-dom";

import { usePrefetch } from "@/hooks/prefetch/usePrefetch";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    postId,
    firstName,
    profileImgURL,
    title,
    titleImgURL,
    totalComments,
    likes,
    createdAt,
  } = postData;

  const { PreFetchIndiviualPost,preFetchUserInfo } = usePrefetch();

  return (
    <>
      <article
        className=""
        ref={ref}
        onMouseOver={() =>
          PreFetchIndiviualPost({ userId, postId, imgURL: titleImgURL })
        }
      >
        <PostContainer className={``}>
          <div className="flex items-start">
            <Link to={`/userprofile/${userId}`} onMouseOver={()=>preFetchUserInfo({userId})}>
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>
            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={firstName} />
              <PostContainer.PostPublish createdAt={createdAt} />
              <PostContainer.PostTitle userId={userId} postId={postId}>
                <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize">
                  {title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostReactions
                likeCount={likes}
                totalComments={totalComments}
                className={`my-1`}
              />
            </div>
          </div>
        </PostContainer>
      </article>
    </>
  );
});
