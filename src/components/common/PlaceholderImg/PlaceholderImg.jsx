import React from "react";
import PlaceholderImgSrc from "../../../assets/placeholder_img.png";
import { twMerge } from "tailwind-merge";
export const PlaceholderImg = ({ className }) => {
  const defaultClasses = "object-cover aspect-square w-full";
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <img
      src={PlaceholderImgSrc}
      alt="default placeholder image"
      className={overrideClasses}
    />
  );
};
