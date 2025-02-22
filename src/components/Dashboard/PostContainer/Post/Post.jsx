import { Actions } from "../Actions/Actions";
import { Reactions } from "../Reactions/Reactions";
import { format } from "date-fns";
import "./Post.css";
export const Post = ({postData}) => {
  return (
    <div className="ind_post    gap-2 p-4 items-center dark:bg-[#212020] bg-[#efefef]  rounded-md mt-3 mb-6">
      <div className="post_title">
        <h3 className="text-lg">{postData.title}</h3>
        <span className="text-sm text-gray-400">Published: {format(new Date(postData.created_at),"yyyy-MM-dd")}</span>
      </div>
      <Reactions />
      <Actions />
    
    </div>
  );
};
