import { forwardRef } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";

export const Article = forwardRef(({ postData }, ref) => {
  return (
    <>
      <article className="" ref={ref}>
        <PostContainer className={``}>
          <div className="flex items-start">
            <PostContainer.UserProfile profileImg={postData.profile_img_url} />
            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={postData.first_name} />
              <PostContainer.PostTitle
                userId={postData.user_id}
                postId={postData.post_id}
              >
                <h4 className="text-fs_xl text-white hover:text-[#0056b3] font-extrabold capitalize">
                  {postData.title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostPublish createdAt={postData.created_at} />
            </div>
          </div>
          <PostContainer.PostReactions
            likeCount={postData.likes}
            totalComments={postData.total_comments}
            className={`my-2`}
          />
        </PostContainer>
      </article>
    </>
  );
});
