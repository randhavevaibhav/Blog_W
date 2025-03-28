import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/browser";
import { forwardRef } from "react";

export const Article = forwardRef(({ postData }, ref) => {
  return (
    <>
      <article
        className="w-full flex flex-col gap-3  bg-bg-shade p-2 rounded-md backdrop-blur-sm"
        ref={ref}
      >
        <header>
          <h3 className=" uppercase">{postData.first_name}</h3>
          <span>{format(postData.created_at, "yyyy-MM-dd")}</span>
        </header>
        <main className=" ml-2 p-2">
          <Link
            to={`/post/${postData.user_id}/${postData.post_id}`}
            className="flex flex-col gap-2"
          >
            <h3 className="font-bold text-2xl">{postData.title}</h3>
            <div className="reactions flex">
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
