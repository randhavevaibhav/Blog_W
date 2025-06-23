import { forwardRef } from "react";
import PostContainer from "../../common/PostContainer/PostContainer";
import { Link } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";

export const Article = forwardRef(({ postData }, ref) => {
  const {
    userId,
    firstName,
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
            <Link to={`/userprofile/${userId}`}>
              <PostContainer.UserProfile profileImg={profileImgURL} />
            </Link>

            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={firstName} />
              <PostContainer.PostTitle userId={userId} postId={postId}>
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
