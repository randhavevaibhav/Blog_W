import { usePostContext } from "../../../../hooks/posts/usePostContext";
import {
  getLocalStorageItem,
  saveLocalPostData,
} from "../../../../utils/browser";
export const PostHeading = ({ mode }) => {
  const { postDataRef } = usePostContext();
  const handlePostTitleChange = (e) => {
    const titleVal = e.target.value;
    saveLocalPostData({
      title: titleVal,
    });
  };

  const isEditMode = mode === "EDIT";

  const titleRef = postDataRef.current.title;
  let title = "";
  // If local data is present pick from local otherwise get it from Ref
  if (getLocalStorageItem("PostData")) {
    const localPostTitle = getLocalStorageItem("PostData").title;
    title = localPostTitle;
  } else if (titleRef && titleRef.value) {
    title = titleRef.value;
  }

  return (
    <header className="post title ">
      <textarea
        name="post title"
        id="title"
        placeholder={isEditMode ? `Edit post title` : `New post title here...`}
        className="w-full text-4xl bg-bg-shade  border-card-border border-2 outline-none font-bold p-2 rounded-lg"
        defaultValue={title}
        onChange={handlePostTitleChange}
        ref={(el) => (postDataRef.current.title = el)}
        data-test={`post-title-text-area`}
      ></textarea>
    </header>
  );
};
