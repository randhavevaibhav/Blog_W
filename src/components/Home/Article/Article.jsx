import { forwardRef } from "react";

import PostContainer from "@/components/common/PostContainer/PostContainer";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "@/hooks/api/useAxiosPrivate";
import { useAuth } from "@/hooks/auth/useAuth";


export const Article = forwardRef(({ postData }, ref) => {
  const { auth } = useAuth();
  const currentUserId = auth.userId;
  const postId = postData.post_id;
  const userId = postData.user_id;
  const imgURL = postData.title_img_url;

  const queryClient = useQueryClient();
  const axiosPrivate = useAxiosPrivate();

  const getIndiviualPostQueryKey = [
    "getIndiviualPost",
    // currentUserId.toString(),
    userId.toString(),
    postId.toString(),
  ];

  const fetchIndiviualPost = async (userId, postId) => {
    //passing same userId for current user because they are same

    const image = new Image();
    image.src = imgURL;

    let res = {};

    if (currentUserId) {
       res = await axiosPrivate.get(`/post/${currentUserId}/${userId}/${postId}`);
    }else{
      res = await axiosPrivate.get(`/post/${userId}/${postId}`);
    }

    const resData = await res.data;

    return resData;
  };

  const handlePrePostFetching = async () => {
    // console.log("mouse hover")

    // console.log("postId ======>",postId)

    // console.log("userId =====> ",userId)

    //pass userId twice as  queryKey because for IndiviualPost reuires two userId's
    // current user and user which created that post
    await queryClient.prefetchQuery({
      queryKey: getIndiviualPostQueryKey,
      queryFn: () => fetchIndiviualPost(userId, postId),
    });
  };

  return (
    <>
      <article className="" ref={ref} onMouseOver={handlePrePostFetching}>
        <PostContainer className={``}>
          <div className="flex items-start">
            <Link to={`/userprofile/${postData.user_id}`}>
              <PostContainer.UserProfile
                profileImg={postData.profile_img_url}
              />
            </Link>
            <div className="flex flex-col gap-1">
              <PostContainer.PostAutherName userName={postData.first_name} />
              <PostContainer.PostPublish createdAt={postData.created_at} />
              <PostContainer.PostTitle
                userId={postData.user_id}
                postId={postData.post_id}
              >
                <h4 className="text-fs_xl text-text-primary hover:text-action-color font-extrabold capitalize">
                  {postData.title}
                </h4>
              </PostContainer.PostTitle>
              <PostContainer.PostReactions
                likeCount={postData.likes}
                totalComments={postData.total_comments}
                className={`my-1`}
              />
            </div>
          </div>
        </PostContainer>
      </article>
    </>
  );
});
