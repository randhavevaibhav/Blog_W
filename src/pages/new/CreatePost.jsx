import { createContext, useRef, useState } from "react";
import { MainLayout } from "../../comonents/MainLayout/MainLayout";

import { CreatePostForm } from "./CreatePostForm/CreatePostForm";

import { Button } from "../../comonents/Button/Button";
import { Preview } from "./Preview";
import { MarkDownTips } from "./MarkDownTips/MarkDownTips";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";


export const CreatePostContext = createContext(null)

export const CreatePost = () => {


  let localPostContent = getLocalStorageItem("localPost");

  if(!localPostContent)
  {
    localPostContent=""
  }

  const [markDown, setMarkDown] = useState(localPostContent);

  const [showPreview, setShowPreview] = useState(false);
  const postContentRef = useRef(null);
  const postTitleRef = useRef(null);

  const [focusPostContent,setFocusPostContent] = useState(false);


  const handleShowPreview = ()=>{
    setShowPreview((tg) => !tg);
    const postContent = postContentRef.current.value;
    const postTitle = postTitleRef.current.value;
    setMarkDown(postContent);
    setLocalStorageItem("localPostTitle",postTitle)
    setLocalStorageItem("localPost",postContent)

    console.log("postContentRef value ===> ", postContent);
  }

  return (
    <MainLayout>
      <CreatePostContext.Provider value={{focusPostContent,setFocusPostContent}}>
      <div className="grid md:grid-cols-[64px_7fr_3fr] grid-cols-1 mt-20 grid-rows-[min-content_1fr_min-content]">
        {/* dummy div */}
        <div className="dummy"></div>
        {/* post form */}
        <div>
          <Button
            onClick={() => {
              handleShowPreview()
            }}
          >
            {`${showPreview ? "Edit" : "Show Preview"}`}
          </Button>
          {showPreview ? (
            <Preview markdown={markDown} />
          ) : (
            <CreatePostForm postContentRef={postContentRef} postTitleRef={postTitleRef}/>
          )}
        </div>
        <div className="p-1">
        { focusPostContent&&<MarkDownTips/>}
    
        </div>
      
      </div>

      </CreatePostContext.Provider>
   
    </MainLayout>
  );
};
