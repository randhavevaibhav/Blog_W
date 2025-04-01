
import { Button } from "../../../common/Button/Button";
import { getLocalPostInfo } from "../utils";

export const PostContent = ({ showMarkDownTips, hideMarkdownTips,mode }) => {

  const {content,setLocalContent} = getLocalPostInfo(mode);
  const handlePostContentChange = (val) => {
    // setLocalStorageItem(localPost, val);
    setLocalContent(val)
  };
  const isEditMode = mode==="EDIT";
  return (
    <div className=" post_content h-full mb-10">
      <div className="flex gap-2 helpers mb-4">
        <Button type="button" className={`font-bold`}>
          B
        </Button>
        <Button type="button" className={`font-bold italic`}>
          I
        </Button>
        <Button type="button">A</Button>
        <Button type="button">A</Button>
      </div>
      <textarea
        name="post_content"
        id="post_content"
        placeholder={isEditMode?`Edit post content here...`:`New post content here...`}
        className="w-full min-h-[26rem]  bg-bg-primary  border-bg-shade border-2 outline-none p-4 rounded-md"
        onClick={showMarkDownTips}
        onBlur={hideMarkdownTips}
        defaultValue={content}
        onChange={(e) => handlePostContentChange(e.target.value)}
      ></textarea>
    </div>
  );
};
