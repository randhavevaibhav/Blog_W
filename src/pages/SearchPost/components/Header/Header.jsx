import React from "react";
import { useSearchParams } from "react-router-dom";

const Header = ({totalPosts}) => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") ? searchParams.get("query") : "";
  
  return (
    <>
      <header
        className="flex lg:justify-between lg:flex-row flex-col"
        data-test={"search-post-header"}
      >
        <h2 className="font-semibold text-2xl">{`Search result for "${query}" (${totalPosts})`}</h2>
      </header>
    </>
  );
};

export default Header;
