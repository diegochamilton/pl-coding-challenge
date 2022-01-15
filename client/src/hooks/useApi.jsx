import { useState } from "react";

export default (defaultData, initialLoading) => {
  const [isLoading, setIsLoading] = useState(initialLoading || false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(defaultData);

  const callApi = async (func, info) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await func(info);
      setData(response);
    } catch (error) {
      setError(error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    data,
    error,
    setError,
    isLoading,
    callApi,
  };
};
