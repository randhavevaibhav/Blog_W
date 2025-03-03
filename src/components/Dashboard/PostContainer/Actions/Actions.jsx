import { Link } from "react-router-dom";
import { getLocalPostInfo } from "../../../CreatePost/CreatePostForm/utils";

export const Actions = ({ handlePostDeleteAction, postTitle,postId,postContent,postImgURL }) => {
  const {setLocalTitle,setLocalContent,setLocalImgURL} =getLocalPostInfo("EDIT");

  const handlePostEdit =()=>{
    setLocalTitle(postTitle);
    setLocalContent(postContent);
    setLocalImgURL(postImgURL);
  }
  return (
    <div className="flex actions justify-self-end">
      <div>
        <a
          href="#"
          className="p-1"
          onClick={() => handlePostDeleteAction(postTitle,postId)}
        >
          Delete
        </a>
      </div>
      <div>
        <Link to={`/edit/${postId}`} onClick={handlePostEdit} className="p-1">
          Edit
        </Link>
      </div>
    </div>
  );
};
