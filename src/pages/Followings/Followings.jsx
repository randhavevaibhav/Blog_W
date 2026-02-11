import React, { useMemo } from "react";
import { useGetAllFollowings } from "@/hooks/follower/useGetAllFollowings";
import Error from "../Error/Error";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { FollowingsList } from "@/components/Followings/FollowingsList";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { FollowersSkeleton } from "@/components/FollowersSkeleton/FollowersSkeleton";
import { useSearchParams } from "react-router-dom";
import { MutualFollowFilter } from "@/components/common/MutualFollow/MutualFollowFilter";
import { SortFollower } from "@/components/common/SortFollowers/SortFollower";
import { NotFound } from "@/components/common/NotFound/NotFound";

const list = {
  desc: {
    name: "Latest",
    desc: "Latest Followed users will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "Oldest Followed users will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];

const Followings = () => {
  const [searchParams, _] = useSearchParams();

  const sort = searchParams.get("sort") ? searchParams.get("sort") : "desc";

  const mutual = searchParams.get("mutual")
    ? searchParams.get("mutual")
    : "false";
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isPending,
    isError,
    isFetchingNextPage
  } = useGetAllFollowings({
    sort,
    mutual,
  });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

    const followings = useMemo(
      () => data?.pages.flatMap((page) => page.followings) ?? [],
      [data],
    );

   const isInitialLoading = (isPending || isLoading) && !data&&!isFetchingNextPage;
  if (isInitialLoading) {
    return (
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <FollowersSkeleton count={6} />
      </MainLayout>
    );
  }

  if (isError) {
    console.error(error);
    return <Error>Error while loading followers !</Error>;
  }



  const nextOffset = data.pages.map((item) => item.offset).flat()[0];
  const currentOffset = nextOffset ? parseInt(nextOffset) - 10 : 0;
  const totalFollowings = followings.length;
  

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="grid md:grid-cols-[16rem_auto] grid-cols-1 gap-2">
          <div className="space-y-3">
            <header
              className="mb-3 order-1"
              data-test={`following-users-header`}
            >
              <h2 className="font-semibold text-2xl tracking-wide">
                {`Following users ( ${totalFollowings} )`}
              </h2>
            </header>
            <div className="flex lg:flex-col items-start gap-2 justify-between lg:justify-normal">
              <MutualFollowFilter offset={currentOffset} />
              <SortFollower
                listArray={listArray}
                list={list}
                offset={currentOffset}
              />
            </div>
          </div>
          {totalFollowings <= 0 ? (
            <NotFound dataTestId={`followings-not-found`}>
              No followings !!
            </NotFound>
          ) : (
            <div className="order-2">
              <FollowingsList
                followings={followings}
                ref={lastElement}
                isFetching={isFetching}
              />
               {isFetchingNextPage ? <FollowersSkeleton count={6} /> : null}
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Followings;
