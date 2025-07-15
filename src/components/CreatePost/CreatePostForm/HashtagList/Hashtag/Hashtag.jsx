import React, { memo } from "react";

export const Hashtag = memo(({ id, name, color, handleHashtagSelect }) => {
  return (
    <span
      className="cursor-pointer"
      onClick={() => {
        handleHashtagSelect({
          hashtag: {
            id,
            name,
            color
          },
        });
      }}
    >
      <span style={{ color }}>#&nbsp;&nbsp;</span>
      {name}
    </span>
  );
});
