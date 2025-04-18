import hljs from "highlight.js";
import React, { forwardRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { lazy } from "react";
import { Suspense } from "react";
import { getLocalStorageItem } from "../../../utils/browser";
import { localSelectedTheme } from "../../../utils/constants";
import remarkGfm from 'remark-gfm';
//IMP need to be an seperate component and only render if there is data i.e., children otherwise higlighting does not work
//properly.

const DarkCodeTheme = lazy(() => import("../Themes/DarkCodeTheme"));
const LightCodeTheme = lazy(() => import("../Themes/LightCodeTheme"));
const selectedTheme = getLocalStorageItem(localSelectedTheme) || "dark";

const isDarkTheme = selectedTheme === "dark";
export const MarkDown = forwardRef(({ children }, ref) => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <>
      <Suspense fallback={() => null}></Suspense>
      {isDarkTheme ? <DarkCodeTheme /> : <LightCodeTheme />}
      <div ref={ref}>
        <ReactMarkdown className={`markdown min-w-full prose
        prose-code:sm:text-[14px]
        prose-code:text-[10px]
        prose-pre:p-0
        prose-pre:border-2
        prose-pre:my-4
        prose-strong:text-text-primary 
        prose-em:text-text-primary 
        prose-li:text-text-primary 
        prose-a:text-text-primary
        prose-headings:text-text-primary
        prose-headings:font-medium
        prose-headings:mx-0 
        prose-headings:my-4
        prose-hr:my-6
        prose-p:text-text-primary
        prose-p:mx-0 
        prose-p:my-2
        md:prose-p:text-lg
        prose-p:tracking-[-0.003em]
        prose-p:text-base
        prose-table:border
        prose-table:border-separate
        prose-table:rounded-lg
        prose-th:bg-bg-shade
        prose-th:border
        prose-th:text-center 
        prose-th:text-lg 
        prose-th:font-semibold 
        prose-th:border-gray-300 
        prose-td:text-text-primary 
        prose-td:border  
         prose-td:text-center 
        prose-td:border-gray-300
        `} remarkPlugins={[remarkGfm]}>
          {children}
        </ReactMarkdown>
      </div>
    </>
  );
});
