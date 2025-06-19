import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";


export const CommentMenu = ({ openDeleteCmtModal }) => {
  const [isCmtMenuOpen, setIsCmtMenuOpen] = useState(false);
  
  const cmtMenuRef = useRef(null);
  const handleCmtMenu = () => {
    setIsCmtMenuOpen((prev) => !prev);
  };

  const handleClickOutside = () => {
    if (cmtMenuRef.current && !cmtMenuRef.current.contains(event.target)) {
      setIsCmtMenuOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="comment_menu" ref={cmtMenuRef}>
      <button onClick={handleCmtMenu}>
        <BsThreeDots size={"2ch"} />
      </button>
      {isCmtMenuOpen ? (
        <div className="comment_action_menu flex flex-col gap-2 absolute top-6 right-0 w-[8rem] bg-bg-shade p-2 rounded-md hover:bg-red-500 font-semibold tracking-wide hover:text-white text-sm">
          <a
            href="#"
            onClick={() => {
              openDeleteCmtModal();
              setIsCmtMenuOpen(false);
            }}
          >
            Delete
          </a>
        </div>
      ) : null}
    </div>
  );
};
