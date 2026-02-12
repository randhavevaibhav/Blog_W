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

const FollowersHeader = ({ totalFollowers = 0 }) => {
  return (
    <header className="mb-3" data-test={`followers-header`}>
      <h2 className="font-semibold text-2xl tracking-wide">{`Followers ( ${totalFollowers} )`}</h2>
    </header>
  );
};



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
       <div className="flex lg:flex-row justify-between flex-col my-4">
          <FollowersHeader totalFollowers={0} />
          <div className="flex  items-start gap-2 justify-between ">
            <MutualFollowFilter />
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
        <FollowersHeader totalFollowers={0} />
        <Error>Error while loading followers !</Error>
      </MainLayout>
    );
  }

 
  const totalFollowers = followers.length;

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <div className="flex lg:flex-row justify-between flex-col my-4">
          <FollowersHeader totalFollowers={totalFollowers} />
          <div className="flex  items-start gap-2 justify-between ">
            <MutualFollowFilter  />
            <SortFollower  />
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
      </MainLayout>
    </>
  );
};

export default Followers;
