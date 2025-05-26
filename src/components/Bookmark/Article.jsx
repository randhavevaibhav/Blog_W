import { forwardRef } from "react";
import PostContainer from "../common/PostContainer/PostContainer";
import { Link } from "react-router-dom";

export const Article = forwardRef(({ postData }, ref) => {
  return (
    <>
      <article className="" ref={ref}>
        <PostContainer className={``}>
          <div className="flex items-start">
              <Link to={`/userprofile/${postData.auther_id}`}>
              <PostContainer.UserProfile profileImg={postData.profile_img_url} />
              </Link>
         
            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={postData.auther_name} />
              <PostContainer.PostTitle
                userId={postData.auther_id}
                postId={postData.post_id}
              >
                <h4 className="text-fs_xl text-text-primary hover:text-[#7e76dd] font-extrabold capitalize">
                  {postData.title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostPublish createdAt={postData.created_at} />
            </div>
          </div>
        </PostContainer>
      </article>
    </>
  );
});
