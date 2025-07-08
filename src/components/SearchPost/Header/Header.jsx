import React from "react";
import { SortSearchResult } from "./SortSearchResult/SortSearchResult";

const Header = ({handleSearchSort,sortBy}) => {
  return (
    <>
      <header className="flex items-center w-fit ml-auto pt-2">
        <SortSearchResult handleSearchSort={handleSearchSort} sortBy={sortBy}/>
      </header>
    </>
  );
};

export default Header;
