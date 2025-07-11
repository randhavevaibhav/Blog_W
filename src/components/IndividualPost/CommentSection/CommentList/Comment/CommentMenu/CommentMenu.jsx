import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const CommentMenuItem = ({ name, path }) => {
  const navigate = useNavigate();
  return (
    <DropdownMenuItem
      className={`rounded-md w-full md:focus:bg-action-color cursor-pointer md:focus:text-white px-4 py-2 font-semibold`}
      onClick={() => navigate(path)}
    >
      <span className="text-fs_base capitalize w-full">{name}</span>
    </DropdownMenuItem>
  );
};

export const CommentMenu = ({
  commentId,
  postId,
  postUserId,
  hasReplies,
  content,
}) => {

  const deletePostPagePath = `/comment/delete/${commentId}/${postId}/${postUserId}/${Number(
    hasReplies
  )}`;
  const editPostCommentPagePath = `/comment/edit/${commentId}/${postId}/${content}`;

  const commentMenuList = [
    {
      name: "Delete",
      action: "delete",
      path: deletePostPagePath,
    },
    {
      name: "Edit",
      action: "edit",
      path: editPostCommentPagePath,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:border-none focus:outline-none p-2">
        <HiDotsHorizontal className={`cursor-pointer`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="flex flex-col gap-3 md:mb-0 mb-4 min-w-[240px] w-max p-2 rounded-md"
        sideOffset={20}
      >
        {commentMenuList.map((item) => {
          return (
            <CommentMenuItem name={item.name} path={item.path} key={uuidv4()} />
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
