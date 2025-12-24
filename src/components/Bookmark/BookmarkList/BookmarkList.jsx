import React, { useCallback } from "react";
import { Article } from "./Article/Article";
import { v4 as uuidv4 } from "uuid";
import { throttle } from "@/utils/utils";
import { NotFound } from "@/components/common/NotFound/NotFound";
export const BookmarkList = ({ bookmarks, totalBookmarks }) => {
  const throttlePrefetch = useCallback(
    throttle({ cb: (prefetchFn) => prefetchFn() })
  );
  return (
    <>
      <div className="flex flex-col article_list gap-4 overflow-auto mx-auto max-w-[42rem]">
       
        {totalBookmarks === 0 ? <NotFound /> : null}
        {bookmarks.map((post) => {
          return (
            <Article
              postData={post}
              key={uuidv4()}
              throttlePrefetch={throttlePrefetch}
            />
          );
        })}
      </div>
    </>
  );
};
