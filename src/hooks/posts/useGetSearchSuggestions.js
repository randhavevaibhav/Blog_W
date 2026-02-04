import { useQuery } from "@tanstack/react-query";

import { postsServices } from "@/services/posts/postsServices";
import { Global_Use_Query_Retry } from "@/utils/constants";

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
    retry:Global_Use_Query_Retry,
    refetchOnWindowFocus: false,
  });

  return { data, error, isLoading };
};
