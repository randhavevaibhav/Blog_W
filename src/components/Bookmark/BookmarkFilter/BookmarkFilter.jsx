import { TagFilter } from "@/components/common/TagFilter/TagFilter";
import { useSearchParams } from "react-router-dom";

export const BookmarkFilter = ({ allPostHashtags = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtagId = searchParams.get("hashtag")
    ? searchParams.get("hashtag")
    : 0;
  const hashtags = [
    {
      id: 0,
      color: "white",
      name: "All",
    },
    ...Object.values(allPostHashtags),
  ];
  const selectedTag = allPostHashtags[hashtagId]
    ? allPostHashtags[hashtagId]
    : {
        color: "white",
        name: "All",
      };

  const handleTagClick = (tag) => {
    setSearchParams({
      hashtag: tag.id,
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
