import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getFormattedDateString } from "@/utils/utils";

export const RecentComment = memo(({ recentComment }) => {
  const { preFetchIndividualPost, preFetchPostComments } = usePrefetch();

  const formattedDateStr = recentComment
    ? getFormattedDateString({ createdAt: recentComment.createdAt })
    : null;
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
              to={`/post/${recentComment.authorId}/${recentComment.postId}#comments`}
              onMouseOver={() => {
                preFetchIndividualPost({
                  userId: recentComment.userId,
                  postId: recentComment.postId,
                  imgURL: recentComment.titleImgURL,
                });
                preFetchPostComments({
                  postId: recentComment.postId,
                });
              }}
            >
              <div>
                <div className="flex items-center gap-4">
                  <p className="text-fs_base">{recentComment.content}</p>
                  <span className="text-fs_small text-gray-400">
                    {`commented on : ${formattedDateStr}`}
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
});
