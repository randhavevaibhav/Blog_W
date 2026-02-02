import React from "react";
import { SortSearchResult } from "./SortSearchResult/SortSearchResult";

const Header = ({ handleSearchSort, sortBy, query }) => {
  return (
    <>
      <header className="flex justify-between py-4" data-test={"search-post-header"}>
        <h2 className="font-extrabold text-fs_3xl">{`Search result for "${query}"`}</h2>
        <SortSearchResult handleSearchSort={handleSearchSort} sortBy={sortBy} />
      </header>
    </>
  );
};

export default Header;
