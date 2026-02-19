import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPopularHashtags } from "@/hooks/hashtags/useGetPopularHashtags";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { usePrefetchOnHover } from "@/hooks/utils/usePrefetchOnHover";
import { getTaggedPostsPageLink } from "@/utils/getLinks";
import React from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuid4 } from "uuid";



const PopularTagsContainer = ({ children }) => {
  return (
    <div className="order-3">
     <h3 className="font-semibold text-xl mb-2">Popular tags</h3>
      <Card className="bg-card-bg rounded-md">
        <CardContent className="pt-0 p-3">{children}</CardContent>
      </Card>
    </div>
  );
};

export const PopularTags = () => {
  const { data, isPending, isError, error } = useGetPopularHashtags();
  const { preFetchAllTaggedPosts } = usePrefetch();
  const { onMouseEnter, onMouseLeave } = usePrefetchOnHover({
    prefFetchQueryFn: (hashtag) => {
      preFetchAllTaggedPosts({
        hashtagId: hashtag.id,
      });
    },
  });
  const navigate = useNavigate();
  if (isPending) {
    return (
      <PopularTagsContainer>
        <Skeleton className={"w-full h-[180px] order-3 bg-card-bg"} />
      </PopularTagsContainer>
    );
  }
  if (isError) {
    console.error("Error while fetching popular hashtags ==> ", error);

    return (
      <PopularTagsContainer>
        <ErrorText className="order-3">
          Error while fetching popular hashtags
        </ErrorText>
      </PopularTagsContainer>
    );
  }

  const normalizedHashtags = data.hashtags;
  const hashtags = [...Object.values(normalizedHashtags)];

  const handleTagClick = (tag) => {
    navigate(
      getTaggedPostsPageLink({
        hashtagId: tag.id,
        hashtagName: tag.name,
        hashtagColor: tag.color,
      }),
    );
  };

  return (
    <PopularTagsContainer>
      <ul className={"max-h-80  flex lg:flex-col flex-wrap  min-w-[12rem]"}>
        {hashtags.map((tag) => {
          return (
            <li
              key={`${uuid4()}_${tag.id}`}
              style={{ "--tag-bg-hover": tag.color }}
              className="flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent hover:border-tag-bg-hover duration-200 cursor-pointer"
              onClick={() => handleTagClick(tag)}
              onMouseEnter={() => onMouseEnter(tag)}
              onMouseLeave={onMouseLeave}
              data-test={"tag-list-element"}
              data-value={tag.name}
            >
              <div className="flex gap-2 items-center">
                <span
                  style={{ color: tag.color }}
                  className="font-semibold text-fs_lg"
                >
                  #
                </span>
                {tag.name}
              </div>
            </li>
          );
        })}
      </ul>
    </PopularTagsContainer>
  );
};
