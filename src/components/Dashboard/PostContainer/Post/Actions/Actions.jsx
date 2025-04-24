import { Link } from "react-router-dom";

import { setLocalStorageItem } from "../../../../../utils/browser";
import { FaTrash } from "react-icons/fa";
import { IoCreate } from "react-icons/io5";

export const Actions = ({
  handlePostDeleteAction,
  postTitle,
  postId,
  userId,
  postContent,
  postImgURL,
}) => {
  const handlePostEdit = () => {
    setLocalStorageItem("PostData", {
      title: postTitle,
      content: postContent,
      imgURL: postImgURL,
      isEditPostData:true
    });
  };
  return (
    <div className="flex actions gap-2 justify-self-end">
      <div>
        <a
          href="#"
          className="px-2 py-1 dark:hover:text-[#ffffff]  flex items-center gap-1 dark:text-gray-300 duration-300 "
          onClick={() => handlePostDeleteAction(postTitle, postId)}
        >
          <FaTrash className="text-[14px]"/>
          Delete
        </a>
      </div>
      <div>
        <Link
          to={`/edit/${userId}/${postId}`}
          onClick={handlePostEdit}
          className="px-2 py-1 dark:hover:text-[#ffffff]  flex items-center gap-1 dark:text-gray-300 duration-300 "
        >
           <IoCreate />
          Edit

        </Link>
      </div>
    </div>
  );
};
