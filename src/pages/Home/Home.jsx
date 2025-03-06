import { MainLayout } from "../../components/common/MainLayout/MainLayout";
import { Footer } from "../../components/common/Footer/Footer";
import { useEffect, useState } from "react";
import { useGetAllPosts } from "../../hooks/posts/useGetAllPosts";
import { LoadingWithText } from "../../components/common/LoadingWithText/LoadingWithText";
import { format } from "date-fns";
import { Link } from "react-router-dom";

const Article = ({ postData }) => {
  return (
    <>
      <article className="w-full flex flex-col gap-3 border border-gray-200 border-opacity-60 p-2 rounded-md backdrop-blur-sm">
        <header>
          <h3 className="font-bold text-lg">{postData.userName}</h3>
          <span>{format(postData.created_at, "yyyy-MM-dd")}</span>
        </header>
        <main className="ml-2">
          <Link to={`/posts/${postData.userId}/${postData.postId}`}>
            <h3 className="font-bold text-2xl">{postData.title}</h3>
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
    // console.log("scroll");
    // console.log("offsetHeight  ===> ", offsetHeight);
    // console.log("scrollTop  ===> ", scrollTop);
    // console.log("scrollHeight  ===> ", scrollHeight);

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
      className="article_list flex flex-col gap-4 max-w-[40rem] max-h-[30rem] p-4 border border-white overflow-auto"
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
        className={`border border-white grid grid-cols-1 md:grid-cols-[22rem_1fr]  gap-2`}
      >
        {/* {isPending ? null : console.log("data in home =====> ", data)} */}
        <div className="border border-white">Sidebar</div>
        <div className="p-4">
          Feed
          <ArticleSection />
        </div>
      </MainLayout>
      <Footer />
    </>
  );
};
