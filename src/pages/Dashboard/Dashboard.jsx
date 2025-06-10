import { Footer } from "../../components/common/Footer/Footer";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import "./Dashboard.css";
import { Header } from "../../components/Dashboard/Header/Header";
import { PostsContainer } from "../../components/Dashboard/PostsContainer/PostsContainer";
import { useGetAllOwnPosts } from "../../hooks/posts/useGetAllOwnPosts";


import { ErrorText } from "../../components/common/ErrorText/ErrorText";


import { useCallback, useRef } from "react";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
const Dashboard = () => {
  const {
    data,
    isLoading,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useGetAllOwnPosts();
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

  if (isLoading) {
    return (
      <>
       <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">Loading posts ...</LoadingTextWithSpinner>
      </MainLayout>

        <Footer />
      </>
    );
  }

  if (isError) {
  
    return (
      <>
        <MainLayout className="p-2">
          <ErrorText> Error ocuured while Fetching post data</ErrorText>
        </MainLayout>
        <Footer />
      </>
    );
  }


  //  console.log("data in dashboard  ===> ",data)
  const postData = data.pages.map((item) => JSON.parse(item.posts)).flat();
  //  console.log("data.pages[0].total_post_count in dashboard  ===> ",data.pages[0].total_post_count)
  const totoalPostsCount = data.pages[0].total_post_count;
  const totalCommentsCount = data.pages[0].total_post_comments;
  const totalLikesCount = data.pages[0].total_likes_count;
  return (
    <>
      <MainLayout className="main_container p-2 overflow-auto">
        <>
          <Header
            totoalPostsCount={totoalPostsCount}
            totalCommentsCount={totalCommentsCount}
            totalLikesCount={totalLikesCount}
          />
          {/*Side container */}
          <div className="sidebar md:block hidden">Sidebar</div>
          {/* users all posts container */}

          <PostsContainer postData={postData} lastElement={lastElement} />
        </>
      </MainLayout>
      <Footer />
    </>
  );
};

export default Dashboard;
