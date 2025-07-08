import { MainLayout } from "../../components/common/MainLayout/MainLayout";

import SEO from "@/components/common/SEO/SEO";

import { useAuth } from "@/hooks/auth/useAuth";
import ScrollToTop from "@/components/common/ScrollToTop/ScrollToTop";

import { DiscoverPosts } from "../../components/Home/Discover/DiscoverPosts";
import { FollowingPosts } from "@/components/Home/Following/FollowingPosts";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useScrollRestore } from "@/hooks/utils/useScrollRestore";

const Home = () => {
  const { auth } = useAuth();
  const { accessToken } = auth;

  const [homepageFeed,setHomePageFeed] = useState("Discover");
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
        className={`grid grid-cols-1 lg:grid-cols-[22rem_auto_22rem]  gap-4  px-4 pt-4 md:mt-[var(--header-height)] ${
          accessToken ? `mt-0` : `mt-[var(--header-height)`
        }`}
      >
        <div className=" bg-bg-shade md:block hidden">Sidebar</div>
        <div>
          {accessToken?<div className="md:my-8 my-4 flex gap-4">
            <Button onClick={()=>{
              setHomePageFeed("Discover")
            }}
            variant={homepageFeed===`Discover`?`action`:`ghost`}
            >Discover</Button>
            <Button onClick={()=>{
              setHomePageFeed("Following")
            }}  variant={homepageFeed===`Following`?`action`:`ghost`}>Following</Button>
          </div>:null}
          {homepageFeed==="Discover"?<DiscoverPosts />:<FollowingPosts/>}
        </div>

        {/* <FollowingPosts/> */}
        <div className=" bg-bg-shade md:block hidden">Ads</div>
        <ScrollToTop />
      </MainLayout>
    </>
  );
};

export default Home;
