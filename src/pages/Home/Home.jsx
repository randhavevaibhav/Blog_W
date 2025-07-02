import { useGetAllPosts } from "@/hooks/posts/useGetAllPosts";
import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { ArticleSection } from "../../components/Home/ArticleSection/ArticleSection";
import { useCallback, useRef } from "react";
import SEO from "@/components/common/SEO/SEO";
import { useScrollRestore } from "@/hooks/utils/useScrollRestore";
import { useAuth } from "@/hooks/auth/useAuth";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import Error from "../Error/Error";
import Loading from "../Loading/Loading";

const Home = () => {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isLoading } =
    useGetAllPosts();
  const { auth } = useAuth();
  const { accessToken } = auth;

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

  useScrollRestore({
    key: "Home_scroll",
  });

  if (error) {
    console.error(error)
    return (
      <Error>
        Error while loading Home page !
      </Error>
    );
  }
  if (isLoading) {
    return (
      <Loading>
        Loading posts...
      </Loading>
    );
  }

  const postData = data.pages.map((item) => item.posts).flat();

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
        className={`grid grid-cols-1 lg:grid-cols-[22rem_auto_22rem]  gap-4  px-4 pt-4 md:mt-[var(--header-height)] ${
          accessToken ? `mt-0` : `mt-[var(--header-height)`
        }`}
      >
        {/* {isPending ? null : console.log("data in home =====> ", data)} */}
        <div className=" bg-bg-shade md:block hidden">Sidebar</div>

        <div>
          <ArticleSection ref={lastElement} postData={postData} />
          {isFetching && <div>Fetching more data...</div>}
        </div>

        <div className=" bg-bg-shade md:block hidden">Ads</div>
         <ScrollToTop />
      </MainLayout>
    </>
  );
};

export default Home;
