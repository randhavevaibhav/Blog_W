import React, { memo } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
export const RecentPost = memo(({ recentPost }) => {
  const { preFetchIndiviualPost } = usePrefetch();
  return (
    <Card className="bg-bg-shade">
      <CardHeader>
        <h3 className="capitalize font-medium text-fs_2xl tracking-wide">
          Recent post
        </h3>
        <hr />
      </CardHeader>
      <CardContent className="recent_post rounded-md">
        {/* posts */}

        <div className="">
          {recentPost ? (
            <>
              <div className="post_title">
                <Link
                  to={`/post/${recentPost.userId}/${recentPost.postId}`}
                  onMouseOver={() => {
                    preFetchIndiviualPost({
                      userId: recentPost.userId,
                      postId: recentPost.postId,
                      imgURL: recentPost.titleImgURL,
                    });
                  }}
                >
                  <h4 className="font-medium text-fs_xl">{recentPost.title}</h4>
                </Link>
                <span className="text-fs_small text-gray-400">
                  Published:{" "}
                  {format(new Date(recentPost.createdAt), "yyyy-MM-dd")}
                </span>
              </div>
            </>
          ) : (
            <p className="">No posts yet.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
});
