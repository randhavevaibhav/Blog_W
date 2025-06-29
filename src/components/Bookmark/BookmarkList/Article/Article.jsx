import { forwardRef } from "react";

import { Link } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import PostContainer from "@/components/common/PostContainer/PostContainer";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    autherId,
    autherName,
    postId,
    titleImgURL,
    title,
    createdAt,
    profileImgURL,
  } = postData;
  const { PreFetchIndiviualPost } = usePrefetch();
  return (
    <>
      <article
        className=""
        ref={ref}
        onMouseOver={() => {
          PreFetchIndiviualPost({ userId, postId, imgURL: titleImgURL });
        }}
      >
        <PostContainer className={``}>
          <div className="flex items-start">
            <Link to={`/userprofile/${autherId}`}>
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>

            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={autherName} />
              <PostContainer.PostTitle userId={autherId} postId={postId}>
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
