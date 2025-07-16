import { createContext, useRef } from "react";
import {
  getLocalPostData,
  
} from "../../utils/browser";

export const PostContext = createContext(null);


export const PostContextProvider = ({ children }) => {
  const postDataRef = useRef(getLocalPostData());

  const clearRefData =  ()=>{
     if (postDataRef.current) {
        postDataRef.current.imgFile = "";
        postDataRef.current.imgURL = "";
        postDataRef.current.tagList = [];
      }
  }
  return (
    <PostContext.Provider
      value={{
        postDataRef,
        clearRefData
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
