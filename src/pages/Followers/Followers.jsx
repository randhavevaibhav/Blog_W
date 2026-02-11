import React, { useMemo } from "react";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetAllFollowers } from "@/hooks/follower/useGetAllFollowers";
import Error from "../Error/Error";
import { FollowersList } from "@/components/Followers/FollowerList/FollowersList";
import "./Followers.css";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { FollowersSkeleton } from "@/components/FollowersSkeleton/FollowersSkeleton";
import { useAuth } from "@/hooks/auth/useAuth";
import { useSearchParams } from "react-router-dom";
import { SortFollower } from "@/components/common/SortFollowers/SortFollower";
import { MutualFollowFilter } from "@/components/common/MutualFollow/MutualFollowFilter";
import { NotFound } from "@/components/common/NotFound/NotFound";

const list = {
  desc: {
    name: "Latest",
    desc: "Latest followers will be first",
    value: "desc",
  },
  asc: {
    name: "Oldest",
    desc: "Oldest followers will be first",
    value: "asc",
  },
};

const listArray = [...Object.values(list)];

const Followers = () => {
  const { auth } = useAuth();
  const { userId } = auth;

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
  } = useGetAllFollowers({
    userId,
    sort,
    mutual,
  });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  const followers = useMemo(
    () => data?.pages.flatMap((page) => page.followers) ?? [],
    [data],
  );

  const isInitialLoading =
    (isPending || isLoading) && !data && !isFetchingNextPage;
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
  const totalFollowers = followers.length;

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="grid md:grid-cols-[20rem_auto_10rem] grid-cols-1 gap-4 ">
          <div className="space-y-3">
            <header className="mb-3 order-1" data-test={`followers-header`}>
              <h2 className="font-semibold text-2xl tracking-wide">{`Followers ( ${totalFollowers} )`}</h2>
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

          {totalFollowers <= 0 ? (
            <NotFound dataTestId={`followers-not-found`}>
              No followers !!
            </NotFound>
          ) : (
            <>
              <FollowersList
                followers={followers}
                ref={lastElement}
                isFetching={isFetching}
              />

              {isFetchingNextPage ? <FollowersSkeleton count={6} /> : null}
            </>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Followers;
