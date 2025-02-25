import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import "../../../assets/styles/code-dark.css";
import { useEffect } from "react";
import { getLocalStorageItem } from "../../../utils/browser";

import "./Preview.css";
import { useCreatePostContext } from "../../../hooks/posts/useCreatePostContext";
import { localPostTitle, localPostTitleImg } from "../../../utils/constants";

export const Preview = ({}) => {
  const { postContentRef } = useCreatePostContext();
  let postContent = "";
  if (postContentRef.current) {
    postContent = postContentRef.current.value;
  }
  useEffect(() => {
    hljs.highlightAll();
  }, []);

  let title = getLocalStorageItem(localPostTitle);
  let img = getLocalStorageItem(localPostTitleImg);

  return (
    <>
      <main>
        {img ? <img src={img} alt="title img" /> : null}
        {title ? (
          <h1 className="font-bold text-6xl tracking-wide">{title}</h1>
        ) : null}

        <ReactMarkdown className="markdown prose prose-strong:text-text-primary prose-pre:text-text-primary prose-code:text-text-primary prose-headings:text-text-primary prose-em:text-text-primary prose-li:text-text-primary prose-a:text-text-primary prose-p:text-text-primary ">
          {postContent}
        </ReactMarkdown>
      </main>
    </>
  );
};
