import { Actions } from "./Actions/Actions";
import { Reactions } from "./Reactions/Reactions";
import { format } from "date-fns";
import "./Post.css";
import { Link } from "react-router-dom";

import { useAuth } from "../../../../hooks/auth/useAuth";
import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAxiosPrivate } from "../../../../hooks/api/useAxiosPrivate";

export const Post = memo(
  ({ postData, handlePostDeleteAction, totalComments, likes }) => {
    const { auth } = useAuth();
    const userId = auth.userId;
    const postId = postData.id;

    const queryClient = useQueryClient();
    const axiosPrivate = useAxiosPrivate();

    const fetchIndiviualPost = async (userId, postId) => {
      //passing same userId for current user because they are same
      const res = await axiosPrivate.get(`/post/${userId}/${userId}/${postId}`);
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
        queryKey: [
          "getIndiviualPost",
          userId.toString(),
          userId.toString(),
          postId.toString(),
        ],
        queryFn: () => fetchIndiviualPost(userId, postId),
      });
    };

    return (
      <div
        className="ind_post gap-2 p-4 items-center bg-bg-shade hover:bg-bg-shade-hover rounded-md mt-3 mb-6"
        onMouseOver={handlePrePostFetching}
        onTouchStart={handlePrePostFetching}
      >
        <div className="post_title">
          <Link to={`/post/${userId}/${postData.id}`}>
            {" "}
            <h4 className="text-fs_xl text-[#0056b3] font-extrabold capitalize">
              {postData.title}
            </h4>
          </Link>
          <span className="text-fs_small text-gray-400">
            Published: {format(new Date(postData.created_at), "yyyy-MM-dd")}
          </span>
        </div>
        <Reactions totalComments={totalComments} likeCount={likes} />
        <Actions
          handlePostDeleteAction={handlePostDeleteAction}
          postTitle={postData.title}
          userId={postData.userId}
          postId={postData.id}
          postContent={postData.content}
          postImgURL={postData.imgURL}
        />
      </div>
    );
  }
);
