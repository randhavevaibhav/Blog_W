import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { FilterIconLabel } from "@/components/common/FilterIconLabel/FilterIconLabel";
import { TagFilter } from "@/components/common/TagFilter/TagFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchedPostsHashtags } from "@/hooks/posts/useGetSearchedPostsHashtags";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const FilterSearchResult = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hashtag = searchParams.get("hashtag") ? searchParams.get("hashtag") : 0;
  const query = searchParams.get("query") ? searchParams.get("query") : "";
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";

  const { isPending, isError, error, data } = useGetSearchedPostsHashtags({
    query,
  });

  if (isPending) {
    return (
      <div className="flex gap-2">
        <FilterIconLabel />
        <Skeleton className={"w-16 h-8 bg-skeleton-bg"} />
      </div>
    );
  }

  if (isError) {
    console.error("Error while fetching searched posts hashtags ==> ", error);
    return (
      <div className="flex gap-2">
        <FilterIconLabel />
        <ErrorText className="">Error fetching hashtags</ErrorText>
      </div>
    );
  }

  const normalizedPostHashtags = data.allPostHashtags;

  const hashtags = [
    {
      color: "white",
      name: "All",
      id: 0,
    },
    ...Object.values(normalizedPostHashtags),
  ];
  const selectedTag = normalizedPostHashtags[hashtag]
    ? normalizedPostHashtags[hashtag]
    : {
        color: "white",
        name: "All",
      };

  const handleTagClick = (tag) => {
    setSearchParams({
      hashtag: tag.id,
      query,
      sort,
    });
  };

  return (
    <TagFilter
      hashtags={hashtags}
      labelColor={selectedTag.color}
      labelName={selectedTag.name}
      onTagClick={handleTagClick}
    />
  );
};
