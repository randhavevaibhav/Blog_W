import React, { useCallback, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { FaSearch } from "react-icons/fa";
import { SearchSuggestions } from "./SearchSuggestions/SearchSuggestions";
import useOutsideClick from "@/hooks/utils/useOutsideClick";

const debounce = ({ cb = () => {}, delay = 1000 }) => {
  let timer = null;

  return (...args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

export const SearchPostForm = () => {
  const searchInputRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState(null);

    const suggestionRef = useRef(null);
   useOutsideClick(suggestionRef,()=>{
      setSearchQuery(null)
   })
  
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(null)
   
    if (!searchInputRef.current || searchInputRef.current.value === "") {
      toast.error("please provide some value for search !");
      return;
    }
     const sanitizeQuery = `${searchInputRef.current.value}`.replace(/[^a-zA-Z0-9\s]/g, '')
    navigate(`/search?q=${sanitizeQuery}`);
    searchInputRef.current.value = "";
  };

  const handleSetSearchQuery = (val) => {
    const sanitizeQuery = `${val}`.replace(/[^a-zA-Z0-9\s]/g, '')
    setSearchQuery(sanitizeQuery);
  };

  const debouncedHandleSetSearchQuery = useCallback(
    debounce({ cb: handleSetSearchQuery }),
    []
  );

  const handleSearchInputChange = (e) => {
    const searchInputVal = e.target.value;
     debouncedHandleSetSearchQuery(searchInputVal);
  
  };

 
  return (
    <>
      <form
        className="flex-1 mx-4 max-w-[680px] relative"
        onSubmit={handleSubmit}
      >
     
         <FaSearch className="absolute left-0 top-2 ml-2 cursor-pointer" size={'22px'} onClick={handleSubmit}/>
        <Input
          type="text"
          placeholder="search posts"
          className="md:h-10 pl-10"
          ref={searchInputRef}
          onChange={handleSearchInputChange}
        />
    
        {searchQuery ? <SearchSuggestions searchQuery={searchQuery} ref={suggestionRef}/> : null}
      </form>
    </>
  );
};
