import { useEffect, useState } from "react";

import api from "./api";

export const useQuery = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const makeRequest = () => {
    setIsLoading(true);

    api
      .get(url, {
        test: "test",
      })
      .then((data) => {
        setData(data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    makeRequest();
  }, [url]);

  return {
    data,
    isLoading,
    error,
  };
};
