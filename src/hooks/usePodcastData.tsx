import { useEffect, useState } from "react";
import { normalizePodcastsData } from "../utils/functions";
import { KEY_PODCASTS } from "../constants/constants";
import { NormalizedPodcast, PodcastData } from "../types";
import { useDispatch, useSelector } from "react-redux";
import { setPodcasts } from "../features/podecastSlice";
import { RootState } from "../store";

const usePodcastData = (podcastId: string): NormalizedPodcast | object => {
  const dispatch = useDispatch();
  const podcastsData = useSelector((state: RootState) => state.podcasts.data);

  const [podcastData, setPodcastData] = useState<NormalizedPodcast | {}>({});

  useEffect(() => {
    if (podcastsData && (podcastsData as PodcastData).feed?.entry?.length > 0) {
      const normalizedPodcasts = normalizePodcastsData((podcastsData as PodcastData).feed.entry);
      const selectedPodcast = normalizedPodcasts.find((item) => item.id === podcastId);
      setPodcastData(selectedPodcast || {});
    } else {
      try {
        const storedData = localStorage.getItem(KEY_PODCASTS);
        if (storedData) {
          const dataPodcasts = JSON.parse(storedData);

          if (dataPodcasts) {
            dispatch(setPodcasts(dataPodcasts));
            const normalizedPodcasts = normalizePodcastsData(dataPodcasts.feed.entry);

            const selectedPodcast = normalizedPodcasts.find((item) => item.id === podcastId);
            setPodcastData(selectedPodcast || {});
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Error retrieving or processing podcast data from localStorage:", error);
        setPodcastData({});
      }
    }
  }, [podcastId]);

  return podcastData;
};

export default usePodcastData;
