import { Button } from "@/components/ui/button";
import { TagListItem } from "../TagListItem";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/utils/useOutsideClick";

export const TagSelect = ({ hashtags = [] }) => {
  const [open, setOpen] = useState();
  const tagListRef = useRef(null);
  const toggleButtonRef = useRef(null);

  useOutsideClick(tagListRef, (event) => {
    const clickOnToggleButton =
      toggleButtonRef.current && toggleButtonRef.current.contains(event.target);
    if (!clickOnToggleButton) {
      setOpen(false);
    }
  });

  return (
    <div className="relative lg:hidden block">
      <Button
        variant={"ghost"}
        ref={toggleButtonRef}
        className={` border`}
        onClick={() => {
          setOpen((prev) => !prev);
        }}
      >
        Filter by tag
      </Button>
      {open ? (
        <ul
          className="absolute bg-background border min-w-40 p-2 top-10 rounded max-h-64 overflow-auto"
          ref={tagListRef}
        >
          {hashtags.map((tag, idx) => {
            return (
              <li value={tag.name} key={`${tag.id}_${idx}`}>
                <TagListItem id={tag.id} name={tag.name} color={tag.color} />
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
