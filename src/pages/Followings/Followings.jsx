import React, { useCallback, useRef } from "react";
import "../Followers/Followers.css";
import { useGetAllFollowings } from "@/hooks/follower/useGetAllFollowings";
import Loading from "../Loading/Loading";
import PageNotFound from "../PageNotFound/PageNotFound";
import Error from "../Error/Error";
import { FollowersList } from "@/components/Followers/FollowerList/FollowersList";
import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { useParams } from "react-router-dom";
import { FollowingsList } from "@/components/Followings/FollowingsList";
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
