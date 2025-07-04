import React, { memo } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "../../ui/card";
export const RecentComment =memo( ({ recentComment }) => {

  return (
    <Card className="bg-bg-shade">
      <CardHeader>
          <h3 className="capitalize font-medium text-fs_2xl tracking-wide">
          Recent comment
        </h3>
         <hr />
      </CardHeader>
      
      <CardContent className="recent_comment rounded-md">
      
        {/* Individual comment */}
        {recentComment ? (
          <div className="ind_comment">
            <Link
              to={`/post/${recentComment.user_id}/${recentComment.post_id}`}
            >
              <div>
                <h4 className="text-fs_xl font-medium tracking-wide">
                  {recentComment.post_title}
                </h4>
                <div className="flex items-center gap-4">
                  <p className="text-fs_base">{recentComment.content}</p>
                  <span className="text-fs_small text-gray-400">
                    {`commented on : ${format(
                      new Date(recentComment.created_at),
                      "yyyy-MM-dd"
                    )}`}
                  </span>
                </div>
              </div>
            </Link>
           
          </div>
        ) : (
          <p className="text-fs_base">No comments yet.</p>
        )}
      </CardContent>
    </Card>
  );
})
