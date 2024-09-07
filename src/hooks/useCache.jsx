import { useEffect, useState } from "react";
import { useLoading } from "../context/LoadingContext";

const CACHE_TIME = 24 * 60 * 60 * 1000;

const useCache = (key, fetchFunction, url) => {
  const { setIsLoading } = useLoading();
  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const storedData = localStorage.getItem(key);
      const storedDate = localStorage.getItem(`${key}_date`);

      if (storedData && storedDate) {
        const parsedDate = new Date(storedDate);
        const currentDate = new Date();
        const timeDifference = currentDate - parsedDate;

        if (timeDifference < CACHE_TIME) {
          setIsLoading(false);
          setCachedData(JSON.parse(storedData));

          return;
        }
      }

      try {
        const data = await fetchFunction();

        console.log(data);
        setCachedData(data);
        localStorage.setItem(key, JSON.stringify(data));
        localStorage.setItem(`${key}_date`, new Date().toISOString());
      } catch (error) {
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
