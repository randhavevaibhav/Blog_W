import { Post } from "./Post/Post";
import { Header } from "./Header/Header";

export const PostContainer = ({ data = null }) => {
  const formatPosts = (posts) => {
    const formattedPosts = JSON.parse(posts);
    return formattedPosts;
  };

  return (
    <div className="post_container overflow-auto overflow-x-hidden">
      <Header />

      {data ? (
        formatPosts(data).map((post) => {
          return <Post postData={post} key={post.id} />;
        })
      ) : (
        <p>No posts.</p>
      )}
    </div>
  );
};
