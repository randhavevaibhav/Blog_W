import { useCallback, useRef } from "react";

export const useInfiniteQueryCntrObserver = ({hasNextPage,isFetching,isLoading,fetchNextPage}) => {
  const handleObserver = useRef();
  const lastElement = useCallback(
    (element) => {
      if (isLoading) return;
      if (handleObserver.current) handleObserver.current.disconnect();
      handleObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
      if (element) handleObserver.current.observe(element);
    },
    [isLoading, hasNextPage]
  );


  return {
    lastElement
  }
};
