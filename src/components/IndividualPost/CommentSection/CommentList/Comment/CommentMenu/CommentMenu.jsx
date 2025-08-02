import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { forwardRef } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";


const CommentMenuItem = forwardRef((props,ref) => {
  const { name, path,className,...rest} =  props;
  const navigate = useNavigate();
  const defaultClasses = `rounded-md w-full  cursor-pointer md:focus:text-white px-4 py-2 font-semibold`;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <DropdownMenuItem
      className={overrideClasses}
      onClick={() => navigate(path)}
      {...rest}
      ref={ref}
    >
      <span className="text-fs_base capitalize w-full">{name}</span>
    </DropdownMenuItem>
  );
})

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
  const editPostCommentPagePath = `/comment/edit/${commentId}/${content}/${postUserId}/${postId}`;

  const commentMenuList = [
    {
      name: "Delete",
      action: "delete",
      path: deletePostPagePath,
      classNames:`md:focus:bg-red-500`,
      dataTest:'delete-cmt-button'
    },
    {
      name: "Edit",
      action: "edit",
      path: editPostCommentPagePath,
      classNames:`md:focus:bg-action-color`,
      dataTest:'edit-cmt-button'
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:border-none focus:outline-none p-2" data-test={`comment-menu-trigger`} id='comment-menu-trigger'>
        <HiDotsHorizontal className={`cursor-pointer`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="right"
        className="flex flex-col gap-3 md:mb-0 mb-4 min-w-[240px] w-max p-2 rounded-md"
        sideOffset={20}
      >
        {commentMenuList.map((item) => {
          return (
            <CommentMenuItem name={item.name} path={item.path} key={uuidv4()} className={item.classNames} data-test={item.dataTest}/>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
