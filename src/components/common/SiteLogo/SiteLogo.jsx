import { getHomePageLink } from "@/utils/getLinks";
import React, { forwardRef } from "react";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
const defaultClasses = `logo ml-4 px-4 py-2 cursor-pointer`;
const SiteLogo =forwardRef( (props,ref) => {
  const {cb,className,...rest} = props;
  const overrideClasses = twMerge(defaultClasses, className);
  return (
    <Link
      to={getHomePageLink()}
      onClick={cb}
      aria-label="Home"
      className={overrideClasses}
      {...rest}
      ref={ref}
      data-test={`site-logo`}
    >
      <FaBlog size={30} />
    </Link>
  );
})

export default SiteLogo;
