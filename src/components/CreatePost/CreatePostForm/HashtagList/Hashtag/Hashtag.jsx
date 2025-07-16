import React, { memo, useState } from "react";

export const Hashtag = memo(
  ({ id, name, color, handleHashtagSelect, isActive, resetActiveIndx }) => {
    const [hoverActive, setHoverActive] = useState(false);
    return (
      <span
        className={`cursor-pointer ${
          isActive || hoverActive ? `bg-bg-shade-hover` : ``
        } p-2 pb-1 rounded-md`}
        onMouseMove={() => {
          resetActiveIndx();
          setHoverActive(true);
        }}
        onClick={() => {
          handleHashtagSelect({
            hashtag: {
              id,
              name,
              color,
            },
          });
        }}
       
        onMouseLeave={() => {
          setHoverActive(false);
        }}
      >
        <span style={{ color }}>#&nbsp;&nbsp;</span>
        {name}
      </span>
    );
  }
);
