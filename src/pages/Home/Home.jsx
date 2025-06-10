import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { ArticleSection } from "../../components/Home/ArticleSection/ArticleSection";
import { useCallback, useRef } from "react";
import { LoadingTextWithSpinner } from "@/components/common/LoadingTextWithSpinner/LoadingTextWithSpinner";
import { ErrorText } from "@/components/common/ErrorText/ErrorText";
import SEO from "@/components/common/SEO/SEO";
const Home = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetAllPosts();

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
  if (error) {
    return (
      <MainLayout className="mb-0">
        <ErrorText>Error in Home page !!</ErrorText>
      </MainLayout>
    );
  }
  if (isLoading) {
    return (
      <MainLayout className={`max-w-[1024px] mb-0 mt-0`}>
        <LoadingTextWithSpinner direction="center">
          Loading posts...
        </LoadingTextWithSpinner>
      </MainLayout>
    );
  }

  const postData = data.pages.map((item) => JSON.parse(item.posts)).flat();
  return (
    <>
      <SEO
        title={"Blog-W homepage"}
        type={"website"}
        description={"blogging website for everyone !"}
        name={"Blog-W homepage"}
        url={window.location.href}
      />
      <MainLayout
        className={`grid grid-cols-1 lg:grid-cols-[22rem_auto_22rem]  gap-4 md:p-0 px-4`}
      >
        {/* {isPending ? null : console.log("data in home =====> ", data)} */}
        <div className=" bg-bg-shade md:block hidden">Sidebar</div>

        <div>
          <ArticleSection ref={lastElement} postData={postData} />
          {isFetching && <div>Fetching more data...</div>}
        </div>

        <div className=" bg-bg-shade md:block hidden">Ads</div>
      </MainLayout>
    </>
  );
};

export default Home;
