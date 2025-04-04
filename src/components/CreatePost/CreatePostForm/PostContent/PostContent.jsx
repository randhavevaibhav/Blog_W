import { useState } from "react";
import { usePostContext } from "../../../../hooks/posts/usePostContext";

import { Button } from "../../../common/Button/Button";
import { createPortal } from "react-dom";
import { MarkDownTips } from "../../../CreatePost/MarkDownTips/MarkDownTips";
import { getLocalStorageItem } from "../../../../utils/browser";
export const PostContent = ({  mode }) => {
  const { postDataRef,saveContentLocal } = usePostContext();

  const [showMarkDownTips, setShowMarkDownTips] = useState(false);

  const handlePostContentChange = () => {
    //context
    saveContentLocal()
  };
  const isEditMode = mode === "EDIT";

  const contentRef= postDataRef.current.content;
  let content = ""
  if(getLocalStorageItem("PostData"))
  {
    const localPostContent = getLocalStorageItem("PostData").content;
    content = localPostContent;
  }else if(contentRef &&contentRef.value)
  {
    content = contentRef.value;
  }
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
        placeholder={
          isEditMode ? `Edit post content here...` : `New post content here...`
        }
        className="w-full min-h-[26rem]  bg-bg-primary  border-bg-shade border-2 outline-none p-4 rounded-md"
        onClick={()=>setShowMarkDownTips(true)}
        onBlur={()=>setShowMarkDownTips(false)}
        defaultValue={content}
         onChange={() => handlePostContentChange()}
        ref={(el)=>postDataRef.current.content=el}
      ></textarea>
      {showMarkDownTips?createPortal(<MarkDownTips/>,document.getElementById("post_form_grid")):null}
    </div>

    
  );
};
