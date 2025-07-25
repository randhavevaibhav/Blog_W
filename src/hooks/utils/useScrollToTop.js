import { useEffect } from "react";

export const useScrollToTop = ({ depArr = [] }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, depArr);
};
