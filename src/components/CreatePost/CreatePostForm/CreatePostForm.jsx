import { Header } from "./Header";
import { PostContent } from "./PostContent";

import { Button } from "../../Button/Button";
import { getLocalStorageItem } from "../../../utils/browser";
import { format } from "date-fns";
import { useUploadCloud } from "../../../hooks/cloud/useUploadCloud";
import { useCreatePostContext } from "../../../hooks/posts/useCreatePostContext";
import {
  localPost,
  localPostTitle,
  localPostTitleImg,
} from "../../../utils/constants";

export const CreatePostForm = () => {
  const { postTitleRef, postContentRef, postTitleImg } = useCreatePostContext();
  const { uploadFile, isPending, data } = useUploadCloud();

  const uploadImg = () => {
    const formData = new FormData();
    formData.append("file", postTitleImg);
    uploadFile(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImg();

    const titleImg = getLocalStorageItem(localPostTitleImg);

    // uploadImg(titleImg);

    const title = getLocalStorageItem(localPostTitle);
    const content = getLocalStorageItem(localPost);

    const createdAt = format(new Date(), "yyyy-MM-dd");

    const formData = {
      title,
      content,
      titleImg,
      createdAt,
    };
    console.log("form data ==> ", formData);
  };
  return (
    <form
      className="flex flex-col h-screen md:h-[650px]"
      onSubmit={handleSubmit}
    >
      <Header ref={postTitleRef} />
      <PostContent ref={postContentRef} />
      <div>
        <Button className="border mt-4">Create post</Button>
      </div>
    </form>
  );
};
