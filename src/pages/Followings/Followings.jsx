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

const FollowingsHeader = ({ totalFollowings = 0 }) => {
  return (
    <header className="mb-3 " data-test={`following-users-header`}>
      <h2 className="font-semibold text-2xl tracking-wide">
        {`Following users ( ${totalFollowings} )`}
      </h2>
    </header>
  );
};



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
    isFetchingNextPage,
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

  const isInitialLoading =
    (isPending || isLoading) && !data && !isFetchingNextPage;
  if (isInitialLoading) {
    return (
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="flex lg:flex-row justify-between flex-col my-4">
          <FollowingsHeader totalFollowings={0} />
          <div className="flex  items-start gap-2 justify-between ">
            <MutualFollowFilter  />
            <SortFollower  />
          </div>
        </div>
        <FollowersSkeleton count={6} />
      </MainLayout>
    );
  }

  if (isError) {
    console.error("Error while loading followers ! ==> ", error);
    return (
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="space-y-3">
          <FollowingsHeader totalFollowings={0} />
        </div>
        <div>
          <Error>Error while loading followers !</Error>
        </div>
      </MainLayout>
    );
  }


  const totalFollowings = followings.length;

  return (
    <MainLayout className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}>
      <div className="flex lg:flex-row justify-between flex-col my-4">
        <FollowingsHeader totalFollowings={totalFollowings} />
        <div className="flex  items-start gap-2 justify-between ">
          <MutualFollowFilter />
          <SortFollower />
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
    </MainLayout>
  );
};

export default Followings;
