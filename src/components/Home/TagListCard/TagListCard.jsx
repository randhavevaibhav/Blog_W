import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { Card, CardHeader } from "@/components/ui/card";
import { useGetAllHashtags } from "@/hooks/hashtags/useGetAllHashtags";

import { PostTags } from "@/components/common/PostTags/PostTags";
const TagListCardHeader = () => {
  return (
    <CardHeader className={`font-semibold text-fs_lg py-4 px-3 pb-0`}>
      Tag List
    </CardHeader>
  );
};

export const TagListCard = () => {
  const { isPending, isError, data } = useGetAllHashtags();

  if (isPending) {
    return (
      <Card className="bg-card-bg">
        <TagListCardHeader />
        <LoadingTextWithSpinner>Loading ..</LoadingTextWithSpinner>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card className="bg-card-bg">
        <TagListCardHeader />
        <ErrorText>Error while fetching tag list !</ErrorText>
      </Card>
    );
  }

  const hashtagList = data.hashtags;
  return (
    <Card className="bg-card-bg">
      <TagListCardHeader />

      <PostTags
        tagList={hashtagList}
        className="py-4 px-2 max-h-80 overflow-y-scroll scrollbar scrollbar-thumb-card-bg scrollbar-track-bg-primary flex flex-col flex-nowrap"
      />
      {/* </div> */}
    </Card>
  );
};
