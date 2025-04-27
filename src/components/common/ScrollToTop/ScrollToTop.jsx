import { Button } from "@/components/ui/button";
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
    <Button
      className={`fixed bottom-[20px] right-[20px] bg-bg-shade text-white border-none rounded-full cursor-pointer hover:text-black w-[45px] h-[45px] flex justify-center`}
      onClick={scrollToTop}
    >
      <FaChevronUp />
    </Button>
  ) : null;
};

export default ScrollToTop;
