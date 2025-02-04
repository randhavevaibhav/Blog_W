import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import "../../assets/styles/code-dark.css";
import { useContext, useEffect } from "react";
import { getLocalStorageItem } from "../../utils/browser";
import { CreatePostContext } from "./CreatePost";

export const Preview = ({  }) => {
   const {postContentRef } = useContext(CreatePostContext);
   let postContent = ""
   if(postContentRef.current)
   {
     postContent = postContentRef.current.value;
   }
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  let loacalPostTitle = getLocalStorageItem("localPostTitle");
    if (!loacalPostTitle) {
      loacalPostTitle = "";
    }
  

  return (
    <>
      <main>
        <h1 className="font-bold text-6xl tracking-wide">
                {loacalPostTitle}
        </h1>
        <ReactMarkdown className="markdown prose">{postContent}</ReactMarkdown>
      </main>
    </>
  );
};
