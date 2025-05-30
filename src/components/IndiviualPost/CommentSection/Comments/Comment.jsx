import React, { useState } from "react";
import { useAuth } from "../../../../hooks/auth/useAuth";
import { format } from "date-fns";
import { createPortal } from "react-dom";
import Modal from "@/components/common/Modal/Modal.jsx";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button.jsx";
import { UserAvatar } from "@/components/common/UserAvatar/UserAvatar.jsx";
import { Link } from "react-router-dom";
import { HiDotsHorizontal } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.jsx";

export const Comment = ({
  commentId,
  userName,
  date,
  content,
  userId,
  userProfileImg,
  handleDeleteCmt,
}) => {
  const { auth } = useAuth();
  const [isDeleteCmtModalOpen, setIsDeleteCmtModalOpen] = useState(false);
  const currentUserId = auth.userId;
  const isCmtBelongsToUser = currentUserId === userId;
  return (
    <>
      <div className="flex flex-col gap-4 indiviual_comment w-full border dark:border-gray-50 dark:border-opacity-50 rounded-md pt-2 pb-4 px-2 bg-bg-shade hover:bg-bg-shade-hover">
        <header className="flex justify-between items-center relative">
          <div className="content flex items-center">
            <Link to={`/userprofile/${userId}`}>
              <UserAvatar userProfileImg={userProfileImg} />
            </Link>

            <div>
              <span className="mr-4 font-bold text-lg">{userName}</span>
              <span className="text-fs_small">
                {" "}
                Published: {format(new Date(date), "yyyy-MM-dd")}
              </span>
            </div>
          </div>
          {isCmtBelongsToUser ? (
            // <CommentMenu openDeleteCmtModal={openDeleteCmtModal} />
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:border-none focus:outline-none">
                <HiDotsHorizontal className={`cursor-pointer text-fs_2xl`} />
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="flex flex-col gap-3 md:mb-0 mb-4"
                sideOffset={20}
              >
                <DropdownMenuItem>
                  <Button
                    variant={`ghost`}
                    className={`hover:bg-red-500 w-full`}
                    onClick={() => {
                     setIsDeleteCmtModalOpen(true);
                    }}
                  >
                    Delete
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </header>
        <div className="comment_body">
          <p className="text-fs_base">{content}</p>
        </div>
      </div>

      {createPortal(
        <Modal
          isOpen={isDeleteCmtModalOpen}
          onClose={() => setIsDeleteCmtModalOpen(false)}
        >
          <Modal.Body
            isControlled={true}
            onClose={() => setIsDeleteCmtModalOpen(false)}
          >
            <Modal.Icon>
              <FaTrash className="text-red-500 text-4xl" />
            </Modal.Icon>

            <Modal.Title>
              Are you sure want to delete this comment ?
            </Modal.Title>
            <div className="flex gap-2 justify-center flex-col sm:flex-row  ">
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => handleDeleteCmt({ commentId })}
              >
                Delete
              </Button>
              <Button
                onClick={() => setIsDeleteCmtModalOpen(false)}
                varient="primary"
              >
                Cancel
              </Button>
            </div>
          </Modal.Body>
        </Modal>,
        document.body
      )}
    </>
  );
};
