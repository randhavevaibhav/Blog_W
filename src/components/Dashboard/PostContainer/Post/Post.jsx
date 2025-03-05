import { Actions } from "../Actions/Actions";
import { Reactions } from "../Reactions/Reactions";
import { format } from "date-fns";
import "./Post.css";
import { Link } from "react-router-dom";

import { useAuth } from "../../../../hooks/auth/useAuth";
import { memo } from "react";
export const Post = memo(({ postData, handlePostDeleteAction }) => {
  const { auth } = useAuth();
  const userId = auth.userId;

  return (
    <div className="ind_post    gap-2 p-4 items-center dark:bg-[#212020] bg-[#efefef]  rounded-md mt-3 mb-6">
      <div className="post_title">
        <Link to={`/posts/${userId}/${postData.id}`}>
          {" "}
          <h3 className="text-lg">{postData.title}</h3>
        </Link>
        <span className="text-sm text-gray-400">
          Published: {format(new Date(postData.created_at), "yyyy-MM-dd")}
        </span>
      </div>
      <Reactions />
      <Actions
        handlePostDeleteAction={handlePostDeleteAction}
        postTitle={postData.title}
        postId={postData.id}
        postContent={postData.content}
        postImgURL={postData.imgURL}
      />
    </div>
  );
})
