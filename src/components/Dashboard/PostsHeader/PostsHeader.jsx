import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { SortPosts } from "./SortPosts/SortPosts";
import { cn } from "@/lib/utils";

export const PostsHeader = ({ totalPostsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const archive = searchParams.get("archive") ? searchParams.get("archive") : 0;
  const isArchive = parseInt(archive) === 1;

  return (
    <div className="flex justify-between md:mb-3 my-3">
      <div>
        <h2 className="text-2xl font-semibold mb-2">
         {isArchive? <span>Archive posts&nbsp;</span>:<span>Posts&nbsp;</span>}
          <span className="">(&nbsp;{`${totalPostsCount}`}&nbsp;)</span>
        </h2>

        <div className="flex gap-4">
          <Button
            className={cn(
              {
                "bg-action-color text-white": !isArchive,
              },
              "lg:hover:bg-action-color  lg:hover:text-white",
            )}
            onClick={() => {
              setSearchParams({
                archive: 0,
              });
            }}
            variant={"outline"}
          >
            All
          </Button>
          <Button
            className={cn(
              {
                "bg-action-color text-white": isArchive,
              },
              "lg:hover:bg-action-color lg:hover:text-white ",
            )}
            onClick={() => {
              setSearchParams({
                archive: 1,
              });
            }}
            variant={"outline"}
          >
            Archive
          </Button>
        </div>
      </div>
      {totalPostsCount > 1 ? <SortPosts/> : null}
    </div>
  );
};
