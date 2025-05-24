import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsScrollTopVisible(true);
    } else {
      setIsScrollTopVisible(false);
    }
  };

  const [isScrollTopVisible, setIsScrollTopVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);
  return isScrollTopVisible ? (
    <button
      className={`fixed bottom-[40px] right-[12px] bg-bg-shade text-text-primary border border-text-primary rounded-full cursor-pointer w-[45px] h-[45px] flex items-center justify-center transition-none`}
      onClick={scrollToTop}
    >
      <FaChevronUp />
    </button>
  ) : null;
};

export default ScrollToTop;
