import hljs from "highlight.js";
import React, { forwardRef, memo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "../../../assets/styles/github-dark.css";
import remarkGfm from "remark-gfm";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
//IMP MarkDown need to be an separate component and only render if there is data i.e., children otherwise highlighting does not work
//properly.

const CodeBlock = ({ children, className }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000); // Reset copy state after 2 seconds
  };

  return (
    <div className="code-block-wrapper text-text-primary grid grid-cols-[auto_10px]">
      <code className={className}>{children}</code>
      <div className="flex justify-end bg-code-bg-color pr-2 pt-4">
        <CopyToClipboard text={children} onCopy={handleCopy}>
          <div className="flex items-center gap-2 max-h-[10px]">
            <>
              {isCopied ? (
                <span className="text-fs_small bg-bg-shade py-[0.1rem] rounded-md px-[0.2rem]">
                  Copied !
                </span>
              ) : null}
              {isCopied ? (
                <FaCheckSquare
                  className={`text-[#0ca50c] md:size-[16px] size-[14px]`}
                />
              ) : (
                <FaRegCopy
                  className={`cursor-pointer md:size-[16px] size-[14px]`}
                />
              )}
            </>
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export const MarkDown = memo(
  forwardRef(({ children }, ref) => {
    useEffect(() => {
      document.querySelectorAll("pre code").forEach((block) => {
        if (block.hasAttribute("data-highlighted")) {
        } else {
          hljs.highlightAll();
        }
      });
    }, []);
    return (
      <>
        <div ref={ref}>
          <ReactMarkdown
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = (className || "").match(/language-(\w+)/);

                return !inline && match ? (
                  <CodeBlock
                    language={match[1]}
                    {...props}
                    className={className}
                  >
                    {String(children).replace(/\n$/, "")}
                  </CodeBlock>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              table: ({ node, inline, className, children, ...props }) => {
                return (
                  <div className="w-full !overflow-x-scroll">
                    <table className={`${className} w-[800px]`} {...props}>
                      {children}
                    </table>
                  </div>
                );
              },
            }}
            //    prose-p:text-justify
            // prose-p:break-all
            // prose-p:indent-6
            className={`markdown min-w-full prose
        prose-code:!bg-code-bg-color
        prose-code:sm:text-[14px]
        prose-code:!text-code-txt-color
        prose-code:text-[12px]
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
        prose-headings:my-2
        prose-hr:my-6
        prose-h1:text-fs_5xl
        prose-h2:text-fs_3xl
        prose-h3:text-fs_2xl
        prose-h4:text-fs_xl
        prose-h5:text-fs_xl
        prose-p:text-text-primary
        prose-p:hyphens-auto
        prose-p:text-fs_xl
        prose-p:break-all
        prose-p:mx-0
        prose-p:ml-1
        prose-p:my-2
        prose-table:border
        prose-table:rounded-lg
        prose-th:bg-bg-shade
        prose-th:border
        prose-th:text-center 
        prose-th:p-2
        prose-th:text-lg 
        prose-th:font-semibold 
        prose-th:border-gray-300 
        prose-td:text-text-primary 
        prose-td:border
        prose-td:p-2 
        prose-td:border-gray-300
        `}
            remarkPlugins={[remarkGfm]}
          >
            {children}
          </ReactMarkdown>
        </div>
      </>
    );
  })
);
