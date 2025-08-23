import { Button } from "@/components/ui/button";
import { forwardRef, useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = forwardRef((props, targetElementRef) => {
  const [isVisible, setIsVisible] = useState(false);
  const [timer, setTimer] = useState(null);
  useEffect(() => {
    const targetElement = targetElementRef?.current
      ? targetElementRef.current
      : window;

    const toggleVisibility = () => {
      if (!targetElement) {
        return;
      }
      const scrollTop = targetElement.scrollY
        ? targetElement.scrollY
        : targetElement.scrollTop;
      const totalScrollHeight = targetElement.scrollHeight
        ? targetElement.scrollHeight
        : document.documentElement.scrollHeight;

      const percentScroll = Math.floor((scrollTop / totalScrollHeight) * 100);

      //scroll to top when reaching 40%
      if (percentScroll > 40) {
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

    targetElement.addEventListener("scroll", toggleVisibility);
    return () => {
      targetElement.removeEventListener("scroll", toggleVisibility);
      if (timer) clearTimeout(timer);
    };
  }, [timer]);

  const scrollToTop = () => {
    const targetElement = targetElementRef?.current
      ? targetElementRef.current
      : window;
    targetElement.scrollTo({ top: 0, behavior: "smooth" });
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
});

export default ScrollToTop;
