import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      // Show button if user is ~40% down the page and when page height is greater than 3000
      if (scrollTop > pageHeight * 0.4 - windowHeight && pageHeight > 3000) {
        setIsVisible(true);
        if (timer) clearTimeout(timer);
        const newTimer = setTimeout(() => {
          setIsVisible(false);
        }, 4000);
        setTimer(newTimer);
      } else {
        setIsVisible(false);
        if (timer) clearTimeout(timer);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return isVisible ? (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-16 right-6 z-50 p-3 size-12 rounded-full  text-white shadow-lg transition duration-300 ease-in-out"
      aria-label="Scroll to top"
      variant={`action`}
    >
      <FaArrowUp size={20} />
    </Button>
  ) : null;
};

export default ScrollToTop;
