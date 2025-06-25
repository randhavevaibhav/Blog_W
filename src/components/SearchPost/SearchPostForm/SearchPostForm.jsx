import React, { useCallback, useRef, useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "../../ui/input";
import { CiSearch } from "react-icons/ci";
import { SearchSuggestions } from "./SearchSuggestions/SearchSuggestions";
import useOutsideClick from "@/hooks/utils/useOutsideClick";
import { twMerge } from "tailwind-merge";

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
const defaultClasses ="block flex-1 mx-4 max-w-[680px] relative"
export const SearchPostForm = ({className=""}) => {
  const searchInputRef = useRef(null);
 const overrideClasses = twMerge(defaultClasses, className);
  const [searchQuery, setSearchQuery] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);

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

  //   const handleKeyDown = (event) => {
  //   if (event.key === 'ArrowUp') {
  //     event.preventDefault();
  //    console.log("ArrowUp")
  //       setActiveIndex((prevIndex) =>
  //       prevIndex === 0 ? 5 - 1 : prevIndex - 1
  //     );
  //   } else if (event.key === 'ArrowDown') {
  //     event.preventDefault();
  //   console.log("ArrowDown")
  //     setActiveIndex((prevIndex) =>
  //       prevIndex === 5 - 1 ? 0 : prevIndex + 1
  //     );
  //   }
  // };

  
 
  return (
    <>
   <div  className={`${overrideClasses}`}>
       <form
       
        onSubmit={handleSubmit}
      >
     
         <CiSearch className="absolute left-0 top-2 ml-2 cursor-pointer" size={'22px'} onClick={handleSubmit}/>
        <Input
          type="text"
          placeholder="search posts"
          className="md:h-10 pl-10 border shadow border-card-border"
          ref={searchInputRef}
          onChange={handleSearchInputChange}
          // onKeyDown={handleKeyDown}
        />
    
        {searchQuery ? <SearchSuggestions searchQuery={searchQuery} ref={suggestionRef}/> : null}
      </form>
   </div>
    </>
  );
};
