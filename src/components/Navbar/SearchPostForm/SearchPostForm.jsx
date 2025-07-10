import React, { useCallback, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { CiSearch } from "react-icons/ci";
import { SearchSuggestions } from "./SearchSuggestions/SearchSuggestions";
import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { twMerge } from "tailwind-merge";
import { useQueryClient } from "@tanstack/react-query";
import { debounce } from "@/utils/utils";

const defaultClasses = "block flex-1 mx-4 max-w-[680px] relative";
export const SearchPostForm = ({ className = "" }) => {
  const searchInputRef = useRef(null);
  const overrideClasses = twMerge(defaultClasses, className);
  const [searchQuery, setSearchQuery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [debounceQueryTimer,setDebounceQueryTimer] = useState(null)
  const queryClient = useQueryClient();

  const getSuggestionQueryKey = ["getSearchSuggestions", searchQuery];

  const suggestionRef = useRef(null);
  useOutsideClick(suggestionRef, () => {
    setSearchQuery(null);
  });

  const navigate = useNavigate();

  const handleSearchSelectionByArrowKeys = () => {
    const suggestions = queryClient.getQueryData(getSuggestionQueryKey);
    if (suggestions) {
      const posts = suggestions.posts;
      const totalPosts = suggestions.posts.length;
      if (totalPosts > 0) {
        const selectedPost = posts[activeIndex];
        navigate(`/post/${selectedPost.userId}/${selectedPost.postId}`);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(null);
    clearTimeout(debounceQueryTimer)
    if (activeIndex > -1) {
      handleSearchSelectionByArrowKeys();
      return;
    } else {
      if (!searchInputRef.current || searchInputRef.current.value === "") {
        toast.error("please provide some value for search !");
        return;
      }
      const sanitizeQuery = `${searchInputRef.current.value}`.replace(
        /[^a-zA-Z0-9\s]/g,
        ""
      );
      navigate(`/search?q=${sanitizeQuery}`);
      searchInputRef.current.value = "";
    }
  };

  const handleSetSearchQuery = (val) => {
    const sanitizeQuery = `${val}`.replace(/[^a-zA-Z0-9\s]/g, "");
    setSearchQuery(sanitizeQuery);
  };

  const debouncedHandleSetSearchQuery = useCallback(
    debounce({ cb: handleSetSearchQuery }),
    []
  );

  const handleSearchInputChange = (e) => {
    setActiveIndex(-1);
    const searchInputVal = e.target.value;
    const timer = debouncedHandleSetSearchQuery(searchInputVal);
    setDebounceQueryTimer(timer)
  };

  const handleArrowUpKeyPress = ({ totalPosts }) => {
    setActiveIndex((prevIndex) =>
      prevIndex <= 0 ? totalPosts - 1 : prevIndex - 1
    );
  };

  const handleArrowDownKeyPress = ({ totalPosts }) => {
    setActiveIndex((prevIndex) =>
      prevIndex === totalPosts - 1 ? 0 : prevIndex + 1
    );
  };

  const handleKeyDown = (event) => {
    const suggestions = queryClient.getQueryData(getSuggestionQueryKey);

    if (searchQuery && suggestions) {
      const totalPosts = suggestions.posts.length;
      if (event.key === "ArrowUp" && totalPosts > 0) {
        event.preventDefault();
        handleArrowUpKeyPress({ totalPosts });
      } else if (event.key === "ArrowDown" && totalPosts > 0) {
        event.preventDefault();
        handleArrowDownKeyPress({ totalPosts });
      }
    }
  };

//  console.log("active index ===> ",activeIndex)
  return (
    <>
      <div className={`${overrideClasses}`}>
        <form onSubmit={handleSubmit}>
          <CiSearch
            className="absolute left-0 top-2 ml-2 cursor-pointer"
            size={"22px"}
            onClick={handleSubmit}
          />
          <Input
            type="text"
            placeholder="search posts"
            className="md:h-10 pl-10 border shadow border-card-border"
            ref={searchInputRef}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
          />

          {searchQuery ? (
            <SearchSuggestions
              searchQuery={searchQuery}
              ref={suggestionRef}
              activeIndex={activeIndex}
            />
          ) : null}
        </form>
      </div>
    </>
  );
};
