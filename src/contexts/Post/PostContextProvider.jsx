import { createContext, useRef } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "../../utils/browser";

export const PostContext = createContext(null);

const setLocalPostData = ({ newPostData }) => {
  setLocalStorageItem("PostData", newPostData);
};

export const PostContextProvider = ({ children }) => {
  const localPostData = getLocalStorageItem("PostData");

  const postDataRef = useRef(
    localPostData
      ? localPostData
      : {
          title: "",
          content: "",
          imgFile: "",
          imgURL: "",
        }
  );

  const saveTitleLocal = () => {
    const title = postDataRef.current.title.value;

    const oldPostData = getLocalStorageItem("PostData");

    const newPostData = {
      ...(oldPostData ? oldPostData : {}),
      title,
    };
    setLocalPostData({ newPostData });
  };

  const saveContentLocal = () => {
    const content = postDataRef.current.content.value;

    const oldPostData = getLocalStorageItem("PostData");

    const newPostData = {
      ...(oldPostData ? oldPostData : {}),
      content,
    };
    setLocalPostData({ newPostData });
  };
  const saveImgLocal = ({ imgFileObj }) => {
    const imgURL = postDataRef.current.imgURL;

    const oldPostData = getLocalStorageItem("PostData");

    const newPostData = {
      ...(oldPostData ? oldPostData : {}),
      imgURL,
      imgFileObj,
    };
    setLocalPostData({ newPostData });
  };


  const clearLocalImg = ()=>{
    const imgURL = "";
    const imgFileObj = "";
    const oldPostData = getLocalStorageItem("PostData");
    const newPostData = {
      ...(oldPostData ? oldPostData : {}),
      imgURL,
      imgFileObj
    };
    setLocalPostData({ newPostData });
  }
  return (
    <PostContext.Provider
      value={{
        postDataRef,
        saveTitleLocal,
        saveContentLocal,
        saveImgLocal,
        clearLocalImg
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
