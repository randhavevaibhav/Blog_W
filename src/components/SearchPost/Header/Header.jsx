import React from "react";
import { SortSearchResult } from "./SortSearchResult/SortSearchResult";

const Header = ({handleSearchSort}) => {
  return (
    <>
      <header className="flex items-center w-fit ml-auto pt-2">
        <SortSearchResult handleSearchSort={handleSearchSort} />
      </header>
    </>
  );
};

export default Header;
