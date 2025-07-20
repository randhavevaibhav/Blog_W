import React from "react";
import { FaBlog } from "react-icons/fa";
import { Link } from "react-router-dom";

const SiteLogo = ({ cb = () => {} }) => {
  return (
    <Link
      to="/"
      onClick={cb}
      aria-label="Home"
      className="logo ml-4 px-4 py-2 cursor-pointer"
    >
      <FaBlog size={30} />
    </Link>
  );
};

export default SiteLogo;
