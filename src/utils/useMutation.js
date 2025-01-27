import { useEffect, useState } from "react";

import api from "./api";

export const useMutation = (url, variables) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const makeRequest = () => {
    setIsLoading(true);

    api
      .post(url, variables)
      .then((data) => {
        setStatus(data);
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    makeRequest();
  }, [url]);

  return {
    status,
    isLoading,
    error,
  };
};
