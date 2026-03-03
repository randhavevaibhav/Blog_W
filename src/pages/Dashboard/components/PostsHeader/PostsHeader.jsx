import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { SortPosts } from "./SortPosts/SortPosts";
import { cn } from "@/lib/utils";

export const PostsHeader = ({ totalPostsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const archive = searchParams.get("archive") ? searchParams.get("archive") : 0;
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const isArchive = parseInt(archive) === 1;

  return (
    <div >
      <div className="flex justify-between lg:mb-3 my-2">
        <h2 className="text-2xl font-semibold mb-2">
         {isArchive? <span>Archive posts&nbsp;</span>:<span>Posts&nbsp;</span>}
          <span className="">(&nbsp;{`${totalPostsCount}`}&nbsp;)</span>
        </h2>

  {totalPostsCount > 1 ? <SortPosts/> : null}
      </div>
              <div className="flex gap-4 mb-2">
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
                sort
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
                sort
              });
            }}
            variant={"outline"}
          >
            Archive
          </Button>
        </div>
    
    </div>
  );
};
