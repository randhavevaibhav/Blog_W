import { createContext, useState, useRef } from "react";

export const CreatePostContext = createContext(null);

export const CreatePostProvider = ({ children }) => {
  const postContentRef = useRef(null);
  const postTitleRef = useRef(null);
  const [postTitleImg, setPostTitleImg] = useState(null);

  const markDownTipsRef = useRef(null);

  return (
    <CreatePostContext.Provider
      value={{
        postContentRef,
        postTitleRef,
        markDownTipsRef,
        postTitleImg,
        setPostTitleImg,
      }}
    >
      {children}
    </CreatePostContext.Provider>
  );
};
