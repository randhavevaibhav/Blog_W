import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useGetSearchSuggestions } from "@/hooks/posts/useGetSearchSuggestions";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { format } from "date-fns";
import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export const SearchSuggestions = forwardRef(
  ({ searchQuery, activeIndex }, ref) => {
    const { data, isError, isLoading } = useGetSearchSuggestions({
      query: searchQuery,
      sortBy: "desc",
      limit: 5,
    });
    const { preFetchIndividualPost } = usePrefetch();

    if (isLoading) {
      return (
        <Card
          className="left-0 absolute md:min-w-[500px] min-w-full mt-3 max-h-[500px] overflow-auto border shadow"
          ref={ref}
        >
          <CardContent className="w-full py-2 px-4">
            <LoadingTextWithSpinner>Loading ...</LoadingTextWithSpinner>
          </CardContent>
        </Card>
      );
    }

    if (isError) {
      return (
        <Card
          className="left-0 absolute md:min-w-[500px] min-w-full mt-3 max-h-[500px] overflow-auto border shadow"
          ref={ref}
        >
          <CardContent className="w-full py-2 px-4">
            <ErrorText>Error while loading search suggestions</ErrorText>
          </CardContent>
        </Card>
      );
    }

    const posts = data.posts;
    const totalPosts = posts.length;

    return (
      <>
        <Card
          className="left-0 absolute md:min-w-[500px] min-w-full mt-3 max-h-[500px] overflow-auto border border-card-border shadow"
          ref={ref}
        >
          <CardContent className="w-full py-2 px-2">
            <ul>
              {posts?.length > 0 ? (
                posts.map((post, i) => {
                  if (i === activeIndex) {
                    preFetchIndividualPost({
                      userId: post.userId,
                      postId: post.postId,
                      imgURL: post.titleImgURL,
                    });
                  }
                  return (
                    <li
                      key={uuidv4()}
                      className={`mt-2  p-2 rounded-md ${
                        i === activeIndex
                          ? `bg-action-color text-white`
                          : `bg-bg-shade hover:bg-bg-shade-hover`
                      }`}
                      onMouseOver={() =>
                        preFetchIndividualPost({
                          userId: post.userId,
                          postId: post.postId,
                          imgURL: post.titleImgURL,
                        })
                      }
                    >
                      <Link
                        to={`/post/${post.userId}/${post.postId}`}
                        className="cursor-pointer w-full"
                      >
                        <div>
                          <strong className="text-fs_base font-extrabold tracking-wide">
                            {post.title}
                          </strong>
                        </div>
                        <div>
                          <span className="text-fs_xs text-gray-400">
                            {format(new Date(post.createdAt), "yyyy-MM-dd")}
                          </span>
                        </div>
                      </Link>
                    </li>
                  );
                })
              ) : (
                <span>{`No post found with title "${searchQuery}"`}</span>
              )}
            </ul>
          </CardContent>
          {totalPosts == 5 ? (
            <CardFooter className="p-2">
              <span className="text-fs_small tracking-wide">
                Submit search for more results
              </span>
            </CardFooter>
          ) : null}
        </Card>
      </>
    );
  }
);
