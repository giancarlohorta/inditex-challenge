import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";
import { getStoredData, isCacheValid, saveToCache } from "../utils/functions";

const useCache = (key, fetchFunction, url) => {
  const { setIsLoading } = useLoading();
  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const { storedData, storedDate } = getStoredData(key);

      if (storedData && storedDate && isCacheValid(storedDate)) {
        setIsLoading(false);
        setCachedData(JSON.parse(storedData));
        return;
      }

      try {
        const data = await fetchFunction();
        setCachedData(data);
        saveToCache(key, data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Failed to fetch data", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [key, fetchFunction, url]);

  return cachedData;
};

export default useCache;
