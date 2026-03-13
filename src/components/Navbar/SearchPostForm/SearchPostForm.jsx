import React, { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { FaSearch } from "react-icons/fa";
import { SearchSuggestions } from "./SearchSuggestions/SearchSuggestions";
import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { twMerge } from "tailwind-merge";
import { debounce } from "@/utils/utils";
import { getPostPageLink, getSearchedPostsPageLink } from "@/utils/getLinks";
import { useQueryClient } from "@tanstack/react-query";

const defaultClasses =
  "block flex-1 mx-4 max-w-[680px] md:min-w-[680px] relative";

export const SearchPostForm = ({ className = "" }) => {
  const searchInputRef = useRef(null);
  const overrideClasses = twMerge(defaultClasses, className);
  const [searchQuery, setSearchQuery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [debounceQueryTimer, setDebounceQueryTimer] = useState(null);
  const queryClient = useQueryClient();

  const suggestionRef = useRef(null);
  useOutsideClick(suggestionRef, () => {
    setSearchQuery(null);
  });

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(null);
    clearTimeout(debounceQueryTimer);
    if (activeIndex > -1) {
      return;
    } else {
      if (!searchInputRef.current || searchInputRef.current.value === "") {
        toast.error("please provide some value for search !");
        return;
      }
      const query = searchInputRef.current.value;
      navigate(
        getSearchedPostsPageLink({
          query,
        }),
      );
      searchInputRef.current.value = "";
    }
  };

  const handleSetSearchQuery = (val) => {
    const sanitizeQuery = encodeURIComponent(val);
    setSearchQuery(sanitizeQuery);
  };

 const debouncedHandleSetSearchQuery = useCallback(
    debounce({ cb: handleSetSearchQuery }),
    [],
  );

 const handleSearchInputChange = (e) => {
    setActiveIndex(-1);
    const searchInputVal = e.target.value;
    const timer = debouncedHandleSetSearchQuery(searchInputVal);
    setDebounceQueryTimer(timer);
  };

  const handleSearchSelectionByArrowKeys = (activeIndex) => {
    const getSuggestionQueryKey = ["getSearchSuggestions", searchQuery];
    const suggestions = queryClient.getQueryData(getSuggestionQueryKey);
    if (!suggestions) return;

    const posts = suggestions.posts;
    const totalPosts = suggestions.posts.length;
    if (totalPosts <= 0) return;
    const selectedPost = posts[activeIndex];

    if (!selectedPost||(activeIndex==null||activeIndex==undefined)) {
      navigate(
        getSearchedPostsPageLink({
          query: searchQuery,
        }),
      );
    } else {
      navigate(
        getPostPageLink({
          postId: selectedPost.postId,
        }),
      );
    }
    setSearchQuery(null);
  };

  return (
    <>
      <div className={`${overrideClasses}`}>
        <form onSubmit={handleSubmit}>
          <FaSearch
            className="absolute left-0 top-2 ml-2 cursor-pointer"
            size={"22px"}
            onClick={handleSubmit}
            data-test={"search-post-btn"}
          />
          <Input
            type="text"
            placeholder="search posts"
            className="md:h-11 pl-10 border-[1.3px] border-card-border w-full md:mt-0 mt-[4rem] md:text-fs_lg"
            ref={searchInputRef}
            onChange={handleSearchInputChange}
            data-test={"search-post-input"}
          />

          {searchQuery ? (
            <SearchSuggestions
              searchQuery={searchQuery}
              ref={suggestionRef}
              activeIndex={activeIndex}
              handleSearchSelectionByArrowKeys={handleSearchSelectionByArrowKeys}
            />
          ) : null}
        </form>
      </div>
    </>
  );
};
