import React from "react";
import { Link } from "react-router-dom";
import formBgImg from "../../../assets/form_bg.jpg";
export const BgImage = () => {
  return (
    <div className="bg_img_container md:block hidden w-1/2 overflow-hidden relative">
      <img
        alt={`form background`}
        src={formBgImg}
        className=" object-cover w-full h-auto rounded-xl"
      />
      <Link
        to={`/signup`}
        className="absolute top-0 right-[120px] bg-transparent px-2 py-1  text-lg tracking-wide font-semibold border-b-2 border-white text-white mr-2"
      >
        Sign up
      </Link>
      <Link
        to={`/signin`}
        className="absolute top-0 right-0 bg-transparent px-2 py-1  mr-8 text-lg tracking-wide font-semibold border-b-2 border-white text-white"
      >
        Sign in
      </Link>
    </div>
  );
};
