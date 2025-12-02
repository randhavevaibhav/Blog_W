import React, { useState, useEffect } from "react";

import { twMerge } from "tailwind-merge";
import { PlaceholderImg } from "../PlaceholderImg/PlaceholderImg";
const defaultClasses = `object-cover aspect-square w-full`;

export const LazyImage = (props) => {
  // Use the placeholder initially
  const {
    src,
    alt,
    className,
    placeholder = <PlaceholderImg />,
    ...rest
  } = props;
  const [imgSrc, setImgSrc] = useState(null);

  const overrideClasses = twMerge(defaultClasses, className);

  useEffect(() => {
    const img = new Image();
    img.src = src; // Start fetching the high-res image in the background

    img.onload = () => {
      // Once the high-res image is fully loaded, update the state
      setImgSrc(src);
    };

    // Cleanup function for effect
    return () => {
      img.onload = null;
    };
  }, [src]); // Reruns if the main image source changes
  return imgSrc ? (
    <img src={imgSrc} alt={alt} className={overrideClasses} {...rest} />
  ) : (
    placeholder
  );
};
