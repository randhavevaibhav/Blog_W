import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "../../../../utils/browser";
import { localPost } from "../../../../utils/constants";
import { Button } from "../../../Button/Button";

export const PostContent = ({showMarkDownTips,hideMarkdownTips}) => {
  const handlePostContentChange = (val) => {
    setLocalStorageItem(localPost, val);
  };

  return (
    <div className=" post_content  md:px-16 md:py-6 px-4 py-2 h-full">
      <div className="flex gap-2 helpers mb-4">
        <Button type="button" className={`font-bold`}>B</Button>
        <Button type="button" className={`font-bold italic`}>I</Button>
        <Button type="button" >A</Button>
        <Button type="button">A</Button>
      </div>
      <textarea
        name="post_content"
        id="post_content"
        placeholder="New post content here..."
        className="w-full min-h-[10rem]  bg-bg-primary outline-none"
        onClick={showMarkDownTips}
        onBlur={hideMarkdownTips}
        defaultValue={getLocalStorageItem(localPost)}
        onChange={(e) => handlePostContentChange(e.target.value)}
      ></textarea>
    </div>
  );
};
