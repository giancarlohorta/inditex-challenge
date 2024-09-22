import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoading } from "../context/LoadingContext";
import { getStoredData, isCacheValid, saveToCache } from "../utils/functions";
import { RootState } from "../store";
import { setPodcasts } from "../features/podecastSlice";
import { setEpisodes } from "../features/episodeSlice";

const useCache = (
  key: string,
  fetchFunction: () => Promise<object>,
  url: string,
  cacheType: "podcasts" | "episodes",
  podcastId?: string
): object | null => {
  const dispatch = useDispatch();
  const { setIsLoading } = useLoading();

  const cacheData = useSelector((state: RootState) => {
    if (cacheType === "podcasts") {
      return state.podcasts.data || null;
    }

    if (!podcastId) return null;

    const episodeData = state.episodes.list[podcastId];
    return episodeData && episodeData.data ? episodeData.data : null;
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const { storedData, storedDate } = getStoredData(key);

      if (storedData && storedDate && isCacheValid(storedDate)) {
        setIsLoading(false);

        if (cacheType === "podcasts") {
          dispatch(setPodcasts(JSON.parse(storedData)));
        } else if (cacheType === "episodes" && podcastId) {
          dispatch(setEpisodes({ podcastId, data: JSON.parse(storedData) }));
        }

        return JSON.parse(storedData);
      } else {
        try {
          const data = await fetchFunction();

          if (cacheType === "podcasts") {
            dispatch(setPodcasts(data));
          } else if (cacheType === "episodes" && podcastId) {
            dispatch(setEpisodes({ podcastId, data }));
          }

          saveToCache(key, data);

          return data;
        } catch (error) {
          console.error("Failed to fetch data", error);
          return null;
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [key, fetchFunction, cacheType, podcastId, dispatch, setIsLoading, url]);

  return cacheData;
};

export default useCache;
