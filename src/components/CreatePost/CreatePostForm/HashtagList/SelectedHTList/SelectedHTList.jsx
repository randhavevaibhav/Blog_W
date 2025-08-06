import { Button } from "@/components/ui/button";
import React from "react";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

export const SelectedHTList = ({
  selectedHashtagList,
  handleHashtagRemove,
}) => {
  return (
    <ul className="flex gap-2 mb-4 flex-wrap">
      {selectedHashtagList.map((hashtag, i) => (
        <li
          key={uuidv4()}
          className="flex items-center bg-card-bg hover:bg-card-bg-hover px-2 rounded-md gap-2"
        >
          <Button
            variant={`ghost`}
            className={`gap-1 hover:bg-inherit p-0 cursor-default `}
            type={"button"}
          >
            <span
              style={{ color: hashtag.color }}
              className="font-semibold text-fs_lg"
            >
              #
            </span>
            {hashtag.name}
          </Button>
          <IoClose
            onClick={() => {
              handleHashtagRemove({
                hashtag,
              });
            }}
            className="cursor-pointer"
            size={"20px"}
            data-test={`remove-hashtag-btn`}
          />
        </li>
      ))}
    </ul>
  );
};
