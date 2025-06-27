import { MainLayout } from "@/components/common/MainLayout/MainLayout";

import { BookmarkList } from "@/components/Bookmark/BookmarkList/BookmarkList";
import { useCallback, useState } from "react";
import { SortBookmarks } from "@/components/Bookmark/SortBookmarks/SortBookmarks";

export const Bookmark = () => {
  const [sortBy, setSortBy] = useState("desc");
  const [sortMenu, setShowSortMenu] = useState(true);

  const handleSortByChange = ({ option }) => {
    setSortBy(option);
  };

  const handleShowSortMenu = ({ showSortMenu }) => {
    setShowSortMenu(showSortMenu);
  };
  const memosiedHandleSortByChange = useCallback(handleSortByChange, []);

  return (
    <>
      <MainLayout className={` md:mx-auto max-w-[1380px] mb-0 p-4`}>
        <div className="">
          <div>
            {sortMenu ? (
              <SortBookmarks handleSortByChange={memosiedHandleSortByChange} />
            ) : null}
          </div>

          <BookmarkList
            sortBy={sortBy}
            handleShowSortMenu={handleShowSortMenu}
          />
        </div>
      </MainLayout>
    </>
  );
};
