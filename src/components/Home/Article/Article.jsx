import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/utils";
import { forwardRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { UserAvatar } from "../../common/UserAvatar/UserAvatar";

export const Article = forwardRef(({ postData }, ref) => {
  return (
    <>
      <article
        className="w-full flex flex-col gap-1  bg-bg-shade p-2 rounded-md backdrop-blur-sm"
        ref={ref}
      >
        <header className="text-sm flex items-center">
         
          <UserAvatar userProfileImg={postData.profile_img_url}/>
          <span className=" font-medium text-fs_base capitalize mr-2">{postData.first_name}</span>
          <span className="text-fs_small text-gray-300">
            {format(postData.created_at, "yyyy-MM-dd")}
          </span>
        </header>
        <main className="ml-2 p-2">
          <Link
            to={`/post/${postData.user_id}/${postData.post_id}`}
            className="flex flex-col gap-2"
          >
            <h3 className="font-medium text-fs_2xl">{postData.title}</h3>
            <div className="reactions flex items-center">
              <div className={`flex items-center gap-1`}>
                <FaRegHeart />
                <span className="text-fs_small">{formatNumber(postData.likes)}</span>
              </div>

              <div className={`flex items-center gap-1`}>
                <AiOutlineMessage className="ml-2" />
                <span className="text-fs_small">
                  {formatNumber(
                    postData.total_comments ? postData.total_comments : 0
                  )}
                </span>
              </div>
            </div>
          </Link>
        </main>
      </article>
    </>
  );
});
