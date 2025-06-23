import React, { useRef } from "react";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const SearchPostForm = () => {
  const searchInputRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchInputRef.current || searchInputRef.current.value === "") {
      toast.error("please provide some value for search !");
      return;
    }
    navigate(`/search?q=${searchInputRef.current.value}`);
   
  };
  return (
    <form className="flex-1 mx-4 max-w-[680px]" onSubmit={handleSubmit}>
      {" "}
      <Input
        type="text"
        placeholder="search"
        className="md:h-10"
        ref={searchInputRef}
       
      />
    </form>
  );
};
