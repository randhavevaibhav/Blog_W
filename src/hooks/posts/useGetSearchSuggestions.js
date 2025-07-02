import { useQuery } from "@tanstack/react-query";

import { postsServices } from "@/services/posts/postsServices";

export const useGetSearchSuggestions = ({ query, sortBy, limit }) => {
  const { getSearchSuggestionsService } = postsServices();

  const { data, error, isLoading } = useQuery({
    queryKey: ["getSearchSuggestions", query],
    queryFn: () => {
      return getSearchSuggestionsService({
        query,
        sortBy,
        limit,
      });
    },
    retry: 1,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
};
