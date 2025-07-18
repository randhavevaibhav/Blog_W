import { useEffect } from "react";

const useKeyPress = (keys, callback) => {
  useEffect(() => {
    const keyList = Array.isArray(keys) ? keys : [keys];

    const handleKeyDown = (event) => {
      if (keyList.includes(event.key)) {
        callback?.(event);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [keys, callback]);
};

export default useKeyPress;
