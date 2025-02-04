import { Actions } from "../Actions/Actions";
import { Reactions } from "../Reactions/Reactions";
import "./Post.css";
export const Post = () => {
  return (
    <div className="ind_post    gap-2 p-4 items-center dark:bg-[#212020] bg-[#efefef]  rounded-md mt-3 mb-6">
      <div className="post_title">
        <h3 className="text-lg">Post title</h3>
        <span className="text-sm text-gray-400">Published: 3 Feb 2024</span>
      </div>
      <Reactions />
      <Actions />
    
    </div>
  );
};
