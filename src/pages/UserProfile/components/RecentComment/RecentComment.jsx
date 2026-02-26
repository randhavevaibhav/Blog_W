import React, { memo } from "react";
import { Link } from "react-router-dom";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { getFormattedDateString } from "@/utils/utils";
import { getPostPageLink } from "@/utils/getLinks";

export const RecentComment = memo(({ recentComment }) => {
  const { preFetchIndividualPost, preFetchPostComments } = usePrefetch();

  if (!recentComment) {
    return <p className="text-fs_base my-2">No comments yet.</p>;
  }

  const formattedDateStr = recentComment
    ? getFormattedDateString({ date: recentComment.createdAt })
    : null;
  return (
    <>
      <div className="ind_comment bg-card-bg p-2 px-4 my-2 rounded-md">
        <h3 className="capitalize font-medium text-fs_xl tracking-wide my-1">
          Recent comment
        </h3>
        <hr />
        <Link
          to={`${getPostPageLink({
            postId:recentComment.postId
          })}#comments`}
          onMouseOver={() => {
            preFetchIndividualPost({
              postId: recentComment.postId,
              imgURL: recentComment.titleImgURL,
            });
            preFetchPostComments({
              postId: recentComment.postId,
            });
          }}
        >
          <div>
            <div className="">
              <p className="text-fs_base">{recentComment.content}</p>
              <span className="text-fs_small text-gray-400">
                {`commented on : ${formattedDateStr}`}
              </span>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
});
