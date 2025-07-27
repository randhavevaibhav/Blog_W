import React from "react";
import "../Followers/Followers.css";
import { useGetAllFollowings } from "@/hooks/follower/useGetAllFollowings";
import Loading from "../Loading/Loading";
import PageNotFound from "../PageNotFound/PageNotFound";
import Error from "../Error/Error";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useParams } from "react-router-dom";
import { FollowingsList } from "@/components/Followings/FollowingsList";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { FollowersSkeleton } from "@/components/FollowersSkeleton/FollowersSkeleton";
const Followings = () => {
  const { userId } = useParams();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isLoading,
    isPending,
    isError,
  } = useGetAllFollowings({
    userId,
  });

  const { lastElement } = useInfiniteQueryCntrObserver({
    hasNextPage,
    isFetching,
    isLoading,
    fetchNextPage,
  });

  if (isFetching || isPending) {
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

  const followings = data.pages.map((item) => item.followings).flat();
  const totalFollowings = followings.length;
  if (totalFollowings <= 0) {
    return <PageNotFound>No followings yet !!</PageNotFound>;
  }
  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <header className="my-3">
          <h2 className="font-semibold text-fs_2xl tracking-wide">
            {`Following users ( ${totalFollowings} )`}
          </h2>
        </header>
        <FollowingsList followings={followings} ref={lastElement} />
        {isFetching && <div>Fetching more data...</div>}
      </MainLayout>
    </>
  );
};

export default Followings;
