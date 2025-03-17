import hljs from "highlight.js";
import React, { useEffect } from "react";
import ReactMarkdown from "react-markdown";

//IMP need to be an seperate component and only render if there is data i.e., children otherwise higlighting does not work
//properly.

export const MarkDown = ({ children }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <ReactMarkdown className="markdown min-w-full prose prose-strong:text-text-primary prose-em:text-text-primary prose-li:text-text-primary prose-a:text-text-primary prose-p:text-text-primary prose-headings:text-text-primary">
      {children}
    </ReactMarkdown>
  );
};
