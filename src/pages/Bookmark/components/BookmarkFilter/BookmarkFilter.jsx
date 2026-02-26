import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { FilterIconLabel } from "@/components/common/FilterIconLabel/FilterIconLabel";
import { TagFilter } from "@/components/common/TagFilter/TagFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAllBookmarksTags } from "@/hooks/bookmark/useGetAllBookmarksTags";
import { useSearchParams } from "react-router-dom";

export const BookmarkFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const hashtagId = searchParams.get("hashtag")
    ? searchParams.get("hashtag")
    : 0;

  const { isPending, isError, error, data } = useGetAllBookmarksTags();

  if (isPending) {
    return(

      <div className="flex gap-2 items-center">
        <FilterIconLabel/>
         <Skeleton className={"h-8 w-16 bg-skeleton-bg"}/>
      </div>
    );
  }

  if (isError) {
    console.error("Error while fetching bookmark tags ==>", error);
    return <div className="flex gap-2 items-center">
        <FilterIconLabel/>
         <ErrorText>
          Error bookmark tags 
         </ErrorText>
      </div>;
  }

  const allPostHashtags = data.allPostHashtags;

  const hashtags = [
    {
      id: 0,
      color: "var(--text-primary)",
      name: "All",
    },
    ...Object.values(allPostHashtags),
  ];
  const selectedTag = allPostHashtags[hashtagId]
    ? allPostHashtags[hashtagId]
    : {
        color: "var(--text-primary)",
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
