import { MainLayout } from "@/components/common/MainLayout/MainLayout";
import { SearchResults } from "@/components/SearchPost/SearchResults/SearchResults";
import React from "react";

const SearchPost = () => {
  return (
    <MainLayout className={` px-4 mb-0 md:mt-[var(--header-height)] mt-0 py-4`}>
      <SearchResults />
    </MainLayout>
  );
};

export default SearchPost;
