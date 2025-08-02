import React from "react";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetAllFollowers } from "@/hooks/follower/useGetAllFollowers";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Error from "../Error/Error";
import { FollowersList } from "@/components/Followers/FollowerList/FollowersList";
import "./Followers.css";
import { useInfiniteQueryCntrObserver } from "@/hooks/utils/useInfiniteQueryCntrObserver";
import { FollowersSkeleton } from "@/components/FollowersSkeleton/FollowersSkeleton";
const Followers = () => {
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
  } = useGetAllFollowers({
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

  const followers = data.pages.map((item) => item.followers).flat();
  const totalFollowers = followers.length;

  if (totalFollowers <= 0) {
    return <PageNotFound>No followers yet !!</PageNotFound>;
  }

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <header className="my-3" data-test={`followers-header`}>
          <h2 className="font-semibold text-fs_2xl tracking-wide">{`Followers ( ${totalFollowers} )`}</h2>
        </header>
        <FollowersList followers={followers} ref={lastElement} isFetching={isFetching}/>
        
      </MainLayout>
    </>
  );
};

export default Followers;
