import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { Footer } from "../../components/common/Footer/Footer";
import { useState } from "react";
import { useGetAllPosts } from "../../hooks/posts/useGetAllPosts";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Article = ({ postData }) => {
  return (
    <>
      <article className="w-full flex flex-col gap-3  dark:bg-[#212020] bg-[#efefef] p-2 rounded-md backdrop-blur-sm">
        <header>
          <h3 className="font-bold text-lg">{postData.userName}</h3>
          <span>{format(postData.created_at, "yyyy-MM-dd")}</span>
        </header>
        <main className="ml-2">
          <Link to={`/posts/${postData.userId}/${postData.postId}`}>
            {postData.imgURL ? (
              <img
                src={postData.imgURL}
                alt="post img"
                className="max-h-[10rem]"
              />
            ) : null}
            <h3 className="font-bold text-2xl p-3">{postData.title}</h3>
          </Link>
        </main>
      </article>
    </>
  );
};

export const ArticleSection = () => {
  const [skip, setSkip] = useState(0);
  const { data, isPending, isError } = useGetAllPosts({ offset: skip });

  const handleScroll = (e) => {
    const { offsetHeight, scrollTop, scrollHeight } = e.target;
    console.log("scroll");
    console.log("offsetHeight  ===> ", offsetHeight);
    console.log("scrollTop  ===> ", scrollTop);
    console.log("scrollHeight  ===> ", scrollHeight);

    if (offsetHeight + scrollTop > scrollHeight) {
      console.log("reached bottom");

      setSkip((prev) => prev + 2);
    }
  };

  if (isError) {
    return <p>Error while Loading posts</p>;
  }

  return (
    <div
      className="article_list flex flex-col gap-4 p-4"
      onScroll={handleScroll}
    >
      {isPending ? (
        <LoadingWithText>Loading posts ...</LoadingWithText>
      ) : (
        JSON.parse(data.posts).map((post) => (
          <Article postData={post} key={post.postId} />
        ))
      )}
    </div>
  );
};

export const Home = () => {
  return (
    <>
      <MainLayout
        className={`grid grid-cols-1 lg:grid-cols-[22rem_auto_22rem]  gap-2`}
      >
        {/* {isPending ? null : console.log("data in home =====> ", data)} */}
        <div className=" dark:bg-[#212020] bg-[#efefef]">Sidebar</div>
        <div className="p-4">
          Feed
          <ArticleSection />
        </div>
        <div className=" dark:bg-[#212020] bg-[#efefef]">Ads</div>
      </MainLayout>
      <Footer />
    </>
  );
};
