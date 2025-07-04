import React, { useCallback, useRef } from "react";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useGetAllFollowers } from "@/hooks/follower/useGetAllFollowers";
import { useParams } from "react-router-dom";
import PageNotFound from "../PageNotFound/PageNotFound";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";
import { FollowersList } from "@/components/Followers/FollowerList/FollowersList";
import "./Followers.css";
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

  const handleObserver = useRef();
  const lastElement = useCallback(
    (element) => {
      if (isLoading) return;
      if (handleObserver.current) handleObserver.current.disconnect();
      handleObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (element) handleObserver.current.observe(element);
    },
    [isLoading, hasNextPage]
  );

  if (isFetching || isPending) {
    return <Loading>Loading ...</Loading>;
  }

  if (isError) {
    console.error(error);

    return <Error>Error while loading followers !</Error>;
  }

  const followers = data.pages.map((item) => item.followers).flat();

  if (followers.length <= 0) {
    return <PageNotFound>No followers yet !!</PageNotFound>;
  }

  return (
    <>
      <MainLayout
        className={` md:mx-auto max-w-[1380px] mb-0 p-4 bg-bg-primary`}
      >
        <header className="my-3">
          <h2 className="font-semibold text-fs_3xl tracking-wide">Followers</h2>
        </header>
        <FollowersList followers={followers} ref={lastElement} />
        {isFetching && <div>Fetching more data...</div>}
      </MainLayout>
    </>
  );
};

export default Followers;
