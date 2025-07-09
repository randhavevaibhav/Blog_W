import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

const defaultClasses = `w-full flex h-28 rounded-md border border-input bg-bg-primary px-3 py-2 text-base shadow-sm transition-colors  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-color disabled:cursor-not-allowed disabled:opacity-50 md:text-sm`;

export const Textarea = forwardRef((props, ref) => {
  const { className, ...rest } = props;

  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <textarea className={`${overrideClasses}`} ref={ref} {...rest}></textarea>
  );
});
