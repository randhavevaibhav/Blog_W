import { useRef, useCallback } from "react";

export const usePrefetchOnHover = ({ prefFetchQueryFn, delay = 800 }) => {
  const timerRef = useRef(null);

  const onMouseEnter = useCallback(() => {
    // Start a timer when the user hovers
    timerRef.current = setTimeout(() => {
      prefFetchQueryFn();
    }, delay);
  }, [prefFetchQueryFn, delay]);

  const onMouseLeave = useCallback(() => {
    // If the mouse leaves before the delay, cancel the prefetch attempt
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return { onMouseEnter, onMouseLeave };
};
