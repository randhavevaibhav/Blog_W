import { createContext, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";
import ld from "lodash"
export const PostContext = createContext(null);

const setLocalPostData = ({ newPostData }) => {
 
  setLocalStorageItem("PostData", newPostData);
};

export const PostContextProvider = ({ children }) => {

const localPostData = getLocalStorageItem("PostData");

const [postData, setPostData] = useState(localPostData?localPostData:{
    title:"",
    content:"",
    imgFile:"",
    imgURL:""
  });

  const changePostTitle = ({ title }) => {
    const newPostData = {

      ...ld.cloneDeep(postData),
      title,
    };

    setLocalPostData({ newPostData });

    setPostData(newPostData);
  };

  const changePostContent = ({ content }) => {
    const newPostData = {
      ...ld.cloneDeep(postData),
      content,
    };
    setLocalPostData({ newPostData });
    setPostData(newPostData);
  };

  const changePostImg = ({ img }) => {
    const newPostData = {
      ...ld.cloneDeep(postData),
      ...ld.cloneDeep(img),
    };

    setLocalPostData({ newPostData });
    setPostData(newPostData);
  };

  return (
    <PostContext.Provider
      value={{
        postData,
        changePostTitle,
        changePostContent,
        changePostImg,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
