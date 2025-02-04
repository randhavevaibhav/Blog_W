import { Post } from "./Post/Post";
import { Header } from "./Header/Header";

export const PostContainer = () => {
  return (
    <div className="post_container ">
      <Header />
      <Post />
    </div>
  );
};
