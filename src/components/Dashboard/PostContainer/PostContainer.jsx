import { Post } from "./Post/Post";
import { Header } from "./Header/Header";
import { useGetAllPosts } from "../../../hooks/posts/useGetAllPosts";

import { LoadingWithText } from "../../LoadingWithText/LoadingWithText";
import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
export const PostContainer = () => {
  const { data, isPending, error, isError } = useGetAllPosts();

  const formatPosts = (data) => {
    const posts = JSON.parse(data.data.posts);
    return posts;
  };

  useEffect(() => {
    if (isError && !error.response.data.message) {
      toast.error(`Unknow Error occured !!`);
    }
    console.log("Error while fetching posts ==> ", error);
  }, [isError]);

  return (
    <div className="post_container overflow-scroll overflow-x-hidden">
      <Header />

      {isPending && <LoadingWithText>Loading posts ...</LoadingWithText>}

      {isError && error.response.data.message && (
        <p>{error.response.data.message} </p>
      )}

      {data &&
        formatPosts(data).map((post) => {
          return <Post postData={post} key={post.id} />;
        })}

      <Toaster />
    </div>
  );
};
