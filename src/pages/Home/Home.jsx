import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import SEO from "@/components/common/SEO/SEO";
import { useAuth } from "@/hooks/auth/useAuth";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";
import { DiscoverPosts } from "./Discover/DiscoverPosts";
import { FollowingPosts } from "@/pages/Home/Following/FollowingPosts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useScrollRestore } from "@/hooks/utils/useScrollRestore";
import { getLocalStorageItem, setLocalStorageItem } from "@/utils/browser";
import { TagListCard } from "@/components/Home/TagListCard/TagListCard";
import { TopRatedPosts } from "@/components/Home/TopRatedPosts/TopRatedPosts";

const Home = () => {
  const { auth } = useAuth();
  const { accessToken } = auth;
  const selectedUserFeed = getLocalStorageItem("selectedUserFeed")
    ? getLocalStorageItem("selectedUserFeed")
    : "Discover";
  const [homepageFeed, setHomePageFeed] = useState(
    accessToken ? selectedUserFeed : "Discover"
  );

  useScrollRestore({
    key: "Home_scroll",
  });

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
        className={`grid grid-cols-1 lg:grid-cols-[16rem_auto_26rem]  gap-4  px-4 pt-4 md:mt-[var(--header-height)] ${
          accessToken ? `mt-0` : `mt-[var(--header-height)`
        }`}
      >
        <div className="md:block hidden">
          <TagListCard/>
        </div>
        <div>
          {accessToken ? (
            <div className="mb-4 flex gap-4">
              <Button
                onClick={() => {
                  setLocalStorageItem("selectedUserFeed", "Discover");
                  setHomePageFeed("Discover");
                }}
                className={`font-semibold`}
                variant={selectedUserFeed === `Discover` ? `action` : `ghost`}
                data-test={`discover-posts-page-btn`}
                size={`lg`}
              >
                Discover
              </Button>
              <Button
                onClick={() => {
                  setLocalStorageItem("selectedUserFeed", "Following");
                  setHomePageFeed("Following");
                }}
                className={`font-semibold`}
                variant={selectedUserFeed === `Following` ? `action` : `ghost`}
                data-test={`following-posts-page-btn`}
                size={`lg`}
              >
                Following
              </Button>
            </div>
          ) : null}
          {homepageFeed === "Discover" ? <DiscoverPosts /> : <FollowingPosts />}
        </div>

        <div className="md:block hidden">
          <TopRatedPosts/>
        </div>
        <ScrollToTop />
      </MainLayout>
    </>
  );
};

export default Home;
