import ReactMarkdown from "react-markdown";
import hljs from "highlight.js";
import "../../assets/styles/code-dark.css";
import { useEffect } from "react";
import { getLocalStorageItem } from "../../utils/browser";

export const Preview = ({ markdown }) => {
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
        <ReactMarkdown className="markdown prose">{markdown}</ReactMarkdown>
      </main>
    </>
  );
};
