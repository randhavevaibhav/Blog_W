import { Button } from "@/components/ui/button";
import React from "react";
import { useSearchParams } from "react-router-dom";

export const PostsHeader = ({ totalPostsCount ,dashBoardPostLoading=false}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const archive = searchParams.get("archive") ? searchParams.get("archive") : 0;
  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";
  const isArchive = parseInt(archive) === 1;
  const disableActionBtns = totalPostsCount<=0&&dashBoardPostLoading?true:false;
  return (
    <div className="flex justify-between my-4 items-center gap-2">
      <h2 className="lg:text-2xl text-xl font-semibold mb-2">
        {isArchive ? (
          <span>Archive posts&nbsp;</span>
        ) : (
          <span>Posts&nbsp;</span>
        )}
        <span className="">(&nbsp;{`${totalPostsCount}`}&nbsp;)</span>
      </h2>
      <div className="flex gap-4 mb-2">
        <Button
        className={"disabled:cursor-not-allowed"}
          variant={!isArchive ? "action" : "outline"}
          onClick={() => {
            setSearchParams({
              archive: 0,
              sort,
            });
          }}
          disabled={disableActionBtns}
        >
          All
        </Button>
        <Button
        className={"disabled:cursor-not-allowed"}
          variant={isArchive ? "action" : "outline"}
          onClick={() => {
            setSearchParams({
              archive: 1,
              sort,
            });
          }}
            disabled={disableActionBtns}
        >
          Archive
        </Button>
      </div>
    </div>
  );
};
