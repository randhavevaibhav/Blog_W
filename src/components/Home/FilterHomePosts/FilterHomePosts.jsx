import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { useGetAllHashtags } from "@/hooks/hashtags/useGetAllHashtags";
import { Skeleton } from "@/components/ui/skeleton";
import { TagFilter } from "@/components/common/TagFilter/TagFilter";
import { useNavigate, useParams } from "react-router-dom";
import { getTaggedPostsPageLink } from "@/utils/getLinks";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { usePrefetchOnHover } from "@/hooks/utils/usePrefetchOnHover";

const FilterHomePostsContainer = ({ children }) => {
  return (
    <div className={"lg:order-2 order-3 flex gap-2 items-center"}>
      <h3 className="font-semibold lg:text-xl text-lg ">Filter by tags</h3>
      {children}
    </div>
  );
};

export const FilterHomePosts = () => {
  const { isPending, isError, data, error } = useGetAllHashtags();
  const { hashtagId } = useParams();

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
      <FilterHomePostsContainer>
        <Skeleton className={"w-20 h-8 bg-skeleton-bg"} />
      </FilterHomePostsContainer>
    );
  }

  if (isError) {
    console.error("Error while fetching tag list ===> ", error);
    return (
       <FilterHomePostsContainer>
        <ErrorText>Error!</ErrorText>
       </FilterHomePostsContainer>
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
     <FilterHomePostsContainer>
      <TagFilter
        showIconLabel={false}
        hashtags={hashtagList}
        labelColor={selectedTag.color}
        labelName={selectedTag.name}
        onTagClick={handleTagClick}
        onTagMouseEnter={onMouseEnter}
        onTagMouseLeave={onMouseLeave}
      />
   </FilterHomePostsContainer>
  );
};
