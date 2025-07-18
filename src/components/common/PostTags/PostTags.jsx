import { Button } from "@/components/ui/button";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import React, { forwardRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
const defaultClasses = `flex flex-wrap `;

export const PostTags = forwardRef((props, ref) => {
  const { tagList, className, ...rest } = props;

  const overrideClasses = twMerge(defaultClasses, className);
  if (!tagList || tagList.length <= 0) {
    return <div></div>;
  }

  const navigate = useNavigate();
  const { preFetchAllTaggedPosts } = usePrefetch();
  const { hashtagName } = useParams();

  return (
    <ul className={overrideClasses} ref={ref} {...rest}>
      {tagList.map((hashtag) => (
        <li
          key={uuidv4()}
          className={`flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent  hover:border-tag-bg-hover duration-200`}
          style={{ "--tag-bg-hover": hashtag.color }}
        >
          <Button
            variant={`ghost`}
            className={`gap-1 hover:bg-inherit p-0  cursor-pointer h-7`}
            type={"button"}
            onClick={(e) => {
              e.stopPropagation();
              if (hashtagName) {
                if (hashtagName === hashtag.name) {
                  return;
                }
              }
              navigate(`/tag/${hashtag.id}/${hashtag.name}`);
            }}
            onMouseOver={() => {
              preFetchAllTaggedPosts({
                hashtagId: hashtag.id,
              });
            }}
          >
            <span
              style={{ color: hashtag.color }}
              className="font-semibold text-fs_lg"
            >
              #
            </span>
            {hashtag.name}
          </Button>
        </li>
      ))}
    </ul>
  );
});
