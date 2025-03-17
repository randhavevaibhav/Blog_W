import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { DeleteCmtModal } from "./DeleteCmtModal";
import { createPortal } from "react-dom";

export const CommentMenu = ({ handleDeleteCmt, isDeleteCmtPending }) => {
  const [isCmtMenuOpen, setIsCmtMenuOpen] = useState(false);
  const [isDeleteCmtModalOpen, setIsDeleteCmtModalOpen] = useState(false);
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
        <div className="comment_action_menu flex flex-col gap-2 absolute top-6 right-0 w-[8rem] dark:bg-[#212020] bg-[#efefef] p-2 rounded-md hover:bg-red-500 font-semibold tracking-wide hover:text-white text-sm">
          <a
            href="#"
            onClick={() => {
              setIsDeleteCmtModalOpen(true);
              setIsCmtMenuOpen(false);
            }}
          >
            Delete
          </a>
        </div>
      ) : null}

      {createPortal(
        <DeleteCmtModal
          isDeleteCmtModalOpen={isDeleteCmtModalOpen}
          handleDeleteCmt={handleDeleteCmt}
          closeDeleteCmtModal={() => setIsDeleteCmtModalOpen(false)}
          isDeleteCmtPending={isDeleteCmtPending}
        />,
        document.body
      )}
    </div>
  );
};
