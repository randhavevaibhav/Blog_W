import { useState } from "react";
import { useGetAllPosts } from "../../../hooks/posts/useGetAllPosts";
import { Article } from "../Article/Article";
import { LoadingWithText } from "../../common/LoadingWithText/LoadingWithText";
import { ErrorText } from "../../common/ErrorText/ErrorText";

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
    //   console.log("reached bottom");

      setSkip((prev) => prev + 2);
    }
  };

  if (isError) {
    return <ErrorText>Error while Loading posts</ErrorText>;
  }

  return (
    <div
      className="article_list flex flex-col gap-4 p-4"
     
    >
      {isPending ? (
        <LoadingWithText>Loading posts ...</LoadingWithText>
      ) : (
        JSON.parse(data.posts).map((post) => (
          <Article postData={post} key={post.post_id} />
        ))
      )}
    </div>
  );
};