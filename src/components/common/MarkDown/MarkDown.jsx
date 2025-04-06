import hljs from "highlight.js";
import React, { forwardRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { lazy } from "react";
import { Suspense } from "react";
import { getLocalStorageItem } from "../../../utils/browser";
import { localSelectedTheme } from "../../../utils/constants";
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
        <ReactMarkdown className="markdown min-w-full prose prose-strong:text-text-primary prose-em:text-text-primary prose-li:text-text-primary prose-a:text-text-primary prose-p:text-text-primary prose-headings:text-text-primary">
          {children}
        </ReactMarkdown>
      </div>
    </>
  );
});
