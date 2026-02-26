import React, { memo } from "react";

export const BookmarksHeader = memo(({ totalBookmarks }) => {
  return (
    <header className="flex gap-2 font-semibold">
      <h2 className="text-2xl capitalize" data-test={`bookmark-header`}>
        Bookmarks&nbsp;
        <span className="text-fs_2xl">(&nbsp;{`${totalBookmarks}`}&nbsp;)</span>
      </h2>
    </header>
  );
});
