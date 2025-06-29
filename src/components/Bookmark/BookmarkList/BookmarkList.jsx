import React from "react";
import { Article } from "./Article/Article";
import { v4 as uuidv4 } from "uuid";
import { BookmarksHeader } from "./BookmarksHeader/BookmarksHeader";
export const BookmarkList = ({ bookmarks, totalBookmarks }) => {
  return (
    <>
      <div className="flex flex-col article_list gap-4 overflow-auto mx-auto max-w-[50rem]">
        <BookmarksHeader totalBookmarks={totalBookmarks} />
        {bookmarks.map((post) => {
          return <Article postData={post} key={uuidv4()} />;
        })}
      </div>
    </>
  );
};
