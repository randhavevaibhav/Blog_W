import { format } from "date-fns";
import { AiOutlineMessage } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatNumber } from "../../../utils/browser";

export const Article = ({ postData }) => {
  return (
    <>
      <article className="w-full flex flex-col gap-3  dark:bg-[#212020] bg-[#efefef] p-2 rounded-md backdrop-blur-sm">
        <header>
          <h3 className=" uppercase">{postData.first_name}</h3>
          <span>{format(postData.created_at, "yyyy-MM-dd")}</span>
        </header>
        <main className=" ml-2 p-2">
          <Link
            to={`/posts/${postData.user_id}/${postData.post_id}`}
            className="flex flex-col gap-2"
          >
            <h3 className="font-bold text-2xl">{postData.title}</h3>
            <div className="reactions flex">
              <div className={`flex items-center gap-1`}>
                <FaRegHeart    />
                <span>{formatNumber(postData.likes)}</span>
              </div>

              <div className={`flex items-center gap-1`}>
                <AiOutlineMessage className="ml-2" />
                <span>{formatNumber(postData.total_comments)}</span>
              </div>
            </div>
          </Link>
        </main>
      </article>
    </>
  );
};
