import { TagFilter } from "@/components/common/TagFilter/TagFilter";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const FilterSearchResult = ({ allPostHashtags }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const hashtag = searchParams.get("hashtag") ? searchParams.get("hashtag") : 0;
  const query = searchParams.get("query") ? searchParams.get("query") : "";
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";

  const hashtags = [
    {
      color: "white",
      name: "All",
      id: 0,
    },
    ...Object.values(allPostHashtags),
  ];
  const selectedTag = allPostHashtags[hashtag]
    ? allPostHashtags[hashtag]
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
