import { Button } from "@/components/ui/button";
import { usePrefetch } from "@/hooks/prefetch/usePrefetch";
import { usePrefetchOnHover } from "@/hooks/utils/usePrefetchOnHover";
import { getTaggedPostsPageLink } from "@/utils/getLinks";
import React, { forwardRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { v4 as uuidv4 } from "uuid";
const defaultClasses = `flex flex-wrap `;

const PostTagListItem = ({ id, color, name, hashtagName }) => {
  const { preFetchAllTaggedPosts } = usePrefetch();
  const navigate = useNavigate();
  const { onMouseEnter, onMouseLeave } = usePrefetchOnHover({
    prefFetchQueryFn: () => {
      preFetchAllTaggedPosts({
        hashtagId: id,
        hashtagName: name,
      });
    },
  });
  return (
    <li
      className={`flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent  hover:border-tag-bg-hover duration-200`}
      style={{ "--tag-bg-hover": color }}
      data-test={`hashtag-list-element`}
      data-value={name}
    >
      <Button
        variant={`ghost`}
        className={`gap-1 hover:bg-inherit p-0  cursor-pointer h-7 w-full justify-start`}
        type={"button"}
        onClick={(e) => {
          e.stopPropagation();
          if (hashtagName) {
            if (hashtagName === name) {
              return;
            }
          }
          navigate(
            getTaggedPostsPageLink({
              hashtagId: id,
              hashtagName: name,
              hashtagColor:color
            }),
          );
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span style={{ color: color }} className="font-semibold text-fs_lg">
          #
        </span>
        {name}
      </Button>
    </li>
  );
};

export const PostTags = forwardRef((props, ref) => {
  const { tagList, className, ...rest } = props;

  const overrideClasses = twMerge(defaultClasses, className);
  if (!tagList || tagList.length <= 0) {
    return <div></div>;
  }

  const { hashtagName } = useParams();

  return (
    <ul className={overrideClasses} ref={ref} {...rest}>
      {tagList.map((hashtag) => (
        <PostTagListItem
          id={hashtag.id}
          name={hashtag.name}
          color={hashtag.color}
          hashtagName={hashtagName}
          key={uuidv4()}
        />
      ))}
    </ul>
  );
});
