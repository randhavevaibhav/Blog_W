import { usePostContext } from "../../../../hooks/posts/usePostContext";
import {  getLocalStorageItem, saveLocalPostData } from "../../../../utils/browser";
export const Header = ({ mode }) => {
  const { postDataRef } =
    usePostContext();
  const handlePostTitleChange = (e) => {
    const titleVal = e.target.value;
    saveLocalPostData({
      title:titleVal
    })
  };

  const isEditMode = mode === "EDIT";

  const titleRef = postDataRef.current.title;
  let title = "";
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
        className="w-full text-4xl bg-bg-primary  border-bg-shade border-2 outline-none font-bold p-2"
        defaultValue={title}
        onChange={handlePostTitleChange}
        ref={(el) => (postDataRef.current.title = el)}
      ></textarea>
    </header>
  );
};
