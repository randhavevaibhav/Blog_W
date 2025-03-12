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
            <h3 className="font-bold text-lg">{postData.first_name}</h3>
            <span>{format(postData.created_at, "yyyy-MM-dd")}</span>
          </header>
          <main className="ml-2">
            <Link to={`/posts/${postData.user_id}/${postData.post_id}`}>
              {postData.title_img_url ? (
                <img
                  src={postData.title_img_url}
                  alt="post img"
                  className="max-h-[10rem]"
                />
              ) : null}
              <h3 className="font-bold text-2xl p-3">{postData.title}</h3>
                <div className="reactions flex">
                <div className={`flex items-center gap-1`}>
                      <FaRegHeart className="ml-2" />
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
  