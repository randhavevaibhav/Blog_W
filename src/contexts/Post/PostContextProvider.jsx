import { createContext, useRef } from "react";
import {
  getLocalPostData,
  
} from "../../utils/browser";

export const PostContext = createContext(null);


export const PostContextProvider = ({ children }) => {
  const postDataRef = useRef(getLocalPostData());

  return (
    <PostContext.Provider
      value={{
        postDataRef,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
