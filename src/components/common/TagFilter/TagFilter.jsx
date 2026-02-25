import useOutsideClick from "@/hooks/utils/useOutsideClick";
import React, { useRef, useState } from "react";
import { FilterIconLabel } from "../FilterIconLabel/FilterIconLabel";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { v4 as uuid4 } from "uuid";

export const TagFilter = ({
  showIconLabel=true,
  labelColor,
  labelName,
  onTagClick = () => {},
  hashtags,
  onTagMouseEnter = () => {},
  onTagMouseLeave = () => {},
  className="",
  disableFilter=false
}) => {
  const [open, setOpen] = useState(false);

  const tagListRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useOutsideClick(tagListRef, (event) => {
    const clickOnToggleButton =
      toggleButtonRef.current && toggleButtonRef.current.contains(event.target);
    if (!clickOnToggleButton) {
      setOpen(false);
    }
  });

  const handleTagClick = (tag) => {
    setOpen(false);
    onTagClick(tag);
  };

  return (
    <div className={cn("relative z-10",className)}>
      
      <div className="flex gap-2">
       {showIconLabel? <FilterIconLabel />:null}
        <Button
          ref={toggleButtonRef}
          variant={"ghost"}
          className={` border h-8 disabled:cursor-not-allowed`}
          onClick={() => {
            setOpen((prev) => !prev);
          }}
          data-test={"tag-filter-trigger"}
          disabled={disableFilter}
        >
          <div className="flex gap-2">
            <span
              style={{ color: labelColor }}
              className="font-semibold text-fs_lg"
            >
              #
            </span>
            {labelName}
          </div>
        </Button>
      </div>
      <Card
        className={cn(
          { hidden: !open, block: open },
          "bg-card-bg absolute left-0 top-10 border shadow-lg rounded-none rounded-b-md",
        )}
      >
        <ul
          className={
            "max-h-80  overflow-y-scroll scrollbar scrollbar-thumb-card-bg scrollbar-track-bg-primary flex flex-col flex-nowrap p-2 min-w-[12rem]"
          }
          ref={tagListRef}
        >
          {hashtags.map((tag) => {
            return (
              <li
                key={`${uuid4()}_${tag.id}`}
                style={{ "--tag-bg-hover": tag.color }}
                className="flex items-center  md:px-2 px-1 rounded-md gap-2 text-fs_xs border border-transparent hover:border-tag-bg-hover duration-200 cursor-pointer"
                onClick={() => handleTagClick(tag)}
                onMouseEnter={() => onTagMouseEnter(tag)}
                onMouseLeave={onTagMouseLeave}
                data-test={"tag-list-element"}
                data-value={tag.name}
              >
                <div className="flex gap-2 items-center">
                  <span
                    style={{ color: tag.color }}
                    className="font-semibold text-fs_lg"
                  >
                    #
                  </span>
                  {tag.name}
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </div>
  );
};
