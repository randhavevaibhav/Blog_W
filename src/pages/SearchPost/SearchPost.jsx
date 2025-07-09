import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { SearchResults } from "@/components/SearchPost/SearchResults/SearchResults";
import React, { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/SearchPost/Header/Header";

const SearchPost = () => {
  const [searchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState("desc");
  const query = searchParams.get("q");

  const handleSearchSort = ({ type = "desc" }) => {
    switch (type) {
      case "desc":
        setSortBy("desc");
        return;
      case "asc":
        setSortBy("asc");
        return;
      default:
        throw new Error("Wrong value for search sort");
    }
  };
  const memeoisedHandleSearchSort = useCallback(handleSearchSort, []);

  return (
    <MainLayout className={` px-4 mb-0 md:mt-[var(--header-height)] mt-0`}>
      <div className="max-w-[50rem] mx-auto mb-6">
        <Header handleSearchSort={memeoisedHandleSearchSort} sortBy={sortBy} />
        <SearchResults query={query} sortBy={sortBy} />
      </div>
    </MainLayout>
  );
};

export default SearchPost;
