import { Link } from "react-router-dom";

import { setLocalStorageItem } from "../../../../../utils/browser";

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
    <div className="flex actions justify-self-end">
      <div>
        <a
          href="#"
          className="p-1"
          onClick={() => handlePostDeleteAction(postTitle, postId)}
        >
          Delete
        </a>
      </div>
      <div>
        <Link
          to={`/edit/${userId}/${postId}`}
          onClick={handlePostEdit}
          className="p-1"
        >
          Edit
        </Link>
      </div>
    </div>
  );
};
