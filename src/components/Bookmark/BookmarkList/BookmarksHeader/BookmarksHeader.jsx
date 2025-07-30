import React, { memo } from "react";

export const BookmarksHeader = memo(({ totalBookmarks }) => {
  return (
    <header className="flex items-center gap-2">
      <h2 className="text-fs_3xl capitalize font-extrabold " data-test={`bookmark-header`}>
        Bookmarks&nbsp;
        <span className="text-fs_2xl font-extrabold">
          (&nbsp;{`${totalBookmarks}`}&nbsp;)
        </span>
      </h2>
    </header>
  );
});
