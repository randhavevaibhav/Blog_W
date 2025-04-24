import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
export const RecentPost = ({ recentPost }) => {
  return (
    <div className="recent_post bg-bg-shade rounded-md">
      {/* posts */}
      <div className="ind_posts gap-2 items-center bg-bg-shade p-4 rounded-md  mb-6">
        <h3 className="capitalize font-medium text-fs_2xl tracking-wide">Recent Posts</h3>
        {recentPost ? (
          <>
            <div className="post_title">
              <Link to={`/post/${recentPost.user_id}/${recentPost.post_id}`}>
                <h4 className="font-medium text-fs_xl">{recentPost.title}</h4>
              </Link>
              <span className="text-fs_small text-gray-400">
                Published:{" "}
                {format(new Date(recentPost.created_at), "yyyy-MM-dd")}
              </span>
            </div>
          </>
        ) : (
          <p className="">No posts yet.</p>
        )}
      </div>
    </div>
  );
};
