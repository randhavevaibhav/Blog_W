import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useGetAllHashtags } from "@/hooks/hashtags/useGetAllHashtags";
import { Skeleton } from "@/components/ui/skeleton";
import { TagFilter } from "@/components/common/TagFilter/TagFilter";
import {  useNavigate, useParams } from "react-router-dom";
import { getTaggedPostsPageLink } from "@/utils/getLinks";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { usePrefetchOnHover } from "@/hooks/utils/usePrefetchOnHover";
import { FilterIconLabel } from "@/components/common/FilterIconLabel/FilterIconLabel";

export const FilterHomePosts = () => {
  const { isPending, isError, data, error } = useGetAllHashtags();
  const { hashtagId} = useParams();
 
 
  const navigate = useNavigate();
  const { preFetchAllTaggedPosts } = usePrefetch();

  const { onMouseEnter, onMouseLeave } = usePrefetchOnHover({
    prefFetchQueryFn: (tag) => {
      preFetchAllTaggedPosts({
        hashtagId: tag.id,
        hashtagName: tag.name,
      });
    },
  });

  if (isPending) {
    return (
      <div className="flex items-center gap-2 h-fit">
        <FilterIconLabel />
        <Skeleton className={"w-20 h-8 bg-card-bg"} />
      </div>
    );
  }

  if (isError) {
    console.error("Error while fetching tag list ===> ", error);
    return (
      <div>
        <ErrorText>Error!</ErrorText>
      </div>
    );
  }

  const allPostHashtags = data.hashtags;
  const hashtagList = [...Object.values(allPostHashtags)];
  const selectedTag = allPostHashtags[hashtagId]
    ? allPostHashtags[hashtagId]
    : {
        color: "orange",
        name: "All tags",
        id: 0,
      };

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
    <TagFilter
      hashtags={hashtagList}
      labelColor={selectedTag.color}
      labelName={selectedTag.name}
      onTagClick={handleTagClick}
      onTagMouseEnter={onMouseEnter}
      onTagMouseLeave={onMouseLeave}
      className="order-2"
    />
  );
};
