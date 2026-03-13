import { useEffect, useState } from "react";

export const useKeyBoardListNav = ({
  listLength = 0,
  onEnterKeyPress = () => {},
}) => {
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const reset = () => {
    setActiveIndex(() => -1);
  };

  const handleKeyDown = (event) => {
    if (listLength < 0) {
      return;
    }

    switch (event.key) {
      case "ArrowUp":
        {
          event.preventDefault();
          handleArrowUpKeyPress();
        }
        break;
      case "ArrowDown":
        {
          event.preventDefault();
          handleArrowDownKeyPress();
        }
        break;
      case "Escape":
        {
          event.preventDefault();
          setActiveIndex(-1);
        }
        break;
      case "Enter":
        {
          event.preventDefault();
          handleEnterKeyPress();
        }
        break;

      default: {
        return;
      }
    }
  };

  const handleEnterKeyPress = () => {
    onEnterKeyPress(activeIndex);
  };

  const handleArrowUpKeyPress = () => {
    setActiveIndex((prevIndex) => {
      const activeIndex = prevIndex <= 0 ? listLength - 1 : prevIndex - 1;
      scrollActiveItemInView({ activeIndex });
      return activeIndex;
    });
  };

  const handleArrowDownKeyPress = () => {
    setActiveIndex((prevIndex) => {
      const activeIndex =
        prevIndex === listLength - 1 || prevIndex > listLength
          ? 0
          : prevIndex + 1;
      scrollActiveItemInView({ activeIndex });
      return activeIndex;
    });
  };

  const scrollActiveItemInView = ({ activeIndex }) => {
    const element = document.querySelector(`[item-id="item_${activeIndex}"]`);
    if (!element) return;
    element.scrollIntoView();
  };

  return {
    handleKeyDown,
    reset,
    activeIndex,
  };
};
