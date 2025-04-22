import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/utils";
import { forwardRef } from "react";
import { BsFillPersonFill } from "react-icons/bs";

export const Article = forwardRef(({ postData }, ref) => {
  return (
    <>
      <article
        className="w-full flex flex-col gap-1  bg-bg-shade p-2 rounded-md backdrop-blur-sm"
        ref={ref}
      >
        <header className="text-sm flex items-center">
          {!postData.profile_img_url ? (
            <BsFillPersonFill size={"40px"} className="mr-2" />
          ) : (
            <div className="w-[40px] mr-2">
              <img
                src={postData.profile_img_url}
                alt={`user profile image`}
                className="object-cover aspect-square w-full rounded-full"
              />
            </div>
          )}
          <h3 className="capitalize mr-2">{postData.first_name}</h3>
          <span className="text-gray-300">
            {format(postData.created_at, "yyyy-MM-dd")}
          </span>
        </header>
        <main className=" ml-2 p-2">
          <Link
            to={`/post/${postData.user_id}/${postData.post_id}`}
            className="flex flex-col gap-2"
          >
            <h3 className="font-bold md:text-2xl text-lg">{postData.title}</h3>
            <div className="reactions flex items-center">
              <div className={`flex items-center gap-1`}>
                <FaRegHeart />
                <span>{formatNumber(postData.likes)}</span>
              </div>

              <div className={`flex items-center gap-1`}>
                <AiOutlineMessage className="ml-2" />
                <span>
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
