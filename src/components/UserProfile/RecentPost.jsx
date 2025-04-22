import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
export const RecentPost = ({ recentPost }) => {
  return (
    <div className="recent_post bg-bg-shade rounded-md">
      {/* posts */}
      <div className="ind_posts gap-2 items-center bg-bg-shade p-4 rounded-md  mb-6">
        <h4 className="text-xl font-semibold tracking-wide ">Recent Posts</h4>
        {recentPost ? (
          <>
            <div className="post_title">
              <Link to={`/post/${recentPost.user_id}/${recentPost.post_id}`}>
                <h3 className="text-lg">{recentPost.title}</h3>
              </Link>
              <span className="text-sm text-gray-400">
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
