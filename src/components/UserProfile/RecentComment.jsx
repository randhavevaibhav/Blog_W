import React from 'react'
import { Link } from 'react-router-dom'
import { format } from "date-fns";
export const RecentComment = ({recentComment}) => {
  return (
    <div className="recent_comment bg-bg-shade p-4 rounded-md">
    <h4 className="text-xl font-semibold tracking-wide mb-4">
      Recent comments
    </h4>
    {/* Individual comment */}
    {recentComment ? (
      <div className="ind_comment">
        <Link
          to={`/post/${recentComment.user_id}/${recentComment.post_id}`}
        >
          <div>
            <h4 className="text-lg font-semibold tracking-wide">
              {recentComment.post_title}
            </h4>
            <div className="flex items-center gap-4">
              <p className="text-base">{recentComment.content}</p>
              <span className="text-sm text-gray-400">
                {`commented on : ${format(
                  new Date(recentComment.created_at),
                  "yyyy-MM-dd"
                )}`}
              </span>
            </div>
          </div>
        </Link>
        <hr className="mt-2" />
      </div>
    ) : (
      <p>No comments yet.</p>
    )}
  </div>
  )
}
